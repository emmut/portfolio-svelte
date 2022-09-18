<script lang="ts">
  import type {
    GithubProfile as GithubProfileType,
    Profile as ProfileType,
  } from '$lib/types/Profile';

  // Stores and data
  import { page } from '$app/stores';
  import { github, themeProps } from '$lib/config/default';

  // Assets
  import '$lib/styles/app.css';
  import '@fontsource/inter';

  // Components
  import Icon from '$lib/components/Icon.svelte';
  import NavLink from '$lib/components/NavLink.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import GithubProfile from '$lib/components/GithubProfile.svelte';
  import Profile from '$lib/components/Profile.svelte';
  import { theme as currentTheme } from '$lib/stores/theme';
  import { Theme } from '$lib/types/Theme';
  import { browser } from '$app/environment';
  import { handleSwitchTheme } from '$lib/utils';

  // Props
  export let data: {
    githubProfile: GithubProfileType;
    profile: ProfileType;
    count: number;
  };

  const { githubProfile, profile, count } = data;

  // prettier-ignore
  $: currentIcon = $currentTheme === Theme.dark 
    ? themeProps.dark.icon 
    : themeProps.light.icon;

  // prettier-ignore
  $: currentColor = $currentTheme === Theme.dark 
    ? themeProps.dark.color 
    : themeProps.light.color;

  if (browser) {
    // When the user is letting the system decide the current theme we
    // want change the it if `prefers-color-scheme` changes so the user gets immidiate feedback.
    // prettier-ignore
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if ($currentTheme === Theme.system) {
          handleSwitchTheme(Theme.system);
        }
      });
  }

  // Settings
  export const prerender = true;
</script>

<svelte:head>
  <script>
    if (
      localStorage.theme === 'DARK' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>

  <link rel="icon" href={currentIcon} />
  <meta name="theme-color" content={currentColor} />
</svelte:head>

<header class="mx-auto flex w-full items-center gap-5 py-6 md:py-10">
  <div class="md:w-96">
    <a class="text-3xl" href="/">
      <span class="text-pink-600 dark:text-green-500">/</span>emmut
    </a>
  </div>
  <div class="flex w-full">
    <div class="mx-auto flex w-full max-w-2xl items-center justify-center gap-4">
      <nav class="flex w-full flex-1 justify-center gap-6 font-semibold md:gap-20">
        <NavLink href="/">Stuff</NavLink>
        <NavLink href="/me">Me</NavLink>
        <NavLink href="/repos">Repos</NavLink>
      </nav>

      <ThemeToggle />
    </div>
  </div>
</header>

<div
  class="mx-auto flex w-full flex-1 flex-col gap-5 md:flex-row{$page.url.pathname !== '/' &&
  $page.url.pathname !== '/repos'
    ? ' flex-col-reverse'
    : ''}"
>
  <aside class="md:w-96">
    {#if $page.url.pathname === '/repos'}
      <GithubProfile {githubProfile} />
    {:else}
      <Profile {profile} />
    {/if}
  </aside>
  <div class="w-full">
    <main class="mx-auto w-full max-w-2xl">
      <slot />
    </main>
  </div>
</div>

<footer class="mx-auto mt-8 w-full pb-6">
  <a
    class="group flex cursor-pointer items-center justify-between"
    href={github}
    target="_blank"
    rel="no-referrer no-opener"
  >
    <span
      class="inline-flex items-center space-x-1 font-semibold tracking-wide dark:text-neutral-200"
    >
      <span class="group-hover:text-pink-600 dark:group-hover:text-green-500">/</span>
      <span class="">emmut</span>
    </span>

    <Icon
      class="inline-block h-5 w-5 text-pink-600 transition-all duration-100 ease-out group-hover:-rotate-180 dark:text-green-500"
      name="arrow-right"
    />
  </a>
</footer>