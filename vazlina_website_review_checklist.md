# Vazlina Website — Code Review Checklist

## How to use this
Go section by section with your coder. Each item = one task. Check when done.

---

## PART 1: GLOBAL FIXES (Do These First)

### Colors — CRITICAL
- [ ] **Add Rose Gold accent color `#D4A5A5`** to tailwind config + CSS variables. Currently MISSING completely.
- [ ] **Fix background color** from `#F9F8F6` (current) to `#FAF5F5` (warm pink-white per prompt).
- [ ] **Fix subtle/card color** from `#EAE8E4` to match `#FAF5F5` or white cards.
- [ ] **Fix border color** from `#D6D3CF` to `#E8E0E0`.
- [ ] **Update ALL star ratings** from `yellow-400` to Rose Gold `#D4A5A5`.
- [ ] **Update section labels** ("LA COLECCION", "FAQ", etc.) to Rose Gold `#D4A5A5`.
- [ ] **Update quotation marks** in reviews to Rose Gold `#D4A5A5`.
- [ ] **Update CTA Banner button** background to Rose Gold `#D4A5A5`, text to `#1C1C1E`.

### Fonts — CRITICAL
- [ ] **Replace Playfair Display** (serif) with **Manrope** for headlines.
- [ ] **Replace Mulish** with **Inter** for body text.
- [ ] Both fonts in `layout.tsx`, update CSS variables.

---

## PART 2: HOMEPAGE FIXES (page.tsx)

### Announcement Bar — CRITICAL
**Current:** `TrustBar.tsx` shows 3 static items in one row on dark bg.
**Required:** Rotating carousel with 4 messages, ONE at a time, cycling every 3 seconds.

- [ ] Delete current `TrustBar.tsx` or repurpose it.
- [ ] Create new rotating announcement bar: 4 messages, 3s cycle, fade/slide transition.
- [ ] Message 1: 🚚 "Envio gratis a todo Mexico"
- [ ] Message 2: 💰 "Pago contra entrega — Sin tarjeta"
- [ ] Message 3: 🕐 "Entrega en 3-5 dias habiles"
- [ ] Message 4: 🛡️ "Garantia 30 dias — Devolucion sin drama"
- [ ] Each message has inline icon (16px), NO background pill.
- [ ] Background: `#1C1C1E`. Height: ~44px. Sticky top.

### Hero Section — CRITICAL
**Current:** Text-only, centered, no image.
**Required:** Two-column layout (image LEFT, text RIGHT on desktop).

- [ ] **Add left column:** Product lifestyle image (600x500px), rounded-20px, soft shadow.
- [ ] **Add floating badge** on bottom-left of image (overlapping): white pill, shadow, shield icon + "Garantia 30 Dias · Devolucion sin drama".
- [ ] **Add top pill badge** above headline: "Gadgets inteligentes · Probados en Mexico" with checkmark.
- [ ] **Headline:** Keep current or use "Tecnologia que resuelve problemas reales. Sin complicaciones."
- [ ] **Subheadline:** Keep current or use "Tres productos curados. Envio gratis, pago contra entrega, garantia 30 dias."
- [ ] **Trust Badge Row (4 pills):** Below subheadline, horizontal row:
  - [ ] Shield icon | "Garantia 30 Dias" | "Devolucion sin drama"
  - [ ] Hand/Peso icon | "Pago Contra Entrega" | "Sin tarjeta de credito"
  - [ ] Truck icon | "Entrega 3-5 Dias" | "Rastreo incluido"
  - [ ] Refresh icon | "Garantia 30 Dias" | "Devolucion sin drama"
- [ ] **Primary CTA (LEFT):** "Descubre la Coleccion →" — `#1C1C1E` bg, white text, rounded-full, 56px height.
- [ ] **Secondary CTA (RIGHT):** "Garantia 30 Dias 🛡️" — white bg, thin border, rounded-full, 56px height.
- [ ] **Trust line below buttons:** "Mas de 1,500 mexicanos ya confian en Vazlina" — 14px, muted.
- [ ] **Mobile:** Stack vertically. Image on top, then text, then stacked buttons.

### Product Showcase Section
**Current:** Simple 3-column grid with basic cards.
**Required:** Section label + proper cards with tags, stars, prices, arrow buttons.

