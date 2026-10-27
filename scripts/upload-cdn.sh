#!/bin/zsh
# Uploads the section previews, template banners and listing screenshots to Selia's CDN (R2 bucket
# selia-videos, cdn.selia-tech.com) under content-addressed names and records their URLs in
# scripts/cdn-assets.json, which scripts/build-manifest.mjs reads. Images stay out of git (media/).
# Needs a logged-in wrangler; set WRANGLER to use a local binary.
set -e
ROOT=${0:A:h:h}
WRANGLER=${WRANGLER:-npx --yes wrangler}
entries=()
for f in "$ROOT"/media/previews/*.jpg "$ROOT"/media/banners/*.jpg "$ROOT"/marketplace/*.jpg; do
  dir=${f:h:t}
  sha=$(shasum -a 256 "$f" | cut -c1-8)
  case $dir in
    previews) key="images/selia-landing/${f:t:r}-$sha.jpg" ;;
    *) key="images/selia-landing/$dir/${f:t:r}-$sha.jpg" ;;
  esac
  if ! curl -sfI "https://cdn.selia-tech.com/$key" >/dev/null; then
    ${=WRANGLER} r2 object put "selia-videos/$key" --file "$f" --content-type image/jpeg \
      --cache-control "public, max-age=31536000, immutable" --remote >/dev/null
    echo "uploaded $key"
  fi
  entries+=("  \"$dir/${f:t}\": \"https://cdn.selia-tech.com/$key\"")
done
print -r -- "{" > "$ROOT/scripts/cdn-assets.json"
print -r -- "${(pj:,\n:)entries}" >> "$ROOT/scripts/cdn-assets.json"
print -r -- "}" >> "$ROOT/scripts/cdn-assets.json"
