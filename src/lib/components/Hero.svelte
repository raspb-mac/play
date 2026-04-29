<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import glaspalast from '$images/glaspalast.jpg';
  import Waves from './Waves.svelte';

  interface Props {
    eyebrow?: string;
    titleLines?: string[];
    title?: string;
    lead?: string;
    image?: string;
    imageAlt?: string;
    children?: Snippet;
  }

  let {
    eyebrow,
    titleLines,
    title,
    lead,
    image = glaspalast,
    imageAlt = '',
    children
  }: Props = $props();

  let mounted = $state(false);
  onMount(() => {
    requestAnimationFrame(() => (mounted = true));
  });
</script>

<section class="hero">
  <div class="hero-grid">
    <div class="hero-image" class:is-mounted={mounted}>
      <img src={image} alt={imageAlt} loading="eager" fetchpriority="high" />
      <div class="image-veil" aria-hidden="true"></div>
    </div>

    <div class="hero-content" class:is-mounted={mounted}>
      <div class="hero-bg-waves" aria-hidden="true">
        <Waves variant="hero-bg" count={9} opacity={0.18} />
      </div>

      <div class="hero-text">
        {#if eyebrow}
          <p class="eyebrow hero-eyebrow">{eyebrow}</p>
        {/if}

        <h1 class="display-headline hero-title">
          {#if titleLines && titleLines.length}
            {#each titleLines as line, i (i)}
              <span class="hero-title-line" style:--ix={i}>{line}</span>
            {/each}
          {:else if title}
            {title}
          {/if}
        </h1>

        {#if lead}
          <p class="hero-lead">{lead}</p>
        {/if}

        {#if children}
          <div class="hero-extra">
            {@render children()}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  @reference '../../app.css';

  .hero {
    @apply relative w-full overflow-hidden;
    min-height: 100vh;
  }

  .hero-grid {
    @apply grid h-full;
    grid-template-columns: 1fr;
    min-height: 100vh;
  }

  @media (min-width: 900px) {
    .hero-grid {
      grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    }
  }

  .hero-image {
    @apply relative overflow-hidden;
    min-height: 60vh;
    opacity: 0;
    transform: scale(1.04);
    transition: opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1),
                transform 2.2s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hero-image.is-mounted {
    opacity: 1;
    transform: scale(1);
  }

  @media (min-width: 900px) {
    .hero-image {
      min-height: 100vh;
    }
  }

  .hero-image img {
    @apply absolute inset-0 w-full h-full;
    object-fit: cover;
    object-position: center;
  }

  .image-veil {
    @apply absolute inset-0;
    background:
      linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.55) 100%),
      linear-gradient(to right, rgba(10, 21, 23, 0.35), rgba(10, 21, 23, 0));
  }

  :global(html[data-theme='light']) .image-veil {
    background:
      linear-gradient(to bottom, rgba(10, 21, 23, 0.18) 0%, rgba(10, 21, 23, 0.06) 35%, rgba(10, 21, 23, 0.18) 100%);
  }

  .hero-content {
    @apply relative flex items-center;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 21, 23, 1) 60%);
    padding-block: 6rem;
    padding-inline: clamp(1.5rem, 1rem + 4vw, 6rem);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
  }

  .hero-content.is-mounted {
    opacity: 1;
    transform: translateY(0);
  }

  :global(html[data-theme='light']) .hero-content {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, #fafaf7 60%);
  }

  .hero-bg-waves {
    @apply absolute inset-0 pointer-events-none;
    z-index: 0;
  }

  .hero-text {
    @apply relative;
    max-width: 48rem;
    z-index: 1;
  }

  .hero-eyebrow {
    margin-bottom: 1.75rem;
    color: var(--brand-turquoise);
  }

  .hero-title {
    margin: 0;
  }

  .hero-title-line {
    display: block;
    opacity: 0;
    transform: translateY(28px);
    animation: hero-line-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(0.4s + var(--ix, 0) * 0.12s);
  }

  @keyframes hero-line-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-lead {
    margin-top: 2rem;
    font-size: clamp(1rem, 0.875rem + 0.4vw, 1.25rem);
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.82);
    max-width: 36rem;
  }

  :global(html[data-theme='light']) .hero-lead {
    color: rgba(10, 21, 23, 0.78);
  }

  .hero-extra {
    margin-top: 2.5rem;
  }
</style>
