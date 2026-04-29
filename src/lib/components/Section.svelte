<script lang="ts">
  import type { Snippet } from 'svelte';
  import Waves from './Waves.svelte';

  interface Props {
    eyebrow?: string;
    title?: string;
    intro?: string;
    ghost?: string;
    container?: 'content' | 'wide' | 'narrow' | 'page';
    /**
     * Padding density. Default 'lg' produces dtcp-style breathing room.
     */
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    /** Show right-edge waves accent */
    accent?: boolean;
    /** Background tone variant */
    tone?: 'transparent' | 'sunken' | 'raised';
    titleAlign?: 'left' | 'center';
    children: Snippet;
    id?: string;
    class?: string;
  }

  let {
    eyebrow,
    title,
    intro,
    ghost,
    container = 'wide',
    spacing = 'lg',
    accent = false,
    tone = 'transparent',
    titleAlign = 'left',
    children,
    id,
    class: className = ''
  }: Props = $props();

  const containerClass = $derived.by(() => {
    if (container === 'content') return 'content-container';
    if (container === 'narrow') return 'narrow-container';
    if (container === 'page') return 'page-container';
    return 'wide-container';
  });
</script>

<section {id} class="section section--{spacing} section--{tone} {className}">
  {#if accent}
    <div class="section-accent" aria-hidden="true">
      <Waves variant="right-accent" count={14} opacity={0.55} />
    </div>
  {/if}

  {#if ghost}
    <span class="ghost-heading section-ghost" aria-hidden="true">{ghost}</span>
  {/if}

  <div class="section-inner {containerClass}">
    {#if eyebrow || title || intro}
      <header class="section-head" class:is-center={titleAlign === 'center'}>
        {#if eyebrow}
          <p class="eyebrow">{eyebrow}</p>
        {/if}
        {#if title}
          <h2 class="section-headline">{title}</h2>
        {/if}
        {#if intro}
          <p class="section-intro">{intro}</p>
        {/if}
      </header>
    {/if}

    <div class="section-body">
      {@render children()}
    </div>
  </div>
</section>

<style lang="postcss">
  @reference '../../app.css';

  .section {
    @apply relative;
    padding-block: var(--space-wide);
  }
  .section--sm { padding-block: clamp(2rem, 1rem + 2vw, 3rem); }
  .section--md { padding-block: clamp(3rem, 1.5rem + 3vw, 4.5rem); }
  .section--lg { padding-block: clamp(4rem, 2rem + 5vw, 7rem); }
  .section--xl { padding-block: clamp(6rem, 3rem + 7vw, 10rem); }

  .section--sunken {
    background: linear-gradient(180deg, transparent 0%, rgba(19, 44, 44, 0.35) 50%, transparent 100%);
  }

  .section--raised {
    background: rgba(96, 207, 190, 0.03);
  }

  :global(html[data-theme='light']) .section--sunken {
    background: linear-gradient(180deg, transparent 0%, rgba(10, 21, 23, 0.04) 50%, transparent 100%);
  }
  :global(html[data-theme='light']) .section--raised {
    background: rgba(10, 21, 23, 0.025);
  }

  .section-accent {
    @apply absolute inset-y-0 right-0 pointer-events-none overflow-hidden;
    width: clamp(220px, 28vw, 480px);
  }

  .section-ghost {
    @apply absolute pointer-events-none;
    top: clamp(1rem, 0.5rem + 1vw, 1.5rem);
    left: clamp(1rem, 2vw, 2.5rem);
    z-index: 3;
    white-space: nowrap;
  }

  .section-inner {
    @apply relative;
    z-index: 1;
  }

  .section-head {
    @apply flex flex-col items-start mb-12;
    gap: 1rem;
    max-width: 60rem;
  }
  .section-head.is-center {
    @apply items-center text-center mx-auto;
  }

  .section-intro {
    font-size: clamp(1rem, 0.875rem + 0.4vw, 1.25rem);
    line-height: 1.6;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.78);
    max-width: 50rem;
    margin: 0;
  }

  :global(html[data-theme='light']) .section-intro {
    color: rgba(10, 21, 23, 0.72);
  }

  .section-body {
    @apply relative;
  }
</style>
