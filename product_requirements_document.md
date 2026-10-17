# PERFECT STUDIO — Product Requirements Document (`PRD.md`)

## 1. Executive Summary
- **Client:** PERFECT STUDIO
- **Primary Services:**
  1. Wedding Photography
  2. Wedding Videography
  3. Photo Editing & High-End Retouching
  4. Video Editing & Cinematic Color Grading
- **Core Concept:** *"A wedding lasts one day. Perfect Studio makes it last forever."*
- **Primary Business Goal:** Immerse visitors in an emotional 3D scroll story within 5 seconds and convert traffic into qualified **WhatsApp enquiries (`+91 70969 90850`)** and direct phone calls.

---

## 2. Target Audience & User Journey
1. **Engaged Couples & Families:** Looking for a luxury, trustworthy team to capture their wedding and pre-wedding celebrations.
2. **Filmmakers / Studios Out-sourcing Post-Production:** Seeking high-end photo retouching and wedding video editing.
3. **Conversion Path:**
   `Scene 0 Preloader` → `Scenes 1–7 Scroll Story (with contextual service WhatsApp CTAs)` → `Interactive Portfolio & Before/After Lab` → `Packages & Process` → `Smart WhatsApp Booking Form`.

---

## 3. Exact Copy & Functional Requirements for the 7-Scene Scroll Story

### Scene 0: Preloader
- **Visual:** Black screen with a single golden spark that expands into soft light and forms the `PERFECT STUDIO` logo.
- **Text:** `"Preparing your story..."`

### Scene 1: Hero — “The Beginning”
- **Visual:** Floating golden bokeh lights in 3D space; rotating 3D camera lens reacting to mouse/phone tilt.
- **Headline (`H1`):** `"Every love story deserves to be remembered perfectly."`
- **Sub-text:** `"Wedding photography, videography and editing, crafted with emotion."`
- **Primary CTA:** `"Book Your Date"` (Opens WhatsApp booking chat)
- **Secondary CTA:** `"View Our Work"` (Smooth scrolls to Portfolio / Story)

### Scene 2: “The Moment”
- **Visual:** Floating 3D photo frames and a drifting veil of golden light holding different emotions (a glance, a laugh, a tear, a first dance).
- **Headline (`H2`):** `"A wedding lasts a day. The feeling should last a lifetime."`
- **Sub-text:** `"Behind every celebration are small moments that pass in seconds. We exist to catch every one of them."`

### Scene 3: Wedding Photography — “We Capture”
- **Visual:** 3D lens opens like a shutter; photos fly out into a floating 3D gallery that tilts with user movement.
- **Headline (`H2`):** `"Every glance. Every smile. Every detail."`
- **Sub-text:** `"From the first look to the last farewell, we freeze the moments you’ll want to relive. Natural, candid, timeless."`
- **Button:** `"Enquire on WhatsApp"` (Pre-filled for *Wedding Photography*)

### Scene 4: Wedding Videography — “We Bring It to Life”
- **Visual:** Camera transforms into a cinema camera; glowing ribbon of film unrolls in 3D space with moving clips inside the frames.
- **Headline (`H2`):** `"Because some moments need to move."`
- **Sub-text:** `"Cinematic wedding films that let you hear the laughter, feel the vows and watch your day unfold again."`
- **Button:** `"Enquire on WhatsApp"` (Pre-filled for *Wedding Videography*)

### Scene 5: Photo Editing — “We Perfect”
- **Visual:** Raw, flat-toned photo floats in center; golden light beam sweeps across it, blooming colors into a rich, polished image (live before/after reveal).
- **Headline (`H2`):** `"Great photos become unforgettable."`
- **Sub-text:** `"Colour grading, skin retouching and artistic finishing, so every picture looks exactly the way it felt."`
- **Button:** `"Enquire on WhatsApp"` (Pre-filled for *Photo Editing*)

