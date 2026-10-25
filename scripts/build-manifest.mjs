// Source of truth for the section schemas in twilight-bundle.json and the templates/*.json files.
// Run from the repo root: node scripts/build-manifest.mjs
import fs from "node:fs";
import crypto from "node:crypto";

const ROOT = process.cwd();
const L = (ar, en) => ({ ar, en });

const text = (id, label, value, o = {}) => ({ id, type: "string", format: "text", label, icon: o.icon || "sicon-format-text-alt", multilanguage: o.multilang !== false, required: false, placeholder: o.placeholder || null, description: o.desc || null, minLength: 0, maxLength: o.max || 200, value });
const area = (id, label, value, o = {}) => ({ id, type: "string", format: "textarea", label, icon: "sicon-paragraph", multilanguage: o.multilang !== false, required: false, description: o.desc || null, maxLength: o.max || 1000, rows: 3, value });
const color = (id, label, value, desc = null) => ({ id, type: "string", format: "color", inputType: "color", label, icon: "sicon-format-fill", required: false, description: desc, value });
const sw = (id, label, value, desc = null) => ({ id, type: "boolean", format: "switch", label, icon: "sicon-toggle-off", required: false, description: desc, value, selected: value });
const num = (id, label, value, min, max, desc = null) => ({ id, type: "number", format: "number", inputType: "number", label, icon: "sicon-calculator", required: false, description: desc, minimum: min, maximum: max, value });
const image = (id, label, value, desc = null) => ({ id, type: "string", format: "image", label, icon: "sicon-image", required: false, description: desc, value });
const url = (id, label, value, desc = null) => ({ id, type: "string", format: "url", label, icon: "sicon-link", required: false, description: desc, value });
const icon = (id, label, value) => ({ id, type: "string", format: "icon", label, icon: "sicon-star2", required: false, class: "form--inline", value });
const opt = (value, label) => ({ label, value, key: value });
const drop = (id, label, options, selected, desc = null) => {
  const opts = options.map(([v, l]) => opt(v, l));
  return { id, type: "items", format: "dropdown-list", source: "Manual", label, icon: "sicon-list", required: false, description: desc, options: opts, selected: [opts.find((o) => o.value === selected)], value: [opts.find((o) => o.value === selected)] };
};
const products = (id, label, desc) => ({ id, type: "items", format: "dropdown-list", source: "products", label, icon: "sicon-box", placeholder: "البحث في قائمة المنتجات...", required: false, description: desc, options: [], selected: [], value: [], searchable: true, multichoice: false });
const collection = (id, itemLabel, fields, value, min, max) => ({ id, type: "collection", format: "collection", required: true, minLength: min, maxLength: max, item_label: itemLabel, fields: fields.map((f) => ({ ...f, id: `${id}.${f.id}` })), value: value.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [`${id}.${k}`, v]))) });
const line = (id) => ({ id, type: "static", format: "line" });
const scheme = () => drop("color_scheme", "وضع الألوان", [["light", "فاتح"], ["dark", "داكن"], ["auto", "حسب جهاز الزائر"]], "light", "حسب جهاز الزائر يتبع الوضع الليلي في جوال أو كمبيوتر العميل");

const PREVIEW = "https://eslamoo.github.io/selia-videos";

