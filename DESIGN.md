# Ground plane - design spec

The visual identity for elyesghazel.ch and every tool behind it (ops dashboard,
lab hub, login pages). Written so it can be applied to plain HTML/CSS with no
React and no build step.

## The idea

Elyes builds things from the circuit board up, so his surfaces are drawn like a
board. The page is **solder mask** (deep green), the one accent is **copper**,
labels are **silkscreen** (mono, uppercase, small), and things are named the
way a board names its parts: `U1`, `J2`, `R3`, a bill of materials, a
datasheet's spec table. Type is a condensed grotesk that sets labels like a
part number, never a terminal: no all-mono, no paper, no billboards.

## Files

| Path | What |
| --- | --- |
| `design/tokens.css` | Every custom property plus the `@font-face` rules. Import first. |
| `design/fonts/` | Self-hosted woff2 (Archivo variable with width axis, IBM Plex Mono 400/500), latin + latin-ext, OFL licences. Keep next to `tokens.css`; URLs are relative. |
| `design/components.css` | Reference CSS for every component below, plain class names. |
| `design/kit.html` | All components on one page, dark/light. Open it to check a change. |
| `elyesghazel-site/src/styles.css` | The portfolio. Mirrors the tokens; keep them in sync. |

Minimal setup for a new tool:

```html
<link rel="stylesheet" href="/design/tokens.css" />
<link rel="stylesheet" href="/design/components.css" />
<script>/* before first paint */
  (function () {
    var t; try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t !== "light" && t !== "dark")
      t = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.dataset.theme = t;
  })();
</script>
```

No CDN, no Google Fonts, no external requests at runtime.

## Colour

Dark is the default. Light applies with `<html data-theme="light">`. All text
tokens pass WCAG AA (4.5:1) on `--bg` and `--bg-2` in both themes.

```css
:root {                      /* dark */
  --bg: #0b1a15;  --bg-2: #10241d;  --bg-3: #163128;
  --fg: #e4ece6;  --fg-2: #a9b9af;  --fg-3: #8a9c91;
  --line: #1f3a30; --line-2: #2d4c40;
  --accent: #e98a4f; --accent-hi: #ffa872; --accent-ink: #1b0d04;
  --ok: #5cd394; --warn: #f0cf5a; --bad: #ff6b81; --info: #7cb8ff;
}
[data-theme="light"] {
  --bg: #e9efeb;  --bg-2: #f6f9f7;  --bg-3: #dbe5df;
  --fg: #0e211a;  --fg-2: #3c5147;  --fg-3: #556a60;
  --line: #ccd8d1; --line-2: #b2c3b9;
  --accent: #b14e1a; --accent-hi: #8f3b10; --accent-ink: #fff6ee;
  --ok: #1b7a47; --warn: #8a6300; --bad: #b3243f; --info: #1f5fbf;
}
/* Same in both themes: the board is an object, not a surface. */
:root {
  --mask: #12372b; --mask-2: #0d2a21;
  --copper: #d98a50; --copper-hi: #ffbe8a; --gold: #d9b467; --silk: #eef3ea;
}
```

| Token | Use |
| --- | --- |
| `--bg` | Page. |
| `--bg-2` | Raised: cards, panels, inputs, toasts, KPI strip. |
| `--bg-3` | Hover and pressed fills, switch track. |
| `--fg` / `--fg-2` / `--fg-3` | Primary text / secondary and body copy / labels, meta, placeholders. |
| `--line` / `--line-2` | Dividers and card borders / control borders and hover. |
| `--accent` | Copper. Primary button, refdes tags, focus ring, links in prose, one highlighted word per view. |
| `--accent-ink` | Text on a copper fill. |
| `--ok --warn --bad --info` | Status only: badges, toast stripes, deltas, validation. |
| `--mask --copper --gold --silk` | Board drawings, terminal / serial-output panels. Never as page background in light mode. |

Status vs accent: copper is orange; `warn` is yellow, `bad` is pink-red, `ok`
is mint, `info` is blue. Never use `--accent` to mean "warning" and never use a
status colour for decoration or branding.

## Type

Two families, both self-hosted.

- **Archivo Variable** (`--sans`), weight 100-900, width 62-125%. Everything
  that is not data. The width axis does the work: condensed for display,
  normal for reading.
- **IBM Plex Mono** (`--mono`), 400 and 500. Small accent only: refdes tags,
  table header labels, field labels, timestamps, hashes, IDs, numbers in
  tables, code, terminal output. Never for headings or paragraphs.

