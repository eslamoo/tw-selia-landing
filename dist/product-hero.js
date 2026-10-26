import { LitElement as M, nothing as o, html as i } from "lit";
import { property as P, state as b } from "lit/decorators.js";
import { unsafeHTML as f } from "lit/directives/unsafe-html.js";
import { i as y, c as S, a as $, r as g, t as m, u as w, s as v, b as q } from "./styles-Czqp750h.js";
import { f as z, l as C, c as k, o as L, s as N, m as x, i as T, p as j } from "./landing-BqmPvx7F.js";
var A = Object.defineProperty, _ = (n, t, e, s) => {
  for (var r = void 0, a = n.length - 1, c; a >= 0; a--)
    (c = n[a]) && (r = c(t, e, r) || r);
  return r && A(t, e, r), r;
};
const B = `
.slp-mp__card { display: flex; flex-direction: column; width: 100%; max-width: 40rem; margin-inline: auto; overflow: hidden; border: 1px solid var(--slp-mp-border, var(--slp-border)); border-radius: 1rem; background: var(--slp-card); }
.slp-mp__main { position: relative; aspect-ratio: var(--slp-mp-ratio, 1 / 1); overflow: hidden; background: var(--slp-card); }
.slp-mp__track { position: absolute; inset: 0; display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scrollbar-width: none; cursor: grab; }
.slp-mp__track::-webkit-scrollbar { display: none; }
.slp-mp__track.is-dragging { scroll-snap-type: none; cursor: grabbing; user-select: none; }
.slp-mp__slide { position: relative; flex: 0 0 100%; scroll-snap-align: start; }
.slp-mp__slide img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: var(--slp-mp-fit, cover); pointer-events: none; }
.slp-mp__dots { position: absolute; bottom: .75rem; inset-inline: 0; display: flex; justify-content: center; gap: .375rem; pointer-events: none; }
.slp-mp__dots span { width: .4rem; height: .4rem; border-radius: 999px; background: rgb(0 0 0 / 25%); transition: width .3s ease, background .3s ease; }
.slp-mp__dots span.is-active { width: 1.1rem; background: var(--color-primary, #111); }
.slp-mp__thumbs { display: flex; gap: .5rem; height: 5rem; margin: .75rem 1rem 0; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; }
.slp-mp__thumbs::-webkit-scrollbar { display: none; }
.slp-mp__thumb { flex: 0 0 5rem; height: 5rem; padding: 0; border: 2px solid transparent; border-radius: .5rem; overflow: hidden; background: var(--slp-card); cursor: pointer; }
.slp-mp__thumb img { width: 100%; height: 100%; object-fit: var(--slp-mp-fit, cover); }
.slp-mp__thumb.is-active { border-color: var(--color-primary, #111); }
/* Selia's mini product marquee: the announcement bar's motion, each copy slides by its own width in 7s */
.slp-mp__marquee { overflow: hidden; padding-block: 5px; background: var(--slp-mp-mq-bg, #111); color: var(--slp-mp-mq-color, #fff); font-size: .8125rem; font-weight: 700; }
.slp-mp__media:has(.slp-mp__thumbs) + .slp-mp__marquee { margin-top: 1rem; }
.slp-mp .slp-mp__marquee ul { display: flex; margin: 0; padding: 5px 0; list-style: none; white-space: nowrap; }
.slp-mp__marquee li { flex: none; display: flex; align-items: center; gap: .75rem; padding: 0 .375rem; line-height: 1.5; animation: slp-mp-ltr 7s linear infinite; }
.slp-mp__marquee--rtl li { animation-name: slp-mp-rtl; }
.slp-mp__marquee ul:hover li { animation-play-state: paused; }
.slp-mp__marquee li i { font-size: .75rem; opacity: .85; }
@keyframes slp-mp-ltr { to { transform: translateX(-100%); } }
@keyframes slp-mp-rtl { to { transform: translateX(100%); } }
.slp-mp__info { display: flex; flex-direction: column; flex: 1 1 auto; padding: 1rem; }
.slp-mp__meta { display: flex; align-items: center; justify-content: space-between; gap: .5rem; min-height: 1.5rem; font-size: .8125rem; }
.slp-mp__sold { display: inline-flex; align-items: center; gap: .25rem; color: #f11e1e; font-weight: 700; white-space: nowrap; }
.slp-mp__sold svg { width: 1rem; height: 1rem; }
.slp-mp__rating { display: inline-flex; align-items: center; gap: .125rem; margin-inline-start: auto; color: #d1d5db; white-space: nowrap; }
.slp-mp__rating .is-on { color: #f5a524; }
.slp-mp__rating span { margin-inline-start: .25rem; color: var(--slp-muted); font-size: .75rem; }
.slp-mp__name { margin-top: .5rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: 1rem; line-height: 1.5rem; font-weight: 700; color: var(--slp-text); }
.slp-mp__subtitle { margin: 0; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: .875rem; line-height: 1.5rem; color: var(--slp-muted); }
.slp-mp__price { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; min-height: 2rem; margin-top: .5rem; }
.slp-mp__total { font-size: 1.375rem; font-weight: 800; color: var(--slp-text); }
.slp-mp__price.is-on-sale .slp-mp__total { color: #dc2626; }
.slp-mp__before { font-size: .875rem; color: var(--slp-muted); text-decoration: line-through; }
.slp-mp__save { padding: .125rem .5rem; border-radius: .375rem; background: rgb(220 38 38 / 10%); color: #dc2626; font-size: .75rem; font-weight: 700; white-space: nowrap; }
.slp-mp__desc { margin-top: .5rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: .8125rem; line-height: 1.375rem; color: var(--slp-muted); }
.slp-mp__actions { display: flex; align-items: stretch; gap: .625rem; margin-top: auto; padding-top: .75rem; }
.slp-mp__qty { flex: 0 0 auto; display: flex; align-items: center; height: 2.75rem; border: 1px solid var(--slp-border); border-radius: .375rem; overflow: hidden; }
.slp-mp__qty button { width: 2.5rem; height: 100%; border: 0; background: transparent; font-size: 1.25rem; line-height: 1; color: var(--slp-text); cursor: pointer; }
.slp-mp__qty button:disabled { opacity: .35; cursor: default; }
.slp-mp__qty output { min-width: 2rem; text-align: center; font-weight: 700; }
.slp-mp__buy { flex: 1 1 auto; min-width: 0; min-height: 2.75rem; padding-block: .5rem; border-radius: .375rem; background: var(--slp-mp-btn-bg, var(--color-primary, #111)); color: var(--slp-mp-btn-color, var(--color-primary-reverse, #fff)); }
.slp-mp__out { margin-top: .5rem; color: #dc2626; font-weight: 700; }
.slp-mp__skel { border-radius: .375rem; background: var(--slp-soft); }
.slp-mp__empty { max-width: 40rem; margin-inline: auto; padding: 2rem; border: 1px dashed #d4d4d8; border-radius: 1rem; text-align: center; color: #71717a; }
@media (prefers-reduced-motion: reduce) { .slp-mp__marquee li { animation: none; } }
`, I = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.165 512.165" aria-hidden="true"><path d="m437.476 320.656c-.004-.05-.007-.101-.011-.15-1.541-21.368-5.481-39.513-12.39-57.037-.093-.265-.193-.528-.302-.79-.395-.951-39.225-95.684-21.044-147.746 1.641-4.697.845-9.901-2.123-13.894s-7.716-6.249-12.691-6.037c-1.333.058-28.492 1.565-57.3 26.911-25.213-52.021-29.194-107.287-29.235-107.89-.341-5.227-3.383-9.896-8.026-12.32-4.644-2.425-10.213-2.249-14.697.457-39.788 24.034-70.525 53.365-91.356 87.18-16.82 27.302-27.192 57.459-30.829 89.634-2.184 19.327-1.665 37.002-.054 51.85.746 6.879-6.125 12.051-12.529 9.432l-38.613-15.797c-2.632-1.077-5.512-1.525-8.32-1.073-5.912.952-10.518 5.194-12.095 10.682-3.504 12.189-6.128 23.455-8.023 34.441-6.596 38.261-3.897 77.447 7.802 113.325 11.762 36.068 32.059 67.129 58.697 89.824 31.481 26.822 69.604 40.477 111.176 40.477 22.939 0 46.93-4.158 71.431-12.557 38.865-13.321 69.645-39.707 89.011-76.303 16.095-30.419 23.739-66.863 21.521-102.619z" fill="#ff001e"/><path d="m296.687 260.081c-3.792-5.657-10.918-8.056-17.356-5.829-6.438 2.223-10.57 8.503-10.063 15.295 1.789 23.976-.608 94.475-33.954 103.618-28.387 7.787-43.529-5.362-45-6.726-3.681-4.013-9.084-5.533-14.39-4.261-5.342 1.285-9.38 5.573-10.805 10.879-.283 1.053-2.793 10.461-3.851 16.59-6.784 39.356 6.081 78.356 33.576 101.781 16.127 13.74 35.578 20.736 56.725 20.736 11.536 0 23.58-2.084 35.855-6.292 19.779-6.78 36.691-21.121 48.908-41.475 10.219-17.024 16.161-36.889 16.305-54.5.366-45.31-16.889-91.515-55.95-149.816z" fill="#ffeb00"/></svg>';
function U(n) {
  const t = n.toLocaleString("en-US");
  return q() ? n === 1 ? "مرة واحدة" : n === 2 ? "مرتين" : `${t} ${n <= 10 ? "مرات" : "مرة"}` : `${t} ${n === 1 ? "time" : "times"}`;
}
class d extends M {
  constructor() {
    super(...arguments), this.product = null, this.loading = !0, this.active = 0, this.quantity = 1;
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), y("slp-base", S), y("slp-product-hero", B), this.product = await z(C() || this.fieldProductId()), this.loading = !1;
  }
  fieldProductId() {
    const t = $(this.config).product, e = Array.isArray(t) ? t[0] : t, s = e && typeof e == "object" ? e.value ?? e.id : e;
    return s ? String(s) : null;
  }
  images() {
    var s;
    const t = this.product, e = ((t == null ? void 0 : t.images) || []).filter((r) => (r == null ? void 0 : r.url) && (!r.type || r.type === "image")).map((r) => ({ url: r.url, alt: r.alt }));
    return !e.length && ((s = t == null ? void 0 : t.image) != null && s.url) && e.push({ url: t.image.url, alt: t.image.alt }), e;
  }
  track() {
    return this.querySelector(".slp-mp__track");
  }
  // RTL tracks scroll to negative offsets, so positions are compared by magnitude
  goTo(t, e = !0) {
    const s = this.track();
    if (!s) return;
    const r = getComputedStyle(s).direction === "rtl" ? -1 : 1;
    s.scrollTo({ left: t * s.clientWidth * r, behavior: e ? "smooth" : "auto" }), this.active = t;
  }
  onScroll() {
    const t = this.track();
    if (!t || !t.clientWidth) return;
    const e = Math.round(Math.abs(t.scrollLeft) / t.clientWidth);
    e !== this.active && (this.active = e);
  }
  // Touch swipes scroll natively; mice drag the track
  onPointerDown(t) {
    if (t.pointerType !== "mouse") return;
    const e = this.track();
    e && (this.drag = { x: t.clientX, left: e.scrollLeft, moved: !1 }, e.classList.add("is-dragging"), e.setPointerCapture(t.pointerId));
  }
  onPointerMove(t) {
    const e = this.track();
    if (!this.drag || !e) return;
    const s = t.clientX - this.drag.x;
    Math.abs(s) > 3 && (this.drag.moved = !0), e.scrollLeft = this.drag.left - s;
  }
  onPointerUp() {
    const t = this.track();
    if (!this.drag || !t) return;
    t.classList.remove("is-dragging"), this.drag = void 0;
    const e = Math.round(Math.abs(t.scrollLeft) / t.clientWidth);
    this.goTo(Math.min(Math.max(e, 0), this.images().length - 1));
  }
  onBuy(t) {
    var e;
    k(((e = this.product) == null ? void 0 : e.url) || "").kind === "checkout" && (t.preventDefault(), L(this.product, this.quantity), N(this.quantity));
  }
  renderTitle(t) {
    const e = g(t.title), s = g(t.subtitle);
    return !e && !s ? o : i`<div class="slp-title">${e ? i`<h2>${e}</h2>` : o}${s ? i`<p>${s}</p>` : o}</div>`;
  }
  renderMeta(t) {
    var u, h;
    const e = this.product, s = t.show_sold !== !1 && (Number(t.sold_count) || Number(e.sold_quantity)) || 0, r = Number((u = e.rating) == null ? void 0 : u.stars) || 0, a = r || (t.custom_rating ? Math.min(5, Number(t.rating_value) || 0) : 0), c = r ? Number((h = e.rating) == null ? void 0 : h.count) || 0 : Number(t.rating_count) || 0;
    return !s && !a ? o : i`<div class="slp-mp__meta">
      ${s ? i`<span class="slp-mp__sold">${f(I)}<span>${m({ ar: "مباع", en: "Sold" })} ${U(s)}</span></span>` : o}
      ${a ? i`<span class="slp-mp__rating" aria-label="${a}/5">
            ${[1, 2, 3, 4, 5].map((l) => i`<i class="sicon-star2 ${l <= Math.round(a) ? "is-on" : ""}"></i>`)}
            ${c ? i`<span>(${c.toLocaleString("en-US")} ${m({ ar: "تقييم", en: "reviews" })})</span>` : o}
          </span>` : o}
    </div>`;
  }
  renderPrice() {
    const t = this.product, e = Number(t.is_on_sale ? t.sale_price : t.starting_price || t.price) || 0, s = Number(t.regular_price) || 0, r = !!t.is_on_sale && s > e, a = r ? Math.round((s - e) / s * 100) : 0;
    return i`<div class="slp-mp__price${r ? " is-on-sale" : ""}">
      <span class="slp-mp__total">${f(x(e))}</span>
      ${r ? i`<span class="slp-mp__before">${f(x(s))}</span>` : o}
      ${a ? i`<span class="slp-mp__save">${m({ ar: "وفر", en: "Save" })} ${a}%</span>` : o}
    </div>`;
  }
  renderActions(t) {
    const e = this.product;
    if (e.status === "out" || e.is_out_of_stock)
      return i`<p class="slp-mp__out">${m({ ar: "نفدت الكمية", en: "Out of stock" })}</p>`;
    const s = k(e.url || "");
    if (s.kind === "none") return o;
    const r = g(t.btn_text) || m({ ar: "اشترِ الآن", en: "Buy now" }), a = Number(e.max_quantity) || 99;
    return i`<div class="slp-mp__actions">
      ${t.show_quantity !== !1 && s.kind === "checkout" ? i`<div class="slp-mp__qty" role="group" aria-label=${m({ ar: "الكمية", en: "Quantity" })}>
            <button type="button" aria-label="+" ?disabled=${this.quantity >= a} @click=${() => this.quantity = Math.min(a, this.quantity + 1)}>+</button>
            <output>${this.quantity}</output>
            <button type="button" aria-label="-" ?disabled=${this.quantity <= 1} @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>−</button>
          </div>` : o}
      <a class="slp-btn slp-mp__buy" href=${s.kind === "link" ? s.url : "#"} @click=${this.onBuy}>${r}</a>
    </div>`;
  }
  render() {
    const t = $(this.config), s = [
      `--slp-mp-ratio:${{ portrait: "3 / 4", landscape: "4 / 3" }[String(w(t.media_aspect))] || "1 / 1"}`,
      `--slp-mp-fit:${w(t.media_fit) === "contain" ? "contain" : "cover"}`,
      t.bg_color ? `--slp-section-bg:${t.bg_color}` : "",
      t.border_color ? `--slp-mp-border:${t.border_color}` : "",
      t.btn_bg ? `--slp-mp-btn-bg:${t.btn_bg}` : "",
      t.btn_color ? `--slp-mp-btn-color:${t.btn_color}` : "",
      `--slp-mp-mq-bg:${t.marquee_bg || "#111111"}`,
      `--slp-mp-mq-color:${t.marquee_color || "#ffffff"}`
    ].filter(Boolean).join(";");
    if (this.loading)
      return i`<section class="slp-block slp-section slp-mp ${v(t)}" style=${s}><div class="slp-container">
        ${this.renderTitle(t)}
        <div class="slp-mp__card"><div class="slp-mp__main slp-mp__skel"></div>
          <div class="slp-mp__info"><div class="slp-mp__skel" style="height:1.125rem;width:70%;margin-top:.5rem"></div>
          <div class="slp-mp__skel" style="height:1.25rem;width:45%;margin-top:.75rem"></div>
          <div class="slp-mp__skel" style="height:2.75rem;margin-top:1rem"></div></div></div>
      </div></section>`;
    if (!this.product) {
      const l = !T() || j() === "promotion";
      return i`<section class="slp-block slp-section slp-mp ${v(t)}"><div class="slp-container"><p class="slp-mp__empty">
        ${l ? m({ ar: "اختر المنتج من إعدادات هذا القسم لعرضه هنا", en: "Choose a product in this section's settings to show it here" }) : m({ ar: "اختر منتج الصفحة من إعدادات صفحة الهبوط لعرضه هنا", en: "Choose the page product in the landing page settings to show it here" })}
      </p></div></section>`;
    }
    const r = this.product, a = this.images(), c = g(t.marquee_text), u = t.show_subtitle !== !1 ? r.subtitle : "", h = t.show_description ? String(r.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
    return i`<section class="slp-block slp-section slp-mp ${v(t)}" style=${s}>
      <div class="slp-container">
        ${this.renderTitle(t)}
        <article class="slp-mp__card">
          <div class="slp-mp__media">
            <div class="slp-mp__main">
              <div class="slp-mp__track" @scroll=${this.onScroll} @pointerdown=${this.onPointerDown}
                @pointermove=${this.onPointerMove} @pointerup=${this.onPointerUp} @pointercancel=${this.onPointerUp}>
                ${a.map((l, p) => i`<div class="slp-mp__slide"><img src=${l.url} alt=${l.alt || r.name}
                  loading=${p ? "lazy" : "eager"} fetchpriority=${p ? "auto" : "high"} draggable="false" /></div>`)}
              </div>
              ${a.length > 1 && t.show_thumbs === !1 ? i`<div class="slp-mp__dots">${a.map((l, p) => i`<span class=${p === this.active ? "is-active" : ""}></span>`)}</div>` : o}
            </div>
            ${t.show_thumbs !== !1 && a.length > 1 ? i`<div class="slp-mp__thumbs">${a.map((l, p) => i`<button type="button"
                  class="slp-mp__thumb ${p === this.active ? "is-active" : ""}" aria-label=${l.alt || r.name}
                  @click=${() => this.goTo(p)}><img src=${l.url} alt="" loading="lazy" /></button>`)}</div>` : o}
          </div>
          ${c ? i`<div class="slp-mp__marquee${q() ? " slp-mp__marquee--rtl" : ""}"><ul>${Array.from({ length: 12 }, (l, p) => i`<li aria-hidden=${p ? "true" : "false"}>
                <span>${c}</span><i class=${t.marquee_icon || "sicon-star"}></i></li>`)}</ul></div>` : o}
          <div class="slp-mp__info">
            ${this.renderMeta(t)}
            <h3 class="slp-mp__name">${r.name}</h3>
            ${u ? i`<p class="slp-mp__subtitle">${u}</p>` : o}
            ${this.renderPrice()}
            ${h ? i`<p class="slp-mp__desc">${h}</p>` : o}
            ${this.renderActions(t)}
          </div>
        </article>
      </div>
    </section>`;
  }
}
_([
  P({ type: Object })
], d.prototype, "config");
_([
  b()
], d.prototype, "product");
_([
  b()
], d.prototype, "loading");
_([
  b()
], d.prototype, "active");
_([
  b()
], d.prototype, "quantity");
typeof d < "u" && d.registerSallaComponent("salla-product-hero");
export {
  d as default
};
