# Despliegue y DevOps (Docker + Easypanel)

Versión: 1.0 (2026-06-24)

## 1) Estructura repos
- `frontend/` (Next.js)
- `backend/` (FastAPI)
- `docker-compose.yml` para local

## 2) Dockerfiles
### Frontend
- Node 20-alpine
- Build en etapa 1 (`npm ci && npm run build`)
- Etapa 2 para `npm start` en puerto 3000

### Backend
- Python 3.10-slim
- `pip install -r requirements.txt`
- CMD: `alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 8000`

## 3) Variables de entorno
### frontend/.env.example
```
NEXT_PUBLIC_API_URL=https://api.vazlina.shop
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
```

### backend/.env.example
```
DATABASE_URL=postgres://vazlina:vazlina@vazlina_database:5432/vazlina?sslmode=disable
FRONTEND_URL=https://vazlina.shop
GOOGLE_SHEET_WEBHOOK_URL=
FACEBOOK_CAPI_TOKEN=
TIKTOK_CAPI_TOKEN=
```

## 4) Easypanel
- Crear servicio Backend (api.vazlina.shop → 8000) con ENV anteriores
- Crear servicio Frontend (vazlina.shop → 3000)
- Conectar DB Postgres interna ya existente
 - Verificar que el flujo COD usa exactamente 5 campos requeridos (sin campos extra)

## 5) Local con docker-compose
- Servicios: db, backend, frontend
- Mapear puertos 5432, 8000, 3000
- Volumen para datos de Postgres
 - Prueba end-to-end: crear orden y verificar en DB (orders) y en Sheet que se guardan nombre, teléfono, estado, ciudad y dirección