const components = [
  {
    title: "رأس الصفحة",
    icon: "sicon-store",
    name: "page-header",
    key: "a2d7715d-3dd2-408e-bc65-5f13dc54c081",
    image: "",
    props: { "min-height": "80px" },
    fields: [
      image("logo", "شعار مخصص", "", "اتركه فارغاً لاستخدام شعار متجرك"),
      image("logo_dark", "شعار الوضع الداكن", "", "اختياري، وبدونه يظهر شعارك باللون الأبيض في الوضع الداكن"),
      num("logo_height", "ارتفاع الشعار (px)", 56, 24, 140),
      drop("align", "مكان الشعار", [["center", "الوسط"], ["start", "البداية"]], "center"),
      sw("sticky", "تثبيت الرأس أعلى الصفحة", false),
      sw("show_shadow", "ظل أسفل الرأس", true),
      sw("link_to_store", "الشعار يفتح المتجر", false, "اتركه مغلقاً ليبقى عميلك في صفحة الهبوط"),
      color("bg_color", "لون الخلفية", "", "اتركه فارغاً لاستخدام لون الوضع المختار"),
      scheme(),
    ],
  },
  {
    title: "شريط إعلاني متحرك",
    icon: "sicon-megaphone",
    name: "animated-text",
    key: "18f83576-ba12-4914-8cce-d8587818b093",
    image: `${PREVIEW}/banners-slider.png`,
    props: { "min-height": "44px" },
    fields: [
      text("text", "النص", L("شحن مجاني لجميع مناطق المملكة | ضمان استرجاع سهل", "Free shipping across the Kingdom | Easy returns")),
      icon("icon", "أيقونة بين التكرارات", "sicon-star2"),
      color("bg", "لون الخلفية", "#111111"),
      color("color", "لون النص", "#ffffff"),
      num("speed", "مدة الدورة (ثانية)", 30, 8, 90, "كلما زاد الرقم كانت الحركة أبطأ"),
      sw("reverse", "عكس اتجاه الحركة", false),
    ],
  },
  {
    title: "سلايدر متقدم",
    icon: "sicon-image-carousel",
    name: "advanced-slider",
    key: "5d309060-1e70-4d50-bafb-5dcf25c2c27d",
    image: `${PREVIEW}/advanced-slider.jpeg`,
    props: { "min-height": "420px" },
    fields: [
      num("height", "ارتفاع السلايدر على الكمبيوتر (vh)", 85, 30, 100, "نسبة من ارتفاع الشاشة"),
      num("mobile_height", "ارتفاع السلايدر على الجوال (vh)", 75, 30, 100),
      drop("effect", "تأثير الانتقال", [["fade", "تلاشي"], ["slide", "انزلاق"]], "fade"),
      num("delay", "مدة عرض الشريحة (ثانية)", 6, 2, 20),
      sw("show_arrows", "إظهار أسهم التنقل", true),
      sw("show_dots", "إظهار نقاط التنقل", true),
      sw("overlay", "تعتيم خفيف فوق الصورة", true, "يحسن قراءة النصوص فوق الصور الفاتحة"),
      collection("slides", "شريحة", [
        sw("is_video", "الشريحة فيديو", false),
        image("image", "صورة الكمبيوتر", "", "المقاس المقترح 1920×1080"),
        image("mobile_image", "صورة الجوال", "", "المقاس المقترح 800×1200"),
        url("video_url", "رابط فيديو الكمبيوتر (MP4)", ""),
        url("video_url_mobile", "رابط فيديو الجوال (MP4)", ""),
        text("title", "العنوان", L("", "")),
        text("desc", "الوصف", L("", "")),
        text("btn_text", "نص الزر", L("", ""), { desc: "الزر يفتح الشراء السريع في صفحة المنتج، ورابط الزر الرئيسي في صفحة العروض" }),
        color("btn_bg", "لون خلفية الزر", "#111111"),
        color("btn_color", "لون نص الزر", "#ffffff"),
        sw("outlined_btn", "زر بإطار فقط", false),
        drop("content_position", "مكان المحتوى", [["start", "البداية"], ["center", "الوسط"], ["end", "النهاية"]], "center"),
        color("text_color", "لون النصوص", "#ffffff"),
      ], [
        { is_video: false, image: "", mobile_image: "", video_url: "", video_url_mobile: "", title: L("الأناقة تبدأ من هنا", "Elegance starts here"), desc: L("تصاميم راقية بخامات فاخرة", "Refined designs in premium fabrics"), btn_text: L("اطلبيها الآن", "Order now"), btn_bg: "#d4a574", btn_color: "#ffffff", outlined_btn: false, content_position: [opt("center", "الوسط")], text_color: "#ffffff" },
      ], 1, 6),
    ],
  },
  {
    title: "منتج مفصل مع الشراء السريع",
    icon: "sicon-shopping-bag",
    name: "product-hero",
    key: "8ef2d927-0bc3-48e6-863c-f10a3063327e",
    image: "https://cdn.selia-tech.com/images/mini-product-details.png",
    props: { "min-height": "640px" },
    fields: [
      products("product", "المنتج في صفحات العروض", "صفحة المنتج تعرض منتجها تلقائياً ويفتح الزر الشراء السريع. هذا الاختيار يُستخدم في صفحات العروض فقط"),
      text("title", "عنوان القسم", L("", "")),
      text("subtitle", "وصف القسم", L("", "")),
      text("btn_text", "نص زر الشراء", L("اشترِ الآن", "Buy now")),
      sw("show_quantity", "إظهار الكمية", true, "الكمية المختارة تنتقل للشراء السريع"),
      color("btn_bg", "لون خلفية الزر", "", "اتركه فارغاً لاستخدام اللون الأساسي للمتجر"),
      color("btn_color", "لون نص الزر", ""),
      line("ph-line-1"),
      drop("media_aspect", "شكل الصورة", [["square", "مربع"], ["portrait", "طولي"], ["landscape", "عرضي"]], "square"),
      drop("media_fit", "ملاءمة الصورة", [["cover", "تغطية كاملة"], ["contain", "إظهار الصورة كاملة"]], "cover"),
      sw("show_thumbs", "إظهار الصور المصغرة", true),
      sw("show_subtitle", "إظهار العنوان الفرعي للمنتج", true),
      sw("show_description", "إظهار وصف المنتج", false),
      color("border_color", "لون إطار البطاقة", ""),
      line("ph-line-2"),
      sw("show_sold", "إظهار عدد المبيعات", true),
      num("sold_count", "عدد المبيعات المعروض", 0, 0, 1000000, "اتركه 0 لعرض مبيعات المنتج الفعلية"),
      sw("custom_rating", "تقييم مخصص", false, "يظهر فقط إذا لم يكن للمنتج تقييمات"),
      num("rating_value", "التقييم من 5", 5, 1, 5),
      num("rating_count", "عدد التقييمات", 0, 0, 1000000),
      line("ph-line-3"),
      text("marquee_text", "نص متحرك تحت الصور", L("", "")),
      icon("marquee_icon", "أيقونة النص المتحرك", "sicon-star"),
      color("marquee_bg", "خلفية النص المتحرك", "#111111"),
      color("marquee_color", "لون النص المتحرك", "#ffffff"),
      color("bg_color", "لون خلفية القسم", ""),
      scheme(),
    ],
  },
  {
    title: "وسائل الدفع المتحركة",
    icon: "sicon-credit-card",
    name: "animated-payments",
    key: "55bf5609-2043-49ee-ac2e-6c3328e98875",
    image: `${PREVIEW}/animated-brands.png`,
    props: { "min-height": "160px" },
    fields: [
      text("title", "العنوان", L("طرق دفع آمنة ومتعددة", "Secure payment options")),
      drop("source", "مصدر الشعارات", [["store", "وسائل الدفع المفعلة في المتجر"], ["custom", "شعارات مخصصة"]], "store"),
      collection("logos", "شعار", [image("logo", "الشعار", ""), text("name", "الاسم", L("", ""))], [], 0, 20),
      sw("grayscale", "رمادي حتى المرور عليه", false),
      sw("second_row", "صف ثاني بعكس الاتجاه", false),
      color("logos_bg", "خلفية الشعار", ""),
      color("bg_color", "لون خلفية القسم", ""),
      scheme(),
    ],
  },
  {
    title: "مميزات متقدمة",
    icon: "sicon-award-ribbon",
    name: "features",
    key: "019e0007-a645-4977-b8da-629adc837433",
    image: `${PREVIEW}/enhanced-feat.png`,
    props: { "min-height": "220px" },
    fields: [
      text("title", "العنوان", L("", "")),
      text("subtitle", "الوصف", L("", "")),
      collection("items", "ميزة", [
        icon("icon", "الأيقونة", "sicon-shipping-fast"),
        image("image", "صورة بدل الأيقونة", ""),
        text("title", "العنوان", L("", "")),
        text("sub_title", "الوصف", L("", "")),
      ], [
        { icon: "sicon-shipping-fast", image: "", title: L("توصيل سريع", "Fast delivery"), sub_title: L("نوصل طلبك لباب بيتك بأسرع وقت", "Delivered to your door, fast") },
        { icon: "sicon-wallet", image: "", title: L("دفع آمن", "Secure payment"), sub_title: L("وسائل دفع موثوقة ومتعددة", "Trusted payment options") },
        { icon: "sicon-rotate", image: "", title: L("استرجاع سهل", "Easy returns"), sub_title: L("نستبدل أو نسترجع بدون تعقيد", "Hassle free returns") },
        { icon: "sicon-headphones", image: "", title: L("دعم متواصل", "Ongoing support"), sub_title: L("فريقنا جاهز يساعدك", "Our team is here to help") },
      ], 1, 8),
      color("icon_bg", "خلفية الأيقونة", "", "اتركه فارغاً لاستخدام اللون الأساسي للمتجر"),
      color("bg_color", "لون خلفية القسم", ""),
      scheme(),
    ],
  },
  {
    title: "بانر مزدوج",
    icon: "sicon-layout-grid-rearrange",
    name: "double-banner",
    key: "e1639f60-7d0f-4739-aa02-e1022a4b43d3",
    image: `${PREVIEW}/double-banner.png`,
    props: { "min-height": "160px" },
    fields: [
      image("first_image", "البانر الأول", "", "المقاس المقترح 1280×322"),
      image("first_image_en", "البانر الأول (إنجليزي)", "", "اختياري، يظهر لزوار النسخة الإنجليزية"),
      image("second_image", "البانر الثاني", ""),
      image("second_image_en", "البانر الثاني (إنجليزي)", ""),
      sw("rounded", "حواف دائرية", true),
      sw("stack_mobile", "بانر تحت الآخر في الجوال", true),
      sw("full_width", "عرض كامل بدون هوامش", false),
      sw("equal_height", "توحيد ارتفاع البانرات", false, "يقص الصور بنسبة 4:3 لتتساوى"),
      scheme(),
    ],
  },
  {
    title: "بانر ثلاثي",
    icon: "sicon-layout-grid",
    name: "three-banners",
    key: "fa4e4cfb-1280-4d0d-b449-5f0f0a97c940",
    image: `${PREVIEW}/three-banners.png`,
    props: { "min-height": "160px" },
    fields: [
      image("first_image", "البانر الأول", ""),
      image("first_image_en", "البانر الأول (إنجليزي)", ""),
      image("second_image", "البانر الثاني", ""),
      image("second_image_en", "البانر الثاني (إنجليزي)", ""),
      image("third_image", "البانر الثالث", ""),
      image("third_image_en", "البانر الثالث (إنجليزي)", ""),
      sw("rounded", "حواف دائرية", true),
      sw("stack_mobile", "بانر تحت الآخر في الجوال", true),
      sw("full_width", "عرض كامل بدون هوامش", false),
      sw("equal_height", "توحيد ارتفاع البانرات", true, "يقص الصور بنسبة 4:3 لتتساوى"),
      scheme(),
    ],
  },
  {
    title: "شبكة صور",
    icon: "sicon-image",
    name: "images-grid",
    key: "a0a73bfb-65ee-4db4-80ae-a82e556d9a2c",
    image: `${PREVIEW}/images-grid.jpeg`,
    props: { "min-height": "520px" },
    fields: [
      text("title", "العنوان", L("", "")),
      ...[1, 2, 3, 4, 5].flatMap((n) => [image(`image_${n}`, `الصورة ${n}`, ""), text(`title_${n}`, `عنوان الصورة ${n}`, L("", ""))]),
      color("titles_color", "لون العناوين", "#ffffff"),
      sw("bottom_titles", "العناوين أسفل الصور", false),
      sw("overlay", "تدرج خفيف فوق الصور", true),
      sw("rounded", "حواف دائرية", true),
      scheme(),
    ],
  },
  {
    title: "آراء العملاء",
    icon: "sicon-chat-bubbles",
    name: "custom-reviews",
    key: "8a3aab65-04c1-4c21-8a28-cd077242551a",
    image: `${PREVIEW}/testim.png`,
    props: { "min-height": "300px" },
    fields: [
      text("title", "العنوان", L("آراء عملائنا", "What our customers say")),
      text("subtitle", "الوصف", L("", "")),
      collection("items", "رأي", [
        text("name", "اسم العميل", L("", "")),
        image("image", "صورة العميل", "", "اختياري، تظهر الأحرف الأولى عند عدم رفع صورة"),
        num("rate", "التقييم من 5", 5, 1, 5),
        area("review", "الرأي", L("", "")),
      ], [], 1, 12),
      sw("autoplay", "تمرير تلقائي", true),
      color("card_bg", "لون خلفية البطاقة", ""),
      color("bg_color", "لون خلفية القسم", ""),
      scheme(),
    ],
  },
  {
    title: "الأسئلة الشائعة",
    icon: "sicon-help-circle",
    name: "faq",
    key: "33827d3f-ee1f-4f87-8994-d126dd4319cd",
    image: `${PREVIEW}/faq.png`,
    props: { "min-height": "300px" },
    fields: [
      text("title", "العنوان", L("لديك سؤال؟", "Have a question?")),
      text("subtitle", "الوصف", L("", "")),
      collection("items", "سؤال", [text("question", "السؤال", L("", "")), area("answer", "الإجابة", L("", ""))], [], 1, 12),
      sw("two_columns", "عمودين على الشاشات الكبيرة", true),
      color("bg_color", "لون خلفية القسم", ""),
      scheme(),
    ],
  },
];

