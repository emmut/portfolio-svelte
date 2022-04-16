<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/portfolio/all.json');
    const portfolios = await res.json();

    if (res.ok) {
      return {
        props: {
          portfolios,
        },
      };
    }

    return {
      status: res.status,
      error: new Error('could not get portfolios'),
    };
  };
</script>

<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';
  import PortfolioItem from '$lib/components/PortfolioItem.svelte';

  export let portfolios: Portfolio[];
</script>

<svelte:head>
  <title>Stuff /emmut</title>
</svelte:head>

<div class="grid grid-cols-8 lg:grid-cols-12">
  {#each portfolios as portfolio, index}
    <PortfolioItem {portfolio} {index} />
  {/each}
</div>
