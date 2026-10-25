# صفحة هبوط سيليا (Selia Landing Page)

A Salla landing page bundle built from the Selia theme's sections. It is a Component Bundle with
`"features": ["landing-page-templates"]`, so merchants pick it from Sales channels > Landing pages.

- Partners Portal bundle: `78394996`
- Public previews: https://salla.design/preview/s/eh7svsy3mkb6/abaya-elegance and
  https://salla.design/preview/s/eh7svsy3mkb6/fashion-offers

## Sections

| Section | Folder | Notes |
|---|---|---|
| Animated text bar | `animated-text` | Looping offer text with an icon |
| Advanced slider | `advanced-slider` | Image or MP4 slides, separate phone media, fade or slide |
| Product card with quick buy | `product-hero` | Port of Selia's mini product card |
| Animated payment methods | `animated-payments` | The store's enabled payment methods, or custom logos |
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
- Sections are light DOM, size themselves by their container (the fixed sidebar layout gives them 2/3
  of the width), and use the store colors and font (`--color-primary`, `--font-main`).
- Outside a real landing page (demo, template previews), a product missing from the current store is
  loaded from the Selia preview store, so previews always show a product.

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
- `harness/landing.html?template=fashion-offers&mode=promotion`
- `layout=side-drawer` checks the drawer path, `layout=none` drops the fast checkout stand-in
- `harness/mobile.html?...` shows the same page in a 390px frame

The harness loads the store settings, Twilight and the bundles core from the CDN, and logs the
`open-checkout-drawer` event, the quantity handed to the checkout and the `Buy Now` analytics event.

## Templates, previews and marketplace images

1. Edit sections or template content in `scripts/build-manifest.mjs`, then run
   `node scripts/build-manifest.mjs`. It rewrites the components in `twilight-bundle.json` and the
   files in `templates/`, keeping the thumbnail and preview URLs that `tw-preview` saved.
2. `pnpm build && pnpm exec tw-preview` publishes the public preview (`salla login` first).
3. With the harness served, `scripts/capture.sh <dir>` renders full pages and one image per section.
4. `python3 scripts/compose-marketplace.py <dir> marketplace templates-thumbs` builds the listing
   screenshots, and `python3 scripts/make-icon.py marketplace/icon-512.png marketplace/icon-250.png`
   the icon.

Section editor images live in `public/assets/previews/`. They are served from the preview CDN, whose
URLs are content addressed, so `build-manifest.mjs` computes them from each file's SHA-256.

Listing copy for the Partners Portal is in `marketplace/LISTING.md`.
