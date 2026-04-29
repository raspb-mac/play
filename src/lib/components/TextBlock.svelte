<script lang="ts">
  import type { Snippet } from 'svelte';
  import RevealOnScroll from './RevealOnScroll.svelte';

  interface Props {
    eyebrow?: string;
    title?: string;
    align?: 'left' | 'center';
    /** Width preset */
    width?: 'narrow' | 'content' | 'auto';
    children: Snippet;
  }

  let {
    eyebrow,
    title,
    align = 'left',
    width = 'auto',
    children
  }: Props = $props();
</script>

<RevealOnScroll
  class="text-block text-block--{align} text-block--{width}"
>
  {#if eyebrow}
    <p class="eyebrow text-block-eyebrow">{eyebrow}</p>
  {/if}
  {#if title}
    <h3 class="section-headline text-block-title">{title}</h3>
  {/if}
  <div class="text-block-body editorial">
    {@render children()}
  </div>
</RevealOnScroll>

<style lang="postcss">
  @reference '../../app.css';

  :global(.text-block) {
    @apply flex flex-col items-start;
    gap: 1rem;
  }

  :global(.text-block--center) {
    @apply items-center text-center;
  }

  :global(.text-block--narrow) { max-width: 38rem; }
  :global(.text-block--content) { max-width: 64rem; }

  :global(.text-block--center .text-block-body p) {
    margin-inline: auto;
  }

  .text-block-eyebrow { margin: 0; }
  .text-block-title {
    margin: 0;
    color: var(--white);
  }
  :global(html[data-theme='light']) .text-block-title {
    color: var(--ink-3);
  }
  .text-block-body { margin-top: 0.5rem; }
</style>
