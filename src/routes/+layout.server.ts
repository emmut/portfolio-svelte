import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity';

export const load: LayoutServerLoad = async ({ fetch }) => {
  try {
    const [res1, res2] = await Promise.all([fetch('/api/github/profile'), fetch('/api/profile')]);

    const githubProfile = await res1.json();
    const profile = await res2.json();

    const siteMeta = await client.fetch(
      "*[_type == 'siteSettings' && _id != 'drafts.siteSettings'][0]"
    );

    return {
      githubProfile,
      profile,
      siteMeta,
    };
  } catch (e) {
    throw error(503, 'Could not fetch profile data or site meta');
  }
};