- [ ] **Section label:** "LA COLECCION" — uppercase, Rose Gold `#D4A5A5`, letter-spaced, small.
- [ ] **Headline:** "Tres productos. Tres soluciones. Un solo estandar."
- [ ] **Subheadline:** "Cada producto esta probado por nosotros antes de llegar a ti."
- [ ] **Product Card fixes:**
  - [ ] Add floating **angle tag** top-right of image: "Confort Portatil · Vazlina Brisa" etc.
  - [ ] Add **review row** with 5 Rose Gold stars + count.
  - [ ] Add **price row**: "Desde $649 MXN" — bold, bottom-left.
  - [ ] Add **arrow button** bottom-right: circle, light border, arrow icon, links to product page.
  - [ ] **Hover:** card lifts (translateY -4px), shadow increases, angle tag gets `#1C1C1E` left border (2px), image scales 1.02, arrow button fills.

### Brand Pillars / Authority Block
**Current:** `WhyBuyFromUs.tsx` — 4 generic icon boxes with titles.
**Required:** Section 4 from prompt — 4 stat badges + expert quote card.

- [ ] **Rename/rebuild** to match "Brand Pillars" structure.
- [ ] **4 stat badges** horizontal: large number (32px bold) + description.
  - Example: "12 probados" | "8h bateria" | "500+ ciclos" | "25dB silencio"
- [ ] **Expert quote card** below: dark charcoal bg `#1C1C1E`, rounded-20px, large decorative icon (20% opacity white), "Equipo Vazlina" pill, quote text, attribution.

### Reviews Section
**Current:** Simple cards with gray circle placeholder.
**Required:** Section 5 from prompt — proper review cards.

- [ ] **Section label:** "VERIFIED REVIEWS" — uppercase, Rose Gold.
- [ ] **Headline:** "Clientes que investigaron antes de comprar"
- [ ] **Subheadline:** "La mayoria encontro en Vazlina algo que Amazon y Mercado Libre no les dan: confianza."
- [ ] **Review Card fixes:**
  - [ ] Large **quotation marks** (decorative, 32px, Rose Gold `#D4A5A5`) top-left.
  - [ ] 5 **Rose Gold** stars top-right.
  - [ ] **Avatar circle** (40px): `#1C1C1E` bg, white initial letter (bold, 16px), centered.
  - [ ] Name bold + age/city + **green "Verificado ✓" pill**.
  - [ ] Quote text: 3-4 lines, specific, emotional (use existing quotes).

### How It Works Section — MISSING
**Current:** Not implemented.
**Required:** Section 6 from prompt.

- [ ] **Create new section** "How It Works".
- [ ] **Section label:** "HOW IT WORKS" — uppercase, Rose Gold.
- [ ] **Headline:** "De tu pedido a tu puerta en 3 pasos"
- [ ] **Subheadline:** "Sin pago online. Sin compromiso. Sin riesgo."
- [ ] **3 step cards** horizontal (stack on mobile), connected by thin horizontal line.
- [ ] **Number circle** (56px): `#1C1C1E` bg, white number, 3px ring/beige border.
- [ ] Card 1: "01" | "Elige tu producto" | description
- [ ] Card 2: "02" | "Confirma tu pedido (sin pagar)" | description
- [ ] Card 3: "03" | "Recibe y paga" | description
- [ ] **Mobile:** Vertical stack, connecting line becomes vertical or disappears.

### Final CTA Banner — MISSING
**Current:** The COD explainer section at bottom uses `#1C1C1E` bg, but structure is wrong.
**Required:** Section 7 from prompt.

- [ ] **Full width, `#1C1C1E` bg**, 80px vertical padding.
- [ ] **Label:** "EMPIEZA TU EXPERIENCIA" — uppercase, Rose Gold `#D4A5A5`.
- [ ] **Headline:** "Tu comodidad merece calidad, no mas prueba y error" — white, large, bold.
- [ ] **Subheadline:** "Pago contra entrega. Envio gratis. Garantia de 30 dias." — white 80% opacity.
- [ ] **CTA Button:** Rose Gold `#D4A5A5` bg, `#1C1C1E` text, rounded-full, 56px height, "Ver la Coleccion Completa →".
- [ ] **Trust row below:** 4 small white text items with icons.

### FAQ Section
**Current:** `HomeFaq.tsx` exists but missing header/structure.
**Required:** Section 8 from prompt.

- [ ] **Add section header:**
  - [ ] Label: "FAQ" — uppercase, Rose Gold.
  - [ ] Headline: "Preguntas antes de ordenar"
  - [ ] Subheadline: "Todo lo que necesitas saber antes de pagar contra entrega."
