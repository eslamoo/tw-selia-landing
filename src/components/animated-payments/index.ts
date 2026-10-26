import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getCollectionItems, getConfig, resolveText, unwrapValue } from "../../utils/config";
import { getSalla } from "../../utils/landing";
import { baseCss, injectStyles, schemeClass } from "../../utils/styles";
import { sectionTitle } from "../../utils/title";

// Selia's animated brands block: square cards, faded edges, a 60s loop and an optional reversed second row
const css = `
.slp-pay { --slp-pay-gap: calc(clamp(10rem, 1rem + 40vmin, 30rem) / 14); }
.slp-pay__row { display: flex; overflow: hidden; direction: ltr; user-select: none; margin: 15px 0; gap: var(--slp-pay-gap);
  mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0));
  -webkit-mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0)); }
.slp-pay__group { flex-shrink: 0; display: flex; align-items: center; gap: var(--slp-pay-gap); animation: slp-pay-scroll 60s linear infinite; }
.slp-pay__row--reverse .slp-pay__group { animation-direction: reverse; animation-delay: -3s; }
.slp-pay__row:hover .slp-pay__group { animation-play-state: paused; }
.slp-pay__logo { flex: none; border-radius: 10px; background: var(--slp-pay-logo-bg, #eeeeee); }
.slp-pay__logo img { display: block; width: 100px; height: 100px; padding: 10px; object-fit: contain; transition: all .3s; }
.slp-pay--big .slp-pay__logo img { width: 130px; height: 130px; }
@container (max-width: 991px) { .slp-pay__logo img { width: 70px; height: 70px; } .slp-pay--big .slp-pay__logo img { width: 90px; height: 90px; } }
.slp-pay--gray .slp-pay__logo img { filter: grayscale(1); transition: filter .3s ease; }
.slp-pay--gray .slp-pay__group:hover .slp-pay__logo img { filter: grayscale(0); }
@keyframes slp-pay-scroll { to { transform: translateX(calc(-100% - var(--slp-pay-gap))); } }
@media (prefers-reduced-motion: reduce) { .slp-pay__group { animation-play-state: paused; } }
`;

type Logo = { src: string; name: string };

export default class AnimatedPayments extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private storeLogos: Logo[] = [];

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-animated-payments", css);
    const Salla = getSalla() as any;
    await Salla?.onReady?.();
    const slugs: string[] = Salla?.config?.get("store.settings.payments") || [];
    this.storeLogos = slugs.map((slug) => ({ src: Salla.url.cdn(`images/payment/${slug}_mini.png`, 116, 116), name: slug }));
  }

  private logos(cfg: Record<string, any>): Logo[] {
    if (unwrapValue(cfg.source) === "custom") {
      return getCollectionItems<Record<string, any>>(cfg.logos, "logos")
        .filter((l) => l.logo)
        .map((l) => ({ src: l.logo, name: resolveText(l.name) }));
    }
    return this.storeLogos;
  }

  private row(logos: Logo[], reverse = false) {
    // Enough copies to cover wide screens before the loop resets
    const repeat = Math.max(2, Math.ceil(12 / logos.length));
    const group = (hidden: boolean) => html`<div class="slp-pay__group" aria-hidden=${hidden ? "true" : "false"}>
      ${Array.from({ length: repeat }).flatMap(() => logos).map((l) => html`<div class="slp-pay__logo">
        <img src=${l.src} alt=${hidden ? "" : l.name} loading="lazy" /></div>`)}
    </div>`;
    return html`<div class="slp-pay__row${reverse ? " slp-pay__row--reverse" : ""}">${group(false)}${group(true)}</div>`;
  }

  render() {
    const cfg = getConfig(this.config);
    const logos = this.logos(cfg);
    if (!logos.length) return nothing;
    const style = [
      cfg.bg_color ? `--slp-section-bg:${cfg.bg_color}` : "",
      cfg.logos_bg ? `--slp-pay-logo-bg:${cfg.logos_bg}` : "",
    ].filter(Boolean).join(";");
    return html`<section class="slp-block slp-section slp-pay ${schemeClass(cfg)}${cfg.grayscale ? " slp-pay--gray" : ""}${cfg.bigger_logos ? " slp-pay--big" : ""}" style=${style}>
      <div class="slp-container">
        ${sectionTitle(cfg)}
        ${this.row(logos)}
        ${cfg.second_row !== false ? this.row(logos, true) : nothing}
      </div>
    </section>`;
  }
}
