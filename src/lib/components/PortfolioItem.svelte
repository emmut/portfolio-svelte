<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';
  import { minmax } from '$lib/utils';
  import { onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import Icon from './Icon.svelte';
  import Image from './SanityImageAlt.svelte';

  export let portfolio: Portfolio;
  export let index: number;

  let open = false;

  $: card =
    (open ? 'opacity-1' : 'opacity-0') +
    ' h-full bg-gray-900/80 p-4 text-neutral-50 transition-all duration-500 overflow-hidden';

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
  class="group relative aspect-1 {minmax(index, 4, 'col-span-4', 'col-span-8')}"
  href="/stuff/{portfolio.slug.current}"
  data-sveltekit-preload-data
>
  {#if portfolio.image}
    <Image
      class="absolute inset-0 -z-10 h-full w-full"
      src={portfolio?.image}
      alt={portfolio.image.caption}
      width="224"
      height="224"
    />
  {/if}
  <div class={card}>
    <h2 class="leading-tightc mb-2 w-[calc(100%-theme('width.6'))] text-xl font-bold">
      {portfolio.title}
    </h2>
    <p class="text-sm line-clamp-5">{portfolio.excerpt}</p>
  </div>

  <button class="info-icon" on:click|preventDefault={handleClick} title="Toggle the excerpt">
    <Icon name="info" class="h-4 w-4" />
  </button>
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
