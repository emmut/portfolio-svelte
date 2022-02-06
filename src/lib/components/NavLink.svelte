<script>
	import { page } from '$app/stores';
	$: isActive = $page.url.pathname === $$props.href;
</script>

<a href={$$props.href} {...$$props} class:active={isActive}>
	<slot />
</a>

<style>
	.active {
		@apply underline underline-offset-[3px] decoration-green-500 decoration-2;
	}
</style>
