import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: LayoutLoad = async ({ fetch }) => {
  // prettier-ignore
  const [res1, res2] = await Promise.all([
    fetch('/api/github/profile'),
    fetch('/api/profile'),
  ]);

  if (res1.ok && res2.ok) {
    const githubProfile = await res1.json();
    const profile = await res2.json();

    return {
      githubProfile,
      profile,
    };
  }

  throw error(503, 'Could not fetch profile data');
};
