'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { STORY_SCENES, PLACEHOLDERS } from '@/constants/siteData';
import { triggerWhatsApp } from '@/utils/whatsapp';
import { MessageCircle, Phone, ArrowDown, ChevronRight } from 'lucide-react';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import Story3DCanvas with SSR disabled
const Story3DCanvas = dynamic(() => import('./Story3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-obsidian flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
    </div>
  ),
});

export const ScrollStoryExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(1);

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Setup GSAP ScrollTrigger pinned timeline
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;

    let triggerInstance: ScrollTrigger | null = null;

    if (container) {
      triggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Determine active chapter (1 to 7)
          let sceneIdx = 1;
          if (progress <= 0.14) sceneIdx = 1;
          else if (progress <= 0.28) sceneIdx = 2;
          else if (progress <= 0.42) sceneIdx = 3;
          else if (progress <= 0.57) sceneIdx = 4;
          else if (progress <= 0.71) sceneIdx = 5;
          else if (progress <= 0.85) sceneIdx = 6;
          else sceneIdx = 7;

          setActiveSceneIndex(sceneIdx);
        },
      });
    }

    return () => {
      if (triggerInstance) triggerInstance.kill();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Helper to compute scene opacity & translation from master scrollProgress
  const getSceneStyle = (start: number, end: number) => {
    const fadeInWindow = 0.035;
    const fadeOutWindow = 0.035;

    let opacity = 0;
    let translateY = 20;

    if (scrollProgress >= start && scrollProgress <= end) {
      if (scrollProgress < start + fadeInWindow) {
        // Fading in
        const p = (scrollProgress - start) / fadeInWindow;
        opacity = p;
        translateY = (1 - p) * 20;
      } else if (scrollProgress > end - fadeOutWindow && end < 1.0) {
        // Fading out
        const p = (end - scrollProgress) / fadeOutWindow;
        opacity = p;
        translateY = (1 - p) * -20;
      } else {
        // Fully visible
        opacity = 1;
        translateY = 0;
      }
    }

    const isVisible = opacity > 0.01;

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      visibility: isVisible ? ('visible' as const) : ('hidden' as const),
      pointerEvents: isVisible && opacity > 0.5 ? ('auto' as const) : ('none' as const),
      transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
    };
  };

  // Scroll to section helper
  const scrollToSection = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="story-scroll-container"
      ref={containerRef}
      className="relative w-full h-[700vh] bg-obsidian text-ivory select-none"
    >
      {/* 1. Persistent Fixed 3D WebGL Canvas Layer (z-0) */}
      <Story3DCanvas scrollProgress={scrollProgress} activeScene={activeSceneIndex} />

      {/* 2. Pinned 100vh Fullscreen DOM Narrative Overlay Layer (z-10) */}
      <div
        ref={pinSectionRef}
        className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12 transition-all duration-500"
        style={{
          opacity: scrollProgress >= 0.99 ? 0 : 1,
          visibility: scrollProgress >= 0.99 ? 'hidden' : 'visible',
        }}
      >
        {/* Top Header Row / Story Status Track */}
        <div className="flex items-center justify-end w-full max-w-7xl mx-auto pt-14 md:pt-10 pointer-events-auto">
          {/* Story Progression Indicator */}
          <div className="flex items-center gap-3 bg-charcoal/60 backdrop-blur-md px-4 py-2 rounded-full border border-gold-muted/40 shadow-glass">
            <div className="w-20 h-[2px] bg-charcoal-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-primary to-gold-light transition-all duration-300"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="font-sans text-[11px] text-gold-light font-medium tracking-wider">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Central Narrative Overlays (Scenes 1 to 7) */}
        <div className="relative w-full max-w-5xl mx-auto my-auto flex items-center justify-center min-h-[420px]">
          {/* ===============================================================
              SCENE 1: THE BEGINNING (HERO)
              =============================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={getSceneStyle(0.0, 0.14)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light mb-4 px-3 py-1 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-sm">
              {STORY_SCENES[1].tagline}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-ivory max-w-4xl leading-[1.08]">
              Every love story deserves to be{' '}
              <span className="italic font-light gold-gradient-text">remembered perfectly.</span>
            </h1>
            <p className="mt-6 font-sans text-sm md:text-lg text-taupe-light max-w-2xl font-light leading-relaxed">
              {STORY_SCENES[1].subtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-analytics-event="whatsapp_enquiry"
                data-source-scene="scene-1"
                data-service-type="General"
                onClick={() =>
                  triggerWhatsApp({
                    message: STORY_SCENES[1].primaryCta?.message || '',
                    sourceScene: 'scene-1',
                    service: 'General',
                  })
                }
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{STORY_SCENES[1].primaryCta?.label}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('#services')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full glass-pill text-ivory font-sans text-xs tracking-luxury uppercase hover:border-gold-primary/60 transition-all duration-300"
              >
                <span>{STORY_SCENES[1].secondaryCta?.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-primary" />
              </button>
            </div>
          </div>

          {/* ===============================================================
              SCENE 2: THE MOMENT
              =============================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={getSceneStyle(0.14, 0.28)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light mb-4 px-3 py-1 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-sm">
              {STORY_SCENES[2].tagline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-ivory max-w-4xl leading-[1.12]">
              A wedding lasts a day.{' '}
              <span className="italic font-light gold-gradient-text">
                The feeling should last a lifetime.
              </span>
            </h2>
            <p className="mt-6 font-sans text-sm md:text-lg text-taupe-light max-w-2xl font-light leading-relaxed">
              {STORY_SCENES[2].subtext}
            </p>
          </div>

          {/* ===============================================================
              SCENE 3: WEDDING PHOTOGRAPHY (WE CAPTURE)
              =============================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={getSceneStyle(0.28, 0.42)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light mb-4 px-3 py-1 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-sm">
              {STORY_SCENES[3].tagline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-ivory max-w-4xl leading-[1.12]">
              Every glance. Every smile.{' '}
              <span className="italic font-light gold-gradient-text">Every detail.</span>
            </h2>
            <p className="mt-6 font-sans text-sm md:text-lg text-taupe-light max-w-2xl font-light leading-relaxed">
              {STORY_SCENES[3].subtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-analytics-event="whatsapp_enquiry"
                data-source-scene="scene-3"
                data-service-type="Wedding Photography"
                onClick={() =>
                  triggerWhatsApp({
                    message: STORY_SCENES[3].primaryCta?.message || '',
                    sourceScene: 'scene-3',
                    service: 'Wedding Photography',
                  })
                }
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{STORY_SCENES[3].primaryCta?.label}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('#portfolio')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full glass-pill text-ivory font-sans text-xs tracking-luxury uppercase hover:border-gold-primary/60 transition-all duration-300"
              >
                <span>{STORY_SCENES[3].secondaryCta?.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-primary" />
              </button>
            </div>
          </div>

          {/* ===============================================================
              SCENE 4: WEDDING VIDEOGRAPHY (WE BRING IT TO LIFE)
              =============================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={getSceneStyle(0.42, 0.57)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light mb-4 px-3 py-1 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-sm">
              {STORY_SCENES[4].tagline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-ivory max-w-4xl leading-[1.12]">
              Because some moments{' '}
              <span className="italic font-light gold-gradient-text">need to move.</span>
            </h2>
            <p className="mt-6 font-sans text-sm md:text-lg text-taupe-light max-w-2xl font-light leading-relaxed">
              {STORY_SCENES[4].subtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-analytics-event="whatsapp_enquiry"
                data-source-scene="scene-4"
                data-service-type="Wedding Videography"
                onClick={() =>
                  triggerWhatsApp({
                    message: STORY_SCENES[4].primaryCta?.message || '',
                    sourceScene: 'scene-4',
                    service: 'Wedding Videography',
                  })
                }
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{STORY_SCENES[4].primaryCta?.label}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('#showreel')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full glass-pill text-ivory font-sans text-xs tracking-luxury uppercase hover:border-gold-primary/60 transition-all duration-300"
              >
                <span>{STORY_SCENES[4].secondaryCta?.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-primary" />
              </button>
            </div>
          </div>

          {/* ===============================================================
              SCENE 5: PHOTO EDITING (WE PERFECT)
              =============================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={getSceneStyle(0.57, 0.71)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light mb-4 px-3 py-1 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-sm">
              {STORY_SCENES[5].tagline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-ivory max-w-4xl leading-[1.12]">
              Great photos become{' '}
              <span className="italic font-light gold-gradient-text">unforgettable.</span>
            </h2>
            <p className="mt-6 font-sans text-sm md:text-lg text-taupe-light max-w-2xl font-light leading-relaxed">
              {STORY_SCENES[5].subtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-analytics-event="whatsapp_enquiry"
                data-source-scene="scene-5"
                data-service-type="Photo Editing"
                onClick={() =>
                  triggerWhatsApp({
                    message: STORY_SCENES[5].primaryCta?.message || '',
                    sourceScene: 'scene-5',
                    service: 'Photo Editing',
                  })
                }
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{STORY_SCENES[5].primaryCta?.label}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('#editing-lab')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full glass-pill text-ivory font-sans text-xs tracking-luxury uppercase hover:border-gold-primary/60 transition-all duration-300"
              >
                <span>{STORY_SCENES[5].secondaryCta?.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-primary" />
              </button>
            </div>
          </div>

          {/* ===============================================================
              SCENE 6: VIDEO EDITING (WE CREATE THE STORY)
              =============================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={getSceneStyle(0.71, 0.85)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light mb-4 px-3 py-1 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-sm">
              {STORY_SCENES[6].tagline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-ivory max-w-4xl leading-[1.12]">
              Hours of footage.{' '}
              <span className="italic font-light gold-gradient-text">
                One film you’ll watch forever.
              </span>
            </h2>
            <p className="mt-6 font-sans text-sm md:text-lg text-taupe-light max-w-2xl font-light leading-relaxed">
              {STORY_SCENES[6].subtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-analytics-event="whatsapp_enquiry"
                data-source-scene="scene-6"
                data-service-type="Video Editing"
                onClick={() =>
                  triggerWhatsApp({
                    message: STORY_SCENES[6].primaryCta?.message || '',
                    sourceScene: 'scene-6',
                    service: 'Video Editing',
                  })
                }
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{STORY_SCENES[6].primaryCta?.label}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('#packages')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full glass-pill text-ivory font-sans text-xs tracking-luxury uppercase hover:border-gold-primary/60 transition-all duration-300"
              >
                <span>{STORY_SCENES[6].secondaryCta?.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-primary" />
              </button>
            </div>
          </div>

          {/* ===============================================================
              SCENE 7: FOREVER (FINALE CTA)
              =============================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={getSceneStyle(0.85, 1.0)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light mb-4 px-3 py-1 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-sm">
              {STORY_SCENES[7].tagline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-ivory max-w-4xl leading-[1.12]">
              Your story. Captured perfectly.{' '}
              <span className="italic font-light gold-gradient-text">Kept forever.</span>
            </h2>
            <p className="mt-6 font-sans text-sm md:text-lg text-taupe-light max-w-2xl font-light leading-relaxed">
              {STORY_SCENES[7].subtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-analytics-event="whatsapp_enquiry"
                data-source-scene="scene-7"
                data-service-type="Booking"
                onClick={() =>
                  triggerWhatsApp({
                    message: STORY_SCENES[7].primaryCta?.message || '',
                    sourceScene: 'scene-7',
                    service: 'Booking',
                  })
                }
                className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{STORY_SCENES[7].primaryCta?.label}</span>
              </button>
              <a
                href={`tel:${PLACEHOLDERS.PHONE_RAW}`}
                data-analytics-event="phone_call"
                data-source-scene="scene-7"
                className="flex items-center gap-2 px-7 py-4 rounded-full glass-pill text-ivory font-sans text-xs tracking-luxury uppercase hover:border-gold-primary/60 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-gold-primary" />
                <span>Call Now ({PLACEHOLDERS.PHONE_NUMBER})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Prompt */}
        <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto pb-4 pointer-events-auto">
          {scrollProgress < 0.95 ? (
            <div className="flex items-center gap-2 text-taupe font-sans text-[11px] tracking-widest uppercase opacity-75 animate-bounce">
              <span>Scroll to experience</span>
              <ArrowDown className="w-3.5 h-3.5 text-gold-primary" />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => scrollToSection('#about')}
              className="flex items-center gap-2 text-gold-light font-sans text-[11px] tracking-widest uppercase hover:text-white transition-colors"
            >
              <span>Explore Studio Details</span>
              <ArrowDown className="w-3.5 h-3.5 text-gold-primary" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScrollStoryExperience;
