# PERFECT STUDIO — System & 3D Scrollytelling Architecture (`Architecture.md`)

## 1. Directory & File Structure
```text
perfect-studio/
├── public/
│   ├── logo-placeholder.svg          # Easy-to-replace studio logo
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css               # Luxury CSS tokens, film grain, scrollbar styling
│   │   ├── layout.tsx                # Fonts, SEO Metadata, JSON-LD Schema, SmoothScroll
│   │   └── page.tsx                  # Master page assembling Preloader, 7-Scene Story & Sections
│   ├── constants/
│   │   └── siteData.ts               # SINGLE SOURCE OF TRUTH: Copy, 7 Scenes, Photos, Packages, FAQs
│   ├── utils/
│   │   ├── whatsapp.ts               # WhatsApp URL builder (+91 70969 90850) + GA event dispatcher
│   │   └── devicePerf.ts             # Mobile / low-end / reduced-motion detector
│   └── components/
│       ├── layout/
│       │   ├── Preloader.tsx         # Scene 0: Golden spark -> Logo formation
│       │   ├── Navbar.tsx            # Sticky glass navbar + mobile full-screen overlay
│       │   ├── Footer.tsx            # Luxury footer with social & quick links
│       │   └── FloatingWhatsApp.tsx  # Desktop floating button + Mobile sticky bottom bar
│       ├── story3d/
│       │   ├── ScrollStoryMaster.tsx # 700vh GSAP ScrollTrigger container + DOM Scene overlays (1-7)
│       │   ├── Story3DCanvas.tsx     # Fixed R3F Canvas + lighting + Golden Bokeh + Camera Rig
│       │   └── Story3DMeshes.tsx     # Procedural 3D meshes for Scenes 1 to 7 synced to scrollRef
│       ├── ui/
│       │   ├── TiltCard.tsx          # 3D perspective mouse-tilt card with golden glare
│       │   └── BeforeAfterSlider.tsx # Interactive touch/mouse RAW vs. Graded comparison slider
│       └── sections/
│           ├── AboutStatsSection.tsx # Studio story + animated counters
│           ├── ServicesSection.tsx   # 4 Service cards with WhatsApp triggers
│           ├── PortfolioSection.tsx  # Masonry filterable gallery + Lightbox modal
│           ├── EditingShowreel.tsx   # Video showreel modal + Interactive Photo/Video Editing Lab
│           ├── WhyAndProcess.tsx     # Why Choose Us bento + 5-step animated timeline
│           ├── PackagesSection.tsx   # Silver, Gold, Platinum cards
│           ├── TestimonialsFAQ.tsx   # Couple stories slider + FAQ accordion
│           └── BookingSection.tsx    # Validated form -> Pre-filled WhatsApp generator
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 2. Hybrid 3D Scrollytelling Data Flow
```text
[User Scrolls Page (Lenis Smooth Scroll)]
         │
         ▼
[GSAP ScrollTrigger inside ScrollStoryMaster.tsx (height: 700vh)]
         │
         ├──► 1. Updates `storyScrollRef.current` (float: 0.000 -> 1.000)
         │         │
         │         ▼
         │    [React Three Fiber `useFrame()` inside Story3DMeshes.tsx]
         │         ├─ Interpolates Camera Position & LookAt along 7 Scene waypoints
         │         ├─ Rotates/Opens 3D Camera Lens & Shutter Blades (Scenes 1–3)
         │         ├─ Unrolls 3D Spiral Film Ribbon (Scene 4)
         │         ├─ Sweeps Golden Laser Beam across RAW/Edited Plane (Scene 5)
         │         ├─ Animates 3D NLE Timeline Playhead & Golden Waveform (Scene 6)
         │         └─ Folds Floating Frames into Glowing Golden Album (Scene 7)
         │
         └──► 2. Scrubs DOM Scene Overlays (`Scene 1` to `Scene 7` HTML text & WhatsApp CTAs)
                   └─ Smooth opacity, Y-translation, and blur transitions for each scene's headline, sub-text, and buttons.
```

---

## 3. Transition From Fixed 3D Story to Standard Sections
- While the user is inside the `ScrollStoryMaster` (`0vh` to `700vh`), the `<Story3DCanvas>` remains fixed in the background (`z-index: 0`).
- Once the user scrolls past **Scene 7 ("Forever")** into the **About / Services / Portfolio** sections (`z-index: 20`), the `<Story3DCanvas>` smoothly lowers its centerpiece opacity to `0.15` (keeping only subtle ambient golden bokeh particles in the background) or pauses off-screen rendering to guarantee 60fps scrolling across the Masonry gallery and forms.

---

## 4. Mobile & Reduced-Motion Degradation Strategy
| Feature | Desktop High-Perf (`>= 768px`) | Mobile (`< 768px`) | `prefers-reduced-motion: reduce` |
| :--- | :--- | :--- | :--- |
| **WebGL DPR** | `[1, 2]` | `[1, 1.25]` | `[1, 1]` |
| **Bokeh Particles** | `300` particles | `80` particles | `40` static particles |
| **Parallax Input** | Mouse X/Y spring interpolation | Touch / Gentle auto-orbit | Disabled (static framing) |
| **Card 3D Tilt** | Full `rotateX` / `rotateY` + Glare | Subtle scale press effect | Simple border highlight |
| **Scroll Pinning** | Smooth `scrub: 1` interpolation | Native-feel `scrub: 0.5` | Direct fade reveals |