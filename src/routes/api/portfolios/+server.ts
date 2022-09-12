import { client } from '$lib/sanity';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  try {
    const data = await client.fetch(`*[_type == "portfolio"]{
      _id,
      image,
      title,
      slug,
      excerpt,
    }`);

    return json(data);
  } catch (error) {
    throw error(502, 'Bad Gateway');
  }
};
