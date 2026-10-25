import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getCollectionItems, getConfig, resolveText } from "../../utils/config";
import { baseCss, injectStyles } from "../../utils/styles";

const css = `
.slp-faq { background: var(--slp-faq-bg, #fff); }
.slp-faq__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: .875rem; align-items: start; }
@container (min-width: 768px) { .slp-faq--two .slp-faq__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; } }
.slp-faq__item { border: 1px solid #e5e7eb; border-radius: .875rem; background: #fff; overflow: hidden; }
.slp-faq__q { display: flex; align-items: center; justify-content: space-between; gap: .75rem; width: 100%; padding: 1rem 1.25rem; border: 0; background: transparent; font: inherit; font-size: 1rem; font-weight: 700; line-height: 1.5; color: #111; text-align: start; cursor: pointer; }
.slp-faq__q i { flex: 0 0 1.75rem; height: 1.75rem; display: flex; align-items: center; justify-content: center; border-radius: 999px; background: var(--color-primary, #111); color: var(--color-primary-reverse, #fff); font-size: 1rem; transition: transform .3s ease; }
.slp-faq__item.is-open .slp-faq__q i { transform: rotate(180deg); }
.slp-faq__a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.slp-faq__item.is-open .slp-faq__a { grid-template-rows: 1fr; }
.slp-faq__a > div { overflow: hidden; }
.slp-faq__a p { padding: 0 1.25rem 1.125rem; font-size: .9375rem; line-height: 1.85; color: #4b5563; white-space: pre-line; }
@media (prefers-reduced-motion: reduce) { .slp-faq__a, .slp-faq__q i { transition: none; } }
`;

export default class Faq extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private open = 0;
  private uid = `slp-faq-${Math.random().toString(36).slice(2, 8)}`;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-faq", css);
  }

  render() {
    const cfg = getConfig(this.config);
    const items = getCollectionItems<Record<string, any>>(cfg.items, "items").filter((i) => resolveText(i.question));
    if (!items.length) return nothing;
    const title = resolveText(cfg.title);
    const subtitle = resolveText(cfg.subtitle);
    const id = this.uid;
    return html`<section class="slp-block slp-section slp-faq${cfg.two_columns !== false ? " slp-faq--two" : ""}" style="--slp-faq-bg:${cfg.bg_color || "#ffffff"}">
      <div class="slp-container">
        ${title || subtitle ? html`<div class="slp-title">${title ? html`<h2>${title}</h2>` : nothing}${subtitle ? html`<p>${subtitle}</p>` : nothing}</div>` : nothing}
        <div class="slp-faq__grid">
          ${items.map((item, i) => html`<div class="slp-faq__item ${this.open === i ? "is-open" : ""}">
            <button type="button" class="slp-faq__q" aria-expanded=${this.open === i ? "true" : "false"} aria-controls="${id}-${i}"
              @click=${() => (this.open = this.open === i ? -1 : i)}>
              <span>${resolveText(item.question)}</span><i class="sicon-keyboard_arrow_down"></i>
            </button>
            <div class="slp-faq__a" id="${id}-${i}" role="region"><div><p>${resolveText(item.answer)}</p></div></div>
          </div>`)}
        </div>
      </div>
    </section>`;
  }
}
