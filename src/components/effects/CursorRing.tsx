import { useEffect, useRef } from 'react';
import type { QualityLevel } from '../../types/profile';

export function CursorRing({ quality }: { quality: QualityLevel }) {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || quality === 'low') return;
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return;

    let cx = -100;
    let cy = -100;
    let rx = -100;
    let ry = -100;
    let active = false;
    let rafId = 0;

    const tick = () => {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      if (active) rafId = window.requestAnimationFrame(tick);
    };

    const onMove = (ev: PointerEvent) => {
      cx = ev.clientX;
      cy = ev.clientY;
      if (!active) {
        active = true;
        rx = cx;
        ry = cy;
        ring.classList.add('is-visible');
        rafId = window.requestAnimationFrame(tick);
      }
      const target = ev.target as HTMLElement | null;
      const hit = target?.closest?.('a, button, [data-copy]');
      ring.classList.toggle('is-hover', Boolean(hit));
    };

    const onLeave = () => {
      active = false;
      ring.classList.remove('is-visible');
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [quality]);

  if (quality === 'low') return null;
  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
