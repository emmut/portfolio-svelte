import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
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
};