// ---------- Templates (content follows the Selia preview store, theme.selia-tech.com) ----------
const FB = "https://cdn.salla.sa/form-builder";
const VID = "https://cdn.selia-tech.com/videos";
const sel = (value, label) => [opt(value, label)];
const product = (id, label) => [{ label, value: id, key: String(id) }];
const rows = (prefix, list) => list.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [`${prefix}.${k}`, v])));
const slide = (o) => ({ is_video: false, image: "", mobile_image: "", video_url: "", video_url_mobile: "", title: L("", ""), desc: L("", ""), btn_text: L("", ""), btn_bg: "#d4a574", btn_color: "#ffffff", outlined_btn: false, content_position: sel("center", "الوسط"), text_color: "#ffffff", ...o });
const review = (name, review, rate = 5) => ({ name: L(name, name), image: "", rate, review: L(review, review) });
const faq = (q, a) => ({ question: L(q, q), answer: L(a, a) });

const DEMO_FEATURES = [
  { icon: "sicon-shipping-fast", image: `${FB}/AA34phzHjmgiIGmap8MvqjvN7ebUEG5bAojXI6sR.gif`, title: L("توصيل سريع ومجاني", "Fast free delivery"), sub_title: L("نقدم خدمة توصيل سريعة ومجانية لجميع عملائنا.", "Fast, free delivery for every customer.") },
  { icon: "sicon-cash-register", image: `${FB}/jZd2JpzPL1z1w2enfZVHzw4vi7EkSqMGHHuZJkQr.gif`, title: L("ضمان استعادة الأموال", "Money back guarantee"), sub_title: L("نحن ملتزمون بتقديم أعلى مستوى من الجودة والرضا لعملائنا.", "Committed to quality and your satisfaction.") },
  { icon: "sicon-award-ribbon", image: `${FB}/fMSd48QhJPaVrsnbArAMxa1fo4htg5KcMHoXoMth.gif`, title: L("برامج الولاء", "Loyalty rewards"), sub_title: L("كعميل في متجرنا، ستستفيد من برامج الولاء الجذابة والتخفيضات الحصرية.", "Exclusive rewards and discounts for our customers.") },
  { icon: "sicon-headphones", image: `${FB}/QkjRIggHkh2wTGDhI6Ixc0C8twh9UFnsUy19JLru.gif`, title: L("دعم فني على مدار الساعة", "Support around the clock"), sub_title: L("بفضل الدعم التقني القوي ستتمتع بتجربة تسوق مثيرة وفريدة من نوعها", "Reliable support for a smooth shopping experience.") },
];
const DEMO_REVIEWS = [
  review("سارة الأحمد", "متجر رائع لن يكون آخر تعامل معكم، المنتجات ممتازة والتوصيل سريع"),
  review("خالد العتيبي", "متجر رائع أشكركم على جودة المنتجات والتغليف الممتاز"),
  review("نورة السبيعي", "تجربة جيدة ومتجر ممتاز وتجاوب سريع ما شاء الله أنصحكم وبقوة"),
  review("محمد الحربي", "متجر جميل وسريعين في التوصيل والتغليف وصلني تمام الحمدلله"),
];

