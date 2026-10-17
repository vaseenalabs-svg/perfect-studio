'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatioClass?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW CAMERA FILE',
  afterLabel = 'PERFECT STUDIO MASTER GRADE',
  aspectRatioClass = 'h-[460px] md:h-[580px]',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Position calculation based on pointer/mouse event
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPct);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full ${aspectRatioClass} rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gold-muted/40 shadow-glass bg-obsidian group`}
    >
      {/* 1. Underlying Graded After Image (100% width) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt="Color graded wedding portrait"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover"
        />
        {/* Right Label (Master Grade) */}
        <div className="absolute top-5 right-5 z-10 px-3.5 py-1.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-gold-primary/60 text-gold-light font-sans text-[10px] md:text-xs tracking-luxury uppercase font-medium shadow-gold-subtle pointer-events-none">
          {afterLabel}
        </div>
      </div>

      {/* 2. Top RAW Before Image with Clip-Path Mask */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <Image
          src={beforeImage}
          alt="RAW flat profile wedding portrait"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover filter contrast-[0.85] saturate-[0.7] brightness-[0.9]"
        />
        {/* Left Label (RAW) */}
        <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-charcoal/85 backdrop-blur-md border border-charcoal-border text-taupe font-sans text-[10px] md:text-xs tracking-luxury uppercase font-medium pointer-events-none">
          {beforeLabel}
        </div>
      </div>

      {/* 3. Glowing Champagne Gold Divider Bar */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-gradient-to-b from-gold-light via-gold-primary to-gold-deep shadow-[0_0_12px_#D4AF37]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Circular 44px Interactive Drag Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-obsidian border-2 border-gold-primary shadow-gold-glow flex items-center justify-center text-gold-light group-hover:scale-110 active:scale-95 transition-transform duration-200">
          <ChevronsLeftRight className="w-5 h-5 text-gold-light" />
        </div>
      </div>

      {/* Drag instruction tooltip at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-4 py-1.5 rounded-full bg-obsidian/75 backdrop-blur-md border border-gold-muted/40 text-[11px] font-sans text-taupe uppercase tracking-widest">
        Drag slider to compare RAW vs Color Grade
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
