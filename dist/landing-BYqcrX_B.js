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
function y() {
  const n = l();
  return { text: String(n.main_btn_text || ""), url: String(n.main_btn_url || "") };
}
const h = "1886435134", m = ["images", "rating", "sold_quantity"];
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
async function _(n) {
  var i, s, o, r;
  const t = c();
  if (!n) return null;
  if (await ((i = t == null ? void 0 : t.onReady) == null ? void 0 : i.call(t)), u())
    try {
      const a = await ((s = t == null ? void 0 : t.product) == null ? void 0 : s.api.getDetails(n, m));
      return (o = a == null ? void 0 : a.data) != null && o.id ? a.data : null;
    } catch {
      return null;
    }
  const e = String(((r = t == null ? void 0 : t.config) == null ? void 0 : r.get("store.id")) || "");
  return e && await f(n, e) || f(n, h);
}
function w() {
  return window.location.pathname.split("/").filter(Boolean).pop() || "";
}
function v(n, t = 1) {
  var o, r;
  const e = c();
  try {
    const a = Number((n == null ? void 0 : n.sale_price) || (n == null ? void 0 : n.price) || 0);
    (r = e == null ? void 0 : e.analytics) == null || r.track("Buy Now", {
      page_id: w(),
      source: "selia-landing",
      product_id: n != null && n.id ? String(n.id) : d(),
      product_loaded: !!(n != null && n.id),
      name: (n == null ? void 0 : n.name) ?? null,
      quantity: t,
      price: n != null && n.id ? a * t : null,
      currency: (n == null ? void 0 : n.currency) || ((o = e == null ? void 0 : e.config) == null ? void 0 : o.get("user.currency_code")) || null
    });
  } catch {
  }
  const i = document.querySelector(".s-block--fast-checkout"), s = i == null ? void 0 : i.getAttribute("data-layout");
  if (window.innerWidth < 1024 || s === "side-drawer" || !i) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  i.scrollIntoView({ behavior: "smooth", block: "center" });
}
function k(n, t = 20) {
  if (n <= 1) return;
  const e = document.querySelector(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (e != null && e.setValue) {
    e.setValue(n);
    return;
  }
  t > 0 && window.setTimeout(() => k(n, t - 1), 100);
}
function b(n = "") {
  if (d()) return { kind: "checkout" };
  if (u() && g() === "promotion") {
    const t = y().url || n;
    return t ? { kind: "link", url: t } : { kind: "none" };
  }
  return u() ? n ? { kind: "link", url: n } : { kind: "none" } : { kind: "checkout" };
}
function I(n) {
  const t = c();
  return t != null && t.money ? t.money(n) : String(n);
}
export {
  b as c,
  _ as f,
  c as g,
  u as i,
  d as l,
  I as m,
  v as o,
  g as p,
  k as s
};
