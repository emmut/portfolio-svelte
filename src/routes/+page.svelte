<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';
  import PortfolioItem from '$lib/components/PortfolioItem.svelte';

  export let data;
  const { portfolios }: Portfolio[] = data;
</script>

<svelte:head>
  <title>Stuff /emmut</title>
</svelte:head>

<div class="grid grid-cols-8 lg:grid-cols-12">
  {#each portfolios as portfolio, index}
    <PortfolioItem {portfolio} {index} />
  {/each}
</div>
