# elyesghazel.ch

Personal site for Elyes Ghazel. Black, starfield, monospace, one accent colour,
nothing on it that isn't earning its place. The look is written down in
[`DESIGN.md`](DESIGN.md) and shared with the other sites through `design/`.

## Stack

React 19 · Vite 7 · Tailwind 4 · TypeScript. No UI kit, no icon library. One
font, JetBrains Mono, self-hosted from `design/fonts/` via `design/tokens.css`. Routing is ~40 lines of history API in
`src/router.tsx`; three routes did not justify a dependency.

Built output: ~64 kB JS gzipped, 4 kB CSS, zero image weight.

## Routes

```
/                            home
/projects/slideplate         SlidePlate write-up
/projects/tsw25-fahrstand    TSW25 Fahrstand write-up
/blog                        all posts
/blog/<slug>                 one post
```

Project pages and blog posts are markdown files in
`elyesghazel-site/src/markdown/` (`projects/<slug>.md`, `posts/<slug>.md`). A
new file is a new page; posts also appear on `/blog`, on the home page and in
the log. Block tools for posts (flow diagrams, bar charts, stats, galleries,
terminal transcripts, callouts) are documented in `src/markdown/README.md`.
For a project, also set `slug` on the matching `work` item in `content.ts`. Add the URL to `public/sitemap.xml` too. Same for blog posts.

## Editing content

**All copy lives in `elyesghazel-site/src/content.ts`** - hero line, about
paragraphs, stack groups, work entries, project write-ups, contact links.
Edit that file; the components only lay it out.

The one exception is `elyesghazel-site/index.html`, which holds the `<title>`
and the meta/OG tags.

## Layout

```
elyesghazel-site/
├── index.html            title + meta tags
├── public/               favicon.svg, robots.txt, sitemap.xml
└── src/
    ├── content.ts        ← every string on the site
    ├── App.tsx           routing + home page
    ├── router.tsx        history API, ~40 lines
    ├── styles.css        Tailwind theme mapped onto design/tokens.css
    ├── lib/              theme toggle, toast, scroll reveal
    └── components/       Header, Hero bits, Log (timeline), ProjectView

design/                   tokens.css, components.css, kit.html, fonts/
elyesghazel-site/scripts/build-lab.sh   preview build under a subpath (lab hub)
```

## Local development

Requires Node >= 22 (pnpm 10 refuses anything older).

```sh
cd elyesghazel-site
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # → dist/
```

No Node on the machine? Build through Docker instead:

```sh
docker run --rm -v "$PWD/elyesghazel-site":/app -w /app node:22-slim \
  sh -c "corepack enable && corepack prepare pnpm@10 --activate && pnpm install && pnpm build"
```

## Deployment

Multi-stage `Dockerfile` (node:22 build → nginx:alpine), fronted by Traefik.

```sh
docker compose up -d --build
```

> **Heads up:** `elyesghazel.ch` is currently served by the `web-portfolio`
> container from `/opt/docker/websites/react-portfolio`. Both compose files
> claim the same Traefik host rule, so stop that stack before bringing this one
> up - otherwise Traefik routes to whichever registered first.

## Design rules

Kept deliberately narrow so changes stay consistent:

- Black background, white text, three greys in between. Exactly one colour on
  the whole site: SlidePlate's brand red (`--color-accent`), on that one link in
  the about section. Don't add a second.
- Monospace everywhere. One type scale.
- Borders are 1px hairlines. No shadows, no gradients, no rounded corners.
- Hyphens, never em or en dashes. Anywhere.
- The only motion is the hover underline, and it respects
  `prefers-reduced-motion`.
- The greys are contrast-checked against `#000`. Don't darken them further.
