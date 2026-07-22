# LUVIT — Abaya Shop Demo

**Status:** ✅ Done (demo, ready to show)

A fully self-contained demo e-commerce website for **LUVIT** (@luvit_om), an
Instagram-based abaya shop in Oman — plus a working **admin panel**. Built with plain
HTML/CSS/JS: no backend, no build step, no external requests. All prices are in
**Omani Rial (OMR)** with correct 3-decimal (baisa) formatting.

Based on the Dukhoon bakhoor demo (`sites/02-bakhoor-shop/`), reworked with a light,
warm "terracotta & clay" design built around LUVIT's real Instagram logo colours:

- real stock photography for 11 of the 12 products (freely-licensed Unsplash
  photos), with generated SVG garment art (draped, button-front,
  embroidered-panel, wide kimono-sleeve, kaftan and folded shawl/hijab
  silhouettes across 8 realistic abaya colourways) as the fallback for any
  product without a suitable photo
- a subtle **shimmer** animation on embroidered/beaded product art only
- the same **scroll-reveal** and button/cart-badge polish as the bakhoor demo
- LUVIT's real logo photo, embedded as a circular badge, used as the header/footer
  logo and browser favicon
- everything respects `prefers-reduced-motion`

## What's inside

**Storefront** (`index.html`)
- Home page: warm terracotta hero with a faint mandala watermark, USP strip,
  bestsellers, full catalogue with category filter (Classic Abayas / Embroidered
  Abayas / Occasion & Evening / Kaftans / Hijabs & Shawls) + search
- Product details page (`product.html?id=…`): price, stock, quantity, description /
  fabric & care / styling tips, related products
- Cart (`cart.html`): quantities, free-delivery threshold (35.000 OMR, otherwise
  2.000 OMR delivery fee)
- Checkout (`checkout.html`): delivery form → **fake payment gateway** with a live
  card preview → animated processing → **success** (order number) or **declined**
  screen
  - Demo rule: any card works; a card number ending in **0000** is declined
- **English ⇄ Arabic** toggle on every page; Arabic flips the full layout to RTL
  (brand name stays "LUVIT" in both languages). You can also force a language via
  URL: `?lang=ar` / `?lang=en`

**Admin panel** (`admin/index.html`)
- Sign in — demo credentials: **admin / luvit123** (shown on the login card)
- Dashboard: revenue (OMR), orders, products, low-stock stats + recent orders
- Products: add / edit / delete with a live product-art preview (garment shape +
  colour theme); changes appear in the shop immediately
- Orders: every checkout order lands here; change status (New → Shipped → Delivered)

## How it works

`localStorage` acts as the database (`assets/js/db.js` seeds demo products and
orders on first visit) under `luvit_*` keys, so it never clashes with the Omshtha
or Dukhoon demos in the same browser. Placing an order reduces stock and shows up
in the admin panel. To reset the demo, clear the site's browser storage
(DevTools → Application → Local Storage → delete `luvit_*` keys) and refresh.

Product visuals are real photos where available (`assets/img/products/`, sourced
from freely-licensed Unsplash stock photography — no real LUVIT product photos
existed yet) and fall back to generated SVG illustrations (`assets/js/art.js`) for
any product without a good photo match (currently just the olive beaded abaya,
since no suitable modest-fashion stock photo was found). In the admin panel each
product has an optional "photo URL/path" field (`img`) — leave it blank to use the
generated art, or point it at a file in `assets/img/` to use a real photo.

## Preview

```bash
cd sites/03-abaya-shop
python3 -m http.server 8000
# shop:  http://localhost:8000
# admin: http://localhost:8000/admin/
```

## Swapping in the real logo

`assets/img/logo.svg` and `assets/img/favicon.svg` already embed LUVIT's real
Instagram profile photo (a base64-encoded JPEG inside an SVG wrapper, circularly
clipped) — every page references those two files. Replace them the same way if the
photo changes: re-export/resize the source image, base64-encode it, and drop it
into the `<image href="data:image/jpeg;base64,...">` inside each SVG.

> Demo website — no real orders or payments are processed.