- [ ] **Accordion item fixes:**
  - [ ] White bg card, rounded-12px, thin border `#E8E0E0`.
  - [ ] **Checkmark icon** on LEFT of each question (signals resolved).
  - [ ] "+" icon right, rotates to "×" when open.
  - [ ] Smooth height animation.

### Sticky Trust Bar (Between FAQ and Footer) — MISSING
**Current:** `StickyTrustBar.tsx` is a fixed bottom bar (wrong placement).
**Required:** Section 9 from prompt — section between FAQ and footer.

- [ ] **Create new component** for the section trust bar (NOT sticky/fixed).
- [ ] Background: slightly lighter cream, border-top `#E8E0E0`.
- [ ] 4 columns desktop, 2x2 mobile:
  - [ ] Checkmark circle | "Garantia 30 Dias" | "Devolucion sin drama"
  - [ ] Truck | "Envio Gratis" | "3-5 dias a todo Mexico"
  - [ ] Hand/peso | "Pago Contra Entrega" | "Pagas al recibir"
  - [ ] Headset | "Soporte Local" | "WhatsApp y llamada"
- [ ] **Shipping partners** below: "Enviamos via: DHL · FedEx · Estafeta · RedPack · Correos de Mexico"

### Footer
**Current:** Dark bg (`bg-neutral-text` = probably black).
**Required:** Section 10 from prompt — warm cream footer.

- [ ] **Change background** to `#FAF5F5` or very light beige.
- [ ] **Border-top:** `#E8E0E0`.
- [ ] **Column 1 (Brand block, 30% width):**
  - [ ] Logo "VAZLINA" bold, `#1C1C1E`.
  - [ ] Tagline: "Tecnologia curada para Mexico..."
  - [ ] 3 small pill badges: "Probad en Mexico" | "Soporte Local" | "Envio Gratis"
- [ ] **Columns 2-4:** Links (Coleccion, Sobre, Contacto, Legal).

### Sticky Bottom Bar (Mobile Only) — MISSING
**Current:** `StickyTrustBar.tsx` is fixed bottom but wrong design.
**Required:** Mobile-only sticky bar.

- [ ] Show ONLY on mobile (< md breakpoint).
- [ ] White bg, border-top, ~64px height.
- [ ] 2 items: "Contacto por WhatsApp" | "Ver Coleccion".

---

## PART 3: ANIMATIONS & INTERACTIONS (Global)

- [ ] **Smooth scrolling:** Native `scroll-behavior: smooth`.
- [ ] **Section fade-in:** On scroll, sections animate opacity 0→1 + translateY 20px→0, 400ms ease-out.
- [ ] **Stagger children:** Elements within section appear 100ms apart.
- [ ] **Card hover (all):** translateY -4px, shadow increases, border darkens, 200ms ease.
- [ ] **Button hover:** Brightness + shadow increase, arrow shifts right 2px.
- [ ] **Button active:** Scale 0.98 for 100ms.
- [ ] **Announcement bar:** Smooth fade/slide between messages, 300ms ease.

---

## PART 4: HEADER FIXES (Header.tsx)

- [ ] **Logo:** Text-only "VAZLINA" bold, `#1C1C1E`. Remove the "V" circle icon.
- [ ] **Add tagline** below/beside logo: "Tecnologia curada para Mexico" — muted, small.
- [ ] **Nav links:** "Inicio" | "Coleccion" | "Sobre Vazlina" | "Contacto".
- [ ] **Hover:** Slight color shift to `#1C1C1E`, NO underline.
- [ ] **Mobile:** Hamburger menu, logo centered.

---

## PART 5: WHAT TO REMOVE

- [ ] **Delete or replace `TrustBar.tsx`** — wrong design, should be rotating announcement bar.
- [ ] **Remove all `yellow-400` / `yellow-200` star colors** — replace with Rose Gold.
- [ ] **Remove Playfair Display font** — replace with Manrope.
- [ ] **Remove Mulish font** — replace with Inter.

---

## Priority Order (Do in This Order)

1. **Colors + Fonts** (affects everything)
2. **Announcement Bar** (first thing user sees)
3. **Hero Section** (most important section)
4. **Product Cards** (revenue section)
5. **CTA Banner + Trust Bar + Footer** (bottom sections)
6. **Missing sections** (How It Works, Sticky Bottom Bar)
7. **Animations** (polish)

---

## Reference Files

- Full spec: `vazlina_homepage_prompt_v2.md`
- Colors visual: `vazlina_homepage_color_options.html` (open in browser)
