# Listing pack: صفحة هبوط سيليا

Everything the Partners Portal asks for in "Complete publication", plus what is still open.

## Name

- AR: صفحة هبوط سيليا
- EN: Selia Landing Page

## Description

**AR (short):** صفحة هبوط مستوحاة من عناصر ثيم سيليا الشهير

**AR (long):**
صفحة هبوط جاهزة بعناصر ثيم سيليا: رأس صفحة بشعار متجرك وزر الوضع الداكن، شريط إعلاني متحرك، سلايدر متقدم يدعم الفيديو، بطاقة منتج بالشراء السريع، وسائل الدفع المتحركة، مميزات، بانرات، شبكة صور، آراء العملاء، والأسئلة الشائعة.
في صفحة المنتج يفتح كل زر الشراء السريع مباشرة، وتنتقل الكمية المختارة معه. وفي صفحة العروض توجّه الأزرار عميلك للرابط الذي تحدده.
قالبين جاهزين، كل قالب يتكلم عن منتج واحد ويستخدم كل العناصر مع بانرات مصممة لمنتجه: صفحة عباية بالوضع الفاتح، وصفحة عطر بالوضع الداكن. عميلك يبدّل الصفحة كاملة بين الفاتح والداكن بزر في الرأس، وكل نص قابل للتعديل بالعربي والإنجليزي، والألوان تتبع ألوان متجرك، والتصميم مناسب للجوال.

**EN (short):** A landing page inspired by the components of the popular Selia theme

**EN (long):**
A ready landing page built from Selia theme sections: a header with your store logo and a dark mode switch, an animated text bar, an advanced slider with video support, a product card with quick buy, animated payment methods, features, banners, an images grid, customer reviews and FAQ.
On product pages every button opens the page's quick checkout, and the chosen quantity goes with it. On promotion pages the buttons send shoppers to the link you set.
Two ready templates, each built around one product and using every section, with banners designed for that product: an abaya page in light mode and a perfume page in dark mode. Shoppers switch the whole page between light and dark from the header, every text is editable in Arabic and English, colors follow your store, and every section works on phones.

## Screenshots (upload in this order)

Device mockups, 1920x1080, no added text or logos.

| File | Title AR | Title EN | Description AR | Description EN |
|---|---|---|---|---|
| `01-abaya-template.jpg` | قالب صفحة عباية | An abaya page template | فيديو بعرض الشاشة مع رأس شفاف وشريط إعلاني مثل ثيم سيليا | A full width video with a transparent header and an announcement bar, as in the Selia theme |
| `02-product-quick-buy.jpg` | بطاقة منتج بالشراء السريع | Product card with quick buy | صور المنتج، السعر، الكمية وزر الشراء في بطاقة واحدة مرتبطة بدفع صفحة الهبوط | Product images, price, quantity and a buy button, tied to the landing page checkout |
| `03-perfume-template.jpg` | قالب صفحة عطر بالوضع الداكن | A perfume page template in dark mode | قالب جاهز لعطر واحد بسلايدر صور وبطاقة منتج ومميزات | A ready page for one perfume with an image slider, product card and features |
| `04-light-dark.jpg` | الوضع الفاتح والداكن | Light and dark mode | عميلك يبدّل الصفحة كاملة بزر في الرأس، ويتذكر اختياره | Shoppers switch the whole page from the header, and the choice is remembered |
| `05-banners.jpg` | بانرات جاهزة لمنتجك | Ready banners for your product | بانر مزدوج وبانر ثلاثي وشبكة صور مصممة لمنتج كل قالب، بنسخة عربية وإنجليزية | Double and triple banners and an image grid designed for each template's product, in Arabic and English |
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
- Template reviews and FAQ answers are sample copy for the merchant to replace; the help page says so.
- Dark mode covers the bundle's sections only. Salla's own blocks (fast checkout) keep their colors.
