# Master Prompt v2: Vazlina Product Page (Exact NAMA Beauty Structure)

**Reference:** https://namabeauty.shop/products/astaxanthin-gummies  
**Brand:** Vazlina  
**Market:** Mexico COD  
**Products:** Vazlina Brisa (Fan), Vazlina Mariposa (Earbuds), Vazlina Guardián (Charger)  

**Note to Developer:** You have all product info in `docs/`. This prompt gives you the **exact section order, layout, component design, and visual details** from NAMA's product pages. Rewrite all copy for gadgets.

---

## Part 1: Design System

| Token | Hex | Usage |
|-------|-----|-------|
| Primary / CTA | `#1C1C1E` (charcoal) | Buttons, active states, links, announcement bar, dark sections |
| Background | `#FAF5F5` (warm pink-white) | Page background |
| Accent / Rose Gold | `#D4A5A5` | Secondary buttons, star ratings, section labels, quotation marks, accent highlights |
| Card BG | `#FFFFFF` | Cards, content blocks |
| Text Primary | `#1A1A1A` | Headlines, body |
| Text Muted | `#6B6B6B` | Subheadlines, descriptions |
| Borders | `#E5E5E5` | Card borders, dividers |
| Success | `#16A34A` | Guarantees, checkmarks |
| Danger | `#DC2626` | X icons, problems (sparingly) |
| Typography | Manrope (headlines), Inter (body) | — |
| Icons | Lucide, monochrome | — |
| Border Radius | Cards 16px, Buttons 8px, Pills 50px | — |
| **Direction** | LTR (Left-to-Right) | Spanish/Mexican site. NOT Arabic RTL. Logo left, nav right, timeline 1→2→3 left to right, arrows point right (→). |
| **Mobile-First + Desktop-Perfect** | MUST look "wow" on both | Mobile is 70% of COD traffic — every section, badge, button, card must feel native and premium on 375px. Desktop must feel equally polished. No compromises. |
| **Why this palette** | Charcoal + Rose Gold | Signals tech sophistication + wearable fashion. Balances gadgets (men) with accessories (women). NOT generic blue SaaS. |

### Trust Badge & Pill Sizing Guide (Used Across All Sections)

