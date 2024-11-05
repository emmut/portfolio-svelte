<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
  interface Props {
    src: string;
    class?: string;
    alt?: string;
    width?: number;
    height?: number;
    onLoaded?: () => void;
    loading: 'eager' | 'lazy';
  }

  let { src, class: className, alt, width, height, onLoaded, loading = 'lazy' }: Props = $props();
  let loaded = $state(false);
  

  function handleLoad() {
    loaded = true;
    onLoaded?.();
  }
</script>

{#if src}
  <img
    onload={handleLoad}
    data-loaded={loaded}
    class={className}
    src={src}
    alt={alt}
    width={width}
    height={height}
    style={`aspect-ratio: ${width}/${height}`}
    {loading}
  />
{/if}

<style lang="postcss">
  :global(body.js img) {
    transition: opacity 400ms ease-out;

    &[data-loaded='false'] {
      @apply opacity-0;
    }
  }
</style>
