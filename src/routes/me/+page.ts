import { client } from '$lib/sanity';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  try {
    const data = await client.fetch(`*[_type == "about" && _id != 'drafts.about']{
      image,
      about,
      "tools": tools[]-> {
        title,
        text,
        image,
        since
      }
    }`);

    const { about, image, tools, since } = data[0];
    return {
      status: 200,
      body: {
        about,
        image,
        tools,
        since,
      },
    };
  } catch (error) {
    return {
      status: 502,
    };
  }
};