### Scene 6: Video Editing — “We Create the Story”
- **Visual:** Scattered clips fly in and snap onto a glowing 3D timeline; playhead glides across while a golden music waveform pulses.
- **Headline (`H2`):** `"Hours of footage. One film you’ll watch forever."`
- **Sub-text:** `"Storytelling edits, highlight reels, reels for social media and full-length wedding films, cut with rhythm and music that match your emotions."`
- **Button:** `"Enquire on WhatsApp"` (Pre-filled for *Video Editing*)

### Scene 7: “Forever” (Finale CTA)
- **Visual:** Photos, film frames, and bokeh lights drift together and fold into a golden album that opens slowly with the glowing `PERFECT STUDIO` logo inside.
- **Headline (`H2`):** `"Your story. Captured perfectly. Kept forever."`
- **Sub-text:** `"Your date is waiting. Let’s make it unforgettable."`
- **Buttons:** `"Book on WhatsApp"` · `"Call Now"` (`tel:+917096990850`)

---

## 4. Supporting Conversion Sections (Post-Story Exploration)
To ensure visitors can inspect deeper details after experiencing the 7-Scene Story, include:
1. **Sticky Glass Header:** Logo slot, Scene Progress Bar, Quick Jump Links (`The Story`, `Services`, `Portfolio`, `Editing Lab`, `Packages`, `FAQ`, `Contact`), `"Book on WhatsApp"` CTA, and Mobile Full-Screen Hamburger Menu.
2. **About Us & Animated Studio Metrics:** Studio philosophy + animated counters (`Weddings Covered`, `Happy Couples`, `Years of Experience`, `Films Delivered`).
3. **4 Premium Service Cards Grid:** Quick-access overview of *Wedding Photography*, *Wedding Videography*, *Photo Editing*, and *Video Editing* with 3D hover tilt and direct WhatsApp triggers.
4. **Filterable Masonry Portfolio + Lightbox:** Tabs (`All`, `Weddings`, `Pre-Wedding`, `Videos`, `Edits`) with swipeable full-screen Lightbox modal.
5. **Cinematic Video Showreel & Interactive Before/After Slider:** Embedded showreel modal + touch-draggable RAW vs. Edited comparison slider.
6. **Why Choose Us & 5-Step Process Timeline:** 6 trust pillars + animated timeline (`Enquiry` → `Consultation` → `Shoot` → `Editing` → `Delivery`).
7. **Packages (`Silver` / `Gold` / `Platinum`):** 3 luxury packages with itemized deliverables and package-specific WhatsApp links.
8. **Testimonials Slider & FAQ Accordion:** Romantic client reviews and collapsible answers to common questions.
9. **WhatsApp Smart Booking Form:**
   - Inputs: `Name`, `Phone`, `Event Date`, `Event Type`, `Location`, `Service Needed`, `Message`.
   - Action: Validates fields and opens `https://wa.me/917096990850?text=...` with all details cleanly formatted.
10. **Footer & Persistent Widgets:**
    - Footer with logo, quick links, social placeholders (`[INSTAGRAM_LINK]`, `[YOUTUBE_LINK]`, `[FACEBOOK_LINK]`), phone, and copyright.
    - Floating bottom-right WhatsApp button (`"Chat with us"` tooltip + pulse).
    - Mobile sticky bottom bar (`Call Now` + `WhatsApp`).

---

## 5. Client Handover Placeholders Registry
All placeholders must be clearly documented and centralized in `src/constants/siteData.ts`:
- `[LOGO_IMAGE_PATH]` (Header, Footer, Preloader, Scene 7 Album, Favicon)
- `[HERO_AND_PORTFOLIO_PHOTOS]` (Clearly labeled objects in `siteData.ts`)
- `[SHOWREEL_VIDEO_URL]`
- `[BEFORE_RAW_IMAGE]` & `[AFTER_EDITED_IMAGE]`
- `[CITY]`, `[STATE]`, `[FULL_STUDIO_ADDRESS]`
- `[EMAIL]`
- `[INSTAGRAM_LINK]`, `[YOUTUBE_LINK]`, `[FACEBOOK_LINK]`