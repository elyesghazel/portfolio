"""Build the elyesghazel.ch logo pack from JetBrains Mono outlines.

    uv run --no-project --with fonttools --with brotli --with resvg-py --with pillow \
        python design/logo/src/build.py

Writes svg/, png/ and web/ next to this folder, then copies web/ into the site's public/.
Every file is generated, edit the numbers here and rebuild instead of touching the output.
"""
import io
import json
import random
import shutil
from pathlib import Path

import resvg_py
from PIL import Image

from glyphs import text_path
from mark import ACCENT, ACCENT_LIGHT, BG, BG_LIGHT, INK, INK_LIGHT, tile, wordmark

ROOT = Path(__file__).resolve().parents[1]
SITE_PUBLIC = ROOT.parents[1] / "elyesghazel-site/public"

FAINT = "#8a8a8a"
FAINT_LIGHT = "#707070"
DIM = "#a6a6a6"

# The mark: "eg." with the period in the accent, pulled in so it sits like a full stop.
MARK = dict(text="eg", tail=".", weight=700, tail_kern=-0.42)
FILL = 0.72        # share of the tile the glyphs span at normal sizes
FILL_SMALL = 0.86  # 16-48 px: bigger glyphs, the tile edge matters less than the letters
FILL_SAFE = 0.56   # maskable / Android: everything inside the 80% safe circle
RADIUS = 0.12      # favicon.svg only, browsers show it unmasked


def png(svg: str, w: int, h: int | None = None) -> Image.Image:
    data = bytes(resvg_py.svg_to_bytes(svg_string=svg, width=w, height=h or w))
    return Image.open(io.BytesIO(data)).convert("RGBA")


def write(path: Path, data: str | bytes | Image.Image):
    path.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(data, Image.Image):
        data.save(path, optimize=True)
    elif isinstance(data, bytes):
        path.write_bytes(data)
    else:
        path.write_text(data)


def og_image() -> str:
    """1200x630 share card: starfield, the mark, the wordmark and one line about him."""
    w, h = 1200, 630
    rnd = random.Random(7)
    stars = "".join(
        f'<circle cx="{rnd.uniform(0, w):.0f}" cy="{rnd.uniform(0, h):.0f}" '
        f'r="{rnd.choice((0.8, 1, 1.2, 1.6))}" fill="#fff" opacity="{rnd.uniform(0.15, 0.6):.2f}"/>'
        for _ in range(90)
    )
    x = 96
    mark_size = 132
    mark = tile(**MARK, size=mark_size, fill=FILL).replace(
        "<svg ", f'<svg x="{x}" y="150" ', 1)
    label, _ = text_path("// SOFTWARE ENGINEER", 500, x, 352, 20, tracking=0.2)
    name, nw = text_path("elyesghazel", 650, x, 432, 64)
    tld, _ = text_path(".ch", 650, x + nw, 432, 64)
    line1, _ = text_path("Backends, web apps, custom hardware", 400, x, 492, 26)
    line2, _ = text_path("and the servers underneath.", 400, x, 530, 26)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
        f'<rect width="{w}" height="{h}" fill="{BG}"/>{stars}{mark}'
        f'<path fill="{FAINT}" d="{label}"/>'
        f'<path fill="{INK}" d="{name}"/><path fill="{FAINT}" d="{tld}"/>'
        f'<path fill="{DIM}" d="{line1}"/><path fill="{DIM}" d="{line2}"/>'
        f"</svg>"
    )


# Email signature. Plain HTML tables and inline styles, the only thing every mail client renders.
# The logo is hosted on the site; mailctl swaps the URL for an inline attachment when it sends.
SIGNATURE_LOGO = "https://elyesghazel.ch/email-mark.png"
SIGNATURES = {
    "de": ("Webseiten und Software · St. Gallen", "Freundliche Grüsse"),
    "en": ("Software engineer · Switzerland", "Best regards"),
}


def signature_html(tagline: str) -> str:
    font = "font-family:'JetBrains Mono',Menlo,Consolas,'Courier New',monospace;"
    return f"""<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;{font}font-size:13px;line-height:1.5;color:#2b2b2b;">
  <tr>
    <td style="padding:0 14px 0 0;vertical-align:top;">
      <a href="https://elyesghazel.ch" style="text-decoration:none;"><img src="{SIGNATURE_LOGO}" width="48" height="48" alt="eg." style="display:block;border:0;width:48px;height:48px;"></a>
    </td>
    <td style="padding:0 0 0 14px;vertical-align:top;border-left:1px solid #e3e3e3;">
      <div style="{font}font-size:14px;font-weight:bold;color:#0a0a0a;">Elyes Ghazel</div>
      <div style="{font}color:#707070;">{tagline}</div>
      <div style="{font}">
        <a href="https://elyesghazel.ch" style="color:#0a0a0a;text-decoration:none;">elyesghazel<span style="color:#a94848;">.ch</span></a>
        <span style="color:#c4c4c4;">&nbsp;/&nbsp;</span>
        <a href="mailto:elyes@elyesghazel.ch" style="color:#0a0a0a;text-decoration:none;">elyes@elyesghazel.ch</a>
      </div>
    </td>
  </tr>
</table>
"""


