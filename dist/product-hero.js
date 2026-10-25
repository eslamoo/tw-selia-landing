import { LitElement as q, nothing as o, html as i } from "lit";
import { property as z, state as g } from "lit/decorators.js";
import { unsafeHTML as v } from "lit/directives/unsafe-html.js";
import { i as y, c as S, a as $, r as f, t as p, u as w, b as C } from "./styles-D8vrM0Wa.js";
import { f as N, l as P, c as k, o as M, s as j, m as x, i as L, p as A } from "./landing-BYqcrX_B.js";
var B = Object.defineProperty, _ = (l, e, t, r) => {
  for (var s = void 0, a = l.length - 1, n; a >= 0; a--)
    (n = l[a]) && (s = n(e, t, s) || s);
  return s && B(e, t, s), s;
};
const I = `
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
`, T = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.165 512.165" aria-hidden="true"><path d="m437.476 320.656c-.004-.05-.007-.101-.011-.15-1.541-21.368-5.481-39.513-12.39-57.037-.093-.265-.193-.528-.302-.79-.395-.951-39.225-95.684-21.044-147.746 1.641-4.697.845-9.901-2.123-13.894s-7.716-6.249-12.691-6.037c-1.333.058-28.492 1.565-57.3 26.911-25.213-52.021-29.194-107.287-29.235-107.89-.341-5.227-3.383-9.896-8.026-12.32-4.644-2.425-10.213-2.249-14.697.457-39.788 24.034-70.525 53.365-91.356 87.18-16.82 27.302-27.192 57.459-30.829 89.634-2.184 19.327-1.665 37.002-.054 51.85.746 6.879-6.125 12.051-12.529 9.432l-38.613-15.797c-2.632-1.077-5.512-1.525-8.32-1.073-5.912.952-10.518 5.194-12.095 10.682-3.504 12.189-6.128 23.455-8.023 34.441-6.596 38.261-3.897 77.447 7.802 113.325 11.762 36.068 32.059 67.129 58.697 89.824 31.481 26.822 69.604 40.477 111.176 40.477 22.939 0 46.93-4.158 71.431-12.557 38.865-13.321 69.645-39.707 89.011-76.303 16.095-30.419 23.739-66.863 21.521-102.619z" fill="#ff001e"/><path d="m296.687 260.081c-3.792-5.657-10.918-8.056-17.356-5.829-6.438 2.223-10.57 8.503-10.063 15.295 1.789 23.976-.608 94.475-33.954 103.618-28.387 7.787-43.529-5.362-45-6.726-3.681-4.013-9.084-5.533-14.39-4.261-5.342 1.285-9.38 5.573-10.805 10.879-.283 1.053-2.793 10.461-3.851 16.59-6.784 39.356 6.081 78.356 33.576 101.781 16.127 13.74 35.578 20.736 56.725 20.736 11.536 0 23.58-2.084 35.855-6.292 19.779-6.78 36.691-21.121 48.908-41.475 10.219-17.024 16.161-36.889 16.305-54.5.366-45.31-16.889-91.515-55.95-149.816z" fill="#ffeb00"/></svg>';
function O(l) {
  const e = l.toLocaleString("en-US");
  return C() ? l === 1 ? "مرة واحدة" : l === 2 ? "مرتين" : `${e} ${l <= 10 ? "مرات" : "مرة"}` : `${e} ${l === 1 ? "time" : "times"}`;
}
class m extends q {
  constructor() {
    super(...arguments), this.product = null, this.loading = !0, this.active = 0, this.quantity = 1;
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), y("slp-base", S), y("slp-product-hero", I), this.product = await N(P() || this.fieldProductId()), this.loading = !1;
  }
  fieldProductId() {
    const e = $(this.config).product, t = Array.isArray(e) ? e[0] : e, r = t && typeof t == "object" ? t.value ?? t.id : t;
    return r ? String(r) : null;
  }
  images() {
    var r;
    const e = this.product, t = ((e == null ? void 0 : e.images) || []).filter((s) => (s == null ? void 0 : s.url) && (!s.type || s.type === "image")).map((s) => ({ url: s.url, alt: s.alt }));
    return !t.length && ((r = e == null ? void 0 : e.image) != null && r.url) && t.push({ url: e.image.url, alt: e.image.alt }), t;
  }
  onBuy(e) {
    var t;
    k(((t = this.product) == null ? void 0 : t.url) || "").kind === "checkout" && (e.preventDefault(), M(this.product, this.quantity), j(this.quantity));
  }
  renderTitle(e) {
    const t = f(e.title), r = f(e.subtitle);
    return !t && !r ? o : i`<div class="slp-title">${t ? i`<h2>${t}</h2>` : o}${r ? i`<p>${r}</p>` : o}</div>`;
  }
  renderMeta(e) {
    var c, d;
    const t = this.product, r = e.show_sold !== !1 && (Number(e.sold_count) || Number(t.sold_quantity)) || 0, s = Number((c = t.rating) == null ? void 0 : c.stars) || 0, a = s || (e.custom_rating ? Math.min(5, Number(e.rating_value) || 0) : 0), n = s ? Number((d = t.rating) == null ? void 0 : d.count) || 0 : Number(e.rating_count) || 0;
    return !r && !a ? o : i`<div class="slp-mp__meta">
      ${r ? i`<span class="slp-mp__sold">${v(T)}<span>${p({ ar: "مباع", en: "Sold" })} ${O(r)}</span></span>` : o}
      ${a ? i`<span class="slp-mp__rating" aria-label="${a}/5">
            ${[1, 2, 3, 4, 5].map((h) => i`<i class="sicon-star2 ${h <= Math.round(a) ? "is-on" : ""}"></i>`)}
            ${n ? i`<span>(${n.toLocaleString("en-US")} ${p({ ar: "تقييم", en: "reviews" })})</span>` : o}
          </span>` : o}
    </div>`;
  }
  renderPrice() {
    const e = this.product, t = Number(e.is_on_sale ? e.sale_price : e.starting_price || e.price) || 0, r = Number(e.regular_price) || 0, s = !!e.is_on_sale && r > t, a = s ? Math.round((r - t) / r * 100) : 0;
    return i`<div class="slp-mp__price${s ? " is-on-sale" : ""}">
      <span class="slp-mp__total">${v(x(t))}</span>
      ${s ? i`<span class="slp-mp__before">${v(x(r))}</span>` : o}
      ${a ? i`<span class="slp-mp__save">${p({ ar: "وفر", en: "Save" })} ${a}%</span>` : o}
    </div>`;
  }
  renderActions(e) {
    const t = this.product;
    if (t.status === "out" || t.is_out_of_stock)
      return i`<p class="slp-mp__out">${p({ ar: "نفدت الكمية", en: "Out of stock" })}</p>`;
    const r = k(t.url || "");
    if (r.kind === "none") return o;
    const s = f(e.btn_text) || p({ ar: "اشترِ الآن", en: "Buy now" }), a = Number(t.max_quantity) || 99;
    return i`<div class="slp-mp__actions">
      ${e.show_quantity !== !1 && r.kind === "checkout" ? i`<div class="slp-mp__qty" role="group" aria-label=${p({ ar: "الكمية", en: "Quantity" })}>
            <button type="button" aria-label="+" ?disabled=${this.quantity >= a} @click=${() => this.quantity = Math.min(a, this.quantity + 1)}>+</button>
            <output>${this.quantity}</output>
            <button type="button" aria-label="-" ?disabled=${this.quantity <= 1} @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>−</button>
          </div>` : o}
      <a class="slp-btn slp-mp__buy" href=${r.kind === "link" ? r.url : "#"} @click=${this.onBuy}>${s}</a>
    </div>`;
  }
  render() {
    const e = $(this.config), r = [
      `--slp-mp-ratio:${{ portrait: "3 / 4", landscape: "4 / 3" }[String(w(e.media_aspect))] || "1 / 1"}`,
      `--slp-mp-fit:${w(e.media_fit) === "contain" ? "contain" : "cover"}`,
      e.bg_color ? `--slp-mp-bg:${e.bg_color}` : "",
      e.border_color ? `--slp-mp-border:${e.border_color}` : "",
      e.btn_bg ? `--slp-mp-btn-bg:${e.btn_bg}` : "",
      e.btn_color ? `--slp-mp-btn-color:${e.btn_color}` : "",
      `--slp-mp-mq-bg:${e.marquee_bg || "#111111"}`,
      `--slp-mp-mq-color:${e.marquee_color || "#ffffff"}`
    ].filter(Boolean).join(";");
    if (this.loading)
      return i`<section class="slp-block slp-section slp-mp" style=${r}><div class="slp-container">
        ${this.renderTitle(e)}
        <div class="slp-mp__card"><div class="slp-mp__main slp-mp__skel"></div>
          <div class="slp-mp__info"><div class="slp-mp__skel" style="height:1.125rem;width:70%;margin-top:.5rem"></div>
          <div class="slp-mp__skel" style="height:1.25rem;width:45%;margin-top:.75rem"></div>
          <div class="slp-mp__skel" style="height:2.75rem;margin-top:1rem"></div></div></div>
      </div></section>`;
    if (!this.product) {
      const u = !L() || A() === "promotion";
      return i`<section class="slp-block slp-section slp-mp"><div class="slp-container"><p class="slp-mp__empty">
        ${u ? p({ ar: "اختر المنتج من إعدادات هذا القسم لعرضه هنا", en: "Choose a product in this section's settings to show it here" }) : p({ ar: "اختر منتج الصفحة من إعدادات صفحة الهبوط لعرضه هنا", en: "Choose the page product in the landing page settings to show it here" })}
      </p></div></section>`;
    }
    const s = this.product, a = this.images(), n = a[this.active] || a[0], c = f(e.marquee_text), d = e.show_subtitle !== !1 ? s.subtitle : "", h = e.show_description ? String(s.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
    return i`<section class="slp-block slp-section slp-mp" style=${r}>
      <div class="slp-container">
        ${this.renderTitle(e)}
        <article class="slp-mp__card">
          <div class="slp-mp__media">
            <div class="slp-mp__main">${n ? i`<img src=${n.url} alt=${n.alt || s.name} fetchpriority="high" />` : o}</div>
            ${e.show_thumbs !== !1 && a.length > 1 ? i`<div class="slp-mp__thumbs">${a.map((u, b) => i`<button type="button"
                  class="slp-mp__thumb ${b === this.active ? "is-active" : ""}" aria-label=${u.alt || s.name}
                  @click=${() => this.active = b}><img src=${u.url} alt="" loading="lazy" /></button>`)}</div>` : o}
          </div>
          ${c ? i`<div class="slp-mp__marquee"><ul>${Array.from({ length: 12 }, (u, b) => i`<li aria-hidden=${b ? "true" : "false"}>
                <span>${c}</span><i class=${e.marquee_icon || "sicon-star"}></i></li>`)}</ul></div>` : o}
          <div class="slp-mp__info">
            ${this.renderMeta(e)}
            <h3 class="slp-mp__name">${s.name}</h3>
            ${d ? i`<p class="slp-mp__subtitle">${d}</p>` : o}
            ${this.renderPrice()}
            ${h ? i`<p class="slp-mp__desc">${h}</p>` : o}
            ${this.renderActions(e)}
          </div>
        </article>
      </div>
    </section>`;
  }
}
_([
  z({ type: Object })
], m.prototype, "config");
_([
  g()
], m.prototype, "product");
_([
  g()
], m.prototype, "loading");
_([
  g()
], m.prototype, "active");
_([
  g()
], m.prototype, "quantity");
typeof m < "u" && m.registerSallaComponent("salla-product-hero");
export {
  m as default
};
