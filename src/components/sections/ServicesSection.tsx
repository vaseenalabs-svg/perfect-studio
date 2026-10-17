'use client';

import React from 'react';
import Image from 'next/image';
import { SERVICES_DATA, ServiceItem } from '@/constants/siteData';
import { TiltCard } from '@/components/ui/TiltCard';
import { triggerWhatsApp } from '@/utils/whatsapp';
import { MessageCircle, Check, Sparkles, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full py-28 md:py-36 bg-[#070708] text-ivory">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-primary/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
              Four Pillars of Artistry
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory max-w-3xl leading-[1.12]">
            Signature Disciplines Crafted with{' '}
            <span className="italic font-light gold-gradient-text">Emotional Depth.</span>
          </h2>

          <p className="mt-5 font-sans text-sm md:text-base text-taupe max-w-xl font-light leading-relaxed">
            Whether commissioned for end-to-end luxury wedding coverage or dedicated post-production
            color grading, we bring international cinema precision to every project.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service: ServiceItem, index) => (
            <div key={service.id} className="h-full">
              <TiltCard className="h-full">
                <div className="h-full flex flex-col justify-between rounded-3xl overflow-hidden glass-panel border border-gold-muted/40 shadow-glass group hover:border-gold-primary/60 transition-all duration-300">
                  {/* Card Visual Header with Image Preview */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

                    {/* Badge */}
                    {service.badge && (
                      <div className="absolute top-5 left-5 z-10 px-3.5 py-1 rounded-full text-[11px] font-sans uppercase tracking-widest text-gold-light bg-obsidian/80 backdrop-blur-md border border-gold-primary/50 shadow-gold-subtle">
                        {service.badge}
                      </div>
                    )}

                    <div className="absolute bottom-5 left-6 right-6 z-10">
                      <span className="font-sans text-xs tracking-luxury text-gold-primary uppercase font-medium">
                        0{index + 1} · {service.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-ivory mt-0.5">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <p className="font-sans text-xs md:text-sm text-taupe leading-relaxed font-light mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-3 pt-4 border-t border-gold-muted/30 mb-8">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-ivory-soft font-medium block">
                        Included Deliverables:
                      </span>
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-taupe-light">
                          <Check className="w-3.5 h-3.5 text-gold-light shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* WhatsApp Service CTA */}
                    <button
                      type="button"
                      data-analytics-event="whatsapp_click"
                      data-wa-source="service_card"
                      data-service-name={service.title}
                      onClick={() =>
                        triggerWhatsApp({
                          message: service.whatsappMessage,
                          sourceScene: 'services_section',
                          service: service.title,
                        })
                      }
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-subtle hover:shadow-gold-hover hover:scale-102 active:scale-98 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4 fill-obsidian" />
                      <span>Enquire on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
