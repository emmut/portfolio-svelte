<script lang="ts">
  let { ...props }: Props = $props();
  interface Props {
    href: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  import { page } from '$app/stores';
  let isActive = $derived($page.url.pathname === props.href);
</script>

<a {...props} class:active={isActive} data-sveltekit-preload-data>
  {@render props?.children?.()}
</a>
