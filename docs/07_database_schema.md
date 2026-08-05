# Esquema de Base de Datos (PostgreSQL)

Versión: 1.0 (2026-06-24)
DB: `vazlina`

## Tablas

### `orders`
- `id` SERIAL PK
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `customer_name` VARCHAR(255) NOT NULL
- `customer_phone` VARCHAR(20) NOT NULL
- `customer_state` VARCHAR(120) NOT NULL
- `customer_city` VARCHAR(120) NOT NULL
- `customer_address` TEXT NOT NULL
- `is_upsell_accepted` BOOLEAN NOT NULL DEFAULT FALSE
- `total_price` NUMERIC(10,2) NOT NULL
- `status` VARCHAR(50) NOT NULL DEFAULT 'pending_confirmation'
- `browser_event_id` VARCHAR(128) NULL -- para deduplicación CAPI

Índices recomendados:
- INDEX en (`created_at`), (`status`), y parcial en (`customer_phone`) para búsquedas de confirmación.

### `order_items`
- `id` SERIAL PK
- `order_id` INT NOT NULL FK → orders(id) ON DELETE CASCADE
- `product_name` VARCHAR(255) NOT NULL
- `quantity` INT NOT NULL
- `price_per_item` NUMERIC(10,2) NOT NULL

## Migraciones (Alembic)
- Migración inicial crea ambas tablas y FK
- El entrypoint del backend debe ejecutar `alembic upgrade head` antes de iniciar Uvicorn
