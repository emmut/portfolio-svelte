import { browser } from '$app/env';
import { writable } from 'svelte/store';

const initialValue =
  browser &&
  (window.localStorage.getItem('theme') ?? window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');

export const theme = writable<string>(initialValue);

theme.subscribe((value) => {
  browser && window.localStorage.setItem('theme', value);
});
