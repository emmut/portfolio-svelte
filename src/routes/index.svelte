<!-- <script context="module">
  export async function load({ fetch }) {
    try {
      const res = await fetch('/portfolios/all.json');
      console.log(res);
      const data = await res.json();

      return {
        props: data
      }
    } catch (err) {
      console.log('500:', err);
      const data = '';
      return {
        props: data,
      }
    }
  }
</script> -->

<script>
  export let data;
  // console.log(data);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>