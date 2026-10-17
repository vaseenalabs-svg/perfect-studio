/**
 * PERFECT STUDIO — Centralized Single Source of Truth
 * 
 * All copy, 7-scene storyboard data, Unsplash wedding image placeholders,
 * services, packages, testimonials, FAQs, and client placeholders registry.
 * Edit this file to customize any aspect of the site without touching UI code.
 */

export interface StoryScene {
  id: string;
  sceneNumber: number;
  scrollRange: [number, number]; // [startProgress, endProgress]
  title: string;
  tagline: string;
  headline: string;
  subtext: string;
  primaryCta?: {
    label: string;
    action: 'whatsapp' | 'scroll' | 'call';
    message?: string;
    target?: string;
  };
  secondaryCta?: {
    label: string;
    action: 'whatsapp' | 'scroll' | 'call';
    message?: string;
    target?: string;
  };
  visualGuide: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'photography' | 'videography' | 'photo_editing' | 'video_editing';
  description: string;
  deliverables: string[];
  image: string;
  whatsappMessage: string;
  badge?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  couple: string;
  category: 'weddings' | 'pre-wedding' | 'videos' | 'edits';
  location: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  featured?: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  duration: string;
  deliverables: string[];
  popular?: boolean;
  whatsappMessage: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  timeline: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  couple: string;
  location: string;
  quote: string;
  service: string;
  rating: number;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StudioStat {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

/* =========================================================================
   CLIENT PLACEHOLDER REGISTRY
   Swap these keys for instant client white-labeling
   ========================================================================= */
export const PLACEHOLDERS = {
  LOGO_IMAGE_PATH: '/logo.png',
  LOGO_TEXT: 'PERFECT STUDIO',
  FOUNDED_YEAR: '2012',
  PHONE_NUMBER: '+91 70969 90850',
  PHONE_RAW: '917096990850',
  EMAIL: 'contact@perfectstudio.luxury',
  CITY: 'Surat',
  STATE: 'Gujarat',
  FULL_ADDRESS: 'Ring Road, Surat, Gujarat 395002, India',
  INSTAGRAM_URL: 'https://instagram.com/perfectstudio.luxury',
  YOUTUBE_URL: 'https://youtube.com/@perfectstudioluxury',
  FACEBOOK_URL: 'https://facebook.com/perfectstudioluxury',
  SHOWREEL_VIDEO_URL: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0&modestbranding=1',
  BEFORE_RAW_IMAGE: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=70',
  AFTER_EDITED_IMAGE: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=95&sat=20&con=15',
} as const;

/* =========================================================================
   7-SCENE 3D SCROLL STORYBOARD
   Exact copy & timing specifications from PRD & Design System
   ========================================================================= */
export const STORY_SCENES: StoryScene[] = [
  {
    id: 'scene-0',
    sceneNumber: 0,
    scrollRange: [0.0, 0.0],
    title: 'Preloader',
    tagline: 'Preloader',
    headline: 'PERFECT STUDIO',
    subtext: 'Preparing your story...',
    visualGuide: 'Black screen with expanding golden spark particle burst forming the studio emblem.',
  },
  {
    id: 'scene-1',
    sceneNumber: 1,
    scrollRange: [0.0, 0.14],
    title: 'The Beginning',
    tagline: 'Prologue',
    headline: 'Every love story deserves to be remembered perfectly.',
    subtext: 'Wedding photography, videography and editing, crafted with emotion.',
    primaryCta: {
      label: 'Book Your Date',
      action: 'whatsapp',
      message: 'Hello Perfect Studio! I would like to check availability and book our wedding date.',
    },
    secondaryCta: {
      label: 'View Our Work',
      action: 'scroll',
      target: '#story-scroll-container',
    },
    visualGuide: 'Floating golden bokeh field with rotating 3D luxury camera lens reacting to mouse/gyro tilt.',
  },
  {
    id: 'scene-2',
    sceneNumber: 2,
    scrollRange: [0.14, 0.28],
    title: 'The Moment',
    tagline: 'The Essence',
    headline: 'A wedding lasts a day. The feeling should last a lifetime.',
    subtext: 'Behind every celebration are small moments that pass in seconds. We exist to catch every one of them.',
    primaryCta: {
      label: 'Experience The Journey',
      action: 'scroll',
      target: '#scene-3',
    },
    visualGuide: 'Camera glides into the optics; translucent golden light ribbon and 4 floating 3D memory frames drift past.',
  },
  {
    id: 'scene-3',
    sceneNumber: 3,
    scrollRange: [0.28, 0.42],
    title: 'We Capture',
    tagline: 'Wedding Photography',
    headline: 'Every glance. Every smile. Every detail.',
    subtext: 'From the first look to the last farewell, we freeze the moments you’ll want to relive. Natural, candid, timeless.',
    primaryCta: {
      label: 'Enquire on WhatsApp',
      action: 'whatsapp',
      message: 'Hello Perfect Studio! I am interested in Wedding Photography coverage for our celebration.',
    },
    secondaryCta: {
      label: 'Explore Photos',
      action: 'scroll',
      target: '#portfolio',
    },
    visualGuide: 'Mechanical aperture blades rotate open; framed wedding photos fly outward into a floating 3D gallery arc.',
  },
  {
    id: 'scene-4',
    sceneNumber: 4,
    scrollRange: [0.42, 0.57],
    title: 'We Bring It to Life',
    tagline: 'Wedding Videography',
    headline: 'Because some moments need to move.',
    subtext: 'Cinematic wedding films that let you hear the laughter, feel the vows and watch your day unfold again.',
    primaryCta: {
      label: 'Enquire on WhatsApp',
      action: 'whatsapp',
      message: 'Hello Perfect Studio! I would love to enquire about your Cinematic Wedding Videography films.',
    },
    secondaryCta: {
      label: 'Watch Showreel',
      action: 'scroll',
      target: '#showreel',
    },
    visualGuide: 'Camera transforms into cinema rig; a glowing golden 3D film strip spirals through space with moving frames.',
  },
  {
    id: 'scene-5',
    sceneNumber: 5,
    scrollRange: [0.57, 0.71],
    title: 'We Perfect',
    tagline: 'Photo Editing & Retouching',
    headline: 'Great photos become unforgettable.',
    subtext: 'Colour grading, skin retouching and artistic finishing, so every picture looks exactly the way it felt.',
    primaryCta: {
      label: 'Enquire on WhatsApp',
      action: 'whatsapp',
      message: 'Hello Perfect Studio! I am looking for professional Photo Editing & High-End Retouching services.',
    },
    secondaryCta: {
      label: 'See Editing Lab',
      action: 'scroll',
      target: '#editing-lab',
    },
    visualGuide: 'Central photo plane where a sweeping golden volumetric light beam dynamically transforms RAW to polished tone.',
  },
  {
    id: 'scene-6',
    sceneNumber: 6,
    scrollRange: [0.71, 0.85],
    title: 'We Create the Story',
    tagline: 'Video Editing & Color Grading',
    headline: 'Hours of footage. One film you’ll watch forever.',
    subtext: 'Storytelling edits, highlight reels, reels for social media and full-length wedding films, cut with rhythm and music that match your emotions.',
    primaryCta: {
      label: 'Enquire on WhatsApp',
      action: 'whatsapp',
      message: 'Hello Perfect Studio! I want to enquire about Wedding Video Editing & Color Grading post-production.',
    },
    secondaryCta: {
      label: 'View Packages',
      action: 'scroll',
      target: '#packages',
    },
    visualGuide: 'Floating clip planes snap onto a glowing 3D editing timeline with a gliding playhead and pulsing golden waveform.',
  },
  {
    id: 'scene-7',
    sceneNumber: 7,
    scrollRange: [0.85, 1.0],
    title: 'Forever',
    tagline: 'The Heirloom Finale',
    headline: 'Your story. Captured perfectly. Kept forever.',
    subtext: 'Your date is waiting. Let’s make it unforgettable.',
    primaryCta: {
      label: 'Book on WhatsApp',
      action: 'whatsapp',
      message: 'Hello Perfect Studio! We are ready to book our wedding dates with your team.',
    },
    secondaryCta: {
      label: 'Call Now',
      action: 'call',
      target: `tel:${PLACEHOLDERS.PHONE_RAW}`,
    },
    visualGuide: 'All frames and golden lights converge and fold into a 3D golden heirloom wedding album that opens with an inner glow.',
  },
];

/* =========================================================================
   THE 4 CORE SERVICES
   ========================================================================= */
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'wedding-photography',
    category: 'photography',
    title: 'Wedding Photography',
    subtitle: 'Candid & Traditional Excellence',
    description: 'Immortalizing intimate glances, tears of joy, and grand rituals through high-end prime optics, documentary intimacy, and editorial poise.',
    deliverables: [
      'Full Day Coverage (Bride & Groom Prep to Vidai)',
      'High-Resolution Curated & Color-Tuned Gallery',
      'Artistic Candid & Editorial Couple Portraits',
      'Premium Custom-Designed Leather Heirloom Album',
    ],
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
    whatsappMessage: 'Hi Perfect Studio, I want to discuss Wedding Photography coverage for our upcoming wedding.',
    badge: 'Most In-Demand',
  },
  {
    id: 'wedding-videography',
    category: 'videography',
    title: 'Wedding Videography',
    subtitle: 'Cinema-Grade 4K Masterpieces',
    description: 'We don’t just record video; we compose a motion picture of your heritage, directed with cinema cameras, gimbal fluidity, and pristine audio capture.',
    deliverables: [
      'Cinematic Wedding Teaser (60–90 seconds)',
      'Emotional Wedding Highlight Film (5–8 minutes)',
      'Full-Length Documentary Feature Film (45–90 minutes)',
      'Licensed Sound Design & High-Fidelity Audio',
    ],
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80',
    whatsappMessage: 'Hi Perfect Studio, I am interested in your Cinematic Wedding Videography packages.',
    badge: '4K Cinema',
  },
  {
    id: 'photo-editing',
    category: 'photo_editing',
    title: 'Photo Editing & Retouching',
    subtitle: 'Signature Color & Skin Artistry',
    description: 'Elevate RAW images into gallery-grade fine art. High-frequency skin texture separation, bespoke color tone grading, and sky/lighting enhancement.',
    deliverables: [
      'Signature Luxury Color Palettes (Warm Gold / Editorial Muted)',
      'Micro-Retouching & Flawless Skin Tone Retention',
      'Object Cleanup & Distraction Removal',
      'High-Resolution Print-Ready Color Profiles',
    ],
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    whatsappMessage: 'Hi Perfect Studio, I would like to enquire about your Photo Editing & High-End Retouching services.',
    badge: 'Atelier Quality',
  },
  {
    id: 'video-editing',
    category: 'video_editing',
    title: 'Video Editing & Color Grading',
    subtitle: 'Pacing, Rhythm & Davinci Polish',
    description: 'Complete post-production for couples and filmmakers. Multi-cam synchronization, emotional narrative cuts, dynamic audio mixing, and film-emulation color grading.',
    deliverables: [
      'DaVinci Resolve Cinema Film LUTs & Matching',
      'Multi-Cam Sync (Rituals, Speeches & Performances)',
      'Custom Instagram Reels & Vertical Cuts (9:16)',
      'Foley & Atmospheric Surround Sound Design',
    ],
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    whatsappMessage: 'Hi Perfect Studio, I need Video Editing & Color Grading post-production for my wedding footage.',
    badge: 'Cinema Grading',
  },
];

