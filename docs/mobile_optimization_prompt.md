# Prompt: Mobile Optimization Check (A to Z) — Vazlina Website

## CONTEXT

I am building a **premium DTC e-commerce website for Mexico** that sells products via COD (Pago contra Entrega / Cash on Delivery). The website is built with:

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Language:** TypeScript
- **Fonts:** Playfair Display (headings) + Mulish (body)
- **Color Palette:** Deep Teal (#1B3A3A), Sand Gold (#C9A96E), Warm Sand (#F5F0E8)
- **Target Market:** Mexico — primarily mobile shoppers using mid-range Android phones
- **Connection:** Many users will be on 3G/4G with slower speeds

## MY SITUATION

I am NOT a frontend expert. I am trying to improve the website to look and perform **great on mobile**, but I know there are many things I'm missing. I need you to act as a **senior mobile UX engineer** and do a **complete audit from A to Z**.

## YOUR ROLE

You are a **Senior Frontend Engineer specializing in mobile-first e-commerce conversion optimization**. You have built high-converting mobile shopping experiences for markets like India, Southeast Asia, and Latin America where most traffic is mobile.

Your job: **Analyze my code and give me a complete, actionable checklist of every mobile improvement needed.**

---

## SCOPE OF REVIEW — CHECK EVERYTHING (A to Z)

### A. VIEWPORT & RESPONSIVE FOUNDATION
- [ ] Viewport meta tag configured correctly (no `user-scalable=no`, proper `width=device-width`)
- [ ] Content fits mobile screen without horizontal scroll
- [ ] Touch targets are minimum 44x44px (ideally 48x48px)
- [ ] Font sizes are readable on small screens (no text smaller than 14px for body)
- [ ] Proper use of responsive prefixes (`sm:`, `md:`, `lg:`) — mobile-first approach
- [ ] No fixed widths that break mobile layout
- [ ] Images scale properly and don't overflow containers

### B. PERFORMANCE & LOADING (Critical for Mexico/3G)
- [ ] Images are optimized (WebP format, proper sizing, lazy loading)
- [ ] No layout shift (CLS) — elements don't jump as page loads
- [ ] Fonts load without FOIT/FOUT issues
- [ ] Critical CSS is inlined or loaded first
- [ ] No render-blocking resources
- [ ] Bundle size is reasonable for mobile networks
- [ ] Proper `loading="lazy"` on below-fold images
- [ ] `priority` attribute on hero/LCP image only

### C. NAVIGATION & HEADER
- [ ] Header doesn't take too much screen space on mobile
- [ ] Sticky header behavior is smooth and not janky
- [ ] Mobile menu (if exists) is thumb-friendly
- [ ] Cart drawer opens smoothly and is easy to close
- [ ] Back button behavior works correctly
- [ ] No accidental taps on navigation elements

### D. HERO / PRODUCT PAGE ABOVE THE FOLD
- [ ] Product image is visible immediately (LCP optimization)
- [ ] H1 is readable without zooming
- [ ] Price and CTA are visible without scrolling
- [ ] Trust signals (rating, reviews, COD badge) are immediately visible
- [ ] Urgency text doesn't look spammy on mobile
- [ ] Offer selector cards are easy to tap
- [ ] Sticky Add to Cart bar (if present) doesn't cover content

### E. PRODUCT GALLERY & IMAGES
- [ ] Image gallery is swipeable on mobile
- [ ] Thumbnails are tappable (not too small)
- [ ] Dot indicators visible for carousel position
- [ ] Images load fast (placeholder while loading)
- [ ] Pinch-to-zoom works if needed
- [ ] No image stretching or distortion

### F. TYPOGRAPHY & READABILITY
- [ ] Heading sizes scale down appropriately on mobile
- [ ] Line height is comfortable for reading on small screens
- [ ] Contrast ratio meets WCAG standards
- [ ] No long paragraphs that are hard to scan
- [ ] Bullet points and lists are properly formatted
- [ ] Text doesn't touch screen edges (proper padding)

### G. BUTTONS & INTERACTIVE ELEMENTS
- [ ] Primary CTA is full-width and prominent on mobile
- [ ] Buttons have adequate padding (min 16px vertical)
- [ ] Active/hover states work on touch (no hover-only states)
- [ ] Radio buttons / offer selectors are easy to tap
- [ ] No elements too close together (minimum 8px gap)
- [ ] Forms have proper input types (tel, email, etc.)
- [ ] Form fields are large enough to tap comfortably

### H. SCROLLING & CAROUSELS
- [ ] Horizontal scroll areas are clearly indicated
- [ ] Carousels have snap scrolling (`scroll-snap-type`)
- [ ] Scroll indicators (dots/arrows) visible
- [ ] No nested scroll areas that trap the user
- [ ] Smooth scroll behavior for anchor links
- [ ] Sections don't feel cramped on small screens

### I. FORMS & CHECKOUT (COD)
- [ ] Input fields are large enough for thumbs
- [ ] Number inputs show numeric keyboard on mobile
- [ ] Phone input has `type="tel"`
- [ ] Form validation messages are clear and visible
- [ ] No form fields cut off by keyboard
- [ ] Submit button is always reachable
- [ ] Error states are obvious (red borders + text)
- [ ] Success states give clear next steps

### J. MODALS, DRAWERS & OVERLAYS
- [ ] Cart drawer takes full screen or 90% on mobile
- [ ] Checkout modal is mobile-optimized
- [ ] Upsell overlay doesn't block navigation
- [ ] Back button/dimiss is easy to find (top corner)
- [ ] Modal content scrolls properly if too long
- [ ] No body scroll lock issues

### K. SPECIFIC COMPONENTS TO CHECK
Review these components specifically for mobile issues:
- `ProductPageTemplate.tsx` — the main product page
- `StickyAddToCart.tsx` — sticky bottom bar
- `CartDrawer.tsx` — cart sidebar
- `CheckoutModal.tsx` — checkout form
- `Header.tsx` — site header
- `AnnouncementBar.tsx` — top announcement
- `UpsellOverlay.tsx` — upsell popup

### L. ANIMATIONS & MOTION
- [ ] Animations are smooth on mid-range devices (60fps)
- [ ] No heavy CSS animations that cause jank
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Transitions are fast (under 300ms) for mobile
- [ ] No parallax or heavy effects that hurt performance
- [ ] Loading states are visible and not confusing

### M. ACCESSIBILITY ON MOBILE
- [ ] Proper ARIA labels on interactive elements
- [ ] Focus states visible for keyboard navigation
- [ ] Screen reader friendly (proper headings hierarchy)
- [ ] Colorblind-friendly (not relying only on color)
- [ ] Alt text on all images

### N. CONVERSION OPTIMIZATION (Mobile-specific)
- [ ] CTA button text is action-oriented and visible
- [ ] Trust elements are prominent (COD badge, guarantee, reviews)
- [ ] Price is clear and not hidden
- [ ] Savings/badges are visible on offer cards
- [ ] No distracting elements near CTA
- [ ] One primary action per screen section
- [ ] Phone/WhatsApp click-to-call works
- [ ] No popups that block the buy button

### O. E-COMMERCE SPECIFIC
- [ ] Product variants/options easy to select on mobile
- [ ] Quantity selector is thumb-friendly
- [ ] Add to cart feedback is immediate and clear
- [ ] Cart summary is scannable
- [ ] Shipping info is clear
- [ ] COD explanation is prominent and reassuring
- [ ] No surprise costs at checkout

### P. TESTING CONSIDERATIONS
- [ ] Works on iPhone SE (small screen)
- [ ] Works on iPhone 14 Pro Max (large screen, dynamic island)
- [ ] Works on common Android devices (Samsung A-series, Xiaomi)
- [ ] Works in both portrait and landscape
- [ ] Works with system font size increased
- [ ] Works with dark mode (if applicable)

---

## HOW TO RESPOND

For each issue you find, provide:

1. **Severity:** 🔴 Critical (breaks functionality) / 🟡 Important (hurts conversion) / 🟢 Nice to have
2. **Location:** Exact file and line number where applicable
3. **Problem:** What is wrong and why it matters for mobile
4. **Current Code:** The problematic code snippet
5. **Fixed Code:** The corrected code snippet (ready to copy-paste)
6. **Impact:** How this affects users (especially on slower devices/connections)

**Group your findings by the letter categories above (A, B, C, etc.).**

**Prioritize:** Start with 🔴 Critical issues that prevent purchase or make the site unusable on mobile. Then 🟡 Important. Then 🟢 Nice to have.

**If you find ZERO issues in a category, say so clearly.**

**DO NOT give generic advice like "optimize images." Give SPECIFIC code changes with exact Tailwind classes or component modifications.**

---

## CODE ACCESS

Here are the key files you need to review. I will paste them below or provide them in follow-up messages:

1. `src/components/ProductPageTemplate.tsx` — Main product page template
2. `src/components/StickyAddToCart.tsx` — Sticky bottom CTA bar
3. `src/components/CartDrawer.tsx` — Shopping cart drawer
4. `src/components/CheckoutModal.tsx` — Checkout form modal
5. `src/components/Header.tsx` — Site header
6. `src/app/layout.tsx` — Root layout
7. `src/app/globals.css` — Global styles
8. `tailwind.config.ts` — Tailwind configuration

**Please review all these files and give me the complete A-to-Z mobile optimization report.**

---

## ADDITIONAL CONTEXT

- Most of our traffic is from **Facebook/Instagram ads on mobile**
- Users are often on **older Android phones** with slower processors
- **Internet speed varies** — some on WiFi, some on 3G/4G
- **COD is new to many users** — they need reassurance
- **The buy button is the most important element** on every page
- We have a **sticky "Add to Cart" bar** at bottom on mobile
- The **product page is the landing page** for most ad traffic

## EXPECTED OUTPUT FORMAT

```
# Mobile Optimization Report: Vazlina Website

## 🔴 Critical Issues (Fix Immediately)

### A. Viewport & Responsive Foundation
1. **[Issue title]**
   - File: `src/.../file.tsx:line`
   - Problem: ...
   - Current: ```code```
   - Fixed: ```code```
   - Impact: ...

### B. Performance & Loading
...

## 🟡 Important Issues (Fix This Week)
...

## 🟢 Nice to Have (Fix When Possible)
...

## Summary
- Total Critical: X
- Total Important: X
- Total Nice-to-have: X
- Estimated effort: X hours
```

**Now, please review the code files I provide and give me the complete report.**
