#!/bin/zsh
# Uploads the section previews to Selia's CDN (R2 bucket selia-videos, cdn.selia-tech.com) under
# content-addressed names, the same names scripts/build-manifest.mjs writes into twilight-bundle.json.
# Needs a logged-in wrangler; set WRANGLER to use a local binary.
set -e
ROOT=${0:A:h:h}
WRANGLER=${WRANGLER:-npx --yes wrangler}
for f in "$ROOT"/public/assets/previews/*.jpg; do
  key="images/selia-landing/${f:t:r}-$(shasum -a 256 "$f" | cut -c1-8).jpg"
  ${=WRANGLER} r2 object put "selia-videos/$key" --file "$f" --content-type image/jpeg \
    --cache-control "public, max-age=31536000, immutable" --remote >/dev/null
  echo "https://cdn.selia-tech.com/$key"
done
