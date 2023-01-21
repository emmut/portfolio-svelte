import { json, error, type RequestHandler } from '@sveltejs/kit';

import { GITHUB_ACCESS_TOKEN } from '$env/static/private';
import { endpoint } from '$lib/config/default';

export const GET: RequestHandler = async () => {
  try {
    const data = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          {
            viewer {
              login
              bio
              avatarUrl
            }
          }
        `,
      }),
    });

    return json((await data.json()).data);
  } catch (e) {
    throw error(502, 'Bad Gateway');
  }
};
