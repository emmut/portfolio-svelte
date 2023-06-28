<script lang="ts">
  import { urlFor } from '$lib/sanity';
  import { deviceDpr } from '$lib/utils';
  import type {
    CropMode,
    FitMode,
    SanityImageHotspot,
    SanityImageSource,
  } from '@sanity/image-url/lib/types/types';
  import { createEventDispatcher, onMount } from 'svelte';

  export let src: SanityImageSource | string;
  export let quality = 85;
  export let crop: CropMode = 'focalpoint';
  export let fit: FitMode = 'crop';
  export let useSanity = true;
  export let loading: 'eager' | 'lazy' = 'lazy';

  let imgSrc = '';
  let image: HTMLImageElement;
  let dpr = deviceDpr();
  let hotspot: SanityImageHotspot;

  if (typeof src === 'object' && 'hotspot' in src) {
    hotspot = src.hotspot;
  }

  const dispatch = createEventDispatcher();

  $: loaded = false;

  onMount(() => {
    if (useSanity) {
      let sanityUrl = urlFor(src)
        .width(image.clientWidth)
        .height(image.clientHeight)
        .quality(quality)
        .dpr(dpr)
        .crop(crop)
        .fit(fit)
        .auto('format');

      if (crop === 'focalpoint' && hotspot) {
        sanityUrl = sanityUrl.focalPoint(hotspot.x, hotspot.y);
      }

      imgSrc = sanityUrl.url();
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
    {loading}
  />
{/if}

<style lang="postcss">
  img {
    transition: opacity 400ms ease-out;

    &[data-loaded='false'] {
      @apply opacity-0;
    }
  }
</style>
