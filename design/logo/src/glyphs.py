"""Turn JetBrains Mono glyphs into SVG path data, so the logo never needs the font."""
from functools import lru_cache
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONT = Path(__file__).resolve().parents[2] / "fonts/jetbrains-mono-latin-wght-normal.woff2"


@lru_cache
def font(weight: int) -> TTFont:
    return instantiateVariableFont(TTFont(FONT), {"wght": weight})


def metrics(weight: int):
    f = font(weight)
    os2 = f["OS/2"]
    return {
        "upm": f["head"].unitsPerEm,
        "adv": f["hmtx"]["a"][0],
        "xh": os2.sxHeight,
        "cap": os2.sCapHeight,
        "desc": os2.sTypoDescender,
    }


def text_path(text: str, weight: int, x: float, baseline: float, size: float,
              tracking: float = 0.0) -> tuple[str, float]:
    """Path data for `text` with its baseline at (x, baseline), font size `size`. Returns (d, width).

    `tracking` is extra space after each glyph, in em, like CSS letter-spacing."""
    f = font(weight)
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    scale = size / f["head"].unitsPerEm
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    cx = x
    for ch in text:
        name = cmap[ord(ch)]
        gs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, cx, baseline)))
        cx += gs[name].width * scale + tracking * size
    return pen.getCommands(), cx - x


def bounds(text: str, weight: int):
    """Ink bounds (xMin, yMin, xMax, yMax) in font units of the text run, origin at first glyph."""
    from fontTools.pens.boundsPen import BoundsPen

    f = font(weight)
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    bp = BoundsPen(gs)
    cx = 0
    for ch in text:
        name = cmap[ord(ch)]
        gs[name].draw(TransformPen(bp, (1, 0, 0, 1, cx, 0)))
        cx += gs[name].width
    return bp.bounds
