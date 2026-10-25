import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getConfig, resolveText } from "../../utils/config";
import { baseCss, injectStyles } from "../../utils/styles";

const css = `
.slp-at { overflow: hidden; background: var(--slp-at-bg, #111); color: var(--slp-at-color, #fff); direction: ltr; }
.slp-at__track { display: flex; width: max-content; animation: slp-at-scroll var(--slp-at-speed, 30s) linear infinite; }
.slp-at--reverse .slp-at__track { animation-direction: reverse; }
.slp-at:hover .slp-at__track { animation-play-state: paused; }
.slp-at__item { display: flex; align-items: center; gap: 1.25rem; padding: .8rem 1.25rem; font-size: .9375rem; font-weight: 700; line-height: 1.4; white-space: nowrap; direction: rtl; }
.slp-at__item i { font-size: .8125rem; opacity: .85; }
@keyframes slp-at-scroll { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .slp-at__track { animation: none; } }
`;

export default class AnimatedText extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-animated-text", css);
  }

  render() {
    const cfg = getConfig(this.config);
    const text = resolveText(cfg.text);
    if (!text) return nothing;
    const speed = Math.min(Math.max(Number(cfg.speed) || 30, 8), 90);
    const style = `--slp-at-bg:${cfg.bg || "#111111"};--slp-at-color:${cfg.color || "#ffffff"};--slp-at-speed:${speed}s`;
    // Two identical halves so the -50% loop is seamless at any width
    const copies = Array.from({ length: 16 }, (_, i) => i);
    return html`<div class="slp-block slp-at${cfg.reverse ? " slp-at--reverse" : ""}" style=${style} role="marquee" aria-label=${text}>
      <div class="slp-at__track">
        ${copies.map((i) => html`<div class="slp-at__item" aria-hidden=${i ? "true" : "false"}>
          <span>${text}</span>${cfg.icon ? html`<i class=${cfg.icon}></i>` : nothing}
        </div>`)}
      </div>
    </div>`;
  }
}
