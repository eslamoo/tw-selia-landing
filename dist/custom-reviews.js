import { LitElement as f, nothing as p, html as l } from "lit";
import { property as u } from "lit/decorators.js";
import { i as d, c as b, a as v, g as h, r as n, s as g, d as x, t as m } from "./styles-C_EATfst.js";
var y = Object.defineProperty, w = (o, r, t, e) => {
  for (var s = void 0, a = o.length - 1, i; a >= 0; a--)
    (i = o[a]) && (s = i(r, t, s) || s);
  return s && y(r, t, s), s;
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
class c extends f {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), d("slp-base", b), d("slp-custom-reviews", $), v(this.config).autoplay !== !1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && (this.timer = window.setInterval(() => this.step(1, !0), 5e3));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  step(r, t = !1) {
    const e = this.querySelector(".slp-rv__track"), s = e == null ? void 0 : e.querySelector(".slp-rv__card");
    if (!e || !s) return;
    const a = (s.offsetWidth + 16) * r * (getComputedStyle(e).direction === "rtl" ? -1 : 1), i = e.scrollWidth - e.clientWidth, _ = Math.abs(e.scrollLeft) >= i - 4;
    t && _ ? e.scrollTo({ left: 0 }) : e.scrollBy({ left: a });
  }
  initials(r) {
    return r.trim().charAt(0);
  }
  render() {
    const r = v(this.config), t = h(r.items, "items").filter((e) => n(e.review));
    return t.length ? l`<section class="slp-block slp-section slp-rv ${g(r)}" style="${r.bg_color ? `--slp-section-bg:${r.bg_color};` : ""}${r.card_bg ? `--slp-rv-card:${r.card_bg}` : ""}">
      <div class="slp-container">
        ${x(r)}
        <div class="slp-rv__track" @pointerdown=${() => window.clearInterval(this.timer)}>
          ${t.map((e) => {
      const s = n(e.name), a = Math.min(Math.max(Number(e.rate) || 5, 1), 5);
      return l`<article class="slp-rv__card">
              <i class="slp-rv__quote sicon-quote"></i>
              <p class="slp-rv__text">${n(e.review)}</p>
              <div class="slp-rv__author">
                ${e.image ? l`<img class="slp-rv__avatar" src=${e.image} alt=${s} loading="lazy" />` : l`<span class="slp-rv__avatar slp-rv__initials" aria-hidden="true">${this.initials(s)}</span>`}
                <div>
                  <h3 class="slp-rv__name">${s}</h3>
                  <div class="slp-rv__stars" aria-label="${a}/5">
                    ${[1, 2, 3, 4, 5].map((i) => l`<i class="sicon-star2 ${i <= a ? "is-on" : ""}"></i>`)}
                  </div>
                </div>
              </div>
            </article>`;
    })}
        </div>
        ${t.length > 1 ? l`<div class="slp-rv__nav">
              <button type="button" aria-label=${m({ ar: "السابق", en: "Previous" })} @click=${() => this.step(-1)}><i class="sicon-keyboard_arrow_right"></i></button>
              <button type="button" aria-label=${m({ ar: "التالي", en: "Next" })} @click=${() => this.step(1)}><i class="sicon-keyboard_arrow_left"></i></button>
            </div>` : p}
      </div>
    </section>` : p;
  }
}
w([
  u({ type: Object })
], c.prototype, "config");
typeof c < "u" && c.registerSallaComponent("salla-custom-reviews");
export {
  c as default
};
