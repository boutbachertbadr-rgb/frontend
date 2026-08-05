# Especificación Frontend (Next.js + TS + Tailwind)

Versión: 1.0 (2026-06-24)

## 1) Stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- Zustand (estado de carrito, UI modals)
- React Hook Form + Zod (checkout form)
- Lucide (íconos)

## 2) Estructura
```
/src
  /app
    /(public)
      page.tsx (Home)
      /products
        /vazlina-brisa/page.tsx
        /vazlina-mariposa/page.tsx
        /vazlina-guardian/page.tsx
      /collections/all/page.tsx
      /about/page.tsx
      /contact/page.tsx
      /policies/*
      /thank-you/page.tsx
  /components
    Header.tsx, Footer.tsx, CartDrawer.tsx, CheckoutModal.tsx, UpsellOverlay.tsx
    ProductCard.tsx, OfferSelector.tsx, TrustBar.tsx, Stars.tsx
  /lib
    phone.ts (validación MX), pixels.ts, upsell.ts (lógica), api.ts
  /store
    cart.ts (Zustand)
  /styles
    globals.css, tailwind.css
```

## 3) Estados y lógica
- `cart` (items, subtotal, add/remove, clear)
- `ui` (isCartOpen, isCheckoutOpen, isUpsellOpen, timer)
- `upsell`: función `pickUpsell(cartItems)` con prioridades definidas.

## 4) Checkout modal
- Form con RHF + Zod:
  ```ts
  type CheckoutForm = {
    name: string;            // Nombre y Apellido
    phone: string;           // Teléfono (MX)
    state: string;           // Provincia/Estado
    city: string;            // Ciudad/Municipio
    address: string;         // Dirección Completa (multilínea)
  }
  ```
- Validación:
  - phone MX: `^(\+52\s?)?\d{10}$`
  - name min 2, state/city min 2, address min 5
- Al submit válido → cerrar modal → abrir UpsellOverlay.
 - No solicitar información adicional en el checkout.

## 5) Upsell overlay
- 10–15s countdown (setInterval)
- Aceptar: `cart.add(upsellItem)` y continuar
- Rechazar/tiempo agotado: continuar
- Continuar = navegar a `/thank-you` y `POST /orders` al backend con payload (incluye `browser_event_id` para CAPI)

## 6) Pixels
- Cargar scripts con `defer`/`async`.
- Generar `event_id` único en Thank You y usarlo en `fbq('track', 'Purchase', ..., { eventID })` y enviar el mismo al backend.

## 7) Estilo y componentes
- Botones primarios Azul Vazlina.
- Secciones alternadas imagen/texto (grid md:2 cols; order inverso por sección).
- Placeholders con `next/image`.

## 8) Calidad de código

## 9) Payload a backend
- POST `/orders` body debe incluir campos cliente y carrito:
  ```json
  {
    "customer_name": "Juan Pérez",
    "customer_phone": "5512345678",
    "customer_state": "CDMX",
    "customer_city": "Benito Juárez",
    "customer_address": "Av. X #123, Col. Y, CP 01234",
    "items": [...],
    "is_upsell_accepted": true,
    "total_price": 1299.00,
    "browser_event_id": "ev_..."
  }
  ```
- ESLint + Prettier, convenciones de import `@/*`.
- Componentes puros, props tipadas, evitar any.
- Accesibilidad: roles/arías, focus visible.
