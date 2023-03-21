import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export const load = (async () => {
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
      about,
      image,
      tools,
      since,
    };
  } catch (e) {
    throw error(502, 'Could not fetch page');
  }
}) satisfies PageServerLoad;
