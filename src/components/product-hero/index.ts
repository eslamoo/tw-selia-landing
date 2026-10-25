import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getConfig, isRtl, resolveText, t, unwrapValue } from "../../utils/config";
import { ctaAction, fetchProduct, landingProductId, money, openCheckout, syncCheckoutQuantity } from "../../utils/landing";
import { baseCss, injectStyles } from "../../utils/styles";

// Port of the Selia theme's mini product card (mini-product-details), with the page's own checkout as the buy action
const css = `
.slp-mp { background: var(--slp-mp-bg, transparent); }
.slp-mp__card { display: flex; flex-direction: column; width: 100%; max-width: 40rem; margin-inline: auto; overflow: hidden; border: 1px solid var(--slp-mp-border, #eee); border-radius: 1rem; background: #fff; }
.slp-mp__main { position: relative; aspect-ratio: var(--slp-mp-ratio, 1 / 1); overflow: hidden; background: #fff; }
.slp-mp__main img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: var(--slp-mp-fit, cover); }
.slp-mp__thumbs { display: flex; gap: .5rem; height: 5rem; margin: .75rem 1rem 0; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; }
.slp-mp__thumbs::-webkit-scrollbar { display: none; }
.slp-mp__thumb { flex: 0 0 5rem; height: 5rem; padding: 0; border: 2px solid transparent; border-radius: .5rem; overflow: hidden; background: #fff; cursor: pointer; }
.slp-mp__thumb img { width: 100%; height: 100%; object-fit: var(--slp-mp-fit, cover); }
.slp-mp__thumb.is-active { border-color: var(--color-primary, #111); }
.slp-mp__marquee { overflow: hidden; background: var(--slp-mp-mq-bg, #111); color: var(--slp-mp-mq-color, #fff); direction: ltr; font-size: .8125rem; font-weight: 700; }
.slp-mp__thumbs + .slp-mp__marquee { margin-top: 1rem; }
.slp-mp__marquee ul { display: flex; width: max-content; animation: slp-mp-marquee 7s linear infinite; }
.slp-mp__marquee li { display: flex; align-items: center; gap: .75rem; padding: .55rem .375rem; white-space: nowrap; direction: rtl; }
.slp-mp__marquee li i { font-size: .75rem; opacity: .85; }
@keyframes slp-mp-marquee { to { transform: translateX(-50%); } }
.slp-mp__info { display: flex; flex-direction: column; flex: 1 1 auto; padding: 1rem; }
.slp-mp__meta { display: flex; align-items: center; justify-content: space-between; gap: .5rem; min-height: 1.5rem; font-size: .8125rem; }
.slp-mp__sold { display: inline-flex; align-items: center; gap: .25rem; color: #f11e1e; font-weight: 700; white-space: nowrap; }
.slp-mp__sold svg { width: 1rem; height: 1rem; }
.slp-mp__rating { display: inline-flex; align-items: center; gap: .125rem; margin-inline-start: auto; color: #d1d5db; white-space: nowrap; }
.slp-mp__rating .is-on { color: #f5a524; }
.slp-mp__rating span { margin-inline-start: .25rem; color: #6b7280; font-size: .75rem; }
.slp-mp__name { margin-top: .5rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: 1rem; line-height: 1.5rem; font-weight: 700; color: #111; }
.slp-mp__subtitle { margin: 0; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: .875rem; line-height: 1.5rem; color: #6b7280; }
.slp-mp__price { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; min-height: 2rem; margin-top: .5rem; }
.slp-mp__total { font-size: 1.375rem; font-weight: 800; color: #111; }
.slp-mp__price.is-on-sale .slp-mp__total { color: #dc2626; }
.slp-mp__before { font-size: .875rem; color: #6b7280; text-decoration: line-through; }
.slp-mp__save { padding: .125rem .5rem; border-radius: .375rem; background: rgb(220 38 38 / 10%); color: #dc2626; font-size: .75rem; font-weight: 700; white-space: nowrap; }
.slp-mp__desc { margin-top: .5rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: .8125rem; line-height: 1.375rem; color: #6b7280; }
.slp-mp__actions { display: flex; align-items: stretch; gap: .625rem; margin-top: auto; padding-top: .75rem; }
.slp-mp__qty { flex: 0 0 auto; display: flex; align-items: center; height: 2.75rem; border: 1px solid rgb(0 0 0 / 10%); border-radius: .375rem; overflow: hidden; }
.slp-mp__qty button { width: 2.5rem; height: 100%; border: 0; background: transparent; font-size: 1.25rem; line-height: 1; color: #111; cursor: pointer; }
.slp-mp__qty button:disabled { opacity: .35; cursor: default; }
.slp-mp__qty output { min-width: 2rem; text-align: center; font-weight: 700; }
.slp-mp__buy { flex: 1 1 auto; min-width: 0; min-height: 2.75rem; padding-block: .5rem; border-radius: .375rem; background: var(--slp-mp-btn-bg, var(--color-primary, #111)); color: var(--slp-mp-btn-color, var(--color-primary-reverse, #fff)); }
.slp-mp__out { margin-top: .5rem; color: #dc2626; font-weight: 700; }
.slp-mp__skel { border-radius: .375rem; background: rgb(0 0 0 / 6%); }
.slp-mp__empty { max-width: 40rem; margin-inline: auto; padding: 2rem; border: 1px dashed #d4d4d8; border-radius: 1rem; text-align: center; color: #71717a; }
@media (prefers-reduced-motion: reduce) { .slp-mp__marquee ul { animation: none; } }
`;

