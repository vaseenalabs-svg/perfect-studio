# PERFECT STUDIO — Antigravity IDE Engineering & Execution Rules (`Rules.md`)

## 1. Core Coding Mandates (Non-Negotiable)
1. **Zero Truncation Policy:** Never output partial files, `// ... rest of code`, `/* TODO */`, or omitted imports. Every file created or updated must be 100% complete and production-ready.
2. **Single WebGL Context Rule:** Do NOT instantiate multiple `<Canvas>` components across the page. Browsers cap active WebGL contexts (often at 8–16) and will crash on mobile. Use **one** persistent fixed `<Story3DCanvas>` (`position: fixed; inset: 0; z-index: 0`) for the 7-Scene Scroll Story.
3. **Procedural 3D Over External `.GLTF` Files:** Never reference non-existent local `/models/*.glb` or dead external 3D URLs. Build all 3D objects (camera lens rings, mechanical shutter blades, floating photo frames, film ribbon, light beam shader, NLE timeline, and golden heirloom album) procedurally using Three.js geometries and materials.
4. **Centralized Configuration (`src/constants/siteData.ts`):** Never hardcode copy, phone numbers, image URLs, or `[PLACEHOLDERS]` inside UI components. Import all text, images, services, packages, and FAQs from `src/constants/siteData.ts`.
5. **Strict SSR / Hydration Safety:** Three.js, GSAP `ScrollTrigger`, and `window`/`navigator` references must strictly execute client-side (`'use client'`, inside `useEffect` or `useLayoutEffect`, or dynamically imported with `ssr: false`).

---

## 2. Animation & Scroll Synchronization Rules
1. **Master Progress State (`0.0` to `1.0`):**
   - Use a shared mutable ref (`storyScrollRef = { current: 0 }`) or lightweight Zustand store so the React Three Fiber `useFrame` loop reads scroll progress at 60fps **without** triggering React component re-renders on every scroll tick.
2. **GSAP + Lenis Harmony:**
   - Synchronize `@studio-freight/react-lenis` (or `lenis`) with GSAP `ScrollTrigger.update` and `gsap.ticker`.
   - Always call `ScrollTrigger.refresh()` after the preloader finishes and fonts/images settle.
3. **Reduced Motion & Low-End Fallbacks:**
   - Detect `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and mobile viewports (`window.innerWidth < 768`).
   - On mobile or low-end devices: clamp WebGL `dpr={[1, 1.25]}`, reduce bokeh particle count from `300` to `80`, disable expensive post-processing blooms, and simplify 3D mesh segments.

---

## 3. WhatsApp Conversion & Analytics Rules
1. **Canonical WhatsApp Number:** `+91 70969 90850` → Base URL: `https://wa.me/917096990850`.
2. **Deep-Link Encoding:** Every WhatsApp CTA must use `encodeURIComponent()` via `src/utils/whatsapp.ts` to pre-fill context-specific messages (Scene 3 Photography, Scene 4 Videography, Scene 5 Photo Editing, Scene 6 Video Editing, Scene 7 Forever CTA, Packages, and Contact Form).
3. **Analytics Attributes:** Every conversion button or link must include:
   - `data-analytics-event="whatsapp_enquiry"` (or `"phone_call"`)
   - `data-source-scene="[scene_or_section_id]"`
   - `data-service-type="[service_name]"`

---

## 4. Accessibility, SEO & Lighthouse 90+ Rules
1. **Semantic HTML:** Maintain a strict single `<h1>` in Scene 1 (`"Every love story deserves to be remembered perfectly."`), `<h2>` for scenes/sections, and `<h3>` for sub-cards.
2. **Touch Targets:** Every interactive button, filter tab, slider handle, and link on mobile must have a minimum hit area of `44px × 44px`.
3. **Image Optimization:** All placeholder wedding photographs must use curated, working high-resolution Unsplash URLs with explicit `alt` attributes, lazy loading below the fold, and clearly commented replacement instructions.
4. **Schema Markup:** Inject valid `JSON-LD` for `LocalBusiness` and `ProfessionalService` / `Photographer` inside `src/app/layout.tsx`.