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
  class="relative grid h-7 w-7 place-items-center rounded-full bg-pink-600 text-neutral-50 dark:bg-neutral-50 dark:text-gray-800"
  on:click={handleToggle}
>
  {#if $theme === 'light'}
    <Icon class="inline-block w-4" name="sun" />
  {/if}
  {#if $theme === 'dark'}
    <Icon class="inline-block w-4" name="moon" />
  {/if}
  {#if $theme === 'system'}
    <Icon class="inline-block w-4" name="computer" />
  {/if}
</span>
