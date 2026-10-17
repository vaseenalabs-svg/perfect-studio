'use client';

import React from 'react';
import { STUDIO_STATS, PLACEHOLDERS } from '@/constants/siteData';
import { Sparkles, Award } from 'lucide-react';

export const AboutStatsSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-28 md:py-36 bg-obsidian text-ivory">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-primary/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
                The Atelier Heritage
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory leading-[1.12]">
              A wedding lasts one day.{' '}
              <span className="italic font-light gold-gradient-text">
                We make it last forever.
              </span>
            </h2>

            <p className="mt-6 font-sans text-sm md:text-base text-taupe-light leading-relaxed font-light">
              Founded in {PLACEHOLDERS.FOUNDED_YEAR}, PERFECT STUDIO was born out of a profound reverence
              for wedding heritage. We believe true luxury lies not in stiff posing, but in the
              unrehearsed intimacy of fleeting seconds—the nervous quiver of a bride’s hands before the
              first look, a father’s quiet tear during the vidai, and the triumphant euphoria of
              midnight dancing under thousands of stars.
            </p>

            <p className="mt-4 font-sans text-sm md:text-base text-taupe leading-relaxed font-light">
              Combining international fashion-grade optics, discreet documentary filmmaking, and an
              in-house color grading darkroom, we deliver heirlooms that look and feel as breathtaking
              fifty years from now as they did on your wedding day.
            </p>
          </div>

          {/* Right Column: Key Distinction Card */}
          <div className="lg:col-span-5">
            <div className="p-8 md:p-10 rounded-3xl glass-panel border border-gold-muted/50 relative">
              <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-light mb-6">
                <Award className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl text-ivory mb-3">Single-Wedding Exclusivity</h3>
              <p className="font-sans text-xs text-taupe leading-relaxed mb-6">
                Unlike mass production studios that take dozens of weddings each weekend, we limit our
                commissions to only one celebration at a time. Our principal directors and senior crew
                personally film, edit, and grade your wedding.
              </p>

              <div className="pt-6 border-t border-gold-muted/30 flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl font-medium gold-gradient-text">100%</span>
                  <span className="font-sans text-[11px] text-taupe block">In-House Mastery</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-medium gold-gradient-text">Zero</span>
                  <span className="font-sans text-[11px] text-taupe block">Third-Party Outsourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Animated Studio Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-16 border-t border-gold-muted/30">
          {STUDIO_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl glass-pill">
              <div className="font-serif text-4xl sm:text-5xl font-medium gold-gradient-text tracking-tight mb-1">
                {stat.value}
                <span className="text-gold-light">{stat.suffix}</span>
              </div>
              <span className="font-sans text-xs uppercase tracking-luxury text-ivory font-medium mt-1">
                {stat.label}
              </span>
              <p className="font-sans text-[11px] text-taupe mt-1 font-light">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
