// Mirrors the landing renderer (theme-landing-page): page mode, the page's product and its Buy Now flow.

type SallaGlobal = {
  config?: { get: (key: string, fallback?: unknown) => any };
  analytics?: { track: (event: string, props: Record<string, unknown>) => void };
  url?: { cdn: (path: string, w?: number, h?: number) => string };
  money?: (amount: number) => string;
  product?: { api: { getDetails: (id: string | number, withItems?: string[]) => Promise<{ data: any }> } };
  onReady?: () => Promise<void>;
};

export function getSalla(): SallaGlobal | undefined {
  return (window as any).Salla;
}

export function landingSettings(): Record<string, any> {
  return getSalla()?.config?.get("theme.settings") || {};
}

export function isLandingPage(): boolean {
  return getSalla()?.config?.get("page.is_landing_page") === true;
}

/** Handles the boolean, string and radio-list formats the dashboard has saved over time. */
export function pageMode(): "product" | "promotion" {
  const value = landingSettings().page_for_product;
  if (typeof value === "boolean" || value === undefined || value === null) {
    return value === false ? "promotion" : "product";
  }
  if (typeof value === "string") return value === "promotion" ? "promotion" : "product";
  return Array.isArray(value) && value[0]?.value === "promotion" ? "promotion" : "product";
}

/** The product the page sells, which is also the one fast-checkout buys. */
export function landingProductId(): string | null {
  if (!isLandingPage() || pageMode() !== "product") return null;
  const id = landingSettings().product?.value?.[0];
  return id ? String(id) : null;
}

export function mainButton(): { text: string; url: string } {
  const settings = landingSettings();
  return { text: String(settings.main_btn_text || ""), url: String(settings.main_btn_url || "") };
}

// Template demo products live in Selia's preview store; the demo and public preview pages run on another store.
const PREVIEW_STORE_ID = "1886435134";
// That store's logos; the demo store's own logo is Salla's
export const PREVIEW_STORE_LOGO = "https://cdn.files.salla.network/theme/1886435134/c09fe18e-8c22-412e-b07b-c3df22c79c52.png";
export const PREVIEW_STORE_LOGO_DARK = "https://cdn.files.salla.network/homepage/1886435134/2a7f35f4-dfb6-467c-95d8-cfc3f86898b0.webp";
const DETAILS_WITH = ["images", "rating", "sold_quantity"];

// Plain fetch: Salla's API helper pops an error notice when a demo product is missing from the current store.
async function fetchFromStore(id: string | number, storeId: string): Promise<any | null> {
  try {
    const query = DETAILS_WITH.map((item) => `with[]=${item}`).join("&");
    const res = await fetch(`https://api.salla.dev/store/v1/products/${id}/details?${query}`, {
      headers: { "store-identifier": storeId },
    });
    const json = await res.json();
    return json?.data?.id ? json.data : null;
  } catch {
    return null;
  }
}

export async function fetchProduct(id: string | number | null | undefined): Promise<any | null> {
  const Salla = getSalla();
  if (!id) return null;
  await Salla?.onReady?.();
  if (isLandingPage()) {
    try {
      const res = await Salla?.product?.api.getDetails(id, DETAILS_WITH);
      return res?.data?.id ? res.data : null;
    } catch {
      return null;
    }
  }
  const storeId = String(Salla?.config?.get("store.id") || "");
  return (storeId && (await fetchFromStore(id, storeId))) || fetchFromStore(id, PREVIEW_STORE_ID);
}

function pageId(): string {
  return window.location.pathname.split("/").filter(Boolean).pop() || "";
}

/** Opens the page's own checkout, using the same rules as the renderer's Buy Now button. */
export function openCheckout(product?: any, quantity = 1): void {
  const Salla = getSalla();
  try {
    const price = Number(product?.sale_price || product?.price || 0);
    Salla?.analytics?.track("Buy Now", {
      page_id: pageId(),
      source: "selia-landing",
      product_id: product?.id ? String(product.id) : landingProductId(),
      product_loaded: Boolean(product?.id),
      name: product?.name ?? null,
      quantity,
      price: product?.id ? price * quantity : null,
      currency: product?.currency || Salla?.config?.get("user.currency_code") || null,
    });
  } catch {
    // tracking must never block the purchase
  }

  const checkout = document.querySelector(".s-block--fast-checkout");
  const layout = checkout?.getAttribute("data-layout");
  if (window.innerWidth < 1024 || layout === "side-drawer" || !checkout) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  checkout.scrollIntoView({ behavior: "smooth", block: "center" });
}

/** Carries the quantity picked in a section into the page's checkout, which owns its own quantity input. */
export function syncCheckoutQuantity(quantity: number, tries = 20): void {
  if (quantity <= 1) return;
  const input = document.querySelector<any>(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (input?.setValue) {
    input.setValue(quantity);
    return;
  }
  // The drawer layout mounts its checkout only after it opens
  if (tries > 0) window.setTimeout(() => syncCheckoutQuantity(quantity, tries - 1), 100);
}

export type CtaAction = { kind: "checkout" } | { kind: "link"; url: string } | { kind: "none" };

/** Decides what a call to action does: buy on a product page, the page's main link on a promotion page. */
export function ctaAction(fallbackUrl = ""): CtaAction {
  if (landingProductId()) return { kind: "checkout" };
  if (isLandingPage() && pageMode() === "promotion") {
    const url = mainButton().url || fallbackUrl;
    return url ? { kind: "link", url } : { kind: "none" };
  }
  if (isLandingPage()) return fallbackUrl ? { kind: "link", url: fallbackUrl } : { kind: "none" };
  // Demo and template previews show the button as it appears on a product page
  return { kind: "checkout" };
}

export function money(amount: number): string {
  const Salla = getSalla();
  return Salla?.money ? Salla.money(amount) : String(amount);
}
