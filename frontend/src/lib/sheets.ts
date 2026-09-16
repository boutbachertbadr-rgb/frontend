const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL ?? "";

export interface SheetOrderPayload {
  nombre_completo: string;
  telefono: string;
  departamento: string;
  municipio: string;
  poblado: string;
  direccion: string;
  referencia?: string;
  productos: string;
  envio: string;
  precio_envio: string;
  total: number;
  origen?: string;
}

/**
 * Sends an order straight to the Google Sheet (via Apps Script Web App),
 * with no backend/API in between. Fire-and-forget with retries.
 *
 * NOTE: Google Apps Script Web Apps don't handle CORS preflight requests,
 * so we send the body as text/plain (still valid JSON) and use "no-cors"
 * mode. This means we can't read the response back — we just trust the
 * request went through if fetch() doesn't throw.
 */
export async function sendOrderToSheet(payload: SheetOrderPayload): Promise<void> {
  if (!SHEET_URL) {
    console.warn("[sheet] NEXT_PUBLIC_SHEET_WEBHOOK_URL no está configurada.");
    return;
  }

  const body = JSON.stringify({
    fecha: new Date().toLocaleString("es-CR", { timeZone: "America/Costa_Rica" }),
    ...payload,
  });

  const MAX_RETRIES = 3;
  let lastErr: unknown = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
      });
      return;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 800 * attempt));
      }
    }
  }

  throw lastErr instanceof Error ? lastErr : new Error("No se pudo enviar el pedido a la hoja de cálculo.");
}
