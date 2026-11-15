---
title: I built a session search for my agents, then found two projects that already do it
date: 2026-11-15
summary: sessionrecall searches past Claude Code, Codex and OpenCode sessions by meaning. I turned my server script into a package with agent workers and found recall-agents and session-recall just before the launch. The launch is off, the code stays up as a small project, and here is what I learned.
tags: [AI agents, Claude Code, Codex, MCP, embeddings, prior art]
---

> [!tldr] sessionrecall is the `recall` search from [my memory setup](/blog/ai-memory-recall), turned into a package: past Claude Code, Codex and OpenCode sessions, searched by meaning on the CPU, with an MCP server so the agent can search too. Just before releasing it I found [recall-agents](https://github.com/alirng/recall) and [session-recall](https://pypi.org/project/session-recall/), which are further along. I cancelled the launch. The code stays on GitHub as a portfolio project.

## Where it came from

Two weeks ago I wrote about [how my agents remember past sessions](/blog/ai-memory-recall). The search part, `recall`, is the piece I use most. It was a 440-line script that **only worked on my server**: hard-coded paths, Claude Code only, my model, my cron job.

I wanted other people to be able to use it, so I turned it into a package. Claude Code worker threads wrote most of it, **one issue and one pull request each**: the package, the agent sources, the MCP server and installer, the README and the demo. I reviewed and merged.

```gallery
/sessionrecall-demo.gif | recall finding a paraphrased session, filtering by agent and answering an agent over MCP | Recorded against made-up sessions that ship in the repo, not my own.
```

## Then I found the others

Before starting I had looked for tools that search agent conversations. I found a few good Claude-Code-only ones and some history viewers, so I went ahead. The last step before the launch was a proper comparison table in the README, and while writing it I found two projects that do what mine does:

- **[recall-agents](https://github.com/alirng/recall)** reads the history of Claude Code, Codex, Cursor and about 30 more agents, OpenCode among them. It has MCP tools, a `/recall` skill, hooks, published benchmarks, and nightly memory notes written by a model you choose. It has had 12 releases since early October, and its command is also called `recall`.
- **[session-recall](https://pypi.org/project/session-recall/)** is for Claude Code only. Its main job is getting context back after compaction, with a hook that runs right after it.

PyPI also rejected the names I tried. Both projects are further along than mine, and recall-agents does everything sessionrecall does and a lot more. Launching would have meant asking people to install the smaller of two tools with the same command name, so I didn't. **If you want this for your own agents, use recall-agents.**

## What is different

Not much, and none of it is a feature the others lack.

- **Small.** About 2,400 lines of Python. The index is one SQLite file, and search is a brute-force cosine similarity over a numpy array. You can read all of it in an evening.
- **No LLM job.** It embeds, stores and searches. Nothing summarises sessions or writes notes.
- **Used every day.** It has run on my server since late October, searched by me and by the agents working there.

```gallery
/sessionrecall-search.png | recall -n 2 why did we drop the admin dashboard | The query shares almost no words with the session it finds.
```

## What I learned

- **Check prior art before building, and search for the problem, not your idea of the tool.** I searched for session search and found session search tools. recall-agents calls itself memory for coding agents, and a search for that would have changed the plan. The workers built what the issues asked for. Whether the package should exist was my question to ask, and I asked it too late.
- **Relative scores have no usable cutoff.** On my own data the best unrelated hit sits around 0.53 and the weakest real hit around 0.55. No threshold separates the two. So the results show snippets, and the agent is told to read them and say "nothing found" instead of guessing.
- **Redact on output.** My sessions contain tokens I pasted while debugging, and a search that feeds results into another session carries them along. Every output path, CLI and MCP, replaces API keys, bearer headers, URL credentials and private keys with `[REDACTED]`. The index keeps the original text, so the search still finds them.
- **Sources as plugins.** Each agent is one module that turns its storage into sessions and turns. Codex has two rollout formats and OpenCode moved from JSON files to SQLite. With one module per agent, each of those was a small change.

## Where it is now

The code is on [GitHub](https://github.com/elyesghazel/sessionrecall), MIT, with the comparison in the README. It still runs on my server every day.
