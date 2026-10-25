export type ComponentConfig = Record<string, any>;

/** Normalizes config from demo (flat) or theme API ({ component: {...} }). */
export function getConfig(raw?: ComponentConfig | null): ComponentConfig {
  if (!raw) return {};
  if (raw.component && typeof raw.component === "object") return raw.component;
  return raw;
}

export function getLocale(): string {
  return (window as any).Salla?.lang?.getLocale?.() || document.documentElement.lang || "ar";
}

export function isRtl(): boolean {
  return (document.documentElement.dir || (getLocale() === "ar" ? "rtl" : "ltr")) === "rtl";
}

/** Resolves a multilingual value ({ ar, en } or plain string) to the active locale. */
export function resolveText(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const obj = value as Record<string, string>;
    return obj[getLocale()] || obj.ar || obj.en || "";
  }
  return String(value);
}

/** Built-in UI strings that are not merchant configurable. */
export function t(strings: { ar: string; en: string }): string {
  return getLocale() === "ar" ? strings.ar : strings.en;
}

/** Unwraps dropdown/radio values that arrive as [{ value }], { value } or a plain value. */
export function unwrapValue(value: any): any {
  if (Array.isArray(value)) return value[0]?.value ?? value[0] ?? "";
  if (value && typeof value === "object" && "value" in value) return value.value;
  return value ?? "";
}

/** Returns collection items with the "{prefix}." part stripped from field keys. */
export function getCollectionItems<T extends Record<string, any>>(items: unknown, prefix: string): T[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    if (!item || typeof item !== "object") return {} as T;
    const normalized: Record<string, any> = {};
    for (const [key, val] of Object.entries(item)) {
      normalized[key.startsWith(`${prefix}.`) ? key.slice(prefix.length + 1) : key] = val;
    }
    return normalized as T;
  });
}
