<script>
  import { page } from '$app/stores';
  $: isActive = $page.url.pathname === $$props.href;
</script>

<a href={$$props.href} {...$$props} class:active={isActive}>
  <slot />
</a>