def signature_txt(tagline: str) -> str:
    return f"Elyes Ghazel\n{tagline}\nhttps://elyesghazel.ch / elyes@elyesghazel.ch\n"


def main():
    svg, out_png, web, mail = ROOT / "svg", ROOT / "png", ROOT / "web", ROOT / "email"
    for d in (svg, out_png, web, mail):
        shutil.rmtree(d, ignore_errors=True)

    # ---- svg: the sources other sites link or copy
    sources = {
        "mark.svg": tile(**MARK, fill=FILL),
        "mark-light.svg": tile(**MARK, fill=FILL, bg=BG_LIGHT, ink=INK_LIGHT, accent=ACCENT_LIGHT),
        "mark-on-dark.svg": tile(**MARK, fill=0.92, bg=None),
        "mark-on-light.svg": tile(**MARK, fill=0.92, bg=None, ink=INK_LIGHT, accent=ACCENT_LIGHT),
        "wordmark-on-dark.svg": wordmark(ink=INK, tail_color=FAINT),
        "wordmark-on-light.svg": wordmark(ink=INK_LIGHT, tail_color=FAINT_LIGHT),
        "og-image.svg": og_image(),
    }
    for name, s in sources.items():
        write(svg / name, s)

    # ---- png: the same at fixed sizes, for slides, profiles, chat avatars
    for px in (64, 128, 256, 512, 1024):
        write(out_png / f"mark-{px}.png", png(sources["mark.svg"], px))
        write(out_png / f"mark-light-{px}.png", png(sources["mark-light.svg"], px))
    for name in ("wordmark-on-dark", "wordmark-on-light"):
        s = sources[f"{name}.svg"]
        vw, vh = (float(v) for v in s.split('viewBox="0 0 ')[1].split('"')[0].split())
        for scale in (2, 4):
            write(out_png / f"{name}@{scale}x.png", png(s, round(vw * scale), round(vh * scale)))

    # ---- web: drop-in favicon set for a site's root
    write(web / "favicon.svg", tile(**MARK, fill=FILL_SMALL, radius=RADIUS))
    small = tile(**MARK, fill=FILL_SMALL)
    ico = [png(small, px) for px in (16, 32, 48)]
    ico[-1].save(web / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[:-1])
    write(web / "apple-touch-icon.png", png(tile(**MARK, fill=0.62), 180).convert("RGB"))
    write(web / "icon-192.png", png(tile(**MARK, fill=FILL), 192))
    write(web / "icon-512.png", png(tile(**MARK, fill=FILL), 512))
    write(web / "icon-maskable-512.png", png(tile(**MARK, fill=FILL_SAFE), 512))
    write(web / "og-image.png", png(sources["og-image.svg"], 1200, 630).convert("RGB"))
    write(web / "site.webmanifest", json.dumps({
        "name": "Elyes Ghazel",
        "short_name": "elyesghazel",
        "icons": [
            {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
            {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
        "theme_color": BG,
        "background_color": BG,
        "display": "browser",
    }, indent=2) + "\n")

    # ---- email: signature per language, plus a preview page with the greeting above it
    write(mail / "email-mark.png", png(tile(**MARK, fill=FILL_SMALL), 96))
    for lang, (tagline, greeting) in SIGNATURES.items():
        html = signature_html(tagline)
        write(mail / f"{lang}.html", html)
        write(mail / f"{lang}.txt", signature_txt(tagline))
        write(mail / f"preview-{lang}.html", (
            '<!doctype html><meta charset="utf-8"><title>signature</title>'
            '<body style="margin:40px;font:15px/1.5 -apple-system,Segoe UI,sans-serif;color:#222;background:#fff">'
            f"<p>{greeting}<br>Elyes Ghazel</p><br>"
            + html.replace(SIGNATURE_LOGO, "email-mark.png") + "</body>"))

    for f in web.iterdir():
        shutil.copy(f, SITE_PUBLIC / f.name)
    shutil.copy(mail / "email-mark.png", SITE_PUBLIC / "email-mark.png")

    for d in (svg, out_png, web, mail):
        print(d.relative_to(ROOT.parents[1]), len(list(d.iterdir())), "files")


if __name__ == "__main__":
    main()
