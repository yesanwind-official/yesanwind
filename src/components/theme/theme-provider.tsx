'use client';

import { useEffect, useCallback } from 'react';
import { useThemeStore, type Theme } from '@/stores/theme-store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setResolvedTheme } = useThemeStore();

  const applyTheme = useCallback(
    (resolvedTheme: 'light' | 'dark') => {
      const root = document.documentElement;

      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);

      setResolvedTheme(resolvedTheme);
    },
    [setResolvedTheme]
  );

  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }, []);

  const resolveTheme = useCallback(
    (theme: Theme): 'light' | 'dark' => {
      if (theme === 'system') {
        return getSystemTheme();
      }
      return theme;
    },
    [getSystemTheme]
  );

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const resolved = resolveTheme(theme);
    applyTheme(resolved);
  }, [theme, resolveTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return <>{children}</>;
}
