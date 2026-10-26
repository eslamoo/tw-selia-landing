import { LitElement as d, nothing as o, html as r } from "lit";
import { property as g } from "lit/decorators.js";
import { i as m, c as _, a as h, g as b, r as l, s as u } from "./styles-Czqp750h.js";
var v = Object.defineProperty, x = (p, e, i, a) => {
  for (var t = void 0, n = p.length - 1, c; n >= 0; n--)
    (c = p[n]) && (t = c(e, i, t) || t);
  return t && v(e, i, t), t;
};
const $ = `
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
class f extends d {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), m("slp-base", _), m("slp-features", $);
  }
  render() {
    const e = h(this.config), i = b(e.items, "items").filter((s) => l(s.title));
    if (!i.length) return o;
    const a = l(e.title), t = l(e.subtitle), c = `--slp-ft-cols:${i.length > 3 ? 4 : i.length};${e.bg_color ? `--slp-section-bg:${e.bg_color};` : ""}${e.icon_bg ? `--slp-ft-icon-bg:${e.icon_bg}` : ""}`;
    return r`<section class="slp-block slp-section slp-ft ${u(e)}" style=${c}>
      <div class="slp-container">
        ${a || t ? r`<div class="slp-title">${a ? r`<h2>${a}</h2>` : o}${t ? r`<p>${t}</p>` : o}</div>` : o}
        <div class="slp-ft__grid">
          ${i.map((s) => r`<div class="slp-ft__item">
            ${s.image ? r`<img class="slp-ft__img" src=${s.image} alt="" loading="lazy" />` : r`<span class="slp-ft__icon"><i class=${s.icon || "sicon-star2"}></i></span>`}
            <h3>${l(s.title)}</h3>
            ${l(s.sub_title) ? r`<p>${l(s.sub_title)}</p>` : o}
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
x([
  g({ type: Object })
], f.prototype, "config");
typeof f < "u" && f.registerSallaComponent("salla-features");
export {
  f as default
};
