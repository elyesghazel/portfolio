---
title: Every Claude session starts blank, so I gave it a memory
date: 2026-10-30
summary: My agents now know what we did last week, even when I describe it in different words. A curated memory in git, local semantic search over every past session, and a nightly job that keeps the two in sync.
tags: [AI agents, Claude Code, embeddings, SQLite, self-hosting]
---

I run most of my work through Claude Code sessions on my server. They are good at the task in front of them and know nothing about anything before it. Every session starts blank. "Like last time" means nothing, "the thing we set up on Tuesday" means nothing, and I end up explaining my own setup to it again.

The first fix was grep over the old transcripts. That works until I describe something in different words than I used at the time. I asked about "dropping Homepage" and the session that did it had said "replaced it with the ops dashboard". Same event, zero matching lines.

> [!note] The problem was not storage. Every transcript was still on disk. The problem was finding the right one by meaning instead of by exact words, and doing it fast enough that the agent actually bothers.

So the memory now has two layers: a small curated one that every session reads, and a search over everything that was ever said.

```stats
79      | curated memory files
239     | sessions searchable
5,493   | indexed chunks
24 MB   | whole index
15 min  | between index runs
0       | API calls to search
```

## The pipeline

```flow caption="from a finished session to the next session's context"
flowchart TD
  s[finished sessions<br/>jsonl transcripts] -->|cron, every 15 min| emb[chunk + embed<br/>local model, CPU]
  emb --> db[(SQLite index<br/>float32 vectors)]
  db -->|recall query| q[background worker]
  db -->|nightly dream, 02:30| mem[~/ai memory<br/>facts, diary, changelog]
  q -->|recall-inject hook| next[next session's context]
  mem -->|MEMORY.md at start| next
```

## Layer one: a curated memory in git

`~/ai` is a git repo. The core is a folder of small markdown files, one fact each, sorted into topic folders like me, machines, server, projects and life. Each file has frontmatter with a name, a one-line description and a type: something about me, feedback on how I want things done, a project, or a reference. Files link to each other with `[[slug]]`.

`MEMORY.md` is the index: one line per file, grouped by topic. It is loaded into every session, so a fresh agent starts with a table of contents of what it should know and opens the files it needs.

Next to it sit three more things:

- `diary/`, one file per day
- `changelog.md`, one line for every change made to a machine
- `map.md`, what runs where

The agents are told to keep these current in the same session: log machine changes in the changelog, update the map, commit `~/ai`. Git gives me history and a diff for free when an agent writes something wrong.

## Layer two: recall

The curated memory only holds what someone decided to write down. `recall` searches everything else. It is a single Python file, about 440 lines, run as a uv inline script with fastembed and numpy as the only real dependencies.

The model is `jinaai/jina-embeddings-v2-base-de`. I write in German and English, often in the same session, and this one handles both plus long inputs. It runs locally on the CPU with 4 threads. Nothing leaves the server.

```term title="on the server"
$ recall "why did we drop Homepage"
Now: Fri 2026-10-30 10:24 CET, ISO week 44

== bf30c396  ~/ai  Semantic recall of past sessions
  Thu 2026-10-29 15:40 (yesterday) assi: ...replaced by the ops dashboard...
# a different session, different words, still the top hit
```

### Indexing

Transcripts are split into 1000-character chunks with 200 characters of overlap, embedded, L2-normalised and stored as float32 blobs in SQLite (WAL mode). There are two tables:

```txt title="index.sqlite"
files(path, offset)
chunks(path, sid, ts, role, text, vec)
```

`offset` is what keeps it cheap. For every transcript file the index remembers how many bytes it has already read, so the next run only embeds turns that were appended since. If a file is now shorter than its offset, it was rewritten, and that file gets indexed again from scratch. A `flock` makes sure only one indexer runs at a time.

Cron runs `recall --index` every 15 minutes at `nice 19`. A search also tops up the index itself, but only up to 150 new chunks. Anything beyond that is left to cron, and the output says "index catching up" so the agent knows the newest turns may be missing.

