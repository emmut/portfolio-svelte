<script>
  import { createEventDispatcher } from 'svelte';
  export let toggled = false;

  const dispatch = createEventDispatcher();

  function handleClick() {
    toggled = !toggled;

    dispatch('toggled', {
      on: toggled,
    });
  }
</script>

<button
  class="
    focus-ring-2 relative box-content inline-block w-14 cursor-pointer rounded-full border-2 bg-origin-border focus:ring-blue-600
    {toggled
    ? 'border-pink-700 bg-pink-700 dark:border-green-400 dark:bg-green-400'
    : 'border-neutral-300 bg-neutral-300'}
  "
  on:click={handleClick}
  {...$$props}
>
  <div class="h-7 w-7 rounded-full bg-neutral-50 {toggled ? 'translate-x-full' : ''}" />
</button>
