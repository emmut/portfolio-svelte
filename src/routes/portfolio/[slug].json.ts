import { client } from '$lib/sanity';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
  const { slug } = params;
  const query = `*[_type == "portfolio" && slug.current == "${slug}"]{
    slug,
    title,
    image,
    bio
  }`;

  try {
    const [portfolio] = await client.fetch(query);

    return {
      status: 200,
      body: {
        portfolio,
      },
    };
  } catch (error) {
    return {
      status: 404,
    };
  }
};
