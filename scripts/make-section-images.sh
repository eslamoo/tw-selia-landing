#!/bin/zsh
# Renders one editor preview per section in a neutral frame (scripts/sections/frame.html) from
# section captures. Run scripts/capture.sh <dir> first, then scripts/upload-cdn.sh to publish.
# Usage: scripts/make-section-images.sh <capture-dir>
set -e
CAP=${1:?capture dir}
ROOT=${0:A:h}
OUT=${0:A:h:h}/public/assets/previews
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WORK="$CAP/sections"
mkdir -p "$WORK/src"
cp "$ROOT/sections/frame.html" "$WORK/frame.html"
cp "$CAP"/section-*.png "$WORK/src/"
for f in "$WORK"/src/section-*.png; do
  name=${${f:t:r}#section-}
  "$CH" --headless=new --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=2 \
    --window-size=1200,800 --virtual-time-budget=5000 --screenshot="$WORK/$name.png" "file://$WORK/frame.html?name=$name" >/dev/null 2>&1
  magick "$WORK/$name.png" -resize 1200x800 -strip -quality 86 "$OUT/$name.jpg"
  echo "$OUT/$name.jpg $(( $(stat -f %z "$OUT/$name.jpg") / 1024 ))KB"
done
