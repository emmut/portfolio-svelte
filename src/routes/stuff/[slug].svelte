<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  export async function load({ fetch, params }: LoadInput): Promise<LoadOutput> {
    const { slug } = params;
    const res = await fetch(`/portfolio/${slug}.json`);
    const { portfolio } = await res.json();

    if (res.ok) {
      return {
        props: {
          portfolio,
        },
      };
    }

    return {
      status: 301,
      redirect: '/stuff',
    };
  }
</script>

<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';

  export let portfolio: Portfolio;
</script>

{portfolio.title}
