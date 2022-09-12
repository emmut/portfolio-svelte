import type { Portfolio } from '$lib/types/Portfolio';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
  const { slug } = params;
  const res = await fetch(`/api/portfolios/${slug}`);
  const portfolio: Portfolio = await res.json();

  if (res.ok) {
    return {
      portfolio,
    };
  }

  throw redirect(301, '/stuff');
};
