import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getCollectionItems, getConfig, isRtl, resolveText, t, unwrapValue } from "../../utils/config";
import { ctaAction, getSalla, openCheckout } from "../../utils/landing";
import { baseCss, injectStyles } from "../../utils/styles";

const css = `
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

type Slide = Record<string, any>;

export default class AdvancedSlider extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private index = 0;

  private timer?: number;
  private touchX = 0;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-advanced-slider", css);
    this.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private slides(): Slide[] {
    return getCollectionItems<Slide>(getConfig(this.config).slides, "slides").filter(
      (s) => s.image || s.mobile_image || s.video_url || s.video_url_mobile
    );
  }

  private start() {
    window.clearInterval(this.timer);
    const delay = Math.max(Number(getConfig(this.config).delay) || 6, 2) * 1000;
    if (this.slides().length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    this.timer = window.setInterval(() => this.go(this.index + 1, false), delay);
  }

  private go(next: number, user = true) {
    const total = this.slides().length;
    if (!total) return;
    this.index = (next + total) % total;
    if (user) this.start();
  }

  protected updated() {
    // Only the visible slide plays, so off-screen videos never compete for bandwidth
    this.querySelectorAll<HTMLVideoElement>(".slp-sl__slide video").forEach((video) => {
      const active = video.closest(".slp-sl__slide")?.classList.contains("is-active");
      if (active && video.offsetParent !== null) {
        if (!video.src && video.dataset.src) video.src = video.dataset.src;
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }

  private onCta(e: Event) {
    if (ctaAction().kind !== "checkout") return;
    e.preventDefault();
    openCheckout();
  }

  private media(slide: Slide, eager: boolean) {
    const en = (getSalla() as any)?.lang?.getLocale?.() === "en";
    const pick = (ar: string, enValue: string) => (en && enValue) || ar;
    if (slide.is_video) {
      const desktop = slide.video_url;
      const mobile = slide.video_url_mobile;
      const video = (src: string, cls: string) => html`<video class="slp-sl__media ${cls}" muted loop playsinline
        preload=${eager ? "auto" : "none"} data-src=${src}></video>`;
      return html`${desktop ? video(desktop, `slp-sl__media--desktop${mobile ? " has-mobile" : ""}`) : nothing}
        ${mobile ? video(mobile, desktop ? "slp-sl__media--mobile" : "") : nothing}`;
    }
    const desktop = pick(slide.image, slide.image_en);
    const mobile = pick(slide.mobile_image, slide.mobile_image_en);
    const img = (src: string, cls: string) => html`<div class="slp-sl__media ${cls}"><img src=${src} alt=""
      loading=${eager ? "eager" : "lazy"} fetchpriority=${eager ? "high" : "auto"} /></div>`;
    return html`${desktop ? img(desktop, `slp-sl__media--desktop${mobile ? " has-mobile" : ""}`) : nothing}
      ${mobile ? img(mobile, desktop ? "slp-sl__media--mobile" : "") : nothing}`;
  }

  private caption(slide: Slide) {
    const title = resolveText(slide.title);
    const desc = resolveText(slide.desc);
    const btn = resolveText(slide.btn_text);
    const action = ctaAction();
    if (!title && !desc && !btn) return nothing;
    const position = String(unwrapValue(slide.content_position) || "center");
    const btnStyle = `--slp-sl-btn-bg:${slide.btn_bg || "#111111"};--slp-sl-btn-color:${slide.btn_color || "#ffffff"}`;
    return html`<div class="slp-sl__caption slp-sl__caption--${position}">
      <div class="slp-container">
        <div class="slp-sl__content" style="--slp-sl-text:${slide.text_color || "#ffffff"}">
          ${title ? html`<h2 class="slp-sl__title">${title}</h2>` : nothing}
          ${desc ? html`<p class="slp-sl__desc">${desc}</p>` : nothing}
          ${btn && action.kind !== "none"
            ? html`<a class="slp-btn slp-sl__btn${slide.outlined_btn ? " slp-sl__btn--outlined" : ""}" style=${btnStyle}
                href=${action.kind === "link" ? action.url : "#"} @click=${this.onCta}>${btn}</a>`
            : nothing}
        </div>
      </div>
    </div>`;
  }

  render() {
    const cfg = getConfig(this.config);
    const slides = this.slides();
    if (!slides.length) return nothing;
    const effect = String(unwrapValue(cfg.effect) || "fade");
    const height = Math.min(Math.max(Number(cfg.height) || 85, 30), 100);
    const mobileHeight = Math.min(Math.max(Number(cfg.mobile_height) || 75, 30), 100);
    const from = isRtl() ? "-100%" : "100%";
    const classes = `slp-block slp-sl slp-sl--${effect}${cfg.overlay !== false ? " slp-sl--overlay" : ""}`;
    return html`<section class=${classes} style="--slp-sl-h:${height}vh;--slp-sl-mh:${mobileHeight}vh;--slp-sl-from:${from}"
      aria-roledescription="carousel"
      @touchstart=${(e: TouchEvent) => (this.touchX = e.touches[0].clientX)}
      @touchend=${(e: TouchEvent) => {
        const dx = e.changedTouches[0].clientX - this.touchX;
        if (Math.abs(dx) > 40) this.go(this.index + ((dx < 0) !== isRtl() ? 1 : -1));
      }}>
      ${slides.map((slide, i) => html`<div class="slp-sl__slide ${i === this.index ? "is-active" : ""}"
        aria-hidden=${i === this.index ? "false" : "true"}>
        ${this.media(slide, i === 0)}${this.caption(slide)}
      </div>`)}
      ${slides.length > 1 && cfg.show_arrows !== false
        ? html`<button type="button" class="slp-sl__arrow slp-sl__arrow--prev" aria-label=${t({ ar: "السابق", en: "Previous" })}
              @click=${() => this.go(this.index - 1)}><i class=${isRtl() ? "sicon-keyboard_arrow_right" : "sicon-keyboard_arrow_left"}></i></button>
            <button type="button" class="slp-sl__arrow slp-sl__arrow--next" aria-label=${t({ ar: "التالي", en: "Next" })}
              @click=${() => this.go(this.index + 1)}><i class=${isRtl() ? "sicon-keyboard_arrow_left" : "sicon-keyboard_arrow_right"}></i></button>`
        : nothing}
      ${slides.length > 1 && cfg.show_dots !== false
        ? html`<div class="slp-sl__dots">${slides.map((_, i) => html`<button type="button"
            class="slp-sl__dot ${i === this.index ? "is-active" : ""}" aria-label="${i + 1}" @click=${() => this.go(i)}></button>`)}</div>`
        : nothing}
    </section>`;
  }
}
