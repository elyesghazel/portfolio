# elyesghazel.ch design

The look of elyesghazel.ch, written down so the other sites (ops dashboard,
lab hub, login pages, small tools) can wear it too.

- `design/tokens.css` - colours (dark and light), type scale, spacing, motion,
  `@font-face`. The single source of truth. The portfolio imports it directly.
- `design/fonts/` - JetBrains Mono, variable, latin + latin-ext, normal + italic.
  Self-hosted, OFL licence alongside.
- `design/components.css` - every component as plain CSS classes, for HTML
  tools that don't use React or Tailwind.
- `design/kit.html` - all components on a mock, dense ops dashboard. Open it to
  check a change in both themes before shipping it.

For a plain HTML tool, copy the `design/` folder next to the page and:

```html
<html lang="en">
<head>
  <meta name="color-scheme" content="dark light">
  <link rel="stylesheet" href="design/tokens.css">
  <link rel="stylesheet" href="design/components.css">
</head>
<body class="dense">
```

## The idea in one paragraph

Night sky, terminal type, one quiet colour. A black page with a few drifting
stars, a single monospace family, white for what matters, three greys for
everything else, and a muted red that only ever marks the one thing you
should look at. Calm, centered, nothing that moves unless you do. It should
look like the person runs his own server and solders his own boards, without
any of the decoration saying so.

## Colour

All values live in `tokens.css`. Use the variables, never the hex.

| token | dark | light | use |
|---|---|---|---|
| `--bg` | `#000000` | `#fafafa` | page |
| `--bg-raised` | `#0b0b0b` | `#ffffff` | cards, header, toasts, tables |
| `--bg-sunken` | `#050505` | `#f2f2f2` | inputs, inline code |
| `--bg-hover` | `#141414` | `#f0f0f0` | row and button hover |
| `--ink` | `#ffffff` | `#0a0a0a` | headings, values, primary button, active nav |
| `--body` | `#dcdcdc` | `#2b2b2b` | running text |
| `--dim` | `#a6a6a6` | `#555555` | secondary text, nav, row labels |
| `--faint` | `#8a8a8a` | `#707070` | captions, meta, the `//` (still AA on `--bg`) |
| `--rule` | `#232323` | `#e3e3e3` | hairlines, card borders |
| `--rule-strong` | `#3a3a3a` | `#c4c4c4` | input and button borders, hovered cards |
| `--accent` | `#c47070` | `#a94848` | the one colour |

**The accent** is a muted brick red. It marks *one* thing at a time: a link
inside prose (SlidePlate in the about text), the "now" dot, the `.ch` of the
wordmark on hover, the current item on a timeline. It is never a button fill,
never a background, never a status.

**Status colours** are for state in tools and nothing else:

| token | dark | light | means |
|---|---|---|---|
| `--ok` | `#6cc28a` | `#1e7a44` | running, passed, done |
| `--warn` | `#d9ad5b` | `#8f5f00` | degraded, slow, needs a look soon |
| `--bad` | `#ff5f56` | `#d0201f` | down, failed, destructive action |
| `--info` | `#74a7e6` | `#1f5fb4` | in progress, neutral news |

Each has a `-soft` partner (12 % alpha) for tag fills and hover washes. `--bad`
is deliberately louder and more orange than `--accent` so the two never get
confused: the accent is calm, `--bad` is an alarm. Status is never shown by
colour alone: tags carry a dot *and* a word, table rows get a left bar.

The Stealthy page keeps its own two highlight colours (`--key` green and
`--hw` amber) for keywords in the write-up. They stay on that page.

## Type

One family: **JetBrains Mono**, self-hosted, variable weight. No second font,
no system fallback chosen on purpose (the stack after it is only a safety net).
Ligatures are off in running text (`font-feature-settings: "calt" 0`), so `->`
stays two characters.

| token | size | use |
|---|---|---|
| `--fs-3xl` | 44 | the name on the home page, and nothing else |
| `--fs-2xl` | 34 | project title, phone-size name |
| `--fs-xl` | 26 | stat values, page titles in tools, the contact email |
| `--fs-lg` | 20 | card titles |
| `--fs-md` | 17 | lede paragraph, hero line |
| `--fs-base` | 15.5 | site body |
| `--fs-sm` | 13.5 | tool body (`.dense`), buttons, inputs, notes |
| `--fs-xs` | 12 | section labels, tags, captions, stat labels |
| `--fs-2xs` | 11 | table headers, `kbd` |

