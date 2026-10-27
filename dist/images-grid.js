import { LitElement as c, nothing as g, html as t } from "lit";
import { property as d } from "lit/decorators.js";
import { i as p, c as m, a as _, r as f, s as b, d as u } from "./styles-oAYEgvXC.js";
var h = Object.defineProperty, v = (s, l, i, a) => {
  for (var e = void 0, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (e = n(l, i, e) || e);
  return e && h(l, i, e), e;
};
const w = `
.slp-ig__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.slp-ig__cell { position: relative; overflow: hidden; min-height: 11rem; }
.slp-ig__cell--1 { grid-column: span 2; min-height: 15rem; }
@container (min-width: 768px) {
  .slp-ig__grid { grid-template-columns: repeat(5, minmax(0, 1fr)); grid-template-rows: 15rem 15rem; gap: 1rem; }
  .slp-ig__cell { min-height: 0; }
  .slp-ig__cell--1 { grid-column: 1 / span 2; grid-row: 1 / span 2; }
  .slp-ig__cell--2 { grid-column: 3 / span 2; grid-row: 1; }
  .slp-ig__cell--3 { grid-column: 3; grid-row: 2; }
  .slp-ig__cell--4 { grid-column: 4; grid-row: 2; }
  .slp-ig__cell--5 { grid-column: 5; grid-row: 1 / span 2; }
}
.slp-ig--rounded .slp-ig__cell { border-radius: 1rem; }
.slp-ig__cell img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
.slp-ig__cell:hover img { transform: scale(1.05); }
.slp-ig--overlay .slp-ig__cell::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgb(17 24 39 / 30%), rgb(17 24 39 / 5%)); }
.slp-ig--bottom .slp-ig__cell::after { background: linear-gradient(0deg, rgb(17 24 39 / 40%), rgb(17 24 39 / 0%) 60%); }
.slp-ig__label { position: absolute; z-index: 1; inset-inline-start: 0; top: 0; padding: 1rem; font-size: 1.375rem; line-height: 1.3; font-weight: 700; color: var(--slp-ig-color, #fff); }
.slp-ig--bottom .slp-ig__label { top: auto; bottom: 0; }
@container (min-width: 768px) { .slp-ig__label { font-size: 1.75rem; } }
@media (prefers-reduced-motion: reduce) { .slp-ig__cell img { transition: none; } }
`;
class o extends c {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), p("slp-base", m), p("slp-images-grid", w);
  }
  render() {
    const l = _(this.config), i = [1, 2, 3, 4, 5].map((e) => ({ n: e, src: l[`image_${e}`], label: f(l[`title_${e}`]) }));
    if (!i.some((e) => e.src)) return g;
    const a = [
      "slp-block slp-section slp-ig",
      b(l),
      l.rounded !== !1 ? "slp-ig--rounded" : "",
      l.overlay !== !1 ? "slp-ig--overlay" : "",
      l.bottom_titles ? "slp-ig--bottom" : ""
    ].filter(Boolean).join(" ");
    return t`<section class=${a} style="--slp-ig-color:${l.titles_color || "#ffffff"}">
      <div class="slp-container">
        ${u(l)}
        <div class="slp-ig__grid">
          ${i.filter((e) => e.src).map((e) => t`<div class="slp-ig__cell slp-ig__cell--${e.n}">
            <img src=${e.src} alt=${e.label} loading="lazy" />
            ${e.label ? t`<h3 class="slp-ig__label">${e.label}</h3>` : g}
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
v([
  d({ type: Object })
], o.prototype, "config");
typeof o < "u" && o.registerSallaComponent("salla-images-grid");
export {
  o as default
};
