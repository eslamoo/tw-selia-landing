import { LitElement as f, nothing as p, html as l } from "lit";
import { property as m } from "lit/decorators.js";
import { i as c, c as v, a as _, r as h } from "./styles-CSVj0pVk.js";
var g = Object.defineProperty, u = (i, e, a, o) => {
  for (var t = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (t = r(e, a, t) || t);
  return t && g(e, a, t), t;
};
const b = `
.slp-at { overflow: hidden; background: var(--slp-at-bg, #111); color: var(--slp-at-color, #fff); direction: ltr; }
.slp-at__track { display: flex; width: max-content; animation: slp-at-scroll var(--slp-at-speed, 30s) linear infinite; }
.slp-at--reverse .slp-at__track { animation-direction: reverse; }
.slp-at:hover .slp-at__track { animation-play-state: paused; }
.slp-at__item { display: flex; align-items: center; gap: 1.25rem; padding: .8rem 1.25rem; font-size: .9375rem; font-weight: 700; line-height: 1.4; white-space: nowrap; direction: rtl; }
.slp-at__item i { font-size: .8125rem; opacity: .85; }
@keyframes slp-at-scroll { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .slp-at__track { animation: none; } }
`;
class n extends f {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), c("slp-base", v), c("slp-animated-text", b);
  }
  render() {
    const e = _(this.config), a = h(e.text);
    if (!a) return p;
    const o = Math.min(Math.max(Number(e.speed) || 30, 8), 90), t = `--slp-at-bg:${e.bg || "#111111"};--slp-at-color:${e.color || "#ffffff"};--slp-at-speed:${o}s`, s = Array.from({ length: 16 }, (r, d) => d);
    return l`<div class="slp-block slp-at${e.reverse ? " slp-at--reverse" : ""}" style=${t} role="marquee" aria-label=${a}>
      <div class="slp-at__track">
        ${s.map((r) => l`<div class="slp-at__item" aria-hidden=${r ? "true" : "false"}>
          <span>${a}</span>${e.icon ? l`<i class=${e.icon}></i>` : p}
        </div>`)}
      </div>
    </div>`;
  }
}
u([
  m({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-animated-text");
export {
  n as default
};
