<script lang="ts">
  import type { Portfolio } from '$lib/types/Portfolio';
  import { onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import Icon from './Icon.svelte';
  import SanityImage from './SanityImage.svelte';

  interface Props {
    portfolio: Portfolio;
    index: number;
  }

  let { portfolio, index }: Props = $props();

  let open = $state(false);

  let card =
    $derived((open ? 'opacity-1' : 'opacity-0') +
    ' h-full bg-gray-900/80 p-4 text-neutral-50 transition-all duration-500 overflow-hidden');

  let loaded = $state(false);
  

  let portfolioElement = $state<HTMLAnchorElement>();

  function handleClickOutside(event: MouseEvent) {
    if (!portfolioElement?.contains(event.target as HTMLElement)) {
      open = false;
      document.removeEventListener('click', handleClickOutside);
    }
  }

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    open = !open;
    portfolioElement?.focus();
    document.addEventListener('click', handleClickOutside);
  }

  onDestroy(() => {
    browser && document.removeEventListener('click', handleClickOutside);
  });
</script>

<a
  bind:this={portfolioElement}
  id="portfolio-{index}"
  class="group relative col-span-4 aspect-1"
  href="/stuff/{portfolio.slug.current}"
  data-sveltekit-preload-data
>
  {#if portfolio.image}
    <SanityImage
      class="absolute inset-0 -z-10 h-full w-full"
      src={portfolio?.image}
      alt={portfolio.image.caption}
      width={224}
      height={224}
      onLoaded={() => (loaded = true)}
      loading="eager"
    />
  {/if}
  <div class={card}>
    <h2 class="leading-tightc mb-2 w-[calc(100%-theme('width.6'))] text-xl font-bold">
      {portfolio.title}
    </h2>
    <p class="text-sm line-clamp-5">{portfolio.excerpt}</p>
  </div>

  {#if loaded}
    <button class="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 p-1 font-bold text-gray-900 hover:bg-neutral-100 focus:bg-neutral-100 focus:ring-2" onclick={handleClick} title="Toggle the excerpt">
      <Icon name="info" class="h-4 w-4" />
    </button>
  {/if}
</a>