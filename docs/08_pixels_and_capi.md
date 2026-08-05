# Píxeles Web y Conversions API (CAPI)

Versión: 1.0 (2026-06-24)

## 1) Principios
- Web pixels (FB/TikTok) diferidos (`defer`/`async`) para velocidad
- CAPI en backend SOLO para `Purchase`
- Deduplicación con `event_id` idéntico (browser + server)
- Hash **SHA-256** de PII en servidor

## 2) Eventos web (browser)
- `ViewContent`: en `/products/*`
- `AddToCart`: al añadir al carrito
- `InitiateCheckout`: al abrir checkout popup
- `Purchase`: en `/thank-you` (enviar `event_id` único)
- No enviar datos de dirección/ciudad/estado al pixel del navegador

Ejemplo FB en Thank You:
```js
const eventId = 'ev_' + Date.now();
fbq('track', 'Purchase', { value: total, currency: 'MXN' }, { eventID: eventId });
// Enviar eventId al backend con la orden
```

## 3) CAPI (server)
- Recibir `browser_event_id` con la orden
- Construir payload con:
  - user_data: { ph: sha256(phone) }
  - custom_data: { value: total, currency: 'MXN' }
  - event_id = browser_event_id
- Enviar a Facebook/TikTok con sus SDK/HTTP oficiales

## 4) Deduplicación
- Si FB/TikTok recibe Purchase con el mismo `event_id` desde pixel y CAPI, cuenta **una sola** conversión

## 5) Seguridad y performance
- No hash en web; solo en servidor
- Retries exponenciales si falla el envío CAPI
- Timeouts razonables (<= 3s) y colas en background
- PII mínima a plataformas: para CAPI usar teléfono hasheado; no enviar dirección ni ciudad/estado a ad platforms
