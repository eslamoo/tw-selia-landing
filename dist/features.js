import { LitElement as m, nothing as c, html as i } from "lit";
import { property as d } from "lit/decorators.js";
import { i as p, c as g, a as _, g as h, r as o, s as b, d as u } from "./styles-C_EATfst.js";
var v = Object.defineProperty, x = (l, t, r, f) => {
  for (var s = void 0, e = l.length - 1, n; e >= 0; e--)
    (n = l[e]) && (s = n(t, r, s) || s);
  return s && v(t, r, s), s;
};
const y = `
.slp-ft__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
@container (min-width: 768px) { .slp-ft__grid { grid-template-columns: repeat(var(--slp-ft-cols, 4), minmax(0, 1fr)); gap: 1.5rem; } }
.slp-ft__item { position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: .625rem; padding: 1.5rem 1rem; border: 1px solid var(--slp-border); border-radius: 1rem; background: var(--slp-card); text-align: center; transition: transform .3s ease, box-shadow .3s ease; }
.slp-ft__item::after { content: ""; position: absolute; inset-inline: 0; bottom: 0; height: 3px; background: var(--color-primary, #111); transform: scaleX(0); transition: transform .35s ease; }
.slp-ft__item:hover { transform: translateY(-4px); box-shadow: 0 18px 35px -20px rgb(0 0 0 / 25%); }
.slp-ft__item:hover::after { transform: scaleX(1); }
.slp-ft__icon { display: flex; align-items: center; justify-content: center; width: 3.5rem; height: 3.5rem; border-radius: 999px; background: var(--slp-ft-icon-bg, var(--color-primary, #111)); color: var(--color-primary-reverse, #fff); font-size: 1.5rem; }
.slp-ft__img { width: 4rem; height: 4rem; object-fit: contain; }
.slp-ft__item h3 { font-size: 1rem; line-height: 1.4; font-weight: 700; color: var(--slp-text); }
.slp-ft__item p { font-size: .875rem; line-height: 1.7; color: var(--slp-muted); }
@media (prefers-reduced-motion: reduce) { .slp-ft__item, .slp-ft__item::after { transition: none; } }
`;
class a extends m {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), p("slp-base", g), p("slp-features", y);
  }
  render() {
    const t = _(this.config), r = h(t.items, "items").filter((e) => o(e.title));
    if (!r.length) return c;
    const s = `--slp-ft-cols:${r.length > 3 ? 4 : r.length};${t.bg_color ? `--slp-section-bg:${t.bg_color};` : ""}${t.icon_bg ? `--slp-ft-icon-bg:${t.icon_bg}` : ""}`;
    return i`<section class="slp-block slp-section slp-ft ${b(t)}" style=${s}>
      <div class="slp-container">
        ${u(t)}
        <div class="slp-ft__grid">
          ${r.map((e) => i`<div class="slp-ft__item">
            ${e.image ? i`<img class="slp-ft__img" src=${e.image} alt="" loading="lazy" />` : i`<span class="slp-ft__icon"><i class=${e.icon || "sicon-star2"}></i></span>`}
            <h3>${o(e.title)}</h3>
            ${o(e.sub_title) ? i`<p>${o(e.sub_title)}</p>` : c}
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
x([
  d({ type: Object })
], a.prototype, "config");
typeof a < "u" && a.registerSallaComponent("salla-features");
export {
  a as default
};
