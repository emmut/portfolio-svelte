import type { RepoStore } from '$lib/types/Repos';
import { writable } from 'svelte/store';

export const repos = writable<RepoStore>([]);
