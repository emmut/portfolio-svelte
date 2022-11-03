import type { Theme } from '$lib/types/Theme';
import { getTheme } from '$lib/utils';
import { writable } from 'svelte/store';

const initialTheme = getTheme();

export const theme = writable<Theme>(initialTheme);
