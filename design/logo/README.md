# Logo pack

`eg.` - lowercase monogram in JetBrains Mono Bold, the period in the accent.
Everything here is generated from the font outlines by `src/build.py`, so no
file needs the font installed. Change the numbers there and rebuild, never
edit the output by hand.

```sh
uv run --no-project --with fonttools --with brotli --with resvg-py --with pillow \
  python design/logo/src/build.py
```

The build also copies `web/` and `email/email-mark.png` into `elyesghazel-site/public/`.
mailctl reads its own copy of `email/` from `~/dotfiles/mail/.config/mailctl/signatures/elyes/`,
so copy it over after changing the signature.

## What is where

| file | use |
|---|---|
| `svg/mark.svg`, `svg/mark-light.svg` | the square icon, dark and light |
| `svg/mark-on-dark.svg`, `svg/mark-on-light.svg` | just the letters, transparent, for placing on your own background |
| `svg/wordmark-on-dark.svg`, `svg/wordmark-on-light.svg` | `elyesghazel.ch` as outlines, `.ch` in faint |
| `svg/og-image.svg` | source of the share card |
| `png/mark-*.png` | square icon at 64 to 1024 px, for profiles, slides, chat avatars |
| `png/wordmark-*@2x.png`, `@4x` | wordmark raster |
| `email/` | signature: `de`/`en` as `.html` (paste into a mail client) and `.txt`, the 96 px logo, previews |
| `web/` | favicon set for a site root: `favicon.ico` (16/32/48), `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-512.png`, `site.webmanifest`, `og-image.png` |

For another site, copy `web/` to its root and put this in the `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

## Rules

- The dot is the only colour. Never colour the letters, never put the mark on
  the accent.
- Keep the tile square. Only `favicon.svg` has rounded corners, because tabs
  show it unmasked. iOS and Android round the others themselves.
- Small sizes (16 to 48 px) use bigger letters (`FILL_SMALL`), maskable icons
  smaller ones so Android's circle crop never cuts them (`FILL_SAFE`).
- No outlines, shadows, gradients, or a blinking cursor next to it.
