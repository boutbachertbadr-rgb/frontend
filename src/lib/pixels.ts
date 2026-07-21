/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    ttq?: { track: (...args: any[]) => void; load: (id: string) => void; page: () => void; identify: (params: any) => void };
    __fbpid?: string;
  }
}

export function generateEventId(): string {
  return `ev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function trackViewContent(productName: string, value: number): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "ViewContent", {
    content_name: productName,
    currency: "CRC",
    value,
  });
  window.ttq?.track("ViewContent", { description: productName, currency: "CRC", value, content_id: productName });
}

export function trackAddToCart(productName: string, value: number): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "AddToCart", { content_name: productName, currency: "CRC", value });
  window.ttq?.track("AddToCart", { description: productName, currency: "CRC", value, content_id: productName });
}

export function trackInitiateCheckout(value: number): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "InitiateCheckout", { currency: "CRC", value });
  window.ttq?.track("InitiateCheckout", { currency: "CRC", value, content_id: "checkout" });
}

export function trackPurchase(value: number, eventId: string, phone?: string): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Purchase", { currency: "CRC", value }, { eventID: eventId });

  const fireTrack = () => {
    window.ttq?.track("CompletePayment", { currency: "CRC", value, content_id: "purchase" });
  };

  if (phone) {
    const clean = phone.replace(/\D/g, "");
    sha256(clean)
      .then(hashed => {
        if (window.__fbpid) window.fbq?.("init", window.__fbpid, { ph: hashed });
        window.ttq?.identify?.({ phone_number: hashed });
        fireTrack();
      })
      .catch(fireTrack);
  } else {
    fireTrack();
  }
}
