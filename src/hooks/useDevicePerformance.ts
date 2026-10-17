'use client';

import { useState, useEffect } from 'react';
import { evaluateDevicePerformance, getInitialPerfProfile, DevicePerfProfile } from '@/utils/devicePerf';

/**
 * Hook to reactively track device performance capabilities,
 * screen resizes, and prefers-reduced-motion triggers.
 */
export function useDevicePerformance(): DevicePerfProfile {
  const [profile, setProfile] = useState<DevicePerfProfile>(getInitialPerfProfile);

  useEffect(() => {
    // Initial evaluation on client mount
    setProfile(evaluateDevicePerformance());

    const handleResize = () => {
      setProfile(evaluateDevicePerformance());
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setProfile(evaluateDevicePerformance());
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      // Legacy Safari fallback
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return profile;
}
