<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';
  import PortfolioItem from '$lib/components/PortfolioItem.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';

  let { data } = $props();
  const portfolios: Portfolio[] = data.portfolios;
</script>

<svelte:head>
  <title>Stuff /emmut</title>
</svelte:head>

<PageHeader>portfolio</PageHeader>

<div class="grid grid-cols-8 lg:grid-cols-12">
  {#each portfolios as portfolio, index}
    <PortfolioItem {portfolio} {index} />
  {/each}
</div>
