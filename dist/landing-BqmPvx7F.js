function c() {
  return window.Salla;
}
function l() {
  var n, t;
  return ((t = (n = c()) == null ? void 0 : n.config) == null ? void 0 : t.get("theme.settings")) || {};
}
function u() {
  var n, t;
  return ((t = (n = c()) == null ? void 0 : n.config) == null ? void 0 : t.get("page.is_landing_page")) === !0;
}
function g() {
  var t;
  const n = l().page_for_product;
  return typeof n == "boolean" || n === void 0 || n === null ? n === !1 ? "promotion" : "product" : typeof n == "string" ? n === "promotion" ? "promotion" : "product" : Array.isArray(n) && ((t = n[0]) == null ? void 0 : t.value) === "promotion" ? "promotion" : "product";
}
function d() {
  var t, e;
  if (!u() || g() !== "product") return null;
  const n = (e = (t = l().product) == null ? void 0 : t.value) == null ? void 0 : e[0];
  return n ? String(n) : null;
}
function h() {
  const n = l();
  return { text: String(n.main_btn_text || ""), url: String(n.main_btn_url || "") };
}
const y = "1886435134", k = "https://cdn.files.salla.network/theme/1886435134/c09fe18e-8c22-412e-b07b-c3df22c79c52.png", b = "https://cdn.files.salla.network/homepage/1886435134/2a7f35f4-dfb6-467c-95d8-cfc3f86898b0.webp", m = ["images", "rating", "sold_quantity"];
async function f(n, t) {
  var e;
  try {
    const i = m.map((r) => `with[]=${r}`).join("&"), o = await (await fetch(`https://api.salla.dev/store/v1/products/${n}/details?${i}`, {
      headers: { "store-identifier": t }
    })).json();
    return (e = o == null ? void 0 : o.data) != null && e.id ? o.data : null;
  } catch {
    return null;
  }
}
async function p(n) {
  var i, a, o, r;
  const t = c();
  if (!n) return null;
  if (await ((i = t == null ? void 0 : t.onReady) == null ? void 0 : i.call(t)), u())
    try {
      const s = await ((a = t == null ? void 0 : t.product) == null ? void 0 : a.api.getDetails(n, m));
      return (o = s == null ? void 0 : s.data) != null && o.id ? s.data : null;
    } catch {
      return null;
    }
  const e = String(((r = t == null ? void 0 : t.config) == null ? void 0 : r.get("store.id")) || "");
  return e && await f(n, e) || f(n, y);
}
function w() {
  return window.location.pathname.split("/").filter(Boolean).pop() || "";
}
function E(n, t = 1) {
  var o, r;
  const e = c();
  try {
    const s = Number((n == null ? void 0 : n.sale_price) || (n == null ? void 0 : n.price) || 0);
    (r = e == null ? void 0 : e.analytics) == null || r.track("Buy Now", {
      page_id: w(),
      source: "selia-landing",
      product_id: n != null && n.id ? String(n.id) : d(),
      product_loaded: !!(n != null && n.id),
      name: (n == null ? void 0 : n.name) ?? null,
      quantity: t,
      price: n != null && n.id ? s * t : null,
      currency: (n == null ? void 0 : n.currency) || ((o = e == null ? void 0 : e.config) == null ? void 0 : o.get("user.currency_code")) || null
    });
  } catch {
  }
  const i = document.querySelector(".s-block--fast-checkout"), a = i == null ? void 0 : i.getAttribute("data-layout");
  if (window.innerWidth < 1024 || a === "side-drawer" || !i) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  i.scrollIntoView({ behavior: "smooth", block: "center" });
}
function _(n, t = 20) {
  if (n <= 1) return;
  const e = document.querySelector(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (e != null && e.setValue) {
    e.setValue(n);
    return;
  }
  t > 0 && window.setTimeout(() => _(n, t - 1), 100);
}
function I(n = "") {
  if (d()) return { kind: "checkout" };
  if (u() && g() === "promotion") {
    const t = h().url || n;
    return t ? { kind: "link", url: t } : { kind: "none" };
  }
  return u() ? n ? { kind: "link", url: n } : { kind: "none" } : { kind: "checkout" };
}
function v(n) {
  const t = c();
  return t != null && t.money ? t.money(n) : String(n);
}
export {
  k as P,
  b as a,
  I as c,
  p as f,
  c as g,
  u as i,
  d as l,
  v as m,
  E as o,
  g as p,
  _ as s
};
