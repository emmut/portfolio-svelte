import { browser } from '$app/env';
import type { Theme } from '$lib/types/Theme';
import { writable } from 'svelte/store';

const initial: Theme = browser ? (window.localStorage.getItem('theme') as Theme) ?? 'system' : null;

export const theme = writable<Theme>(initial);
