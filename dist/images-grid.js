import { LitElement as d, nothing as a, html as r } from "lit";
import { property as m } from "lit/decorators.js";
import { i as p, c as _, a as f, r as c, s as b } from "./styles-CSVj0pVk.js";
var h = Object.defineProperty, u = (t, l, s, o) => {
  for (var i = void 0, e = t.length - 1, g; e >= 0; e--)
    (g = t[e]) && (i = g(l, s, i) || i);
  return i && h(l, s, i), i;
};
const v = `
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
class n extends d {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), p("slp-base", _), p("slp-images-grid", v);
  }
  render() {
    const l = f(this.config), s = [1, 2, 3, 4, 5].map((e) => ({ n: e, src: l[`image_${e}`], label: c(l[`title_${e}`]) }));
    if (!s.some((e) => e.src)) return a;
    const o = c(l.title), i = [
      "slp-block slp-section slp-ig",
      b(l),
      l.rounded !== !1 ? "slp-ig--rounded" : "",
      l.overlay !== !1 ? "slp-ig--overlay" : "",
      l.bottom_titles ? "slp-ig--bottom" : ""
    ].filter(Boolean).join(" ");
    return r`<section class=${i} style="--slp-ig-color:${l.titles_color || "#ffffff"}">
      <div class="slp-container">
        ${o ? r`<div class="slp-title"><h2>${o}</h2></div>` : a}
        <div class="slp-ig__grid">
          ${s.filter((e) => e.src).map((e) => r`<div class="slp-ig__cell slp-ig__cell--${e.n}">
            <img src=${e.src} alt=${e.label} loading="lazy" />
            ${e.label ? r`<h3 class="slp-ig__label">${e.label}</h3>` : a}
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
u([
  m({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-images-grid");
export {
  n as default
};
