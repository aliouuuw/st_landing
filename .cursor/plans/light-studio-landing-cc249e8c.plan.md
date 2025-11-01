<!-- cc249e8c-8407-4aba-a4b5-b7208efec45f c86dc207-ee2e-47b6-a244-60fc5d6568d4 -->
# Light Studio Landing Page - Implementation Plan

## Overview

Transform the current SaiTech landing page into a premium Light Studio aesthetic with advanced animations, smooth scrolling, and comprehensive content from description.md. Target: 4000-5000px full landing experience with award-winning agency polish.

## Design System Updates

### 1. Color Palette Migration

Update `app/globals.css` to Light Studio palette:

- Primary background: #F5F7FB (light blue-tinted)
- Text/Charcoal: #1F2937
- Blue gradient: #2563EB → #60A5FA
- Neutral accents: #6B7280, #EFF6FF
- Update all existing dark backgrounds to light equivalents

### 2. Typography Refinement

Enhance existing Manrope + Space Grotesk pairing in `app/globals.css`:

- Add negative letter-spacing utilities for Space Grotesk (-0.02em to -0.04em)
- Define heading scale: H1 (48-72px), H2 (36-48px), H3 (24-32px)
- Body text: 16-18px with 1.6-1.8 line-height
- Add uppercase badge styles with 0.3em tracking

### 3. Glass Morphism Components

Update `components/ui/card.tsx` for glass effect:

