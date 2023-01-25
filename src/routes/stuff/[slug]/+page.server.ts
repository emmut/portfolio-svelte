import type { Portfolio } from '$lib/types/Portfolio';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { client } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }) => {
  const query = `*[_type == "portfolio" && slug.current == "${params.slug}"]{
    slug,
    title,
    image,
    bio
  }`;

  try {
    const [portfolio]: Portfolio[] = await client.fetch(query);

    return {
      portfolio,
    };
  } catch (e) {
    throw redirect(301, '/');
  }
};
