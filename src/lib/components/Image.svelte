<script lang="ts">
  import { urlFor } from '$lib/sanity';
  import { deviceDpr } from '$lib/utils';
  import type { CropMode, FitMode, SanityImageSource } from '@sanity/image-url/lib/types/types';
  import { createEventDispatcher, onMount } from 'svelte';

  export let src: SanityImageSource | string;
  export let quality = 85;
  export let crop: CropMode = 'center';
  export let fit: FitMode = 'crop';
  export let useSanity = true;

  let image: HTMLImageElement;
  let drp = deviceDpr();
  let imgSrc: string;

  const dispatch = createEventDispatcher();

  $: loaded = false;

  onMount(() => {
    if (useSanity) {
      imgSrc = urlFor(src)
        .width(image.clientWidth)
        .height(image.clientHeight)
        .quality(quality)
        .dpr(drp)
        .crop(crop)
        .fit(fit)
        .auto('format')
        .url();
      return;
    }

    imgSrc = typeof src === 'string' ? src : '';
  });

  function handleLoad() {
    loaded = true;
    dispatch('loaded');
  }
</script>

{#if src}
  <img
    bind:this={image}
    on:load={handleLoad}
    data-loaded={loaded}
    class={$$props.class}
    src={imgSrc}
    alt={$$props.alt}
    width={$$props.width}
    height={$$props.height}
    style={$$props.width && $$props.height && `aspect-ratio: ${$$props.width}/${$$props.height}`}
  />
{/if}

<style lang="postcss">
  img {
    @apply block;
    transition: opacity 400ms ease-out;

    &[data-loaded='false'] {
      @apply opacity-0;
    }
  }
</style>
