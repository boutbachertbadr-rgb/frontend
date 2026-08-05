# Google Sheets (Webhook + Plantilla)

Versión: 1.0 (2026-06-24)

## 1) Plantilla de Sheet
- Hoja: `Orders`
- Columnas:
  - `timestamp`
  - `order_id`
  - `customer_name`
  - `customer_phone`
  - `customer_state`
  - `customer_city`
  - `customer_address`
  - `products_ordered` (string "Brisa x2, Guardián x1")
  - `total_price`
  - `is_upsell_accepted`

Se incluye `docs/sheets/orders_template.csv` con encabezados.

## 2) Apps Script (Web App)
- Crear nuevo Apps Script vinculado a la hoja
- Pegar `docs/scripts/apps_script.gs`
- Deploy → New deployment → Web app → Anyone with link (o restringido si se usan tokens)
- Copiar URL y colocarla en `GOOGLE_SHEET_WEBHOOK_URL` del backend

## 3) Payload esperado (JSON)
```
{
  "timestamp": "2026-06-24T15:00:00Z",
  "order_id": 123,
  "customer_name": "Juan Pérez",
  "customer_phone": "5512345678",
  "customer_state": "CDMX",
  "customer_city": "Benito Juárez",
  "customer_address": "Av. X #123, Col. Y, CP 01234",
  "products_ordered": "Vazlina Brisa (x2), Vazlina Guardián (x1)",
  "total_price": 1501.99,
  "is_upsell_accepted": true
}
```
