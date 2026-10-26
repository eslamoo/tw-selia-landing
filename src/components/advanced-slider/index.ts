import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getCollectionItems, getConfig, isRtl, resolveText, t, unwrapValue } from "../../utils/config";
import { ctaAction, getSalla, openCheckout } from "../../utils/landing";
import { baseCss, injectStyles } from "../../utils/styles";

// Sizes, type scale, caption and button mirror Selia's advanced slider (advanced-slider.scss)
const css = `
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
    const delay = Math.max(Number(getConfig(this.config).delay) || 5, 2) * 1000;
    if (this.slides().length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    this.timer = window.setInterval(() => this.go(this.index + 1, false), delay);
  }

  private go(next: number, user = true) {
    const total = this.slides().length;
    if (!total) return;
    this.index = (next + total) % total;
    if (user) this.start();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("config")) this.start();
    // Only the visible slide plays, so off-screen videos never compete for bandwidth
    this.querySelectorAll<HTMLVideoElement>(".slp-sl__slide video").forEach((video) => {
      const active = video.closest(".slp-sl__slide")?.classList.contains("is-active");
      if (active && getComputedStyle(video).display !== "none") {
        if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src;
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
    const fit = String(unwrapValue(slide.object_fit) || "cover");
    const position = String(unwrapValue(slide.object_position) || "center");
    const fitStyle = `object-fit:${fit};object-position:${position}`;
    if (slide.is_video) {
      const desktop = slide.video_url;
      const mobile = slide.video_url_mobile;
      const video = (src: string, cls: string) => html`<video class="slp-sl__media ${cls}" style=${fitStyle} muted loop playsinline
        autoplay preload=${eager ? "auto" : "none"} data-src=${src}></video>`;
      return html`${desktop ? video(desktop, `slp-sl__media--desktop${mobile ? " has-mobile" : ""}`) : nothing}
        ${mobile ? video(mobile, desktop ? "slp-sl__media--mobile" : "") : nothing}`;
    }
    const desktop = pick(slide.image, slide.image_en);
    const mobile = pick(slide.mobile_image, slide.mobile_image_en);
    const img = (src: string, cls: string, w: number, h: number) => html`<img class="slp-sl__media ${cls}" style=${fitStyle}
      src=${src} alt="" width=${w} height=${h} loading=${eager ? "eager" : "lazy"} fetchpriority=${eager ? "high" : "auto"} />`;
    return html`${desktop ? img(desktop, `slp-sl__media--desktop${mobile ? " has-mobile" : ""}`, 1920, 1080) : nothing}
      ${mobile ? img(mobile, desktop ? "slp-sl__media--mobile" : "", 800, 1200) : nothing}`;
  }

  private caption(slide: Slide) {
    const title = resolveText(slide.title);
    const desc = resolveText(slide.desc);
    const btn = resolveText(slide.btn_text);
    const action = ctaAction();
    if (!title && !desc && !btn) return nothing;
    const position = String(unwrapValue(slide.content_position) || "center");
    const btnStyle = `--slp-sl-btn-bg:${slide.btn_bg || "#111111"};--slp-sl-btn-color:${slide.btn_color || "#ffffff"}`;
    return html`<div class="slp-sl__caption">
      <div class="slp-sl__container">
        <div class="slp-sl__inner slp-sl__inner--${position}">
          <div class="slp-sl__content" style="--slp-sl-text:${slide.text_color || "#ffffff"}">
            ${title ? html`<h2 class="slp-sl__title">${title}</h2>` : nothing}
            ${desc ? html`<p class="slp-sl__desc">${desc}</p>` : nothing}
            ${btn && action.kind !== "none"
              ? html`<a class="slp-sl__btn${slide.outlined_btn ? " slp-sl__btn--outlined" : ""}" style=${btnStyle}
                  href=${action.kind === "link" ? action.url : "#"} @click=${this.onCta}><span>${btn}</span></a>`
              : nothing}
          </div>
        </div>
      </div>
    </div>`;
  }

  render() {
    const cfg = getConfig(this.config);
    const slides = this.slides();
    if (!slides.length) return nothing;
    const effect = String(unwrapValue(cfg.effect) || "fade");
    const height = Math.min(Math.max(Number(cfg.height) || 100, 30), 100);
    const mobileHeight = Math.min(Math.max(Number(cfg.mobile_height) || 100, 30), 100);
    const speed = Math.min(Math.max(Number(cfg.speed) || 2, 0.3), 5);
    const many = slides.length > 1;
    const controls = many && cfg.show_arrows !== false;
    const classes = [
      "slp-block slp-sl",
      `slp-sl--${effect}`,
      cfg.auto_height === false ? "slp-sl--fixed" : "",
      cfg.overlay !== false ? "slp-sl--overlay" : "",
      cfg.ken_burns ? "slp-sl--kb" : "",
      controls ? "slp-sl--controls" : "",
      many ? "" : "slp-sl--single",
    ].filter(Boolean).join(" ");
    const style = `--slp-sl-h:${height}vh;--slp-sl-mh:${mobileHeight}vh;--slp-sl-speed:${speed}s;--slp-sl-from:${isRtl() ? "-100%" : "100%"}`;
    return html`<section class=${classes} style=${style} aria-roledescription="carousel"
      @touchstart=${(e: TouchEvent) => (this.touchX = e.touches[0].clientX)}
      @touchend=${(e: TouchEvent) => {
        const dx = e.changedTouches[0].clientX - this.touchX;
        if (many && Math.abs(dx) > 40) this.go(this.index + ((dx < 0) !== isRtl() ? 1 : -1));
      }}>
      <div class="slp-sl__track">
        ${slides.map((slide, i) => html`<div class="slp-sl__slide ${i === this.index ? "is-active" : ""}"
          style="--slp-sl-off:${i < this.index ? -1 : 1}" aria-hidden=${i === this.index ? "false" : "true"}>
          ${this.media(slide, i === 0)}${this.caption(slide)}
        </div>`)}
      </div>
      ${controls
        ? html`<button type="button" class="slp-sl__arrow slp-sl__arrow--prev" aria-label=${t({ ar: "السابق", en: "Previous" })}
              @click=${() => this.go(this.index - 1)}><i class=${isRtl() ? "sicon-keyboard_arrow_right" : "sicon-keyboard_arrow_left"}></i></button>
            <button type="button" class="slp-sl__arrow slp-sl__arrow--next" aria-label=${t({ ar: "التالي", en: "Next" })}
              @click=${() => this.go(this.index + 1)}><i class=${isRtl() ? "sicon-keyboard_arrow_left" : "sicon-keyboard_arrow_right"}></i></button>`
        : nothing}
      ${many && cfg.show_dots !== false
        ? html`<div class="slp-sl__dots">${slides.map((_, i) => html`<button type="button"
            class="slp-sl__dot ${i === this.index ? "is-active" : ""}" aria-label="${i + 1}" @click=${() => this.go(i)}></button>`)}</div>`
        : nothing}
    </section>`;
  }
}
