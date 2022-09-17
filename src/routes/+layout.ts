import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { counterUri } from '$lib/config/default';

// FIXME: Type this correctly
export const load: LayoutLoad = async ({ fetch }) => {
  const [res1, res2, res3] = await Promise.all([
    fetch('/api/github/profile'),
    fetch('/api/profile'),
    fetch(`https://rest-counter.onrender.com/${counterUri}`),
  ]);

  if (res1.ok && res2.ok && res3.ok) {
    const githubProfile = await res1.json();
    const profile = await res2.json();
    const counter = await res3.json();

    return {
      githubProfile,
      profile,
      count: counter.count,
    };
  }

  throw error(503, 'Could not fetch profile data');
};
