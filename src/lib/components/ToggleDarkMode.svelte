<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import type { Theme } from '$lib/types/Theme';
  import { setupTheme } from '$lib/utils';

  import Icon from './Icon.svelte';

  let index = setupTheme($theme as Theme);

  const modes = ['light', 'dark', 'system'];

  function handleToggle() {
    index = index < 2 ? index + 1 : 0;

    $theme = modes[index];
    localStorage.theme = $theme;

    setupTheme($theme as Theme);
  }
</script>

<span
  class="relative grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-pink-600 text-neutral-50 dark:bg-neutral-200 dark:text-gray-800"
  on:click={handleToggle}
>
  {#if $theme === 'light'}
    <Icon class="inline-block h-4 w-4 max-w-full" name="sun" />
  {/if}
  {#if $theme === 'dark'}
    <Icon class="inline-block h-4 w-4 max-w-full" name="moon" />
  {/if}
  {#if $theme === 'system'}
    <Icon class="inline-block h-4 w-4 max-w-full" name="computer" />
  {/if}
</span>