/* =========================================================================
   CURATED MASONRY PORTFOLIO (12 High-Res Working Items)
   ========================================================================= */
export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Regal Royal Palace Vows',
    couple: 'Aanya & Kabir',
    category: 'weddings',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'landscape',
    featured: true,
  },
  {
    id: 'port-2',
    title: 'Golden Hour Sunset Silhouette',
    couple: 'Meera & Siddharth',
    category: 'pre-wedding',
    location: 'Goa Coastal Cliffs',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'portrait',
    featured: true,
  },
  {
    id: 'port-3',
    title: 'The Sacred Pheras Glow',
    couple: 'Rhea & Dev',
    category: 'weddings',
    location: 'The Leela Palace, Jaipur',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'portrait',
  },
  {
    id: 'port-4',
    title: 'Symphony of Lights Cinema Teaser',
    couple: 'Tara & Arjun',
    category: 'videos',
    location: 'Heritage Haveli, Jodhpur',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'landscape',
    featured: true,
  },
  {
    id: 'port-5',
    title: 'Editorial Haute Couture Portrait',
    couple: 'Pooja & Rohan',
    category: 'edits',
    location: 'Taj Lake Palace',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'portrait',
  },
  {
    id: 'port-6',
    title: 'Intimate Whisper in the Courtyard',
    couple: 'Simran & Ishaan',
    category: 'pre-wedding',
    location: 'Kashmir Valley Meadows',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'landscape',
  },
  {
    id: 'port-7',
    title: 'Bridal Adornment in Gold & Vermilion',
    couple: 'Ananya S.',
    category: 'weddings',
    location: 'Mumbai Heritage Ballroom',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'portrait',
  },
  {
    id: 'port-8',
    title: 'Vintage Mercedes Grand Send-off',
    couple: 'Zoya & Farhan',
    category: 'videos',
    location: 'Alila Fort Bishangarh',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'landscape',
  },
  {
    id: 'port-9',
    title: 'RAW to Luxury Velvet Grading',
    couple: 'Natasha & Vikram',
    category: 'edits',
    location: 'Studio Post Lab',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
  },
  {
    id: 'port-10',
    title: 'The Euphoric Sangeet Night',
    couple: 'Diya & Manav',
    category: 'weddings',
    location: 'ITC Grand Bharat, Gurugram',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'landscape',
  },
  {
    id: 'port-11',
    title: 'Mist & Pine Forest Romance',
    couple: 'Kriti & Neil',
    category: 'pre-wedding',
    location: 'Shimla Pines',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'portrait',
  },
  {
    id: 'port-12',
    title: 'Timeless Monochromatic Portrait',
    couple: 'Sanjana & Aditya',
    category: 'edits',
    location: 'Studio Atelier',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'landscape',
  },
];