> [!tip] The chunks outlive the transcripts. Claude Code deletes transcripts after 30 days by default, but the index keeps the text, so old sessions stay searchable after the source file is gone.

### Searching

There is no vector database. A search is a brute-force dot product of the query vector against every stored vector, in numpy. At a few thousand chunks that is instant, and it is one less service to run.

On top of the semantic score there is a small exact-word boost: +0.08 times the fraction of query words (3 characters or longer) that appear literally in the chunk. Meaning does most of the work, the boost breaks ties in favour of chunks that also use the same words.

Results are grouped by session, top 3 hits each, and the session doing the search is left out so it doesn't find itself. Every hit shows a local timestamp with weekday and age, like `Thu 2026-10-22 22:12 (7 days ago)`, and the thread title, joined in from T3 Code's own SQLite. Filters are `--from` / `--to` and `--since N`. For the cases where exact words are the point, `--exact` and `-r` still do a plain grep, `--list` lists sessions and `--show <id>` prints one.

### Knowing when it found nothing

Semantic search always returns something. The question is whether it means anything.

```bars title="Similarity scores"
noise, highest seen | unrelated sessions | 53 | ~0.53
real hit, lowest    | the right session  | 55 | ~0.55 | *
```

The gap between the two is tiny, so a score cut-off would be wrong in both directions. The agent is told to read the snippets and judge them, and to say "nothing found" instead of guessing from a weak hit.

## Searching without waiting

Loading the model and scoring a query is not instant, and an agent that blocks on every lookup stops doing lookups. So inside a session, `recall <query>` returns at once. It starts a background worker that writes to `~/.cache/recall/inbox/<session_id>/<n>.part` and renames the file to `.txt` when it is done.

```flow caption="non-blocking delivery"
sequenceDiagram
  participant A as agent
  participant W as recall worker
  participant H as recall-inject hook
  A->>W: recall "query"
  W-->>A: returns at once
  A->>A: keeps working
  W->>W: embed, score, write n.txt
  A->>H: next tool call finishes
  H-->>A: attach [recall results for: query]
```

The `recall-inject` hook runs on PostToolUse and on Stop. After any tool call it checks the inbox and attaches finished results to that tool result as `[recall results for: ...]`. If the agent tries to stop while a search is still running, the hook waits up to 30 seconds, then blocks the stop once and hands the results over. The agent keeps working while the search runs, and it never misses the answer.

## Knowing what "last week" means

The system prompt only knows the date the session started. A session that has been open since Monday thinks it is still Monday, and "last week" is a guess.

A second hook, `now-context`, runs on every prompt I send. It adds the current weekday and time, the ISO week, and the exact dates for this week, last week and yesterday. "What did I do last week" then turns into a concrete `recall --from ... --to ...` instead of a vague search.

## Off the record

Some chats should not end up in memory. `/forget` runs `recall --forget`, which hides that session from every mode and from the index for good. It doesn't show up in searches, in `--list` or in `--show`.

## The nightly dream

Layer two only helps if someone asks. Layer one only helps if someone writes it down. A scheduled task in T3 Code runs every night at 02:30 and connects them: it reads the last 24 hours of sessions through `recall` and consolidates them into the memory files, the diary and the changelog.

Because it reads only through `recall`, forgotten chats never get in. One mechanism decides what exists, everything else goes through it.

> [!warn] The dream writes into the same git repo the agents read from. Wrong facts would spread to every session, so each night's run lands as one commit I can read and revert.

## The rules that make it work

The code is the smaller part. What makes it useful is a short list of rules every agent follows:

- search memory and `recall` before saying "I don't know"
- log every change to a machine in `changelog.md`
- keep `map.md` current
- commit `~/ai` before finishing

Now a new session can answer "why did we stop using that?" with the date, the reason and the session it happened in. It took one Python file, one SQLite database and two hooks.