const templates = [
  {
    name: "abaya-elegance",
    id: "3f5d2a8c-1b7e-4c69-9d41-6a2e8b0c7f13",
    category_id: "814202285",
    is_default: true,
    values: {
      "page-header": {},
      "animated-text": { text: L("عروضنا تصل إلى 40% وأكثر  |  شحن مجاني إلى جميع مناطق المملكة  |  ضمان ذهبي وإسترجاع سهل", "Offers up to 40% and more  |  Free shipping across the Kingdom  |  Gold guarantee and easy returns"), bg: "#000000", color: "#ffffff" },
      "advanced-slider": {
        height: 90, mobile_height: 80,
        slides: rows("slides", [slide({ is_video: true, video_url: `${VID}/video-2026-06-14T22-42-34-275Z-6r6yoi.mp4`, video_url_mobile: `${VID}/video-2026-06-14T22-43-57-118Z-daqn6z.mp4`, title: L("الأناقة تبدأ من هنا", "Elegance starts here"), desc: L("تمتعي بمظهر استثنائي مع عباياتنا العصرية والراقية", "Stand out in our modern, refined abayas"), btn_text: L("اطلبيها الآن", "Order now") })]),
      },
      "product-hero": { product: product(1287502680, "عباية باللون الأسود موديل كلوش"), title: L("عباية الموسم", "Abaya of the season"), subtitle: L("قماش ملكي وتطريز شك فاخر", "Royal fabric with fine hand embroidery"), btn_text: L("اطلبيها الآن", "Order now"), media_aspect: sel("square", "مربع"), border_color: "#d4a574", marquee_text: L("ضمان الجودة", "Quality guaranteed"), marquee_bg: "#000000" },
      "animated-payments": { title: L("ادفعي بالطريقة اللي تناسبك", "Pay the way that suits you") },
      "features": { items: rows("items", DEMO_FEATURES) },
      "double-banner": { first_image: `${FB}/IOqbTDw5ZRO3FUNl2YE198OWACvIF9aKiHwrQj7m.png` },
      "custom-reviews": { title: L("آراء عميلاتنا", "What our customers say"), items: rows("items", DEMO_REVIEWS) },
      "faq": {
        title: L("لديك سؤال؟ اجابته هنا", "Have a question? Find the answer here"),
        items: rows("items", [
          faq("كم يستغرق توصيل الطلب؟", "نجهز طلبك خلال يوم عمل، ويصل عادة خلال 2 إلى 5 أيام عمل حسب مدينتك."),
          faq("كيف أختار المقاس المناسب؟", "اختاري مقاسك المعتاد، وتواصلي معنا قبل الطلب إذا احتجتِ مساعدة في الطول أو العرض."),
          faq("هل يمكنني الاستبدال أو الاسترجاع؟", "نعم، يمكنك طلب الاستبدال أو الاسترجاع خلال 7 أيام من الاستلام بشرط أن تكون العباية بحالتها الأصلية."),
          faq("ما طرق الدفع المتاحة؟", "مدى، فيزا وماستركارد، Apple Pay، والدفع عند الاستلام."),
        ]),
      },
    },
    order: ["animated-text", "page-header", "advanced-slider", "product-hero", "animated-payments", "features", "double-banner", "custom-reviews", "faq"],
  },
  {
    name: "fashion-offers",
    id: "9c1e47b2-5d3a-4f8e-b6c0-2a7d9e4f1b58",
    category_id: "814202285",
    is_default: false,
    values: {
      "page-header": { color_scheme: sel("dark", "داكن"), sticky: true, logo_dark: "https://cdn.selia-tech.com/videos/theme-logo-pale.png" },
      "animated-text": { text: L("خصم 200 ريال لفترة محدودة جدا ✨ اغتنم الفرصة الآن 🔥", "200 SAR off for a very limited time ✨ Grab it now 🔥"), bg: "#000000", color: "#ffffff", speed: 26 },
      "advanced-slider": {
        height: 80, mobile_height: 70, effect: sel("slide", "انزلاق"),
        slides: rows("slides", [
          slide({ image: `${FB}/A6y0uGUUTk05cEw6lV1Od8kBi3Wxl8oG1TXRYKsF.jpg`, title: L("تشكيلة الموسم الجديد", "The new season collection"), desc: L("قطع مختارة بعناية لكل الأذواق", "Carefully picked pieces for every taste"), btn_text: L("تسوق العروض", "Shop the offers"), btn_bg: "#ffffff", btn_color: "#111111", content_position: sel("start", "البداية") }),
          slide({ image: `${FB}/wmxnJ14rCGYAO2eOWNWvWSQ55vz9smoDDPMBf5wh.jpg`, title: L("أناقة الرجل العصري", "Modern menswear"), desc: L("خصومات تصل إلى 40%", "Up to 40% off"), btn_text: L("تسوق العروض", "Shop the offers"), btn_bg: "#d4a574", btn_color: "#ffffff" }),
          slide({ image: `${FB}/rpd3McDL77cALoEbtQXlvzoMTrH79ru4UpE22yHx.jpg`, title: L("عطور تدوم معك", "Fragrances that last"), desc: L("هدية مثالية لمن تحب", "The perfect gift"), btn_text: L("تسوق العروض", "Shop the offers"), outlined_btn: true, btn_color: "#ffffff", content_position: sel("end", "النهاية") }),
        ]),
      },
      "double-banner": { first_image: `${FB}/ZjHsdgzca46oJqIwV4vTDK60zkL9OZrz9wHZnWcz.png`, second_image: `${FB}/pN2w71zXy3JiFDFGEBhpdmZPs1QalH4UcDWRnXgp.png`, color_scheme: sel("dark", "داكن") },
      "images-grid": {
        title: L("تسوق حسب القسم", "Shop by category"), color_scheme: sel("dark", "داكن"),
        image_1: `${FB}/D7RY5Fy70MiaPRXs2w0dxgjQNUbmlvJMqTvtYQaa.jpg`, title_1: L("العطور", "Fragrances"),
        image_2: `${FB}/om8xhO8SrMVTBr9m3MwHFGdourdB8lOe1dYYiRal.webp`, title_2: L("أطفال", "Kids"),
        image_3: `${FB}/wrgpnKYN6tJbfuBbpwNxhXxW8VhP8UaouQHe660o.webp`, title_3: L("رجالي", "Men"),
        image_4: `${FB}/NClP8MP7C2ehudhNEMau7pkKXH8vYc8kTQR3JTMh.webp`, title_4: L("نسائي", "Women"),
        image_5: `${FB}/ATe90eiDARMzJ92hUex4GL2jecd38BhOOTKVTduZ.jpg`, title_5: L("مكياج", "Makeup"),
      },
      "product-hero": { product: product(23847431, "عباية باللون الأسود بتداخل تفته وكريب"), title: L("منتج الأسبوع", "Product of the week"), subtitle: L("عرض محدود حتى نهاية الأسبوع", "Limited offer until the end of the week"), btn_text: L("تسوق الآن", "Shop now"), border_color: "#d4a574", color_scheme: sel("dark", "داكن"), marquee_text: L("شحن مجاني لجميع المناطق", "Free shipping everywhere") },
      "three-banners": { color_scheme: sel("dark", "داكن"), first_image: `${FB}/U5V59WvHHQNkDM4sRJr7m30E877mhzDvC87aydhh.jpg`, second_image: `${FB}/MluhG8XvJsZ8rraWCHrEPQZdZWDyaN3g2H3qvjM9.jpg`, third_image: `${FB}/bnXkCQWJnTKWqFCCsyezC9CstoBmSQqNj1u9kzgj.jpg` },
      "animated-payments": { title: L("طرق دفع آمنة ومتعددة", "Secure payment options"), second_row: true, grayscale: true, color_scheme: sel("dark", "داكن") },
      "custom-reviews": { title: L("آراء عملائنا", "What our customers say"), items: rows("items", DEMO_REVIEWS), color_scheme: sel("dark", "داكن") },
      "faq": {
        color_scheme: sel("dark", "داكن"),
        title: L("لديك سؤال؟ اجابته هنا 👇🏻", "Have a question? The answer is here 👇🏻"),
        subtitle: L("كل ما تريد معرفته عن الأزياء والموضة ✨", "Everything you want to know about fashion ✨"),
        items: rows("items", [
          faq("ما هي المواد الرئيسية المستخدمة في صناعة الملابس؟", "المواد الشائعة المستخدمة في صناعة الملابس تشمل القطن، والصوف، والحرير، والنايلون، والبوليستر، والجلد، والجينز، والمزيد. تختلف المواد تبعًا لنوع الملابس واستخداماتها"),
          faq("ما هي اتجاهات الموضة؟", "اتجاهات الموضة هي الأساليب والتصاميم التي تكون شائعة ومشهورة في فترة زمنية معينة. تتغير اتجاهات الموضة بشكل دوري وتستند إلى تأثيرات متعددة مثل الثقافة والسياق الاجتماعي والتكنولوجي"),
          faq("كيف يمكن للأفراد تحقيق مظهر أنيق دون إنفاق الكثير من المال؟", "يمكن للأفراد تحقيق مظهر أنيق بشراء قطع أساسية ذات جودة عالية وتنسيقها بشكل جيد. يمكن أيضًا البحث عن العروض والتخفيضات واستخدام ملحقات واكسسوارات لتحسين مظهرهم دون إنفاق الكثير من المال"),
          faq("كيف يمكن متابعة أحدث صيحات الموضة؟", "يمكن متابعة أحدث صيحات الموضة عبر البحث على الإنترنت، ومتابعة مواقع ومدونات الموضة، ومتابعة حسابات وسائل التواصل الاجتماعي للمصممين والمدونين والمؤثرين في عالم الأزياء"),
        ]),
      },
    },
    order: ["animated-text", "page-header", "advanced-slider", "double-banner", "images-grid", "product-hero", "three-banners", "animated-payments", "custom-reviews", "faq"],
  },
];

