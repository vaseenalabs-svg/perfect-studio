# PERFECT STUDIO — Client Operations, Customization & Deployment Manual (`HANDOVER.md`)

Welcome to your production-grade 3D scroll-driven web application for **PERFECT STUDIO**. This document provides an exhaustive, step-by-step operations manual for local development, media asset replacement, placeholder auditing, cloud deployment, and architectural blueprints for future feature upgrades.

---

## Section 1: Quick-Start & Local Development

### Prerequisites
- **Node.js:** v18.17.0 or newer (v20.x or v22.x LTS recommended)
- **Package Manager:** `npm` (included with Node.js) or `pnpm`

### Local Setup Commands
```bash
# 1. Clone repository & enter workspace
cd perfect-studio

# 2. Install all dependencies (including Three.js, GSAP & Framer Motion)
npm install --legacy-peer-deps

# 3. Launch local development server
npm run dev
# The application will be live at http://localhost:3000

# 4. Compile optimized production build
npm run build

# 5. Start production server locally for verification
npm start
```

---

## Section 2: How to Replace Logo, Photos, Videos & Copy (1-File Guide)

All narrative text, portfolio items, packages, pricing tiers, and contact numbers are centralized in **one single file**:  
`src/constants/siteData.ts`

### 1. Studio Logo & Favicon Replacement
- **SVG / Vector Logo:** Drop your logo into `public/logo-placeholder.svg`.
- **PNG Logo:** Drop `logo.png` into `public/` and update `PLACEHOLDERS.LOGO_IMAGE_PATH: '/logo.png'` in `src/constants/siteData.ts`.
- **Favicon:** Place your 32x32 `favicon.ico` in the `public/` folder.
- **Custom Gold Color Adaptation:** To change the champagne gold palette, edit the hex values in `src/app/globals.css`:
  ```css
  :root {
    --gold-primary: #D4AF37; /* Primary Metallic Gold */
    --gold-light: #F3E5AB;   /* Highlight / Bokeh Gold */
    --gold-muted: rgba(212, 175, 55, 0.22); /* Borders & tracks */
  }
  ```

### 2. 3D Storyboard Scene Photos (Scenes 2, 3, 4, 5)
- Open `src/constants/siteData.ts`.
- The copy, headlines, and sub-texts for Scenes 1 to 7 are located inside the `STORY_SCENES` array.
- To use your own wedding photographs inside the floating 3D frames, update `photoTextures` in `src/components/story/meshes/Scene1To4Meshes.tsx` or supply high-resolution image URLs in `PORTFOLIO_DATA`.

### 3. Portfolio Gallery & Before/After Retouching Pairs
- **Portfolio Masonry Items:** Open `src/constants/siteData.ts` and locate `PORTFOLIO_DATA`. Add or replace image objects:
  ```ts
  {
    id: 'port-new',
    title: 'The Royal Palace Vows',
    couple: 'Bride & Groom',
    category: 'weddings', // 'weddings' | 'pre-wedding' | 'videos' | 'edits'
    location: 'Udaipur, Rajasthan',
    image: 'https://your-domain.com/photos/udaipur-wedding.jpg',
    aspectRatio: 'portrait', // 'portrait' | 'landscape' | 'square'
  }
  ```
- **Before/After Retouching Slider:** In `src/components/sections/EditingShowcase.tsx`, locate `COMPARISON_PRESETS` and update the `before` (flat/RAW) and `after` (graded) image URLs.

### 4. Cinematic Showreel Video
- Open `src/constants/siteData.ts` and locate:
  ```ts
  SHOWREEL_VIDEO_URL: 'https://your-cdn.com/showreel-4k.mp4'
  ```
  Provide an MP4 direct link, AWS S3 URL, or Cloudflare Stream link.

---

## Section 3: Complete Checklist of `[PLACEHOLDERS]` to Fill In

Before public launch, audit and replace every entry in the table below:

