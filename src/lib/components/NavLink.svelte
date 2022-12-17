<script lang="ts">
  import { page } from '$app/stores';
  $: isActive = $page.url.pathname === $$props.href;
  export let href: string;
</script>

<a {href} {...$$props} class:active={isActive} data-sveltekit-preload-data>
  <slot />
</a>
