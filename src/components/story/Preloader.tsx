'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PLACEHOLDERS } from '@/constants/siteData';

interface PreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDurationMs = 2400,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Procedural golden spark particles
  const sparkParticles = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * Math.PI * 2;
      const radius = 60 + Math.random() * 120;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size: 2 + Math.random() * 3.5,
        duration: 1.2 + Math.random() * 0.8,
        delay: Math.random() * 0.4,
      };
    });
  }, []);

  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const currentPct = Math.min(Math.round((elapsed / minDurationMs) * 100), 100);
      setProgress(currentPct);

      if (currentPct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) {
            onComplete();
          }
        }, 350);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-ivory select-none"
          role="status"
          aria-live="polite"
        >
          {/* Central Golden Core & Sparks */}
          <div className="relative flex items-center justify-center">
            {/* Ambient Warm Golden Glow Halo */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{
                scale: [0.6, 1.4, 1.1],
                opacity: [0.2, 0.85, 0.45],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="absolute w-56 h-56 rounded-full bg-gold-primary/20 blur-3xl pointer-events-none"
            />

            {/* Exploding Golden Sparks */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {sparkParticles.map((spark) => (
                <motion.span
                  key={spark.id}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: [0, spark.x * 0.5, spark.x],
                    y: [0, spark.y * 0.5, spark.y],
                    opacity: [0, 1, 0],
                    scale: [0, 1.4, 0],
                  }}
                  transition={{
                    duration: spark.duration,
                    delay: spark.delay,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute rounded-full bg-gold-light shadow-[0_0_8px_#F3E5AB]"
                  style={{
                    width: spark.size,
                    height: spark.size,
                  }}
                />
              ))}
            </div>

            {/* Center Logo Formation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center px-4"
            >
              {/* Logo Image */}
              <div className="relative w-64 sm:w-80 md:w-96 h-20 sm:h-24 md:h-28 mb-4 filter drop-shadow-[0_0_25px_rgba(243,229,171,0.35)]">
                <Image
                  src={PLACEHOLDERS.LOGO_IMAGE_PATH}
                  alt={PLACEHOLDERS.LOGO_TEXT}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Emotional Subtext */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-2 font-sans text-xs uppercase tracking-[0.24em] text-taupe-light"
              >
                Preparing your story...
              </motion.p>
            </motion.div>
          </div>

          {/* Minimalist Golden Progress Bar & Percentage */}
          <div className="absolute bottom-16 flex flex-col items-center w-64">
            <div className="w-full h-[2px] bg-charcoal-elevated overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary shadow-[0_0_10px_#D4AF37]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between w-full mt-3 font-sans text-[11px] tracking-widest text-taupe font-medium">
              <span>EST. {PLACEHOLDERS.FOUNDED_YEAR}</span>
              <span className="text-gold-light">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
