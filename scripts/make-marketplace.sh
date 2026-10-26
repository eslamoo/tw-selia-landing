#!/bin/zsh
# Builds the Themes Marketplace screenshots: device mockups (scripts/mockups/scene.html) around real
# page captures. Run scripts/capture.sh <dir> first.
# Usage: scripts/make-marketplace.sh <capture-dir> [out-dir]
set -e
CAP=${1:?capture dir}
OUT=${2:-marketplace}
ROOT=${0:A:h}
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WORK="$CAP/mockups"
mkdir -p "$WORK/screens" "$OUT"
cp "$ROOT/mockups/scene.html" "$WORK/scene.html"

# Desktop captures are 2x (1440 css wide), phone captures 3x (390 css wide); offsets are css pixels
# crop <src> <width> <height> <scale> <css-offset> <out>: the offset is clamped so the crop never runs off the page
crop() {
  local max=$(( $(magick identify -format %h "$1") - $3 ))
  local y=$(( $5 * $4 )); (( y > max )) && y=$max
  magick "$1" -crop ${2}x${3}+0+$y +repage "$6"
}
desk() { crop "$CAP/$2-desktop.png" 2880 1800 2 $3 "$WORK/screens/$1.png"; }
# Phone crops leave out the 47px status bar, which the mockup draws
phone() { crop "$CAP/$2-mobile.png" 1170 2391 3 $3 "$WORK/screens/$1.png"; }

desk d-abaya-top t1 0
desk d-abaya-product t1 790
desk d-abaya-banners t1 1940
desk d-perfume-top t2 0
phone m-abaya-top t1 0
phone m-abaya-product t1 812
phone m-abaya-product-dark t1-dark 812
phone m-abaya-faq t1 5520
phone m-perfume-top t2 0
phone m-perfume-product t2 828
phone m-perfume-banners t2 1690

names=(01-abaya-template 02-product-quick-buy 03-perfume-template 04-light-dark 05-banners 06-mobile-first)
for i in {1..6}; do
  "$CH" --headless=new --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=2 \
    --window-size=1600,1200 --virtual-time-budget=5000 --screenshot="$WORK/scene-$i.png" "file://$WORK/scene.html?scene=$i" >/dev/null 2>&1
  magick "$WORK/scene-$i.png" -resize 1600x1200 -strip -quality 90 "$OUT/${names[$i]}.jpg"
  echo "$OUT/${names[$i]}.jpg"
done
