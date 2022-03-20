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
  import { urlFor } from '$lib/sanity';
  import { deviceDpr, minmax } from '$lib/utils';

  export let portfolios: Portfolio[];
</script>

<div class="grid grid-cols-8 xl:grid-cols-12">
  {#each portfolios as portfolio, i}
    <a
      sveltekit:prefetch
      class="group relative aspect-1 {minmax(i, 4, 'col-span-4', 'col-span-8')}"
      href="/stuff/{portfolio.slug.current}"
    >
      {#if portfolio.image}
        <img
          class="absolute inset-0 -z-10 h-full w-full"
          src={urlFor(portfolio?.image)
            .auto('format')
            .dpr(deviceDpr())
            .width(minmax(i, 4, 250, 500))
            .height(minmax(i, 4, 250, 500))
            .crop('center')
            .fit('crop')
            .url()}
          alt={portfolio.image.caption}
        />
      {/if}
      <div
        class="h-full bg-gray-800/40 p-4 text-neutral-50 opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus:opacity-100"
      >
        <h2 class="text-xl font-bold">{portfolio.title}</h2>
        <p class="text-sm line-clamp-5">{portfolio.excerpt}</p>
      </div>
    </a>
  {/each}
</div>
