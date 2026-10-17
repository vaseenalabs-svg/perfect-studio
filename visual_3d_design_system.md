# PERFECT STUDIO — Luxury Visual & 3D Design System (`Design.md`)

## 1. Aesthetic Direction & Mood
- **Persona:** International Luxury Wedding & Cinema House (inspired by Awwwards-winning studios, Leica optics, and Vogue Weddings).
- **Core Emotional Hook:** Make visitors feel the goosebumps, warmth, and permanence of a wedding within 5 seconds.
- **Theme:** Deep Obsidian Dark Mode with Metallic Champagne Gold luminance and Warm Alabaster Ivory editorial typography.

---

## 2. Color Tokens (CSS Custom Properties)
Define these tokens in `src/app/globals.css` and map them in `tailwind.config.ts`:

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#060606` | Primary background & WebGL canvas clear color |
| `--bg-charcoal` | `#0F0F10` | Secondary section backgrounds & elevated surfaces |
| `--bg-glass` | `rgba(18, 18, 20, 0.68)` | Glassmorphic cards, sticky navbar, floating tooltips |
| `--gold-primary` | `#D4AF37` | Primary Metallic Champagne Gold (CTAs, active states, 3D accents) |
| `--gold-light` | `#F3E5AB` | Specular highlights, hover text gradients, bokeh particles |
| `--gold-muted` | `rgba(212, 175, 55, 0.22)` | Hairline luxury borders, timeline tracks, subtle dividers |
| `--text-ivory` | `#FAF9F6` | Primary headlines and high-contrast body text |
| `--text-taupe` | `#A39E93` | Sub-headlines, descriptions, captions, muted labels |
| `--whatsapp-emerald` | `#25D366` | Subtle status dot / floating WhatsApp pulse indicator |

---

## 3. Typography System (`next/font/google`)
- **Display & Narrative Headlines (`--font-serif`):** `Cormorant Garamond`
  - Weights: `400` (Regular), `600` (SemiBold), `700` (Bold), plus *Italic* variants for emotional emphasis words (*"forever"*, *"lifetime"*, *"unforgettable"*).
  - Scale:
    - Hero / Scene Headline: `clamp(2.5rem, 5.5vw, 5.25rem)`, `line-height: 1.08`, `letter-spacing: -0.02em`
    - Section Title: `clamp(2rem, 4vw, 3.75rem)`, `line-height: 1.12`
- **Body, UI & Navigation (`--font-sans`):** `Plus Jakarta Sans`
  - Weights: `300` (Light), `400` (Regular), `500` (Medium), `600` (SemiBold).
  - Scale:
    - Scene Sub-text: `clamp(1.05rem, 1.4vw, 1.35rem)`, `line-height: 1.65`
    - Buttons & Overlines: `0.8125rem` (`13px`), uppercase, `letter-spacing: 0.18em`

---

## 4. Atmospheric Overlays & Surface Treatments
1. **Cinematic Film Grain:** Fixed full-screen SVG noise overlay (`z-index: 50`, `opacity: 0.035`, `pointer-events: none`, `mix-blend-mode: overlay`).
2. **Radial Vignette:** Fixed CSS radial gradient (`radial-gradient(circle at center, transparent 35%, rgba(6,6,6,0.85) 100%)`) over the 3D canvas so white/ivory typography remains 100% legible over moving 3D objects.
3. **Glassmorphism Standard:**
   ```css
   background: rgba(18, 18, 20, 0.65);
   backdrop-filter: blur(16px);
   -webkit-backdrop-filter: blur(16px);
   border: 1px solid rgba(212, 175, 55, 0.2);
   box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65);
   ```

---

## 5. The 7-Scene 3D Visual Choreography Specification
All 7 scenes live inside a unified Three.js world illuminated by warm golden point lights (`#D4AF37`), rim spotlights (`#F3E5AB`), and ambient fill (`#1a1610`), surrounded by floating golden bokeh particles:

| Scene | Scroll Range | 3D Centerpiece & Motion | Camera & Lighting Behavior |
| :--- | :--- | :--- | :--- |
| **Scene 0: Preloader** | Initial Load | Single golden spark expands into a particle ring and reveals the `PERFECT STUDIO` emblem. | Static orthographic/perspective lock; warm bloom ramp-up. |
| **Scene 1: The Beginning (Hero)** | `0% – 14%` | Multi-element 3D Camera Lens (brushed gold outer barrel, knurled focus ring, deep sapphire-tinted glass optics) rotating slowly and tilting with mouse/gyro. | Camera at `z: 8`, slight mouse parallax (`±0.4` units). |
| **Scene 2: The Moment** | `14% – 28%` | Camera dollies toward the lens as translucent golden silk light ribbons and 4 floating 3D memory frames drift past the viewer. | Smooth dolly in to `z: 5.5`; warm golden fog thickens slightly. |
| **Scene 3: We Capture (Photography)** | `28% – 42%` | Mechanical aperture blades rotate open with a warm golden flash; 6 framed wedding photo planes burst outward into a curved 3D arc that tilts on hover/move. | Camera orbits gently (`x: -0.8, z: 4.8`); crisp studio key light. |
| **Scene 4: We Bring It to Life (Videography)** | `42% – 57%` | Lens morphs into a matte-box cinema assembly while a glowing golden 35mm film strip spirals through 3D space with animated frame windows. | Sweeping cinematic pan (`x: 0.8, y: 0.3, z: 4.5`). |
| **Scene 5: We Perfect (Photo Editing)** | `57% – 71%` | A central large 3D canvas displays a desaturated RAW wedding portrait. A vertical golden laser/light bar sweeps left-to-right synced to scroll, transforming the image into a rich, color-graded masterpiece. | Centered framing (`x: 0, y: 0, z: 4.0`); volumetric gold scanline light. |
| **Scene 6: We Create the Story (Video Editing)** | `71% – 85%` | Floating clip planes snap into a 3D multi-track editing timeline; a golden playhead scrubs across while 32 3D golden audio waveform bars pulse underneath. | Low-angle hero tilt (`y: -0.4, z: 4.2`); rhythmic golden pulse lighting. |
| **Scene 7: Forever (Finale CTA)** | `85% – 100%` | All floating frames, film strips, and bokeh particles converge into a luxury golden heirloom wedding album that opens toward the user, glowing with the `PERFECT STUDIO` crest inside. | Majestic slow pull-back (`z: 5.0`) with warm golden god-ray glow. |