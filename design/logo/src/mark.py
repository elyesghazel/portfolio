"""The mark: lowercase monogram in JetBrains Mono, with an optional accent-coloured period."""
from glyphs import bounds, font, text_path

INK = "#ffffff"
BG = "#000000"
ACCENT = "#c47070"
# Light theme values from tokens.css
INK_LIGHT = "#0a0a0a"
BG_LIGHT = "#fafafa"
ACCENT_LIGHT = "#a94848"


def glyph_run(text: str, accent_tail: str, weight: int, box: float, fill: float,
              ink: str, accent: str, cx: float, cy: float, center_on: str = "ink",
              tail_kern: float = 0.0) -> str:
    """Paths for `text` + `accent_tail`, scaled so the run's ink width is `fill` * box, centred on (cx, cy)."""
    full = text + accent_tail
    upm = font(weight)["head"].unitsPerEm
    kern = tail_kern * font(weight)["hmtx"]["a"][0] if accent_tail else 0
    x0, y0, x1, y1 = bounds(full, weight)
    x1 += kern
    size = fill * box * upm / (x1 - x0)
    s = size / upm
    if center_on == "xheight":
        # centre on the x-height band so descenders hang like they do in text
        xh = font(weight)["OS/2"].sxHeight
        mid_y = xh / 2
    elif center_on == "optical":
        # halfway between the two: the x-height band carries the weight, the g tail still counts
        mid_y = ((y0 + y1) / 2 + font(weight)["OS/2"].sxHeight / 2) / 2
    else:
        mid_y = (y0 + y1) / 2
    left = cx - (x0 + x1) / 2 * s
    baseline = cy + mid_y * s
    d_main, w = text_path(text, weight, left, baseline, size)
    out = f'<path fill="{ink}" d="{d_main}"/>'
    if accent_tail:
        d_tail, _ = text_path(accent_tail, weight, left + w + kern * s, baseline, size)
        out += f'<path fill="{accent}" d="{d_tail}"/>'
    return out


def tile(text="eg", tail="", weight=700, size=512, fill=0.62, radius=0.0,
         bg=BG, ink=INK, accent=ACCENT, center_on="optical", pad=0.0, tail_kern=0.0) -> str:
    """Square icon. `pad` shrinks the tile inside the canvas (maskable/apple need full bleed: pad=0)."""
    inner = size * (1 - 2 * pad)
    o = size * pad
    rect = f'<rect x="{o:g}" y="{o:g}" width="{inner:g}" height="{inner:g}" rx="{radius * inner:g}" fill="{bg}"/>' if bg else ""
    run = glyph_run(text, tail, weight, inner, fill, ink, accent, size / 2, size / 2, center_on, tail_kern)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">'
            f"{rect}{run}</svg>")


def wordmark(name="elyesghazel", tld=".ch", weight=500, size=96, ink=INK, tail_color="#8a8a8a",
             bg=None, padx=0.0, pady=0.0) -> str:
    """Text wordmark like the site header: name in ink, .ch in faint. Tight to ink bounds plus padding."""
    f = font(weight)
    upm = f["head"].unitsPerEm
    s = size / upm
    full = name + tld
    x0, _, x1, _ = bounds(full, weight)
    asc = f["OS/2"].sCapHeight  # ascenders of l/h sit near cap height
    desc = -f["OS/2"].sTypoDescender
    w = (x1 - x0) * s + 2 * padx
    h = (asc + desc) * s + 2 * pady
    left = padx - x0 * s
    baseline = pady + asc * s
    d1, wd = text_path(name, weight, left, baseline, size)
    d2, _ = text_path(tld, weight, left + wd, baseline, size)
    rect = f'<rect width="{w:.1f}" height="{h:.1f}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" width="{w:.0f}" height="{h:.0f}">'
            f'{rect}<path fill="{ink}" d="{d1}"/><path fill="{tail_color}" d="{d2}"/></svg>')
