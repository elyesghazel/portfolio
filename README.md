# elyesghazel.ch

Personal site for Elyes Ghazel. Text only, monochrome, monospace, nothing on it
that isn't earning its place.

## Stack

React 19 · Vite 7 · Tailwind 4 · TypeScript. No UI kit, no icon library, no
webfonts, no images - the page uses the system monospace stack, so there is
nothing to download before text renders. Routing is ~40 lines of history API in
`src/router.tsx`; three routes did not justify a dependency.

Built output: ~64 kB JS gzipped, 4 kB CSS, zero image weight.

## Routes

```
/                            home
/projects/slideplate         SlidePlate write-up
/projects/tsw25-fahrstand    TSW25 Fahrstand write-up
```

Project pages are driven by the `projects` array in `content.ts`. Adding one
means adding an entry there and setting `slug` on the matching `work` item; the
"read more" link appears on its own. Add the URL to `public/sitemap.xml` too.

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
    ├── styles.css        Tailwind theme; the greyscale palette lives here
    └── components/       Header, Footer, Section, ProjectView
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
