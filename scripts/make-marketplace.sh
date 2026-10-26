#!/bin/zsh
# Builds the Themes Marketplace screenshots: realistic iPhone and MacBook frames (scripts/mockups/scene.html)
# around real page captures. Run scripts/capture.sh <dir> first.
# Usage: scripts/make-marketplace.sh <capture-dir> [out-dir]
set -e
CAP=${1:?capture dir}
OUT=${2:-marketplace}
ROOT=${0:A:h}
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WORK="$CAP/mockups"
mkdir -p "$WORK/screens" "$OUT"
cp "$ROOT/mockups/scene.html" "$WORK/scene.html"

# Desktop captures are 2x (1440 css wide), phone captures 3x (390 css wide); offsets are css pixels where each
# section starts in the capture, which can sit a little lower than in a browser window.
# Crops match the screen areas: MacBook below the notch row, iPhone below the status bar.
crop() { # <src> <width> <height> <scale> <css-offset> <out>, clamped to the page bottom
  local max=$(( $(magick identify -format %h "$1") - $3 ))
  local y=$(( $5 * $4 )); (( y > max )) && y=$max
  magick "$1" -crop ${2}x${3}+0+$y +repage "$6"
}
desk() { crop "$CAP/$2-desktop.png" 2880 1807 2 $3 "$WORK/screens/$1.png"; }
phone() { crop "$CAP/$2-mobile.png" 1170 2388 3 $3 "$WORK/screens/$1.png"; }

desk d-abaya-top t1 0
desk d-abaya-banners t1 1977
desk d-perfume-top t2 0
phone m-abaya-top t1 0
phone m-abaya-product t1 786
phone m-abaya-product-dark t1-dark 786
phone m-abaya-banners t1 1707
phone m-abaya-three t1 2920
phone m-perfume-top t2 0
phone m-perfume-product t2 806
phone m-perfume-reviews t2 4722

# The phone status bar takes the color of the top of each crop
{ echo -n "window.SB = {"; for f in "$WORK"/screens/m-*.png; do echo -n "\"${f:t}\": \"#$(magick "$f" -format '%[hex:p{6,12}]' info: | cut -c1-6)\", "; done; echo "};"; } > "$WORK/screens/colors.js"

names=(01-abaya-template 02-perfume-template 03-abaya-sections 04-light-dark 05-banners 06-perfume-sections)
for i in {1..6}; do
  "$CH" --headless=new --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=2 \
    --window-size=1600,1200 --virtual-time-budget=8000 --screenshot="$WORK/scene-$i.png" "file://$WORK/scene.html?scene=$i" >/dev/null 2>&1
  # The portal rejects screenshots over 200 KB
  magick "$WORK/scene-$i.png" -resize 1600x1200 -strip -define jpeg:extent=195kb "$OUT/${names[$i]}.jpg"
  echo "$OUT/${names[$i]}.jpg $(( $(stat -f %z "$OUT/${names[$i]}.jpg") / 1024 ))KB"
done
