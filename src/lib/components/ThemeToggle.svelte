<script lang="ts">
  import { Theme } from '$lib/types/Theme';
  import { theme } from '$lib/stores/theme';
  import { handleSwitchTheme, translateThemeToIndex } from '$lib/utils';
  import Icon from './Icon.svelte';

  // prettier-ignore
  const modes = [
    Theme.light, 
    Theme.dark, 
    Theme.system
  ];

  let index = translateThemeToIndex($theme);

  $: toggleThemeState = handleSwitchTheme($theme);

  function handleToggle() {
    index = index < 2 ? index + 1 : 0;

    toggleThemeState = handleSwitchTheme(modes[index]);

    handleSwitchTheme(toggleThemeState);
  }
</script>

<button
  class="relative grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-pink-600 text-neutral-50 dark:bg-neutral-200 dark:text-gray-800"
  on:click={handleToggle}
  aria-label="Select theme"
>
  {#if toggleThemeState === Theme.light}
    <Icon class="inline-block h-4 w-4 max-w-full" name="sun" />
  {/if}
  {#if toggleThemeState === Theme.dark}
    <Icon class="inline-block h-4 w-4 max-w-full" name="moon" />
  {/if}
  {#if toggleThemeState === Theme.system}
    <Icon class="inline-block h-4 w-4 max-w-full" name="computer" />
  {/if}
</button>
