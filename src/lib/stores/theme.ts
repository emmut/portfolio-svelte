import { Theme } from '$lib/types/Theme';
import { writable } from 'svelte/store';

export const theme = writable<Theme>(Theme.none);
