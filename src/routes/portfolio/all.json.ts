import { client } from '$lib/sanity';
import type { Portfolio } from '$lib/types/Portfolio';

export async function get(): Promise<{
	status: number;
	body: Portfolio[] | Error;
}> {
	const data: Portfolio[] = await client.fetch(`*[_type == "portfolio"]{
    _id,
    image,
    title,
    slug
  }`);

	if (data) {
		return {
			status: 200,
			body: data
		};
	}

	return {
		status: 500,
		body: new Error('Internal server error')
	};
}
