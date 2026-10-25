import { LitElement as g, nothing as _, html as r } from "lit";
import { property as f, state as m } from "lit/decorators.js";
import { i as p, c as k, a as h, s as u, u as y } from "./styles-CSVj0pVk.js";
import { g as b } from "./landing-BYqcrX_B.js";
var x = Object.defineProperty, c = (i, s, t, l) => {
  for (var o = void 0, e = i.length - 1, a; e >= 0; e--)
    (a = i[e]) && (o = a(s, t, o) || o);
  return o && x(s, t, o), o;
};
const v = `
.slp-hd { background: var(--slp-section-bg, var(--slp-surface)); }
.slp-hd--shadow { box-shadow: 0 1px 0 var(--slp-border), 0 8px 24px -18px rgb(0 0 0 / 35%); }
.slp-hd__inner { display: flex; align-items: center; justify-content: center; min-height: calc(var(--slp-hd-logo, 56px) + 1.5rem); padding-block: .75rem; }
.slp-hd--start .slp-hd__inner { justify-content: flex-start; }
.slp-hd__logo { display: block; height: var(--slp-hd-logo, 56px); width: auto; max-width: 70%; object-fit: contain; }
.slp-hd__name { font-size: 1.25rem; font-weight: 800; color: var(--slp-text); text-decoration: none; }
.slp-hd__link { display: inline-flex; }
.slp-hd__logo--dark { display: none; }
.slp-dark .slp-hd__logo--light.has-dark { display: none; }
.slp-dark .slp-hd__logo--dark { display: block; }
.slp-dark .slp-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }
@media (prefers-color-scheme: dark) {
  .slp-auto .slp-hd__logo--light.has-dark { display: none; }
  .slp-auto .slp-hd__logo--dark { display: block; }
  .slp-auto .slp-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }
}
`;
class n extends g {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "", url: "" };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var t, l, o, e;
    super.connectedCallback(), this.classList.add("slp-host"), p("slp-base", k), p("slp-page-header", v);
    const s = b();
    await ((t = s == null ? void 0 : s.onReady) == null ? void 0 : t.call(s)), this.store = {
      logo: ((l = s == null ? void 0 : s.config) == null ? void 0 : l.get("store.logo")) || "",
      name: ((o = s == null ? void 0 : s.config) == null ? void 0 : o.get("store.name")) || "",
      url: ((e = s == null ? void 0 : s.config) == null ? void 0 : e.get("store.url")) || ""
    };
  }
  updated() {
    const s = !!h(this.config).sticky;
    this.style.position = s ? "sticky" : "", this.style.top = s ? "0" : "", this.style.zIndex = s ? "30" : "";
  }
  render() {
    const s = h(this.config), t = s.logo || this.store.logo, l = s.logo_dark || "", o = Math.min(Math.max(Number(s.logo_height) || 56, 24), 140), e = [
      "slp-block slp-hd",
      u(s),
      y(s.align) === "start" ? "slp-hd--start" : "",
      s.show_shadow !== !1 ? "slp-hd--shadow" : ""
    ].filter(Boolean).join(" "), a = `--slp-hd-logo:${o}px;${s.bg_color ? `--slp-section-bg:${s.bg_color}` : ""}`, d = t ? r`<img class="slp-hd__logo slp-hd__logo--light${l ? " has-dark" : ""}" src=${t} alt=${this.store.name} />
          ${l ? r`<img class="slp-hd__logo slp-hd__logo--dark" src=${l} alt=${this.store.name} />` : _}` : r`<span class="slp-hd__name">${this.store.name}</span>`;
    return r`<header class=${e} style=${a}>
      <div class="slp-container slp-hd__inner">
        ${s.link_to_store && this.store.url ? r`<a class="slp-hd__link" href=${this.store.url}>${d}</a>` : d}
      </div>
    </header>`;
  }
}
c([
  f({ type: Object })
], n.prototype, "config");
c([
  m()
], n.prototype, "store");
typeof n < "u" && n.registerSallaComponent("salla-page-header");
export {
  n as default
};
