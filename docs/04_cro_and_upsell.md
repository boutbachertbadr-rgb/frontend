# CRO y Flujo de Conversión (COD + Upsell)

Versión: 1.0 (2026-06-24)

## 1) Drawer del Carrito
- Sin página de carrito. Todo en Drawer lateral.
- Cross-sell contextual (1 producto, precio normal).
- CTA: "Proceder al Pago".

## 2) Checkout Popup (5 campos)
- Resumen de pedido (items + total MXN)
- Campos requeridos:
  1) Nombre y Apellido
  2) Teléfono (validación MX)
  3) Provincia/Estado
  4) Ciudad/Municipio
  5) Dirección Completa
- Validación MX (frontend):
  - Aceptar 10 dígitos o +52 con 10 dígitos.
  - Regex sugerido: `^(\+52\s?)?\d{10}$`
  - Dirección: campo de texto multilínea permitido; no dividir en más subcampos.
- Micro-confianza bajo el formulario.
- CTA: "Confirmar Mi Pedido"
 - No se deben pedir campos adicionales.

## 3) Upsell post-submit (10–15s)
- Único producto relevante según contenido del carrito:
  - Prioridad: ofrecer **Guardián** si no está en carrito; luego **Brisa**.
- ÚNICO lugar con descuento (20–30%).
- Botones: "Sí, Añadir" / "No, Gracias".
- Al aceptar: agregar al pedido y actualizar total.

## 4) Thank You Page
- Instrucción clara: "Atiende nuestra llamada de confirmación".
- Resumen dinámico (incluye upsell si procede).
- Dispara webhook a Google Sheets con JSON del pedido.

## 5) Métricas y tracking
- Pixel browser: ViewContent, AddToCart, InitiateCheckout, Purchase (con `event_id`).
- CAPI server: Purchase (mismo `event_id`) → deduplicación.
- Defer/async para scripts de pixel.
