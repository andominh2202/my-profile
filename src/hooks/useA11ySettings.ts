import { useEffect, useState } from 'react';

export interface A11ySettings {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  simplifyEffects: boolean;
}

const A11Y_KEY = 'profile-a11y';

function getInitialA11y(): A11ySettings {
  const sysReduce = typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  if (typeof window === 'undefined') {
    return { reduceMotion: sysReduce, highContrast: false, largeText: false, simplifyEffects: false };
  }
  try {
    const raw = localStorage.getItem(A11Y_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<A11ySettings>;
      return {
        reduceMotion: parsed.reduceMotion ?? sysReduce,
        highContrast: Boolean(parsed.highContrast),
        largeText: Boolean(parsed.largeText),
        simplifyEffects: Boolean(parsed.simplifyEffects)
      };
    }
  } catch {
    // Ignore
  }
  return { reduceMotion: sysReduce, highContrast: false, largeText: false, simplifyEffects: false };
}

export function useA11ySettings() {
  const [settings, setSettings] = useState<A11ySettings>(getInitialA11y);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('a11y-reduce-motion', settings.reduceMotion);
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    root.classList.toggle('a11y-large-text', settings.largeText);
    root.classList.toggle('a11y-simplify', settings.simplifyEffects);
    try {
      localStorage.setItem(A11Y_KEY, JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }, [settings]);

  const toggleSetting = (key: keyof A11ySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return { settings, toggleSetting };
}
