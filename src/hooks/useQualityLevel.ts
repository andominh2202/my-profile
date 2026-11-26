import { useEffect, useState } from 'react';
import type { QualityLevel } from '../types/profile';

function detectQuality(): QualityLevel {
  if (typeof window === 'undefined') return 'low';
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return 'low';

  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (w < 768 || cores <= 2 || mem <= 2) return 'low';
  if (w < 1100 || cores <= 4 || mem <= 4) return 'medium';
  return 'high';
}

export function useQualityLevel(): QualityLevel {
  const [quality, setQuality] = useState<QualityLevel>(detectQuality);

  useEffect(() => {
    const onResize = () => setQuality(detectQuality());
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    window.addEventListener('resize', onResize, { passive: true });
    mq?.addEventListener?.('change', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      mq?.removeEventListener?.('change', onResize);
    };
  }, []);

  return quality;
}
