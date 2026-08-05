# Color Change — Option J (Deep Teal + Sand Gold)

**Replace ALL colors in the codebase with these exact hex codes:**

| Token | Old (Option F) | New (Option J) | Where Used |
|-------|----------------|----------------|------------|
| **Primary Dark** | `#1C1C1E` | `#1B3A3A` Deep Teal | Buttons, nav, announcement bar, banners, borders, headings |
| **Accent** | `#D4A5A5` Rose Gold | `#C9A96E` Sand Gold | Stars, section labels, badges, CTA buttons, quotes, highlights |
| **Background** | `#FAF5F5` | `#F5F0E8` Warm Sand | Page background, card backgrounds |
| **Border** | `#E8E0E0` | `#E0D8D0` Sand Border | Card borders, dividers |
| **Text Primary** | `#1A1A1A` | `#1A1A1A` (same) | Headlines, body text |
| **Text Muted** | `#6B6B6B` | `#6B6B6B` (same) | Descriptions, subheadlines |

## What to change

### CSS Variables / Tailwind Config
```css
--brand: 27 58 58;          /* #1B3A3A Deep Teal */
--accent: 201 169 110;      /* #C9A96E Sand Gold */
--background: 245 240 232;  /* #F5F0E8 Warm Sand */
--border: 224 216 208;      /* #E0D8D0 */
--text-primary: 26 26 26;   /* #1A1A1A */
--text-secondary: 107 107 107; /* #6B6B6B */
```

### Files to update
1. `tailwind.config.ts` — update all color values
2. `src/app/globals.css` — update CSS variables
3. `src/components/Stars.tsx` — change `yellow-400` to `#C9A96E` (Sand Gold)
4. **ALL components** — search and replace any hardcoded `#1C1C1E` → `#1B3A3A`, `#D4A5A5` → `#C9A96E`

## Why this palette
Deep Teal (`#1B3A3A`) signals tech/wellness. Sand Gold (`#C9A96E`) signals warmth and premium quality. Together they balance sophistication with approachability.

## Rules
- **No other colors.** Only: Deep Teal, Sand Gold, Warm Sand, White, Black, Gray.
- Stars = Sand Gold (not yellow).
- Announcement bar = Deep Teal background.
- CTA buttons = Sand Gold background with Deep Teal text.
- Page background = Warm Sand `#F5F0E8`.
