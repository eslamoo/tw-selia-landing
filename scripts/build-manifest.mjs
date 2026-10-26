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
const scheme = () => drop("color_scheme", "وضع الألوان", [["auto", "حسب وضع الصفحة"], ["light", "فاتح دائماً"], ["dark", "داكن دائماً"]], "auto", "حسب وضع الصفحة يتبع زر الوضع الداكن في رأس الصفحة، أو جهاز الزائر إذا لم تستخدم رأس الصفحة");
// Selia's block title styles, in the theme's order, plus the plain line. Diamond is the Selia demo store's style.
const TITLE_STYLES = [
  ["classic", "الكلاسيكي (دائرة وخطين)", "png"], ["side-lines", "خطوط جانبية", "png"], ["signature", "توقيع يدوي", "png"],
  ["highlight", "تظليل العنوان", "png"], ["underline-offset", "خط متدرج", "png"], ["glow-badge", "خلفية متوهجة (متحرك)", "gif"],
  ["frame", "إطار نابض (متحرك)", "gif"], ["shimmer", "عنوان متوهج (متحرك)", "gif"], ["constellation", "نجوم (متحرك)", "gif"],
  ["lozenge", "كبسولة (متحرك)", "gif"], ["pulse-line", "خط ممتد (متحرك)", "gif"], ["traveling-dot", "خط مع نقطة متحركة (متحرك)", "gif"],
  ["diamond", "كلاسيكي متحرك (متحرك)", "gif"], ["dashes", "خط متقطع (متحرك)", "gif"], ["wipe", "سطر (متحرك)", "gif"],
  ["sparkle", "ومضة عائمة (متحرك)", "gif"], ["converge", "خط مقسوم (متحرك)", "gif"], ["basic", "خط بسيط", ""],
];
const titleStyle = () => [
  drop("title_style", "شكل العنوان", TITLE_STYLES.map(([v, l]) => [v, l]), "diamond", "نفس أشكال عناوين ثيم سيليا، والأشكال المكتوب جنبها (متحرك) تتحرك لحالها"),
  ...TITLE_STYLES.filter(([, , ext]) => ext).map(([v, , ext]) => ({
    id: `title_style_preview_${v.replace(/-/g, "_")}`, type: "static", format: "description",
    value: `<div style='padding-top:10px;margin-bottom:20px;border:1px solid #ebebeb;border-radius:8px;text-align:center;overflow:hidden'><img class='w-full' style='transform:scale(1.5);transform-origin:center' src='https://cdn.selia-tech.com/title-variants/${v}.${ext}'></div>`,
    conditions: [{ id: "title_style", operation: "=", value: v }],
  })),
];

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
      image("logo_dark", "شعار الوضع الداكن", "", "يظهر في الوضع الداكن وفوق السلايدر في الرأس الشفاف، وبدونه يظهر شعارك باللون الأبيض"),
      num("logo_height", "ارتفاع الشعار (px)", 60, 24, 140),
      drop("align", "مكان الشعار", [["center", "الوسط"], ["start", "البداية"]], "center"),
      line("hd-line-1"),
      sw("transparent", "رأس شفاف فوق السلايدر", false, "يدمج الرأس مع السلايدر الذي بعده مباشرة كما في ثيم سيليا"),
      sw("sticky", "تثبيت الرأس أعلى الصفحة عند التمرير", false, "مع الرأس الشفاف تظهر خلفية الرأس عند التمرير"),
      sw("show_shadow", "ظل أسفل الرأس", true),
      line("hd-line-2"),
      sw("show_mode_toggle", "زر التبديل بين الوضع الفاتح والداكن", true, "يبدل كل عناصر الصفحة المضبوطة على حسب وضع الصفحة، ويتذكر اختيار العميل"),
      drop("default_mode", "الوضع الافتراضي للصفحة", [["light", "فاتح"], ["dark", "داكن"], ["system", "حسب جهاز الزائر"]], "light"),
      line("hd-line-3"),
      sw("link_to_store", "الشعار يفتح المتجر", false, "اتركه مغلقاً ليبقى عميلك في صفحة الهبوط"),
      color("bg_color", "لون الخلفية", "", "اتركه فارغاً لاستخدام لون الوضع الحالي"),
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
      text("text", "النص", L("شحن مجاني لجميع مناطق المملكة ✨", "Free shipping across the Kingdom ✨")),
      icon("icon", "أيقونة بين التكرارات (اختياري)", ""),
      color("bg", "لون الخلفية", "#000000"),
      color("color", "لون النص", "#ffffff"),
      num("speed", "مدة مرور النص مرة واحدة (ثانية)", 7, 3, 60, "7 ثوانٍ مثل ثيم سيليا، وكلما زاد الرقم كانت الحركة أبطأ"),
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
      sw("auto_height", "ارتفاع تلقائي حسب الصورة أو الفيديو", true, "عند إيقافه يُستخدم الارتفاع المحدد بالأسفل"),
      num("height", "ارتفاع السلايدر على الكمبيوتر (vh)", 100, 30, 100, "نسبة من ارتفاع الشاشة"),
      num("mobile_height", "ارتفاع السلايدر على الجوال (vh)", 100, 30, 100),
      drop("effect", "تأثير الانتقال", [["fade", "تلاشي"], ["slide", "انزلاق"]], "fade"),
      num("delay", "مدة عرض الشريحة (ثانية)", 5, 2, 20),
      num("speed", "مدة الانتقال بين الشرائح (ثانية)", 2, 1, 5),
      sw("show_arrows", "إظهار أسهم التنقل", true),
      sw("show_dots", "إظهار نقاط التنقل", true),
      sw("overlay", "طبقة داكنة خفيفة أعلى السلايدر", true, "توضح الشعار والنصوص فوق الصور الفاتحة"),
      sw("ken_burns", "حركة تكبير هادئة على الصور", true),
      collection("slides", "شريحة", [
        sw("is_video", "الشريحة فيديو", false),
        image("image", "صورة الكمبيوتر", "", "المقاس المقترح 1920×1080"),
        image("mobile_image", "صورة الجوال", "", "المقاس المقترح 800×1200"),
        url("video_url", "رابط فيديو الكمبيوتر (MP4)", ""),
        url("video_url_mobile", "رابط فيديو الجوال (MP4)", ""),
        drop("object_fit", "طريقة عرض الصورة أو الفيديو", [["cover", "تغطية كاملة"], ["contain", "إظهار كامل"]], "cover"),
        drop("object_position", "اتجاه الصورة أو الفيديو", [["center", "الوسط"], ["top", "أعلى"], ["bottom", "أسفل"], ["right", "يمين"], ["left", "يسار"]], "center"),
        text("title", "العنوان", L("", "")),
        text("desc", "الوصف", L("", "")),
        text("btn_text", "نص الزر", L("", ""), { desc: "الزر يفتح الشراء السريع في صفحة المنتج، ورابط الزر الرئيسي في صفحة العروض" }),
        color("btn_bg", "لون خلفية الزر", "#111111"),
        color("btn_color", "لون نص الزر", "#ffffff"),
        sw("outlined_btn", "زر بإطار فقط", false),
        drop("content_position", "مكان النصوص", [["right", "يمين"], ["center", "الوسط"], ["left", "يسار"]], "center"),
        color("text_color", "لون النصوص", "#ffffff"),
      ], [
        { is_video: false, image: "", mobile_image: "", video_url: "", video_url_mobile: "", object_fit: [opt("cover", "تغطية كاملة")], object_position: [opt("center", "الوسط")], title: L("", ""), desc: L("", ""), btn_text: L("", ""), btn_bg: "#111111", btn_color: "#ffffff", outlined_btn: false, content_position: [opt("center", "الوسط")], text_color: "#ffffff" },
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
      ...titleStyle(),
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
      ...titleStyle(),
      drop("source", "مصدر الشعارات", [["store", "وسائل الدفع المفعلة في المتجر"], ["custom", "شعارات مخصصة"]], "store"),
      collection("logos", "شعار", [image("logo", "الشعار", ""), text("name", "الاسم", L("", ""))], [], 0, 20),
      sw("grayscale", "رمادي حتى المرور عليه", false),
      sw("second_row", "صف ثاني بعكس الاتجاه", true),
      sw("bigger_logos", "شعارات أكبر", false),
      color("logos_bg", "خلفية الشعار", "#eeeeee"),
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
      ...titleStyle(),
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
      ...titleStyle(),
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
      ...titleStyle(),
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
      ...titleStyle(),
      collection("items", "سؤال", [text("question", "السؤال", L("", "")), area("answer", "الإجابة", L("", ""))], [], 1, 12),
      sw("two_columns", "عمودين على الشاشات الكبيرة", true),
      color("bg_color", "لون خلفية القسم", ""),
      scheme(),
    ],
  },
];

