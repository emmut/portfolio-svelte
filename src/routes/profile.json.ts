import { client, urlFor } from '$lib/sanity';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const data = await client.fetch(`*[_type == "profile" && _id != 'drafts.profile']{
    _id,
    bio,
    name,
    avatar,
  }`);

  const [profile] = data;

  return {
    body: {
      viewer: {
        name: profile.name,
        avatarUrl: urlFor(profile.avatar).width(400).url(),
        bio: profile.bio,
      },
    },
  };
};