/* =========================================================================
   PACKAGES DATA (Silver, Gold, Platinum)
   ========================================================================= */
export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'silver',
    name: 'Silver Heirloom',
    tagline: 'Essential Grace for Intimate Celebrations',
    price: 'Custom Quote',
    duration: 'Up to 2 Days',
    deliverables: [
      '2 Dedicated Senior Photographers',
      '1 Cinematic Videographer',
      '300+ Artistically Color-Graded Photos',
      '1 Cinematic Highlight Film (3–5 min)',
      'Online Private Cloud Gallery (1 Year)',
      'Premium Hardcover Photo Book',
    ],
    popular: false,
    whatsappMessage: 'Hello Perfect Studio! I am enquiring about the Silver Heirloom Wedding Package.',
  },
  {
    id: 'gold',
    name: 'Gold Signature',
    tagline: 'The Definitive Luxury Wedding Experience',
    price: 'Most Popular',
    duration: 'Up to 3 Days',
    deliverables: [
      '3 Dedicated Master Photographers (Candid + Traditional)',
      '2 Cinema Camera Operators + 1 Drone Pilot',
      '600+ Hand-Retouched High-Res Images',
      '1 Teaser (60s) + 1 Feature Highlight (7–10 min)',
      'Full-Length Documentary Feature Video',
      '2 Luxury Handcrafted Italian Leather Albums',
      'Expedited 21-Day Final Handover',
    ],
    popular: true,
    whatsappMessage: 'Hello Perfect Studio! I would like to book the Gold Signature Wedding Package for our dates.',
  },
  {
    id: 'platinum',
    name: 'Platinum Royal',
    tagline: 'No Compromise. International Grandeur.',
    price: 'Grand Bespoke',
    duration: 'Unlimited Days',
    deliverables: [
      'Full Creative Team Directed by Lead Studio Principal',
      '4 Photographers + 3 Cinematographers + Aerial Drone Team',
      'Same-Day Edit / Next-Day Teaser Delivery',
      '1000+ Master Color-Tuned Photographs',
      'Full 60-Minute Cinema Film + Vertical Social Reels',
      '3 Bespoke Velvet & Gold Foil Heirloom Albums',
      'Archival 4K Master SSD in Velvet Presentation Box',
    ],
    popular: false,
    whatsappMessage: 'Hello Perfect Studio! We want to discuss the Platinum Royal Bespoke Wedding Experience.',
  },
];

