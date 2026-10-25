import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getConfig, resolveText } from "../../utils/config";
import { baseCss, injectStyles } from "../../utils/styles";

const css = `
.slp-ig__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.slp-ig__cell { position: relative; overflow: hidden; min-height: 11rem; }
.slp-ig__cell--1 { grid-column: span 2; min-height: 15rem; }
@container (min-width: 768px) {
  .slp-ig__grid { grid-template-columns: repeat(5, minmax(0, 1fr)); grid-template-rows: 15rem 15rem; gap: 1rem; }
  .slp-ig__cell { min-height: 0; }
  .slp-ig__cell--1 { grid-column: 1 / span 2; grid-row: 1 / span 2; }
  .slp-ig__cell--2 { grid-column: 3 / span 2; grid-row: 1; }
  .slp-ig__cell--3 { grid-column: 3; grid-row: 2; }
  .slp-ig__cell--4 { grid-column: 4; grid-row: 2; }
  .slp-ig__cell--5 { grid-column: 5; grid-row: 1 / span 2; }
}
.slp-ig--rounded .slp-ig__cell { border-radius: 1rem; }
.slp-ig__cell img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
.slp-ig__cell:hover img { transform: scale(1.05); }
.slp-ig--overlay .slp-ig__cell::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgb(17 24 39 / 30%), rgb(17 24 39 / 5%)); }
.slp-ig--bottom .slp-ig__cell::after { background: linear-gradient(0deg, rgb(17 24 39 / 40%), rgb(17 24 39 / 0%) 60%); }
.slp-ig__label { position: absolute; z-index: 1; inset-inline-start: 0; top: 0; padding: 1rem; font-size: 1.375rem; line-height: 1.3; font-weight: 700; color: var(--slp-ig-color, #fff); }
.slp-ig--bottom .slp-ig__label { top: auto; bottom: 0; }
@container (min-width: 768px) { .slp-ig__label { font-size: 1.75rem; } }
@media (prefers-reduced-motion: reduce) { .slp-ig__cell img { transition: none; } }
`;

export default class ImagesGrid extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-images-grid", css);
  }

  render() {
    const cfg = getConfig(this.config);
    const cells = [1, 2, 3, 4, 5].map((n) => ({ n, src: cfg[`image_${n}`], label: resolveText(cfg[`title_${n}`]) }));
    if (!cells.some((c) => c.src)) return nothing;
    const title = resolveText(cfg.title);
    const classes = [
      "slp-block slp-section slp-ig",
      cfg.rounded !== false ? "slp-ig--rounded" : "",
      cfg.overlay !== false ? "slp-ig--overlay" : "",
      cfg.bottom_titles ? "slp-ig--bottom" : "",
    ].filter(Boolean).join(" ");
    return html`<section class=${classes} style="--slp-ig-color:${cfg.titles_color || "#ffffff"}">
      <div class="slp-container">
        ${title ? html`<div class="slp-title"><h2>${title}</h2></div>` : nothing}
        <div class="slp-ig__grid">
          ${cells.filter((c) => c.src).map((c) => html`<div class="slp-ig__cell slp-ig__cell--${c.n}">
            <img src=${c.src} alt=${c.label} loading="lazy" />
            ${c.label ? html`<h3 class="slp-ig__label">${c.label}</h3>` : nothing}
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