- Weight stays at 400. Hierarchy comes from size, colour (`--ink` vs `--dim`)
  and space. 500 is allowed for a bold lead-in inside a callout.
- Big text gets `--tracking-tight` (-0.02em). Section labels get
  `--tracking-label` (0.2em) and uppercase. Nothing else is tracked.
- Body line height 1.72 on the site, 1.55 in `.dense` tools.
- Numbers that change or line up use `tabular-nums` (`.num`).
- Lowercase is the house voice for UI copy: nav, buttons, labels, tags
  ("see the work", "run backup"). Sentences in prose are normal case.
  Hyphens, never em or en dashes.

## Space and layout

4 px base: `--sp-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 20, `-6` 24, `-8` 32,
`-10` 40, `-12` 48, `-16` 64, `-20` 80, `-24` 96.

- **Site:** one centered column, `--measure` 42 rem, 24 px side padding.
  Sections 80-112 px apart. Nothing breaks out of the column.
- **Tools:** `--measure-wide` 72 rem, `.grid-main` puts a 20 rem side column
  next to the main one from 960 px up. Sections 48 px apart.
- Corners nearly square: 2 px on controls and tags, 4 px on cards and toasts.
  Only dots and the switch are round.
- Borders are 1 px hairlines in `--rule`. Shadows exist only on floating things
  (toasts) via `--shadow-pop`.

## Components

Class names below are from `components.css`; the portfolio has the same ones
in `src/styles.css` where it needs them.

### Header and wordmark

Sticky, 52 px, `--bg` at 85 % with a 4 px blur and a hairline under it.
Wordmark on the left: the domain in `--ink` with the TLD in `--faint`; the TLD
turns `--accent` on hover. Tools prefix their subdomain in `--dim`:
`<span class="sub">ops.</span>elyesghazel<span class="tld">.ch</span>`.

### Nav

Lowercase words in `--dim`, 20 px apart, right-aligned. Hover goes to `--ink`.
The current one is `--ink` with a 1 px underline at the header's bottom edge
(`aria-current`). On a phone the site swaps the nav for a `menu` text button
that opens a full-width list of `// section` rows; tool UIs let the nav scroll
sideways.

### Theme toggle

A 15 px circle, half filled, in a 36 px hit area. Rotates 180° on hover.
Contract shared by every site: `data-theme="dark|light"` on `<html>`, choice
saved in `localStorage.theme`, no attribute means "follow the OS". Read it in
a tiny inline script in `<head>` before CSS loads, so there is no flash.

### Section label

`// ABOUT ----------------------- aside`

```html
<h2 class="section-label"><span class="slashes">//</span> containers <span class="aside">40 total</span></h2>
```

12 px, uppercase, 0.2em tracking, `--ink`; the slashes `--faint`; a hairline
fills the rest of the row; an optional lowercase aside sits at the far end.
This is the signature element. Use it for every section, and nothing else
should look like it. (It is `.section-label`, not `.label`: mermaid and other
libraries use `.label` internally.)

### Buttons

36 px tall (28 px `.btn-sm`), 2 px radius, lowercase.

- `.btn-primary` - `--ink` fill, `--bg` text. One per view.
- `.btn` (secondary) - `--rule-strong` border, transparent; border goes `--ink` on hover.
- `.btn-danger` - `--bad` text and border, `--bad-soft` wash on hover. Only for
  destructive actions, and ask before doing them.
- `.btn-ghost` - no border, `--dim` text. Cancel, dismiss.

An arrow inside a button (`<span class="arr">&rarr;</span>`) nudges 3 px in
its direction on hover. Disabled is 40 % opacity.

### Inputs

`.input`, `.select`, `.textarea` in a `.field` with a small `--dim` label above
and an optional `.hint` below. 36 px, `--bg-sunken` fill, `--rule-strong`
border, `--ink` border on focus (no glow). Error: `.field.is-bad` turns the
border and hint `--bad`, and the hint says what to fix. `.search` adds a `/`
prefix. `.check` (square, filled with an inner square) and `.switch` (the only
pill) for booleans.

### Tags

