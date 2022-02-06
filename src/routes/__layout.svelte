<script>
	import NavLink from '$lib/components/NavLink.svelte';
	import '$lib/styles/app.css';
</script>

<header class="bg-zinc-800 text-neutral-200">
	<span class="text-3xl">
		<span class="text-green-500">/</span>emmut
	</span>
	<nav>
		<NavLink class="" href="/">Repos</NavLink>
		<NavLink class="" href="/me">Me</NavLink>
		<NavLink class="" href="/stuff">Stuff</NavLink>
	</nav>
</header>

<main>
	<slot />
</main>
