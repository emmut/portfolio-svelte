<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
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
  }
</script>

<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';
  import { urlFor } from '$lib/sanity';

  export let portfolios: Portfolio[];
</script>

<div class="grid grid-cols-12">
  {#each portfolios as portfolio}
    <a href="/stuff/{portfolio.slug.current}">
      {#if portfolio.image}
        <img src={urlFor(portfolio.image).width(400).url()} alt="" />
      {/if}
      <span class="text-md">{portfolio.title}</span>
    </a>
  {/each}
</div>
