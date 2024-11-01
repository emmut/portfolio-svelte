<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  interface Props {
    toggled: boolean;
  }

  const { toggled = false, ...propsRest }: Props = $props();
  let toggledState = $state(toggled);

  const dispatch = createEventDispatcher();

  function handleClick() {
    toggledState = !toggledState;

    dispatch('toggled', {
      on: toggled,
    });
  }
</script>

<button
  class="
    focus-ring-2 relative box-content inline-block w-14 cursor-pointer rounded-full border-2 bg-origin-border focus:ring-blue-600
    {toggledState
    ? 'border-pink-700 bg-pink-700 dark:border-green-400 dark:bg-green-400'
    : 'border-neutral-300 bg-neutral-300'}
  "
  onclick={handleClick}
  {...propsRest}
>
  <div class="h-7 w-7 rounded-full bg-neutral-50 {toggledState ? 'translate-x-full' : ''}">
    <span class="sr-only">Toggle</span>
  </div>
</button>
