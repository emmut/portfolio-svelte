<script lang="ts">
  import type { Theme } from '$lib/types/Theme';
  import { theme } from '$lib/stores/theme';
  import { handleSwitchTheme } from '$lib/utils';
  import Icon from './Icon.svelte';

  /** @todo make this into a enum */
  const modes: Theme[] = ['light', 'dark', 'system'];

  let index = handleSwitchTheme($theme as Theme);

  $: toggleThemeState = modes[index];

  function handleToggle() {
    index = index < 2 ? index + 1 : 0;

    toggleThemeState = modes[index];
    localStorage.theme = toggleThemeState;

    handleSwitchTheme(toggleThemeState);
  }
</script>

<span
  class="relative grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-pink-600 text-neutral-50 dark:bg-neutral-200 dark:text-gray-800"
  on:click={handleToggle}
>
  {#if toggleThemeState === 'light'}
    <Icon class="inline-block h-4 w-4 max-w-full" name="sun" />
  {/if}
  {#if toggleThemeState === 'dark'}
    <Icon class="inline-block h-4 w-4 max-w-full" name="moon" />
  {/if}
  {#if toggleThemeState === 'system'}
    <Icon class="inline-block h-4 w-4 max-w-full" name="computer" />
  {/if}
</span>
