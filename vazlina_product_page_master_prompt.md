# Master Prompt: Vazlina Product Page (Clone NAMA Beauty Structure)

**Reference:** https://namabeauty.shop/products/astaxanthin-gummies  
**Goal:** Build DTC-branded product pages that make customers understand EXACTLY how this gadget improves their life. Follow NAMA's section structure and psychological flow, but adapt every word to Vazlina's gadget brand, Mexican market, and COD model.

**Note to Developer:** All product information (names, specs, pricing, features) is in `docs/00_project_overview.md`, `docs/01_brand_identity.md`, and `docs/03_copywriting_es_mx.md`. Use those as source of truth. This prompt gives you the **page architecture, section order, and copywriting framework**. You rewrite all copy for gadgets, not supplements.

---

## Part 1: Design System (Same as Homepage)

| Token | Value | Usage |
|-------|-------|-------|
| **Primary CTA / Brand** | `#0047BB` (Azul Vazlina) | Primary buttons, accents, links |
| **Background** | `#F7F7F7` (Neutral light gray) | Page background |
| **Card Background** | `#FFFFFF` | Product cards, sections |
| **Text Primary** | `#1A1A1A` | Headlines, body |
| **Text Muted** | `#6B6B6B` | Descriptions, subheadlines |
| **Borders** | `#E5E5E5` | Cards, inputs, dividers |
| **Success/Trust** | `#16A34A` (Green) | Guarantees, trust badges sparingly |
| **Typography** | Manrope (headlines 700/600), Inter (body 400/500) | — |
| **Icons** | Lucide, monocolor `#1A1A1A` | — |
| **Border Radius** | 12px cards, 8px buttons, 50px pills | — |

---

## Part 2: Product Page Section Order (Copy NAMA Exactly)

These sections appear in this exact order, top to bottom. Every product page (Brisa, Mariposa, Guardián) follows this skeleton. Only the content changes per product.

---

### SECTION 1: Hero — Product Title + Pricing Tiers + CTA

**Layout:** Two columns on desktop. Left = product gallery (3-4 images/video). Right = product info + pricing + CTA.

**Right Column Content:**

1. **Small angle tag (pill):** Product category. Example: "Confort Portatil · Vazlina Brisa"
2. **Headline (H1):** Emotional, problem-aware. NOT feature list.
   - Brisa: "Tu alivio personal contra el calor."
   - Mariposa: "Auriculares que completan tu estilo."
   - Guardián: "Proteccion inteligente para tu bateria."
3. **Subheadline:** Benefit-focused, 1-2 lines.
   - Brisa: "Potente, silencioso y portatil para el metro, la oficina o donde lo necesites."
