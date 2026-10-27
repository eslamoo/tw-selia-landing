#!/bin/zsh
# Renders the template banners and the perfume grid shots into media/banners, from the Selia
# preview store's product photos (scripts/banners/banner.html holds the designs).
# Usage: scripts/make-banners.sh
set -e
ROOT=${0:A:h}
OUT="$ROOT/../media/banners"
WORK=$(mktemp -d)
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$OUT" "$WORK/src"
cp "$ROOT/banners/banner.html" "$WORK/banner.html"

P="https://cdn.salla.sa/gzRDg/products"
fetch() { curl -sf -o "$WORK/src/$1" "$2"; }
# Studio shots on white: flood the background from the corners to cut the product out
cutout() {
  magick "$WORK/src/$1" -alpha set -fuzz $3 -fill none \
    -draw "color 0,0 floodfill" -draw "color %[fx:w-1],0 floodfill" -draw "color 0,%[fx:h-1] floodfill" -draw "color %[fx:w-1],%[fx:h-1] floodfill" \
    -channel A -morphology Erode Disk:1 -blur 0x0.8 +channel -trim +repage "$WORK/src/$2"
}
fetch abaya-front.jpg "$P/kXM5IFalDSoAebmtgsNdJ9jITtUJTsKzFjYEolbT.jpg" && cutout abaya-front.jpg abaya-front.png 9%
fetch abaya-walk.jpg "$P/cGHtP4V7duXpTzEqxK8Qgz3PDofxKBZ8WzgWbO92.jpg" && cutout abaya-walk.jpg abaya-walk.png 9%
fetch abaya-side.jpg "$P/zubWcZ7SBRWbQfxGsmfiYtRKaYnMVkVKTVkXw8Iu.jpg" && cutout abaya-side.jpg abaya-side.png 9%
fetch abaya-full.jpg "$P/EH06n5OfsLU8tVlTJDY9voBu9uvHXaYnZ2Gazfao.jpg" && cutout abaya-full.jpg abaya-full.png 9%
fetch abaya-sleeve.jpg "$P/mzUxwSTjCJKXYa3Mm0WMHbXC07gtcyRB4Q2U3cUO.jpg"
fetch perfume-bottle.jpg "https://cdn.salla.sa/gzRDg/O72Psflq5nP7iVmXZLscbqqx2t69Tk0MXblswEkV.jpg" && cutout perfume-bottle.jpg perfume-bottle.png 4%
fetch perfume-box.jpg "https://cdn.salla.sa/gzRDg/wA1DDQxqozYlsjTOJ3U8v4tpbvY4Pyfw0nic5tVv.jpg" && cutout perfume-box.jpg perfume-box.png 4%
fetch perfume-spray.jpg "https://cdn.salla.sa/form-builder/D7RY5Fy70MiaPRXs2w0dxgjQNUbmlvJMqTvtYQaa.jpg"

render() { # id lang width height
  local name=$1-$2; [[ $2 == none ]] && name=$1
  "$CH" --headless=new --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1.5 \
    --window-size=$3,$4 --virtual-time-budget=8000 --screenshot="$WORK/$name.png" "file://$WORK/banner.html?id=$1&lang=$2" >/dev/null 2>&1
  magick "$WORK/$name.png" -strip -quality 84 "$OUT/$name.jpg"
  echo "$OUT/$name.jpg"
}
for lang in ar en; do
  for id in abaya-d1 abaya-d2 perfume-d1 perfume-d2; do render $id $lang 1200 600; done
  for id in abaya-t1 abaya-t2 abaya-t3 perfume-t1 perfume-t2 perfume-t3; do render $id $lang 1200 900; done
done
render perfume-g1 none 1000 1000
render perfume-g2 none 1200 600
render perfume-g3 none 800 800
render perfume-g4 none 800 800
render perfume-g5 none 600 1200
rm -rf "$WORK"
