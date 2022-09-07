import { client } from '$lib/sanity';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  try {
    const data = await client.fetch(`*[_type == "portfolio"]{
      _id,
      image,
      title,
      slug,
      excerpt,
    }`);

    return {
      status: 200,
      body: data,
    };
  } catch (error) {
    return {
      status: 502,
      body: new Error('Bad Gateway'),
    };
  }
};