- Semi-transparent white backgrounds (#FFFFFF/95)
- backdrop-filter: blur(12px)
- Soft shadows: 0 24px 40px rgba(31,41,55,0.05)
- Border-radius: 24px standard

## Dependencies Installation

### 4. Add Animation Libraries

Update `package.json` dependencies:

```json
"@studio-freight/lenis": "^1.0.42",
"animejs": "^3.2.2"
```

## Page Structure Implementation

### 5. Navigation Enhancement

Update Navigation component in `app/page.tsx`:

- Light background (#F5F7FB) with subtle blur on scroll
- Smooth transition states using anime.js
- Underline animations (slide from left, 220ms)
- Add scroll progress indicator

### 6. Hero Section Redesign

Transform Hero to Light Studio aesthetic:

- Light gradient background: from-[#F5F7FB] to-[#EFF6FF]
- Add subtle blue glow halo around Spline droid (drop-shadow filter)
- Update copy to emphasize "accessible, adaptive, transformative" from description.md
- Enhance CTAs with glow effects on hover
- Keep two-column layout (text left, Spline right)

### 7. Services Section (New)

Create comprehensive services showcase based on description.md Core Services:

- 4 glass cards in 2x2 grid (mobile: stack)
- Each card covers one service pillar:

  1. AI Strategy & Consultancy
  2. LLM Fine-Tuning & Custom RAG
  3. AI Automation
  4. Custom AI Solutions

- Staggered reveal animation with anime.js (cascade delay 100ms)
- Hover: scale(1.02) with glow effect

### 8. Industries Section (New)

Build interactive industries grid from description.md table:

- 6 industry cards (Education, Telecom, Marketing, Finance, Manufacturing, Customer Service)
- Each card shows: Sector name, Opportunity, Example Solutions
- Light blue accent borders on hover
- Subtle parallax effect on scroll
- Mobile: 2-column grid, then stack on small screens

### 9. Market Opportunity Section (New)

Showcase market stats from description.md:

- Hero stat: "$18B by 2030" with animated counter (anime.js)
- Supporting stats: "30% CAGR", "5% SME adoption"
- Visual: Animated line chart or gradient bars (CSS-based)
- Positioning points in cards: "Local market realities", "Bilingual operation", "Engineering-driven"
- Background: Subtle gradient overlay

### 10. Features/Differentiators Section

Expand existing FeaturesSection with Light Studio treatment:

- Update to glass cards with light backgrounds
- Add icons (lucide-react) with blue accent color
- Staggered entrance animations
- Hover: lift effect with shadow increase

### 11. Contact CTA Section

Enhance existing contact section:

- Large glass card with gradient border
- Form fields with light backgrounds and blue focus states
- "Planifier un atelier" CTA with magnetic hover effect (anime.js)
- Contact info: email, phone with subtle icons

## Animation System

### 12. Lenis Smooth Scroll Integration

Create `lib/lenis.ts`:

- Initialize Lenis with smooth scroll config
- Integrate with Next.js app router
- Add scroll progress tracking
- Implement in root layout

### 13. Anime.js Animation Utilities

Create `lib/animations.ts`:

- Fade/scale reveal on scroll (IntersectionObserver)
- Staggered text reveals (split by words)
- Number counter animations for stats
- Magnetic button effects
- Morphing shapes for decorative elements
- Export reusable animation functions

### 14. Scroll-Triggered Animations

Implement in `app/page.tsx`:

- Parallax backgrounds (translateY -10% on scroll)
- Section reveals with fade/scale
- Stats counter triggers when in viewport
- Staggered card animations (100ms cascade)

### 15. Micro-Interactions

Add throughout components:

- Button hover: scale(1.05) + glow (180ms)
- Link underlines: slide animation (220ms)
- Card hover: subtle lift + shadow
- Badge pulse: scale(1.05) infinite (1.2s)
- Icon rotations on hover

## Responsive & Performance

### 16. Mobile Optimization

Ensure full Spline on all devices:

- Add loading states with skeleton screens
- Optimize Spline scene for mobile (keep full quality)
- Touch-friendly interactions (44px minimum tap targets)
- Stack layouts on mobile (single column)

### 17. Performance Enhancements

- Lazy load Spline with Suspense (already implemented)
- Optimize images (WebP format, <100KB)
- Add `prefers-reduced-motion` fallbacks
- Code-split anime.js animations
- Monitor Core Web Vitals

## Content Updates

### 18. French Copy Refinement

Update all text in `app/page.tsx` to match description.md:

- Hero: Emphasize "accessible, adaptive, transformative"
- Services: Use exact descriptions from Core Services section
- Industries: Pull from table (Sector, Opportunity, Example Solutions)
- Market stats: "$18B by 2030", "30% CAGR", "5% SME adoption"
- Positioning: "Standards mondiaux. Excellence locale."

### 19. Metadata & SEO

Update `app/layout.tsx`:

- Title: "SaiTech - Systèmes IA pour l'Afrique | Automatisation Intelligente"
- Description: Pull from Executive Summary in description.md
- Add Open Graph tags for social sharing
- Favicon with SaiTech branding

## Testing & Polish

### 20. Cross-Browser Testing

- Test Lenis smooth scroll on Safari, Chrome, Firefox
- Verify anime.js animations performance (60fps target)
- Check glass morphism support (fallback for older browsers)
- Test Spline interaction on touch devices

### 21. Accessibility Audit

- Verify contrast ratios (≥4.5:1 for text)
- Add ARIA labels for interactive elements
- Test keyboard navigation
- Ensure focus indicators are visible (blue ring)
- Add skip-to-content link

### 22. Final Polish

- Add subtle loading animation on page load
- Implement scroll-to-top button (appears after 500px scroll)
- Add smooth anchor link scrolling with Lenis
- Fine-tune animation timings for cohesion
- Review all French copy for accuracy

## File Structure

Key files to modify/create:

- `package.json` - Add Lenis + anime.js
- `app/globals.css` - Light Studio color system + utilities
- `app/layout.tsx` - Metadata + Lenis provider
- `app/page.tsx` - All sections (Hero, Services, Industries, Market, Features, Contact)
- `components/ui/card.tsx` - Glass morphism variant
- `lib/lenis.ts` - Smooth scroll setup (new)
- `lib/animations.ts` - Anime.js utilities (new)

## Future Expansion Notes

Plan accommodates later addition of:

- Three.js + TSL for advanced 3D
- React Three Fiber (R3F) for interactive 3D scenes
- Additional Spline scenes in other sections
- GSAP for more complex timeline animations

### To-dos

- [ ] Update color palette, typography, and glass morphism components for Light Studio aesthetic
- [ ] Install Lenis smooth scroll and anime.js animation libraries
- [ ] Create Lenis integration and anime.js utility functions with scroll-triggered animations
- [ ] Enhance navigation with light background, scroll effects, and smooth transitions
- [ ] Transform hero to light gradient background with enhanced Spline glow and refined copy
- [ ] Build new Services section with 4 glass cards covering Core Services from description.md
- [ ] Create Industries grid with 6 interactive cards from description.md table
- [ ] Implement Market Opportunity section with animated stats and positioning points
- [ ] Update Features section and enhance Contact CTA with glass treatment
- [ ] Add advanced micro-interactions throughout (magnetic buttons, staggered reveals, hover effects)
- [ ] Optimize for mobile with full Spline support and touch-friendly interactions
- [ ] Refine French copy to match description.md and update metadata for SEO
- [ ] Cross-browser testing, accessibility audit, and final polish with performance optimization