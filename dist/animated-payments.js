import { LitElement as y, html as n, nothing as p } from "lit";
import { property as d, state as f } from "lit/decorators.js";
import { i as g, c as _, u, g as h, r as c, a as v } from "./styles-D8vrM0Wa.js";
import { g as b } from "./landing-BYqcrX_B.js";
var $ = Object.defineProperty, m = (l, e, s, r) => {
  for (var t = void 0, a = l.length - 1, o; a >= 0; a--)
    (o = l[a]) && (t = o(e, s, t) || t);
  return t && $(e, s, t), t;
};
const w = `
.slp-pay { background: var(--slp-pay-bg, #fff); }
.slp-pay__row { display: flex; overflow: hidden; direction: ltr; user-select: none; gap: 1rem; margin-block: .75rem;
  mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent); }
.slp-pay__group { flex-shrink: 0; display: flex; align-items: center; gap: 1rem; animation: slp-pay-scroll var(--slp-pay-speed, 40s) linear infinite; }
.slp-pay__row--reverse .slp-pay__group { animation-direction: reverse; }
.slp-pay__row:hover .slp-pay__group { animation-play-state: paused; }
.slp-pay__logo { display: flex; align-items: center; justify-content: center; width: 6.5rem; height: 4.25rem; padding: .75rem; border-radius: .75rem; background: var(--slp-pay-logo-bg, #f4f4f5); }
.slp-pay__logo img { width: 100%; height: 100%; object-fit: contain; }
.slp-pay--gray .slp-pay__logo img { filter: grayscale(1); transition: filter .3s ease; }
.slp-pay--gray .slp-pay__logo:hover img { filter: none; }
@keyframes slp-pay-scroll { to { transform: translateX(calc(-100% - 1rem)); } }
@media (prefers-reduced-motion: reduce) { .slp-pay__group { animation: none; } }
`;
class i extends y {
  constructor() {
    super(...arguments), this.storeLogos = [];
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var r, t;
    super.connectedCallback(), this.classList.add("slp-host"), g("slp-base", _), g("slp-animated-payments", w);
    const e = b();
    await ((r = e == null ? void 0 : e.onReady) == null ? void 0 : r.call(e));
    const s = ((t = e == null ? void 0 : e.config) == null ? void 0 : t.get("store.settings.payments")) || [];
    this.storeLogos = s.map((a) => ({ src: e.url.cdn(`images/payment/${a}_mini.png`, 116, 116), name: a }));
  }
  logos(e) {
    return u(e.source) === "custom" ? h(e.logos, "logos").filter((s) => s.logo).map((s) => ({ src: s.logo, name: c(s.name) })) : this.storeLogos;
  }
  row(e, s = !1) {
    const r = Math.max(2, Math.ceil(12 / e.length)), t = (a) => n`<div class="slp-pay__group" aria-hidden=${a ? "true" : "false"}>
      ${Array.from({ length: r }).flatMap(() => e).map((o) => n`<div class="slp-pay__logo">
        <img src=${o.src} alt=${a ? "" : o.name} loading="lazy" /></div>`)}
    </div>`;
    return n`<div class="slp-pay__row${s ? " slp-pay__row--reverse" : ""}">${t(!1)}${t(!0)}</div>`;
  }
  render() {
    const e = v(this.config), s = this.logos(e);
    if (!s.length) return p;
    const r = c(e.title), t = `--slp-pay-bg:${e.bg_color || "#ffffff"};--slp-pay-logo-bg:${e.logos_bg || "#f4f4f5"};--slp-pay-speed:${Math.max(20, s.length * 6)}s`;
    return n`<section class="slp-block slp-section slp-pay${e.grayscale ? " slp-pay--gray" : ""}" style=${t}>
      <div class="slp-container">
        ${r ? n`<div class="slp-title"><h2>${r}</h2></div>` : p}
        ${this.row(s)}
        ${e.second_row ? this.row(s, !0) : p}
      </div>
    </section>`;
  }
}
m([
  d({ type: Object })
], i.prototype, "config");
m([
  f()
], i.prototype, "storeLogos");
typeof i < "u" && i.registerSallaComponent("salla-animated-payments");
export {
  i as default
};
