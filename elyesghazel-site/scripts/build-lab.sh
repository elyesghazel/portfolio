#!/usr/bin/env sh
# Build a preview for the lab hub, served under a subpath:
#   scripts/build-lab.sh /portfolio/redesign-v3/
# Production is a plain `pnpm build` at "/" and is not affected.
set -eu
cd "$(dirname "$0")/.."
BASE="${1:-/portfolio/redesign-v3/}"
OUT=dist-lab

rm -rf "$OUT"
pnpm exec tsc -b
pnpm exec vite build --base="$BASE" --outDir "$OUT" --emptyOutDir

# No server-side fallback there, so every route gets its own index.html.
route() { mkdir -p "$OUT/$1" && cp "$OUT/index.html" "$OUT/$1/index.html"; }
route blog
for f in src/markdown/projects/*.md; do route "projects/$(basename "$f" .md)"; done
for f in src/markdown/posts/*.md; do route "blog/$(basename "$f" .md)"; done

# The shared design kit rides along at <base>design/kit.html.
mkdir -p "$OUT/design"
cp -r ../design/. "$OUT/design/"
cp ../DESIGN.md "$OUT/design/DESIGN.md" 2>/dev/null || true
echo "built $OUT for $BASE"
