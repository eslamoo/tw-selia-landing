import { LitElement as f, nothing as m, html as p } from "lit";
import { property as _, state as g } from "lit/decorators.js";
import { i as d, c as u, a as q, g as h, r as n, s as v, d as b } from "./styles-C_EATfst.js";
var y = Object.defineProperty, c = (i, t, r, o) => {
  for (var e = void 0, s = i.length - 1, l; s >= 0; s--)
    (l = i[s]) && (e = l(t, r, e) || e);
  return e && y(t, r, e), e;
};
const w = `
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
class a extends f {
  constructor() {
    super(...arguments), this.open = 0, this.uid = `slp-faq-${Math.random().toString(36).slice(2, 8)}`;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), d("slp-base", u), d("slp-faq", w);
  }
  render() {
    const t = q(this.config), r = h(t.items, "items").filter((e) => n(e.question));
    if (!r.length) return m;
    const o = this.uid;
    return p`<section class="slp-block slp-section slp-faq ${v(t)}${t.two_columns !== !1 ? " slp-faq--two" : ""}" style="${t.bg_color ? `--slp-section-bg:${t.bg_color}` : ""}">
      <div class="slp-container">
        ${b(t)}
        <div class="slp-faq__grid">
          ${r.map((e, s) => p`<div class="slp-faq__item ${this.open === s ? "is-open" : ""}">
            <button type="button" class="slp-faq__q" aria-expanded=${this.open === s ? "true" : "false"} aria-controls="${o}-${s}"
              @click=${() => this.open = this.open === s ? -1 : s}>
              <span>${n(e.question)}</span><i class="sicon-keyboard_arrow_down"></i>
            </button>
            <div class="slp-faq__a" id="${o}-${s}" role="region"><div><p>${n(e.answer)}</p></div></div>
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
c([
  _({ type: Object })
], a.prototype, "config");
c([
  g()
], a.prototype, "open");
typeof a < "u" && a.registerSallaComponent("salla-faq");
export {
  a as default
};
