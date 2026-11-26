import { useEffect, useState } from 'react';

export function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem('nope_intro_seen') === '1';
    } catch {
      seen = false;
    }
    return Boolean(reduce || seen);
  });
  const [pct, setPct] = useState(35);

  useEffect(() => {
    if (done) return;
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      setPct(100);
      try {
        sessionStorage.setItem('nope_intro_seen', '1');
      } catch {
        // Ignore
      }
      window.setTimeout(() => {
        if (!cancelled) setDone(true);
      }, 160);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) setPct(85);
        window.setTimeout(finish, 120);
      }, finish);
    } else {
      window.setTimeout(finish, 240);
    }

    const cap = window.setTimeout(finish, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(cap);
    };
  }, [done]);

  return (
    <div className={`preloader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__brand">
          <span className="preloader__dot" />
          <span className="preloader__wordmark">NOPE0612</span>
        </div>
        <div className="preloader__bar">
          <span className="preloader__fill" style={{ transform: `scaleX(${(pct / 100).toFixed(2)})` }} />
        </div>
        <span className="preloader__pct">{pct}%</span>
      </div>
    </div>
  );
}
