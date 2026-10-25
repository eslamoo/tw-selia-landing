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

desktop() { # name template mode window-height
  "$CH" $FLAGS --force-device-scale-factor=2 --window-size=1440,$4 --screenshot="$OUT/$1-desktop.png" \
    "$BASE/landing.html?mode=$3&layout=none&clean=1&template=$2&vh=900" >/dev/null 2>&1
  trim "$OUT/$1-desktop.png"
}

mobile() { # name template mode frame-height
  "$CH" $FLAGS --force-device-scale-factor=3 --window-size=800,$4 --screenshot="$OUT/$1-mobile.png" \
    "$BASE/mobile.html?bare=1&h=$4&mode=$3&layout=none&clean=1&template=$2&vh=844" >/dev/null 2>&1
  magick "$OUT/$1-mobile.png" -crop 1170x+0+0 +repage "$OUT/$1-mobile.png"
  trim "$OUT/$1-mobile.png"
}

section() { # component template mode window-height
  "$CH" $FLAGS --window-size=1440,$4 --screenshot="$OUT/section-$1.png" \
    "$BASE/landing.html?mode=$3&layout=none&clean=1&template=$2&vh=900&only=$1&scheme=light" >/dev/null 2>&1
  trim "$OUT/section-$1.png"
}

desktop t1 abaya-elegance product 4600
desktop t2 fashion-offers promotion 5600
mobile t1 abaya-elegance product 4400
mobile t2 fashion-offers promotion 4800

section page-header abaya-elegance product 300
section animated-text abaya-elegance product 300
section advanced-slider fashion-offers promotion 1000
section product-hero abaya-elegance product 1400
section animated-payments abaya-elegance product 500
section features abaya-elegance product 600
section double-banner fashion-offers promotion 500
section three-banners fashion-offers promotion 700
section images-grid fashion-offers promotion 900
section custom-reviews abaya-elegance product 700
section faq abaya-elegance product 700

ls -1 "$OUT"
