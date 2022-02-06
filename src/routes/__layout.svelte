<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const res = await fetch('/github/profile.json');
    const profile = await res.json();

    if (res.ok) {
      return {
        props: {
          profile,
        },
      };
    }

    return {
      status: res.status,
      error: new Error('could not fetch profile'),
    };
  }
</script>

<script lang="ts">
  import { github } from '$lib/config/default';
  import Card from '$lib/components/Card.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import NavLink from '$lib/components/NavLink.svelte';
  import '$lib/styles/app.css';
  import '@fontsource/inter';

  export let profile;

  const { avatarUrl, login, bio, name } = profile.viewer;
</script>

<header class="py-10 flex items-center gap-5">
  <div class="md:w-96">
    <a class="text-3xl" href="/">
      <span class="text-pink-600 dark:text-green-500">/</span>emmut
    </a>
  </div>
  <div class="w-full">
    <nav
      class="mx-auto flex items-center justify-center w-full max-w-2xl gap-4 md:gap-20 font-semibold"
    >
      <NavLink href="/">Stuff</NavLink>
      <NavLink href="/me">Me</NavLink>
      <NavLink href="/repos">Repos</NavLink>
    </nav>
  </div>
</header>

<div class="flex flex-col md:flex-row flex-1 gap-5">
  <aside class="md:w-96">
    <Card class="py-4">
      <img
        class="rounded-full ring-2 w-28 ring-neutral-100/70"
        src={avatarUrl}
        alt="My Github avatar"
      />
      <div class="text-md font-bold mt-4 tracking-wide">
        {login}<span class="text-pink-600 dark:text-green-500">/</span>{name}
      </div>
      <div class="bio leading-5">
        {bio}
      </div>

      <a
        class="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:w-auto sm:text-sm"
        href={github}>Go to my Github page</a
      >
    </Card>
  </aside>
  <div class="w-full">
    <main class="mx-auto max-w-2xl w-full">
      <slot />
    </main>
  </div>
</div>

<footer class="pb-6">
  <a
    class="group flex cursor-pointer justify-between"
    href={github}
    target="_blank"
    rel="no-referrer no-opener"
  >
    <span class="inline-block font-semibold dark:text-neutral-200">
      <span class="group-hover:text-pink-600 dark:group-hover:text-green-500">/</span>emmut
    </span>
    <span
      ><Icon
        class="text-pink-600 dark:text-green-500 transition-all duration-100 ease-out group-hover:-rotate-180"
        name="arrow-right"
      /></span
    >
  </a>
</footer>
