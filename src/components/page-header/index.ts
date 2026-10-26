import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getConfig, t, unwrapValue } from "../../utils/config";
import { getSalla, isLandingPage, PREVIEW_STORE_LOGO, PREVIEW_STORE_LOGO_DARK } from "../../utils/landing";
import { baseCss, injectStyles, schemeClass } from "../../utils/styles";

type Mode = "light" | "dark";
const MODE_KEY = "slp-mode";

// Every state where the header sits on a dark background: dark scheme, dark page mode, or transparent over the hero
const darkRules = (scope: string) => `
${scope} .slp-hd__logo--light.has-dark { display: none; }
${scope} .slp-hd__logo--dark { display: block; }
${scope} .slp-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }
${scope} .slp-hd__toggle { color: #fff; }`;

const css = `
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
${[".slp-hd.slp-dark", "html.slp-mode-dark .slp-hd.slp-auto", ".slp-hd.slp-hd--trans:not(.is-solid)"].map(darkRules).join("")}
@media (prefers-color-scheme: dark) { ${darkRules("html:not(.slp-mode-light) .slp-hd.slp-auto")} }
`;

let maskSeq = 0;

function scrollTop(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export default class PageHeader extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private store: { logo: string; name: string; url: string } = { logo: "", name: "", url: "" };
  @state() private mode: Mode = "light";
  @state() private solid = false;

  private maskId = `slp-moon-${++maskSeq}`;
  private modeKey = "";
  private framed?: HTMLElement;
  private resizer?: ResizeObserver;

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-page-header", css);
    document.addEventListener("scroll", this.onScroll, { capture: true, passive: true });
    this.resizer = new ResizeObserver(() => this.frame());
    this.resizer.observe(this);
    this.requestUpdate();
    const Salla = getSalla() as any;
    await Salla?.onReady?.();
    this.store = {
      logo: Salla?.config?.get("store.logo") || "",
      name: Salla?.config?.get("store.name") || "",
      url: Salla?.config?.get("store.url") || "",
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("scroll", this.onScroll, { capture: true });
    this.resizer?.disconnect();
    this.unframe();
    this.modeKey = "";
    document.documentElement.classList.remove("slp-mode-dark", "slp-mode-light");
  }

  protected willUpdate() {
    const cfg = getConfig(this.config);
    const key = `${unwrapValue(cfg.default_mode) || "light"}|${cfg.show_mode_toggle !== false}`;
    if (key !== this.modeKey) {
      this.modeKey = key;
      this.applyMode(this.resolveMode());
    }
  }

  protected updated() {
    this.frame();
    this.onScroll();
  }

  private baseMode(): string {
    return String(unwrapValue(getConfig(this.config).default_mode) || "light");
  }

  /** A stored choice only counts while the merchant's default is the one it was made against. */
  private resolveMode(): Mode {
    const base = this.baseMode();
    if (getConfig(this.config).show_mode_toggle !== false) {
      try {
        const saved = JSON.parse(localStorage.getItem(MODE_KEY) || "null");
        if (saved?.base === base && (saved.mode === "light" || saved.mode === "dark")) return saved.mode;
      } catch {
        // storage can be blocked; fall back to the default
      }
    }
    if (base === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return base === "dark" ? "dark" : "light";
  }

  private applyMode(mode: Mode) {
    this.mode = mode;
    document.documentElement.classList.toggle("slp-mode-dark", mode === "dark");
    document.documentElement.classList.toggle("slp-mode-light", mode === "light");
  }

  private toggleMode() {
    const next: Mode = this.mode === "dark" ? "light" : "dark";
    this.applyMode(next);
    try {
      localStorage.setItem(MODE_KEY, JSON.stringify({ mode: next, base: this.baseMode() }));
    } catch {
      // the switch still works for this visit
    }
  }

  /** Sticky and the transparent overlap go on the outermost box of the section, the editor's card included. */
  private frame() {
    const cfg = getConfig(this.config);
    const outer = (this.closest(".component-card") as HTMLElement | null) || this;
    if (this.framed && this.framed !== outer) this.unframe();
    const sticky = Boolean(cfg.sticky);
    const trans = Boolean(cfg.transparent);
    outer.style.position = sticky ? "sticky" : trans ? "relative" : "";
    outer.style.top = sticky ? "0" : "";
    outer.style.zIndex = sticky || trans ? "30" : "";
    outer.style.marginBottom = trans ? `-${this.offsetHeight}px` : "";
    this.framed = outer;
  }

  private unframe() {
    if (!this.framed) return;
    this.framed.style.position = this.framed.style.top = this.framed.style.zIndex = this.framed.style.marginBottom = "";
    this.framed = undefined;
  }

  private onScroll = () => {
    const cfg = getConfig(this.config);
    const solid = Boolean(cfg.sticky) && this.getBoundingClientRect().top <= 1 && scrollTop() > 1;
    if (solid !== this.solid) this.solid = solid;
  };

  private toggle() {
    const dark = this.mode === "dark";
    return html`<button type="button" class="slp-hd__toggle${dark ? " is-dark" : ""}" @click=${() => this.toggleMode()}
      aria-pressed=${dark ? "true" : "false"} aria-label=${t({ ar: "الوضع الداكن", en: "Dark mode" })}>
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
    const cfg = getConfig(this.config);
    // Previews run on a demo store whose logo is Salla's, so they show the Selia preview store's logo instead
    const demoLogo = !cfg.logo && !isLandingPage();
    const logo = cfg.logo || (demoLogo ? PREVIEW_STORE_LOGO : this.store.logo);
    const darkLogo = cfg.logo_dark || (demoLogo ? PREVIEW_STORE_LOGO_DARK : "");
    const height = Math.min(Math.max(Number(cfg.logo_height) || 60, 24), 140);
    const classes = [
      "slp-block slp-hd",
      schemeClass(cfg),
      unwrapValue(cfg.align) === "start" ? "slp-hd--start" : "",
      cfg.show_shadow !== false ? "slp-hd--shadow" : "",
      cfg.transparent ? "slp-hd--trans" : "",
      cfg.sticky ? "slp-hd--sticky" : "",
      this.solid ? "is-solid" : "",
    ].filter(Boolean).join(" ");
    const style = `--slp-hd-logo:${height}px;${cfg.bg_color ? `--slp-section-bg:${cfg.bg_color}` : ""}`;
    const name = this.store.name || "";
    const mark = logo
      ? html`<img class="slp-hd__logo slp-hd__logo--light${darkLogo ? " has-dark" : ""}" src=${logo} alt=${name} />
          ${darkLogo ? html`<img class="slp-hd__logo slp-hd__logo--dark" src=${darkLogo} alt=${name} />` : nothing}`
      : html`<span class="slp-hd__name">${name}</span>`;
    return html`<header class=${classes} style=${style}>
      <div class="slp-hd__inner">
        ${cfg.link_to_store && this.store.url ? html`<a class="slp-hd__link" href=${this.store.url}>${mark}</a>` : mark}
        ${cfg.show_mode_toggle !== false ? this.toggle() : nothing}
      </div>
    </header>`;
  }
}
