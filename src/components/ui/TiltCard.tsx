'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  glareOpacity?: number;
  scaleOnHover?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTiltDeg = 9,
  glareOpacity = 0.16,
  scaleOnHover = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile, prefersReducedMotion } = useDevicePerformance();

  // Normalized mouse coords (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for natural luxury inertia
  const springConfig = { damping: 20, stiffness: 180, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Transform coordinates into rotational tilt angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTiltDeg, -maxTiltDeg]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTiltDeg, maxTiltDeg]);

  // Transform coords to percentage for specular glare positioning
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize from -0.5 (left/top) to +0.5 (right/bottom)
    const normX = mouseX / rect.width - 0.5;
    const normY = mouseY / rect.height - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseEnter = () => {
    if (isMobile || prefersReducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // If mobile or reduced motion, render lightweight container without 3D tilt overhead
  if (isMobile || prefersReducedMotion) {
    return (
      <div className={`relative transition-all duration-300 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full h-full relative"
      >
        {/* Child Content */}
        {children}

        {/* Dynamic Specular Champagne Gold Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(243, 229, 171, 0.35) 0%, rgba(212, 175, 55, 0.12) 35%, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;
