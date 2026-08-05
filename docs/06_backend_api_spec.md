# Especificación Backend (FastAPI)

Versión: 1.0 (2026-06-24)

## 1) Principios
- FastAPI + Pydantic v2
- SQLAlchemy + Alembic
- CORS: permitir `https://vazlina.shop`

## 2) Modelos (Pydantic)
```python
from pydantic import BaseModel, Field
from typing import List

class OrderItemIn(BaseModel):
    product_name: str
    quantity: int
    price_per_item: float

class OrderCreateIn(BaseModel):
    customer_name: str = Field(min_length=2)
    customer_phone: str
    customer_state: str
    customer_city: str
    customer_address: str
    items: List[OrderItemIn]
    is_upsell_accepted: bool = False
    total_price: float
    browser_event_id: str | None = None  # para deduplicación CAPI

class OrderOut(BaseModel):
    order_id: int
    status: str
    total_price: float
    class Config:
        from_attributes = True
```

## 3) Endpoints
- `POST /orders/` → crea orden, guarda items, dispara webhook a Google Sheets (async) y cola CAPI
  - 201 { order_id, status: "pending_confirmation", total_price }
- `GET /health/` → { status: "ok" }

## 4) Webhook Google Sheets
- ENV `GOOGLE_SHEET_WEBHOOK_URL`
- Payload (JSON plano): timestamp, order_id, customer_name, customer_phone, customer_state, customer_city, customer_address, products_ordered (string), total_price, is_upsell_accepted

## 5) CAPI (server-side)
- En segundo plano: enviar `Purchase` a Facebook/TikTok con **SHA-256** de PII
- Usar `browser_event_id` recibido para deduplicación
- ENV tokens: `FACEBOOK_CAPI_TOKEN`, `TIKTOK_CAPI_TOKEN`

## 6) Errores
- Validación 422 con mensajes claros en ES-MX
- Logging estructurado (json) para órdenes y webhooks

## 7) Notas de validación y alcance de datos
- Los únicos campos de cliente aceptados: `customer_name`, `customer_phone`, `customer_state`, `customer_city`, `customer_address`.
- Validar mínimos de longitud (>=2) para state/city, (>=5) para address.
- No aceptar ni persistir campos adicionales de cliente.