4. **Rating row:** Star icon + "4.8/5 (287 evaluaciones)" + "1,500+ vendidos en Mexico"
5. **Pricing Tier Selector (CRITICAL — copy NAMA's tier cards exactly):**
   
   Display 3 selectable cards (radio button style). One card per quantity tier. Cards have rounded corners, subtle border. Selected card gets a blue border ring.
   
   **Example for Brisa:**
   | 1 unidad | 2 unidades | 3 unidades |
   |----------|-----------|------------|
   | 1x Ventilador | 2x Ventilador | 3x Ventilador |
   | $649 MXN | $999 MXN (ahorras $299) | $1,299 MXN (ahorras $648) |
   | Popular | Mejor valor | Maximo ahorro |
   
   **Key:** Show savings clearly. Best value should be middle option (psychology: people avoid extremes). Highlight "Mejor valor" or "Mas popular" with a small badge.
   
6. **Trust pills row (horizontal, below pricing):**
   - [Truck icon] "Envio Gratis"
   - [Hand icon] "Pago Contra Entrega"
   - [Shield icon] "Garantia 30 Dias"
   - [Refresh icon] "Devolucion sin drama"
   
7. **Primary CTA button:** "Añadir al Carrito" — Azul Vazlina, white text, full width, rounded 8px, large padding.
   - Below button (small, muted): "Sin tarjeta. Te llamaremos para confirmar tu pedido."
8. **Guarantee micro-banner (below CTA):**
   - Small rounded container with border. Icon + text: "La Promesa Vazlina: Si no te encanta, te regresamos tu dinero. Sin preguntas."

**Left Column — Gallery:**
- 3-4 images. First = hero lifestyle shot. Others = detail shots, in-use context.
- Thumbnails below main image (desktop) or swipeable carousel (mobile).
- On hover/zoom: subtle zoom effect.

---

### SECTION 2: Problem → Solution Pairs

**Section Label (small, uppercase, letter-spaced):** "PROBLEMAS QUE CONOCES — SOLUCIONES REALES"  
**Headline:** "[Product name] no alivia sintomas. Resuelve el problema de raiz."

**Layout:** 4 blocks in a 2x2 grid. Each block = customer quote (problem) + product solution.

**Format for each block:**
- **Customer problem (in quotes, italic, muted):** "I feel [pain] even though I tried [alternative]."
- **Product solution (bold headline):** How this product specifically fixes that pain.
- **Explanation (body text):** 2-3 sentences on the mechanism.

**Example for Brisa (4 pain/solution pairs):**

1. *"En el metro de CDMX el calor es insoportable, y los abanicos baratos no sirven."*
   **Motor sin escobillas de alta potencia**
   "La mayoria de ventiladores portatiles usan motores de $2 que se queman en una semana. Brisa usa un motor sin escobillas que genera flujo de aire real, no brisa de juguete."

2. *"Compre uno en el tianguis y la bateria duro 2 horas."*
   **Bateria de 8 horas de duracion real**
   "Probamos 12 ventiladores genericos. Ninguno duro mas de 3 horas. Brisa usa una celda de iones de litio de 2000mAh que dura toda tu jornada."

3. *"El ventilador de mi escritorio ocupa espacio y se cae."*
   **Clip universal que agarra donde sea**
   "Escritorio, cabecera, cochecito, bicicleta. El clip de silicona con muelle reforzado se ajusta a cualquier superficie de hasta 4cm de grosor."

4. *"Los ventiladores baratos suenan como licuadora."*
   **Silencioso a 25dB — menor que una biblioteca**
   "Motor sin escobillas + aspas aerodinamicas balanceadas = ruido minimo. Puedes usarlo en videollamadas sin que nadie se entere."

**Copywriting rule:** Each problem starts with a customer quote. Then a bold feature headline. Then a specific, concrete explanation with comparison or data. NO generic claims like "high quality." Say "tested 12 competitors, none lasted more than 3 hours."

---

### SECTION 3: The Secret Is In The Details (3 Key Features Deep-Dive)

**Section Label:** "LA DIFERENCIA ESTA EN LOS DETALLES"  
**Headline:** "Tres decisiones de ingenieria que hacen que Brisa no sea 'otro ventilador mas'."  
**Subheadline:** "No es la lista de especificaciones. Es como cada pieza trabaja con las demas."

**Layout:** 3 vertical blocks, full width or 3-column on desktop. Each block = icon + headline + detailed description + result statement.

**Format:**
1. **Feature name (H3, bold):** The engineering decision.
2. **Detailed description (3-4 lines):** Why this matters, what alternatives do wrong, how this solves it.
3. **Result statement (bold, accent color):** The benefit the customer feels.

**Example for Brisa:**

1. **Motor sin escobillas de 7 aspas**
   "La mayoria de ventiladores portatiles usan motores con escobillas de carbon que se desgastan, generan calor y ruido. El motor sin escobillas de Brisa elimina el contacto fisico: menos friccion, menos ruido, mas duracion. La unica parte movil son las aspas."
   **Resultado: Flujo de aire constante por anos, no semanas.**

2. **Bateria de iones de litio de 2000mAh**
   "Las baterias genericas de Ni-MH pierden carga en dias y pesan el doble. La celda de iones de litio de Brisa mantiene el 80% de carga despues de 500 ciclos. Se carga por USB-C en 2.5 horas."
   **Resultado: 8 horas de uso continuo. Todo el dia, sin buscar enchufe.**

3. **Clip de silicona con muelle reforzado**
   "Los clips plasticos se quiebran. Los imanes no funcionan en superficies no metalicas. El clip de Brisa combina una base de ABS con recubrimiento de silicona antideslizante y un muelle de acero que se adapta a 0-4cm de grosor."
   **Resultado: Se queda donde lo pones. No importa si es mesa, cabecera, o carriola.**

---

### SECTION 4: Trust & Authority Block

**Section Label:** "FORMULA PROBADA, NO PROMESAS VACIAS"  
**Headline:** "Cada Brisa pasa por pruebas reales antes de llegar a tu puerta."

**Layout:** 4 stat blocks in a row + 1 expert quote box below.

**Stat Blocks (each = icon + large number + label):**
1. **12** | "Ventiladores probados para encontrar el mejor"
2. **8h** | "Duracion real de bateria en prueba continua"
3. **500+** | "Ciclos de carga sin degradacion significativa"
4. **25dB** | "Nivel de ruido — mas silencioso que una biblioteca"

**Expert Quote Box:**
- Rounded card with light blue tint background or border.
- Quote icon (large, decorative, muted blue).
- Quote text: "Testeamos este ventilador contra 12 modelos del mercado mexicano. Es el unico que combina potencia real, duracion de bateria honesta, y construccion que no se rompe en 2 semanas."
- Attribution: "Equipo Vazlina · CDMX · Ingenieria de producto"

**Trust badges row (small, below quote):**
- "Probado en Mexico" | "Garantia 30 Dias" | "Soporte Local" | "Envio Gratis"

---

### SECTION 5: Timeline — What Changes In Your First 30 Days

**Section Label:** "TU PRIMER MES CON [PRODUCT NAME]"  
**Headline:** "Tu dia a dia cambia semana a semana — y tu lo sientes antes de que lo notes."

**Layout:** 3 cards in a row, connected by a subtle horizontal line or timeline dots.

**Format for each card:**
- **Time label (small, accent color):** "Semana 1" / "Semana 2" / "Dia 30"
- **Headline (H3):** The first feeling.
- **Description:** 3-4 lines of what the customer experiences.

**Example for Brisa:**

1. **Semana 1: Alivio inmediato**
   "La primera vez que lo usas en el metro o en tu escritorio, sientes la diferencia. No es 'brisa de juguete'. Es aire real que baja la temperatura perceptible. Usas menos el aire acondicionado. Tu piel deja de sudar en la frente durante videollamadas."

2. **Semana 2: Lo llevas a todas partes**
   "Descubres que lo usas mas de lo que pensabas. Lo prendes en la cabecera por las noches. Lo llevas al gym. Se convierte en algo que no dejas de cargar, como tu celular. La bateria te sorprende — sigue prendido despues de 8 horas."

3. **Dia 30: No recuerdas como vivias sin el**
   "Cuando se te olvida un dia, lo extrañas. Te das cuenta de que otros ventiladores que tenias estan guardados en un cajon. Compras uno para tu hermano, tu mama, o tu oficina. No es un gadget. Es parte de tu rutina."

**Copywriting rule:** Write in second person (tu). Make it visceral and emotional. The customer should FEEL the timeline, not just read it.

---

### SECTION 6: Reviews — What Real Customers Say

**Section Label:** "VERIFIED REVIEWS"  
**Headline:** "Clientes que lo probaron antes de que tu lo hicieras."  
**Subheadline:** "Resenas verificadas de compradores reales en Mexico."

**Layout:** 3 testimonial cards in a row (same style as homepage).

**Card structure:**
- Large quotation marks (decorative, accent blue)
- 5 gold stars
- Quote text (3-4 lines, specific, emotional)
- Name (bold) + age + city + "Comprador verificado"
- Small avatar circle with initial letter

**Example for Brisa (3 reviews):**

1. "Compre el ventilador porque en el metro de CDMX es imposible sobrevivir el verano. Llego en 4 dias, lo pague al recibir, y funciona mejor que los de $200 en la tienda. Ya no salgo sin el."
   — Maria Gonzalez, 32 anos, CDMX

2. "Lo puse en la cabecera de mi bebe porque en la noche hace calor y el aire acondicionado es mucho. El clip agarra perfecto. Es silencioso, no despierta al bebe. Vale cada peso."
   — Laura Hernandez, 29 anos, Guadalajara

3. "Soy repartidor de comida en moto. En verano es un infierno. Lo clipie al manubrio. La bateria dura toda mi jornada de 8 horas. Esto deberia ser obligatorio para todo repartidor."
   — Javier Lopez, 26 anos, Monterrey

**Rule:** Each review must include a specific use case, a specific result, and location in Mexico. Generic reviews feel fake.

---

### SECTION 7: Comparison — Why Vazlina vs The Alternative

**Section Label:** "COMPARA Y DECIDE POR TI MISMO"  
**Headline:** "Todo lo que has probado antes, y por que no funciono."

**Layout:** Comparison table or 4 cards. Each card = alternative product type + why it fails + why Vazlina wins.

**Format for each comparison:**
- **Alternative name (H3):** What people usually buy.
- **Price range:** What they pay.
- **Problems list (3-4 bullet points):** Why it fails.
- **Vazlina advantage (bold, blue):** Why this product is different.

**Example for Brisa:**

1. **Ventiladores del tianguis / feria ($50-$150 MXN)**
   - Motor de $2 que se quema en una semana
   - Bateria de 2 horas que no dura medio dia
   - Plastico fragil que se rompe si se cae
   - Ruido de licuadora que no deja concentrarte
   **→ Brisa: Motor sin escobillas, 8h de bateria, construccion reforzada, 25dB silencioso.**

2. **Ventiladores de escritorio tradicionales ($300-$600 MXN)**
   - Necesitan enchufe: no son portatiles
   - Ocupan espacio valioso en tu escritorio
   - Solo enfrente a ti, no se ajustan
   - Cable que estorba y se enreda
   **→ Brisa: Inalambrico, clip universal, portable, sin cables.**

3. **Aplicaciones de aire acondicionado / abanicos de pared**
   - Consumen electricidad todo el dia
   - Enfrian toda la habitacion, no a ti
   - No los puedes llevar al trabajo o al metro
   - Aumentan tu recibo de luz
   **→ Brisa: Cero electricidad, enfoca el aire en ti, portable a cualquier lado, bateria recargable.**

4. **Ventiladores 'premium' de marcas conocidas ($800-$1,500 MXN)**
   - Pagas por el logo, no por la ingenieria
   - Mismas especificaciones que los genericos
   - Sin garantia real en Mexico
   - Si falla, no hay quien te atienda
   **→ Brisa: Ingenieria real probada, precio justo, garantia Vazlina con soporte local, atencion real.**

---

### SECTION 8: Guarantee — 30 Days Or Your Money Back

**Section Label:** "GARANTIA REAL"  
**Headline:** "30 dias — o te regresamos tu dinero. Sin preguntas."

**Layout:** Large centered card or full-width section with light blue tint background.

**Content:**
- Large shield/check icon (accent blue).
- Headline (large, bold): "Pruebalo durante 30 dias. Si no sientes la diferencia, te devolvemos cada peso."
- Subheadline: "No te pedimos explicaciones. No te hacemos llenar formularios. Solo dinos 'no funciono para mi' y te regresamos tu dinero en 3-5 dias habiles."

**Process steps (3 small blocks):**
1. **Usalo 30 dias** — "Desde el dia que llega. Pruebalo en tu rutina real."
2. **No te encanto?** — "Escribenos por WhatsApp o correo. Di 'quiero mi reembolso.'"
3. **Te devolvemos todo** — "Transferencia o deposito. Tu decides. Sin descuentos ni comisiones."

---

### SECTION 9: Simplicity — The Easiest Product You'll Own

**Section Label:** "SENCILLEZ"  
**Headline:** "El producto mas facil de usar que tendras."

**Layout:** 4 small icon blocks or a single row of features.

**Content (adapt per product):**

**For Brisa:**
1. **Carga USB-C** — "El mismo cable de tu celular. 2.5 horas y listo."
2. **3 velocidades** — "Baja para dormir, media para trabajo, alta para el calor extremo."
3. **Peso ligero** — "160 gramos. Menos que tu celular. Cabe en cualquier bolsa."
4. **Sin app, sin wifi** — "Boton de encendido. Nada mas. Funciona en cualquier lugar, sin instalar nada."

**Stats row (large numbers):**
- **160g** | Peso total
- **3** | Velocidades
- **2.5h** | Tiempo de carga
- **<30s** | Listo para usar

---

### SECTION 10: How Your Order Reaches You (COD Process)

**Section Label:** "COMO LLEGA TU PEDIDO"  
**Headline:** "Sin pago online. Sin compromiso. Sin riesgo."

**Layout:** 4 steps in a horizontal row. Each step = number circle + headline + description.

**Steps:**
1. **01 — Elige tu oferta** — "Selecciona 1, 2 o 3 unidades. Agrega al carrito. Sin pagar nada todavia."
2. **02 — Confirma tus datos** — "Solo nombre, telefono y direccion. No pedimos tarjeta. No hay cobros ocultos."
3. **03 — Te llamamos** — "Nuestro equipo de Mexico confirma tu pedido por telefono. Resolvemos dudas en el acto."
4. **04 — Recibe y paga** — "3-5 dias habiles. Pagas en efectivo o tarjeta al mensajero. Solo cuando tienes el producto en tus manos."

**Below steps:** Small trust text: "Enviamos a todo Mexico via DHL, FedEx y paqueteria local. Todas las entregas incluyen seguimiento."

---

### SECTION 11: FAQ (Product-Specific Accordion)

**Section Label:** "FAQ"  
**Headline:** "Preguntas antes de ordenar"  
**Subheadline:** "Todo lo que necesitas saber sobre [product name]."

**6-8 questions specific to THIS product.** Do not reuse generic FAQ from homepage.

**Example for Brisa:**
1. "¿Cuanto dura realmente la bateria?" — "8 horas de uso continuo en velocidad media. En velocidad alta, aproximadamente 5 horas. Se carga completamente en 2.5 horas por USB-C."
2. "¿Se puede usar mientras carga?" — "Si. Puedes conectarlo a un power bank o al cargador de tu celular y usarlo simultaneamente."
3. "¿El clip funciona en cualquier superficie?" — "El clip se abre de 0 a 4cm de grosor. Funciona en mesas, cabeceras, carriolas, bicicletas, y escritorios. No funciona en paredes (no es magnetico)."
4. "¿Es ruidoso? Puedo usarlo en una oficina?" — "25dB en velocidad baja — mas silencioso que una biblioteca. En velocidad media es imperceptible en videollamadas. Solo en velocidad alta se escucha como brisa suave."
5. "¿Que incluye la caja?" — "1 ventilador Brisa, cable USB-C, manual de uso, y tarjeta de garantia Vazlina de 30 dias."
6. "¿Puedo regresarlo si no me gusta?" — "Claro. Tienes 30 dias desde que lo recibes. Escibenos por WhatsApp, lo recogemos, y te devolvemos tu dinero."
7. "¿Es bueno para bebes o personas mayores?" — "Si. No tiene aspas expuestas (estan protegidas por la rejilla), no genera calor, y el aire es suave. Ideal para cabecera de bebes y adultos mayores."
8. "¿Cuanto tarda el envio?" — "3-5 dias habiles en CDMX, Guadalajara, Monterrey, Puebla, Queretaro. 5-7 dias para el resto del pais. Siempre gratis."

---

### SECTION 12: Cross-Sell — Other Products From Vazlina

**Section Label:** "COMPLETA TU COLECCION"  
**Headline:** "Cada producto Vazlina resuelve un problema diferente."

**Layout:** 2 product cards (the OTHER products, not the one on this page). Same card style as homepage.

**Example on Brisa page:**
- Card 1: Vazlina Guardián — "Proteccion inteligente para tu bateria" — Desde $502.99 MXN
- Card 2: Vazlina Mariposa — "Auriculares que completan tu estilo" — Desde $630.99 MXN

**At original price. No discounts.** These cross-sells link to their product pages.

---

## Part 3: Section-Specific Design Notes

### Pricing Tiers (Section 1)
- Cards must be selectable (radio-style). Clicking a card updates the price and "Añadir al Carrito" state.
- Middle card (2 units) should be visually emphasized: slightly larger, "Mejor valor" badge, subtle blue border.
- Savings must be calculated and displayed: "Ahorras $299 MXN"
- Strikethrough original price next to bundle price for clarity.

### Problem/Solution (Section 2)
- Customer quotes in italic, muted text.
- Solution headlines in bold, primary text.
- Use alternating layout: image left/text right, then text left/image right.

### Feature Deep-Dive (Section 3)
- Each feature gets a small illustrative icon or diagram.
- Result statement in Azul Vazlina (#0047BB) and bold.
- No spec sheets. Tell stories, not specifications.

### Comparison (Section 7)
- Use a clean table on desktop. Cards on mobile.
- Vazlina row should have a blue left border or checkmark to stand out.
- Be honest about alternatives — don't mock them, explain why they don't solve the problem.

### FAQ (Section 11)
- Accordion style. One open at a time.
- `+` icon that rotates to `×`.
- Questions must sound like REAL questions from Mexican COD buyers.

---

## Part 4: Copywriting Rules for All Product Pages

1. **Never say "high quality."** Say what you tested, how you tested it, and what happened.
2. **Never say "best."** Say "tested against 12 competitors" or "1,500+ Mexican customers."
3. **Always use second person (tu).** The page is talking to ONE person.
4. **Lead with emotion, back with fact.** "No more sweating on the metro" (emotion) + "25dB silent motor" (fact).
5. **Make it local.** Reference CDMX metro, Guadalajara heat, Monterrey summers. Make it feel Mexican.
6. **Quantify everything.** "8 hours" not "long battery." "25dB" not "silent." "160 grams" not "lightweight."
7. **Show, don't tell.** Instead of "easy to use," say "One button. No app. Works anywhere."
8. **Fear first, then relief.** Every section should acknowledge a fear, then show how Vazlina removes it.

---

## Part 5: What NOT to Do

- **NO generic spec tables at the top.** Specs go in FAQ or a hidden tab. Lead with benefits.
- **NO "50% OFF" banners on product page.** The only discount is in the quantity tiers (2x, 3x) and the post-checkout upsell.
- **NO countdown timers on product page.** Save urgency for the upsell screen ONLY.
- **NO popups.** No newsletter signup. No spin-to-win.
- **NO credit card logos.** This is COD. Show "Pago Contra Entrega" everywhere.
- **NO Spain Spanish.** Mexican Spanish only: "pedido" not "encargo," "celular" not "movil," "corre" not "funciona."
- **NO more than 3 CTA colors.** Azul Vazlina for primary, gray for secondary, green only for guarantees.

---

## Part 6: Per-Product Adaptation Guide

Use this table to adapt the master prompt for each product:

| Element | Vazlina Brisa (Fan) | Vazlina Mariposa (Earbuds) | Vazlina Guardián (Charger) |
|---------|---------------------|---------------------------|---------------------------|
| **Angle tag** | Confort Portatil | Estilo Inalambrico | Proteccion Inteligente |
| **H1** | Tu alivio personal contra el calor | Auriculares que completan tu estilo | Proteccion inteligente para tu bateria |
| **Pain points** | Calor metro, bateria corta, ruido, se cae | Se caen, se ven feos, bateria mala, se pierden | Sobre-carga, calor nocturno, cables genericos, sin auto-stop |
| **3 key features** | Motor sin escobillas, bateria 2000mAh, clip universal | Diseno mariposa, BT 5.3, 24h con estuche | Auto-desconexion, proteccion sobrecarga, compatibilidad universal |
| **Timeline focus** | Alivio inmediato, lo llevas a todos lados, indispensable | Primer uso impresionante, uso diario, no usas otros | Primera noche tranquila, confianza, olvidas el miedo |
| **Reviews angle** | Metro, bebe en cabecera, repartidor moto | Regalo, gym, videollamadas | Carga nocturna, familia, oficina |
| **Vs alternatives** | Tianguis fans, escritorio fans, AC, premium brands | Genericos TWS, AirPods caros, cables, audifonos de diadema | Cargadores genericos, cargadores de marca cara, power strips, cargar toda la noche |
| **Simplicity** | Carga USB-C, 3 velocidades, ligero, sin app | Emparejamiento automatico, touch control, estuche carga, sin app | Enchufar y listo, LED indicador, proteccion automatica, sin configuracion |

---

*This master prompt replicates the exact psychological architecture of NAMA Beauty's product pages: emotional hook → problem/solution → deep-dive features → trust/authority → timeline → reviews → comparison → guarantee → simplicity → COD process → FAQ → cross-sell. Adapted for Vazlina's gadget brand, Mexican COD market, and three specific products.*
