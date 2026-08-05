# Prompt: Build Vazlina Homepage — Clone NAMA Beauty Structure & Design

**Reference:** https://namabeauty.shop/  
**Brand:** Vazlina  
**Market:** Mexico COD  
**Products:** Ventilador Portatil (Fan), Cargador Inteligente (Charger), Audifonos TWS (Earbuds)  
**Note to Developer:** You already have all product info, pricing, and descriptions. This prompt gives you the **exact visual structure, layout, and design system** to follow. Rewrite all copy to Mexican Spanish and adapt content to gadgets. Do not copy NAMA's supplement text.

---

## Part 1: Global Design System (Copy Exactly)

### Color Palette
| Token | Hex / Value | Usage |
|-------|-------------|-------|
| **Primary Dark** | #1C1C1E (charcoal) | Primary buttons, announcement bar, CTA banner background, number circles, nav text |
| **Background** | #FAF5F5 (warm pink-white) | Page background, card backgrounds |
| **Accent Gold** | #D4A5A5 (rose gold) | Secondary buttons, star ratings, section labels, quotation marks, accent highlights |
| **Text Primary** | #1A1A1A (soft black) | Headlines, body text |
| **Text Muted** | #6B6B6B | Descriptions, subheadlines, metadata |
| **Card Border** | #E8E0E0 | Subtle borders for cards and badges |
| **White** | #FFFFFF | Text on dark backgrounds, card backgrounds |

### Typography
- **Headlines:** Bold, tight letter-spacing (-0.02em), large sizes. Not playful.
- **Section Labels (micro-headlines):** Uppercase, small (12-14px), letter-spaced (0.15em), Accent Gold color. Example: "VERIFIED REVIEWS", "HOW IT WORKS", "FAQ", "BEGIN YOUR RITUAL"
- **Body:** Clean sans-serif, 16-18px, line-height 1.6, Text Muted color.
- **Prices/Numbers:** Larger than surrounding text, bold, Text Primary.

### Universal Rules
- **Border radius:** 16px for cards, 50px for pill buttons and badges, 12px for smaller elements.
- **Shadows:** Very subtle, soft, large blur. No hard drop shadows. Cards float slightly.
- **Icons:** Minimal line icons or simple geometric shapes. Monochrome (Primary Dark or Accent Gold). NO colorful 3D shields, NO stock badge packs.
- **Why this palette:** Charcoal (`#1C1C1E`) signals tech sophistication. Rose Gold (`#D4A5A5`) signals wearable fashion. Together they balance gadgets (fan, charger) with accessories (earbuds). NOT generic blue SaaS, NOT NAMA's green wellness.
- **Spacing:** GENEROUS. Sections have 80-120px vertical padding. White space is the brand.
- **No gradients.** Solid colors only.
- **No popups.** No spin-to-win. No newsletter overlays. These destroy trust for COD.
- **Direction:** LTR (Left-to-Right). This is a Spanish/Mexican site. NOT Arabic RTL. Logo on LEFT, nav on RIGHT, timeline reads 1→2→3 left to right, arrows point right (→), text-align: left.
- **Mobile-First + Desktop-Perfect:** This site MUST look "wow" on BOTH phone and PC. Mobile is 70% of COD traffic — every section, badge, button, and card must feel native and premium on a 375px screen. Desktop must feel equally polished and spacious. No compromises on either.

### Trust Badge & Pill Sizing Guide (Used Across All Sections)

This guide defines EVERY badge/pill type used on the page. Reference this in each section.

