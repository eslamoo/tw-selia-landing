import { LitElement as _, nothing as p, html as o } from "lit";
import { property as g, state as u } from "lit/decorators.js";
import { i as f, c as h, a as q, g as v, r as n, s as b } from "./styles-Czqp750h.js";
var $ = Object.defineProperty, m = (c, e, i, l) => {
  for (var s = void 0, r = c.length - 1, t; r >= 0; r--)
    (t = c[r]) && (s = t(e, i, s) || s);
  return s && $(e, i, s), s;
};
const y = `
.slp-faq__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: .875rem; align-items: start; }
@container (min-width: 768px) { .slp-faq--two .slp-faq__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; } }
.slp-faq__item { border: 1px solid var(--slp-border); border-radius: .875rem; background: var(--slp-card); overflow: hidden; }
.slp-faq__q { display: flex; align-items: center; justify-content: space-between; gap: .75rem; width: 100%; padding: 1rem 1.25rem; border: 0; background: transparent; font: inherit; font-size: 1rem; font-weight: 700; line-height: 1.5; color: var(--slp-text); text-align: start; cursor: pointer; }
.slp-faq__q i { flex: 0 0 1.75rem; height: 1.75rem; display: flex; align-items: center; justify-content: center; border-radius: 999px; background: var(--color-primary, #111); color: var(--color-primary-reverse, #fff); font-size: 1rem; transition: transform .3s ease; }
.slp-faq__item.is-open .slp-faq__q i { transform: rotate(180deg); }
.slp-faq__a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.slp-faq__item.is-open .slp-faq__a { grid-template-rows: 1fr; }
.slp-faq__a > div { overflow: hidden; }
.slp-faq__a p { padding: 0 1.25rem 1.125rem; font-size: .9375rem; line-height: 1.85; color: var(--slp-muted); white-space: pre-line; }
@media (prefers-reduced-motion: reduce) { .slp-faq__a, .slp-faq__q i { transition: none; } }
`;
class d extends _ {
  constructor() {
    super(...arguments), this.open = 0, this.uid = `slp-faq-${Math.random().toString(36).slice(2, 8)}`;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), f("slp-base", h), f("slp-faq", y);
  }
  render() {
    const e = q(this.config), i = v(e.items, "items").filter((t) => n(t.question));
    if (!i.length) return p;
    const l = n(e.title), s = n(e.subtitle), r = this.uid;
    return o`<section class="slp-block slp-section slp-faq ${b(e)}${e.two_columns !== !1 ? " slp-faq--two" : ""}" style="${e.bg_color ? `--slp-section-bg:${e.bg_color}` : ""}">
      <div class="slp-container">
        ${l || s ? o`<div class="slp-title">${l ? o`<h2>${l}</h2>` : p}${s ? o`<p>${s}</p>` : p}</div>` : p}
        <div class="slp-faq__grid">
          ${i.map((t, a) => o`<div class="slp-faq__item ${this.open === a ? "is-open" : ""}">
            <button type="button" class="slp-faq__q" aria-expanded=${this.open === a ? "true" : "false"} aria-controls="${r}-${a}"
              @click=${() => this.open = this.open === a ? -1 : a}>
              <span>${n(t.question)}</span><i class="sicon-keyboard_arrow_down"></i>
            </button>
            <div class="slp-faq__a" id="${r}-${a}" role="region"><div><p>${n(t.answer)}</p></div></div>
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
m([
  g({ type: Object })
], d.prototype, "config");
m([
  u()
], d.prototype, "open");
typeof d < "u" && d.registerSallaComponent("salla-faq");
export {
  d as default
};
