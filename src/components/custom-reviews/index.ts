import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getCollectionItems, getConfig, resolveText, t } from "../../utils/config";
import { baseCss, injectStyles } from "../../utils/styles";

const css = `
.slp-rv { background: var(--slp-rv-bg, #f8f8f8); }
.slp-rv__track { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: .25rem .25rem 1rem; scrollbar-width: none; }
.slp-rv__track::-webkit-scrollbar { display: none; }
.slp-rv__card { position: relative; flex: 0 0 85%; scroll-snap-align: start; display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem; padding: 1.5rem; border-radius: 1rem; background: var(--slp-rv-card, #fff); box-shadow: 0 2px 5px rgb(50 50 105 / 12%), 0 1px 1px rgb(0 0 0 / 5%); }
@container (min-width: 640px) { .slp-rv__card { flex-basis: calc((100% - 1rem) / 2); } }
@container (min-width: 1024px) { .slp-rv__card { flex-basis: calc((100% - 2rem) / 3); } }
.slp-rv__quote { position: absolute; top: 1rem; inset-inline-end: 1rem; font-size: 2rem; opacity: .1; }
.slp-rv__text { font-size: .9375rem; line-height: 1.85; color: #1f2937; }
.slp-rv__author { display: flex; align-items: center; gap: .875rem; }
.slp-rv__avatar { flex: 0 0 3.25rem; width: 3.25rem; height: 3.25rem; border-radius: 999px; object-fit: cover; }
.slp-rv__initials { display: flex; align-items: center; justify-content: center; background: var(--color-primary, #111); color: var(--color-primary-reverse, #fff); font-weight: 700; font-size: 1.125rem; }
.slp-rv__name { font-size: 1rem; font-weight: 700; color: #111; }
.slp-rv__stars { display: flex; gap: .125rem; margin-top: .25rem; font-size: .8125rem; color: #d1d5db; }
.slp-rv__stars .is-on { color: #f5a524; }
.slp-rv__nav { display: flex; justify-content: center; gap: .5rem; margin-top: .5rem; }
.slp-rv__nav button { width: 2.5rem; height: 2.5rem; border: 1px solid #e5e7eb; border-radius: 999px; background: #fff; color: #111; cursor: pointer; font-size: 1rem; }
`;

type Review = { name: unknown; image: string; rate: number; review: unknown };

export default class CustomReviews extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  private timer?: number;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-custom-reviews", css);
    if (getConfig(this.config).autoplay !== false && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.timer = window.setInterval(() => this.step(1, true), 5000);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private step(dir: number, loop = false) {
    const track = this.querySelector<HTMLElement>(".slp-rv__track");
    const card = track?.querySelector<HTMLElement>(".slp-rv__card");
    if (!track || !card) return;
    const step = (card.offsetWidth + 16) * dir * (getComputedStyle(track).direction === "rtl" ? -1 : 1);
    const max = track.scrollWidth - track.clientWidth;
    const atEnd = Math.abs(track.scrollLeft) >= max - 4;
    if (loop && atEnd) track.scrollTo({ left: 0 });
    else track.scrollBy({ left: step });
  }

  private initials(name: string): string {
    return name.trim().charAt(0);
  }

  render() {
    const cfg = getConfig(this.config);
    const items = getCollectionItems<Review>(cfg.items, "items").filter((r) => resolveText(r.review));
    if (!items.length) return nothing;
    const title = resolveText(cfg.title);
    const subtitle = resolveText(cfg.subtitle);
    return html`<section class="slp-block slp-section slp-rv" style="--slp-rv-bg:${cfg.bg_color || "#f8f8f8"};--slp-rv-card:${cfg.card_bg || "#ffffff"}">
      <div class="slp-container">
        ${title || subtitle ? html`<div class="slp-title">${title ? html`<h2>${title}</h2>` : nothing}${subtitle ? html`<p>${subtitle}</p>` : nothing}</div>` : nothing}
        <div class="slp-rv__track" @pointerdown=${() => window.clearInterval(this.timer)}>
          ${items.map((r) => {
            const name = resolveText(r.name);
            const rate = Math.min(Math.max(Number(r.rate) || 5, 1), 5);
            return html`<article class="slp-rv__card">
              <i class="slp-rv__quote sicon-quote"></i>
              <p class="slp-rv__text">${resolveText(r.review)}</p>
              <div class="slp-rv__author">
                ${r.image
                  ? html`<img class="slp-rv__avatar" src=${r.image} alt=${name} loading="lazy" />`
                  : html`<span class="slp-rv__avatar slp-rv__initials" aria-hidden="true">${this.initials(name)}</span>`}
                <div>
                  <h3 class="slp-rv__name">${name}</h3>
                  <div class="slp-rv__stars" aria-label="${rate}/5">
                    ${[1, 2, 3, 4, 5].map((i) => html`<i class="sicon-star2 ${i <= rate ? "is-on" : ""}"></i>`)}
                  </div>
                </div>
              </div>
            </article>`;
          })}
        </div>
        ${items.length > 1
          ? html`<div class="slp-rv__nav">
              <button type="button" aria-label=${t({ ar: "السابق", en: "Previous" })} @click=${() => this.step(-1)}><i class="sicon-keyboard_arrow_right"></i></button>
              <button type="button" aria-label=${t({ ar: "التالي", en: "Next" })} @click=${() => this.step(1)}><i class="sicon-keyboard_arrow_left"></i></button>
            </div>`
          : nothing}
      </div>
    </section>`;
  }
}
