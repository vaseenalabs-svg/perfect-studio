'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PACKAGES_DATA,
  PROCESS_STEPS,
  PackageItem,
} from '@/constants/siteData';
import { TiltCard } from '@/components/ui/TiltCard';
import { triggerWhatsApp } from '@/utils/whatsapp';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Camera,
  HardDrive,
  HeartHandshake,
  Clock,
  Layers,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

const WHY_CHOOSE_PILLARS = [
  {
    icon: Camera,
    title: 'Cinema Prime Optics',
    description: 'We shoot exclusively on high-end full-frame cinema bodies with bespoke ultra-fast prime lenses for unmatched low-light intimacy and creamy bokeh.',
  },
  {
    icon: HardDrive,
    title: 'Dual-Vault Cloud Backup',
    description: 'Same-day on-site dual-card redundancy and encrypted multi-cloud vault synchronization guarantees your irreplaceable wedding memories can never be lost.',
  },
  {
    icon: HeartHandshake,
    title: 'Unobtrusive Discretion',
    description: 'We weave seamlessly into your sacred ceremonies without shouting or staging artificial moments. Real intimacy, captured authentically.',
  },
  {
    icon: Layers,
    title: 'Atelier Post-Production',
    description: 'Every photograph and video reel is hand-polished in-house. No cheap bulk outsourcing, no generic batch presets.',
  },
  {
    icon: Clock,
    title: 'Guaranteed 21-Day Teaser',
    description: 'Receive a curated 50-photo Sneak Peek gallery within 72 hours and your high-energy cinematic teaser in just 21 days.',
  },
  {
    icon: ShieldCheck,
    title: 'Single-Wedding Exclusivity',
    description: 'Our lead cinematographers and master photographers accept only one premier wedding per weekend, ensuring 100% focused artistry.',
  },
];

