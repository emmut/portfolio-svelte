import type { Portfolio } from '$lib/types/Portfolio';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { client } from '$lib/sanity';

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params;
  const query = `*[_type == "portfolio" && slug.current == "${slug}"]{
    slug,
    title,
    image,
    bio
  }`;

  try {
    const [portfolio]: Portfolio[] = await client.fetch(query);
    return json(portfolio);
  } catch (e) {
    throw error(404, 'Portfolio not found');
  }
};
