import { client } from '$lib/sanity';
import type { Portfolio } from '$lib/types/Portfolio';
import type { EndpointOutput, RequestEvent } from '@sveltejs/kit';

export async function get({ params }: RequestEvent): Promise<EndpointOutput> {
  const { slug } = params;
  const query = `*[_type == "portfolio" && slug.current == "${slug}"]{
    slug,
    title,
    image,
    bio
  }`;

  const [portfolio]: Portfolio[] = await client.fetch(query);

  if (portfolio) {
    return {
      status: 200,
      body: {
        portfolio,
      },
    };
  }

  return {
    status: 404,
  };
}
