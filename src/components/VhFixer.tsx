'use client';

import { useEffect } from 'react';

/**
 * VhFixer - Fixes iOS Safari vh viewport issue
 * 
 * iOS Safari uses 100vh as the full browser viewport height,
 * which includes the URL bar. This causes content to be cut off
 * or blank spaces when the URL bar shows/hides.
 * 
 * This component sets a CSS variable --vh that can be used
 * with calc() for dynamic viewport height (100dvh).
 */
export default function VhFixer() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial value
    setVh();

    // Listen for resize and orientation changes
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    // Also handle when URL bar shows/hides on mobile
    // This is more aggressive but ensures consistency
    let resizeTimeout: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setVh, 100);
    });

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
