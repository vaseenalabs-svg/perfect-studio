'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { PLACEHOLDERS } from '@/constants/siteData';
import { triggerWhatsApp } from '@/utils/whatsapp';
import {
  Sliders,
  Play,
  X,
  Sparkles,
  Palette,
  Film,
  Volume2,
  Clock,
  MessageCircle,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';

interface ComparisonPair {
  id: string;
  name: string;
  location: string;
  before: string;
  after: string;
  description: string;
}

const COMPARISON_PRESETS: ComparisonPair[] = [
  {
    id: 'preset-1',
    name: 'Imperial Palace Pheras',
    location: 'Udaipur, Rajasthan',
    before: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=70',
    after: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=95&sat=25&con=18',
    description: 'Transforming flat S-Log profile into golden hour velvet tones with delicate silk texture retention.',
  },
  {
    id: 'preset-2',
    name: 'Twilight Coastal Silhouette',
    location: 'Goa Cliffs',
    before: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=70',
    after: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=95&sat=30&con=20',
    description: 'Bespoke sky gradient enhancement, golden backlight blooming, and high-frequency skin separation.',
  },
  {
    id: 'preset-3',
    name: 'Haute Couture Bridal Portrait',
    location: 'Studio Atelier',
    before: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=70',
    after: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=95&sat=22&con=16',
    description: 'Editorial magazine polish, jewelry luster accentuation, and micro-blemish retouching.',
  },
];

const POST_PRODUCTION_PILLARS = [
  {
    icon: Palette,
    title: 'Signature Color Grading',
    description: 'Bespoke DaVinci Resolve color pipelines featuring warmth, rich champagne golds, and filmic roll-off.',
  },
  {
    icon: Sparkles,
    title: 'Micro-Skin Retouching',
    description: 'Frequency separation preserving natural pores and skin tones without artificial plasticky smoothing.',
  },
  {
    icon: Volume2,
    title: 'Surround Sound Design',
    description: 'Licensed orchestral scores, immersive foley, and crystal-clear vows mixed to broadcast standards.',
  },
  {
    icon: Clock,
    title: 'Storytelling Rhythm',
    description: 'Every cut placed intentionally to synchronize with tears, heartbeats, and sacred musical climaxes.',
  },
];

export const EditingShowcase: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock when video modal is open
  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setVideoError(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoModalOpen]);

  const activePreset = COMPARISON_PRESETS[activePresetIndex];
  const isEmbed =
    PLACEHOLDERS.SHOWREEL_VIDEO_URL.includes('youtube') ||
    PLACEHOLDERS.SHOWREEL_VIDEO_URL.includes('youtu.be') ||
    PLACEHOLDERS.SHOWREEL_VIDEO_URL.includes('vimeo');

  return (
    <section id="editing-lab" className="relative w-full py-28 md:py-36 bg-[#080809] text-ivory">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gold-primary/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-4">
            <Sliders className="w-3.5 h-3.5 text-gold-light" />
            <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
              Post-Production & Grading Suite
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory max-w-3xl leading-[1.12]">
            Where Raw Emotion Becomes{' '}
            <span className="italic font-light gold-gradient-text">Pure Cinema.</span>
          </h2>

          <p className="mt-5 font-sans text-sm md:text-base text-taupe max-w-2xl font-light leading-relaxed">
            A photo or film clip is only half-born when the shutter closes. In our darkroom and
            color grading suite, every frame is sculpted with fine-art precision.
          </p>

          {/* Preset Pair Switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {COMPARISON_PRESETS.map((preset, pIdx) => {
              const isSelected = activePresetIndex === pIdx;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setActivePresetIndex(pIdx)}
                  className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-luxury transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-gold-primary to-gold-light text-obsidian font-medium shadow-gold-subtle'
                      : 'glass-pill text-taupe hover:text-ivory'
                  }`}
                >
                  <span>Preset {pIdx + 1}: {preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Interactive Before/After Split Slider */}
        <div className="max-w-5xl mx-auto mb-24">
          <BeforeAfterSlider
            key={activePreset.id}
            beforeImage={activePreset.before}
            afterImage={activePreset.after}
            beforeLabel="RAW CAMERA PROFILE"
            afterLabel="PERFECT STUDIO SIGNATURE GRADE"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 px-2 text-taupe">
            <div>
              <span className="font-serif text-lg text-ivory">{activePreset.name}</span>
              <span className="text-xs text-gold-primary/80 ml-2">({activePreset.location})</span>
              <p className="font-sans text-xs text-taupe-light mt-1">{activePreset.description}</p>
            </div>
            <button
              type="button"
              data-analytics-event="whatsapp_enquiry"
              data-source-scene="before_after_slider"
              data-service-type="Photo Editing"
              onClick={() =>
                triggerWhatsApp({
                  message: `Hello Perfect Studio! I saw the Before/After Grading comparison for "${activePreset.name}" and would like to hire you for Photo Editing & Retouching services.`,
                  sourceScene: 'before_after_slider',
                  service: 'Photo Editing',
                })
              }
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill text-gold-light hover:border-gold-primary text-xs uppercase tracking-luxury transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Grade My Photos</span>
            </button>
          </div>
        </div>

        {/* 2. Cinematic Showreel Theater Card */}
        <div id="showreel" className="max-w-5xl mx-auto mb-20">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-gold-muted/50 bg-charcoal shadow-glass group cursor-pointer"
            onClick={() => setIsVideoModalOpen(true)}
          >
            {/* Showreel Video Thumbnail */}
            <Image
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1600&q=85"
              alt="Cinematic Wedding Showreel"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-75 group-hover:opacity-85 transition-opacity" />

            {/* Pulsing Golden Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-28 h-28 rounded-full bg-gold-primary/20 blur-xl animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep border-2 border-gold-light text-obsidian flex items-center justify-center shadow-gold-glow group-hover:scale-115 transition-transform duration-300">
                  <Play className="w-8 h-8 fill-obsidian ml-1" />
                </div>
              </div>

              <span className="mt-5 font-serif text-2xl md:text-3xl font-normal text-ivory tracking-wide">
                Watch Official 4K Showreel
              </span>
              <span className="mt-1 font-sans text-xs tracking-luxury text-gold-light uppercase">
                Runtime: 03:45 · 4K Cinema Audio
              </span>
            </div>
          </div>
        </div>

        {/* 3. 4 Key Post-Production Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {POST_PRODUCTION_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-gold-muted/30 hover:border-gold-primary/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-light mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg text-ivory mb-2">{pillar.title}</h4>
                <p className="font-sans text-xs text-taupe leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Editing CTA Button */}
        <div className="flex justify-center">
          <button
            type="button"
            data-analytics-event="whatsapp_enquiry"
            data-source-scene="editing_lab_cta"
            data-service-type="Video Editing"
            onClick={() =>
              triggerWhatsApp({
                message: 'Hello Perfect Studio! I am enquiring about your professional Wedding Film Editing & Post-Production services.',
                sourceScene: 'editing_lab_cta',
                service: 'Video Editing',
              })
            }
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire for Editing Services on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Embedded Showreel Video Modal (Rendered outside stacking context) */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed inset-0 z-[9999] bg-[#060608]/96 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 cursor-default"
            >
              {/* Top Navigation Bar with Clear Back Option */}
              <div
                className="w-full max-w-6xl flex items-center justify-between z-30 pt-2 pb-3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Prominent Back Button */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-charcoal/90 hover:bg-charcoal-elevated border border-gold-muted/60 hover:border-gold-primary text-gold-light hover:text-ivory transition-all duration-300 shadow-glass group cursor-pointer"
                  aria-label="Back to Studio"
                >
                  <ArrowLeft className="w-4 h-4 text-gold-primary transition-transform group-hover:-translate-x-1" />
                  <span className="font-sans text-xs uppercase tracking-luxury font-medium">
                    ← Back to Studio
                  </span>
                </button>

                {/* Center Title */}
                <div className="hidden sm:flex items-center gap-2.5 bg-charcoal/70 px-5 py-2 rounded-full border border-gold-muted/30">
                  <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse-subtle" />
                  <span className="font-serif text-sm tracking-widest uppercase text-ivory">
                    Official 4K Cinematic Showreel
                  </span>
                </div>

                {/* Right Close Button */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-charcoal/90 hover:bg-charcoal-elevated border border-gold-muted/60 hover:border-gold-primary text-taupe-light hover:text-ivory transition-all duration-300 shadow-glass cursor-pointer"
                  aria-label="Close showreel"
                >
                  <span className="font-sans text-xs uppercase tracking-luxury hidden sm:inline">Close (Esc)</span>
                  <X className="w-4 h-4 text-gold-light" />
                </button>
              </div>

              {/* Center Video Stage */}
              <div
                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-gold-muted/50 shadow-glass bg-black my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {videoError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-charcoal">
                    <AlertCircle className="w-12 h-12 text-gold-primary mb-4" />
                    <h3 className="font-serif text-2xl text-ivory mb-2">Showreel Stream Offline</h3>
                    <p className="font-sans text-xs text-taupe max-w-md mb-6 leading-relaxed">
                      Connect directly on WhatsApp to receive our private Google Drive / YouTube 4K HDR Showreel portfolio link.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        triggerWhatsApp({
                          message: 'Hello Perfect Studio! Could you please share the direct private link to your 4K Wedding Showreel?',
                          sourceScene: 'showreel_error',
                          service: 'Video Editing',
                        })
                      }
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Get 4K Link on WhatsApp</span>
                    </button>
                  </div>
                ) : isEmbed ? (
                  <iframe
                    src={PLACEHOLDERS.SHOWREEL_VIDEO_URL}
                    title="Perfect Studio Wedding Film 4K Showreel"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={PLACEHOLDERS.SHOWREEL_VIDEO_URL}
                    controls
                    playsInline
                    autoPlay
                    className="w-full h-full object-cover"
                    onError={() => setVideoError(true)}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Bottom WhatsApp Enquiry Bar */}
              <div
                className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-sans text-xs text-taupe text-center sm:text-left">
                  Filmed in 4K Cinema RAW · Graded in DaVinci Resolve · Dolby Mastered Audio
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(false)}
                    className="sm:hidden px-4 py-2.5 rounded-full border border-gold-muted/60 text-xs font-sans text-taupe-light hover:text-ivory"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    data-analytics-event="whatsapp_enquiry"
                    data-source-scene="showreel_modal"
                    data-service-type="Cinematic Videography"
                    onClick={() =>
                      triggerWhatsApp({
                        message: 'Hello Perfect Studio! I just watched your 4K Wedding Showreel and would love to discuss film coverage for our wedding.',
                        sourceScene: 'showreel_modal',
                        service: 'Cinematic Videography',
                      })
                    }
                    className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book Your Wedding Film</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default EditingShowcase;
