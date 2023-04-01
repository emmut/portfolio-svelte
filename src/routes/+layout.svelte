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
  import { theme } from '$lib/stores/theme';
  import { Theme } from '$lib/types/Theme';
  import { browser } from '$app/environment';
  import { determineTheme, getTheme, handleSwitchTheme } from '$lib/utils';
  import type { SiteMeta } from '$lib/types/SiteMeta';

  // Props
  export let data: {
    githubProfile: GithubProfileType;
    profile: ProfileType;
    siteMeta: SiteMeta;
  };

  const { githubProfile, profile, siteMeta } = data;

  $: showAsideLast = $page.url.pathname !== '/' && $page.url.pathname !== '/repos';

  $theme = getTheme();

  $: currentTheme = determineTheme($theme);

  // prettier-ignore
  $: currentIcon = currentTheme === Theme.dark 
    ? themeProps.dark.icon 
    : themeProps.light.icon;

  // prettier-ignore
  $: currentColor = currentTheme === Theme.dark 
    ? themeProps.dark.color 
    : themeProps.light.color;

  if (browser) {
    // When the user is letting the system decide the current theme we
    // want change the it if `prefers-color-scheme` changes so the user gets immediate feedback.
    // prettier-ignore
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if ($theme === Theme.system) {
          currentTheme = determineTheme(handleSwitchTheme(Theme.system));
        }
      });
  }
</script>

<svelte:head>
  <link rel="icon" href={currentIcon} />
  <meta name="theme-color" content={currentColor} />
  <meta name="description" content={siteMeta.description} />

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
</svelte:head>

<header
  class="mx-auto grid w-full grid-cols-[auto_1fr] gap-8 py-6 md:py-10 lg:grid-cols-[theme(width.72)_1fr] xl:gap-32"
>
  <div class="lg:w-96">
    <a class="text-3xl" href="/">
      <span class="text-pink-600 dark:text-green-500">/</span>emmut
    </a>
  </div>
  <div class="flex w-full">
    <div class="mx-auto flex w-full items-center justify-center gap-4">
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
  class="grid w-full flex-1 grid-cols-1 place-content-start gap-8 md:flex-1 lg:grid-cols-[theme(width.72)_1fr] xl:gap-32"
>
  <aside class={showAsideLast ? 'order-1 lg:order-none' : null}>
    {#if $page.url.pathname === '/repos'}
      <GithubProfile {githubProfile} />
    {:else}
      <Profile {profile} />
    {/if}
  </aside>

  <main class="h-full w-full">
    <slot />
  </main>
</div>

<footer class="mt-16 w-full pb-6">
  <a
    class="group flex cursor-pointer items-center justify-between"
    href={github}
    target="_blank"
    rel="noreferrer noopener"
  >
    <span
      class="inline-flex items-center space-x-1 font-semibold tracking-wide dark:text-neutral-200"
    >
      emmut
    </span>

    <Icon
      class="inline-block h-5 w-5 text-pink-600 transition-all duration-100 ease-out group-hover:-rotate-180 dark:text-green-500"
      name="arrow-right"
    />
  </a>
</footer>
