import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { PLACEHOLDERS, SERVICES_DATA } from '@/constants/siteData';

// Configure Luxury Google Fonts
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Viewport configuration
export const viewport: Viewport = {
  themeColor: '#060606',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Next.js SEO Metadata
export const metadata: Metadata = {
  title: `${PLACEHOLDERS.LOGO_TEXT} | Luxury Wedding Photography, Videography & Editing`,
  description:
    'Every love story deserves to be remembered perfectly. Bespoke wedding photography, cinematic videography, and master post-production crafted with emotion.',
  keywords: [
    'PERFECT STUDIO',
    'Luxury Wedding Photography',
    'Cinematic Wedding Videography',
    'Wedding Video Editing',
    'High-End Photo Retouching',
    'DaVinci Resolve Color Grading',
    'Destination Wedding Photographer India',
    'Udaipur Wedding Photography',
    'Surat Wedding Cinema',
  ],
  authors: [{ name: PLACEHOLDERS.LOGO_TEXT }],
  creator: PLACEHOLDERS.LOGO_TEXT,
  publisher: PLACEHOLDERS.LOGO_TEXT,
  metadataBase: new URL('https://perfectstudio.luxury'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo-placeholder.svg',
    shortcut: '/logo-placeholder.svg',
    apple: '/logo-placeholder.svg',
  },
  openGraph: {
    title: `${PLACEHOLDERS.LOGO_TEXT} | Luxury Wedding Photography, Videography & Editing`,
    description:
      'Every love story deserves to be remembered perfectly. Bespoke wedding photography, cinematic videography, and master post-production crafted with emotion.',
    url: 'https://perfectstudio.luxury',
    siteName: PLACEHOLDERS.LOGO_TEXT,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: `${PLACEHOLDERS.LOGO_TEXT} - Fine Art Wedding Photography`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PLACEHOLDERS.LOGO_TEXT} | Luxury Wedding Photography, Videography & Editing`,
    description:
      'Every love story deserves to be remembered perfectly. Bespoke wedding photography, cinematic videography, and master post-production crafted with emotion.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org JSON-LD Structured Data for LocalBusiness & PhotographyBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': 'https://perfectstudio.luxury/#organization',
        name: PLACEHOLDERS.LOGO_TEXT,
        alternateName: 'Perfect Studio Wedding Atelier',
        url: 'https://perfectstudio.luxury',
        logo: 'https://perfectstudio.luxury/logo-placeholder.svg',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        description:
          'Luxury wedding photography, cinematic 4K videography, fine-art skin retouching, and video color grading.',
        telephone: PLACEHOLDERS.PHONE_NUMBER,
        email: PLACEHOLDERS.EMAIL,
        priceRange: '$$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: PLACEHOLDERS.FULL_ADDRESS,
          addressLocality: PLACEHOLDERS.CITY,
          addressRegion: PLACEHOLDERS.STATE,
          postalCode: '395002',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '21.1702',
          longitude: '72.8311',
        },
        sameAs: [
          PLACEHOLDERS.INSTAGRAM_URL,
          PLACEHOLDERS.YOUTUBE_URL,
          PLACEHOLDERS.FACEBOOK_URL,
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: PLACEHOLDERS.PHONE_NUMBER,
            contactType: 'reservations',
            availableLanguage: ['English', 'Hindi', 'Gujarati'],
            contactOption: 'WhatsAppAvailable',
          },
        ],
        makesOffer: SERVICES_DATA.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} dark`}
    >
      <body
        suppressHydrationWarning
        className="bg-obsidian text-ivory font-sans antialiased selection:bg-gold-primary/30 selection:text-ivory overflow-x-hidden min-h-screen relative"
      >
        {/* Schema.org JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Cinematic Atmospheric SVG Film Grain Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Global Page Content */}
        {children}
      </body>
    </html>
  );
}
