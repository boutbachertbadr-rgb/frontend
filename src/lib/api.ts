const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface OrderItem {
  product_name: string;
  quantity: number;
  price_per_item: number;
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
  products?: { sku: string; quantity: number; price: number }[];
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
        throw new Error(error.detail ?? "Error al crear la orden.");
      }

      return res.json();
    } catch (err) {
      clearTimeout(timeoutId);
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, 1000 * attempt));
        continue;
      }
      throw err;
    }
  }

  throw new Error("Error al crear la orden.");
}
