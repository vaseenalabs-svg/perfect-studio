'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PLACEHOLDERS } from '@/constants/siteData';
import { triggerWhatsApp } from '@/utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const defaultMessage = 'Hello Perfect Studio! I would like to check availability for our wedding date.';

  return (
    <>
      {/* ===================================================================
          1. DESKTOP & TABLET: FLOATING BOTTOM-RIGHT PULSE BUTTON
          =================================================================== */}
      <div className="fixed bottom-7 right-7 z-50 hidden md:flex items-center gap-3">
        {/* Glassmorphic Hover Tooltip */}
        <div
          className={`px-4 py-2 rounded-full glass-panel border border-gold-muted/60 text-ivory text-xs font-sans tracking-wide transition-all duration-300 pointer-events-none ${
            isTooltipVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-whatsapp animate-ping" />
            <span>Chat on WhatsApp · Fast Response</span>
          </span>
        </div>

        {/* Floating Pulsing Button */}
        <button
          type="button"
          data-analytics-event="whatsapp_click"
          data-wa-source="floating_desktop_widget"
          onClick={() =>
            triggerWhatsApp({
              message: defaultMessage,
              sourceScene: 'floating_desktop_widget',
              service: 'General Inquiry',
            })
          }
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none group"
          aria-label="Chat on WhatsApp"
        >
          {/* Subtle Outer Glow Wave */}
          <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping pointer-events-none opacity-40" />

          {/* WhatsApp Vector Icon */}
          <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366] group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>

      {/* ===================================================================
          2. MOBILE: FIXED STICKY BOTTOM ACTION BAR (50 / 50 Split)
          =================================================================== */}
      <aside
        aria-label="Quick contact actions"
        className="fixed bottom-0 inset-x-0 z-50 flex md:hidden items-center bg-[#060606]/92 backdrop-blur-2xl border-t border-gold-primary/25 p-3 gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
      >
        {/* Call Now Action */}
        <a
          href={`tel:${PLACEHOLDERS.PHONE_RAW}`}
          data-analytics-event="phone_call"
          data-wa-source="mobile_bottom_bar"
          className="flex-1 min-h-[48px] rounded-full glass-pill border border-gold-muted/60 text-ivory font-sans text-xs uppercase tracking-luxury font-medium flex items-center justify-center gap-2 hover:border-gold-primary transition-colors active:scale-98"
        >
          <Phone className="w-4 h-4 text-gold-light" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Action */}
        <button
          type="button"
          data-analytics-event="whatsapp_click"
          data-wa-source="mobile_bottom_bar"
          onClick={() =>
            triggerWhatsApp({
              message: defaultMessage,
              sourceScene: 'mobile_bottom_bar',
              service: 'General Inquiry',
            })
          }
          className="flex-1 min-h-[48px] rounded-full bg-gradient-to-r from-gold-primary to-gold-deep text-obsidian font-sans text-xs uppercase tracking-luxury font-semibold flex items-center justify-center gap-2 shadow-gold-glow active:scale-98 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-obsidian" />
          <span>WhatsApp</span>
        </button>
      </aside>
    </>
  );
};

export default FloatingWhatsApp;
