import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getCollectionItems, getConfig, resolveText } from "../../utils/config";
import { baseCss, injectStyles, schemeClass } from "../../utils/styles";

const css = `
.slp-ft__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
@container (min-width: 768px) { .slp-ft__grid { grid-template-columns: repeat(var(--slp-ft-cols, 4), minmax(0, 1fr)); gap: 1.5rem; } }
.slp-ft__item { position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: .625rem; padding: 1.5rem 1rem; border: 1px solid var(--slp-border); border-radius: 1rem; background: var(--slp-card); text-align: center; transition: transform .3s ease, box-shadow .3s ease; }
.slp-ft__item::after { content: ""; position: absolute; inset-inline: 0; bottom: 0; height: 3px; background: var(--color-primary, #111); transform: scaleX(0); transition: transform .35s ease; }
.slp-ft__item:hover { transform: translateY(-4px); box-shadow: 0 18px 35px -20px rgb(0 0 0 / 25%); }
.slp-ft__item:hover::after { transform: scaleX(1); }
.slp-ft__icon { display: flex; align-items: center; justify-content: center; width: 3.5rem; height: 3.5rem; border-radius: 999px; background: var(--slp-ft-icon-bg, var(--color-primary, #111)); color: var(--color-primary-reverse, #fff); font-size: 1.5rem; }
.slp-ft__img { width: 4rem; height: 4rem; object-fit: contain; }
.slp-ft__item h3 { font-size: 1rem; line-height: 1.4; font-weight: 700; color: var(--slp-text); }
.slp-ft__item p { font-size: .875rem; line-height: 1.7; color: var(--slp-muted); }
@media (prefers-reduced-motion: reduce) { .slp-ft__item, .slp-ft__item::after { transition: none; } }
`;

export default class Features extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-features", css);
  }

  render() {
    const cfg = getConfig(this.config);
    const items = getCollectionItems<Record<string, any>>(cfg.items, "items").filter((i) => resolveText(i.title));
    if (!items.length) return nothing;
    const title = resolveText(cfg.title);
    const subtitle = resolveText(cfg.subtitle);
    const cols = items.length > 3 ? 4 : items.length;
    const style = `--slp-ft-cols:${cols};${cfg.bg_color ? `--slp-section-bg:${cfg.bg_color};` : ""}${cfg.icon_bg ? `--slp-ft-icon-bg:${cfg.icon_bg}` : ""}`;
    return html`<section class="slp-block slp-section slp-ft ${schemeClass(cfg)}" style=${style}>
      <div class="slp-container">
        ${title || subtitle ? html`<div class="slp-title">${title ? html`<h2>${title}</h2>` : nothing}${subtitle ? html`<p>${subtitle}</p>` : nothing}</div>` : nothing}
        <div class="slp-ft__grid">
          ${items.map((item) => html`<div class="slp-ft__item">
            ${item.image
              ? html`<img class="slp-ft__img" src=${item.image} alt="" loading="lazy" />`
              : html`<span class="slp-ft__icon"><i class=${item.icon || "sicon-star2"}></i></span>`}
            <h3>${resolveText(item.title)}</h3>
            ${resolveText(item.sub_title) ? html`<p>${resolveText(item.sub_title)}</p>` : nothing}
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
