# صفحة هبوط سيليا (Selia Landing Page)

A Salla landing page bundle built from the Selia theme's sections. It is a Component Bundle with
`"features": ["landing-page-templates"]`, so merchants pick it from Sales channels > Landing pages.

- Partners Portal bundle: `78394996`
- Public previews: https://salla.design/preview/s/eh7svsy3mkb6/abaya-elegance and
  https://salla.design/preview/s/eh7svsy3mkb6/perfume-signature
- Templates: `abaya-elegance` (default, light) and `perfume-signature` (dark). Each sells one product, and
  every section, from the slider to the FAQ, talks about that product. Both use all 11 sections, with
  banners designed for their product.

## Sections

| Section | Folder | Notes |
|---|---|---|
| Page header | `page-header` | Store logo, dark logo, transparent over the slider, sticky, light/dark switch |
| Animated text bar | `animated-text` | Selia's announcement bar: each copy slides by its own width, 7s by default |
| Advanced slider | `advanced-slider` | Selia's advanced slider: image or MP4 slides, phone media, auto height, Ken Burns |
| Product card with quick buy | `product-hero` | Port of Selia's mini product card, swipeable images |
| Animated payment methods | `animated-payments` | Selia's animated brands cards with a reversed second row: store payment methods or custom logos |
| Features | `features` | Icon or image cards |
| Double banner | `double-banner` | Display only |
| Three banners | `three-banners` | Display only, optional equal height |
| Images grid | `images-grid` | Selia's five image grid |
| Customer reviews | `custom-reviews` | Carousel with stars and initials |
| FAQ | `faq` | Accordion, one or two columns |

## How it behaves on a landing page

- The renderer passes the whole component wrapper as `config` (`{ component: {...}, key, path, ... }`),
  with `{ ar, en }` text and `prefix.field` keys in lists. Every section reads settings through
  `src/utils/config.ts`, which handles both that shape and the flat demo shape.
- Product pages: the product card shows the page's own product (`theme.settings.product`), and every
  call to action opens the page's fast checkout: scroll to it on desktop, the checkout drawer on phones
  and in the drawer layout. The chosen quantity is passed to the checkout.
- Promotion pages: there is no fast checkout, so calls to action follow the page's main button link.
  The product card shows the product picked in its own settings.
- Banners never link away, so shoppers stay on the page.
- Light and dark mode: the header's switch puts `slp-mode-dark` or `slp-mode-light` on `<html>` and remembers
  the shopper's choice (only while the merchant's default mode is unchanged). Sections set to "page mode"
  follow it; without a header they follow the visitor's device. Sections can also stay light or dark.
  Salla's own blocks, such as fast checkout, keep their colors. A header without a dark logo shows the
  store logo in white on dark and over the slider.
- Sticky and the transparent overlap are applied to the section's outermost box: the section itself on a
  real page, or the `.component-card` wrapper in the editor and salla.design previews, whose 60px minimum
  height is reset for filled sections.
- Sections are light DOM, size themselves by their container (the fixed sidebar layout gives them 2/3
  of the width), and use the store colors and font (`--color-primary`, `--font-main`).
- Outside a real landing page (demo, template previews), a product missing from the current store is
  loaded from the Selia preview store, and the header shows that store's logo instead of the demo store's
  (Salla's) logo.

## Develop

```bash
pnpm install
pnpm dev     # demo at http://localhost:5173/node_modules/.salla-temp/index.html
pnpm build   # dist/ is committed: the Partners Portal publishes from the GitHub branch
```

## Test like a real landing page

```bash
pnpm build
python3 -m http.server 5191 --bind 127.0.0.1
```

- `harness/landing.html?template=abaya-elegance&mode=product&layout=inline-block`
- `harness/landing.html?template=perfume-signature&product=623859566` and `?template=abaya-elegance&mode=promotion`
- `layout=side-drawer` checks the drawer path, `layout=none` drops the fast checkout stand-in
- `harness/mobile.html?...` shows the same page in a 390px frame
- `scheme=light|dark|auto` forces a color scheme on every section
- `pagemode=light|dark` starts the page as if the shopper used the header's switch
- `cards=1` wraps sections like the editor and salla.design previews; `landing=0` runs them as the demo does
- `offsets=1` writes each section's position to `<body data-offsets>` after load

The harness loads the store settings, Twilight and the bundles core from the CDN, and logs the
`open-checkout-drawer` event, the quantity handed to the checkout and the `Buy Now` analytics event.

## Templates, previews and marketplace images

1. Edit sections or template content in `scripts/build-manifest.mjs`, then run
   `node scripts/build-manifest.mjs`. It rewrites the components in `twilight-bundle.json` and the
   files in `templates/`, keeping the thumbnail and preview URLs that `tw-preview` saved.
2. `pnpm build && pnpm exec tw-preview` publishes the public preview (`salla login` first).
3. With the harness served, `scripts/capture.sh <dir>` renders full pages and one image per section.
4. `scripts/make-marketplace.sh <dir>` builds the listing screenshots: realistic iPhone and MacBook frames
   drawn in CSS (`scripts/mockups/scene.html`) around crops of those captures, rendered by headless Chrome
   at 2x. Crop offsets are where each section starts in the capture.
   The bundle icon is the Selia theme's portal icon (the سيليا THEME logo), uploaded in the portal.
5. `scripts/make-banners.sh` renders the template banners and the perfume grid shots
   (`scripts/banners/banner.html`) into `media/banners`, in Arabic and English, from the preview
   store's product photos. They are served from cdn.selia-tech.com.
6. Template thumbnails (`templates-thumbs/`) are the top 768x1195 of each full desktop capture. Run
   `RESET_THUMBS=1 node scripts/build-manifest.mjs` before `tw-preview` so it uploads new ones.

Section images (the `image` of each component, shown in the marketplace and the editor) live in
`media/previews/`. `scripts/make-section-images.sh <dir>` renders them from the section captures
in one neutral frame (`scripts/sections/frame.html`). `scripts/upload-cdn.sh` uploads them, the template
banners and the listing screenshots to cdn.selia-tech.com (R2 bucket `selia-videos`, wrangler logged in)
as `<name>-<sha256 prefix>.jpg`, so a new render never hits a stale cache, and records the URLs in
`scripts/cdn-assets.json` for `build-manifest.mjs`. Upload before building the manifest.

No image is committed: `media/`, `templates-thumbs/` and the listing screenshots are gitignored, so the
GitHub archive Salla publishes stays well under its 1 MB limit.

Listing copy for the Partners Portal is in `marketplace/LISTING.md`.
