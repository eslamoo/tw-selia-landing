import { LitElement as d, nothing as p, html as n } from "lit";
import { property as m } from "lit/decorators.js";
import { i as c, c as _, a as x, r as g, b as h } from "./styles-Czqp750h.js";
var v = Object.defineProperty, u = (l, t, s, o) => {
  for (var e = void 0, a = l.length - 1, i; a >= 0; a--)
    (i = l[a]) && (e = i(t, s, e) || e);
  return e && v(t, s, e), e;
};
const y = `
.slp-at { overflow: hidden; padding-block: 5px; background: var(--slp-at-bg, #111); color: var(--slp-at-color, #fff); }
.slp-at .slp-at__list { display: flex; margin: 0; padding: 5px 0; list-style: none; white-space: nowrap; }
.slp-at__item { flex: none; display: flex; align-items: center; font-size: 15px; font-weight: 400; line-height: 26px;
  animation: slp-at-ltr var(--slp-at-speed, 7s) linear infinite; }
.slp-at--rtl .slp-at__item { animation-name: slp-at-rtl; }
.slp-at--reverse .slp-at__item { animation-direction: reverse; }
.slp-at__list:hover .slp-at__item { animation-play-state: paused; }
.slp-at__text { padding: 0 15px; }
.slp-at__item i { font-size: 12px; opacity: .85; }
@keyframes slp-at-ltr { to { transform: translateX(-100%); } }
@keyframes slp-at-rtl { to { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .slp-at__item { animation: none; } }
`, b = 14;
class r extends d {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), c("slp-base", _), c("slp-animated-text", y);
  }
  render() {
    const t = x(this.config), s = g(t.text);
    if (!s) return p;
    const o = Math.min(Math.max(Number(t.speed) || 7, 3), 60), e = `--slp-at-bg:${t.bg || "#111111"};--slp-at-color:${t.color || "#ffffff"};--slp-at-speed:${o}s`, a = ["slp-block slp-at", h() ? "slp-at--rtl" : "", t.reverse ? "slp-at--reverse" : ""].filter(Boolean).join(" ");
    return n`<div class=${a} style=${e}>
      <ul class="slp-at__list">
        ${Array.from({ length: b }, (i, f) => n`<li class="slp-at__item" aria-hidden=${f ? "true" : "false"}>
          <span class="slp-at__text">${s}</span>${t.icon ? n`<i class=${t.icon}></i>` : p}
        </li>`)}
      </ul>
    </div>`;
  }
}
u([
  m({ type: Object })
], r.prototype, "config");
typeof r < "u" && r.registerSallaComponent("salla-animated-text");
export {
  r as default
};