| Badge Type | Container | Icon | Text | Placement |
|-----------|-----------|------|------|-----------|
| **Category/Angle Tag** | White bg, thin border, rounded 50px, padding 4px 12px | 14px left of text | 12-13px, Primary Dark | Top-right of product image (cross-sell) or above H1 (hero) |
| **Trust Pill (horizontal row)** | White bg, thin border, rounded 50px, padding 8px 16px | 20px, top-center or left | Label: 14px bold, Primary Dark. Sublabel: 12px, Text Muted | Below pricing tiers, below CTA |
| **Floating Badge (overlapping)** | White bg, rounded 50px, padding 6px 14px, small shadow | 16px left | 13px, Primary Dark | Bottom-left of hero image |
| **Section Pill Badge** | White bg or cream bg, thin border, rounded 50px, padding 4px 12px | Optional 14px | 12px, Text Muted or Accent Gold | Above section label, centered |
| **Stat Badge** | White bg, rounded 12px, border, padding 16px 20px | N/A (large number instead) | Number: 32px bold, Primary Dark. Label: 13px, Text Muted | Horizontal row of 4 (trust block) |
| **Guarantee Micro-Banner** | White bg, rounded 12px, border, padding 12px 16px | 20px left | 14px, Primary Dark | Below CTA button |
| **"Verificado" Pill** | Light green bg (#dcfce7), rounded 50px, padding 3px 10px | Small checkmark 12px | 12px, green (#16A34A) | Next to reviewer name |
| **Icon Grid Item** | No container (inline) or small pill | 20px, Primary Dark | 13px, Text Muted | Grid below images, 4-6 items |
| **Review Stars** | Inline | 16px each, gold/yellow | No text | Below quote, left side |
| **Summary Bar Pills** | White/light bg inside dark card, rounded 50px, padding 6px 12px | Small checkmark 12px | 13px, dark text | Inside comparison summary bar |
| **Process Step Icon** | Colored circle (40px), icon inside (20px, white) | 20px, white, centered | N/A (icon only) | Right side of process step cards |
| **FAQ Checkmark** | Small check icon 16px, Text Muted | 16px | N/A | Left of each FAQ question |
| **Exclusion Pill** | Light gray bg, rounded 50px, padding 4px 10px | Small X or check 12px | 12px, Text Muted | Grid of "what's NOT in the product" |
| **City Tag** | White bg, border, rounded 50px, padding 4px 10px | Small checkmark 12px | 12px, Primary Dark | Horizontal row in COD section |
| **Sticky Bar Thumbnail** | 40x40px, rounded 8px, object-fit cover | N/A | N/A | Left side of sticky bar |
| **Announcement Badge** | Small icon (16px) + text, inline, no border | 16px, white | 13px, white | Inside rotating announcement bar |
| **Trust Bar Item** | No container, or very subtle pill | 24px, Primary Dark | Label: 15px bold. Sublabel: 13px, Text Muted | 4 items evenly spaced (footer trust bar) |

**Badge Spacing Rules:**
- Gap between horizontal pills: 8-12px.
- Gap between trust bar items: equal distribution (flex space-between or grid).
- All badges: transition 200ms ease on hover.

---

## Part 2: Section-by-Section (Exact Order)

---

### SECTION 1: Announcement Bar (Rotating Carousel)
Sticky top. Full width. Dark bar, white text.
**Background:** Primary Dark (#1C1C1E) — full width, sticky top, z-index above all content.
**Height:** ~44px
**Behavior:** Rotating message carousel. ONE message visible at a time. Slides horizontally or fades to next message every **3 seconds**. Smooth transition (300ms ease).
**Text:** White, centered, 14px, medium weight.
**Badge per message:** Small 16px icon inline before text, same color as text (white). No background pill — icon sits directly inline.

**Message Sequence (cycles every 3s):**
1. 🚚 "Envio gratis a todo Mexico" (truck icon)
2. 💰 "Pago contra entrega — Sin tarjeta" (hand/peso icon)
3. 🕐 "Entrega en 3-5 dias habiles" (clock/delivery icon)
4. 🛡️ "Garantia 30 dias — Devolucion sin drama" (shield icon)

**Mobile:** Same behavior. Swipe gesture optional (left/right to manually cycle).
**First load:** Message 1 visible immediately. No blank state.
**Loop:** After message 4, returns to message 1 seamlessly.

---

### SECTION 2: Navigation Bar
Same as homepage. Logo left, links right, cart icon.

---

### SECTION 3: Hero — Product Title + Gallery + Pricing Tiers + CTA

**Layout:** Two columns desktop (50/50). Left = gallery. Right = info. Stack on mobile.

#### Left — Product Gallery
- **Main image:**
  - **Dimensions:** 500x500px or 1:1 square aspect ratio. Max width 100% of left column.
  - **Rounded corners:** 16px.
  - **Object-fit:** cover.
  - **Lifestyle context:** Product in real use (fan clipped to desk, earbuds worn, charger on nightstand).
  - **Mobile:** Full width, aspect ratio 1:1 square or 4:3 landscape.
- **Small stat pills (above or below main image, horizontal row):** 4-5 small pill badges with icons. These are key product specs made visual.
  - Example Brisa: [Battery icon] "Bateria 8 horas" | [Leaf/Shield icon] "Motor sin escobillas" | [USB icon] "USB-C" | [Volume icon] "25dB Silencioso" | [Scale icon] "160g"
  - Style: Small pills, white bg, thin border, rounded 50px, 12px text, Text Muted. Icon 14px left of text.
- **Thumbnails (desktop):**
  - **Dimensions:** 80x80px or 1:1 square. 3-4 thumbnails in horizontal row below main image.
  - **Rounded corners:** 8px.
  - **Border:** 2px transparent. Active/hover = Primary Dark border.
  - **Gap:** 12px between thumbnails.
- **Mobile:** Swipeable carousel with dot indicators. No thumbnails.

#### Right — Product Info

1. **Pill badge:** "Confort Portatil · Vazlina Brisa" — small, white bg, thin border, rounded 50px, 13px text.
2. **H1:** Emotional benefit. "Tu alivio personal contra el calor."
3. **Subheadline:** 2 lines max. "Potente, silencioso y portatil para el metro, la oficina o donde lo necesites."
4. **Urgency text (small, below subheadline, pink/muted red or Text Muted):** "Solo esta semana: envio gratis a todo Mexico" — 14px. Small clock or truck icon left. NOT a countdown timer.
5. **Rating row:** "4.8/5 (287 evaluaciones · verificadas) · Desde $649 MXN / unidad" — Star icon + rating + dot separator + review count + dot + price per unit. 14-15px, Text Muted. The "verificadas" or "mexicanos reales" part is important for trust.
6. **Pricing Tiers (3 selectable cards):**

   **Vertical stack of 3 radio-style cards.** Selected = Primary Dark border ring.

   | 1 unidad | 2 unidades (POPULAR) | 3 unidades |
   |----------|---------------------|------------|
   | 1x Ventilador | 2x Ventilador | 3x Ventilador |
   | $649 MXN | $999 MXN | $1,299 MXN |
   | | Ahorras $299 | Ahorras $648 |

   **Tier labels (exact NAMA style):**
   - 1 unit: no special label, or "Unidad" (standard)
   - 2 units: **"Mas popular"** badge — small pill, Accent Rose Gold bg or Primary Dark border, 12px bold. Positioned top-right of card or above price.
   - 3 units: **"Maximo ahorro"** badge — same style as above but different color (green or Primary Dark).

   **Middle card (2 units) is visually highlighted:**
   - Primary Dark border ring (2px, #1C1C1E)
   - "Mas popular" badge (small pill, Accent Rose Gold, top-right of card)
   - Slightly more shadow
   - **Hover:** Subtle lift (translateY -2px), shadow increases. Cursor pointer. Radio button fills.
   - **Selected state:** Primary Dark ring + slight warm tint on card background (like #FFF5F5 very light pink-white).

7. **Trust pills row:** [Truck] "Envio Gratis" | [Hand] "Pago Contra Entrega" | [Shield] "Garantia 30 Dias" | [Refresh] "Devolucion sin drama"

8. **CTA button (full width):** "Añadir al Carrito" — Primary Dark (#1C1C1E) bg, white text, rounded 8px. **Height: 56px. Font: 16px, bold, Inter.** Full width of right column. Padding inside: 16px vertical, 24px horizontal. Arrow or cart icon (16px) at right side of button text.
   - **Hover state:** Slight brightness increase or shadow expansion. Scale 0.98 on active/pressed (100ms).
   - Below CTA: **"Pago Contra Entrega · Sin tarjeta de credito"** — 14px, Text Muted, centered. Small hand/peso icon left of text.
   - Below that: "Te llamamos para confirmar tu pedido antes de enviarlo." — 13px, even more muted.

9. **Guarantee micro-banner:** Rounded card with border. "La Promesa Vazlina: Si no te encanta, te regresamos tu dinero. Sin preguntas."

10. **Small icon grid:** 4 items. Example Brisa: "Bateria 8h" | "Silencioso 25dB" | "USB-C" | "160g Ligero"

---

### SECTION 4: Problem → Solution

**Percentage Stat Bar (BEFORE the section, full width, light bg):**
- Large bold number + description. Example: "76% de los mexicanos sufren del calor extremo en transporte publico — el ventilador portatil promedio no resuelve el problema."
- Below number: small source citation. "Fuente: estudios de confort termico en Mexico, 2024"
- Style: Background cream/light, padding 24px, centered, rounded 12px or full width band.

**Section pill badge (above label):** "¿Tu tambien?" or "El problema real" — small pill, rounded 50px, 12px, Accent Gold or Text Muted.

**Label:** "PROBLEMAS QUE CONOCES — SOLUCIONES REALES"  
**Headline:** "[Product] no alivia sintomas. Resuelve el problema de raiz."

**Layout:** Left = 4 problem/solution blocks stacked. Right = lifestyle image.

**Each block:**
1. **Problem:** Red X icon (circle with X) + italic quote. *"En el metro de CDMX el calor es insoportable..."*
2. **Solution:** Green check icon + bold headline + 2-line description.

**Right image:**
- **Dimensions:** 500x600px or 5:6 aspect ratio (slightly taller than wide). Max width 100% of right column.
- **Rounded corners:** 16px.
- **Object-fit:** cover.
- **Content:** Lifestyle photo showing problem or solution context (person using product).
- **Optional caption card:** Small dark rounded card (12px) below or overlapping bottom of image with a stat or source citation.

**Hover/interaction:** Problem blocks expand slightly on hover. Solution text gets a subtle Primary Dark left border (2px) on hover to signal "resolved."

---

### SECTION 5: Deep-Dive Features

**Label:** "LA DIFERENCIA ESTA EN LOS DETALLES"  
**Headline:** "Tres decisiones de ingenieria que hacen que [Product] no sea 'otro [category] mas'."

**Layout:** Left = product image + icon grid below. Right = 3 feature cards stacked.

**Left Column — Product Image:**
- **Dimensions:** 500x500px or 1:1 square. Max width 100% of left column.
- **Rounded corners:** 16px.
- **Object-fit:** cover.
- **Content:** Clean product shot on neutral background, or lifestyle context (product in use environment).
- **Below image:** Icon grid with small pill badges (as described below).

**Feature Card:**
- White bg, rounded 12px, border, padding 24px.
- Top: Feature name (H3, bold) left + decorative icon badge right.
- Description: 3-4 lines, Text Muted.
- Bottom: Light gray/charcoal rounded bar inside card. "Resultado: [specific benefit]" + check icon.

**Example Brisa:**
1. Motor sin escobillas — Result: "Flujo de aire constante por anos, no semanas."
2. Bateria 2000mAh — Result: "8 horas de uso. Todo el dia, sin enchufe."
3. Clip universal — Result: "Se queda donde lo pones. Mesa, cabecera, carriola."

**Left image icon grid (below photo):** Small pill badges with checks.
"Sin cables" | "Bateria recargable" | "Duradero" | "Motor sin escobillas" | "Ligero" | "Universal"

**Exclusions Grid (CRITICAL NAMA detail — below feature cards or at bottom of section):**
- Small grid of 6-8 items showing what the product does NOT have/use.
- Format: Small pill/badge with checkmark + text. 2-3 columns.
- Headline above grid: "Lo que NO encontraras en [Product]" or "Sin compromisos."
- Example Brisa:
  - "Sin motores de carbon" | "Sin baterias de 2 horas" | "Sin plastico fragil"
  - "Sin ruido de licuadora" | "Sin enchufe obligatorio" | "Sin app invasiva"
- Style: Light gray/cream bg, rounded 12px container, small text 13px.

---

### SECTION 6: Trust & Authority Block

**Label:** "FORMULA PROBADA, NO PROMESAS VACIAS"  
**Headline:** "Cada [Product] pasa por pruebas reales antes de llegar a tu puerta."

**Layout:**
- **Top row:** 4 stat badges horizontal.
  - White bg, rounded 12px, border. Large number top, description below.
  - Brisa: **12** probados | **8h** bateria | **500+** ciclos | **25dB** silencio

- **Bottom:** Expert quote card.
  - Dark charcoal bg (#1C1C1E), rounded 20px.
  - Large decorative icon (subtle, 20% opacity white).
  - Small pill: "Equipo Vazlina"
  - Quote: "Testeamos este ventilador contra 12 modelos del mercado mexicano..."
  - Attribution: "Equipo Vazlina · CDMX · Ingenieria de producto"

---

### SECTION 7: 30-Day Timeline

**Top pill badge (centered, above label):** "Resultados desde la primera unidad" — small pill, white bg, border, 12px, Text Muted or Accent Gold.

**Label:** "TU EXPERIENCIA CON [PRODUCT]"  
**Headline:** "Tu dia a dia cambia semana a semana — y tu lo sientes antes de que lo notes."
**Subheadline:** "Tu rutina habla antes que tu."

**Timeline Direction (LTR — CRITICAL):** Cards ordered 1 → 2 → 3 from LEFT to RIGHT. NOT 3→2→1 like NAMA's Arabic RTL. The customer reads left to right: first week on the left, last week on the right.

**Connecting line detail:** Between the 3 timeline cards, a thin horizontal line (2px, Text Muted at 30% opacity) runs behind the number circles, connecting them visually from left to right.

**Layout:** 3 cards horizontal, connected by line between number circles. Order: Card 1 (left) → Card 2 (center) → Card 3 (right).

**Card:**
- White bg, rounded 16px, padding 28px.
- Top center: Number circle (48px, dark bg, white number, ring border).
- H3 headline.
- 3-4 lines description.

**Example Brisa:**
1. Semana 1: Alivio inmediato
2. Semana 2: Lo llevas a todas partes
3. Dia 30: No recuerdas como vivias sin el

**Summary bar below:** Full-width rounded card, white, border, padding 20px 32px.
- Left: "La primera unidad te da el resultado. La segunda y tercera lo mantienen — y ahorras hasta $648 MXN." — 15px, Text Primary.
- Right: Heart/gift icon inside a small circle (40px, light charcoal bg, Primary Dark icon).
- **NAMA style note:** The summary bar is a single rounded card, not a dark section.

---

### SECTION 8: Verified Reviews

**Label:** "EXPERIENCIAS REALES"  
**Headline:** "Lo que dicen 1,500+ mexicanos que ya lo probaron."
**Subheadline:** "Resenas verificadas de compradores reales en Mexico. No comentarios genericos."

**Review Card Avatar Detail:**
- Circle 40px. Background: NOT random colors. Use consistent brand colors.
  - Dark bg (#1A1A1A) for all, white initial letter centered.
  - OR: Alternate between Primary Dark (#1C1C1E) and dark bg.
- Initial letter: Bold, 16px, white, centered in circle.

**Layout:** 3 cards horizontal.

**Card:**
- Cream/beige or white bg, rounded 16px, padding 28px.
- Top: Large quotation marks (decorative, accent) left + 5 gold stars right.
- Quote text: 3-4 lines, specific, emotional.
- Bottom: Avatar circle (40px, dark bg, white initial) + name bold + age/city/"Comprador verificado" + green "Verificado ✓" pill.

**Example Brisa:**
- Maria Gonzalez, 32, CDMX — metro review
- Laura Hernandez, 29, Guadalajara — bebe cabecera
- Javier Lopez, 26, Monterrey — repartidor moto

---

### SECTION 9: Comparison (Why Vazlina vs Alternatives)

**Label:** "¿Por que Vazlina es diferente?" — curiosity-driven, NOT aggressive.  
**Headline:** "Todo lo que has probado antes, y por que no funciono."
**Subheadline:** "Cada alternativa tiene un costo escondido. Nosotros te lo mostramos."

**Layout:** 4 cards horizontal (2x2 mobile). Below: dark green summary bar.

**Comparison Card:**
- White bg, rounded 16px, border, padding 24px.
- Top: Alternative name (H3, bold) left + **red warning triangle icon** (⚠️ style, small, muted red) right. NAMA uses a warning triangle inside a light pink circle, NOT a simple X.
- Price range below (muted).
- 3-4 bullets with small red X icons.
- **Hover:** Card lifts slightly, border darkens.

**Example Brisa alternatives:**
1. Ventiladores tianguis ($50-$150) — motor se quema, bateria 2h, plastico fragil, ruidoso
2. Ventiladores escritorio ($300-$600) — necesitan enchufe, ocupan espacio, no portable, cables
3. Aire acondicionado / abanico pared — consume luz, no portable, aumenta recibo
4. Ventiladores "premium" marcas ($800-$1,500) — pagas por logo, mismas specs, sin garantia MX

**Summary Bar (below cards):**
- Dark charcoal bg (#1C1C1E), rounded 16px, full width.
- Left: 4 benefit pills horizontal (scroll on mobile). White/light pills inside dark card.
  "Probad en Mexico ✓" | "Resultado real ✓" | "Garantia 30 dias ✓" | "Ahorro real ✓"
- Right: Small CTA text or arrow. "Elige Vazlina →" white text.

---

### SECTION 10: Guarantee (30 Days)

**Layout:** Centered, max-width 800px. Large rounded card.

**Card:**
- Light bg, rounded 24px, padding 48px, border.
- **Top pill badge:** "Cero riesgo" or "Garantia sin complicaciones" — small pill, white bg, border, heart icon, 12px.
- Headline: "30 dias — o te regresamos tu dinero. Sin preguntas."
- Subheadline: "Pruebalo durante 30 dias. Si no sientes la diferencia, te devolvemos cada peso..."

**Process Steps (3 cards inside, horizontal):**
Each: white bg, rounded 12px, border, padding 16px.
- Left: text. Right: icon in colored circle.
1. "Contactanos" — "En cualquier dia de los 30. WhatsApp o telefono." [Phone icon]
2. "Regresa el producto" — "Aunque este usado. No importa." [Box icon]
3. "Te devolvemos todo" — "En 3-5 dias habiles. Sin descuentos." [Money icon]

---

### SECTION 11: Simplicity (How Easy To Use)

**Label:** "SENCILLEZ"  
**Headline:** "El producto mas facil de usar que tendras."

**Layout:** 4 icon blocks horizontal (2x2 mobile).

**Block:** Icon (32px) + headline bold + description muted.

**Example Brisa:**
1. [USB] "Carga USB-C" — "Mismo cable de tu celular. 2.5 horas."
2. [Gauge] "3 velocidades" — "Baja, media, alta. Para todo momento."
3. [Scale] "160 gramos" — "Menos que tu celular. Cabe en cualquier bolsa."
4. [SmartphoneOff] "Sin app" — "Boton de encendido. Nada mas."

**Stats row below:** Large numbers.
**160g** | **3** velocidades | **2.5h** carga | **<30s** listo

---

### SECTION 12: COD Process

**Label:** "COMO LLEGA TU PEDIDO"  
**Headline:** "Sin pago online. Sin compromiso. Sin riesgo."

**Layout:** 3 steps horizontal. Number circles top-right of each card.

**Step Card:**
- White bg, rounded 16px, padding 24px.
- Number circle (overlapping top-right): dark bg, white number, ring border.
- Icon inside card.
- Headline bold.
- Description.

**Steps:**
1. "01" [Tag] "Elige tu oferta" — "1, 2 o 3 unidades. Agrega al carrito. Sin pagar."
2. "02" [Phone] "Confirma tus datos" — "Nombre, telefono, direccion. Confirmamos por telefono."
3. "03" [Truck] "Recibe y paga" — "3-5 dias. Pagas al mensajero. Solo cuando lo tienes en tus manos."

**City tags below:** Inside a full-width rounded card (white, border, padding 20px).
- Rounded pills with checkmarks: "CDMX ✓" "Guadalajara ✓" "Monterrey ✓" "Puebla ✓" "Queretaro ✓" "+ Mas areas"
- Small text below: "Enviamos a todo Mexico via DHL, FedEx, Estafeta, RedPack y paqueteria local."
- **Shipping partners row:** "Enviamos via: DHL · FedEx · Estafeta · RedPack · Correos de Mexico" — 12px, Text Muted, centered.

---

### SECTION 13: FAQ

**Label:** "ANTES DE ORDENAR"  
**Headline:** "Preguntas antes de ordenar"
**Subheadline:** "Todo lo que necesitas saber sobre [Product name]."

**FAQ Group Labels:**
- "Sobre el producto" — above product questions
- "Envio y pago" — above shipping/payment questions

**Layout:** Single column, max-width 800px, centered.

**FAQ Item:**
- Category label above group: "Sobre el producto" / "Envio y pago"
- Question row: white card, rounded 12px, border.
  - Left: small checkmark or chevron icon.
  - Center: question text (16px, bold).
  - Right: expand/collapse icon.
- Answer: expanded below, Text Muted, 15px.

**NAMA uses checkmark icons on LEFT of each question.** This signals "these are answered/resolved."

**6-8 questions, grouped by category, product-specific.**

**Example Brisa:**
- Sobre el producto:
  1. "¿Cuanto dura la bateria?"
  2. "¿Se puede usar mientras carga?"
  3. "¿El clip funciona en cualquier superficie?"
  4. "¿Es ruidoso? Puedo usarlo en oficina?"
  5. "¿Que incluye la caja?"
  6. "¿Es bueno para bebes?"
- Envio y pago:
  7. "¿Puedo regresarlo si no me gusta?"
  8. "¿Cuanto tarda el envio?"

---

### SECTION 14: Cross-Sell

**Label:** "Descubre mas"  
**Headline:** "Otros productos de Vazlina"
**Subheadline:** "Cada producto resuelve un problema diferente. La coleccion completa funciona mejor."

**Card Detail:** Each cross-sell card has a floating "Ver producto" or "Descubre" button (small pill, border, arrow icon) at top-right of the image area.

**Layout:** 2 cards horizontal (the OTHER 2 products).

**Card:** Same as homepage cards. Image, angle tag, name, description, reviews, price, arrow.

**At original price. No discounts.**

---

### SECTION 15: Trust Bar + Footer
Same as homepage.

---

## Part 3: Sticky Bottom Bar (CRITICAL — Do Not Miss)

**Appears after scrolling past hero.**

**Desktop:** Small bar at bottom. White bg, top border, height ~64px. Left: product thumbnail (40x40px, rounded 8px) + product name (14px, bold) + "Desde $649 MXN" (14px, muted). Right: CTA button.
- **CTA text (product-specific):** "Compra [Product name] ahora · Desde $649 MXN" or just "Añadir al Carrito" with arrow up icon (↗). **Button: height 44px, padding 0 28px, rounded 8px, font 14px bold, Primary Dark (#1C1C1E) bg, white text.**

**Mobile:** Full-width sticky bar at bottom. White bg, top border, height ~64px. Left: thumbnail (40x40px) + name + price. Right: CTA button.
- **CTA text:** "Añadir al Carrito" or "Comprar ahora · $649 MXN". **Button: height 48px, padding 0 24px, rounded 8px, font 14px bold, Primary Dark (#1C1C1E) bg, white text, full width of right side.**

**Behavior:** Clicking opens cart drawer with selected quantity tier.

---

## Part 4: Global Interactions & Animations (NAMA Details)

**Smooth Scrolling:** Native smooth scroll behavior. Sections fade in as user scrolls (subtle opacity 0→1 + translateY 20px→0, duration 400ms, ease-out).

**Card Hover Effects:**
- **All cards** (product, feature, comparison, review): On hover, translateY -4px, shadow increases, border darkens slightly. Transition: 200ms ease.
- **Pricing tier cards:** translateY -2px, radio button fills with Primary Dark.
- **Product cards (cross-sell):** Image scales 1.02, angle tag gets Primary Dark left border.

**Button Interactions:**
- **Hover:** Brightness + shadow increase. Arrow icons shift right 2px.
- **Active/Pressed:** Scale 0.98 for 100ms, then back.
- **Focus:** Primary Dark outline ring (2px) for accessibility.

**Section Transitions:**
- Each section animates in on scroll. Not dramatic — subtle fade + slight upward movement.
- Stagger children: elements within a section appear 100ms apart.

**Sticky Bar Behavior:**
- Appears after user scrolls past hero (trigger: when hero bottom leaves viewport).
- Animation: slide up from bottom (translateY 100% → 0), 300ms ease.
- Disappears if user scrolls back to hero top.

**FAQ Accordion:**
- Smooth height animation (max-height transition, 300ms ease).
- Icon rotation: chevron rotates 180deg, 200ms.

**Image Gallery:**
- Thumbnail click: main image crossfades (opacity transition, 200ms).
- Swipeable on mobile with snap points.

---

## Part 5: Copywriting Rules

1. Never say "high quality." Say what you tested and what happened.
2. Never say "best." Say "tested against 12 alternatives."
3. Always use second person (tu).
4. Lead with emotion, back with fact.
5. Make it local: CDMX metro, Guadalajara heat, Monterrey summers.
6. Quantify everything: "8 hours" not "long battery."
7. Show, don't tell: "One button. No app. Works anywhere."
8. Fear first, then relief.
9. NO spec sheets at top. Specs go in FAQ.
10. NO "50% OFF" banners. Only quantity tier savings.
11. NO countdown timers on product page. Save for upsell.
12. NO popups. No newsletter signup. No spin-to-win.
13. NO credit card logos. Show "Pago Contra Entrega."
14. NO Spain Spanish: "pedido" not "encargo."

---

## Part 6: Per-Product Adaptation Table

| Element | Vazlina Brisa | Vazlina Mariposa | Vazlina Guardián |
|---------|--------------|------------------|------------------|
| Angle | Confort Portatil | Estilo Inalambrico | Proteccion Inteligente |
| H1 | Tu alivio personal contra el calor | Auriculares que completan tu estilo | Proteccion inteligente para tu bateria |
| Pain points | Calor metro, bateria corta, ruido, se cae | Se caen, se ven feos, bateria mala, se pierden | Sobre-carga, calor nocturno, cables genericos |
| 3 key features | Motor sin escobillas, bateria 2000mAh, clip universal | Diseno mariposa, BT 5.3, 24h con estuche | Auto-desconexion, proteccion sobrecarga, compatibilidad universal |
| Timeline | Alivio inmediato, lo llevas a todos lados, indispensable | Primer uso impresionante, uso diario, no usas otros | Primera noche tranquila, confianza, olvidas el miedo |
| Reviews angle | Metro, bebe cabecera, repartidor moto | Regalo, gym, videollamadas | Carga nocturna, familia, oficina |
| Vs alternatives | Tianguis fans, escritorio fans, AC, marcas caras | Genericos TWS, AirPods caros, cables, diadema | Cargadores genericos, marcas caras, power strips, cargar toda noche |
| Simplicity | USB-C, 3 velocidades, 160g, sin app | Emparejamiento auto, touch control, estuche, sin app | Enchufar y listo, LED, proteccion auto, sin config |

---

*This prompt replicates the exact section architecture and visual design of NAMA Beauty product pages. All copy must be rewritten for Vazlina's gadget products and Mexican COD market.*
