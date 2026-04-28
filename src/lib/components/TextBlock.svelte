<script lang="ts">
	import type { Snippet } from "svelte";

  interface Props {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    children: Snippet;
  }

  let {
    title,
    subtitle = '',
    align = 'left',
    children
  }: Props = $props();
</script>


<div class="text-block-wrapper {align === 'center' ? 'text-center' : ''}">
  <h2>{title}</h2>
  {#if subtitle != ''}
    <p class="sub-title">{subtitle}</p>
  {/if}
  {@render children()}
</div>

<style lang="postcss">
  @reference "../../app.css";

  .text-block-wrapper {
    @apply flex flex-col justify-start items-start w-full h-auto;

    h2 {
      @apply uppercase text-5xl text-turquoise font-space-grotesk font-light mb-4;
    }

  }
</style>