// Editor previews and template banners live in public/assets and are served from the content-addressed preview CDN
// .salla-preview.json is local only; a fresh clone falls back to the bundle's published preview
const PREVIEW_ID = fs.existsSync(`${ROOT}/.salla-preview.json`)
  ? JSON.parse(fs.readFileSync(`${ROOT}/.salla-preview.json`, "utf8")).id
  : process.env.TW_PREVIEW_ID || "eh7svsy3mkb6";
const assetUrl = (rel) => {
  const file = `${ROOT}/public/assets/${rel}`;
  if (!fs.existsSync(file)) return "";
  const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  return `https://cdn.assets.salla.network/previews/${PREVIEW_ID}/assets/${hash}/${rel}`;
};
// Section previews are served from Selia's CDN under the names scripts/upload-cdn.sh uploads
const previewUrl = (name) => {
  const hash = crypto.createHash("sha256").update(fs.readFileSync(`${ROOT}/public/assets/previews/${name}.jpg`)).digest("hex");
  return `https://cdn.selia-tech.com/images/selia-landing/${name}-${hash.slice(0, 8)}.jpg`;
};
const banner = (name) => assetUrl(`banners/${name}.jpg`);
const banners = (prefix, slots) => Object.fromEntries(slots.flatMap(([field, name]) => [
  [field, banner(`${prefix}-${name}-ar`)], [`${field}_en`, banner(`${prefix}-${name}-en`)],
]));

