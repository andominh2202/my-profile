import { useCallback, useEffect, useState } from 'react';

export type AuroraTheme = 'aurora' | 'midnight' | 'cyber' | 'polar';

const THEME_KEY = 'profile-aurora-theme';

export const THEME_OPTIONS: { id: AuroraTheme; label: string }[] = [
  { id: 'aurora', label: 'Aurora' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'cyber', label: 'Cyber' },
  { id: 'polar', label: 'Polar Light' }
];

function getInitialTheme(): AuroraTheme {
  if (typeof window === 'undefined') return 'aurora';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'aurora' || saved === 'midnight' || saved === 'cyber' || saved === 'polar') {
      return saved;
    }
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'polar';
    }
  } catch {
    // Ignore storage errors
  }
  return 'aurora';
}

export function useTheme() {
  const [theme, setThemeState] = useState<AuroraTheme>(getInitialTheme);

  const applyTheme = useCallback((next: AuroraTheme, animate: boolean) => {
    const root = document.documentElement;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (animate && !reduce) {
      root.classList.add('is-switching-theme');
      window.setTimeout(() => root.classList.remove('is-switching-theme'), 300);
    }
    const mode = next === 'polar' ? 'light' : 'dark';
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-aurora-theme', next);
    root.style.colorScheme = mode;
    const meta = document.getElementById('meta-theme-color');
    if (meta) {
      meta.setAttribute('content', next === 'polar' ? '#F8FAFC' : next === 'midnight' ? '#04070F' : '#050811');
    }
  }, []);

  useEffect(() => {
    applyTheme(theme, false);
  }, [theme, applyTheme]);

  const setTheme = useCallback((next: AuroraTheme) => {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore
    }
    applyTheme(next, true);
    setThemeState(next);
  }, [applyTheme]);

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const idx = THEME_OPTIONS.findIndex((t) => t.id === prev);
      const next = THEME_OPTIONS[(idx + 1) % THEME_OPTIONS.length].id;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Ignore
      }
      applyTheme(next, true);
      return next;
    });
  }, [applyTheme]);

  return { theme, setTheme, cycleTheme };
}
