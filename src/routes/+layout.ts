import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

// FIXME: Type this correctly
export const load: LayoutLoad = async ({ fetch }) => {
  const res1 = await fetch('/api/github/profile');
  const githubProfile = await res1.json();
  const res2 = await fetch('/api/profile');
  const profile = await res2.json();

  if (res1.ok && res2.ok) {
    return {
      githubProfile,
      profile,
    };
  }

  throw error(503, 'Could not fetch profile data');
};
