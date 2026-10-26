import { nothing as s, html as n } from "lit";
function g(t) {
  return t ? t.component && typeof t.component == "object" ? t.component : t : {};
}
function a() {
  var t, e, r;
  return ((r = (e = (t = window.Salla) == null ? void 0 : t.lang) == null ? void 0 : e.getLocale) == null ? void 0 : r.call(e)) || document.documentElement.lang || "ar";
}
function h() {
  return (document.documentElement.dir || (a() === "ar" ? "rtl" : "ltr")) === "rtl";
}
function l(t) {
  if (t == null || t === "") return "";
  if (typeof t == "string") return t;
  if (typeof t == "object") {
    const e = t;
    return e[a()] || e.ar || e.en || "";
  }
  return String(t);
}
function b(t) {
  return a() === "ar" ? t.ar : t.en;
}
function c(t) {
  var e;
  return Array.isArray(t) ? ((e = t[0]) == null ? void 0 : e.value) ?? t[0] ?? "" : t && typeof t == "object" && "value" in t ? t.value : t ?? "";
}
function u(t, e) {
  return Array.isArray(t) ? t.map((r) => {
    if (!r || typeof r != "object") return {};
    const i = {};
    for (const [o, d] of Object.entries(r))
      i[o.startsWith(`${e}.`) ? o.slice(e.length + 1) : o] = d;
    return i;
  }) : [];
}
function x(t) {
  const e = l(t.title), r = l(t.subtitle);
  if (!e && !r) return s;
  const i = String(c(t.title_style) || "diamond");
  return n`<div class="slp-title slp-ts--${i}">
    ${e ? n`<h2>${e}</h2>` : s}${r ? n`<p>${r}</p>` : s}<span class="slp-title__deco"></span>
  </div>`;
}
const m = `
.slp-title { overflow-x: clip; }
.slp-title__deco { display: block; margin: 15px auto 0; }
.slp-ts--basic .slp-title__deco { width: 5rem; height: 2px; margin-top: .75rem; border-radius: 2px; background: var(--color-primary, #111); }
.slp-ts--classic .slp-title__deco { border: 2px solid var(--color-primary); width: 14px; height: 14px; border-radius: 100%; position: relative; }
.slp-ts--classic .slp-title__deco::before, .slp-ts--classic .slp-title__deco::after { content: " "; width: 110px; height: 2px; background: var(--color-primary); position: absolute; top: 45%; }
.slp-ts--classic .slp-title__deco::before { right: 251%; }
.slp-ts--classic .slp-title__deco::after { left: 251%; }
.slp-ts--side-lines h2 { display: flex; width: fit-content; margin-inline: auto; align-items: center; gap: 14px; }
.slp-ts--side-lines h2::before, .slp-ts--side-lines h2::after { content: ""; width: 38px; height: 2px; background: var(--color-primary); display: inline-block; }
.slp-ts--signature .slp-title__deco { width: 160px; height: 18px; margin-top: 11px; background: var(--color-primary);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='18' viewBox='0 0 160 18'%3E%3Cpath d='M7 12C42 2 86 2 129 10C140 12 149 12 154 7' fill='none' stroke='black' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M30 14C62 10 99 10 130 14' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E") center/contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='18' viewBox='0 0 160 18'%3E%3Cpath d='M7 12C42 2 86 2 129 10C140 12 149 12 154 7' fill='none' stroke='black' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M30 14C62 10 99 10 130 14' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E") center/contain no-repeat; }
.slp-ts--highlight h2 { width: fit-content; margin-inline: auto; background: linear-gradient(to top, color-mix(in srgb, var(--color-primary) 25%, transparent) 42%, transparent 42%); -webkit-box-decoration-break: clone; box-decoration-break: clone; padding: 0 7px; }
.slp-ts--underline-offset h2 { position: relative; width: fit-content; margin-inline: auto; padding-bottom: 11px; }
.slp-ts--underline-offset h2::after { content: ""; position: absolute; bottom: 0; inset-inline-start: 18%; width: 68%; height: 4px; border-radius: 999px; background: linear-gradient(90deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 35%, transparent)); }
.slp-ts--glow-badge h2 { position: relative; width: fit-content; margin-inline: auto; z-index: 0; padding: 4px 18px; clip-path: inset(0 round 999px); }
@container (min-width: 768px) { .slp-ts--glow-badge h2 { padding: 8px 24px; } }
.slp-ts--glow-badge h2::before { content: ""; position: absolute; z-index: -1; top: 0; bottom: 0; left: -120%; width: 220%; background: linear-gradient(120deg, color-mix(in srgb, var(--color-primary) 8%, transparent), color-mix(in srgb, var(--color-primary) 32%, transparent), color-mix(in srgb, var(--color-primary) 8%, transparent)); animation: slp-ts-sweep 3.4s ease-in-out infinite; }
.slp-ts--glow-badge .slp-title__deco { width: 10px; height: 10px; border-radius: 50%; background: var(--color-primary); box-shadow: 22px 0 0 color-mix(in srgb, var(--color-primary) 45%, transparent), -22px 0 0 color-mix(in srgb, var(--color-primary) 45%, transparent); animation: slp-ts-pulse 1.9s ease-in-out infinite; }
.slp-ts--frame h2 { position: relative; width: fit-content; margin-inline: auto; padding: 13px 28px; }
.slp-ts--frame h2::before, .slp-ts--frame h2::after { content: ""; position: absolute; inset: 0; border: 1px solid color-mix(in srgb, var(--color-primary) 68%, transparent); transform-origin: center; animation: slp-ts-breathe 3s ease-in-out infinite; }
.slp-ts--frame h2::after { inset: 6px -10px; opacity: .45; animation-delay: .55s; }
.slp-ts--shimmer h2 { width: fit-content; margin-inline: auto; padding: 4px 18px; color: transparent; background: linear-gradient(100deg, var(--slp-title-color, var(--slp-text)) 0 36%, var(--color-primary) 46%, var(--slp-title-color, var(--slp-text)) 58% 100%); background-size: 260% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: slp-ts-sheen 3.8s ease-in-out infinite; }
.slp-ts--shimmer .slp-title__deco { width: 66px; height: 2px; border-radius: 999px; background: color-mix(in srgb, var(--color-primary) 65%, transparent); }
.slp-ts--constellation h2 { position: relative; width: fit-content; margin-inline: auto; padding: 4px 18px; }
.slp-ts--constellation h2::before, .slp-ts--constellation h2::after { content: ""; position: absolute; width: 7px; height: 7px; border-radius: 50%; background: var(--color-primary); box-shadow: 24px -11px 0 -2px color-mix(in srgb, var(--color-primary) 72%, transparent), -28px 13px 0 -1px color-mix(in srgb, var(--color-primary) 56%, transparent); animation: slp-ts-twinkle 2.2s ease-in-out infinite; }
.slp-ts--constellation h2::before { right: -10px; top: 0; }
.slp-ts--constellation h2::after { left: -10px; bottom: 4px; animation-delay: .7s; }
.slp-ts--constellation .slp-title__deco { width: 132px; height: 1px; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-primary) 55%, transparent), transparent); }
.slp-ts--lozenge h2 { position: relative; width: fit-content; margin-inline: auto; z-index: 0; padding: 10px 28px; }
.slp-ts--lozenge h2::before { content: ""; position: absolute; z-index: -1; inset: 0; border: 1px solid var(--color-primary); border-radius: 64% 36% 58% 42% / 42% 54% 46% 58%; background: color-mix(in srgb, var(--color-primary) 8%, transparent); animation: slp-ts-morph 5s ease-in-out infinite; }
.slp-ts--pulse-line .slp-title__deco { width: 120px; height: 3px; border-radius: 999px; background: var(--color-primary); transform-origin: center; animation: slp-ts-drawx 2.6s cubic-bezier(.16, 1, .3, 1) infinite; }
.slp-ts--traveling-dot .slp-title__deco { position: relative; width: 130px; height: 2px; border-radius: 999px; background: color-mix(in srgb, var(--color-primary) 32%, transparent); }
.slp-ts--traveling-dot .slp-title__deco::after { content: ""; position: absolute; top: 50%; left: 0; width: 10px; height: 10px; border-radius: 50%; background: var(--color-primary); transform: translate(6px, -50%); animation: slp-ts-travel 2.8s cubic-bezier(.16, 1, .3, 1) infinite; }
.slp-ts--diamond .slp-title__deco { position: relative; width: 160px; height: 2px; background: linear-gradient(90deg, var(--color-primary) 0 40%, transparent 40% 60%, var(--color-primary) 60% 100%); }
.slp-ts--diamond .slp-title__deco::before { content: ""; position: absolute; top: 50%; left: 50%; width: 10px; height: 10px; background: var(--color-primary); transform: translate(-50%, -50%) rotate(45deg); animation: slp-ts-dia 3s ease-in-out infinite; }
.slp-ts--dashes .slp-title__deco { position: relative; width: 130px; height: 8px; overflow: hidden; -webkit-mask: linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent); mask: linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent); }
.slp-ts--dashes .slp-title__deco::before { content: ""; position: absolute; top: 50%; left: 0; width: 200%; height: 3px; background: repeating-linear-gradient(90deg, var(--color-primary) 0 10px, transparent 10px 22px); transform: translateY(-50%); animation: slp-ts-conveyor 1.6s linear infinite; }
.slp-ts--wipe .slp-title__deco { width: 120px; height: 3px; border-radius: 999px; background: var(--color-primary); transform-origin: left; animation: slp-ts-wipe 3s cubic-bezier(.16, 1, .3, 1) infinite; }
.slp-ts--sparkle .slp-title__deco { position: relative; height: 20px; width: 100%; margin-top: 0; }
.slp-ts--sparkle .slp-title__deco::before { content: "\\2726"; position: absolute; left: 50%; top: 0; color: var(--color-primary); font-size: 14px; transform: translateX(-50%); animation: slp-ts-float 2.6s ease-in-out infinite; }
.slp-ts--sparkle .slp-title__deco::after { content: ""; position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); width: 90px; height: 1px; background: linear-gradient(90deg, transparent, var(--color-primary), transparent); }
.slp-ts--converge .slp-title__deco { position: relative; width: 160px; height: 2px; }
.slp-ts--converge .slp-title__deco::before, .slp-ts--converge .slp-title__deco::after { content: ""; position: absolute; top: 0; width: 70px; height: 2px; border-radius: 999px; background: var(--color-primary); }
.slp-ts--converge .slp-title__deco::before { left: 0; animation: slp-ts-convL 2.6s cubic-bezier(.16, 1, .3, 1) infinite; }
.slp-ts--converge .slp-title__deco::after { right: 0; animation: slp-ts-convR 2.6s cubic-bezier(.16, 1, .3, 1) infinite; }
:is(.slp-ts--side-lines, .slp-ts--highlight, .slp-ts--underline-offset, .slp-ts--frame, .slp-ts--lozenge) .slp-title__deco { display: none; }
@keyframes slp-ts-sheen { 0%, 100% { background-position: 100% 50%; } 50% { background-position: 0 50%; } }
@keyframes slp-ts-sweep { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(54.545%); } }
@keyframes slp-ts-pulse { 0%, 100% { transform: scale(.78); opacity: .55; } 50% { transform: scale(1); opacity: 1; } }
@keyframes slp-ts-breathe { 0%, 100% { transform: scale(.95); opacity: .45; } 50% { transform: scale(1.04); opacity: .95; } }
@keyframes slp-ts-twinkle { 0%, 100% { transform: scale(.75); opacity: .35; } 50% { transform: scale(1.12); opacity: 1; } }
@keyframes slp-ts-morph { 0%, 100% { border-radius: 64% 36% 58% 42% / 42% 54% 46% 58%; } 50% { border-radius: 40% 60% 38% 62% / 62% 40% 60% 38%; } }
@keyframes slp-ts-drawx { 0%, 100% { transform: scaleX(.2); opacity: .5; } 50% { transform: scaleX(1); opacity: 1; } }
@keyframes slp-ts-travel { 0%, 100% { transform: translate(6px, -50%); } 50% { transform: translate(114px, -50%); } }
@keyframes slp-ts-dia { 0%, 100% { transform: translate(-50%, -50%) rotate(45deg) scale(.7); } 50% { transform: translate(-50%, -50%) rotate(225deg) scale(1); } }
@keyframes slp-ts-conveyor { from { transform: translate(0, -50%); } to { transform: translate(-22px, -50%); } }
@keyframes slp-ts-wipe { 0% { transform: scaleX(0); transform-origin: left; } 45% { transform: scaleX(1); transform-origin: left; } 55% { transform: scaleX(1); transform-origin: right; } 100% { transform: scaleX(0); transform-origin: right; } }
@keyframes slp-ts-float { 0%, 100% { transform: translate(-50%, 3px); opacity: .6; } 50% { transform: translate(-50%, -3px); opacity: 1; } }
@keyframes slp-ts-convL { 0%, 100% { transform: translateX(-40px); opacity: .3; } 50% { transform: translateX(0); opacity: 1; } }
@keyframes slp-ts-convR { 0%, 100% { transform: translateX(40px); opacity: .3; } 50% { transform: translateX(0); opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .slp-title :is(.slp-title__deco, h2), .slp-title :is(.slp-title__deco, h2)::before, .slp-title :is(.slp-title__deco, h2)::after { animation: none !important; }
}
`;
function k(t, e) {
  if (document.getElementById(t)) return;
  const r = document.createElement("style");
  r.id = t, r.textContent = e, document.head.appendChild(r);
}
function y(t) {
  const e = String(c(t.color_scheme) || "auto");
  return e === "dark" ? "slp-dark" : e === "light" ? "" : "slp-auto";
}
const p = `--slp-surface: #1d1f1f; --slp-surface-2: #0e0f0f; --slp-card: #262828; --slp-soft: #2f3131; --slp-header: #0e0f0f;
  --slp-text: #fff; --slp-muted: #ccc; --slp-border: rgb(255 255 255 / 10%);`, v = `
.slp-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
.component-card:has(> .slp-host:not(:empty)) { min-height: 0; }
.slp-block { --slp-surface: #fff; --slp-surface-2: #f8f8f8; --slp-card: #fff; --slp-soft: #f4f4f5; --slp-header: #fff;
  --slp-text: #111; --slp-muted: #6b7280; --slp-border: #e5e7eb;
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit); color: var(--slp-text); }
.slp-block.slp-dark, html.slp-mode-dark .slp-block.slp-auto { ${p} }
@media (prefers-color-scheme: dark) { html:not(.slp-mode-light) .slp-block.slp-auto { ${p} } }
.slp-block *, .slp-block *::before, .slp-block *::after { box-sizing: border-box; }
.slp-block img, .slp-block video { display: block; max-width: 100%; }
.slp-block h2, .slp-block h3, .slp-block p, .slp-block ul { margin: 0; padding: 0; }
.slp-block ul { list-style: none; }
.slp-container { width: 100%; max-width: 1280px; margin-inline: auto; padding-inline: 1rem; }
.slp-section { padding-block: 2.5rem; background: var(--slp-section-bg, var(--slp-surface)); }
html.slp-mode-ready .slp-section { transition: background-color .3s ease; }
@container (min-width: 768px) { .slp-section { padding-block: 3.5rem; } }
.slp-title { text-align: center; margin-bottom: 1.75rem; }
.slp-title h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 700; color: var(--slp-title-color, var(--slp-text)); }
.slp-title p { margin-top: .5rem; font-size: 1rem; line-height: 1.7; color: var(--slp-subtitle-color, var(--slp-muted)); }
@container (min-width: 768px) { .slp-title h2 { font-size: 2.25rem; } }
${m}
.slp-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 3rem; padding: .75rem 1.75rem; border: 1px solid transparent; border-radius: var(--slp-radius, .5rem); font: inherit; font-weight: 700; font-size: 1rem; line-height: 1.2; text-decoration: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease, background-color .2s ease; }
.slp-btn:hover { transform: translateY(-1px); opacity: .92; }
.slp-btn:focus-visible { outline: 2px solid var(--color-primary, #111); outline-offset: 3px; }
.slp-btn[disabled] { opacity: .5; cursor: not-allowed; transform: none; }
@media (prefers-reduced-motion: reduce) { .slp-btn { transition: none; } .slp-btn:hover { transform: none; } }
`;
export {
  g as a,
  h as b,
  v as c,
  x as d,
  a as e,
  u as g,
  k as i,
  l as r,
  y as s,
  b as t,
  c as u
};
