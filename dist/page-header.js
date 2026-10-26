import { LitElement as y, html as l, nothing as u } from "lit";
import { property as x, state as g } from "lit/decorators.js";
import { a as n, i as f, c as v, u as p, t as w, s as $ } from "./styles-BJy9RHCh.js";
import { i as E, P as M, a as z, g as C } from "./landing-BqmPvx7F.js";
var L = Object.defineProperty, c = (i, s, e, o) => {
  for (var t = void 0, r = i.length - 1, d; r >= 0; r--)
    (d = i[r]) && (t = d(s, e, t) || t);
  return t && L(s, e, t), t;
};
const _ = "slp-mode", b = (i) => `
${i} .slp-hd__logo--light.has-dark { display: none; }
${i} .slp-hd__logo--dark { display: block; }
${i} .slp-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }
${i} .slp-hd__toggle { color: #fff; }`, O = `
.slp-hd { background: var(--slp-section-bg, var(--slp-header)); transition: background-color .3s ease, box-shadow .3s ease; }
.slp-hd--shadow { box-shadow: 0 1px 0 var(--slp-border), 0 8px 24px -18px rgb(0 0 0 / 35%); }
.slp-hd--trans:not(.is-solid) { background: transparent; box-shadow: none; }
/* Pinned while scrolling: Selia's frosted header */
.slp-hd.is-solid { background: color-mix(in srgb, var(--slp-section-bg, var(--slp-header)) 72%, transparent); box-shadow: 0 0 5px rgb(0 0 0 / 10%);
  backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); }
/* Previews clip the section list with overflow: hidden, which blocks sticky; clip does not */
.components-grid:has(.slp-hd--sticky) { overflow: clip; }
.slp-hd__inner { position: relative; display: flex; align-items: center; justify-content: center; max-width: 1440px; margin-inline: auto; padding: .75rem 10px; min-height: calc(var(--slp-hd-logo, 60px) + 1.5rem); }
.slp-hd--start .slp-hd__inner { justify-content: flex-start; }
.slp-hd__logo { display: block; height: var(--slp-hd-logo, 60px); width: auto; max-width: 60vw; object-fit: contain; transition: filter .3s ease; }
.slp-hd .slp-hd__logo--dark { display: none; }
.slp-hd__name { font-size: 1.25rem; font-weight: 800; color: var(--slp-text); text-decoration: none; }
.slp-hd--trans:not(.is-solid) .slp-hd__name { color: #fff; }
.slp-hd__link { display: inline-flex; }
.slp-hd__toggle { position: absolute; inset-inline-end: 10px; top: 50%; width: 2.5rem; height: 2.5rem; margin-top: -1.25rem; display: grid; place-items: center; padding: 0; border: 0; background: none; color: var(--slp-text); cursor: pointer; }
.slp-hd__toggle:focus-visible { outline: 2px solid var(--color-primary, currentColor); outline-offset: 2px; border-radius: 999px; }
.slp-hd__toggle svg { width: 24px; height: 24px; }
.slp-hd__toggle :is(.moon, .sun, .sun-beams) { transform-origin: center; }
.slp-hd__toggle .sun-beams { stroke-width: 2px; stroke-linecap: round; }
.slp-hd__toggle.is-dark .sun { transform: scale(1.75); }
.slp-hd__toggle.is-dark .sun-beams { opacity: 0; }
.slp-hd__toggle.is-dark .moon > circle { transform: translateX(-7px); }
@supports (cx: 1) { .slp-hd__toggle.is-dark .moon > circle { cx: 17; transform: translateX(0); } }
@media (prefers-reduced-motion: no-preference) {
  .slp-hd__toggle .sun { transition: transform .5s cubic-bezier(.5,1.25,.75,1.25); }
  .slp-hd__toggle .sun-beams { transition: transform .5s cubic-bezier(.5,1.5,.75,1.25), opacity .5s cubic-bezier(.25,0,.3,1); }
  .slp-hd__toggle .moon > circle { transition: transform .25s cubic-bezier(0,0,0,1); }
  @supports (cx: 1) { .slp-hd__toggle .moon > circle { transition: cx .25s cubic-bezier(0,0,0,1); } }
  .slp-hd__toggle.is-dark .sun { transition-timing-function: cubic-bezier(.25,0,.3,1); transition-duration: .25s; }
  .slp-hd__toggle.is-dark .sun-beams { transition-duration: .15s; transform: rotateZ(-25deg); }
  .slp-hd__toggle.is-dark .moon > circle { transition-duration: .5s; transition-delay: .25s; }
}
${[".slp-hd.slp-dark", "html.slp-mode-dark .slp-hd.slp-auto", ".slp-hd.slp-hd--trans:not(.is-solid)"].map(b).join("")}
@media (prefers-color-scheme: dark) { ${b("html:not(.slp-mode-light) .slp-hd.slp-auto")} }
`;
let R = 0;
function I() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
class a extends y {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "", url: "" }, this.mode = "light", this.solid = !1, this.maskId = `slp-moon-${++R}`, this.modeKey = "", this.onScroll = () => {
      const e = !!n(this.config).sticky && this.getBoundingClientRect().top <= 1 && I() > 1;
      e !== this.solid && (this.solid = e);
    };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var e, o, t, r;
    super.connectedCallback(), this.classList.add("slp-host"), f("slp-base", v), f("slp-page-header", O), document.addEventListener("scroll", this.onScroll, { capture: !0, passive: !0 }), this.resizer = new ResizeObserver(() => this.frame()), this.resizer.observe(this), this.requestUpdate();
    const s = C();
    await ((e = s == null ? void 0 : s.onReady) == null ? void 0 : e.call(s)), this.store = {
      logo: ((o = s == null ? void 0 : s.config) == null ? void 0 : o.get("store.logo")) || "",
      name: ((t = s == null ? void 0 : s.config) == null ? void 0 : t.get("store.name")) || "",
      url: ((r = s == null ? void 0 : s.config) == null ? void 0 : r.get("store.url")) || ""
    };
  }
  disconnectedCallback() {
    var s;
    super.disconnectedCallback(), document.removeEventListener("scroll", this.onScroll, { capture: !0 }), (s = this.resizer) == null || s.disconnect(), this.unframe(), this.modeKey = "", document.documentElement.classList.remove("slp-mode-dark", "slp-mode-light");
  }
  willUpdate() {
    const s = n(this.config), e = `${p(s.default_mode) || "light"}|${s.show_mode_toggle !== !1}`;
    e !== this.modeKey && (this.modeKey = e, this.applyMode(this.resolveMode()));
  }
  updated() {
    this.frame(), this.onScroll();
  }
  baseMode() {
    return String(p(n(this.config).default_mode) || "light");
  }
  /** A stored choice only counts while the merchant's default is the one it was made against. */
  resolveMode() {
    const s = this.baseMode();
    if (n(this.config).show_mode_toggle !== !1)
      try {
        const e = JSON.parse(localStorage.getItem(_) || "null");
        if ((e == null ? void 0 : e.base) === s && (e.mode === "light" || e.mode === "dark")) return e.mode;
      } catch {
      }
    return s === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : s === "dark" ? "dark" : "light";
  }
  applyMode(s) {
    this.mode = s, document.documentElement.classList.toggle("slp-mode-dark", s === "dark"), document.documentElement.classList.toggle("slp-mode-light", s === "light");
  }
  toggleMode() {
    const s = this.mode === "dark" ? "light" : "dark";
    this.applyMode(s);
    try {
      localStorage.setItem(_, JSON.stringify({ mode: s, base: this.baseMode() }));
    } catch {
    }
  }
  /** Sticky and the transparent overlap go on the outermost box of the section, the editor's card included. */
  frame() {
    const s = n(this.config), e = this.closest(".component-card") || this;
    this.framed && this.framed !== e && this.unframe();
    const o = !!s.sticky, t = !!s.transparent;
    e.style.position = o ? "sticky" : t ? "relative" : "", e.style.top = o ? "0" : "", e.style.zIndex = o || t ? "30" : "", e.style.marginBottom = t ? `-${this.offsetHeight}px` : "", this.framed = e;
  }
  unframe() {
    this.framed && (this.framed.style.position = this.framed.style.top = this.framed.style.zIndex = this.framed.style.marginBottom = "", this.framed = void 0);
  }
  toggle() {
    const s = this.mode === "dark";
    return l`<button type="button" class="slp-hd__toggle${s ? " is-dark" : ""}" @click=${() => this.toggleMode()}
      aria-pressed=${s ? "true" : "false"} aria-label=${w({ ar: "الوضع الداكن", en: "Dark mode" })}>
      <svg class="sun-and-moon" aria-hidden="true" viewBox="0 0 24 24">
        <mask class="moon" id=${this.maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle class="sun" cx="12" cy="12" r="6" mask="url(#${this.maskId})" fill="currentColor" />
        <g class="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>`;
  }
  render() {
    const s = n(this.config), e = !s.logo && !E(), o = s.logo || (e ? M : this.store.logo), t = s.logo_dark || (e ? z : ""), r = Math.min(Math.max(Number(s.logo_height) || 60, 24), 140), d = [
      "slp-block slp-hd",
      $(s),
      p(s.align) === "start" ? "slp-hd--start" : "",
      s.show_shadow !== !1 ? "slp-hd--shadow" : "",
      s.transparent ? "slp-hd--trans" : "",
      s.sticky ? "slp-hd--sticky" : "",
      this.solid ? "is-solid" : ""
    ].filter(Boolean).join(" "), k = `--slp-hd-logo:${r}px;${s.bg_color ? `--slp-section-bg:${s.bg_color}` : ""}`, h = this.store.name || "", m = o ? l`<img class="slp-hd__logo slp-hd__logo--light${t ? " has-dark" : ""}" src=${o} alt=${h} />
          ${t ? l`<img class="slp-hd__logo slp-hd__logo--dark" src=${t} alt=${h} />` : u}` : l`<span class="slp-hd__name">${h}</span>`;
    return l`<header class=${d} style=${k}>
      <div class="slp-hd__inner">
        ${s.link_to_store && this.store.url ? l`<a class="slp-hd__link" href=${this.store.url}>${m}</a>` : m}
        ${s.show_mode_toggle !== !1 ? this.toggle() : u}
      </div>
    </header>`;
  }
}
c([
  x({ type: Object })
], a.prototype, "config");
c([
  g()
], a.prototype, "store");
c([
  g()
], a.prototype, "mode");
c([
  g()
], a.prototype, "solid");
typeof a < "u" && a.registerSallaComponent("salla-page-header");
export {
  a as default
};
