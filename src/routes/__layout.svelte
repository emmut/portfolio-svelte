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
  import type { Profile } from '$lib/types/Profile';
  import { github } from '$lib/config/default';
  import Card from '$lib/components/Card.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import NavLink from '$lib/components/NavLink.svelte';
  import '$lib/styles/app.css';
  import '@fontsource/inter';

  export let profile: Profile;

  const { avatarUrl, login, bio, name } = profile.viewer;
</script>

<header class="flex items-center gap-5 py-10">
  <div class="md:w-96">
    <a class="text-3xl" href="/">
      <span class="text-pink-600 dark:text-green-500">/</span>emmut
    </a>
  </div>
  <div class="w-full">
    <nav
      class="mx-auto flex w-full max-w-2xl items-center justify-center gap-4 font-semibold md:gap-20"
    >
      <NavLink href="/">Stuff</NavLink>
      <NavLink href="/me">Me</NavLink>
      <NavLink href="/repos">Repos</NavLink>
    </nav>
  </div>
</header>

<div class="flex flex-1 flex-col gap-5 md:flex-row">
  <aside class="md:w-96">
    <Card padding="py-4 px-3">
      <img
        class="w-28 rounded-full ring-2 ring-neutral-100/70"
        src={avatarUrl}
        alt="My Github avatar"
      />
      <div class="text-md mt-4 font-bold tracking-wide">
        {login}<span class="text-pink-600 dark:text-green-500">/</span>{name}
      </div>
      <div class="bio leading-5">
        {bio}
      </div>

      <a
        class="mt-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:w-auto sm:text-sm"
        href={github}>Go to my Github page</a
      >
    </Card>
  </aside>
  <div class="w-full">
    <main class="mx-auto w-full max-w-2xl">
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
        class="text-pink-600 transition-all duration-100 ease-out group-hover:-rotate-180 dark:text-green-500"
        name="arrow-right"
      /></span
    >
  </a>
</footer>
