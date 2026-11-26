import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '../types/profile';

const THEME_KEY = 'profile-theme';

function getInitialTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  const applyTheme = useCallback((next: ThemeMode, animate: boolean) => {
    const root = document.documentElement;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (animate && !reduce) {
      root.classList.add('is-switching-theme');
      window.setTimeout(() => root.classList.remove('is-switching-theme'), 300);
    }
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    const meta = document.getElementById('meta-theme-color');
    if (meta) meta.setAttribute('content', next === 'light' ? '#F8FAFC' : '#050811');
  }, []);

  useEffect(() => {
    applyTheme(theme, false);
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Ignore storage errors
      }
      applyTheme(next, true);
      return next;
    });
  }, [applyTheme]);

  return { theme, toggleTheme };
}