// Component defaults mirror the default template so a freshly added section already looks finished
const def = templates[0].values;
const applyValues = (component, values = {}) => {
  const copy = structuredClone(component);
  for (const field of copy.fields || []) {
    if (!(field.id in values)) continue;
    const v = values[field.id];
    field.value = v;
    if (field.format === "dropdown-list") field.selected = v;
    if (field.format === "switch") field.selected = v;
  }
  return copy;
};
// Editor previews live in public/assets/previews and are served from the content-addressed preview CDN
// .salla-preview.json is local only; a fresh clone falls back to the bundle's published preview
const PREVIEW_ID = fs.existsSync(`${ROOT}/.salla-preview.json`)
  ? JSON.parse(fs.readFileSync(`${ROOT}/.salla-preview.json`, "utf8")).id
  : process.env.TW_PREVIEW_ID || "eh7svsy3mkb6";
const previewUrl = (name) => {
  const file = `${ROOT}/public/assets/previews/${name}.jpg`;
  if (!fs.existsSync(file)) return "";
  const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  return `https://cdn.assets.salla.network/previews/${PREVIEW_ID}/assets/${hash}/previews/${name}.jpg`;
};
const finalComponents = components.map((c) => ({ ...applyValues(c, def[c.name] || {}), image: previewUrl(c.name) }));

