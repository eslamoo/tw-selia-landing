# Listing pack: صفحة هبوط سيليا

Everything the Partners Portal asks for in "Complete publication", plus what is still open.

## Name

- AR: صفحة هبوط سيليا
- EN: Selia Landing Page

## Description

**AR (short):** صفحة هبوط مستوحاة من عناصر ثيم سيليا الشهير

**AR (long):**
صفحة هبوط جاهزة بعناصر ثيم سيليا: رأس صفحة بشعار متجرك، سلايدر متقدم يدعم الفيديو، بطاقة منتج بالشراء السريع، شريط إعلاني متحرك، وسائل الدفع المتحركة، مميزات، بانرات، شبكة صور، آراء العملاء، والأسئلة الشائعة.
في صفحة المنتج يفتح كل زر الشراء السريع مباشرة، وتنتقل الكمية المختارة معه. وفي صفحة العروض توجّه الأزرار عميلك للرابط الذي تحدده.
قالبين جاهزين: صفحة منتج لعباية، وصفحة عروض لمتجر أزياء بالوضع الداكن. كل عنصر يدعم الوضع الفاتح والداكن، وكل نص قابل للتعديل بالعربي والإنجليزي، والألوان تتبع ألوان متجرك، والتصميم مناسب للجوال.

**EN (short):** A landing page inspired by the components of the popular Selia theme

**EN (long):**
A ready landing page built from Selia theme sections: a header with your store logo, an advanced slider with video support, a product card with quick buy, an animated text bar, animated payment methods, features, banners, an images grid, customer reviews and FAQ.
On product pages every button opens the page's quick checkout, and the chosen quantity goes with it. On promotion pages the buttons send shoppers to the link you set.
Two ready templates: an abaya product page and a dark fashion offers page. Every section supports light and dark schemes, every text is editable in Arabic and English, colors follow your store, and every section works on phones.

## Screenshots (upload in this order)

| File | Title AR | Title EN | Description AR | Description EN |
|---|---|---|---|---|
| `01-abaya-template.jpg` | واجهة فيديو تلفت الانتباه | A video hero that stops the scroll | سلايدر يدعم الفيديو بنسخة مختلفة للجوال، وزر يفتح الشراء السريع | A slider with video and a separate phone version, with a button that opens quick checkout |
| `02-product-quick-buy.jpg` | بطاقة منتج بالشراء السريع | Product card with quick buy | صور المنتج، السعر، الكمية وزر الشراء في بطاقة واحدة مرتبطة بدفع صفحة الهبوط | Product images, price, quantity and a buy button, tied to the landing page checkout |
| `03-offers-template.jpg` | قالب جاهز لصفحات العروض | A ready template for offer pages | سلايدر صور، بانرات العروض وشبكة الأقسام لصفحة عروض متكاملة | Image slider, offer banners and a category grid for a complete offers page |
| `04-trust-sections.jpg` | عناصر تبني الثقة | Sections that build trust | المميزات، آراء العملاء والأسئلة الشائعة لإقناع عميلك قبل الشراء | Features, customer reviews and FAQ that answer shoppers before they buy |
| `05-two-templates.jpg` | قالبين بالوضع الفاتح والداكن | Two templates, light and dark | ابدأ بقالب صفحة منتج أو صفحة عروض، واختر الوضع الفاتح أو الداكن لكل عنصر | Start from a product page or an offers page, with a light or dark scheme for every section |
| `06-mobile-first.jpg` | مصممة للجوال أولاً | Designed for phones first | كل عنصر يتكيف مع شاشة الجوال ومع تخطيطات الدفع في صفحة الهبوط | Every section adapts to phone screens and to the landing page checkout layouts |

Icon: `icon-512.png` (also `icon-250.png`).

## Support details

| Field | Value |
|---|---|
| Support email | support@selia-tech.com (the address selia-tech.com already shows) |
| Support website | https://selia-tech.com/contact/ |
| Support phone | +20 103 735 0539 (the WhatsApp number in the selia-tech.com footer) |
| Live chat | https://wa.me/201037350539 |
| Documentation link | https://selia-tech.com/selia-landing |
| Support service | WhatsApp and email support |

The help page is https://selia-tech.com/selia-landing (selia-platform `apps/web/pages/selia-landing.tsx`,
not linked from the site navigation). `help-article.html` keeps the same content as plain HTML.

## Price

250 SAR (one-time).

## Before submitting

- Push `master` to GitHub (the portal publishes from it) and confirm the branch in the bundle page.
- Bundle installation: public, not beta (current portal setting).
- The default template's hero is a video pair from cdn.selia-tech.com: 4.2 MB desktop and 3.3 MB phone. Only
  the one for the visitor's screen downloads.
- Template products point at the Selia preview store. On product pages merchants' own landing product is
  used automatically; on promotion pages they must pick a product in the product card settings.
