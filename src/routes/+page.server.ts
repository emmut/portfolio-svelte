import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  try {
    const portfolios = await client.fetch(`*[_type == "portfolio"]{
        _id,
        image,
        title,
        slug,
        excerpt,
      }`);

    return {
      portfolios,
    };
  } catch (e) {
    throw error(503, 'Could not fetch posts');
  }
}) satisfies PageServerLoad;
