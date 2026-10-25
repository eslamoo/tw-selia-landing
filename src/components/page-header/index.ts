import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getConfig, unwrapValue } from "../../utils/config";
import { getSalla } from "../../utils/landing";
import { baseCss, injectStyles, schemeClass } from "../../utils/styles";

const css = `
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

export default class PageHeader extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private store: { logo: string; name: string; url: string } = { logo: "", name: "", url: "" };

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-page-header", css);
    const Salla = getSalla() as any;
    await Salla?.onReady?.();
    this.store = {
      logo: Salla?.config?.get("store.logo") || "",
      name: Salla?.config?.get("store.name") || "",
      url: Salla?.config?.get("store.url") || "",
    };
  }

  protected updated() {
    // Sticky has to sit on the host: the header alone is only as tall as itself
    const sticky = Boolean(getConfig(this.config).sticky);
    this.style.position = sticky ? "sticky" : "";
    this.style.top = sticky ? "0" : "";
    this.style.zIndex = sticky ? "30" : "";
  }

  render() {
    const cfg = getConfig(this.config);
    const logo = cfg.logo || this.store.logo;
    const darkLogo = cfg.logo_dark || "";
    const height = Math.min(Math.max(Number(cfg.logo_height) || 56, 24), 140);
    const classes = [
      "slp-block slp-hd",
      schemeClass(cfg),
      unwrapValue(cfg.align) === "start" ? "slp-hd--start" : "",
      cfg.show_shadow !== false ? "slp-hd--shadow" : "",
    ].filter(Boolean).join(" ");
    const style = `--slp-hd-logo:${height}px;${cfg.bg_color ? `--slp-section-bg:${cfg.bg_color}` : ""}`;
    const mark = logo
      ? html`<img class="slp-hd__logo slp-hd__logo--light${darkLogo ? " has-dark" : ""}" src=${logo} alt=${this.store.name} />
          ${darkLogo ? html`<img class="slp-hd__logo slp-hd__logo--dark" src=${darkLogo} alt=${this.store.name} />` : nothing}`
      : html`<span class="slp-hd__name">${this.store.name}</span>`;
    return html`<header class=${classes} style=${style}>
      <div class="slp-container slp-hd__inner">
        ${cfg.link_to_store && this.store.url ? html`<a class="slp-hd__link" href=${this.store.url}>${mark}</a>` : mark}
      </div>
    </header>`;
  }
}