/* =========================================================================
   5-STEP PROCESS
   ========================================================================= */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'The First Spark',
    timeline: 'Step 01',
    description: 'We connect on WhatsApp or private consultation to understand your traditions, wedding dates, and personal vision.',
    icon: 'MessageSquare',
  },
  {
    step: 2,
    title: 'The Visual Blueprint',
    timeline: 'Step 02',
    description: 'We curate a personalized moodboard, lighting architecture, shotlist, and coordinate wardrobe palettes with your stylist.',
    icon: 'Palette',
  },
  {
    step: 3,
    title: 'The Grand Celebration',
    timeline: 'Step 03',
    description: 'Our team captures your wedding with unobtrusive grace, preserving authentic emotion without interrupting the sacred flow.',
    icon: 'Camera',
  },
  {
    step: 4,
    title: 'The Darkroom Artistry',
    timeline: 'Step 04',
    description: 'Every frame enters our post-production lab for meticulous color grading, tone sculpting, skin retouching, and cinematic pacing.',
    icon: 'Sliders',
  },
  {
    step: 5,
    title: 'The Eternal Heirloom',
    timeline: 'Step 05',
    description: 'Your high-res private cloud gallery, 4K film masters, and handcrafted golden albums are delivered to treasure forever.',
    icon: 'BookOpen',
  },
];

