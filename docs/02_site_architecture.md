# Arquitectura del Sitio (Vazlina)

Versión: 1.0 (2026-06-24)

## 1) Rutas
- `/` Home
- `/collections/all` Colección
- `/products/vazlina-brisa`
- `/products/vazlina-mariposa`
- `/products/vazlina-guardian`
- `/about` Nuestra Filosofía
- `/contact` Contacto
- `/policies/shipping-policy`, `/policies/guarantee`, `/policies/privacy-policy`, `/policies/terms-of-service`
- `/thank-you` (tras compra)

## 2) Header
- Desktop:
  - Izquierda: Menú (Inicio, Colección, Nuestra Filosofía, Contacto)
  - Derecha: Logo (Azul Vazlina), Ícono Carrito (abre Drawer)
- Mobile:
  - Izquierda: Hamburguesa (menú)
  - Derecha: Logo + Carrito

## 3) Footer
- 4 columnas: Vazlina (misión + redes), Tienda (enlaces a productos), Soporte (Contacto, Filosofía), Legal (políticas)
- Barra inferior: © 2026 Vazlina.shop

## 4) Home (estructura)
1. Hero full-bleed (video/imagen) + titular beneficios + CTA
2. Trust bar (3 promesas)
3. Sección producto héroe (Brisa)
4. Filosofía (El Estándar Vazlina)
5. Prueba social (UGC/Reseñas)
6. Introducción Mariposa/Guardián
7. FAQ COD final

## 5) Página de producto (landing)
- Izq (desktop): Galería 3–4 imágenes/video (placeholder si no hay fotos)
- Der (desktop):
  - H1 producto + subtítulo beneficio
  - Estrellas
  - Selector de oferta (1/2/3 unidades + precio MXN)
  - Escasez (stock limitado)
  - CTA "Añadir al Carrito" (abre Drawer)
  - Badges confianza
- Secciones alternas (imagen izq/texto der y viceversa): problema/solución, beneficios, estándar Vazlina, UGC, FAQ

## 6) Drawer del carrito
- Lista de ítems + subtotal
- Cross-sell contextual (mostrar 1 producto relevante a precio normal)
- CTA "Proceder al Pago" → abre popup Checkout

## 7) Checkout (popup)
- Resumen de pedido (no editable)
- Formulario COD con 5 campos obligatorios:
  - Nombre y Apellido
  - Teléfono (validación México)
  - Provincia/Estado
  - Ciudad/Municipio
  - Dirección Completa
- Micro-confianza (Paga al recibir, Confirmación telefónica, Garantía)
- CTA "Confirmar Mi Pedido"

## 8) Upsell post-submit (overlay 10–15s)
- Un solo producto, elegido dinámicamente
- ÚNICO lugar con descuento
- Botones: "Sí, Añadir" / "No, Gracias"

## 9) Thank You Page
- Mensaje principal + instrucción clara de contestar la llamada
- Resumen dinámico (incluye upsell si se aceptó) con datos de entrega capturados
- Sin más ofertas

## 10) Colección/Contacto/Acerca de
- Colección: cards con imagen, título, precio desde, calificación
- Contacto: forma simple (nombre, mensaje), canales WhatsApp/soporte
- Acerca de: historia corta + Estándar Vazlina + fotos reales del equipo/operación (cuando existan)
