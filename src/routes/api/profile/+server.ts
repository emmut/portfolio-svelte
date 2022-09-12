import { client } from '$lib/sanity';
import type { Profile } from '$lib/types/Profile';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const data = await client.fetch<Profile[]>(`*[_type == "profile" && _id != 'drafts.profile']{
    _id,
    bio,
    name,
    avatar,
  }`);

  if (data !== null && Array.isArray(data)) {
    const [profile] = data;
    const { name, avatar, bio } = profile;

    return json({
      name,
      avatar,
      bio,
    });
  }

  throw error(503, 'Could not fetch data');
};
