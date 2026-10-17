'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PLACEHOLDERS } from '@/constants/siteData';
import { formatBookingMessage, triggerWhatsApp, BookingFormDetails } from '@/utils/whatsapp';
import {
  Calendar,
  User,
  Phone,
  MapPin,
  Sparkles,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const BookingFormSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormDetails>({
    name: '',
    phone: '',
    eventDate: '',
    eventType: 'Wedding',
    location: '',
    serviceNeeded: 'Complete Photography + Videography',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name or couple name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your WhatsApp or mobile number.';
    } else if (!/^[0-9+() -]{8,18}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number with country code.';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Please select your celebration date.';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Please specify the celebration city or venue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Build formatted message
    const formattedMessage = formatBookingMessage(formData);

    // Open WhatsApp deep-link
    triggerWhatsApp({
      message: formattedMessage,
      sourceScene: 'booking_form',
      service: formData.serviceNeeded || 'Wedding Coverage',
    });

    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <section id="booking" className="relative w-full py-28 md:py-36 bg-obsidian text-ivory">
      {/* Anchor for #contact alias */}
      <span id="contact" className="absolute -top-10" />

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-primary/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ===============================================================
              LEFT COLUMN: EDITORIAL STUDIO PROMISE & DIRECT CONTACT
              =============================================================== */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-muted bg-charcoal/40 backdrop-blur-md mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span className="font-sans text-xs tracking-[0.22em] text-gold-light uppercase font-medium">
                Reserve Your Date
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ivory leading-[1.12]">
              Let’s Make Your Wedding{' '}
              <span className="italic font-light gold-gradient-text">Unforgettable.</span>
            </h2>

            <p className="mt-6 font-sans text-sm md:text-base text-taupe leading-relaxed font-light">
              We accept only one premier wedding per calendar weekend to ensure our lead principal
              and senior artists give your celebration their undivided devotion. Dates for prime
              wedding months book up to 12 months in advance.
            </p>

            {/* Direct Studio Details */}
            <div className="mt-10 space-y-5 border-t border-gold-muted/30 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-gold-light shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-taupe block">
                    Direct Studio Helpline
                  </span>
                  <a
                    href={`tel:${PLACEHOLDERS.PHONE_RAW}`}
                    className="font-serif text-xl text-ivory hover:text-gold-light transition-colors"
                  >
                    {PLACEHOLDERS.PHONE_NUMBER}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-gold-light shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-taupe block">
                    Concierge Inquiries
                  </span>
                  <a
                    href={`mailto:${PLACEHOLDERS.EMAIL}`}
                    className="font-sans text-sm text-ivory hover:text-gold-light transition-colors"
                  >
                    {PLACEHOLDERS.EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-gold-light shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-taupe block">
                    Studio Atelier
                  </span>
                  <span className="font-sans text-sm text-taupe-light">
                    {PLACEHOLDERS.FULL_ADDRESS}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-gold-light shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-taupe block">
                    WhatsApp Response Time
                  </span>
                  <span className="font-sans text-sm text-gold-light">
                    Typically within 2 hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: GLASSMORPHIC SMART BOOKING FORM
              =============================================================== */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 md:p-12 rounded-3xl glass-panel border border-gold-muted/50 shadow-glass relative">
              <div className="mb-8">
                <h3 className="font-serif text-2xl md:text-3xl text-ivory">
                  Check Date Availability
                </h3>
                <p className="font-sans text-xs text-taupe mt-1">
                  Fill in your details below. You will be connected instantly to our WhatsApp
                  concierge with your information cleanly formatted.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-taupe-light mb-2">
                      Your Name / Couple Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Aanya & Kabir"
                        className={`w-full bg-charcoal/80 border rounded-xl px-4 py-3 pl-11 text-sm text-ivory placeholder-taupe/40 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-gold-muted/40 focus:border-gold-primary'
                        }`}
                      />
                      <User className="w-4 h-4 text-taupe absolute left-4 top-3.5" />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-taupe-light mb-2">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-charcoal/80 border rounded-xl px-4 py-3 pl-11 text-sm text-ivory placeholder-taupe/40 focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-gold-muted/40 focus:border-gold-primary'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-taupe absolute left-4 top-3.5" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. Date & Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-taupe-light mb-2">
                      Event Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className={`w-full bg-charcoal/80 border rounded-xl px-4 py-3 pl-11 text-sm text-ivory placeholder-taupe/40 focus:outline-none transition-colors ${
                          errors.eventDate
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-gold-muted/40 focus:border-gold-primary'
                        }`}
                      />
                      <Calendar className="w-4 h-4 text-taupe absolute left-4 top-3.5" />
                    </div>
                    {errors.eventDate && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.eventDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-taupe-light mb-2">
                      Celebration Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-charcoal/80 border border-gold-muted/40 rounded-xl px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold-primary transition-colors cursor-pointer"
                    >
                      <option value="Wedding" className="bg-charcoal text-ivory">Grand Wedding</option>
                      <option value="Pre-Wedding" className="bg-charcoal text-ivory">Pre-Wedding Shoot</option>
                      <option value="Reception" className="bg-charcoal text-ivory">Reception Only</option>
                      <option value="Engagement" className="bg-charcoal text-ivory">Engagement Ceremony</option>
                      <option value="Post-Production / Editing Only" className="bg-charcoal text-ivory">Post-Production / Editing Only</option>
                    </select>
                  </div>
                </div>

                {/* 3. Location & Service Needed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-taupe-light mb-2">
                      Event City / Venue *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Udaipur / Surat / Mumbai"
                        className={`w-full bg-charcoal/80 border rounded-xl px-4 py-3 pl-11 text-sm text-ivory placeholder-taupe/40 focus:outline-none transition-colors ${
                          errors.location
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-gold-muted/40 focus:border-gold-primary'
                        }`}
                      />
                      <MapPin className="w-4 h-4 text-taupe absolute left-4 top-3.5" />
                    </div>
                    {errors.location && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.location}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-taupe-light mb-2">
                      Service Required
                    </label>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="w-full bg-charcoal/80 border border-gold-muted/40 rounded-xl px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold-primary transition-colors cursor-pointer"
                    >
                      <option value="Complete Photography + Videography" className="bg-charcoal text-ivory">
                        Complete Photography + Videography
                      </option>
                      <option value="Wedding Photography" className="bg-charcoal text-ivory">
                        Wedding Photography Only
                      </option>
                      <option value="Wedding Videography" className="bg-charcoal text-ivory">
                        Wedding Videography Only
                      </option>
                      <option value="Photo Editing" className="bg-charcoal text-ivory">
                        Photo Editing & Retouching
                      </option>
                      <option value="Video Editing" className="bg-charcoal text-ivory">
                        Video Editing & Color Grading
                      </option>
                    </select>
                  </div>
                </div>

                {/* 4. Special Message */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-taupe-light mb-2">
                    Tell Us About Your Vision (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about special traditions, number of guests, or specific aesthetic preferences..."
                    className="w-full bg-charcoal/80 border border-gold-muted/40 rounded-xl px-4 py-3 text-sm text-ivory placeholder-taupe/40 focus:outline-none focus:border-gold-primary transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    data-analytics-event="whatsapp_booking_submit"
                    data-source="booking_form"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary text-obsidian font-sans font-semibold text-xs tracking-luxury uppercase shadow-gold-glow hover:shadow-gold-hover hover:scale-102 active:scale-98 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 fill-obsidian" />
                    <span>Send Enquiry on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-taupe">
                    <span>Prefer speaking on phone?</span>
                    <a
                      href={`tel:${PLACEHOLDERS.PHONE_RAW}`}
                      className="text-gold-light hover:underline font-medium"
                    >
                      Call +91 70969 90850
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingFormSection;
