# Content in markdown

- `projects/<slug>.md` - one file per project page, at `/projects/<slug>`.
- `posts/<slug>.md` - one file per blog post, at `/blog/<slug>`, newest first
  by `date`. Posts also show up in the home page log.

House style: hyphens, never em or en dashes. First person, plain words.

## Frontmatter

```
---
title: Watching 4K GoPro clips without downloading them
date: 2026-10-26               # posts only, YYYY-MM-DD
summary: One or two sentences, shown in lists and under the title.
tags: [self-hosting, ffmpeg]
draft: true                    # optional, hides it from lists in production
---
```

Projects use `role`, `period`, `order` (sort), `summary`, `tags`, and
optionally `link` + `url` (shown in the meta row) and `highlight: true`
(turns **bold** green and ++this++ amber, for hardware write-ups).

## Block tools

Fenced code blocks with these names render as components:

````
```flow caption="optional caption"
flowchart TD
  a[SD card] --> b[gopro import]
```
````
Mermaid syntax (flowchart, sequenceDiagram, ...), drawn in the site colours.

````
```bars title="One 5-minute clip" ratio
label | small text under it | number | shown value | *
```
````
Bars scale to the biggest number. `*` marks the row that matters (accent).
`ratio` prints xN against the row above.

````
```stats
9× | smaller files
14 days | until a link expires
```
````

````
```gallery
/file-in-public.jpg | alt text | caption
```
````

````
```term title="on the server"
$ command
output
# comment
```
````

Any other fence is a code block with a copy button; name it with
`title=file.sh`.

Callouts are blockquotes starting with `[!note]`, `[!tip]`, `[!warn]` or
`[!bad]`. Every post opens with a `[!tldr]` callout: two or three
plain sentences on what was built and why it matters.

Images go in `public/` and are referenced from the root (`/x.jpg`).
