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

Realistic iPhone and MacBook frames on the Selia dark background, 1600x1200 (the size the Partners Portal
requires), under 200 KB, no added text or logos. Built by `scripts/make-marketplace.sh`. Titles are at most 30
characters and descriptions at most 100, in the Selia theme listing's voice.

| File | Title AR | Title EN | Description AR | Description EN |
|---|---|---|---|---|
| `01-abaya-template.jpg` | صفحة هبوط سيليا | Selia Landing Page | استمتع بتصميم صفحة الهبوط ✨ | Enjoy designing your landing page ✨ |
| `02-perfume-template.jpg` | قوالب جاهزة لمنتجك | Ready templates | قالبين جاهزين للعبايات والعطور بكل عناصر سيليا مع بانرات مصممة لكل منتج | Two ready templates for abayas and perfumes with every Selia section and banners for each product |
| `03-abaya-sections.jpg` | منتج مفصل مع الشراء السريع | Product details with quick buy | اعرض منتجك بكل تفاصيله مع اختيار الكمية وزر الشراء السريع | Show your product in full detail with a quantity picker and a quick buy button |
| `04-light-dark.jpg` | خاصية الوضع الداكن | Dark mode | دعم كامل لزر التنقل بين الوضع الداكن والفاتح | Full support for switching between dark and light mode |
| `05-banners.jpg` | بانرات وشبكة صور | Banners and image grid | يمكنك عرض بانر مزدوج وثلاثي وشبكة صور، مع نسخة عربية وإنجليزية لكل بانر | Show double and triple banners and an image grid, with an Arabic and English version of each banner |
| `06-perfume-sections.jpg` | أشكال عناوين ثيم سيليا | Selia title styles | اختر شكل عنوان كل قسم من نفس أشكال عناوين ثيم سيليا | Pick each section's title style from the same styles as the Selia theme |

Icon: `icon.png`, the same سيليا THEME logo the Selia theme uses in the portal.

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
