import { LitElement as u, nothing as o, html as a } from "lit";
import { property as b } from "lit/decorators.js";
import { i as v, c as h, a as m, g, r as n, s as x, t as _ } from "./styles-Czqp750h.js";
var y = Object.defineProperty, w = (p, e, i, r) => {
  for (var t = void 0, s = p.length - 1, l; s >= 0; s--)
    (l = p[s]) && (t = l(e, i, t) || t);
  return t && y(e, i, t), t;
};
const $ = `
.slp-rv.slp-section { background: var(--slp-section-bg, var(--slp-surface-2)); }
.slp-rv__track { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: .25rem .25rem 1rem; scrollbar-width: none; }
.slp-rv__track::-webkit-scrollbar { display: none; }
.slp-rv__card { position: relative; flex: 0 0 85%; scroll-snap-align: start; display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem; padding: 1.5rem; border-radius: 1rem; background: var(--slp-rv-card, var(--slp-card)); box-shadow: 0 2px 5px rgb(50 50 105 / 12%), 0 1px 1px rgb(0 0 0 / 5%); }
@container (min-width: 640px) { .slp-rv__card { flex-basis: calc((100% - 1rem) / 2); } }
@container (min-width: 1024px) { .slp-rv__card { flex-basis: calc((100% - 2rem) / 3); } }
.slp-rv__quote { position: absolute; top: 1rem; inset-inline-end: 1rem; font-size: 2rem; opacity: .1; }
.slp-rv__text { font-size: .9375rem; line-height: 1.85; color: var(--slp-text); }
.slp-rv__author { display: flex; align-items: center; gap: .875rem; }
.slp-rv__avatar { flex: 0 0 3.25rem; width: 3.25rem; height: 3.25rem; border-radius: 999px; object-fit: cover; }
.slp-rv__initials { display: flex; align-items: center; justify-content: center; background: var(--color-primary, #111); color: var(--color-primary-reverse, #fff); font-weight: 700; font-size: 1.125rem; }
.slp-rv__name { font-size: 1rem; font-weight: 700; color: var(--slp-text); }
.slp-rv__stars { display: flex; gap: .125rem; margin-top: .25rem; font-size: .8125rem; color: #d1d5db; }
.slp-rv__stars .is-on { color: #f5a524; }
.slp-rv__nav { display: flex; justify-content: center; gap: .5rem; margin-top: .5rem; }
.slp-rv__nav button { width: 2.5rem; height: 2.5rem; border: 1px solid var(--slp-border); border-radius: 999px; background: var(--slp-card); color: var(--slp-text); cursor: pointer; font-size: 1rem; }
`;
class d extends u {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), v("slp-base", h), v("slp-custom-reviews", $), m(this.config).autoplay !== !1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && (this.timer = window.setInterval(() => this.step(1, !0), 5e3));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  step(e, i = !1) {
    const r = this.querySelector(".slp-rv__track"), t = r == null ? void 0 : r.querySelector(".slp-rv__card");
    if (!r || !t) return;
    const s = (t.offsetWidth + 16) * e * (getComputedStyle(r).direction === "rtl" ? -1 : 1), l = r.scrollWidth - r.clientWidth, c = Math.abs(r.scrollLeft) >= l - 4;
    i && c ? r.scrollTo({ left: 0 }) : r.scrollBy({ left: s });
  }
  initials(e) {
    return e.trim().charAt(0);
  }
  render() {
    const e = m(this.config), i = g(e.items, "items").filter((s) => n(s.review));
    if (!i.length) return o;
    const r = n(e.title), t = n(e.subtitle);
    return a`<section class="slp-block slp-section slp-rv ${x(e)}" style="${e.bg_color ? `--slp-section-bg:${e.bg_color};` : ""}${e.card_bg ? `--slp-rv-card:${e.card_bg}` : ""}">
      <div class="slp-container">
        ${r || t ? a`<div class="slp-title">${r ? a`<h2>${r}</h2>` : o}${t ? a`<p>${t}</p>` : o}</div>` : o}
        <div class="slp-rv__track" @pointerdown=${() => window.clearInterval(this.timer)}>
          ${i.map((s) => {
      const l = n(s.name), c = Math.min(Math.max(Number(s.rate) || 5, 1), 5);
      return a`<article class="slp-rv__card">
              <i class="slp-rv__quote sicon-quote"></i>
              <p class="slp-rv__text">${n(s.review)}</p>
              <div class="slp-rv__author">
                ${s.image ? a`<img class="slp-rv__avatar" src=${s.image} alt=${l} loading="lazy" />` : a`<span class="slp-rv__avatar slp-rv__initials" aria-hidden="true">${this.initials(l)}</span>`}
                <div>
                  <h3 class="slp-rv__name">${l}</h3>
                  <div class="slp-rv__stars" aria-label="${c}/5">
                    ${[1, 2, 3, 4, 5].map((f) => a`<i class="sicon-star2 ${f <= c ? "is-on" : ""}"></i>`)}
                  </div>
                </div>
              </div>
            </article>`;
    })}
        </div>
        ${i.length > 1 ? a`<div class="slp-rv__nav">
              <button type="button" aria-label=${_({ ar: "السابق", en: "Previous" })} @click=${() => this.step(-1)}><i class="sicon-keyboard_arrow_right"></i></button>
              <button type="button" aria-label=${_({ ar: "التالي", en: "Next" })} @click=${() => this.step(1)}><i class="sicon-keyboard_arrow_left"></i></button>
            </div>` : o}
      </div>
    </section>`;
  }
}
w([
  b({ type: Object })
], d.prototype, "config");
typeof d < "u" && d.registerSallaComponent("salla-custom-reviews");
export {
  d as default
};
