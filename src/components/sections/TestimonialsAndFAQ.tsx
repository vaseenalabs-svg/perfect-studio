'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS_DATA, FAQS_DATA } from '@/constants/siteData';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Quote,
  Sparkles,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { triggerWhatsApp } from '@/utils/whatsapp';

export const TestimonialsAndFAQ: React.FC = () => {
  // Testimonials state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // FAQ state: expanded FAQ item id
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(FAQS_DATA[0]?.id || null);

  // Testimonials autoplay
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) =>
        prev < TESTIMONIALS_DATA.length - 1 ? prev + 1 : 0
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handlePrevTestimonial = () => {
    setIsAutoplay(false);
    setCurrentTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : TESTIMONIALS_DATA.length - 1
    );
  };

  const handleNextTestimonial = () => {
    setIsAutoplay(false);
    setCurrentTestimonialIndex((prev) =>
      prev < TESTIMONIALS_DATA.length - 1 ? prev + 1 : 0
    );
  };

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  const currentReview = TESTIMONIALS_DATA[currentTestimonialIndex];

  return (
    <section id="faq" className="relative w-full py-28 md:py-36 bg-[#070708] text-ivory">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* ===============================================================
            PART 1: COUPLE LOVE NOTES (TESTIMONIALS CAROUSEL)
            =============================================================== */}
        <div className="mb-28 md:mb-36">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
                Real Wedding Stories
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory max-w-3xl leading-[1.12]">
              Words from Our{' '}
              <span className="italic font-light gold-gradient-text">Cherished Couples.</span>
            </h2>

            <p className="mt-5 font-sans text-sm md:text-base text-taupe max-w-xl font-light leading-relaxed">
              Nothing speaks louder than the tears, goosebumps, and heartfelt reflections of families
              we have had the privilege to document.
            </p>
          </div>

          {/* Testimonial Card Slider */}
          <div
            className="max-w-4xl mx-auto relative glass-panel rounded-3xl p-8 md:p-14 border border-gold-muted/40 shadow-glass"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            {/* Giant Luxury Quote Icon */}
            <Quote className="absolute top-8 right-8 w-14 h-14 text-gold-primary/10 stroke-[1]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1.5 mb-6 text-gold-primary">
                  {Array.from({ length: currentReview.rating }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-gold-primary text-gold-primary" />
                  ))}
                </div>

                {/* Emotional Review Quote */}
                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-ivory leading-relaxed max-w-2xl mb-8 italic">
                  “{currentReview.quote}”
                </blockquote>

                {/* Couple Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-primary shadow-gold-subtle">
                    <Image
                      src={currentReview.image}
                      alt={currentReview.couple}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-left">
                    <h4 className="font-serif text-lg text-ivory leading-snug">
                      {currentReview.couple}
                    </h4>
                    <p className="font-sans text-xs text-gold-light/90">
                      {currentReview.location}
                    </p>
                    <span className="font-sans text-[11px] text-taupe block mt-0.5">
                      Service: {currentReview.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gold-muted/30">
              <div className="flex items-center gap-2">
                {TESTIMONIALS_DATA.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => {
                      setIsAutoplay(false);
                      setCurrentTestimonialIndex(dotIdx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentTestimonialIndex === dotIdx
                        ? 'w-8 bg-gradient-to-r from-gold-primary to-gold-light'
                        : 'w-2 bg-charcoal-border hover:bg-gold-primary/50'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevTestimonial}
                  className="w-10 h-10 rounded-full glass-pill text-taupe hover:text-ivory hover:border-gold-primary flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextTestimonial}
                  className="w-10 h-10 rounded-full glass-pill text-taupe hover:text-ivory hover:border-gold-primary flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===============================================================
            PART 2: FREQUENTLY ASKED QUESTIONS (ACCORDION)
            =============================================================== */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-14">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-gold-light" />
              <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
                Clarity & Transparency
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory">
              Everything You Need{' '}
              <span className="italic font-light gold-gradient-text">to Know.</span>
            </h3>

            <p className="mt-4 font-sans text-sm text-taupe max-w-lg font-light leading-relaxed">
              Transparent answers to our couples’ most frequent inquiries regarding destination travel,
              equipment, delivery timelines, and booking retainers.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS_DATA.map((faq) => {
              const isOpen = expandedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isOpen
                      ? 'bg-charcoal/90 border-gold-primary/60 shadow-gold-subtle'
                      : 'bg-charcoal/40 border-gold-muted/30 hover:border-gold-primary/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none"
                  >
                    <span className="font-serif text-lg md:text-xl text-ivory pr-4">
                      {faq.question}
                    </span>

                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-gold-primary text-obsidian rotate-180'
                          : 'glass-pill text-gold-light'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 md:px-7 md:pb-7 pt-1 border-t border-gold-muted/20 font-sans text-sm text-taupe-light leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Unanswered Question WhatsApp Banner */}
          <div className="mt-12 p-8 rounded-2xl glass-pill flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left border border-gold-muted/50">
            <div>
              <h4 className="font-serif text-xl text-ivory">Have a unique wedding question?</h4>
              <p className="font-sans text-xs text-taupe mt-1">
                Our creative directors are available directly on WhatsApp to answer any query.
              </p>
            </div>
            <button
              type="button"
              data-analytics-event="whatsapp_enquiry"
              data-source-scene="faq_banner"
              onClick={() =>
                triggerWhatsApp({
                  message: 'Hello Perfect Studio! I have a specific question regarding wedding coverage dates and logistics.',
                  sourceScene: 'faq_banner',
                  service: 'FAQ Inquiry',
                })
              }
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-subtle hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndFAQ;
