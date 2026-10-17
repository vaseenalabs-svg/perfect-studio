'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from '@/components/story/Preloader';
import { Navbar } from '@/components/ui/Navbar';
import { AboutStatsSection } from '@/components/sections/AboutStatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { EditingShowcase } from '@/components/sections/EditingShowcase';
import { PackagesSection } from '@/components/sections/PackagesSection';
import { TestimonialsAndFAQ } from '@/components/sections/TestimonialsAndFAQ';
import { BookingFormSection } from '@/components/sections/BookingFormSection';
import { Footer } from '@/components/ui/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

import { ScrollStoryExperience } from '@/components/story/ScrollStoryExperience';

export default function Home() {
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Trigger ScrollTrigger refresh once preloader is finished
  const handlePreloaderComplete = () => {
    setIsPreloaded(true);
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  };

  return (
    <main className="relative min-h-screen bg-obsidian text-ivory overflow-x-hidden selection:bg-gold-primary/30 selection:text-ivory">
      {/* ===================================================================
          SCENE 0: LUXURY PRELOADER
          Golden spark particle ring forming PERFECT STUDIO crest
          =================================================================== */}
      <Preloader onComplete={handlePreloaderComplete} minDurationMs={2200} />

      {/* ===================================================================
          STICKY LUXURY NAVIGATION (z-50)
          Transitions to dark glassmorphism upon scrolling > 50px
          =================================================================== */}
      <Navbar />

      {/* ===================================================================
          LAYER 1 & 2: THE 7-SCENE 3D SCROLL EXPERIENCE (700vh)
          Persistent fixed R3F Canvas + GSAP ScrollTrigger HTML Overlays
          =================================================================== */}
      <ScrollStoryExperience />

      {/* ===================================================================
          LAYER 3: POST-STORY CONVERSION SECTIONS (z-20)
          Elevated solid obsidian surface with smooth gradient transition bridge
          =================================================================== */}
      <div className="relative z-20 bg-obsidian">
        {/* Smooth Gradient Transition Bridge from 3D Story Canvas */}
        <div className="w-full h-36 bg-gradient-to-b from-transparent via-obsidian/70 to-obsidian pointer-events-none" />

        {/* 1. Studio Heritage & Key Metrics */}
        <AboutStatsSection />

        {/* 2. Four Pillars of Services (Photography, Videography, Retouching, Video Editing) */}
        <ServicesSection />

        {/* 3. Filterable Masonry Portfolio + Lightbox Modal */}
        <PortfolioSection />

        {/* 4. Interactive Before/After Split Slider & 4K Showreel Theater */}
        <EditingShowcase />

        {/* 5. Why Choose Us, 5-Step Process Timeline & Packages (Silver, Gold, Platinum) */}
        <PackagesSection />

        {/* 6. Client Love Stories Carousel & FAQ Accordion */}
        <TestimonialsAndFAQ />

        {/* 7. Smart WhatsApp Booking Form Engine */}
        <BookingFormSection />

        {/* 8. Luxury Studio Footer */}
        <Footer />
      </div>

      {/* ===================================================================
          PERSISTENT CONVERSION WIDGETS
          Desktop Bottom-Right Pulse Button + Mobile Sticky Action Bar
          =================================================================== */}
      <FloatingWhatsApp />
    </main>
  );
}
