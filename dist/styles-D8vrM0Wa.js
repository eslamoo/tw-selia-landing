function s(t) {
  return t ? t.component && typeof t.component == "object" ? t.component : t : {};
}
function o() {
  var t, e, n;
  return ((n = (e = (t = window.Salla) == null ? void 0 : t.lang) == null ? void 0 : e.getLocale) == null ? void 0 : n.call(e)) || document.documentElement.lang || "ar";
}
function a() {
  return (document.documentElement.dir || (o() === "ar" ? "rtl" : "ltr")) === "rtl";
}
function c(t) {
  if (t == null || t === "") return "";
  if (typeof t == "string") return t;
  if (typeof t == "object") {
    const e = t;
    return e[o()] || e.ar || e.en || "";
  }
  return String(t);
}
function p(t) {
  return o() === "ar" ? t.ar : t.en;
}
function d(t) {
  var e;
  return Array.isArray(t) ? ((e = t[0]) == null ? void 0 : e.value) ?? t[0] ?? "" : t && typeof t == "object" && "value" in t ? t.value : t ?? "";
}
function m(t, e) {
  return Array.isArray(t) ? t.map((n) => {
    if (!n || typeof n != "object") return {};
    const i = {};
    for (const [r, l] of Object.entries(n))
      i[r.startsWith(`${e}.`) ? r.slice(e.length + 1) : r] = l;
    return i;
  }) : [];
}
function b(t, e) {
  if (document.getElementById(t)) return;
  const n = document.createElement("style");
  n.id = t, n.textContent = e, document.head.appendChild(n);
}
const f = `
.slp-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
.slp-block { display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit); }
.slp-block *, .slp-block *::before, .slp-block *::after { box-sizing: border-box; }
.slp-block img, .slp-block video { display: block; max-width: 100%; }
.slp-block h2, .slp-block h3, .slp-block p, .slp-block ul { margin: 0; padding: 0; }
.slp-block ul { list-style: none; }
.slp-container { width: 100%; max-width: 1280px; margin-inline: auto; padding-inline: 1rem; }
.slp-section { padding-block: 2.5rem; }
@container (min-width: 768px) { .slp-section { padding-block: 3.5rem; } }
.slp-title { text-align: center; margin-bottom: 1.75rem; }
.slp-title h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 700; color: var(--slp-title-color, #111); }
.slp-title p { margin-top: .5rem; font-size: 1rem; line-height: 1.7; color: var(--slp-subtitle-color, #6b7280); }
.slp-title::after { content: ""; display: block; width: 5rem; height: 2px; margin: .75rem auto 0; border-radius: 2px; background: var(--color-primary, #111); }
@container (min-width: 768px) { .slp-title h2 { font-size: 2.25rem; } }
.slp-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 3rem; padding: .75rem 1.75rem; border: 1px solid transparent; border-radius: var(--slp-radius, .5rem); font: inherit; font-weight: 700; font-size: 1rem; line-height: 1.2; text-decoration: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease, background-color .2s ease; }
.slp-btn:hover { transform: translateY(-1px); opacity: .92; }
.slp-btn:focus-visible { outline: 2px solid var(--color-primary, #111); outline-offset: 3px; }
.slp-btn[disabled] { opacity: .5; cursor: not-allowed; transform: none; }
@media (prefers-reduced-motion: reduce) { .slp-btn { transition: none; } .slp-btn:hover { transform: none; } }
`;
export {
  s as a,
  a as b,
  f as c,
  o as d,
  m as g,
  b as i,
  c as r,
  p as t,
  d as u
};
