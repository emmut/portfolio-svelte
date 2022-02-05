import { client } from '$lib/sanity';

export async function get(): Promise<{
	status: number;
	body: Response | Error;
}> {
	const data: Response = await client.fetch(`*[_type == "portfolio"]{
    _id,
    image,
    title,
    slug
  }`);

	console.log(data);

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