export const PackagesSection: React.FC = () => {
  return (
    <section id="packages" className="relative w-full py-28 md:py-36 bg-obsidian text-ivory">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold-primary/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* ===============================================================
            PART 1A: WHY CHOOSE US
            =============================================================== */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
              The Perfect Studio Standard
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory max-w-3xl leading-[1.12]">
            Why Discerning Couples{' '}
            <span className="italic font-light gold-gradient-text">Trust Our Craft.</span>
          </h2>

          <p className="mt-5 font-sans text-sm md:text-base text-taupe max-w-xl font-light leading-relaxed">
            International wedding cinematography and fine-art photography executed with uncompromised
            technical discipline and emotional intuition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 text-left w-full">
            {WHY_CHOOSE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl glass-panel border border-gold-muted/30 hover:border-gold-primary/60 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-light mb-6 group-hover:scale-110 group-hover:border-gold-primary transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-ivory mb-2 group-hover:text-gold-light transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-taupe leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===============================================================
            PART 1B: 5-STEP PROCESS TIMELINE
            =============================================================== */}
        <div id="process" className="mb-28 md:mb-36">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-sans text-xs tracking-[0.24em] text-gold-light uppercase font-medium mb-3">
              Flawless Journey
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory">
              From First Spark to{' '}
              <span className="italic font-light gold-gradient-text">Eternal Heirloom.</span>
            </h3>
          </div>

          <div className="relative">
            {/* Golden Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-muted via-gold-primary/60 to-gold-muted -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-charcoal/80 border border-gold-muted/30 backdrop-blur-md hover:border-gold-primary/60 transition-colors"
                >
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-obsidian border-2 border-gold-primary text-gold-light font-serif text-lg font-bold flex items-center justify-center mb-5 shadow-gold-subtle">
                    0{step.step}
                  </div>

                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-primary/80 mb-1">
                    {step.timeline}
                  </span>
                  <h4 className="font-serif text-lg text-ivory mb-2">{step.title}</h4>
                  <p className="font-sans text-xs text-taupe leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===============================================================
            PART 2: INVESTMENT PACKAGES (SILVER, GOLD, PLATINUM)
            =============================================================== */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
              Bespoke Investment
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory max-w-3xl leading-[1.12]">
            Collections Crafted for{' '}
            <span className="italic font-light gold-gradient-text">Generations to Come.</span>
          </h2>

          <p className="mt-5 font-sans text-sm md:text-base text-taupe max-w-xl font-light leading-relaxed">
            Every celebration is unique. Choose a collection as your baseline, and we will tailor
            every detail during your private vision consultation.
          </p>
        </div>

        {/* 3 Tiered Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PACKAGES_DATA.map((pkg: PackageItem) => {
            const isPopular = pkg.popular;

            return (
              <div key={pkg.id} className="h-full">
                <TiltCard className="h-full">
                  <div
                    className={`h-full flex flex-col justify-between p-8 md:p-10 rounded-3xl transition-all duration-300 relative ${
                      isPopular
                        ? 'bg-charcoal/90 border-2 border-gold-primary shadow-[0_0_40px_rgba(212,175,55,0.22)]'
                        : 'glass-panel border border-gold-muted/40 hover:border-gold-primary/50'
                    }`}
                  >
                    {/* Most Popular Elevated Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans text-[11px] font-bold tracking-widest uppercase shadow-gold-subtle">
                        MOST POPULAR SIGNATURE
                      </div>
                    )}

                    <div>
                      {/* Package Name & Tagline */}
                      <div className="mb-6">
                        <span className="font-sans text-xs tracking-widest text-gold-primary uppercase font-medium">
                          {pkg.duration}
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl text-ivory mt-1">
                          {pkg.name}
                        </h3>
                        <p className="font-sans text-xs text-taupe mt-2 font-light leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Pricing Tier */}
                      <div className="py-4 my-4 border-y border-gold-muted/30 flex items-baseline gap-2">
                        <span className="font-serif text-3xl font-medium gold-gradient-text">
                          {pkg.price}
                        </span>
                        <span className="font-sans text-xs text-taupe">/ tailored consultation</span>
                      </div>

                      {/* Deliverables Checklist */}
                      <ul className="space-y-3.5 my-6">
                        {pkg.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3 text-xs text-taupe-light">
                            <span className="w-4 h-4 rounded-full bg-gold-primary/20 text-gold-light flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-gold-light stroke-[3]" />
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* WhatsApp Package CTA */}
                    <button
                      type="button"
                      data-analytics-event="whatsapp_click"
                      data-wa-source="package_card"
                      data-package-name={pkg.name}
                      onClick={() =>
                        triggerWhatsApp({
                          message: `Hello PERFECT STUDIO, I am interested in the *${pkg.name}* Wedding Package. Please share pricing and availability.`,
                          sourceScene: 'packages',
                          service: pkg.name,
                        })
                      }
                      className={`w-full mt-8 flex items-center justify-center gap-2.5 py-4 rounded-full font-sans text-xs uppercase tracking-luxury font-medium transition-all duration-300 ${
                        isPopular
                          ? 'bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian shadow-gold-glow hover:shadow-gold-hover hover:scale-103'
                          : 'glass-pill text-ivory hover:border-gold-primary hover:text-gold-light'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Reserve on WhatsApp</span>
                    </button>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Custom Tailoring Note */}
        <div className="mt-14 text-center">
          <p className="font-sans text-xs text-taupe">
            Planning a multi-day international destination celebration?{' '}
            <button
              type="button"
              onClick={() =>
                triggerWhatsApp({
                  message: 'Hello Perfect Studio! We are planning a multi-day destination wedding and need a custom bespoke itinerary.',
                  sourceScene: 'packages_custom',
                  service: 'Bespoke Destination',
                })
              }
              className="text-gold-light underline underline-offset-4 hover:text-white transition-colors"
            >
              Request a Bespoke Destination Itinerary →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
