/** Light DOM components share one <style> per component type in the document head. */
export function injectStyles(id: string, css: string): void {
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

import { unwrapValue } from "./config";
import { titleCss } from "./title";

/** Section color scheme: follows the page mode by default, or stays light or dark. */
export function schemeClass(cfg: Record<string, any>): string {
  const scheme = String(unwrapValue(cfg.color_scheme) || "auto");
  return scheme === "dark" ? "slp-dark" : scheme === "light" ? "" : "slp-auto";
}

// Selia's dark mode colors (store_bg_dark, store_bg_secondary_dark, store_text_color_secondary_dark)
const DARK_TOKENS = `--slp-surface: #1d1f1f; --slp-surface-2: #0e0f0f; --slp-card: #262828; --slp-soft: #2f3131; --slp-header: #0e0f0f;
  --slp-text: #fff; --slp-muted: #ccc; --slp-border: rgb(255 255 255 / 10%);`;

/** Shared section frame: the host element is the size container, and blocks never rely on the page's CSS reset. */
export const baseCss = `
.slp-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
.component-card:has(> .slp-host:not(:empty)) { min-height: 0; }
.slp-block { --slp-surface: #fff; --slp-surface-2: #f8f8f8; --slp-card: #fff; --slp-soft: #f4f4f5; --slp-header: #fff;
  --slp-text: #111; --slp-muted: #6b7280; --slp-border: #e5e7eb;
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit); color: var(--slp-text); }
.slp-block.slp-dark, html.slp-mode-dark .slp-block.slp-auto { ${DARK_TOKENS} }
@media (prefers-color-scheme: dark) { html:not(.slp-mode-light) .slp-block.slp-auto { ${DARK_TOKENS} } }
.slp-block *, .slp-block *::before, .slp-block *::after { box-sizing: border-box; }
.slp-block img, .slp-block video { display: block; max-width: 100%; }
.slp-block h2, .slp-block h3, .slp-block p, .slp-block ul { margin: 0; padding: 0; }
.slp-block ul { list-style: none; }
.slp-container { width: 100%; max-width: 1280px; margin-inline: auto; padding-inline: 1rem; }
.slp-section { padding-block: 2.5rem; background: var(--slp-section-bg, var(--slp-surface)); transition: background-color .3s ease; }
@container (min-width: 768px) { .slp-section { padding-block: 3.5rem; } }
.slp-title { text-align: center; margin-bottom: 1.75rem; }
.slp-title h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 700; color: var(--slp-title-color, var(--slp-text)); }
.slp-title p { margin-top: .5rem; font-size: 1rem; line-height: 1.7; color: var(--slp-subtitle-color, var(--slp-muted)); }
@container (min-width: 768px) { .slp-title h2 { font-size: 2.25rem; } }
${titleCss}
.slp-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 3rem; padding: .75rem 1.75rem; border: 1px solid transparent; border-radius: var(--slp-radius, .5rem); font: inherit; font-weight: 700; font-size: 1rem; line-height: 1.2; text-decoration: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease, background-color .2s ease; }
.slp-btn:hover { transform: translateY(-1px); opacity: .92; }
.slp-btn:focus-visible { outline: 2px solid var(--color-primary, #111); outline-offset: 3px; }
.slp-btn[disabled] { opacity: .5; cursor: not-allowed; transform: none; }
@media (prefers-reduced-motion: reduce) { .slp-btn { transition: none; } .slp-btn:hover { transform: none; } }
`;
