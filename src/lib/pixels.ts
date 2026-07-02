/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    ttq?: { track: (...args: any[]) => void; load: (id: string) => void; page: () => void };
  }
}

export function generateEventId(): string {
  return `ev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function trackViewContent(productName: string, value: number): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "ViewContent", {
    content_name: productName,
    currency: "MXN",
    value,
  });
  window.ttq?.track("ViewContent", { description: productName, currency: "MXN", value });
}

export function trackAddToCart(productName: string, value: number): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "AddToCart", { content_name: productName, currency: "MXN", value });
  window.ttq?.track("AddToCart", { description: productName, currency: "MXN", value });
}

export function trackInitiateCheckout(value: number): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "InitiateCheckout", { currency: "MXN", value });
  window.ttq?.track("InitiateCheckout", { currency: "MXN", value });
}

export function trackPurchase(value: number, eventId: string): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Purchase", { currency: "MXN", value }, { eventID: eventId });
  window.ttq?.track("CompletePayment", { currency: "MXN", value });
}
