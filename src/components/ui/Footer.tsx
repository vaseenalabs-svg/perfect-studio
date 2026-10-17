'use client';

import React from 'react';
import Image from 'next/image';
import { PLACEHOLDERS, NAV_LINKS, SERVICES_DATA } from '@/constants/siteData';
import { triggerWhatsApp } from '@/utils/whatsapp';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  Heart,
  ArrowUp,
  MessageCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#040405] text-ivory overflow-hidden pt-24 pb-28 md:pb-16 border-t border-gold-muted/30">
      {/* Giant Watermark Typography in Background */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none select-none w-full text-center overflow-hidden">
        <span className="font-serif text-[12vw] font-bold text-white/[0.018] tracking-[0.25em] uppercase whitespace-nowrap block">
          {PLACEHOLDERS.LOGO_TEXT}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-gold-muted/20">
          {/* Column 1: Studio Brand & Bio (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="relative h-12 w-48 mb-6">
              <Image
                src={PLACEHOLDERS.LOGO_IMAGE_PATH}
                alt={PLACEHOLDERS.LOGO_TEXT}
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="font-serif text-lg text-ivory-soft italic font-light mb-3">
              “Capturing Your Forever, Perfectly.”
            </p>

            <p className="font-sans text-xs text-taupe leading-relaxed font-light max-w-sm mb-6">
              International wedding atelier specializing in documentary elegance, cinematic motion
              pictures, and fine-art color grading for celebrations worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-taupe">
              <a
                href={PLACEHOLDERS.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-pill flex items-center justify-center hover:text-gold-light hover:border-gold-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={PLACEHOLDERS.YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-pill flex items-center justify-center hover:text-gold-light hover:border-gold-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={PLACEHOLDERS.FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-pill flex items-center justify-center hover:text-gold-light hover:border-gold-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Jump Links (Col 5-7) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-ivory mb-5 tracking-wide">Explore Journey</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-xs uppercase tracking-luxury text-taupe hover:text-gold-light transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-primary/40 group-hover:bg-gold-primary group-hover:w-2 transition-all" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Atelier Services (Col 8-10) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-ivory mb-5 tracking-wide">Signature Services</h4>
            <ul className="space-y-3">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    type="button"
                    onClick={() =>
                      triggerWhatsApp({
                        message: srv.whatsappMessage,
                        sourceScene: 'footer_service_link',
                        service: srv.title,
                      })
                    }
                    className="font-sans text-xs text-taupe hover:text-gold-light transition-colors text-left flex items-center gap-2 group"
                  >
                    <MessageCircle className="w-3 h-3 text-gold-primary/60 group-hover:text-gold-primary" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Back to Top (Col 11-12) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-lg text-ivory mb-5 tracking-wide">Direct Atelier</h4>
              <div className="space-y-3 text-xs text-taupe">
                <a
                  href={`tel:${PLACEHOLDERS.PHONE_RAW}`}
                  className="flex items-center gap-2 hover:text-gold-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-primary shrink-0" />
                  <span>{PLACEHOLDERS.PHONE_NUMBER}</span>
                </a>
                <a
                  href={`mailto:${PLACEHOLDERS.EMAIL}`}
                  className="flex items-center gap-2 hover:text-gold-light transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-primary shrink-0" />
                  <span className="truncate">{PLACEHOLDERS.EMAIL}</span>
                </a>
                <div className="flex items-start gap-2 pt-1 text-taupe-light">
                  <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">{PLACEHOLDERS.CITY}, {PLACEHOLDERS.STATE}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2 text-xs font-sans tracking-widest text-gold-light hover:text-white uppercase transition-colors group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-taupe">
          <p>
            © {new Date().getFullYear()} {PLACEHOLDERS.LOGO_TEXT}. All rights reserved. Crafted with passion.
          </p>
          <p className="flex items-center gap-1.5 text-taupe-light">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-gold-primary fill-gold-primary" />
            <span>for eternal love stories</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
