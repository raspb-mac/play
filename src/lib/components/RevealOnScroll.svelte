<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';

  type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

  interface Props {
    children: Snippet;
    threshold?: number;
    rootMargin?: string;
    stagger?: boolean;
    once?: boolean;
    /**
     * Direction the content slides FROM as it enters view.
     * - 'up'    (default): translates 24px down, settles to 0
     * - 'left'/'right':    translates 80px from outside that side
     * - 'none':            opacity only
     */
    direction?: Direction;
    /** Slide distance (px) — used for left/right/up/down. */
    distance?: number;
    /** Animation duration in ms */
    duration?: number;
    /** Delay before starting (ms) */
    delay?: number;
    as?: 'div' | 'section' | 'article' | 'header' | 'footer';
    class?: string;
  }

  let {
    children,
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
    stagger = false,
    once = true,
    direction = 'up',
    distance = 24,
    duration = 900,
    delay = 0,
    as = 'div',
    class: className = ''
  }: Props = $props();

  let el = $state<HTMLElement | null>(null);
  let visible = $state(false);

  onMount(() => {
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      visible = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            visible = false;
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });

  const offset = $derived.by(() => {
    if (direction === 'up') return `0, ${distance}px`;
    if (direction === 'down') return `0, -${distance}px`;
    if (direction === 'left') return `-${distance}px, 0`;
    if (direction === 'right') return `${distance}px, 0`;
    return '0, 0';
  });
</script>

<svelte:element
  this={as}
  bind:this={el}
  class="reveal-root {stagger ? 'reveal-stagger' : 'reveal-single'} {visible ? 'is-visible' : ''} {className}"
  style="--rv-offset: translate({offset}); --rv-duration: {duration}ms; --rv-delay: {delay}ms;"
>
  {@render children()}
</svelte:element>

<style lang="postcss">
  @reference '../../app.css';

  .reveal-root.reveal-single {
    opacity: 0;
    transform: var(--rv-offset);
    transition: opacity var(--rv-duration) cubic-bezier(0.22, 1, 0.36, 1) var(--rv-delay),
                transform var(--rv-duration) cubic-bezier(0.22, 1, 0.36, 1) var(--rv-delay);
    will-change: opacity, transform;
  }

  .reveal-root.reveal-single.is-visible {
    opacity: 1;
    transform: translate(0, 0);
  }

  .reveal-root.reveal-stagger > :global(*) {
    opacity: 0;
    transform: var(--rv-offset);
    transition: opacity var(--rv-duration) cubic-bezier(0.22, 1, 0.36, 1),
                transform var(--rv-duration) cubic-bezier(0.22, 1, 0.36, 1);
  }

  .reveal-root.reveal-stagger.is-visible > :global(*:nth-child(1)) { transition-delay: 0ms;   opacity: 1; transform: translate(0, 0); }
  .reveal-root.reveal-stagger.is-visible > :global(*:nth-child(2)) { transition-delay: 90ms;  opacity: 1; transform: translate(0, 0); }
  .reveal-root.reveal-stagger.is-visible > :global(*:nth-child(3)) { transition-delay: 180ms; opacity: 1; transform: translate(0, 0); }
  .reveal-root.reveal-stagger.is-visible > :global(*:nth-child(4)) { transition-delay: 270ms; opacity: 1; transform: translate(0, 0); }
  .reveal-root.reveal-stagger.is-visible > :global(*:nth-child(5)) { transition-delay: 360ms; opacity: 1; transform: translate(0, 0); }
  .reveal-root.reveal-stagger.is-visible > :global(*:nth-child(6)) { transition-delay: 450ms; opacity: 1; transform: translate(0, 0); }

  @media (prefers-reduced-motion: reduce) {
    .reveal-root,
    .reveal-root.reveal-stagger > :global(*) {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
</style>
