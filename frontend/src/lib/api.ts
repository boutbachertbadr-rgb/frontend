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



export interface OrderPublicResponse {

  order_id: number;

  status: string;

  total_price: number;

  customer_name: string;

  customer_phone: string;

  customer_state: string;

  customer_city: string;

  customer_distrito: string | null;

  customer_address: string;

  customer_reference: string | null;

  items: OrderItem[];

}



export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {

  console.log("[api.createOrder] payload:", payload);

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

      const errorText = await res.text().catch(() => "Error al crear la orden.");

      console.error("[api.createOrder] HTTP error", res.status, errorText);

      throw new Error(errorText || "Error al crear la orden.");

    }



    const data = await res.json();

    console.log("[api.createOrder] response:", data);

    return data;

  } catch (err) {

    clearTimeout(timeoutId);

    console.error("[api.createOrder] request failed:", err);

    throw err;

  }

}



export async function getOrderById(orderId: number): Promise<OrderPublicResponse | null> {

  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), 5000);



  try {

    const res = await fetch(`${API_URL}/orders/${orderId}`, {

      method: "GET",

      headers: { "Content-Type": "application/json" },

      signal: controller.signal,

    });



    clearTimeout(timeoutId);



    if (!res.ok) {

      return null;

    }



    return res.json();

  } catch {

    clearTimeout(timeoutId);

    return null;

  }

}

