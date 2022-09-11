<script lang="ts">
  import { page } from '$app/stores';
  $: isActive = $page.url.pathname === $$props.href;
</script>

<a href={$$props.href} {...$$props} class:active={isActive} data-sveltekit-prefetch>
  <slot />
</a>