// ---------- Templates (content follows the Selia preview store, theme.selia-tech.com) ----------
const FB = "https://cdn.salla.sa/form-builder";
const VID = "https://cdn.selia-tech.com/videos";
const sel = (value, label) => [opt(value, label)];
const product = (id, label) => [{ label, value: id, key: String(id) }];
const rows = (prefix, list) => list.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [`${prefix}.${k}`, v])));
const slide = (o) => ({ is_video: false, image: "", mobile_image: "", video_url: "", video_url_mobile: "", object_fit: sel("cover", "تغطية كاملة"), object_position: sel("center", "الوسط"), title: L("", ""), desc: L("", ""), btn_text: L("", ""), btn_bg: "#111111", btn_color: "#ffffff", outlined_btn: false, content_position: sel("center", "الوسط"), text_color: "#ffffff", ...o });
const review = (name, review, rate = 5) => ({ name, image: "", rate, review });
const faq = (question, answer) => ({ question, answer });
const feature = (icon, title, sub_title) => ({ icon, image: "", title, sub_title });
const DELIVERY = faq(L("متى يوصلني الطلب؟", "When will my order arrive?"), L("نجهز طلبك خلال يوم عمل، ويصل عادة خلال 2 إلى 5 أيام عمل حسب مدينتك.", "We prepare your order within one business day, and it usually arrives in 2 to 5 business days depending on your city."));
const PAYMENT = faq(L("ما طرق الدفع المتاحة؟", "Which payment methods can I use?"), L("مدى، فيزا وماستركارد، Apple Pay، والدفع عند الاستلام.", "mada, Visa and Mastercard, Apple Pay, and cash on delivery."));

