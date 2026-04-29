<script lang="ts">
  import type { Snippet } from 'svelte';
  import RevealOnScroll from './RevealOnScroll.svelte';

  interface Props {
    image: string;
    imageAlt?: string;
    category?: string;
    headline: string;
    imagePosition?: 'left' | 'right';
    /** Visual ratio of image vs text column. */
    split?: 'balanced' | 'image-heavy' | 'text-heavy';
    /** Watermark word anchored to the image; sits 50/50 over the image's bottom edge. */
    ghost?: string;
    children?: Snippet;
    /** Optional after-content slot (e.g. for an ArrowLink). */
    actions?: Snippet;
    /** Image aspect ratio class. */
    ratio?: '4/3' | '3/2' | '5/4' | '1/1' | '16/10' | 'auto';
    class?: string;
  }

  let {
    image,
    imageAlt = '',
    category,
    headline,
    imagePosition = 'left',
    split = 'balanced',
    ghost,
    children,
    actions,
    ratio = '4/3',
    class: className = ''
  }: Props = $props();

  // Text slides in from the side OPPOSITE to where the image sits.
  // image left → text right column → text slides from further right (direction='right')
  // image right → text left column  → text slides from further left  (direction='left')
  const textDirection = $derived(imagePosition === 'left' ? 'right' : 'left');
</script>

<div
  class="image-text image-text--{imagePosition} image-text--{split} {className}"
>
  <RevealOnScroll class="image-text-figure-wrap" duration={1100}>
    <figure class="image-text-figure" data-ratio={ratio}>
      <img src={image} alt={imageAlt} loading="lazy" />
      {#if ghost}
        <span
          class="ghost-word"
          class:ghost-word--left={imagePosition === 'left'}
          class:ghost-word--right={imagePosition === 'right'}
          aria-hidden="true"
        >{ghost}</span>
      {/if}
    </figure>
  </RevealOnScroll>

  <RevealOnScroll
    class="image-text-content"
    direction={textDirection}
    distance={80}
    duration={1100}
    delay={120}
  >
    {#if category}
      <p class="eyebrow image-text-category">{category}</p>
    {/if}
    <h3 class="image-text-headline">{headline}</h3>
    {#if children}
      <div class="image-text-body editorial">
        {@render children()}
      </div>
    {/if}
    {#if actions}
      <div class="image-text-actions">
        {@render actions()}
      </div>
    {/if}
  </RevealOnScroll>
</div>

<style lang="postcss">
  @reference '../../app.css';

  .image-text {
    @apply relative grid items-center gap-10;
    grid-template-columns: 1fr;
  }

  /* Mobile: ensure enough room below the figure for the ghost half that
     hangs out of the image without bleeding into the text content. */
  @media (max-width: 899px) {
    .image-text {
      gap: clamp(3rem, 2rem + 4vw, 4.5rem);
    }
  }

  @media (min-width: 900px) {
    .image-text--balanced {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: clamp(2.5rem, 1rem + 4vw, 5.5rem);
    }
    .image-text--image-heavy {
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
      gap: clamp(2.5rem, 1rem + 4vw, 5.5rem);
    }
    .image-text--text-heavy {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
      gap: clamp(2.5rem, 1rem + 4vw, 5.5rem);
    }
    .image-text--right :global(.image-text-figure-wrap) { order: 2; }
    .image-text--right :global(.image-text-content)     { order: 1; }
  }

  :global(.image-text-figure-wrap) {
    @apply relative;
  }

  /* The figure carries the image AND the ghost word. The ghost is positioned
     relative to the figure so it always hangs from the image edge, not from
     the column. overflow:visible lets the ghost extend past the image. */
  .image-text-figure {
    @apply relative m-0;
    background: linear-gradient(168deg, var(--ink-2) 30%, var(--brand-teal) 150%);
    border-radius: 6px;
    box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.6);
    overflow: visible;
  }

  :global(html[data-theme='light']) .image-text-figure {
    box-shadow: 0 24px 60px -30px rgba(10, 21, 23, 0.25);
  }

  /* Inner image — clipped to figure with rounded corners. */
  .image-text-figure[data-ratio='4/3']  { aspect-ratio: 4 / 3; }
  .image-text-figure[data-ratio='3/2']  { aspect-ratio: 3 / 2; }
  .image-text-figure[data-ratio='5/4']  { aspect-ratio: 5 / 4; }
  .image-text-figure[data-ratio='1/1']  { aspect-ratio: 1 / 1; }
  .image-text-figure[data-ratio='16/10']{ aspect-ratio: 16 / 10; }

  .image-text-figure img {
    @apply absolute inset-0 w-full h-full;
    object-fit: cover;
    object-position: center;
    border-radius: 6px;
    filter: brightness(0.94) contrast(1.04) saturate(0.95);
  }

  :global(html[data-theme='light']) .image-text-figure img {
    filter: none;
  }

  /* Ghost word — anchored to the image, 50/50 over the bottom edge.
     Opaque (no transparent tail), uses a subtle two-tone gradient between
     a brighter and a deeper turquoise. */
  .ghost-word {
    @apply absolute pointer-events-none select-none;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    line-height: 0.9;
    /* Smaller on mobile so the lower half fits comfortably in the gap to
       the text content below — never overlapping it. */
    font-size: clamp(2.25rem, 1.4rem + 4vw, 5.25rem);
    bottom: 5px;
    z-index: 3;
    transform: translateY(50%);
    background-image: linear-gradient(180deg, var(--brand-turquoise-light) 0%, var(--brand-turquoise-dark) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-stroke: 1px rgba(96, 207, 190, 0.35);
    /* Soft glow so it reads as ‘watermark’ rather than competing with body type. */
    text-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    white-space: nowrap;
  }

  :global(html[data-theme='light']) .ghost-word {
    background-image: linear-gradient(180deg, var(--brand-turquoise-light) 0%, var(--brand-turquoise-dark) 100%);
     -webkit-text-stroke: 1px rgba(42, 98, 98, 0.35);
    text-shadow: 0 18px 40px rgba(0, 0, 0, 0.20);
  }

  .ghost-word--left {
    left: 3%;
    text-align: left;
  }

  .ghost-word--right {
    right: 3%;
    text-align: right;
  }

  /* Mobile constraints: keep the ghost size predictable enough so its lower
     half always fits within the image-to-content gap above. */
  @media (max-width: 899px) {
    .ghost-word {
      font-size: clamp(2rem, 1.1rem + 4.5vw, 2.75rem);
    }
  }

  :global(.image-text-content) {
    @apply relative;
  }

  .image-text-category {
    margin-bottom: 1rem;
  }

  .image-text-headline {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    line-height: 1.1;
    font-size: clamp(1.625rem, 1.1rem + 1.6vw, 2.625rem);
    letter-spacing: -0.01em;
    margin: 0 0 1.25rem;
    color: var(--white);
  }

  :global(html[data-theme='light']) .image-text-headline {
    color: var(--ink-3);
  }

  .image-text-body {
    margin-top: 0.5rem;
  }

  .image-text-actions {
    margin-top: 1.75rem;
  }
</style>
