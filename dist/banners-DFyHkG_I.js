import { nothing as a, html as i } from "lit";
import { d as r, s as p } from "./styles-Czqp750h.js";
const b = `
.slp-bn__row { display: flex; gap: .75rem; }
@container (min-width: 768px) { .slp-bn__row { gap: 1rem; } }
@container (max-width: 639px) { .slp-bn--stack .slp-bn__row { flex-direction: column; } .slp-bn--stack .slp-bn__item { flex: none; } }
.slp-bn__item { flex: 1 1 0; min-width: 0; overflow: hidden; }
.slp-bn--rounded .slp-bn__item { border-radius: 1rem; }
.slp-bn__item img { width: 100%; height: auto; transition: transform .6s ease; }
.slp-bn__item:hover img { transform: scale(1.03); }
.slp-bn--equal .slp-bn__item img { aspect-ratio: 4 / 3; object-fit: cover; }
.slp-bn--full .slp-container { max-width: none; padding-inline: 0; }
@media (prefers-reduced-motion: reduce) { .slp-bn__item img { transition: none; } }
`;
function _(n, l) {
  const t = r() === "en", s = l.map((e) => t && n[`${e}_en`] || n[e]).filter(Boolean);
  if (!s.length) return a;
  const o = [
    "slp-block slp-section slp-bn",
    p(n),
    n.rounded !== !1 ? "slp-bn--rounded" : "",
    n.stack_mobile !== !1 ? "slp-bn--stack" : "",
    n.full_width ? "slp-bn--full" : "",
    n.equal_height ? "slp-bn--equal" : ""
  ].filter(Boolean).join(" ");
  return i`<section class=${o}>
    <div class="slp-container"><div class="slp-bn__row">
      ${s.map((e) => i`<div class="slp-bn__item"><img src=${e} alt="" loading="lazy" width="1280" height="322" /></div>`)}
    </div></div>
  </section>`;
}
export {
  b,
  _ as r
};
