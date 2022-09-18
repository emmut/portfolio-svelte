import type { Theme } from '$lib/types/Theme';
import { browser } from '$app/environment';
import { translateStringToTheme } from '$lib/utils';
import { writable } from 'svelte/store';

const initial = browser ? window.localStorage.getItem('theme') ?? 'SYSTEM' : '';

export const theme = writable<Theme>(translateStringToTheme(initial));