| Role | Family | Size | Weight | Width (`font-stretch`) | Notes |
| --- | --- | --- | --- | --- | --- |
| Display (hero name, project title) | sans | `--t-h1` clamp 48-104px | 760 | 68% | line-height 0.88, tracking -0.015em. Portfolio only. |
| Section heading | sans | `--t-h2` clamp 32-52px | 720 | 72% | line-height 0.95. In tools use `.sec.sm`: 26px / 680 / 75%. |
| Sub heading, card title | sans | 20-26px | 650-680 | 75-78% | |
| Lead | sans | 20px | 500 | 100% | |
| Body (reading) | sans | 17px | 400 | 100% | line-height 1.6, word-spacing 0.04em, max 62ch. |
| Body (tools) | sans | 16px / 14px dense | 400 | 100% | |
| UI (nav, buttons, wordmark) | sans | 15px | 500-650 | 88-100% | |
| Label | mono | 11px | 500 | - | UPPERCASE, letter-spacing 0.06em, `--fg-3`. |
| Data / refdes / code | mono | 12-13.5px | 400-500 | - | `font-variant-numeric: tabular-nums` for numbers. |
| KPI value | sans | 36px | 700 | 72% | units in mono 14px `--fg-3`. |

Set `word-spacing: normal` on mono runs; the body's extra word spacing is for
Archivo only.

## Space, radius, borders

- Spacing on a 4px grid: `--s-1` 4, `--s-2` 8, `--s-3` 12, `--s-4` 16, `--s-5`
  24, `--s-6` 32, `--s-7` 48, `--s-8` 64, `--s-9` 96. Tools use 8-24 inside
  components and 48-64 between sections; the portfolio uses 96-160 between
  sections.
- Max content width 1200px, side padding `clamp(16px, 4.5vw, 56px)`.
- Radius: `--r-1` 3px (tags, badges, refdes), `--r-2` 6px (buttons, inputs,
  toasts), `--r-3` 12px (cards, panels, images), `--r-board` 18px (board
  drawings only). Pills (999px) only for the theme switch and status dots.
- Borders are 1px hairlines: `--line` for dividers and cards, `--line-2` for
  controls. Lists and tables are separated by horizontal rules only, no zebra
  stripes, no vertical lines except between KPI cells.
- Shadows: none on cards. One shadow (`--shadow-pop`) for floating things
  (toasts, menus). The portfolio's board drawing has its own drop shadow.

## Motion

