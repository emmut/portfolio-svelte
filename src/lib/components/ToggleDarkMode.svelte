<script>
  import { theme } from '$lib/stores/theme';

  import Icon from './Icon.svelte';

  function handleToggle() {
    $theme = $theme === 'dark' ? 'light' : 'dark';
    localStorage.theme = $theme;

    if ($theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
    if ($theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if ($theme === 'system') {
      localStorage.removeItem('theme');
    }
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