const FIRE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.165 512.165" aria-hidden="true"><path d="m437.476 320.656c-.004-.05-.007-.101-.011-.15-1.541-21.368-5.481-39.513-12.39-57.037-.093-.265-.193-.528-.302-.79-.395-.951-39.225-95.684-21.044-147.746 1.641-4.697.845-9.901-2.123-13.894s-7.716-6.249-12.691-6.037c-1.333.058-28.492 1.565-57.3 26.911-25.213-52.021-29.194-107.287-29.235-107.89-.341-5.227-3.383-9.896-8.026-12.32-4.644-2.425-10.213-2.249-14.697.457-39.788 24.034-70.525 53.365-91.356 87.18-16.82 27.302-27.192 57.459-30.829 89.634-2.184 19.327-1.665 37.002-.054 51.85.746 6.879-6.125 12.051-12.529 9.432l-38.613-15.797c-2.632-1.077-5.512-1.525-8.32-1.073-5.912.952-10.518 5.194-12.095 10.682-3.504 12.189-6.128 23.455-8.023 34.441-6.596 38.261-3.897 77.447 7.802 113.325 11.762 36.068 32.059 67.129 58.697 89.824 31.481 26.822 69.604 40.477 111.176 40.477 22.939 0 46.93-4.158 71.431-12.557 38.865-13.321 69.645-39.707 89.011-76.303 16.095-30.419 23.739-66.863 21.521-102.619z" fill="#ff001e"/><path d="m296.687 260.081c-3.792-5.657-10.918-8.056-17.356-5.829-6.438 2.223-10.57 8.503-10.063 15.295 1.789 23.976-.608 94.475-33.954 103.618-28.387 7.787-43.529-5.362-45-6.726-3.681-4.013-9.084-5.533-14.39-4.261-5.342 1.285-9.38 5.573-10.805 10.879-.283 1.053-2.793 10.461-3.851 16.59-6.784 39.356 6.081 78.356 33.576 101.781 16.127 13.74 35.578 20.736 56.725 20.736 11.536 0 23.58-2.084 35.855-6.292 19.779-6.78 36.691-21.121 48.908-41.475 10.219-17.024 16.161-36.889 16.305-54.5.366-45.31-16.889-91.515-55.95-149.816z" fill="#ffeb00"/></svg>';

function timesLabel(count: number): string {
  const n = count.toLocaleString("en-US");
  if (!isRtl()) return `${n} ${count === 1 ? "time" : "times"}`;
  if (count === 1) return "مرة واحدة";
  if (count === 2) return "مرتين";
  return `${n} ${count <= 10 ? "مرات" : "مرة"}`;
}

type Image = { url: string; alt?: string };