| Badge Type | Container | Icon | Text | Placement |
|-----------|-----------|------|------|-----------|
| **Category/Angle Tag** | White bg, thin border, rounded 50px, padding 4px 12px | 14px left of text | 12-13px, Primary Dark | Top-right of product image |
| **Trust Pill (horizontal row)** | White bg, thin border, rounded 50px, padding 8px 16px | 20px, top-center or left | Label: 14px bold, Primary Dark. Sublabel: 12px, Text Muted | Horizontal row below CTA or in trust bar |
| **Floating Badge (overlapping)** | White bg, rounded 50px, padding 6px 14px, small shadow | 16px left | 13px, Primary Dark | Bottom-left of hero image (overlapping) |
| **Section Pill Badge** | White bg or cream bg, thin border, rounded 50px, padding 4px 12px | Optional 14px | 12px, Text Muted or Accent Gold | Above section label/headline, centered |
| **Stat Badge** | White bg, rounded 12px, border, padding 16px 20px | N/A (large number instead) | Number: 32px bold, Primary Dark. Label: 13px, Text Muted | Horizontal row of 4 |
| **Guarantee Micro-Banner** | White bg, rounded 12px, border, padding 12px 16px | 20px left | 14px, Primary Dark or Text Muted | Below CTA button |
| **"Verificado" Pill** | Light green bg (#dcfce7), rounded 50px, padding 3px 10px | Small checkmark 12px | 12px, green (#16A34A) | Next to reviewer name |
| **Icon Grid Item** | No container (inline) or small pill | 20px, Primary Dark | 13px, Text Muted | Grid below images or in sections |
| **Review Stars** | Inline | 16px each, Accent Gold | No text | Below quote, left side |
| **Trust Bar Item** | No container, or very subtle pill | 24px, Primary Dark | Label: 15px bold. Sublabel: 13px, Text Muted | 4 items evenly spaced |
| **Announcement Badge** | Small icon (16px) + text, inline, no border | 16px, Accent Gold or White | 13px, White or Primary Dark | Inside rotating announcement bar |

**Badge Spacing Rules:**
- Gap between horizontal pills: 8-12px.
- Gap between trust bar items: equal distribution (flex space-between or grid).
- All badges: transition 200ms ease on hover.

---

## Part 2: Section-by-Section Layout (Exact Order)

---

### SECTION 0: Announcement Bar (Full Width, Sticky Top — Rotating Carousel)
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

### SECTION 1: Navigation Bar
**Background:** White or transparent over cream background  
**Height:** ~70px  
**Layout:** Flex row, space-between
- **Left:** Logo "VAZLINA" in bold, Primary Dark text. Small tagline below or beside: "Tecnologia curada para Mexico" in muted text.
- **Right:** Nav links (horizontal): "Inicio", "Coleccion", "Sobre Vazlina", "Contacto". Text Primary, 15px, medium weight. No underline on hover — slight color shift to Primary Dark.
- **Mobile:** Hamburger menu. Logo centered.

---

### SECTION 2: Hero Section (The Most Important Section)
**Background:** Background cream (#FAF5F5)  
**Layout:** Two columns on desktop (50/50). Left = product visual. Right = text + CTAs. Stack on mobile (image on top).

#### Left Column — Product Visual
- **Main image:** Lifestyle product shot of all 3 products together (Fan, Charger, Earbuds) on a clean surface.
  - **Dimensions:** 600x500px or 1.2:1 aspect ratio (slightly wider than tall). Max width 100% of column.
  - **Rounded corners:** 20px.
  - **Shadow:** Soft, large blur, low opacity.
  - **Object-fit:** cover.
  - **Mobile:** Full width, aspect ratio 4:3 (landscape).
- **Floating badge (bottom-left of image, overlapping):** White background, rounded pill, small shadow. Contains: shield icon + text "Garantia 30 Dias · Devolucion sin drama". Text is small (13px), Primary Dark.

#### Right Column — Text & Actions
- **Top pill badge:** Small rounded pill, white background, thin border. Text: "Gadgets inteligentes · Probados en Mexico" with a small checkmark icon. Text is 13px, Primary Dark.
- **Headline (H1):** Massive, bold, Text Primary. "Tecnologia que resuelve problemas reales. Sin complicaciones." (or similar — adapt to your copy).
- **Subheadline:** 18px, Text Muted, max-width 500px. "Tres productos curados. Tres soluciones. Todo con envio gratis, pago contra entrega, y garantia de 30 dias."
- **Trust Badge Row (4 pills):** Horizontal row of 4 small rounded pill containers. Each pill has a small icon on top, bold label below, and smaller description below.
  1. Icon: Shield/check | "Envio Gratis" | "A todo Mexico"
  2. Icon: Hand with peso | "Pago Contra Entrega" | "Sin tarjeta"
  3. Icon: Truck | "Entrega 3-5 Dias" | "Rastreo incluido"
  4. Icon: Refresh | "Garantia 30 Dias" | "Devolucion sin drama"
- **CTA Buttons (2 side by side):**
  - **Primary CTA (LEFT — first in reading order):** Primary Dark background, white text, rounded pill (50px radius). **Height: 56px. Padding: 0 40px.** Font: 16px, bold, Inter. Text: "Descubre la Coleccion →". Arrow icon inside button (16px), pointing RIGHT (→).
    - **Hover state:** Slight brightness increase or very subtle shadow expansion. Arrow shifts RIGHT 2px.
    - **Active/pressed:** Scale to 0.98 for 100ms, then back.
  - **Secondary CTA (right — after primary):** White/cream background, thin border, rounded pill. **Height: 56px. Padding: 0 40px.** Font: 16px, medium, Inter. Text + small icon. Text: "Garantia 30 Dias 🛡️" or similar trust reinforcement.
    - **Hover state:** Background fills with very light cream tint, border darkens slightly.
  - **Gap between buttons:** 16px.
  - **Mobile:** Stack vertically. Primary CTA full width (top). Secondary CTA full width below it.
- **Trust line (small, below buttons):** "Mas de 1,500 mexicanos ya confian en Vazlina" — 14px, Text Muted.

---

### SECTION 3: Product Showcase (3 Product Cards)
**Background:** Background cream (#FAF5F5)  
**Section Label (centered, above):** "LA COLECCION" — uppercase, Accent Gold, letter-spaced, small.  
**Headline (centered):** "Tres productos. Tres soluciones. Un solo estandar." — large, bold.  
**Subheadline (centered, below):** "Cada producto esta probado por nosotros antes de llegar a ti."

**Layout:** 3-column grid on desktop. Full-width cards on mobile (stacked). Gap: 24px.

#### Product Card Structure (replicate for all 3):
- **Card container:** White background, rounded corners (16px), subtle soft shadow, padding 24px.
- **Product image area:** Top of card. Rounded corners (12px) on the image itself. Lifestyle context photo.
  - **Floating angle tag (top-right corner of image):** Small pill badge, white background, thin border. Text: "Confort Portatil · Vazlina Flow" (or equivalent for each product). 12px, Primary Dark.
- **Headline (below image):** Product name. Bold, 20px. Example: "Ventilador Portatil con Clip"
- **Description:** 2-3 lines, Text Muted, 15px. Benefit-focused.
- **Review row:** 5 gold stars + "(287 evaluaciones)" in small Text Muted.
- **Price row:** "Desde $649 MXN" — bold, 18px, Text Primary. Positioned bottom-left.
- **Arrow button (bottom-right):** Circle button, light border, arrow icon inside. Links to product page.

**Product Card Hover States (CRITICAL — NAMA detail):**
- On hover: card lifts slightly (translateY -4px), shadow increases, border darkens subtly.
- **Angle tag** gets a subtle Primary Dark left border (2px, #1C1C1E) to signal "selected/hovered."
- Image scales slightly (1.02) with smooth transition.
- **Cursor changes to pointer** with a subtle "Ver producto" tooltip or text fade-in near the arrow button.
- Arrow button: border darkens or fills with Primary Dark on hover, arrow icon shifts right 2px.
- **Active/selected state:** When clicked, card gets a 2px Primary Dark border ring (same as product page pricing tier selected state).

**Products to include:**
1. Vazlina Flow (Fan) — "Desde $649 MXN"
2. Vazlina Guard (Charger) — "Desde $502.99 MXN"
3. Vazlina Wings (Earbuds) — "Desde $630.99 MXN"

---

### SECTION 4: Brand Pillars (The Trust Engine)
**Background:** Slightly darker cream or very light beige tint. Or keep same cream with a subtle top border.
**Section Label (centered):** "POR QUE VAZLINA" — uppercase, Accent Gold, small, letter-spaced.  
**Headline (centered):** "Una marca, no un marketplace" — large, bold.  
**Subheadline (centered):** "Vazlina se construye sobre cuatro pilares que no negociamos: calidad, transparencia, respaldo, y tu tranquilidad."

**Layout:** 2x2 grid on desktop. Single column on mobile. Gap: 32px. Max-width: 900px, centered.

#### Pillar Block Structure (4 blocks):
Each block:
- **Small icon:** Top-left. Minimal line icon, Primary Dark, 24px.
- **Headline (H3):** Bold, 18px, Text Primary. Example: "Probado antes de vender"
- **Description:** 2 lines, Text Muted, 15px. Example: "Cada producto pasa por pruebas reales en Mexico. No vendemos lo que no usariamos nosotros mismos."

**Pillar 1:** Icon (magnifying glass) | "Probado antes de vender" | "Cada producto pasa por pruebas reales en Mexico. No vendemos lo que no usariamos nosotros mismos."
**Pillar 2:** Icon (document/shield) | "Garantia real, no promesa vacia" | "30 dias de garantia. Si no funciona como esperabas, regresamos tu dinero. Sin preguntas. Sin burocracia."
**Pillar 3:** Icon (hand + check) | "Pago Contra Entrega en todo Mexico" | "Pagas cuando recibes. Recibes cuando confirmas. Sin tarjetas, sin riesgos, sin sorpresas."
**Pillar 4:** Icon (headset) | "Soporte real en Mexico" | "Agentes locales que hablan tu idioma. Confirmacion telefonica, seguimiento por WhatsApp, y atencion post-venta."

---

### SECTION 5: Verified Reviews / Social Proof
**Background:** Background cream (#FAF5F5).  
**Section Label (centered):** "VERIFIED REVIEWS" — uppercase, Accent Gold, small, letter-spaced.  
**Headline (centered):** "Clientes que investigaron antes de comprar" — large, bold.  
**Subheadline (centered):** "La mayoria encontro en Vazlina algo que Amazon y Mercado Libre no les dan: confianza."

**Layout:** 3-column grid on desktop. Single column on mobile. Gap: 24px.

#### Testimonial Card Structure:
- **Card container:** White background, rounded corners (16px), padding 28px, subtle shadow.
- **Top row:**
  - Left: Large quotation mark icon (""), Accent Gold, decorative, 32px.
  - Right: 5 gold stars (Accent Gold color).
- **Quote text:** Italic or normal, 16px, Text Primary, line-height 1.7. 3-4 lines.
- **Bottom row (avatar + info):**
  - **Avatar circle:** 40px circle, Primary Dark background, white initial letter inside (e.g., "M" for Maria). Centered text.
  - **Name:** Bold, 15px, Text Primary.
  - **Detail line:** "32 anos · Ciudad de Mexico · Comprador verificado" — 13px, Text Muted.

**Reviews to include (adapt text, keep structure):**
1. Maria Gonzalez — "Compre el ventilador porque en el metro de CDMX es imposible sobrevivir el verano. Llego en 4 dias, lo pague al recibir, y funciona mejor que los de $200 en la tienda."
2. Carlos Ramirez — "Lo que me convencio fue la llamada de confirmacion. Me hablaron de Mexico, explicaron todo, y me dieron confianza. El cargador funciona exacto como dicen."
3. Ana Morales — "Habia comprado audifonos genericos que duraron una semana. Los Vazlina Wings tienen un mes conmigo, la bateria dura todo el dia, y se ven increibles."

---

### SECTION 6: How It Works (3 Steps)
**Background:** Background cream (#FAF5F5).  
**Section Label (centered):** "HOW IT WORKS" — uppercase, Accent Gold, small, letter-spaced.  
**Headline (centered):** "De tu pedido a tu puerta en 3 pasos" — large, bold.  
**Subheadline (centered):** "Sin pago online. Sin compromiso. Sin riesgo."

**Layout:** 3-column grid on desktop. Single column on mobile. Connected by a thin horizontal line between the cards (desktop only).

#### Step Card Structure:
- **Card container:** White background, rounded corners (20px), padding 32px, subtle shadow. Centered text.
- **Number circle:** Centered at top. 56px circle. Primary Dark background. White number inside (01, 02, 03). The circle has a 3px ring/beige border around it (like a donut).
- **Headline (H3):** Bold, 18px, Text Primary. Centered.
- **Description:** 15px, Text Muted, 3-4 lines. Centered.

**Steps:**
1. "01" | "Elige tu producto" | "Explora la coleccion y selecciona el gadget que necesitas. Agregalo al carrito y continua."
2. "02" | "Confirma tu pedido (sin pagar)" | "Solo necesitamos tu nombre, telefono y direccion. No te pedimos tarjeta. El pago es al recibir."
3. "03" | "Recibe y paga" | "Te llamamos para confirmar. Envia tu pedido. Llega en 3-5 dias. Pagas en efectivo o tarjeta al mensajero."

---

### SECTION 7: Final CTA Banner
**Background:** Primary Dark (#1C1C1E) — full width.  
**Padding:** 80px top and bottom.  
**All text centered, white.**

**Content:**
- **Section Label (small, above headline):** "BEGIN YOUR RITUAL" — uppercase, Accent Gold, letter-spaced, small. (Or in Spanish: "EMPIEZA TU EXPERIENCIA")
- **Headline:** Large, bold, white. "Tu comodidad merece calidad, no mas prueba y error"
- **Subheadline:** 18px, white at 80% opacity. "Pago contra entrega. Envio gratis. Garantia de 30 dias."
- **CTA Button:** Accent Gold (#D4A5A5) background, Primary Dark text, rounded pill (50px). **Height: 56px. Padding: 0 40px.** Font: 16px, bold, Inter. Text: "Ver la Coleccion Completa →". Arrow icon inside (16px).
  - **Hover:** Arrow shifts right 2px, subtle shadow. **Active:** Scale 0.98 (100ms).
- **Trust row (below button, horizontal):** Small white text with tiny icons.
  - "Garantia 30 Dias 🛡️"
  - "Envio Gratis 🚚"
  - "Pago Contra Entrega 💵"
  - "Soporte Local 📞"

---

### SECTION 8: FAQ (Accordion)
**Background:** Background cream (#FAF5F5).  
**Section Label (centered):** "FAQ" — uppercase, Accent Gold, small, letter-spaced.  
**Headline (centered):** "Preguntas antes de ordenar" — large, bold.  
**Subheadline (centered):** "Todo lo que necesitas saber antes de pagar contra entrega."

**Layout:** Single column, max-width 800px, centered.

#### Accordion Item Structure:
- **Container:** White background, rounded corners (12px), thin border (#E8E0E0). Margin-bottom 12px.
- **Question row (collapsed):** Padding 20px 24px. Flex row, space-between.
  - Left: Question text, 16px, Text Primary, medium weight.
  - Right: "+" icon (or chevron). Rotates to "×" when open.
- **Answer (expanded):** Padding 0 24px 20px 24px. Text Muted, 15px, line-height 1.7. Smooth height animation.

**FAQ Items (8 questions):**
1. "¿Es seguro comprar con pago contra entrega?" — "Completamente. Solo pagas cuando el paquete llega a tu puerta. No pedimos tarjeta ni deposito. Confirmamos tu pedido por telefono antes de enviar."
2. "¿Cuanto tarda el envio?" — "3 a 5 dias habiles en las principales ciudades (CDMX, Guadalajara, Monterrey, Puebla, Queretaro). 5 a 7 dias para el resto del pais. Siempre gratis."
3. "¿Que pasa si no me gusta el producto?" — "Tienes 30 dias de garantia. Si no cumple lo que prometimos, te devolvemos tu dinero. Sin burocracia, sin preguntas incómodas."
4. "¿Tienen soporte en Mexico?" — "Si. Nuestro equipo de confirmacion llama desde numeros locales. Tambien respondemos por WhatsApp. No somos una empresa fantasma."
5. "¿Por que deberia comprar en Vazlina y no en Amazon?" — "Amazon vende de todo. Nosotros solo vendemos lo que probamos. Cada producto pasa por pruebas reales en Mexico. Ademas, ofrecemos soporte local y garantia directa."
6. "¿Los productos tienen garantia?" — "Si. 30 dias de garantia desde que recibes tu pedido. Si falla, lo cambiamos o te regresamos tu dinero."
7. "¿Puedo pedir mas de una unidad?" — "Claro. En la pagina del producto puedes seleccionar cantidad. Tambien te ofrecemos precios especiales si compras 2 o 3 unidades del mismo producto."
8. "¿Que metodos de pago aceptan al entregar?" — "Efectivo o tarjeta de debito/credito al momento de la entrega. El mensajero lleva terminal."

---

### SECTION 9: Sticky Trust Bar (Between FAQ and Footer)
**Background:** Slightly lighter cream or very light beige. Full width. Border-top: 1px solid #E8E0E0.  
**Padding:** 24px vertical.

**Layout:** 4-column on desktop, 2x2 grid on mobile. Evenly spaced.

**Trust Items (each = small icon + bold text + small description):**
1. Icon (checkmark in circle) | "Garantia 30 Dias" | "Devolucion sin drama"
2. Icon (truck) | "Envio Gratis" | "3-5 dias a todo Mexico"
3. Icon (hand with peso) | "Pago Contra Entrega" | "Pagas al recibir"
4. Icon (headset) | "Soporte Local" | "WhatsApp y llamada"

Style: Icons are Primary Dark, 24px. Text is centered. Headline is 15px bold. Description is 13px Text Muted.

**Shipping partners mention (small text, centered below trust items):** "Enviamos via: DHL · FedEx · Estafeta · RedPack · Correos de Mexico" — 12px, Text Muted.

---

### SECTION 10: Footer
**Background:** Background cream (#FAF5F5) or very light beige. Border-top: 1px solid #E8E0E0.  
**Padding:** 60px top, 32px bottom.

**Layout:** 4 columns on desktop. 2x2 on tablet. Stacked on mobile.

#### Column 1: Brand Block (wider than others, takes 30% width)
- **Logo:** "VAZLINA" in bold, Primary Dark.
- **Tagline:** "Tecnologia curada para Mexico. Gadgets inteligentes probados localmente, con pago contra entrega, soporte real, y garantia que cumplimos." — 14px, Text Muted.
- **Small badges row (below tagline):** 3 small pill badges, very subtle.
  - "Probad en Mexico"
  - "Soporte Local"
  - "Garantia 30 Dias"

#### Column 2: Products
- Headline: "Productos" — 16px, bold, Text Primary.
- Links (Text Muted, 14px):
  - "La Coleccion"
  - "Vazlina Flow — Ventilador Portatil"
  - "Vazlina Guard — Cargador Inteligente"
  - "Vazlina Wings — Audifonos TWS"

#### Column 3: Legal
- Headline: "Legal" — 16px, bold.
- Links:
  - "Aviso de Privacidad"
  - "Terminos y Condiciones"
  - "Politica de Envio"
  - "Sobre Vazlina"

#### Column 4: Support
- Headline: "Soporte" — 16px, bold.
- Links:
  - "Contacto"
  - "WhatsApp" (link to wa.me)
  - "[email]"
  - "Preguntas Frecuentes"

#### Bottom Bar (full width, below columns, separated by top border):
- **Left:** "Envio solo dentro de Mexico · Pago Contra Entrega · Enviamos via DHL, FedEx, Estafeta" — 13px, Text Muted.
- **Right:** "© 2026 Vazlina. Todos los derechos reservados." — 13px, Text Muted.

---

## Part 3: Mobile-Specific Rules

1. **Announcement bar:** Same, text may scroll if too long.
2. **Hero:** Stacked. Image on top, text below. Trust badges become 2x2 grid. CTA buttons stack vertically (primary on top).
3. **Product cards:** Full-width, stacked vertically. One card per row.
4. **Brand pillars:** Single column.
5. **Reviews:** Single column, stacked.
6. **How it works:** Single column. Number circles remain centered. Connecting line becomes vertical or disappears.
7. **FAQ:** Full-width accordion. Padding slightly reduced.
8. **Sticky trust bar:** 2x2 grid or horizontal scroll.
9. **Footer:** Single column, all sections stacked.
10. **Sticky footer (optional but recommended):** On mobile only, a sticky bottom bar with 2 items: "Contacto por WhatsApp" and "Ver Coleccion". Background: White. Border-top: 1px solid #E8E0E0.

---

## Part 4: What NOT to Do (Critical)

- **NO generic trust badge packs.** No colorful 3D shields, no "Secure Checkout" with credit card logos, no Norton/McAfee badges. Mexico COD customers don't care about Stripe — they care about "Pago Contra Entrega."
- **NO more than 2 colors + neutrals.** Do not use blue, red, purple, green, orange anywhere. Only: Charcoal Primary (`#1C1C1E`), Rose Gold Accent (`#D4A5A5`), warm pink-white background, black, gray.
- **NO gradients on buttons or backgrounds.** Solid colors only.
- **NO popups, spinners, or newsletter overlays.** These scream "scam" to COD buyers.
- **NO Spain Spanish.** Use Mexican Spanish: "pedido" not "encargo," "celular" not "movil," "corre" not "funciona," "apartado" not "carrito" (use "carrito"), "dinero" not "efectivo" (use both).
- **NO hard sales language.** NAMA never says "BUY NOW LIMITED TIME." They say "Explore the clinical gummies." Use soft authority: "Descubre la coleccion," "Explora," "Conoce."
- **NO fake urgency on homepage.** Save urgency for the cart drawer and upsell screen only.

---

## Part 5: Copywriting Notes for Developer

You have full freedom to rewrite all text. The examples above are guides. Keep these tones:
- **Headlines:** Authoritative but warm. Not aggressive. Not playful.
- **Descriptions:** Benefit-first, not spec-first. Don't say "1200mAh battery." Say "8 hours of cool air without recharging."
- **Trust language:** Specific and concrete. Not "best quality." Say "tested before selling."
- **FAQ:** Answer the #1 Mexico COD fear: "Is this a scam?" Head-on.

---

*This prompt replicates the exact visual structure, spacing, component design, and branded psychology of https://namabeauty.shop/ for the Vazlina gadget brand in Mexico.*