const file = `${ROOT}/twilight-bundle.json`;
const bundle = JSON.parse(fs.readFileSync(file, "utf8"));
bundle.components = finalComponents;
const previous = new Map((bundle.templates || []).map((t) => [t.path, t]));
bundle.templates = templates.map((t) => ({
  id: t.id,
  path: `templates.${t.name}`,
  category_id: t.category_id,
  primary_color: "",
  thumbnail: previous.get(`templates.${t.name}`)?.thumbnail || `templates-thumbs/${t.name}.jpg`,
  is_default: t.is_default,
  ...(previous.get(`templates.${t.name}`)?.public_preview_url ? { public_preview_url: previous.get(`templates.${t.name}`).public_preview_url } : {}),
}));
fs.writeFileSync(file, JSON.stringify(bundle, null, 4) + "\n");

fs.mkdirSync(`${ROOT}/templates`, { recursive: true });
for (const t of templates) {
  const byName = new Map(finalComponents.map((c) => [c.name, c]));
  const list = t.order.map((name) => applyValues(components.find((c) => c.name === name), t.values[name]));
  fs.writeFileSync(`${ROOT}/templates/${t.name}.json`, JSON.stringify({ id: t.id, components: list }, null, 2) + "\n");
  if (list.some((c) => !byName.has(c.name))) throw new Error(`unknown component in ${t.name}`);
}
console.log("components:", finalComponents.map((c) => c.name).join(", "));
console.log("templates:", templates.map((t) => `${t.name}(${t.order.length})`).join(", "));
