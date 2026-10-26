import { LitElement as X, nothing as a, html as n } from "lit";
import { property as N, state as A } from "lit/decorators.js";
import { i as z, g as I, a as $, u as g, r as k, b as u, t as j, c as L } from "./styles-BJy9RHCh.js";
import { c as C, o as P, g as R } from "./landing-BqmPvx7F.js";
var E = Object.defineProperty, S = (x, s, t, i) => {
  for (var e = void 0, o = x.length - 1, c; o >= 0; o--)
    (c = x[o]) && (e = c(s, t, e) || e);
  return e && E(s, t, e), e;
};
const O = `
.slp-sl { position: relative; overflow: hidden; background: #111; --slp-sl-speed: 2s; --slp-sl-text-delay: calc(var(--slp-sl-speed) * .35); }
.slp-sl--single { --slp-sl-text-delay: .1s; }
.slp-sl__track { display: grid; }
.slp-sl--fixed .slp-sl__track { height: var(--slp-sl-h, 100vh); }
@container (max-width: 990.98px) { .slp-sl--fixed .slp-sl__track { height: var(--slp-sl-mh, 100vh); } }
.slp-sl__slide { grid-area: 1 / 1; position: relative; overflow: hidden; visibility: hidden; opacity: 0;
  transition: opacity var(--slp-sl-speed) ease, transform var(--slp-sl-speed) ease, visibility 0s linear var(--slp-sl-speed); }
.slp-sl--slide .slp-sl__slide { opacity: 1; transform: translateX(calc(var(--slp-sl-from, 100%) * var(--slp-sl-off, 1))); }
.slp-sl__slide.is-active { visibility: visible; opacity: 1; transform: none; z-index: 1; transition: opacity var(--slp-sl-speed) ease, transform var(--slp-sl-speed) ease; }
.slp-sl__media { display: block; width: 100%; height: auto; }
.slp-sl--fixed .slp-sl__media { position: absolute; inset: 0; height: 100%; }
.slp-sl__media--mobile { display: none !important; }
@container (max-width: 639.98px) { .slp-sl__media--desktop.has-mobile { display: none !important; } .slp-sl__media--mobile { display: block !important; } }
.slp-sl--kb .slp-sl__slide img.slp-sl__media { animation: slp-sl-kb 14s ease-in-out infinite alternate; }
@keyframes slp-sl-kb { from { transform: scale(1); } to { transform: scale(1.1); } }
.slp-sl--overlay .slp-sl__slide::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(180deg, rgb(0 0 0 / 23%) 0%, rgb(0 0 0 / 0%) 100%); }
.slp-sl__caption { position: absolute; inset: 0; z-index: 2; display: flex; align-items: center; }
.slp-sl__container { width: 100%; max-width: 1440px; margin-inline: auto; padding-inline: 10px; }
.slp-sl--controls .slp-sl__container { padding-inline: 60px; }
.slp-sl__inner { display: flex; flex-wrap: wrap; }
.slp-sl__inner--left { justify-content: left; }
.slp-sl__inner--center { justify-content: center; text-align: center; }
.slp-sl__inner--right { justify-content: right; }
.slp-sl__inner--left .slp-sl__content, .slp-sl__inner--right .slp-sl__content { text-align: start; }
.slp-sl__content { color: var(--slp-sl-text, #fff); }
@container (min-width: 991px) { .slp-sl__content { max-width: 60%; } }
.slp-sl .slp-sl__title { margin: 0 0 1rem; font-size: 2.25rem; line-height: 2.5rem; font-weight: 700; color: inherit; }
.slp-sl__desc { margin: 0; font-size: 1rem; line-height: 1.5rem; color: inherit; }
@container (min-width: 768px) { .slp-sl .slp-sl__title { line-height: 4rem; } }
@container (min-width: 1024px) { .slp-sl .slp-sl__title { font-size: 3rem; line-height: 1; } .slp-sl__desc { font-size: 1.125rem; line-height: 1.75rem; } }
@container (min-width: 1280px) { .slp-sl .slp-sl__title { font-size: 3.75rem; line-height: 1; } .slp-sl__desc { font-size: 1.25rem; line-height: 1.75rem; } }
.slp-sl__btn { position: relative; display: inline-block; margin-top: 1rem; padding: 7px 15px; border: 1px solid transparent; background: var(--slp-sl-btn-bg, #111); font-size: 1rem; line-height: 1.5rem; text-decoration: none; cursor: pointer; transition: all .3s ease; }
.slp-sl__btn--outlined { background: transparent; border-color: var(--slp-sl-btn-color, #fff); }
.slp-sl__btn span { position: relative; z-index: 1; color: var(--slp-sl-btn-color, #fff); transition: all .3s ease; }
.slp-sl__btn::before { content: ""; position: absolute; top: 0; right: 0; z-index: 1; width: 0; height: 100%; background: var(--slp-sl-btn-color, #fff); transition: all .3s ease; }
.slp-sl__btn:hover::before { width: 100%; left: 0; }
.slp-sl__btn:hover span { color: var(--slp-sl-btn-bg, #111); }
.slp-sl__btn:focus-visible { outline: 2px solid var(--slp-sl-btn-color, #fff); outline-offset: 3px; }
@container (min-width: 1024px) { .slp-sl__btn { margin-top: 1.5rem; } }
@container (min-width: 1280px) { .slp-sl__btn { margin-top: 2rem; } }
.slp-sl__slide.is-active :is(.slp-sl__title, .slp-sl__desc, .slp-sl__btn) { animation: slp-sl-in .9s cubic-bezier(.16,1,.3,1) var(--slp-sl-text-delay) both; }
.slp-sl__slide.is-active .slp-sl__desc { animation-delay: calc(var(--slp-sl-text-delay) + .12s); }
.slp-sl__slide.is-active .slp-sl__btn { animation-delay: calc(var(--slp-sl-text-delay) + .24s); }
@keyframes slp-sl-in { from { opacity: 0; transform: translateY(1.25rem); filter: blur(8px); } to { opacity: 1; transform: none; filter: none; } }
.slp-sl__arrow { position: absolute; top: 50%; z-index: 3; width: 2rem; height: 2rem; margin-top: -1rem; display: flex; align-items: center; justify-content: center; padding: 0; border: 0; border-radius: 999px; background: #fff; color: #111; font-size: 1rem; box-shadow: 0 2px 8px rgb(0 0 0 / 12%); cursor: pointer; }
.slp-sl__arrow--prev { inset-inline-start: 1%; }
.slp-sl__arrow--next { inset-inline-end: 1%; }
@container (max-width: 767px) { .slp-sl__arrow { width: 1.5rem; height: 1.5rem; margin-top: -.75rem; font-size: .875rem; } }
.slp-sl__dots { position: absolute; bottom: 10px; inset-inline: 0; z-index: 3; display: flex; justify-content: center; gap: 10px; }
.slp-sl__dot { width: 8px; height: 8px; padding: 0; border: 0; border-radius: 999px; background: #fff; opacity: .7; cursor: pointer; transition: opacity .3s ease, background-color .3s ease; }
.slp-sl__dot.is-active { opacity: 1; background: var(--color-primary, #fff); }
@media (prefers-reduced-motion: reduce) {
  .slp-sl__slide, .slp-sl__slide.is-active { transition: none; }
  .slp-sl__slide.is-active :is(.slp-sl__title, .slp-sl__desc, .slp-sl__btn), .slp-sl--kb .slp-sl__slide img.slp-sl__media { animation: none; }
}
`;
class v extends X {
  constructor() {
    super(...arguments), this.index = 0, this.touchX = 0;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), z("slp-base", L), z("slp-advanced-slider", O), this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  slides() {
    return I($(this.config).slides, "slides").filter(
      (s) => s.image || s.mobile_image || s.video_url || s.video_url_mobile
    );
  }
  start() {
    window.clearInterval(this.timer);
    const s = Math.max(Number($(this.config).delay) || 5, 2) * 1e3;
    this.slides().length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || (this.timer = window.setInterval(() => this.go(this.index + 1, !1), s));
  }
  go(s, t = !0) {
    const i = this.slides().length;
    i && (this.index = (s + i) % i, t && this.start());
  }
  updated(s) {
    s.has("config") && this.start(), this.querySelectorAll(".slp-sl__slide video").forEach((t) => {
      var e;
      ((e = t.closest(".slp-sl__slide")) == null ? void 0 : e.classList.contains("is-active")) && getComputedStyle(t).display !== "none" ? (!t.getAttribute("src") && t.dataset.src && (t.src = t.dataset.src), t.play().catch(() => {
      })) : t.pause();
    });
  }
  onCta(s) {
    C().kind === "checkout" && (s.preventDefault(), P());
  }
  media(s, t) {
    var r, l, w;
    const i = ((w = (l = (r = R()) == null ? void 0 : r.lang) == null ? void 0 : l.getLocale) == null ? void 0 : w.call(l)) === "en", e = (d, _) => i && _ || d, o = String(g(s.object_fit) || "cover"), c = String(g(s.object_position) || "center"), p = `object-fit:${o};object-position:${c}`;
    if (s.is_video) {
      const d = s.video_url, _ = s.video_url_mobile, b = (y, M) => n`<video class="slp-sl__media ${M}" style=${p} muted loop playsinline
        autoplay preload=${t ? "auto" : "none"} data-src=${y}></video>`;
      return n`${d ? b(d, `slp-sl__media--desktop${_ ? " has-mobile" : ""}`) : a}
        ${_ ? b(_, d ? "slp-sl__media--mobile" : "") : a}`;
    }
    const h = e(s.image, s.image_en), m = e(s.mobile_image, s.mobile_image_en), f = (d, _, b, y) => n`<img class="slp-sl__media ${_}" style=${p}
      src=${d} alt="" width=${b} height=${y} loading=${t ? "eager" : "lazy"} fetchpriority=${t ? "high" : "auto"} />`;
    return n`${h ? f(h, `slp-sl__media--desktop${m ? " has-mobile" : ""}`, 1920, 1080) : a}
      ${m ? f(m, h ? "slp-sl__media--mobile" : "", 800, 1200) : a}`;
  }
  caption(s) {
    const t = k(s.title), i = k(s.desc), e = k(s.btn_text), o = C();
    if (!t && !i && !e) return a;
    const c = String(g(s.content_position) || "center"), p = `--slp-sl-btn-bg:${s.btn_bg || "#111111"};--slp-sl-btn-color:${s.btn_color || "#ffffff"}`;
    return n`<div class="slp-sl__caption">
      <div class="slp-sl__container">
        <div class="slp-sl__inner slp-sl__inner--${c}">
          <div class="slp-sl__content" style="--slp-sl-text:${s.text_color || "#ffffff"}">
            ${t ? n`<h2 class="slp-sl__title">${t}</h2>` : a}
            ${i ? n`<p class="slp-sl__desc">${i}</p>` : a}
            ${e && o.kind !== "none" ? n`<a class="slp-sl__btn${s.outlined_btn ? " slp-sl__btn--outlined" : ""}" style=${p}
                  href=${o.kind === "link" ? o.url : "#"} @click=${this.onCta}><span>${e}</span></a>` : a}
          </div>
        </div>
      </div>
    </div>`;
  }
  render() {
    const s = $(this.config), t = this.slides();
    if (!t.length) return a;
    const i = String(g(s.effect) || "fade"), e = Math.min(Math.max(Number(s.height) || 100, 30), 100), o = Math.min(Math.max(Number(s.mobile_height) || 100, 30), 100), c = Math.min(Math.max(Number(s.speed) || 2, 0.3), 5), p = t.length > 1, h = p && s.show_arrows !== !1, m = [
      "slp-block slp-sl",
      `slp-sl--${i}`,
      s.auto_height === !1 ? "slp-sl--fixed" : "",
      s.overlay !== !1 ? "slp-sl--overlay" : "",
      s.ken_burns ? "slp-sl--kb" : "",
      h ? "slp-sl--controls" : "",
      p ? "" : "slp-sl--single"
    ].filter(Boolean).join(" "), f = `--slp-sl-h:${e}vh;--slp-sl-mh:${o}vh;--slp-sl-speed:${c}s;--slp-sl-from:${u() ? "-100%" : "100%"}`;
    return n`<section class=${m} style=${f} aria-roledescription="carousel"
      @touchstart=${(r) => this.touchX = r.touches[0].clientX}
      @touchend=${(r) => {
      const l = r.changedTouches[0].clientX - this.touchX;
      p && Math.abs(l) > 40 && this.go(this.index + (l < 0 !== u() ? 1 : -1));
    }}>
      <div class="slp-sl__track">
        ${t.map((r, l) => n`<div class="slp-sl__slide ${l === this.index ? "is-active" : ""}"
          style="--slp-sl-off:${l < this.index ? -1 : 1}" aria-hidden=${l === this.index ? "false" : "true"}>
          ${this.media(r, l === 0)}${this.caption(r)}
        </div>`)}
      </div>
      ${h ? n`<button type="button" class="slp-sl__arrow slp-sl__arrow--prev" aria-label=${j({ ar: "السابق", en: "Previous" })}
              @click=${() => this.go(this.index - 1)}><i class=${u() ? "sicon-keyboard_arrow_right" : "sicon-keyboard_arrow_left"}></i></button>
            <button type="button" class="slp-sl__arrow slp-sl__arrow--next" aria-label=${j({ ar: "التالي", en: "Next" })}
              @click=${() => this.go(this.index + 1)}><i class=${u() ? "sicon-keyboard_arrow_left" : "sicon-keyboard_arrow_right"}></i></button>` : a}
      ${p && s.show_dots !== !1 ? n`<div class="slp-sl__dots">${t.map((r, l) => n`<button type="button"
            class="slp-sl__dot ${l === this.index ? "is-active" : ""}" aria-label="${l + 1}" @click=${() => this.go(l)}></button>`)}</div>` : a}
    </section>`;
  }
}
S([
  N({ type: Object })
], v.prototype, "config");
S([
  A()
], v.prototype, "index");
typeof v < "u" && v.registerSallaComponent("salla-advanced-slider");
export {
  v as default
};
