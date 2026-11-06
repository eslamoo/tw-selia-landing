# Listing pack: صفحة هبوط سيليا

Everything the Partners Portal asks for in "Complete publication", plus what is still open.

## Name

- AR: صفحة هبوط سيليا
- EN: Selia Landing Page

## Description

The portal has no description field for bundles: the description lives only in `twilight-bundle.json`, and a
portal settings save (icon, name, support) rewrites it to null, so restore it after any portal save.

**AR (short):** صفحة هبوط مستوحاة من عناصر ثيم سيليا الشهير

**AR (long):**
صفحة هبوط سيليا ✨ بنفس عناصر ثيم سيليا وتصميمه، لصفحات الهبوط في سلة.
تضم 11 عنصر: رأس صفحة بشعار متجرك، شريط إعلاني متحرك، سلايدر متقدم يدعم الفيديو، منتج مفصل مع الشراء السريع، وسائل الدفع المتحركة، مميزات متقدمة، بانر مزدوج، بانر ثلاثي، شبكة صور، آراء العملاء، والأسئلة الشائعة.
قالبين جاهزين للعبايات والعطور بكل العناصر مع بانرات مصممة لكل منتج، ودعم كامل للوضع الداكن والفاتح، ونفس أشكال عناوين ثيم سيليا.
في صفحة المنتج تفتح الأزرار الشراء السريع مباشرة مع الكمية المختارة، وفي صفحة العروض توجّه للرابط الذي تحدده.
كل النصوص قابلة للتعديل بالعربي والإنجليزي، والألوان تتبع ألوان متجرك، والتصميم متوافق مع الجوال.

**EN (short):** A landing page inspired by the components of the popular Selia theme

**EN (long):**
Selia Landing Page ✨ brings the Selia theme's sections and design to Salla landing pages.
11 sections: a header with your store logo, an animated text bar, an advanced slider with video support, product details with quick buy, animated payment methods, advanced features, double banner, three banners, images grid, customer reviews and FAQ.
Two ready templates for abayas and perfumes using every section, with banners designed for each product, full dark and light mode support, and the same title styles as the Selia theme.
On product pages the buttons open quick checkout with the chosen quantity; on promotion pages they go to the link you set.
Every text is editable in Arabic and English, colors follow your store, and the design is mobile friendly.

## Screenshots (upload in this order)

Salla rejected the first set (portal note: design the images and give them fitting titles and descriptions,
and show the landing page feature). The portal allows at most 6 images and the bundle has 11 blocks, so
image 1 is the cover, image 2 is the landing page feature, and images 3 to 6 each show 2 or 3 blocks, every
block as its own device screen or card. Real captures of one template per image (never abaya and perfume in
the same image) on the Selia dark background, 1600x1200, under 200 KB, no added text or logos. Titles are at
most 30 characters and descriptions at most 100.

| File | Blocks | Title AR | Title EN | Description AR | Description EN |
|---|---|---|---|---|---|
| `01-overview.jpg` | cover, abaya | مجموعة سيليا لصفحات الهبوط | Selia landing page blocks | ابنِ صفحة هبوط احترافية لمنتجك بـ 11 عنصر من عناصر سيليا ✨ | Build a professional landing page for your product with 11 Selia blocks ✨ |
| `02-landing-page.jpg` | full page, abaya light, dark and mobile | صفحة هبوط كاملة لمنتج واحد | Full landing page per product | قالبين جاهزين للعبايات والعطور، كل قالب صفحة كاملة لمنتج واحد مع الشراء السريع | 2 ready templates for abayas and perfumes, each a full page for one product with quick buy |
| `03-header-bar-slider.jpg` | page-header, animated-text, advanced-slider (perfume) | رأس الصفحة والشريط والسلايدر | Header, text bar and slider | رأس صفحة بشعار متجرك وزر الوضع الداكن، وشريط إعلاني متحرك، وسلايدر صور وفيديو | Header with your logo and dark mode switch, a moving announcement bar and an image and video slider |
| `04-product-features-payments.jpg` | product-hero, features, animated-payments (abaya) | المنتج والمميزات ووسائل الدفع | Product, features and payments | اعرض منتجك بصوره وسعره وزر الشراء السريع، مع مميزات المنتج ووسائل الدفع المتحركة | Your product with images, price and quick buy, plus its features and moving payment methods |
| `05-banners-grid.jpg` | double-banner, three-banners, images-grid (perfume) | بانر مزدوج وثلاثي وشبكة صور | 2 and 3 banners, image grid | بانر مزدوج وبانر ثلاثي بنسخة عربية وإنجليزية لكل بانر، وشبكة صور تعرض منتجك من قرب | Double and triple banners in Arabic and English, and an image grid that shows your product up close |
| `06-reviews-faq.jpg` | custom-reviews, faq (abaya light and dark) | آراء العملاء والأسئلة الشائعة | Customer reviews and FAQ | آراء عملائك بالتقييم والنجوم، وأسئلة شائعة تفتح بضغطة، بالوضع الفاتح والداكن | Customer reviews with star ratings and expandable FAQ, in light and dark mode |

Icon: the same سيليا THEME logo the Selia theme uses in the portal.

The screenshot files are not in git: they are on cdn.selia-tech.com under
`images/selia-landing/marketplace/` (URLs in `scripts/cdn-assets.json`) and in the portal.

## Support details

| Field | Value |
|---|---|
| Support email | support@selia-tech.com (same as the Selia theme) |
| Support website | https://selia-tech.com/ (same as the Selia theme) |
| Support phone | 201037350539 (same as the Selia theme) |
| Live chat | https://wa.me/201037350539 |
| Documentation link | https://selia-tech.com/selia-landing |
| Support service | left empty, as in the Selia theme |

The help page is https://selia-tech.com/selia-landing (selia-platform `apps/web/pages/selia-landing.tsx`,
not linked from the site navigation). `help-article.html` keeps the same content as plain HTML.

## Price

250 SAR (one-time).

## Before submitting

- Confirm the `master` branch in the bundle page (the portal publishes from it).
- Bundle installation: public, not beta (current portal setting).
- The default template's hero is a video pair from cdn.selia-tech.com: 4.2 MB desktop and 3.3 MB phone. Only
  the one for the visitor's screen downloads.
- Template products point at the Selia preview store. On product pages merchants' own landing product is
  used automatically; on promotion pages they must pick a product in the product card settings.
- Template reviews and FAQ answers are sample copy for the merchant to replace; the help page says so.
- Dark mode covers the bundle's sections only. Salla's own blocks (fast checkout) keep their colors.
