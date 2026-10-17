'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Menu, X, Instagram, Youtube, Facebook } from 'lucide-react';
import { PLACEHOLDERS } from '@/constants/siteData';
import { getWhatsAppUrl, triggerWhatsApp } from '@/utils/whatsapp';

interface NavLinkItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavLinkItem[] = [
  { label: 'The Story', href: '#story-scroll-container' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Editing Lab', href: '#editing-lab' },
  { label: 'Packages', href: '#packages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Booking', href: '#booking' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll distance to apply glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll handler for anchor links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Support both #booking and #contact fallbacks
    let target = document.querySelector(href);
    if (!target && href === '#booking') {
      target = document.querySelector('#contact');
    }

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navWhatsAppMessage = 'Hello Perfect Studio! I would like to enquire about wedding coverage and date availability.';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#060606]/80 backdrop-blur-xl border-b border-gold-primary/15 py-3.5 shadow-glass'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Slot / Logo */}
          <a
            href="#story-scroll-container"
            onClick={(e) => handleNavClick(e, '#story-scroll-container')}
            className="relative flex items-center group py-1"
            aria-label="PERFECT STUDIO Home"
          >
            <div className="relative h-10 md:h-12 w-36 md:w-48 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={PLACEHOLDERS.LOGO_IMAGE_PATH}
                alt={PLACEHOLDERS.LOGO_TEXT}
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-sans text-xs uppercase tracking-luxury text-taupe-light hover:text-gold-light transition-colors relative py-1 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-primary to-gold-light group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop Primary WhatsApp CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${PLACEHOLDERS.PHONE_RAW}`}
              data-analytics-event="phone_call"
              data-source="navbar_call"
              className="p-2.5 rounded-full glass-pill text-taupe-light hover:text-gold-light hover:border-gold-primary/50 transition-colors"
              aria-label="Call studio"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              type="button"
              data-analytics-event="whatsapp_click"
              data-wa-source="navbar_cta"
              onClick={() =>
                triggerWhatsApp({
                  message: navWhatsAppMessage,
                  sourceScene: 'navbar',
                  service: 'General',
                })
              }
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-subtle hover:shadow-gold-hover hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Book on WhatsApp</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button (44x44px hit target) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex lg:hidden items-center justify-center w-11 h-11 rounded-full glass-pill text-gold-light hover:border-gold-primary transition-colors focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-2xl flex flex-col justify-between px-8 py-24 lg:hidden"
          >
            {/* Ambient Background Gold Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gold-primary/10 blur-3xl pointer-events-none" />

            {/* Staggered Navigation Links */}
            <nav className="flex flex-col gap-6 my-auto">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.4 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-serif text-2xl tracking-widest text-ivory hover:text-gold-light transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="font-sans text-xs text-gold-primary/50 group-hover:text-gold-primary tracking-widest">
                      0{index + 1}
                    </span>
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTAs & Social Links */}
            <div className="flex flex-col gap-5 pt-8 border-t border-gold-muted/40">
              <button
                type="button"
                data-analytics-event="whatsapp_click"
                data-wa-source="mobile_menu"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  triggerWhatsApp({
                    message: navWhatsAppMessage,
                    sourceScene: 'mobile_menu',
                    service: 'General',
                  });
                }}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans font-medium text-xs tracking-luxury uppercase shadow-gold-glow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </button>

              <a
                href={`tel:${PLACEHOLDERS.PHONE_RAW}`}
                data-analytics-event="phone_call"
                data-source="mobile_menu"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full glass-pill text-ivory font-sans text-xs tracking-luxury uppercase hover:border-gold-primary/60 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-primary" />
                <span>Call ({PLACEHOLDERS.PHONE_NUMBER})</span>
              </a>

              {/* Social Channels */}
              <div className="flex items-center justify-center gap-6 pt-3 text-taupe">
                <a
                  href={PLACEHOLDERS.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors p-2"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={PLACEHOLDERS.YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors p-2"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href={PLACEHOLDERS.FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors p-2"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
