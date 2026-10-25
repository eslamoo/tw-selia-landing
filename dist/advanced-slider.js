import { LitElement as j, nothing as a, html as o } from "lit";
import { property as S, state as M } from "lit/decorators.js";
import { i as y, g as X, a as b, r as u, u as $, b as h, t as x, c as I } from "./styles-D8vrM0Wa.js";
import { c as w, o as L, g as N } from "./landing-DR_8ywsQ.js";
var P = Object.defineProperty, k = (f, s, t, e) => {
  for (var i = void 0, n = f.length - 1, r; n >= 0; n--)
    (r = f[n]) && (i = r(s, t, i) || i);
  return i && P(s, t, i), i;
};
const A = `
.slp-sl { position: relative; overflow: hidden; height: var(--slp-sl-h, 85vh); min-height: 320px; background: #111; }
@container (max-width: 767px) { .slp-sl { height: var(--slp-sl-mh, 75vh); } }
.slp-sl__slide { position: absolute; inset: 0; visibility: hidden; opacity: 0; transition: opacity .9s ease, transform .9s ease, visibility 0s linear .9s; }
.slp-sl--slide .slp-sl__slide { transform: translateX(var(--slp-sl-from, 100%)); opacity: 1; }
.slp-sl__slide.is-active { visibility: visible; opacity: 1; transform: none; transition: opacity .9s ease, transform .9s ease; z-index: 1; }
.slp-sl__media, .slp-sl__media img, .slp-sl__media video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.slp-sl__media--mobile { display: none; }
@container (max-width: 767px) { .slp-sl__media--desktop.has-mobile { display: none; } .slp-sl__media--mobile { display: block; } }
.slp-sl--overlay .slp-sl__slide::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgb(0 0 0 / 15%) 0%, rgb(0 0 0 / 45%) 100%); }
.slp-sl__caption { position: absolute; inset: 0; z-index: 2; display: flex; align-items: center; }
.slp-sl__caption .slp-container { display: flex; }
.slp-sl__content { max-width: 36rem; color: var(--slp-sl-text, #fff); }
.slp-sl__caption--start .slp-container { justify-content: flex-start; text-align: start; }
.slp-sl__caption--center .slp-container { justify-content: center; text-align: center; }
.slp-sl__caption--end .slp-container { justify-content: flex-end; text-align: start; }
.slp-sl__title { font-size: 2.25rem; line-height: 1.2; font-weight: 800; }
.slp-sl__desc { margin-top: .75rem; font-size: 1.0625rem; line-height: 1.7; }
@container (min-width: 768px) { .slp-sl__title { font-size: 3.25rem; } .slp-sl__desc { font-size: 1.25rem; } }
.slp-sl__btn { margin-top: 1.5rem; background: var(--slp-sl-btn-bg, #111); color: var(--slp-sl-btn-color, #fff); }
.slp-sl__btn--outlined { background: transparent; border-color: var(--slp-sl-btn-color, #fff); }
.slp-sl__slide.is-active .slp-sl__title, .slp-sl__slide.is-active .slp-sl__desc, .slp-sl__slide.is-active .slp-sl__btn { animation: slp-sl-in .9s cubic-bezier(.16,1,.3,1) .35s both; }
.slp-sl__slide.is-active .slp-sl__desc { animation-delay: .47s; }
.slp-sl__slide.is-active .slp-sl__btn { animation-delay: .59s; }
@keyframes slp-sl-in { from { opacity: 0; transform: translateY(1.25rem); filter: blur(8px); } to { opacity: 1; transform: none; filter: none; } }
.slp-sl__arrow { position: absolute; top: 50%; z-index: 3; width: 2.75rem; height: 2.75rem; margin-top: -1.375rem; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: rgb(255 255 255 / 85%); color: #111; font-size: 1.125rem; cursor: pointer; }
.slp-sl__arrow--prev { inset-inline-start: 1rem; }
.slp-sl__arrow--next { inset-inline-end: 1rem; }
@container (max-width: 767px) { .slp-sl__arrow { display: none; } }
.slp-sl__dots { position: absolute; bottom: 1.25rem; inset-inline: 0; z-index: 3; display: flex; justify-content: center; gap: .5rem; }
.slp-sl__dot { width: .625rem; height: .625rem; padding: 0; border: 0; border-radius: 999px; background: rgb(255 255 255 / 55%); cursor: pointer; transition: width .3s ease, background .3s ease; }
.slp-sl__dot.is-active { width: 1.75rem; background: #fff; }
@media (prefers-reduced-motion: reduce) { .slp-sl__slide, .slp-sl__slide.is-active .slp-sl__title, .slp-sl__slide.is-active .slp-sl__desc, .slp-sl__slide.is-active .slp-sl__btn { transition: none; animation: none; } }
`;
class m extends j {
  constructor() {
    super(...arguments), this.index = 0, this.touchX = 0;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), y("slp-base", I), y("slp-advanced-slider", A), this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  slides() {
    return X(b(this.config).slides, "slides").filter(
      (s) => s.image || s.mobile_image || s.video_url || s.video_url_mobile
    );
  }
  start() {
    window.clearInterval(this.timer);
    const s = Math.max(Number(b(this.config).delay) || 6, 2) * 1e3;
    this.slides().length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || (this.timer = window.setInterval(() => this.go(this.index + 1, !1), s));
  }
  go(s, t = !0) {
    const e = this.slides().length;
    e && (this.index = (s + e) % e, t && this.start());
  }
  updated() {
    this.querySelectorAll(".slp-sl__slide video").forEach((s) => {
      var e;
      ((e = s.closest(".slp-sl__slide")) == null ? void 0 : e.classList.contains("is-active")) && s.offsetParent !== null ? (!s.src && s.dataset.src && (s.src = s.dataset.src), s.play().catch(() => {
      })) : s.pause();
    });
  }
  onCta(s) {
    w().kind === "checkout" && (s.preventDefault(), L());
  }
  media(s, t) {
    var c, l, g;
    const e = ((g = (l = (c = N()) == null ? void 0 : c.lang) == null ? void 0 : l.getLocale) == null ? void 0 : g.call(l)) === "en", i = (p, d) => e && d || p;
    if (s.is_video) {
      const p = s.video_url, d = s.video_url_mobile, v = (C, z) => o`<video class="slp-sl__media ${z}" muted loop playsinline
        preload=${t ? "auto" : "none"} data-src=${C}></video>`;
      return o`${p ? v(p, `slp-sl__media--desktop${d ? " has-mobile" : ""}`) : a}
        ${d ? v(d, p ? "slp-sl__media--mobile" : "") : a}`;
    }
    const n = i(s.image, s.image_en), r = i(s.mobile_image, s.mobile_image_en), _ = (p, d) => o`<div class="slp-sl__media ${d}"><img src=${p} alt=""
      loading=${t ? "eager" : "lazy"} fetchpriority=${t ? "high" : "auto"} /></div>`;
    return o`${n ? _(n, `slp-sl__media--desktop${r ? " has-mobile" : ""}`) : a}
      ${r ? _(r, n ? "slp-sl__media--mobile" : "") : a}`;
  }
  caption(s) {
    const t = u(s.title), e = u(s.desc), i = u(s.btn_text), n = w();
    if (!t && !e && !i) return a;
    const r = String($(s.content_position) || "center"), _ = `--slp-sl-btn-bg:${s.btn_bg || "#111111"};--slp-sl-btn-color:${s.btn_color || "#ffffff"}`;
    return o`<div class="slp-sl__caption slp-sl__caption--${r}">
      <div class="slp-container">
        <div class="slp-sl__content" style="--slp-sl-text:${s.text_color || "#ffffff"}">
          ${t ? o`<h2 class="slp-sl__title">${t}</h2>` : a}
          ${e ? o`<p class="slp-sl__desc">${e}</p>` : a}
          ${i && n.kind !== "none" ? o`<a class="slp-btn slp-sl__btn${s.outlined_btn ? " slp-sl__btn--outlined" : ""}" style=${_}
                href=${n.kind === "link" ? n.url : "#"} @click=${this.onCta}>${i}</a>` : a}
        </div>
      </div>
    </div>`;
  }
  render() {
    const s = b(this.config), t = this.slides();
    if (!t.length) return a;
    const e = String($(s.effect) || "fade"), i = Math.min(Math.max(Number(s.height) || 85, 30), 100), n = Math.min(Math.max(Number(s.mobile_height) || 75, 30), 100), r = h() ? "-100%" : "100%", _ = `slp-block slp-sl slp-sl--${e}${s.overlay !== !1 ? " slp-sl--overlay" : ""}`;
    return o`<section class=${_} style="--slp-sl-h:${i}vh;--slp-sl-mh:${n}vh;--slp-sl-from:${r}"
      aria-roledescription="carousel"
      @touchstart=${(c) => this.touchX = c.touches[0].clientX}
      @touchend=${(c) => {
      const l = c.changedTouches[0].clientX - this.touchX;
      Math.abs(l) > 40 && this.go(this.index + (l < 0 !== h() ? 1 : -1));
    }}>
      ${t.map((c, l) => o`<div class="slp-sl__slide ${l === this.index ? "is-active" : ""}"
        aria-hidden=${l === this.index ? "false" : "true"}>
        ${this.media(c, l === 0)}${this.caption(c)}
      </div>`)}
      ${t.length > 1 && s.show_arrows !== !1 ? o`<button type="button" class="slp-sl__arrow slp-sl__arrow--prev" aria-label=${x({ ar: "السابق", en: "Previous" })}
              @click=${() => this.go(this.index - 1)}><i class=${h() ? "sicon-keyboard_arrow_right" : "sicon-keyboard_arrow_left"}></i></button>
            <button type="button" class="slp-sl__arrow slp-sl__arrow--next" aria-label=${x({ ar: "التالي", en: "Next" })}
              @click=${() => this.go(this.index + 1)}><i class=${h() ? "sicon-keyboard_arrow_left" : "sicon-keyboard_arrow_right"}></i></button>` : a}
      ${t.length > 1 && s.show_dots !== !1 ? o`<div class="slp-sl__dots">${t.map((c, l) => o`<button type="button"
            class="slp-sl__dot ${l === this.index ? "is-active" : ""}" aria-label="${l + 1}" @click=${() => this.go(l)}></button>`)}</div>` : a}
    </section>`;
  }
}
k([
  S({ type: Object })
], m.prototype, "config");
k([
  M()
], m.prototype, "index");
typeof m < "u" && m.registerSallaComponent("salla-advanced-slider");
export {
  m as default
};
