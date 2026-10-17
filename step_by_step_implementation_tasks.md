# PERFECT STUDIO — Phased Execution Checklist (`Task.md`)

Instruct Antigravity IDE to execute these tasks sequentially. Mark each task `[x]` as files are generated and verified.

---

## Phase 1: Project Foundation, Design Tokens & Centralized Data
- [x] **Task 1.1: Project Configuration**
  - Create `package.json`, `tsconfig.json`, `tailwind.config.ts`, and `next.config.mjs` (configured with `images: { remotePatterns: [{ hostname: 'images.unsplash.com' }] }`).
- [x] **Task 1.2: Global Luxury Styling (`src/app/globals.css`)**
  - Configure CSS variables (`--bg-obsidian`, `--gold-primary`, `--text-ivory`, etc.), film-grain overlay class, custom golden scrollbar, and reduced-motion media queries.
- [x] **Task 1.3: Centralized Studio Data (`src/constants/siteData.ts`)**
  - Populate all 7 Story Scenes (exact headlines, sub-text, scroll ranges, and service-specific WhatsApp messages).
  - Add placeholder logo config, 4 Services data, 12 curated Masonry Portfolio items, Before/After image pairs, Silver/Gold/Platinum packages, 5 Process steps, Testimonials, FAQs, and a documented `[PLACEHOLDERS]` dictionary.
- [x] **Task 1.4: WhatsApp & Performance Utilities**
  - Create `src/utils/whatsapp.ts` (deep-link formatter for `+91 70969 90850` + analytics event hooks).
  - Create `src/utils/devicePerf.ts` (detects mobile viewport, low CPU cores, and `prefers-reduced-motion`).

---

## Phase 2: The 7-Scene 3D Scroll Story Engine
- [x] **Task 2.1: Scene 0 Preloader (`src/components/layout/Preloader.tsx`)**
  - Build the black screen with the expanding golden spark animation, forming the `PERFECT STUDIO` logo with the text `"Preparing your story..."`.
- [x] **Task 2.2: Procedural 3D Scene Meshes (`src/components/story3d/Story3DMeshes.tsx`)**
  - Build the persistent Golden Bokeh particle field (`Sparkles` / `Points`).
  - **Scene 1 Mesh:** Rotating 3D luxury camera lens reacting to mouse/tilt.
  - **Scene 2 Mesh:** Floating 3D emotional photo frames + drifting golden light veil.
  - **Scene 3 Mesh:** Opening mechanical shutter blades + 3D arc of flying wedding photos.
  - **Scene 4 Mesh:** Cinema camera transformation + unrolling 3D spiral film ribbon.
  - **Scene 5 Mesh:** Central photo plane with sweeping golden light beam transforming RAW to Color-Graded.
  - **Scene 6 Mesh:** 3D video editing timeline with snapping clips, moving playhead, and pulsing golden audio waveform.
  - **Scene 7 Mesh:** Converging frames folding into a glowing golden wedding album with the `PERFECT STUDIO` emblem inside.
- [x] **Task 2.3: Fixed WebGL Canvas Wrapper (`src/components/story3d/Story3DCanvas.tsx`)**
  - Set up the React Three Fiber `<Canvas>` with responsive `dpr`, warm golden studio lighting, and CSS 3D fallback for non-WebGL browsers.
- [x] **Task 2.4: Master GSAP ScrollTrigger Controller (`src/components/story3d/ScrollStoryMaster.tsx`)**
  - Build the `700vh` scroll container syncing `storyScrollRef` with the 7 HTML narrative overlays, progress indicator, and WhatsApp service CTAs in Scenes 3–6 and booking/call CTAs in Scene 7.

---

## Phase 3: Supporting Conversion Sections & Interactive UI
- [x] **Task 3.1: Navigation & Reusable Interactive Primitives**
  - Build `src/components/layout/Navbar.tsx` (sticky glass header, scene progress bar, `"Book on WhatsApp"` button, mobile full-screen overlay).
  - Build `src/components/ui/TiltCard.tsx` (3D hover tilt card).
  - Build `src/components/ui/BeforeAfterSlider.tsx` (draggable RAW vs. Edited split slider).
- [x] **Task 3.2: About, Services & Portfolio Sections**
  - Build `src/components/sections/AboutStatsSection.tsx` (story + animated counters).
  - Build `src/components/sections/ServicesSection.tsx` (4 service tilt cards with pre-filled WhatsApp buttons).
  - Build `src/components/sections/PortfolioSection.tsx` (filterable masonry gallery + swipeable Lightbox modal).
- [x] **Task 3.3: Editing Lab, Showreel, Process & Packages**
  - Build `src/components/sections/EditingShowreel.tsx` (cinematic video showreel modal + interactive photo/video editing showcase).
  - Build `src/components/sections/WhyAndProcess.tsx` (Why Choose Us + 5-step animated timeline).
  - Build `src/components/sections/PackagesSection.tsx` (Silver, Gold, Platinum cards with WhatsApp triggers).
- [x] **Task 3.4: Social Proof, Smart WhatsApp Booking Form & Persistent Widgets**
  - Build `src/components/sections/TestimonialsFAQ.tsx` (testimonials carousel + FAQ accordion).
  - Build `src/components/sections/BookingSection.tsx` (validated booking form that opens WhatsApp with pre-filled details).
  - Build `src/components/layout/Footer.tsx` and `src/components/layout/FloatingWhatsApp.tsx` (bottom-right pulsing WhatsApp button + mobile sticky `"Call Now"` / `"WhatsApp"` bar).

---

## Phase 4: Page Assembly, SEO Schema & Handover Documentation
- [x] **Task 4.1: Root Layout & SEO Schema (`src/app/layout.tsx`)**
  - Configure `Cormorant Garamond` and `Plus Jakarta Sans` fonts, OpenGraph metadata, favicon, and `LocalBusiness` + `Photographer` JSON-LD Schema.
- [x] **Task 4.2: Master Page Assembly (`src/app/page.tsx`)**
  - Integrate Lenis smooth scrolling, `Preloader`, `Navbar`, `ScrollStoryMaster` (Scenes 1–7), all supporting conversion sections, `Footer`, and `FloatingWhatsApp`.
- [x] **Task 4.3: Client Handover & Deployment Guide (`README.md` / `HANDOVER.md`)**
  - Document exact steps to replace the logo, photos, showreel video, and `[PLACEHOLDERS]` in `src/constants/siteData.ts`, plus Vercel/Netlify deployment and 3 future roadmap upgrades.