<script lang="ts">
  import { hexToHsl, mergeClasses } from '$lib/utils';

  export let color = '#000000';
  const defaultClasses =
    'pill inline-block rounded-full bg-gray-300 px-2 py-0.5 text-xs font-bold dark:bg-gray-700';
  const classes = mergeClasses(($$props.class as string) ?? '', defaultClasses);
</script>

<span class={classes} style:--light={hexToHsl(color).l} style:background-color={color}>
  <slot />
</span>

<style>
  /* https://css-tricks.com/switch-font-color-for-different-backgrounds-with-css/ */
  .pill {
    --threshold: 65;
    --switch: calc((var(--light) - var(--threshold)) * -100%);
    color: hsl(0, 0%, var(--switch));
  }
</style>
