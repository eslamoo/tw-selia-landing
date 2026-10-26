import { LitElement as m, html as r, nothing as n } from "lit";
import { property as d, state as _ } from "lit/decorators.js";
import { i as g, c as h, u as f, g as u, r as c, a as v, s as b } from "./styles-Czqp750h.js";
import { g as x } from "./landing-BqmPvx7F.js";
var w = Object.defineProperty, y = (i, s, e, o) => {
  for (var a = void 0, t = i.length - 1, l; t >= 0; t--)
    (l = i[t]) && (a = l(s, e, a) || a);
  return a && w(s, e, a), a;
};
const $ = `
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
class p extends m {
  constructor() {
    super(...arguments), this.storeLogos = [];
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var o, a;
    super.connectedCallback(), this.classList.add("slp-host"), g("slp-base", h), g("slp-animated-payments", $);
    const s = x();
    await ((o = s == null ? void 0 : s.onReady) == null ? void 0 : o.call(s));
    const e = ((a = s == null ? void 0 : s.config) == null ? void 0 : a.get("store.settings.payments")) || [];
    this.storeLogos = e.map((t) => ({ src: s.url.cdn(`images/payment/${t}_mini.png`, 116, 116), name: t }));
  }
  logos(s) {
    return f(s.source) === "custom" ? u(s.logos, "logos").filter((e) => e.logo).map((e) => ({ src: e.logo, name: c(e.name) })) : this.storeLogos;
  }
  row(s, e = !1) {
    const o = Math.max(2, Math.ceil(12 / s.length)), a = (t) => r`<div class="slp-pay__group" aria-hidden=${t ? "true" : "false"}>
      ${Array.from({ length: o }).flatMap(() => s).map((l) => r`<div class="slp-pay__logo">
        <img src=${l.src} alt=${t ? "" : l.name} loading="lazy" /></div>`)}
    </div>`;
    return r`<div class="slp-pay__row${e ? " slp-pay__row--reverse" : ""}">${a(!1)}${a(!0)}</div>`;
  }
  render() {
    const s = v(this.config), e = this.logos(s);
    if (!e.length) return n;
    const o = c(s.title), a = [
      s.bg_color ? `--slp-section-bg:${s.bg_color}` : "",
      s.logos_bg ? `--slp-pay-logo-bg:${s.logos_bg}` : ""
    ].filter(Boolean).join(";");
    return r`<section class="slp-block slp-section slp-pay ${b(s)}${s.grayscale ? " slp-pay--gray" : ""}${s.bigger_logos ? " slp-pay--big" : ""}" style=${a}>
      <div class="slp-container">
        ${o ? r`<div class="slp-title"><h2>${o}</h2></div>` : n}
        ${this.row(e)}
        ${s.second_row !== !1 ? this.row(e, !0) : n}
      </div>
    </section>`;
  }
}
y([
  d({ type: Object })
], p.prototype, "config");
y([
  _()
], p.prototype, "storeLogos");
typeof p < "u" && p.registerSallaComponent("salla-animated-payments");
export {
  p as default
};
