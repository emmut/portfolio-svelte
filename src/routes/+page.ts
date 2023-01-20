import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/portfolios');
  const portfolios = await res.json();

  if (res.ok) {
    return {
      portfolios,
    };
  }

  throw error(503, 'Could not fetch posts');
};
