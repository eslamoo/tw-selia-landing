import { LitElement as g, nothing as p, html as o } from "lit";
import { property as _, state as q } from "lit/decorators.js";
import { i as c, c as u, a as h, g as b, r as n } from "./styles-D8vrM0Wa.js";
var v = Object.defineProperty, m = (d, t, a, l) => {
  for (var e = void 0, r = d.length - 1, s; r >= 0; r--)
    (s = d[r]) && (e = s(t, a, e) || e);
  return e && v(t, a, e), e;
};
const $ = `
.slp-faq { background: var(--slp-faq-bg, #fff); }
.slp-faq__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: .875rem; align-items: start; }
@container (min-width: 768px) { .slp-faq--two .slp-faq__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; } }
.slp-faq__item { border: 1px solid #e5e7eb; border-radius: .875rem; background: #fff; overflow: hidden; }
.slp-faq__q { display: flex; align-items: center; justify-content: space-between; gap: .75rem; width: 100%; padding: 1rem 1.25rem; border: 0; background: transparent; font: inherit; font-size: 1rem; font-weight: 700; line-height: 1.5; color: #111; text-align: start; cursor: pointer; }
.slp-faq__q i { flex: 0 0 1.75rem; height: 1.75rem; display: flex; align-items: center; justify-content: center; border-radius: 999px; background: var(--color-primary, #111); color: var(--color-primary-reverse, #fff); font-size: 1rem; transition: transform .3s ease; }
.slp-faq__item.is-open .slp-faq__q i { transform: rotate(180deg); }
.slp-faq__a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.slp-faq__item.is-open .slp-faq__a { grid-template-rows: 1fr; }
.slp-faq__a > div { overflow: hidden; }
.slp-faq__a p { padding: 0 1.25rem 1.125rem; font-size: .9375rem; line-height: 1.85; color: #4b5563; white-space: pre-line; }
@media (prefers-reduced-motion: reduce) { .slp-faq__a, .slp-faq__q i { transition: none; } }
`;
class f extends g {
  constructor() {
    super(...arguments), this.open = 0, this.uid = `slp-faq-${Math.random().toString(36).slice(2, 8)}`;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), c("slp-base", u), c("slp-faq", $);
  }
  render() {
    const t = h(this.config), a = b(t.items, "items").filter((s) => n(s.question));
    if (!a.length) return p;
    const l = n(t.title), e = n(t.subtitle), r = this.uid;
    return o`<section class="slp-block slp-section slp-faq${t.two_columns !== !1 ? " slp-faq--two" : ""}" style="--slp-faq-bg:${t.bg_color || "#ffffff"}">
      <div class="slp-container">
        ${l || e ? o`<div class="slp-title">${l ? o`<h2>${l}</h2>` : p}${e ? o`<p>${e}</p>` : p}</div>` : p}
        <div class="slp-faq__grid">
          ${a.map((s, i) => o`<div class="slp-faq__item ${this.open === i ? "is-open" : ""}">
            <button type="button" class="slp-faq__q" aria-expanded=${this.open === i ? "true" : "false"} aria-controls="${r}-${i}"
              @click=${() => this.open = this.open === i ? -1 : i}>
              <span>${n(s.question)}</span><i class="sicon-keyboard_arrow_down"></i>
            </button>
            <div class="slp-faq__a" id="${r}-${i}" role="region"><div><p>${n(s.answer)}</p></div></div>
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
m([
  _({ type: Object })
], f.prototype, "config");
m([
  q()
], f.prototype, "open");
typeof f < "u" && f.registerSallaComponent("salla-faq");
export {
  f as default
};
