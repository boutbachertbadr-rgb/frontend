const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL ?? "";

/**
 * One row = one SKU line. If an order has more than one SKU (e.g. a mixed
 * color bundle), send one line per SKU so the fulfillment service gets
 * clean, atomic columns instead of a delimited string to parse.
 */
export interface SheetOrderLine {
  country?: string; // defaults to "Costa Rica"
  full_name: string;
  phone: string;
  departamento: string;
  municipio: string;
  direccion_completa: string;
  punto_referencia?: string;
  sku: string;
  quantity: number;
  price: number;
  shipping: number; // 0 = free/standard, 2000 = express
}

/**
 * Sends order lines straight to the Google Sheet (via Apps Script Web App),
 * with no backend/API in between. Rows are posted sequentially so they land
 * in order. Fire-and-forget with retries per row.
 *
 * NOTE: Google Apps Script Web Apps don't handle CORS preflight requests,
 * so we send the body as text/plain (still valid JSON) and use "no-cors"
 * mode. This means we can't read the response back — we just trust the
 * request went through if fetch() doesn't throw.
 */
async function postLine(line: SheetOrderLine): Promise<void> {
  if (!SHEET_URL) {
    throw new Error(
      "NEXT_PUBLIC_SHEET_WEBHOOK_URL no está configurada en el build. Revisa las variables de entorno en Easypanel."
    );
  }

  const body = JSON.stringify({
    fecha: new Date().toLocaleString("es-CR", { timeZone: "America/Costa_Rica" }),
    country: "Costa Rica",
    ...line,
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

export async function sendOrderToSheet(lines: SheetOrderLine[]): Promise<void> {
  for (const line of lines) {
    await postLine(line);
  }
}
