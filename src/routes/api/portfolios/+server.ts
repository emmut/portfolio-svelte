import { client } from '$lib/sanity';
import { json } from '@sveltejs/kit';

export const GET = async () => {
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
