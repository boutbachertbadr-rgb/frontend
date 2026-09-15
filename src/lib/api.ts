const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface OrderItem {
  product_name: string;
  quantity: number;
  price_per_item: number;
  sku?: string;
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_state: string;
  customer_city: string;
  customer_distrito: string;
  customer_address: string;
  customer_reference: string;
  customer_note?: string;
  province_id?: string;
  city_id?: string;
  items: OrderItem[];
  is_upsell_accepted: boolean;
  total_price: number;
  browser_event_id: string | null;
}

export interface OrderResponse {
  order_id: number;
  status: string;
  total_price: number;
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(`${API_URL}/orders/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: "Error al crear la orden." }));
        const err = new Error(typeof error.detail === "string" ? error.detail : "Error al crear la orden.");
        (err as Error & { status?: number }).status = res.status;
        throw err;
      }

      return res.json();
    } catch (err) {
      clearTimeout(timeoutId);
      const status = (err as { status?: number }).status;
      if (attempt < MAX_RETRIES && status !== 422) {
        await new Promise(r => setTimeout(r, 1000 * attempt));
        continue;
      }
      throw err;
    }
  }

  throw new Error("Error al crear la orden.");
}