| Key in `siteData.ts` | Default Value | Replacement Instructions |
| :--- | :--- | :--- |
| `PHONE_RAW` | `'917096990850'` | Client raw WhatsApp phone number with country code (no `+` or spaces). |
| `PHONE_NUMBER` | `'+91 70969 90850'` | Formatted phone display string for callers. |
| `EMAIL` | `'contact@perfectstudio.luxury'` | Primary concierge client inquiry email address. |
| `CITY` | `'Surat'` | Primary home atelier city (used in SEO Schema & Address). |
| `STATE` | `'Gujarat'` | Primary state / province. |
| `FULL_ADDRESS` | `'Ring Road, Surat, Gujarat 395002, India'` | Full legal physical studio address for Google LocalBusiness Schema. |
| `INSTAGRAM_URL` | `'https://instagram.com/perfectstudio.luxury'` | Official studio Instagram profile link. |
| `YOUTUBE_URL` | `'https://youtube.com/@perfectstudioluxury'` | Official studio YouTube channel link. |
| `FACEBOOK_URL` | `'https://facebook.com/perfectstudioluxury'` | Official studio Facebook page link. |
| `SHOWREEL_VIDEO_URL` | Direct MP4 link | 4K master studio teaser video file. |
| `FOUNDED_YEAR` | `'2012'` | Year the studio was established. |
| `PACKAGES_DATA.price` | `'Custom Quote'` / `'Most Popular'` | Specific pricing tiers if client wishes to publish rates. |

---

## Section 4: Production Deployment Guide & Custom Domain Setup

### Deploying to Vercel (Recommended)
1. Push your repository to **GitHub** or **GitLab**.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `perfect-studio` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Set Build Command: `next build` and Output Directory: `.next`.
6. Click **"Deploy"**. Your site will build and be assigned a live `.vercel.app` preview domain.

### Connecting Your Custom Domain (`perfectstudio.luxury` or `perfectstudio.com`)
In your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains):
1. Navigate to **DNS Management**.
2. Add an **A Record**:
   - **Type:** `A`
   - **Host / Name:** `@`
   - **Value / Target:** `76.76.21.21`
   - **TTL:** `Automatic` or `300`
3. Add a **CNAME Record**:
   - **Type:** `CNAME`
   - **Host / Name:** `www`
   - **Value / Target:** `cname.vercel-dns.com`
   - **TTL:** `Automatic` or `300`
4. Inside Vercel Project Settings → **Domains**, add `yourdomain.com` and `www.yourdomain.com`. Vercel automatically issues an SSL certificate within 5–15 minutes.

### Google Analytics 4 (GA4) Integration
Every WhatsApp CTA, phone call button, and booking submission fires a custom window event:
- Event name: `perfect_studio_whatsapp_click`
- Event detail: `{ sourceScene, service, timestamp, number }`

To capture these events in Google Tag Manager (GTM):
1. Create a **Custom Event Trigger** matching `perfect_studio_whatsapp_click`.
2. Map Tag to your GA4 measurement ID (`G-XXXXXXXXXX`).

---

## Section 5: Architecture for 3 Future Enhancements

### 1. SEO Wedding Stories Blog (`/blog/[slug]`)
- **Objective:** Rank on Google for queries like *"Best Wedding Photographer in Udaipur"* and *"Luxury Rajasthan Palace Wedding Shoot"*.
- **Implementation:**
  - Create directory `src/app/blog/[slug]/page.tsx`.
  - Connect headless CMS (Sanity.io or Contentful) or local `@next/mdx`.
  - Inject `Article` and `BlogPosting` JSON-LD schema with high-res couple photo galleries and client interview text.

### 2. Real-Time Date Availability & Booking Calendar
- **Objective:** Eliminate manual back-and-forth by letting couples check whether their auspicious wedding weekend is open before messaging on WhatsApp.
- **Implementation:**
  - Connect **Supabase** database with a `booked_dates` table (`id`, `date`, `status: 'reserved' | 'tentative'`, `client_id`).
  - Embed an interactive calendar picker inside `BookingFormSection.tsx` highlighting locked dates in metallic gold and booked dates with a soft lockout state.

### 3. Private Client Photo-Delivery Portal (`/client-portal`)
- **Objective:** A luxury branded web gallery where couples log in to view and download their high-res photos and 4K cinema films without paying high Dropbox/Pixieset fees.
- **Implementation:**
  - **Auth:** Supabase Auth or Clerk with magic email links or couple wedding passcodes (`/gallery/aanya-and-kabir`).
  - **Storage:** **Cloudflare R2** (S3-compatible zero egress fees) for storing 100GB+ of 4K ProRes masters and full-resolution print TIFFs.
  - **Features:** Favorites selection, watermark-free ZIP downloads, and direct print lab order routing.

---

*Authored by the Lead Creative Technologist & WebGL Architect for PERFECT STUDIO.*
