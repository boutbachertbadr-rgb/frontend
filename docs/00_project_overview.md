# Vazlina: Project Overview (Single Source of Truth)

Versión: 1.0 (2026-06-24)
Idioma del sitio: Español (México)
Dominio tienda: https://vazlina.shop
Dominio API: https://api.vazlina.shop

## 1) Misión y modelo
Construir una marca DTC premium en México que vende productos de dropshipping a precio alto, respaldada por autoridad, prueba social y una experiencia impecable de compra COD (Pago contra Entrega) optimizada para AOV alto.

Este documento y todos los archivos en `docs/` son la única fuente de verdad. Todo lo anterior es contexto histórico.

## 2) Tech stack
- Frontend: Next.js (App Router) + TypeScript + TailwindCSS
  - Estado: Zustand
  - Formularios/Validación: React Hook Form + Zod
  - Íconos: Lucide
  - Imágenes: Next/Image + CDN
- Backend: FastAPI (Python 3.10+)
  - ORM: SQLAlchemy + Alembic (migraciones automáticas al iniciar)
  - Esquemas: Pydantic v2
  - CORS habilitado para `vazlina.shop`
- Base de datos: PostgreSQL (db: `vazlina`)
  - URL interna: `postgres://vazlina:vazlina@vazlina_database:5432/vazlina?sslmode=disable`
- DevOps: Docker para frontend y backend, Easypanel para despliegue, `.env.example` en ambos proyectos
- Analítica: Facebook/TikTok Pixels (browser, diferidos) + CAPI (server) con deduplicación por `event_id`

## 3) Productos
- Vazlina Brisa (Brisa Portátil con Clip)
- Vazlina Mariposa (Auriculares Inalámbricos tipo Mariposa)
- Vazlina Guardián (Cargador Inteligente con Auto-Desconexión)

## 4) Ofertas por producto
- Brisa: 1 = $649 MXN, 2 = $999 MXN, 3 = $1,299 MXN
- Mariposa: 1 = $630.99 MXN, 2 = $999 MXN, 3 = $1,299 MXN
- Guardián: 1 = $502.99 MXN, 2 = $799 MXN, 3 = $999 MXN

## 5) Principios clave
- Autoridad primero: diseño y copy que parezcan la marca #1 de la categoría en México
- Móvil primero, ultrarrápido (scripts diferidos, imágenes optimizadas)
- Conversión obsesiva: carrito como drawer, checkout emergente (5 campos), upsell cronometrado
- Prueba social y garantías visibles (en español MX, tono profesional y humano)
- Datos limpios: deduplicate `Purchase` (Pixel + CAPI) con el mismo `event_id`

## 6) Flujo de conversión (resumen)
1) CTA “Añadir al Carrito” en ficha de producto abre el Drawer con cross-sell (precio normal)
2) CTA “Proceder al Pago” abre popup de checkout con Resumen + 5 campos (validación MX obligatoria):
   - Nombre y Apellido
   - Teléfono
   - Provincia/Estado
   - Ciudad/Municipio
   - Dirección Completa
3) Al enviar: overlay de Upsell (10–15s) con UN producto relevante (único lugar con descuento)
4) Acepta/Rechaza -> Thank You Page + webhook a Google Sheet con toda la orden

## 7) Entregables
- Carpeta `frontend/` (Next.js) + `backend/` (FastAPI) con Docker y `.env.example`
- Script JS (Apps Script) para Google Sheets y plantilla CSV en `docs/sheets/`
- Migración DB corre al iniciar backend
- Píxeles y CAPI implementados con deduplicación