22-24 px, 2 px radius, 12 px text. Neutral tags are a `--rule` outline with
`--dim` text (tech stacks, kinds on the timeline). Status tags (`.ok`, `.warn`,
`.bad`, `.info`) drop the outline for a soft fill, tint the text and lead with
a dot. `.accent` is for "now" or "new", once per view.

### Tables and lists

- `.table` in a `.table-wrap` card: 11 px uppercase headers in `--faint`,
  hairline rows, `--bg-hover` on hover, numbers right-aligned and tabular,
  the name column in `--ink`. A failing row gets `.is-bad`: a 2 px `--bad`
  bar on its left edge.
- `.kv` - key/value rows with a 9 rem `--dim` key column (the site's stack list).
- `.rows` - clickable rows: label, value, trailing arrow that nudges on hover
  (the site's contact links).

### Stat blocks

A row of cells divided by hairlines, top and bottom rule, no boxes. Value
26 px in `--ink` (a unit in `<small>` `--faint`), label 12 px `--faint` under
it, an optional `.stat-delta` in a status colour. Two per row on a phone.
`.meter` is a 4 px bar for one ratio (disk, quota), coloured by status.

### Timeline / log

The thing borrowed from isaaclins.com, done our way: a hairline down the
left, a 9 px round node per entry. On the portfolio it is grouped by year
(year sticky on the left), month in `--faint`, one line of what happened plus
a `--dim` note, kind as a neutral tag; a brighter line fills down the rail as
you scroll and nodes fill in as it passes them. The newest "now" entry wears
the accent with a soft halo. In tools (`.log` / `.log-item`) the nodes take
status colours instead: an event feed.

### Cards

`--bg-raised`, `--rule` border, 4 px radius, 20-32 px padding. Link cards
lighten their border to `--rule-strong` on hover and their title underline
draws in. Image in a card: full bleed at the top with a hairline under it,
scales 2.5 % over 700 ms on hover.

### Callouts

A `--bg-raised` box with a 2 px left border in a status colour, a dot and a
bold lead-in: "**jellyfin is down.** Out of memory, three restarts." For
things that need attention on a page, not for decoration.

### Toasts

Bottom-center, one at a time, `--bg-raised`, `--rule-strong` border, a status
dot, plain lowercase sentence, gone after ~2.6 s. Fades and rises 10 px in.
An action button (`retry`) is allowed; nothing else.

### Empty states

A dashed `--rule-strong` box, centered: `// --` in `--faint`, one line in
`--ink` saying what's missing, a `.hint` saying why it matters, one small
button to fix it.

### Links

- `.link` - `--ink`, underline draws left-to-right on hover (200 ms).
- `.link-accent` - for links inside running prose: `--accent`, always underlined.
- External links end in `↗`, internal ones in `→`, back links start with `←`.

## Motion

Short and plain: 120 ms for colour, 200 ms for underlines and arrow nudges,
500 ms for the fade-up of sections the first time they scroll in (10 px).
The starfield drifts at 2-5 px/s with light scroll parallax, and a shooting
star every few seconds. All of it honours `prefers-reduced-motion`.

## The starfield

Only on the portfolio, fixed behind everything on a canvas. White dots on
black; in light mode the same field in graphite at about half strength
(`--star`, `--star-alpha`). Tools don't get it: it belongs to the front page
and project pages, where there is room to breathe.

## Do

- Start from black (or `#fafafa`), mono, one column. Add only what earns it.
- Put a `// label` above every section.
- Let `--ink` vs `--dim` vs `--faint` carry hierarchy before reaching for size.
- Use the accent once per view, for the thing that is "now" or "mine".
- Pair every status colour with a word or a dot.
- Write UI copy short and lowercase: "run backup", "4m 12s", "no restore tests yet".
- Check both themes and a 390 px phone before shipping.

## Don't

- No second typeface, no Google Fonts, no icon font. A unicode arrow does it.
- No gradients (purple or otherwise), glassmorphism, glows, neon or drop shadows on cards.
- No themed decoration: circuit traces, chip drawings, matrix rain, fake terminals as ornament.
- No emoji in UI.
- No pill buttons, no rounded-xl cards, no coloured button fills.
- Don't use the accent for errors or `--bad` for emphasis.
- Don't copy isaaclins.com: no giant full-width name, no role/at/now/clock
  strip, no warm paper background, no blinking block cursor.
