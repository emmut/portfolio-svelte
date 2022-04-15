import { browser } from '$app/env';
import type { Theme } from '$lib/types/Theme';
import type { BlockChild, BlockSpan, PortableTextBlocks } from '@portabletext/svelte/ptTypes';
import type { HSLObject } from './types/Color';

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

export function hexToHsl(hex: string): HSLObject {
  hex = hex.replace(/#/g, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(function (hex) {
        return hex + hex;
      })
      .join('');
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);

  if (!result) {
    return {
      h: 1,
      s: 1,
      l: 1,
    };
  }

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number;
  let s: number;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return {
    h: h,
    s: s,
    l: l,
  };
}

// PortableText block to plain text
export function toPlainText(blocks: PortableTextBlocks): string {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return (block.children as (BlockChild & BlockSpan)[]).map((child) => child.text).join('');
    })
    .join('\n\n');
}
