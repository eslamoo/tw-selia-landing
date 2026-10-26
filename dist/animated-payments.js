import { LitElement as y, html as l, nothing as n } from "lit";
import { property as m, state as d } from "lit/decorators.js";
import { i as g, c as _, u as h, g as f, r as u, a as v, s as b, d as x } from "./styles-mnx-lBt0.js";
import { g as w } from "./landing-BqmPvx7F.js";
var $ = Object.defineProperty, c = (i, s, e, t) => {
  for (var a = void 0, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (a = r(s, e, a) || a);
  return a && $(s, e, a), a;
};
const k = `
.slp-pay { --slp-pay-gap: calc(clamp(10rem, 1rem + 40vmin, 30rem) / 14); }
.slp-pay__row { display: flex; overflow: hidden; direction: ltr; user-select: none; margin: 15px 0; gap: var(--slp-pay-gap);
  mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0));
  -webkit-mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0)); }
.slp-pay__group { flex-shrink: 0; display: flex; align-items: center; gap: var(--slp-pay-gap); animation: slp-pay-scroll 60s linear infinite; }
.slp-pay__row--reverse .slp-pay__group { animation-direction: reverse; animation-delay: -3s; }
.slp-pay__row:hover .slp-pay__group { animation-play-state: paused; }
.slp-pay__logo { flex: none; border-radius: 10px; background: var(--slp-pay-logo-bg, #eeeeee); }
.slp-pay__logo img { display: block; width: 100px; height: 100px; padding: 10px; object-fit: contain; transition: all .3s; }
.slp-pay--big .slp-pay__logo img { width: 130px; height: 130px; }
@container (max-width: 991px) { .slp-pay__logo img { width: 70px; height: 70px; } .slp-pay--big .slp-pay__logo img { width: 90px; height: 90px; } }
.slp-pay--gray .slp-pay__logo img { filter: grayscale(1); transition: filter .3s ease; }
.slp-pay--gray .slp-pay__group:hover .slp-pay__logo img { filter: grayscale(0); }
@keyframes slp-pay-scroll { to { transform: translateX(calc(-100% - var(--slp-pay-gap))); } }
@media (prefers-reduced-motion: reduce) { .slp-pay__group { animation-play-state: paused; } }
`;
class p extends y {
  constructor() {
    super(...arguments), this.storeLogos = [];
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var t, a;
    super.connectedCallback(), this.classList.add("slp-host"), g("slp-base", _), g("slp-animated-payments", k);
    const s = w();
    await ((t = s == null ? void 0 : s.onReady) == null ? void 0 : t.call(s));
    const e = ((a = s == null ? void 0 : s.config) == null ? void 0 : a.get("store.settings.payments")) || [];
    this.storeLogos = e.map((o) => ({ src: s.url.cdn(`images/payment/${o}_mini.png`, 116, 116), name: o }));
  }
  logos(s) {
    return h(s.source) === "custom" ? f(s.logos, "logos").filter((e) => e.logo).map((e) => ({ src: e.logo, name: u(e.name) })) : this.storeLogos;
  }
  row(s, e = !1) {
    const t = Math.max(2, Math.ceil(12 / s.length)), a = (o) => l`<div class="slp-pay__group" aria-hidden=${o ? "true" : "false"}>
      ${Array.from({ length: t }).flatMap(() => s).map((r) => l`<div class="slp-pay__logo">
        <img src=${r.src} alt=${o ? "" : r.name} loading="lazy" /></div>`)}
    </div>`;
    return l`<div class="slp-pay__row${e ? " slp-pay__row--reverse" : ""}">${a(!1)}${a(!0)}</div>`;
  }
  render() {
    const s = v(this.config), e = this.logos(s);
    if (!e.length) return n;
    const t = [
      s.bg_color ? `--slp-section-bg:${s.bg_color}` : "",
      s.logos_bg ? `--slp-pay-logo-bg:${s.logos_bg}` : ""
    ].filter(Boolean).join(";");
    return l`<section class="slp-block slp-section slp-pay ${b(s)}${s.grayscale ? " slp-pay--gray" : ""}${s.bigger_logos ? " slp-pay--big" : ""}" style=${t}>
      <div class="slp-container">
        ${x(s)}
        ${this.row(e)}
        ${s.second_row !== !1 ? this.row(e, !0) : n}
      </div>
    </section>`;
  }
}
c([
  m({ type: Object })
], p.prototype, "config");
c([
  d()
], p.prototype, "storeLogos");
typeof p < "u" && p.registerSallaComponent("salla-animated-payments");
export {
  p as default
};
