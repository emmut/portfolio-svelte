import { browser } from '$app/env';
import type { Theme } from '$lib/types/Theme';

export function mergeClasses(classesA: string, classesB: string): string {
  const a = classesA.split(' ');
  const b = classesB.split(' ');

  return a.concat(b).join(' ');
}

export function setupTheme(theme: Theme): number {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    return 0;
  }

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    return 1;
  }

  if (theme === 'system') {
    localStorage.removeItem('theme');

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return 2;
  }
}

export function deviceDpr(): number {
  return browser ? window.devicePixelRatio : 1;
}

export function minmax<T>(i: number, modulo: number, min: T, max: T): T {
  return ++i % modulo === 0 ? max : min;
}
