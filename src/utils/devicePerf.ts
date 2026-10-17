/**
 * Device Performance & Capability Detection Utilities
 * Ensures 60fps across mobile and respect for user accessibility preferences
 */

export interface DevicePerfProfile {
  isMobile: boolean;
  isTablet: boolean;
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  dpr: [number, number];
  particleCount: number;
  enablePostProcessing: boolean;
  enableTilt: boolean;
}

/**
 * Returns baseline performance settings
 */
export function getInitialPerfProfile(): DevicePerfProfile {
  return {
    isMobile: false,
    isTablet: false,
    isLowPower: false,
    prefersReducedMotion: false,
    dpr: [1, 1.5],
    particleCount: 220,
    enablePostProcessing: true,
    enableTilt: true,
  };
}

/**
 * Evaluates current browser and device environment
 */
export function evaluateDevicePerformance(): DevicePerfProfile {
  if (typeof window === 'undefined') {
    return getInitialPerfProfile();
  }

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = reducedMotionQuery ? reducedMotionQuery.matches : false;

  // Check hardware concurrency if available
  const concurrency = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 8) : 8;
  const isLowPower = concurrency <= 4 || isMobile;

  // DPR configuration
  let dpr: [number, number] = [1, 2];
  if (prefersReducedMotion) {
    dpr = [1, 1];
  } else if (isMobile) {
    dpr = [1, 1.25];
  } else if (isLowPower) {
    dpr = [1, 1.5];
  }

  // Particle counts
  let particleCount = 280;
  if (prefersReducedMotion) {
    particleCount = 40;
  } else if (isMobile) {
    particleCount = 80;
  } else if (isTablet) {
    particleCount = 140;
  }

  return {
    isMobile,
    isTablet,
    isLowPower,
    prefersReducedMotion,
    dpr,
    particleCount,
    enablePostProcessing: !isMobile && !isLowPower && !prefersReducedMotion,
    enableTilt: !isMobile && !prefersReducedMotion,
  };
}