/* =========================================================================
   TESTIMONIALS (Social Proof)
   ========================================================================= */
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    couple: 'Rhea & Anant Kapoor',
    location: 'Taj Falaknuma Palace, Hyderabad',
    quote: 'Perfect Studio didn’t just photograph our wedding; they captured the invisible feelings. Watching our teaser brought tears back to our eyes. Their calm presence made our three days effortless.',
    service: 'Gold Signature Package',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-2',
    couple: 'Dr. Tanya & Siddharth Mehta',
    location: 'Umaid Bhawan, Jodhpur',
    quote: 'The level of color grading and video rhythm was beyond anything we imagined. It felt like watching an A24 romantic cinema film. Our families are still raving about the heirloom albums.',
    service: 'Platinum Royal Experience',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-3',
    couple: 'Zoya & Farhan Merchant',
    location: 'Destination Wedding, Dubai',
    quote: 'As an agency creative director, I had impossibly high standards for framing and lighting. Perfect Studio blew past every expectation. Their candid timing is world-class.',
    service: 'Cinematic Videography & Photography',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=300&q=80',
  },
];

/* =========================================================================
   FREQUENTLY ASKED QUESTIONS
   ========================================================================= */
export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How far in advance should we reserve our wedding dates?',
    answer: 'Because we commit our core senior team to only one grand wedding per calendar weekend, dates generally book 4 to 12 months in advance—especially for prime auspicious wedding dates across November through March.',
  },
  {
    id: 'faq-2',
    question: 'Do you travel for destination weddings across India and worldwide?',
    answer: 'Yes, over 65% of our commissions are destination celebrations. We travel across Rajasthan, Goa, Kerala, Himachal, Mumbai, Delhi, Dubai, Thailand, and Europe. Travel and stay are arranged collaboratively.',
  },
  {
    id: 'faq-3',
    question: 'What is your turnaround time for final photos and cinematic films?',
    answer: 'We provide a curated “Sneak Peek” selection of 30–50 color-graded photos within 72 hours for family sharing. The complete high-res photo gallery is delivered in 3 to 4 weeks. Full cinematic films and heirloom albums are perfected within 5 to 8 weeks.',
  },
  {
    id: 'faq-4',
    question: 'Can we hire Perfect Studio only for Photo or Video Post-Production editing?',
    answer: 'Yes! We run an elite post-production suite offering high-end skin retouching, color grading, DaVinci Resolve color passes, and highlight editing for couples and fellow professional filmmakers globally.',
  },
  {
    id: 'faq-5',
    question: 'Do you provide raw unedited footage and photographs?',
    answer: 'While our craft is defined by meticulous color grading and storytelling cuts, we can provide the full raw archival footage and high-res source files upon request via an archival high-speed SSD drive.',
  },
  {
    id: 'faq-6',
    question: 'What is the booking process to lock our date?',
    answer: 'Simply tap the “Book on WhatsApp” button to share your wedding dates, venues, and requirements. We schedule a brief vision call, finalize your deliverables, and secure your date upon receipt of an advance retainer.',
  },
];

/* =========================================================================
   ANIMATED STUDIO METRICS
   ========================================================================= */
export const STUDIO_STATS: StudioStat[] = [
  {
    label: 'Weddings Documented',
    value: 450,
    suffix: '+',
    description: 'Across 18 luxury destinations worldwide',
  },
  {
    label: 'Happy Couples',
    value: 600,
    suffix: '+',
    description: 'Eternal stories preserved in timeless grace',
  },
  {
    label: 'Years of Artistry',
    value: 12,
    suffix: '+',
    description: 'Pioneering emotional luxury storytelling',
  },
  {
    label: 'Films Delivered',
    value: 380,
    suffix: '+',
    description: '4K cinema pieces cut with heart and rhythm',
  },
];

/* =========================================================================
   NAVIGATION LINKS
   ========================================================================= */
export const NAV_LINKS = [
  { label: 'The Story', href: '#story-scroll-container' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Editing Lab', href: '#editing-lab' },
  { label: 'Process', href: '#process' },
  { label: 'Packages', href: '#packages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;