// Each template sells one product from the Selia preview store, and every section talks about that product
const ABAYA = "https://cdn.salla.sa/gzRDg/products";
const templates = [
  {
    name: "abaya-elegance",
    id: "3f5d2a8c-1b7e-4c69-9d41-6a2e8b0c7f13",
    category_id: "814202285",
    is_default: true,
    values: {
      "animated-text": { text: L("شحن مجاني لعباية الكلوش الملكية إلى جميع مناطق المملكة ✨", "Free shipping on the royal cloche abaya across the Kingdom ✨"), bg: "#000000", color: "#ffffff" },
      "page-header": { transparent: true, sticky: true, show_mode_toggle: true, default_mode: sel("light", "فاتح") },
      "advanced-slider": {
        auto_height: true,
        // The clip pans across black and white abayas, so like the Selia store it runs without a caption
        slides: rows("slides", [slide({ is_video: true, video_url: `${VID}/video-2026-06-14T22-42-34-275Z-6r6yoi.mp4`, video_url_mobile: `${VID}/video-2026-06-14T22-43-57-118Z-daqn6z.mp4` })]),
      },
      "product-hero": {
        product: product(1287502680, "عباية باللون الأسود موديل كلوش بقماش ملكي وتطريز شك فاخر"),
        title: L("عباية الكلوش الملكية", "The royal cloche abaya"), subtitle: L("قماش ملكي ينسدل بنعومة، وتطريز شك فاخر على الأكمام", "Royal fabric that falls softly, with fine bead embroidery on the sleeves"),
        btn_text: L("اطلبيها الآن", "Order now"), border_color: "#d4a574",
        marquee_text: L("قماش ملكي ✦ تطريز شك فاخر ✦ قصة كلوش واسعة", "Royal fabric ✦ Fine bead embroidery ✦ Wide cloche cut"), marquee_bg: "#000000",
      },
      "double-banner": { ...banners("abaya", [["first_image", "d1"], ["second_image", "d2"]]) },
      "three-banners": { ...banners("abaya", [["first_image", "t1"], ["second_image", "t2"], ["third_image", "t3"]]) },
      "images-grid": {
        title: L("تفاصيل العباية", "The abaya in detail"),
        image_1: `${ABAYA}/kXM5IFalDSoAebmtgsNdJ9jITtUJTsKzFjYEolbT.jpg`,
        image_2: `${ABAYA}/mzUxwSTjCJKXYa3Mm0WMHbXC07gtcyRB4Q2U3cUO.jpg`,
        image_3: `${ABAYA}/zubWcZ7SBRWbQfxGsmfiYtRKaYnMVkVKTVkXw8Iu.jpg`,
        image_4: `${ABAYA}/EH06n5OfsLU8tVlTJDY9voBu9uvHXaYnZ2Gazfao.jpg`,
        image_5: `${ABAYA}/cGHtP4V7duXpTzEqxK8Qgz3PDofxKBZ8WzgWbO92.jpg`,
        overlay: false,
      },
      "features": {
        title: L("ليش عباية الكلوش الملكية؟", "Why the royal cloche abaya?"),
        items: rows("items", [
          feature("sicon-fabric-swatch", L("قماش ملكي", "Royal fabric"), L("خامة ناعمة تنسدل بأناقة وتريحك طول اليوم", "A soft fabric that falls gracefully and stays comfortable all day")),
          feature("sicon-flower-stem", L("تطريز شك فاخر", "Fine bead embroidery"), L("تفاصيل مشغولة بعناية على الأكمام", "Carefully worked details on the sleeves")),
          feature("sicon-shipping-fast", L("شحن مجاني", "Free shipping"), L("نوصلها لباب بيتك في كل مناطق المملكة", "Delivered to your door anywhere in the Kingdom")),
          feature("sicon-rotate", L("استبدال سهل", "Easy exchange"), L("استبدال أو استرجاع خلال 7 أيام من الاستلام", "Exchange or return within 7 days of delivery")),
        ]),
      },
      "animated-payments": { title: L("ادفعي بالطريقة اللي تناسبك", "Pay the way that suits you") },
      "custom-reviews": {
        title: L("آراء عميلاتنا في العباية", "What customers say about the abaya"),
        items: rows("items", [
          review(L("نورة", "Noura"), L("القماش ناعم وثقيل والتطريز أجمل من الصور، والمقاس مضبوط", "The fabric is soft and rich, the embroidery is even nicer than the photos, and the size is right")),
          review(L("سارة", "Sara"), L("قصة الكلوش واسعة ومريحة، لبستها في مناسبة وسألوني عنها كثير", "The cloche cut is wide and comfortable. I wore it to an event and got asked about it a lot")),
          review(L("ريم", "Reem"), L("وصلتني بسرعة وبتغليف مرتب، والشك ثابت وما تحرك", "It arrived quickly and neatly packed, and the beading stayed in place")),
          review(L("هيفاء", "Haifa"), L("ثاني عباية آخذها منكم، والجودة نفسها كل مرة", "My second abaya from you, and the quality is the same every time")),
        ]),
      },
      "faq": {
        title: L("أسئلة عن العباية", "Questions about the abaya"),
        items: rows("items", [
          faq(L("كيف أختار المقاس المناسب؟", "How do I pick the right size?"), L("اختاري مقاسك المعتاد، وتواصلي معنا قبل الطلب إذا احتجتِ مساعدة في الطول أو العرض.", "Pick your usual size, and contact us before ordering if you need help with the length or width.")),
          faq(L("كيف أعتني بالتطريز؟", "How do I care for the embroidery?"), L("ننصح بالتنظيف الجاف أو الغسيل اليدوي بماء بارد، وكي العباية من الداخل.", "We recommend dry cleaning or a cold hand wash, and ironing the abaya inside out.")),
          faq(L("هل أقدر أستبدل أو أسترجع؟", "Can I exchange or return it?"), L("نعم، خلال 7 أيام من الاستلام بشرط أن تكون العباية بحالتها الأصلية.", "Yes, within 7 days of delivery as long as the abaya is in its original condition.")),
          DELIVERY,
          PAYMENT,
        ]),
      },
    },
    order: ["animated-text", "page-header", "advanced-slider", "product-hero", "double-banner", "images-grid", "three-banners", "features", "animated-payments", "custom-reviews", "faq"],
  },
  {
    name: "perfume-signature",
    id: "7b2e9d14-6c3a-4f81-a5d0-3e8c1f6b9a27",
    category_id: "665151403",
    is_default: false,
    values: {
      "animated-text": { text: L("تغليف هدية مجاني مع كل طلب للعطر ✨", "Free gift wrapping with every order of this perfume ✨"), bg: "#d4a574", color: "#111111" },
      "page-header": { sticky: true, show_mode_toggle: true, default_mode: sel("dark", "داكن") },
      "advanced-slider": {
        auto_height: false, height: 90, mobile_height: 80, effect: sel("fade", "تلاشي"), ken_burns: true,
        slides: rows("slides", [
          // On phones "left" keeps the plain white sleeve behind the text; desktop crops vertically, so it is unaffected
          slide({ image: `${FB}/kkAsLOTMFJd8tgQ98H0aOcUvadPxZTvsLtPFYSOH.jpg`, object_position: sel("left", "يسار"),
            title: L("عطر يشبه حضورك", "A scent that feels like you"), desc: L("نفحات دافئة تبقى معك من الصباح إلى المساء", "Warm notes that stay with you from morning to night"),
            btn_text: L("اطلبه الآن", "Order now"), btn_bg: "#111111", btn_color: "#ffffff", content_position: sel("right", "يمين"), text_color: "#111111" }),
          slide({ image: `${FB}/D7RY5Fy70MiaPRXs2w0dxgjQNUbmlvJMqTvtYQaa.jpg` }),
        ]),
      },
      "product-hero": {
        product: product(623859566, "اف سان لوران ليبر- او دي بريفيوم انتنس- 50 مل"),
        title: L("العطر اللي يكمل إطلالتك", "The scent that completes your look"), subtitle: L("نفحات دافئة بثبات طويل، في زجاجة تليق بالإهداء", "Warm notes that last, in a bottle made for gifting"),
        btn_text: L("اطلبه الآن", "Order now"), border_color: "#d4a574",
        marquee_text: L("ثبات طويل ✦ تغليف هدية ✦ شحن مجاني", "Long lasting ✦ Gift wrapped ✦ Free shipping"), marquee_bg: "#d4a574", marquee_color: "#111111",
      },
      "double-banner": { ...banners("perfume", [["first_image", "d1"], ["second_image", "d2"]]) },
      "three-banners": { ...banners("perfume", [["first_image", "t1"], ["second_image", "t2"], ["third_image", "t3"]]) },
      "images-grid": {
        title: L("العطر عن قرب", "A closer look"),
        image_1: banner("perfume-g1"), image_2: banner("perfume-g2"), image_3: banner("perfume-g3"), image_4: banner("perfume-g4"), image_5: banner("perfume-g5"),
        overlay: false,
      },
      "features": {
        title: L("ليش هذا العطر؟", "Why this perfume?"),
        items: rows("items", [
          feature("sicon-time", L("ثبات يدوم", "Lasts all day"), L("رشة الصباح تبقى معك لآخر اليوم", "One morning spray stays with you all day")),
          feature("sicon-shield-check", L("أصلي ومضمون", "Authentic"), L("عطر أصلي بضمان المتجر", "An authentic perfume backed by the store")),
          feature("sicon-gift", L("تغليف هدية", "Gift wrapping"), L("يوصلك مغلفاً وجاهزاً للإهداء", "Arrives wrapped and ready to give")),
          feature("sicon-shipping-fast", L("شحن مجاني", "Free shipping"), L("لجميع مناطق المملكة", "Anywhere in the Kingdom")),
        ]),
      },
      "animated-payments": { title: L("ادفع بالطريقة اللي تناسبك", "Pay the way that suits you") },
      "custom-reviews": {
        title: L("آراء عملائنا في العطر", "What customers say about the perfume"),
        items: rows("items", [
          review(L("عبدالله", "Abdullah"), L("ثباته ممتاز، أرشه الصبح ويبقى معي لآخر اليوم", "Great longevity. I spray it in the morning and it lasts until the evening")),
          review(L("مها", "Maha"), L("ريحته دافية وفخمة، ووصلني مغلف كهدية بشكل مرتب", "A warm, rich scent, and it arrived neatly gift wrapped")),
          review(L("فهد", "Fahad"), L("طلبته هدية لزوجتي وعجبها كثير، والتوصيل كان سريع", "I ordered it as a gift for my wife and she loved it. Delivery was quick")),
          review(L("لمى", "Lama"), L("فوحانه واضح بدون ما يكون مزعج، من أجمل العطور اللي جربتها", "It projects well without being too much. One of the best I have tried")),
        ]),
      },
      "faq": {
        title: L("أسئلة عن العطر", "Questions about the perfume"),
        items: rows("items", [
          faq(L("هل العطر أصلي؟", "Is the perfume authentic?"), L("نعم، العطر أصلي ومضمون، ونستبدله لك إذا وصلك بحالة غير سليمة.", "Yes, it is authentic and guaranteed, and we replace it if it arrives damaged.")),
          faq(L("كم يدوم العطر؟", "How long does it last?"), L("يختلف الثبات حسب نوع البشرة والجو، ويبقى أطول على الملابس.", "Longevity depends on your skin and the weather, and it lasts longer on clothes.")),
          faq(L("هل يوصل مغلفاً كهدية؟", "Does it come gift wrapped?"), L("نعم، نغلف كل طلب كهدية بدون تكلفة إضافية.", "Yes, every order is gift wrapped at no extra cost.")),
          DELIVERY,
          PAYMENT,
        ]),
      },
    },
    order: ["animated-text", "page-header", "advanced-slider", "product-hero", "double-banner", "features", "images-grid", "three-banners", "animated-payments", "custom-reviews", "faq"],
  },
];

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
const finalComponents = components.map((c) => ({ ...structuredClone(c), image: previewUrl(c.name) }));

const file = `${ROOT}/twilight-bundle.json`;
const bundle = JSON.parse(fs.readFileSync(file, "utf8"));
bundle.components = finalComponents;
const previous = new Map((bundle.templates || []).map((t) => [t.path, t]));
bundle.templates = templates.map((t) => ({
  id: t.id,
  path: `templates.${t.name}`,
  category_id: t.category_id,
  primary_color: "",
  // RESET_THUMBS=1 points back at the local thumbnails so tw-preview uploads the new ones
  thumbnail: (!process.env.RESET_THUMBS && previous.get(`templates.${t.name}`)?.thumbnail) || `templates-thumbs/${t.name}.jpg`,
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
