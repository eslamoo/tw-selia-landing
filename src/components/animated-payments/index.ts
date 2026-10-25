import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getCollectionItems, getConfig, resolveText, unwrapValue } from "../../utils/config";
import { getSalla } from "../../utils/landing";
import { baseCss, injectStyles } from "../../utils/styles";

const css = `
.slp-pay { background: var(--slp-pay-bg, #fff); }
.slp-pay__row { display: flex; overflow: hidden; direction: ltr; user-select: none; gap: 1rem; margin-block: .75rem;
  mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent); }
.slp-pay__group { flex-shrink: 0; display: flex; align-items: center; gap: 1rem; animation: slp-pay-scroll var(--slp-pay-speed, 40s) linear infinite; }
.slp-pay__row--reverse .slp-pay__group { animation-direction: reverse; }
.slp-pay__row:hover .slp-pay__group { animation-play-state: paused; }
.slp-pay__logo { display: flex; align-items: center; justify-content: center; width: 6.5rem; height: 4.25rem; padding: .75rem; border-radius: .75rem; background: var(--slp-pay-logo-bg, #f4f4f5); }
.slp-pay__logo img { width: 100%; height: 100%; object-fit: contain; }
.slp-pay--gray .slp-pay__logo img { filter: grayscale(1); transition: filter .3s ease; }
.slp-pay--gray .slp-pay__logo:hover img { filter: none; }
@keyframes slp-pay-scroll { to { transform: translateX(calc(-100% - 1rem)); } }
@media (prefers-reduced-motion: reduce) { .slp-pay__group { animation: none; } }
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
    const title = resolveText(cfg.title);
    const style = `--slp-pay-bg:${cfg.bg_color || "#ffffff"};--slp-pay-logo-bg:${cfg.logos_bg || "#f4f4f5"};--slp-pay-speed:${Math.max(20, logos.length * 6)}s`;
    return html`<section class="slp-block slp-section slp-pay${cfg.grayscale ? " slp-pay--gray" : ""}" style=${style}>
      <div class="slp-container">
        ${title ? html`<div class="slp-title"><h2>${title}</h2></div>` : nothing}
        ${this.row(logos)}
        ${cfg.second_row ? this.row(logos, true) : nothing}
      </div>
    </section>`;
  }
}