- Hover and colour: 150ms. Switches and toasts: 250ms, `--ease`
  (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
- Reveals: opacity + 14px rise over 600ms, once, when scrolled into view.
  Content pages only, never in tools.
- Board: traces "route" out from the chip on load (stroke-dashoffset), pads
  appear after; hovering a pad sends a copper pulse along its trace.
- `prefers-reduced-motion: reduce` turns all of it off; everything is visible
  and static. No parallax, no grain, no starfields, no scroll-jacking.

## Components

Class names are in `design/components.css`; `design/kit.html` shows each one.

**Page header and wordmark** (`.top`, `.brand`). Sticky, 56px in tools (64px on
the portfolio), solid `--bg` (no blur), 1px `--line` bottom border (on the
portfolio it appears once you scroll). Wordmark on the left: a 24px IC package
glyph (copper pins, `--fg` body, "EG" knocked out in condensed Archivo 800),
then the name of the surface in Archivo 650 at 88% width: `Elyes Ghazel` on
the portfolio, `ops`, `lab`, `login` on tools, optionally followed by
`elyesghazel.ch` in mono `--fg-3` (`.sub`). Nothing blinks.

**Nav** (`.nav`). Right-aligned, Archivo 500 15px, sentence case. Links are
`--fg-2`, hover gets `--bg-3` fill and `--fg`; the current page
(`aria-current="page"`) gets `--fg` and a 2px copper underline. On phones hide
secondary items; keep at most three.

**Theme toggle** (`.switch`). A slide switch, not an icon button:
`role="switch"`, `aria-checked="true"` when dark, `aria-label="Dark mode"`.
46x26 track in `--bg-3` with a `--line-2` border, 18px copper knob carrying a
sun or moon glyph in `--accent-ink`; knob left = light, right = dark. Always
the last item in the header.

**Section heading** (`.sec`). A refdes tag in copper (`U1`, `J2`, `BOM`), then
the title in condensed Archivo, an optional one-line aside on the right in
`--fg-3`, and a 1px rule underneath that ends in a small copper via (7px
ring). Refdes letters follow board conventions loosely: `U` main block, `J`
things you connect to (projects, links), `R` reference text, `L` list rows,
`BOM` inventories. Keep them short; they are labels, not decoration.

**Buttons** (`.btn`). 40px high (30px `.sm` in tables), 6px radius, Archivo 600
15px.
- Primary `.btn.primary`: copper fill, `--accent-ink` text, hover to
  `--accent-hi`. One per view or per card.
- Secondary `.btn`: transparent, `--line-2` border, `--fg` text; hover adds
  `--bg-3` fill.
- Danger `.btn.danger`: transparent with a `--bad` border and text; hover
  fills `--bad` with `--bg` text. Ask for confirmation in tools.
- Disabled: 45% opacity, no pointer events. Arrows (`→` internal, `↗`
  external) sit after the label and nudge 3px on hover.

**Inputs** (`.input`, `.select`, `.textarea`, wrapped in `.field`). 40px, 6px
radius, `--bg-2` fill, `--line-2` border. Focus: copper border plus a 3px
copper ring at 22% opacity. Label above in the mono label style; hint below in
13px `--fg-3`; error below in `--bad` with `aria-invalid="true"` turning the
border `--bad`. Use `.input.mono` for IDs, paths, filters and tokens.

**Tags, badges, refdes**. Three different jobs, keep them apart.
- `.ref`: mono 12px in a 3px-radius outline. Identifiers and meta
  (`J2`, `since Dec 2025`). `.ref.cu` is the copper version for the one
  identifier that names the block.
- `.tag`: Archivo 13px on `--bg-2` with a `--line` border. Neutral
  categories, technologies.
- `.badge.ok|warn|bad|info`: mono 12px, status colour text on a 14% tint of
  itself, with a 6px dot. Status only; the dot keeps them readable without
  colour.

**Tables and lists**. `.table`: horizontal hairlines only, header row in the
mono label style, rows 10px padding, hover `--bg-2`, numbers right-aligned in
mono tabular figures, first and last columns flush with the container.
`.spec`: two-column datasheet table (mono label | value) for key-value facts.
`.list`: rows with a bold title, a truncated description and a mono meta on
the right, hover `--bg-2`. On phones, turn wide table rows into a 2-line grid
(see `.bom` in the portfolio) rather than scrolling sideways.

**Stat / KPI blocks** (`.kpis` > `.kpi`). One bordered strip on `--bg-2`, cells
divided by vertical hairlines, auto-fit min 180px. Each cell: mono label (with
an optional status badge on the right), value in condensed Archivo 700 36px
with the unit in small mono, and a mono delta line: `--ok` for good, `--bad`
for bad, `--fg-3` neutral. On the portfolio, figures go in a small "Ratings"
spec table instead; there are no billboard-sized numbers anywhere.

**Empty state** (`.empty`). Dashed `--line-2` border, 12px radius, centred: a
44px outline chip glyph in `--fg-3`, a condensed 20px title, one sentence in
`--fg-2` that says how to fill it (with the command in `<code>` if there is
one), and at most one secondary button.

**Toast** (`.toast`). Bottom centre, 6px radius, `--bg-2` fill, `--line-2`
border with a 3px left stripe in the status colour (`ok` default, `.warn`,
`.bad`, `.info`), `--shadow-pop`. First line bold mono (the subject: an
address, a service, an error code), second line plain sentence. One at a time,
`role="status"` `aria-live="polite"`, 3-4s, slides up 12px.

**Board drawing and serial panel** (portfolio). The hero board is an SVG on
`--mask` with a 16px dot grid, gold-ringed mounting holes, a black chip, copper
traces (5px, round joins, 45° bends only) and gold-edged pads with silkscreen
text. Terminal output goes in a `.serial` panel: `--mask-2`, silk text, a
green "LED" and the title in the bar, `>` prompts in copper. Tools may use the
serial panel for logs; they should not draw boards.

## Do / don't

Do
- Use one copper thing per view as the focal point: the primary button, the
  refdes of the current block, or one highlighted word.
- Label with refdes and mono uppercase labels; let condensed Archivo carry the
  headings.
- Use 45° angles and hairlines for any diagrams, dividers or connectors.
- Keep status colours for status, with a dot or word so they work without
  colour.
- Check both themes and a 390px-wide phone; check `prefers-reduced-motion`.
- Self-host fonts from `design/fonts/`.

Don't
- Set the name or a sentence in giant monospace, or use mono for body text.
- Use warm off-white paper backgrounds, near-black `#09090a`, film grain,
  starfields, gradients, glassmorphism or emoji.
- Add a live clock, a "role / at / now / local time" strip, a blinking cursor
  after a domain wordmark, or `// SECTION ———` headings.
- Make big-number "proof" strips on content pages.
- Use copper for errors or warnings, or a second accent colour.
- Round things beyond 12px (18px for board drawings), or use pills for buttons.
