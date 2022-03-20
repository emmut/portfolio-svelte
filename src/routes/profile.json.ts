import { client } from '$lib/sanity';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const data = await client.fetch(`*[_type == "profile" && _id != 'drafts.profile']{
    _id,
    bio,
    name,
    avatar,
  }`);

  const [profile] = data;
  const { name, avatar, bio } = profile;

  return {
    body: {
      name,
      avatar,
      bio,
    },
  };
};
