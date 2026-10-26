#!/bin/zsh
# Renders the harness with headless Chrome: full desktop and phone pages per template, plus one
# editor preview per section. Needs `pnpm build` first and the repo served on port 5191:
#   python3 -m http.server 5191 --bind 127.0.0.1
# Usage: scripts/capture.sh <out-dir>
set -e
OUT=${1:-captures}
BASE="http://127.0.0.1:5191/harness"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FLAGS=(--headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion --virtual-time-budget=40000)
mkdir -p "$OUT"

trim() { magick "$1" -define trim:edges=south -fuzz 1% -trim +repage "$1"; }

desktop() { # name template window-height [extra query]
  "$CH" $FLAGS --force-device-scale-factor=2 --window-size=1440,$3 --screenshot="$OUT/$1-desktop.png" \
    "$BASE/landing.html?mode=product&layout=none&clean=1&template=$2&vh=900$4" >/dev/null 2>&1
  trim "$OUT/$1-desktop.png"
}

mobile() { # name template frame-height [extra query]
  "$CH" $FLAGS --force-device-scale-factor=3 --window-size=800,$3 --screenshot="$OUT/$1-mobile.png" \
    "$BASE/mobile.html?bare=1&h=$3&mode=product&layout=none&clean=1&template=$2&vh=844$4" >/dev/null 2>&1
  magick "$OUT/$1-mobile.png" -crop 1170x+0+0 +repage "$OUT/$1-mobile.png"
  trim "$OUT/$1-mobile.png"
}

section() { # component template window-height [extra query]
  "$CH" $FLAGS --force-device-scale-factor=2 --window-size=1440,$3 --screenshot="$OUT/section-$1.png" \
    "$BASE/landing.html?mode=product&layout=none&clean=1&template=$2&vh=900&only=$1&scheme=light$4" >/dev/null 2>&1
  trim "$OUT/section-$1.png"
}

ABAYA="&product=1287502680"
PERFUME="&product=623859566"
desktop t1 abaya-elegance 6400 "$ABAYA"
desktop t1-dark abaya-elegance 6400 "$ABAYA&pagemode=dark"
desktop t2 perfume-signature 6400 "$PERFUME"
desktop t2-light perfume-signature 6400 "$PERFUME&pagemode=light"
mobile t1 abaya-elegance 7400 "$ABAYA"
mobile t1-dark abaya-elegance 7400 "$ABAYA&pagemode=dark"
mobile t2 perfume-signature 7400 "$PERFUME"

section page-header perfume-signature 300 "$PERFUME&landing=0"
section animated-text abaya-elegance 300 "$ABAYA"
section advanced-slider perfume-signature 1000 "$PERFUME"
section product-hero abaya-elegance 1400 "$ABAYA"
section animated-payments abaya-elegance 500 "$ABAYA"
section features abaya-elegance 600 "$ABAYA"
section images-grid abaya-elegance 900 "$ABAYA"
section custom-reviews abaya-elegance 700 "$ABAYA"
section faq abaya-elegance 800 "$ABAYA"
section double-banner abaya-elegance 500 "$ABAYA"
section three-banners abaya-elegance 600 "$ABAYA"

ls -1 "$OUT"
