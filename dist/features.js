import { LitElement as d, nothing as n, html as i } from "lit";
import { property as g } from "lit/decorators.js";
import { i as m, c as _, a as h, g as b, r as l } from "./styles-D8vrM0Wa.js";
var u = Object.defineProperty, v = (p, e, r, a) => {
  for (var t = void 0, o = p.length - 1, f; o >= 0; o--)
    (f = p[o]) && (t = f(e, r, t) || t);
  return t && u(e, r, t), t;
};
const x = `
.slp-ft { background: var(--slp-ft-bg, #fff); }
.slp-ft__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
@container (min-width: 768px) { .slp-ft__grid { grid-template-columns: repeat(var(--slp-ft-cols, 4), minmax(0, 1fr)); gap: 1.5rem; } }
.slp-ft__item { position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: .625rem; padding: 1.5rem 1rem; border: 1px solid #eee; border-radius: 1rem; background: #fff; text-align: center; transition: transform .3s ease, box-shadow .3s ease; }
.slp-ft__item::after { content: ""; position: absolute; inset-inline: 0; bottom: 0; height: 3px; background: var(--color-primary, #111); transform: scaleX(0); transition: transform .35s ease; }
.slp-ft__item:hover { transform: translateY(-4px); box-shadow: 0 18px 35px -20px rgb(0 0 0 / 25%); }
.slp-ft__item:hover::after { transform: scaleX(1); }
.slp-ft__icon { display: flex; align-items: center; justify-content: center; width: 3.5rem; height: 3.5rem; border-radius: 999px; background: var(--slp-ft-icon-bg, var(--color-primary, #111)); color: var(--color-primary-reverse, #fff); font-size: 1.5rem; }
.slp-ft__img { width: 4rem; height: 4rem; object-fit: contain; }
.slp-ft__item h3 { font-size: 1rem; line-height: 1.4; font-weight: 700; color: #111; }
.slp-ft__item p { font-size: .875rem; line-height: 1.7; color: #6b7280; }
@media (prefers-reduced-motion: reduce) { .slp-ft__item, .slp-ft__item::after { transition: none; } }
`;
class c extends d {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), m("slp-base", _), m("slp-features", x);
  }
  render() {
    const e = h(this.config), r = b(e.items, "items").filter((s) => l(s.title));
    if (!r.length) return n;
    const a = l(e.title), t = l(e.subtitle), o = r.length > 3 ? 4 : r.length, f = `--slp-ft-bg:${e.bg_color || "#ffffff"};--slp-ft-cols:${o};${e.icon_bg ? `--slp-ft-icon-bg:${e.icon_bg}` : ""}`;
    return i`<section class="slp-block slp-section slp-ft" style=${f}>
      <div class="slp-container">
        ${a || t ? i`<div class="slp-title">${a ? i`<h2>${a}</h2>` : n}${t ? i`<p>${t}</p>` : n}</div>` : n}
        <div class="slp-ft__grid">
          ${r.map((s) => i`<div class="slp-ft__item">
            ${s.image ? i`<img class="slp-ft__img" src=${s.image} alt="" loading="lazy" />` : i`<span class="slp-ft__icon"><i class=${s.icon || "sicon-star2"}></i></span>`}
            <h3>${l(s.title)}</h3>
            ${l(s.sub_title) ? i`<p>${l(s.sub_title)}</p>` : n}
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
v([
  g({ type: Object })
], c.prototype, "config");
typeof c < "u" && c.registerSallaComponent("salla-features");
export {
  c as default
};
