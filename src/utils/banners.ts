import { html, nothing } from "lit";
import { getLocale } from "./config";

export const bannersCss = `
.slp-bn__row { display: flex; gap: .75rem; }
@container (min-width: 768px) { .slp-bn__row { gap: 1rem; } }
@container (max-width: 639px) { .slp-bn--stack .slp-bn__row { flex-direction: column; } }
.slp-bn__item { flex: 1 1 0; min-width: 0; overflow: hidden; }
.slp-bn--rounded .slp-bn__item { border-radius: 1rem; }
.slp-bn__item img { width: 100%; height: auto; transition: transform .6s ease; }
.slp-bn__item:hover img { transform: scale(1.03); }
.slp-bn--equal .slp-bn__item img { aspect-ratio: 4 / 3; object-fit: cover; }
.slp-bn--full .slp-container { max-width: none; padding-inline: 0; }
@media (prefers-reduced-motion: reduce) { .slp-bn__item img { transition: none; } }
`;

/** Display-only banners: a landing page keeps shoppers on the page, so banners never link away. */
export function renderBanners(cfg: Record<string, any>, keys: string[]) {
  const en = getLocale() === "en";
  const images = keys.map((key) => (en && cfg[`${key}_en`]) || cfg[key]).filter(Boolean);
  if (!images.length) return nothing;
  const classes = [
    "slp-block slp-section slp-bn",
    cfg.rounded !== false ? "slp-bn--rounded" : "",
    cfg.stack_mobile !== false ? "slp-bn--stack" : "",
    cfg.full_width ? "slp-bn--full" : "",
    cfg.equal_height ? "slp-bn--equal" : "",
  ].filter(Boolean).join(" ");
  return html`<section class=${classes}>
    <div class="slp-container"><div class="slp-bn__row">
      ${images.map((src) => html`<div class="slp-bn__item"><img src=${src} alt="" loading="lazy" width="1280" height="322" /></div>`)}
    </div></div>
  </section>`;
}
