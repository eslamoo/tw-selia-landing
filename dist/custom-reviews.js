import { LitElement as u, nothing as o, html as i } from "lit";
import { property as b } from "lit/decorators.js";
import { i as f, c as h, a as v, g, r as n, t as m } from "./styles-D8vrM0Wa.js";
var x = Object.defineProperty, y = (p, s, a, e) => {
  for (var t = void 0, r = p.length - 1, l; r >= 0; r--)
    (l = p[r]) && (t = l(s, a, t) || t);
  return t && x(s, a, t), t;
};
const w = `
.slp-rv { background: var(--slp-rv-bg, #f8f8f8); }
.slp-rv__track { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: .25rem .25rem 1rem; scrollbar-width: none; }
.slp-rv__track::-webkit-scrollbar { display: none; }
.slp-rv__card { position: relative; flex: 0 0 85%; scroll-snap-align: start; display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem; padding: 1.5rem; border-radius: 1rem; background: var(--slp-rv-card, #fff); box-shadow: 0 2px 5px rgb(50 50 105 / 12%), 0 1px 1px rgb(0 0 0 / 5%); }
@container (min-width: 640px) { .slp-rv__card { flex-basis: calc((100% - 1rem) / 2); } }
@container (min-width: 1024px) { .slp-rv__card { flex-basis: calc((100% - 2rem) / 3); } }
.slp-rv__quote { position: absolute; top: 1rem; inset-inline-end: 1rem; font-size: 2rem; opacity: .1; }
.slp-rv__text { font-size: .9375rem; line-height: 1.85; color: #1f2937; }
.slp-rv__author { display: flex; align-items: center; gap: .875rem; }
.slp-rv__avatar { flex: 0 0 3.25rem; width: 3.25rem; height: 3.25rem; border-radius: 999px; object-fit: cover; }
.slp-rv__initials { display: flex; align-items: center; justify-content: center; background: var(--color-primary, #111); color: var(--color-primary-reverse, #fff); font-weight: 700; font-size: 1.125rem; }
.slp-rv__name { font-size: 1rem; font-weight: 700; color: #111; }
.slp-rv__stars { display: flex; gap: .125rem; margin-top: .25rem; font-size: .8125rem; color: #d1d5db; }
.slp-rv__stars .is-on { color: #f5a524; }
.slp-rv__nav { display: flex; justify-content: center; gap: .5rem; margin-top: .5rem; }
.slp-rv__nav button { width: 2.5rem; height: 2.5rem; border: 1px solid #e5e7eb; border-radius: 999px; background: #fff; color: #111; cursor: pointer; font-size: 1rem; }
`;
class d extends u {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), f("slp-base", h), f("slp-custom-reviews", w), v(this.config).autoplay !== !1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && (this.timer = window.setInterval(() => this.step(1, !0), 5e3));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  step(s, a = !1) {
    const e = this.querySelector(".slp-rv__track"), t = e == null ? void 0 : e.querySelector(".slp-rv__card");
    if (!e || !t) return;
    const r = (t.offsetWidth + 16) * s * (getComputedStyle(e).direction === "rtl" ? -1 : 1), l = e.scrollWidth - e.clientWidth, c = Math.abs(e.scrollLeft) >= l - 4;
    a && c ? e.scrollTo({ left: 0 }) : e.scrollBy({ left: r });
  }
  initials(s) {
    return s.trim().charAt(0);
  }
  render() {
    const s = v(this.config), a = g(s.items, "items").filter((r) => n(r.review));
    if (!a.length) return o;
    const e = n(s.title), t = n(s.subtitle);
    return i`<section class="slp-block slp-section slp-rv" style="--slp-rv-bg:${s.bg_color || "#f8f8f8"};--slp-rv-card:${s.card_bg || "#ffffff"}">
      <div class="slp-container">
        ${e || t ? i`<div class="slp-title">${e ? i`<h2>${e}</h2>` : o}${t ? i`<p>${t}</p>` : o}</div>` : o}
        <div class="slp-rv__track" @pointerdown=${() => window.clearInterval(this.timer)}>
          ${a.map((r) => {
      const l = n(r.name), c = Math.min(Math.max(Number(r.rate) || 5, 1), 5);
      return i`<article class="slp-rv__card">
              <i class="slp-rv__quote sicon-quote"></i>
              <p class="slp-rv__text">${n(r.review)}</p>
              <div class="slp-rv__author">
                ${r.image ? i`<img class="slp-rv__avatar" src=${r.image} alt=${l} loading="lazy" />` : i`<span class="slp-rv__avatar slp-rv__initials" aria-hidden="true">${this.initials(l)}</span>`}
                <div>
                  <h3 class="slp-rv__name">${l}</h3>
                  <div class="slp-rv__stars" aria-label="${c}/5">
                    ${[1, 2, 3, 4, 5].map((_) => i`<i class="sicon-star2 ${_ <= c ? "is-on" : ""}"></i>`)}
                  </div>
                </div>
              </div>
            </article>`;
    })}
        </div>
        ${a.length > 1 ? i`<div class="slp-rv__nav">
              <button type="button" aria-label=${m({ ar: "السابق", en: "Previous" })} @click=${() => this.step(-1)}><i class="sicon-keyboard_arrow_right"></i></button>
              <button type="button" aria-label=${m({ ar: "التالي", en: "Next" })} @click=${() => this.step(1)}><i class="sicon-keyboard_arrow_left"></i></button>
            </div>` : o}
      </div>
    </section>`;
  }
}
y([
  b({ type: Object })
], d.prototype, "config");
typeof d < "u" && d.registerSallaComponent("salla-custom-reviews");
export {
  d as default
};
