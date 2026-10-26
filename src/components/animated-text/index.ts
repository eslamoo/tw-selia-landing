import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getConfig, isRtl, resolveText } from "../../utils/config";
import { baseCss, injectStyles } from "../../utils/styles";

// Selia's announcement bar: every copy slides by its own width, so the speed holds for any text length
const css = `
.slp-at { overflow: hidden; padding-block: 5px; background: var(--slp-at-bg, #111); color: var(--slp-at-color, #fff); }
.slp-at .slp-at__list { display: flex; margin: 0; padding: 5px 0; list-style: none; white-space: nowrap; }
.slp-at__item { flex: none; display: flex; align-items: center; font-size: 15px; font-weight: 400; line-height: 26px;
  animation: slp-at-ltr var(--slp-at-speed, 7s) linear infinite; }
.slp-at--rtl .slp-at__item { animation-name: slp-at-rtl; }
.slp-at--reverse .slp-at__item { animation-direction: reverse; }
.slp-at__list:hover .slp-at__item { animation-play-state: paused; }
.slp-at__text { padding: 0 15px; }
.slp-at__item i { font-size: 12px; opacity: .85; }
@keyframes slp-at-ltr { to { transform: translateX(-100%); } }
@keyframes slp-at-rtl { to { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .slp-at__item { animation: none; } }
`;

const COPIES = 14;

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
    const speed = Math.min(Math.max(Number(cfg.speed) || 7, 3), 60);
    const style = `--slp-at-bg:${cfg.bg || "#111111"};--slp-at-color:${cfg.color || "#ffffff"};--slp-at-speed:${speed}s`;
    const classes = ["slp-block slp-at", isRtl() ? "slp-at--rtl" : "", cfg.reverse ? "slp-at--reverse" : ""].filter(Boolean).join(" ");
    return html`<div class=${classes} style=${style}>
      <ul class="slp-at__list">
        ${Array.from({ length: COPIES }, (_, i) => html`<li class="slp-at__item" aria-hidden=${i ? "true" : "false"}>
          <span class="slp-at__text">${text}</span>${cfg.icon ? html`<i class=${cfg.icon}></i>` : nothing}
        </li>`)}
      </ul>
    </div>`;
  }
}
