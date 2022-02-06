<script context="module">
	export async function load({ fetch, params }) {
		const { slug } = params;
		const res = await fetch(`/portfolio/${slug}.json`);
		const { portfolio } = await res.json();

		console.log(portfolio);
		if (res.ok) {
			return {
				props: {
					portfolio
				}
			};
		}

		return {
			status: 301,
			redirect: '/stuff'
		};
	}
</script>

<script>
	export let portfolio;
</script>

{portfolio.title}
