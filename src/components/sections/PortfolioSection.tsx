'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, PortfolioItem } from '@/constants/siteData';
import { TiltCard } from '@/components/ui/TiltCard';
import { triggerWhatsApp } from '@/utils/whatsapp';
import {
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  MapPin,
  ArrowLeft,
} from 'lucide-react';

type FilterCategory = 'all' | 'weddings' | 'pre-wedding' | 'videos' | 'edits';

const FILTER_TABS: { label: string; value: FilterCategory }[] = [
  { label: 'All Works', value: 'all' },
  { label: 'Weddings', value: 'weddings' },
  { label: 'Pre-Wedding', value: 'pre-wedding' },
  { label: 'Cinematic Films', value: 'videos' },
  { label: 'Fine Art Edits', value: 'edits' },
];

export const PortfolioSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filtered portfolio items
  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const selectedItem: PortfolioItem | null =
    selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  // Lightbox navigation
  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredItems.length - 1
    );
  }, [selectedItemIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev! < filteredItems.length - 1 ? prev! + 1 : 0
    );
  }, [selectedItemIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setSelectedItemIndex(null);
  }, []);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, handleClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (selectedItemIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItemIndex]);

  return (
    <section id="portfolio" className="relative w-full py-28 md:py-36 bg-obsidian text-ivory">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
              Curated Atelier Portfolio
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory max-w-3xl leading-[1.12]">
            Timeless Love in{' '}
            <span className="italic font-light gold-gradient-text">Every Grain of Light.</span>
          </h2>

          <p className="mt-5 font-sans text-sm md:text-base text-taupe max-w-xl font-light leading-relaxed">
            From imperial palace vows in Rajasthan to quiet seaside vows at twilight, explore our
            signature captures across photography, cinema, and fine-art grading.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-3 p-1.5 rounded-full bg-charcoal-elevated/70 border border-charcoal-border backdrop-blur-xl">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.value);
                    setSelectedItemIndex(null);
                  }}
                  className={`relative px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-luxury transition-all duration-300 ${
                    isActive ? 'text-obsidian font-medium' : 'text-taupe hover:text-ivory'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePortfolioFilter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-primary to-gold-light shadow-gold-subtle"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Editorial Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const aspectClass =
                item.aspectRatio === 'portrait'
                  ? 'h-[440px]'
                  : item.aspectRatio === 'square'
                  ? 'h-[360px]'
                  : 'h-[320px]';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="w-full"
                >
                  <TiltCard className="w-full h-full">
                    <div
                      onClick={() => setSelectedItemIndex(index)}
                      className={`group relative w-full ${aspectClass} rounded-2xl overflow-hidden cursor-pointer border border-gold-muted/30 bg-charcoal shadow-glass hover:border-gold-primary/60 transition-all duration-500`}
                    >
                      {/* High-Resolution Photograph */}
                      <Image
                        src={item.image}
                        alt={`${item.title} - ${item.couple}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />

                      {/* Cinematic Gradient Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300" />

                      {/* Top Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest text-gold-light bg-obsidian/75 backdrop-blur-md border border-gold-muted">
                          {item.category.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Fullscreen Expand Icon Button */}
                      <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-obsidian/70 backdrop-blur-md border border-gold-muted flex items-center justify-center text-taupe group-hover:text-gold-light group-hover:border-gold-primary transition-colors opacity-0 group-hover:opacity-100">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      {/* Bottom Caption & Couple Details */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="font-serif text-xl md:text-2xl font-normal text-ivory block group-hover:text-gold-light transition-colors">
                          {item.title}
                        </span>
                        <div className="flex items-center justify-between mt-2 text-xs text-taupe">
                          <span className="font-sans font-medium text-ivory-soft">{item.couple}</span>
                          <span className="flex items-center gap-1 text-gold-primary/90">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Fullscreen Lightbox Modal (Rendered outside stacking contexts) */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 z-[9999] bg-[#060608]/96 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 cursor-default"
            >
              {/* Top Navigation Bar with Clear Back Button */}
              <div
                className="w-full max-w-6xl flex items-center justify-between z-30 pt-2 pb-3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Prominent Back Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-charcoal/90 hover:bg-charcoal-elevated border border-gold-muted/60 hover:border-gold-primary text-gold-light hover:text-ivory transition-all duration-300 shadow-glass group cursor-pointer"
                  aria-label="Back to Gallery"
                >
                  <ArrowLeft className="w-4 h-4 text-gold-primary transition-transform group-hover:-translate-x-1" />
                  <span className="font-sans text-xs uppercase tracking-luxury font-medium">
                    ← Back to Gallery
                  </span>
                </button>

                {/* Center Item Info */}
                <div className="hidden md:flex items-center gap-3 bg-charcoal/70 px-5 py-2 rounded-full border border-gold-muted/30">
                  <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse-subtle" />
                  <span className="font-serif text-sm tracking-widest uppercase text-ivory">
                    {selectedItem.couple} · {selectedItem.location}
                  </span>
                </div>

                {/* Right Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-charcoal/90 hover:bg-charcoal-elevated border border-gold-muted/60 hover:border-gold-primary text-taupe-light hover:text-ivory transition-all duration-300 shadow-glass cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <span className="font-sans text-xs uppercase tracking-luxury hidden sm:inline">Close (Esc)</span>
                  <X className="w-4 h-4 text-gold-light" />
                </button>
              </div>

              {/* Central Media Stage */}
              <div
                className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto min-h-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left Nav Arrow */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-charcoal/80 hover:bg-charcoal border border-gold-muted text-ivory hover:text-gold-light hover:border-gold-primary flex items-center justify-center transition-all shadow-glass cursor-pointer"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Right Nav Arrow */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-charcoal/80 hover:bg-charcoal border border-gold-muted text-ivory hover:text-gold-light hover:border-gold-primary flex items-center justify-center transition-all shadow-glass cursor-pointer"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Image Container */}
                <motion.div
                  key={selectedItem.id}
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-[58vh] sm:h-[66vh] rounded-2xl overflow-hidden border border-gold-muted/40 shadow-glass bg-black/40"
                >
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Bottom Caption Bar with WhatsApp Action */}
              <div
                className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h3 className="font-serif text-lg sm:text-2xl text-ivory">
                    {selectedItem.title}
                  </h3>
                  <p className="font-sans text-xs text-taupe mt-0.5">
                    Category: {selectedItem.category.toUpperCase()} · Location: {selectedItem.location}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="sm:hidden px-4 py-2.5 rounded-full border border-gold-muted/60 text-xs font-sans text-taupe-light hover:text-ivory"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    data-analytics-event="whatsapp_enquiry"
                    data-source-scene="portfolio_lightbox"
                    data-service-type={selectedItem.category}
                    onClick={() =>
                      triggerWhatsApp({
                        message: `Hello Perfect Studio! I loved your portfolio photo "${selectedItem.title}" (${selectedItem.couple} in ${selectedItem.location}). Could we plan a similar aesthetic for our wedding?`,
                        sourceScene: 'portfolio_lightbox',
                        service: selectedItem.category,
                      })
                    }
                    className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
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

export default PortfolioSection;
