# Vazlina — Deployment & Go-Live Guide

## 1. Fill in Environment Variables

### Backend (`backend/.env`)
| Variable | Where to get it |
|---|---|
| `FACEBOOK_PIXEL_ID` | Facebook Events Manager → Pixel → Settings |
| `FACEBOOK_CAPI_TOKEN` | Facebook Events Manager → Pixel → Settings → Conversions API → Generate Access Token |
| `TIKTOK_PIXEL_ID` | TikTok Ads Manager → Assets → Events → Web Events → Pixel ID |
| `TIKTOK_CAPI_TOKEN` | TikTok Ads Manager → Assets → Events → Web Events → Generate Token |
| `GOOGLE_SHEET_WEBHOOK_URL` | See step 2 below |

### Frontend (`frontend/.env`)
Change `NEXT_PUBLIC_API_URL` from `http://localhost:8000` to `https://api.vazlina.shop` before building for production.

---

## 2. Google Sheets Setup

1. Go to [sheets.google.com](https://sheets.google.com) → create a new spreadsheet named **Vazlina Orders**
2. In the spreadsheet: **Extensions → Apps Script**
3. Delete any existing code and paste the entire contents of `docs/scripts/apps_script.gs`
4. Click **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** → copy the **Web App URL**
6. Paste the URL into `backend/.env` as `GOOGLE_SHEET_WEBHOOK_URL`

---

## 3. Deploy with Docker (Easypanel / VPS)

```bash
# On your server, clone the repo then:
docker compose up -d --build
```

The services will start on:
- Frontend: port **3000**
- Backend: port **8000**
- Database: port **5432** (internal only in production)

---

## 4. DNS Configuration

Log into your domain registrar (where you bought `vazlina.shop`) and add:

| Type | Name | Value | Notes |
|---|---|---|---|
| `A` | `@` | `YOUR_SERVER_IP` | Points root domain to server |
| `A` | `www` | `YOUR_SERVER_IP` | www redirect |
| `A` | `api` | `YOUR_SERVER_IP` | Backend API subdomain |

Then set up a **reverse proxy** (nginx or Caddy) on your server:

```nginx
# /etc/nginx/sites-available/vazlina

server {
    server_name vazlina.shop www.vazlina.shop;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    server_name api.vazlina.shop;
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Get SSL certificates:
```bash
certbot --nginx -d vazlina.shop -d www.vazlina.shop -d api.vazlina.shop
```

---

## 5. Replace Placeholder Images

The store currently uses `picsum.photos` random images. Before going live:

1. Add your real product photos to `frontend/public/images/`
2. Update the image paths in:
   - `src/app/page.tsx`
   - `src/app/collections/all/page.tsx`
   - `src/app/products/vazlina-brisa/page.tsx`
   - `src/app/products/vazlina-mariposa/page.tsx`
   - `src/app/products/vazlina-guardian/page.tsx`
3. Remove `picsum.photos` from `remotePatterns` in `next.config.mjs`

---

## 6. Pre-Launch Checklist

- [ ] All `.env` variables filled in (both backend and frontend)
- [ ] Google Sheets webhook URL set and tested
- [ ] Facebook and TikTok pixels firing (use browser extensions to verify)
- [ ] Real product images uploaded
- [ ] DNS A records pointing to server
- [ ] SSL certificate installed
- [ ] Test full checkout flow end-to-end (place a test order, check Sheets)
- [ ] Confirm order appears in DB: `docker exec vazlina_database psql -U vazlina -c "SELECT * FROM orders LIMIT 5;"`