export default class ProductHero extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  @state() private product: any = null;
  @state() private loading = true;
  @state() private active = 0;
  @state() private quantity = 1;

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-product-hero", css);
    this.product = await fetchProduct(landingProductId() || this.fieldProductId());
    this.loading = false;
  }

  private fieldProductId(): string | null {
    const value = getConfig(this.config).product;
    const first = Array.isArray(value) ? value[0] : value;
    const id = first && typeof first === "object" ? first.value ?? first.id : first;
    return id ? String(id) : null;
  }

  private images(): Image[] {
    const p = this.product;
    const list: Image[] = (p?.images || [])
      .filter((img: any) => img?.url && (!img.type || img.type === "image"))
      .map((img: any) => ({ url: img.url, alt: img.alt }));
    if (!list.length && p?.image?.url) list.push({ url: p.image.url, alt: p.image.alt });
    return list;
  }

  private onBuy(e: Event) {
    if (ctaAction(this.product?.url || "").kind !== "checkout") return;
    e.preventDefault();
    openCheckout(this.product, this.quantity);
    syncCheckoutQuantity(this.quantity);
  }

  private renderTitle(cfg: Record<string, any>) {
    const title = resolveText(cfg.title);
    const subtitle = resolveText(cfg.subtitle);
    if (!title && !subtitle) return nothing;
    return html`<div class="slp-title">${title ? html`<h2>${title}</h2>` : nothing}${subtitle ? html`<p>${subtitle}</p>` : nothing}</div>`;
  }

  private renderMeta(cfg: Record<string, any>) {
    const p = this.product;
    const sold = cfg.show_sold !== false ? Number(cfg.sold_count) || Number(p.sold_quantity) || 0 : 0;
    const realStars = Number(p.rating?.stars) || 0;
    const stars = realStars || (cfg.custom_rating ? Math.min(5, Number(cfg.rating_value) || 0) : 0);
    const reviews = realStars ? Number(p.rating?.count) || 0 : Number(cfg.rating_count) || 0;
    if (!sold && !stars) return nothing;
    return html`<div class="slp-mp__meta">
      ${sold ? html`<span class="slp-mp__sold">${unsafeHTML(FIRE_ICON)}<span>${t({ ar: "مباع", en: "Sold" })} ${timesLabel(sold)}</span></span>` : nothing}
      ${stars
        ? html`<span class="slp-mp__rating" aria-label="${stars}/5">
            ${[1, 2, 3, 4, 5].map((i) => html`<i class="sicon-star2 ${i <= Math.round(stars) ? "is-on" : ""}"></i>`)}
            ${reviews ? html`<span>(${reviews.toLocaleString("en-US")} ${t({ ar: "تقييم", en: "reviews" })})</span>` : nothing}
          </span>`
        : nothing}
    </div>`;
  }

  private renderPrice() {
    const p = this.product;
    const price = Number(p.is_on_sale ? p.sale_price : p.starting_price || p.price) || 0;
    const regular = Number(p.regular_price) || 0;
    const onSale = Boolean(p.is_on_sale) && regular > price;
    const pct = onSale ? Math.round(((regular - price) / regular) * 100) : 0;
    return html`<div class="slp-mp__price${onSale ? " is-on-sale" : ""}">
      <span class="slp-mp__total">${unsafeHTML(money(price))}</span>
      ${onSale ? html`<span class="slp-mp__before">${unsafeHTML(money(regular))}</span>` : nothing}
      ${pct ? html`<span class="slp-mp__save">${t({ ar: "وفر", en: "Save" })} ${pct}%</span>` : nothing}
    </div>`;
  }

  private renderActions(cfg: Record<string, any>) {
    const p = this.product;
    if (p.status === "out" || p.is_out_of_stock) {
      return html`<p class="slp-mp__out">${t({ ar: "نفدت الكمية", en: "Out of stock" })}</p>`;
    }
    const action = ctaAction(p.url || "");
    if (action.kind === "none") return nothing;
    const label = resolveText(cfg.btn_text) || t({ ar: "اشترِ الآن", en: "Buy now" });
    const max = Number(p.max_quantity) || 99;
    return html`<div class="slp-mp__actions">
      ${cfg.show_quantity !== false && action.kind === "checkout"
        ? html`<div class="slp-mp__qty" role="group" aria-label=${t({ ar: "الكمية", en: "Quantity" })}>
            <button type="button" aria-label="+" ?disabled=${this.quantity >= max} @click=${() => (this.quantity = Math.min(max, this.quantity + 1))}>+</button>
            <output>${this.quantity}</output>
            <button type="button" aria-label="-" ?disabled=${this.quantity <= 1} @click=${() => (this.quantity = Math.max(1, this.quantity - 1))}>−</button>
          </div>`
        : nothing}
      <a class="slp-btn slp-mp__buy" href=${action.kind === "link" ? action.url : "#"} @click=${this.onBuy}>${label}</a>
    </div>`;
  }

  render() {
    const cfg = getConfig(this.config);
    const ratio = { portrait: "3 / 4", landscape: "4 / 3" }[String(unwrapValue(cfg.media_aspect))] || "1 / 1";
    const style = [
      `--slp-mp-ratio:${ratio}`,
      `--slp-mp-fit:${unwrapValue(cfg.media_fit) === "contain" ? "contain" : "cover"}`,
      cfg.bg_color ? `--slp-mp-bg:${cfg.bg_color}` : "",
      cfg.border_color ? `--slp-mp-border:${cfg.border_color}` : "",
      cfg.btn_bg ? `--slp-mp-btn-bg:${cfg.btn_bg}` : "",
      cfg.btn_color ? `--slp-mp-btn-color:${cfg.btn_color}` : "",
      `--slp-mp-mq-bg:${cfg.marquee_bg || "#111111"}`,
      `--slp-mp-mq-color:${cfg.marquee_color || "#ffffff"}`,
    ].filter(Boolean).join(";");

    if (this.loading) {
      return html`<section class="slp-block slp-section slp-mp" style=${style}><div class="slp-container">
        ${this.renderTitle(cfg)}
        <div class="slp-mp__card"><div class="slp-mp__main slp-mp__skel"></div>
          <div class="slp-mp__info"><div class="slp-mp__skel" style="height:1.125rem;width:70%;margin-top:.5rem"></div>
          <div class="slp-mp__skel" style="height:1.25rem;width:45%;margin-top:.75rem"></div>
          <div class="slp-mp__skel" style="height:2.75rem;margin-top:1rem"></div></div></div>
      </div></section>`;
    }

    if (!this.product) {
      return html`<section class="slp-block slp-section slp-mp"><div class="slp-container"><p class="slp-mp__empty">
        ${t({ ar: "اختر منتج الصفحة من إعدادات صفحة الهبوط لعرضه هنا", en: "Choose the page product in the landing page settings to show it here" })}
      </p></div></section>`;
    }

    const p = this.product;
    const images = this.images();
    const current = images[this.active] || images[0];
    const marquee = resolveText(cfg.marquee_text);
    const subtitle = cfg.show_subtitle !== false ? p.subtitle : "";
    const desc = cfg.show_description ? String(p.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

    return html`<section class="slp-block slp-section slp-mp" style=${style}>
      <div class="slp-container">
        ${this.renderTitle(cfg)}
        <article class="slp-mp__card">
          <div class="slp-mp__media">
            <div class="slp-mp__main">${current ? html`<img src=${current.url} alt=${current.alt || p.name} fetchpriority="high" />` : nothing}</div>
            ${cfg.show_thumbs !== false && images.length > 1
              ? html`<div class="slp-mp__thumbs">${images.map((img, i) => html`<button type="button"
                  class="slp-mp__thumb ${i === this.active ? "is-active" : ""}" aria-label=${img.alt || p.name}
                  @click=${() => (this.active = i)}><img src=${img.url} alt="" loading="lazy" /></button>`)}</div>`
              : nothing}
          </div>
          ${marquee
            ? html`<div class="slp-mp__marquee"><ul>${Array.from({ length: 12 }, (_, i) => html`<li aria-hidden=${i ? "true" : "false"}>
                <span>${marquee}</span><i class=${cfg.marquee_icon || "sicon-star"}></i></li>`)}</ul></div>`
            : nothing}
          <div class="slp-mp__info">
            ${this.renderMeta(cfg)}
            <h3 class="slp-mp__name">${p.name}</h3>
            ${subtitle ? html`<p class="slp-mp__subtitle">${subtitle}</p>` : nothing}
            ${this.renderPrice()}
            ${desc ? html`<p class="slp-mp__desc">${desc}</p>` : nothing}
            ${this.renderActions(cfg)}
          </div>
        </article>
      </div>
    </section>`;
  }
}
