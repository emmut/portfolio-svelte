<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';
  import { urlFor } from '$lib/sanity';
  import { deviceDpr, minmax } from '$lib/utils';
  import Icon from './Icon.svelte';
  import { onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  export let portfolio: Portfolio;
  export let index: number;

  let open = false;

  $: card =
    (open ? 'opacity-1' : 'opacity-0') +
    ' h-full bg-gray-800/40 p-4 text-neutral-50 transition-all duration-500';

  let portfolioElement: HTMLAnchorElement;

  function handleClickOutside(event: MouseEvent) {
    if (!portfolioElement.contains(event.target as HTMLElement)) {
      open = false;
      document.removeEventListener('click', handleClickOutside);
    }
  }

  function handleClick() {
    open = !open;
    portfolioElement.focus();
    document.addEventListener('click', handleClickOutside);
  }

  onDestroy(() => {
    browser && document.removeEventListener('click', handleClickOutside);
  });
</script>

<a
  bind:this={portfolioElement}
  id="portfolio-{index}"
  sveltekit:prefetch
  class="group relative aspect-1 {minmax(index, 4, 'col-span-4', 'col-span-8')}"
  href="/stuff/{portfolio.slug.current}"
>
  {#if portfolio.image}
    <img
      class="absolute inset-0 -z-10 h-full w-full"
      src={urlFor(portfolio?.image)
        .auto('format')
        .dpr(deviceDpr())
        .width(minmax(index, 4, 250, 500))
        .height(minmax(index, 4, 250, 500))
        .crop('center')
        .fit('crop')
        .url()}
      alt={portfolio.image.caption}
    />
  {/if}
  <div class={card}>
    <h2 class="text-xl font-bold">{portfolio.title}</h2>
    <p class="text-sm line-clamp-5">{portfolio.excerpt}</p>
  </div>

  <div class="info-icon" tabindex="0" on:click|preventDefault={handleClick}>
    <Icon name="info" class="h-4 w-4" />
  </div>
</a>

<style lang="postcss">
  .info-icon {
    /* Position */
    @apply absolute 
      top-2 
      right-2;

    /* Layout */
    @apply flex 
      h-6 
      w-6 
      items-center 
      justify-center
      p-1;

    /* Appearance */
    @apply cursor-pointer 
      rounded-full 
      bg-neutral-200 
      font-bold 
      text-gray-900;

    /* Hover */
    @apply hover:bg-neutral-100;

    /* Focus */
    @apply focus:bg-neutral-100 
      focus:ring-2;
  }
</style>
