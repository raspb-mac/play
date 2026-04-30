<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Swiper from 'swiper';
  import { Navigation, Keyboard, A11y, EffectFade } from 'swiper/modules';
  import type { Swiper as SwiperType } from 'swiper/types';
  import RevealOnScroll from './RevealOnScroll.svelte';
  import ArrowLink from './ArrowLink.svelte';
  import { m } from '$lib/paraglide/messages';

  export interface FeatureItem {
    image: string;
    category?: string;
    title: string;
    text: string;
    href?: string;
    cta?: string;
    date?: string;
  }

  interface Props {
    items: FeatureItem[];
    eyebrow?: string;
    title?: string;
    autoplay?: boolean;
  }

  let { items, eyebrow, title, autoplay = false }: Props = $props();

  let containerEl: HTMLDivElement | null = $state(null);
  let swiper: SwiperType | null = $state(null);
  let activeIndex = $state(0);
  const padded = (n: number) => String(n).padStart(2, '0');
  let totalSlides = $derived(items.length);

  onMount(() => {
    if (!containerEl) return;
    swiper = new Swiper(containerEl, {
      modules: [Navigation, Keyboard, A11y, EffectFade],
      slidesPerView: 1,
      spaceBetween: 0,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      keyboard: { enabled: true },
      autoplay: autoplay ? { delay: 6500, disableOnInteraction: true } : false,
      a11y: {
        prevSlideMessage: m.carousel_prev(),
        nextSlideMessage: m.carousel_next()
      },
      on: {
        slideChange: (s) => {
          activeIndex = s.realIndex;
        }
      }
    });
  });

  onDestroy(() => {
    swiper?.destroy(true, true);
  });

  function prev() { swiper?.slidePrev(); }
  function next() { swiper?.slideNext(); }
  function jump(i: number) { swiper?.slideTo(i); }
</script>

<RevealOnScroll class="feature-carousel">
  {#if eyebrow || title}
    <div class="fc-head">
      {#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
      {#if title}<h2 class="section-headline fc-title">{title}</h2>{/if}
    </div>
  {/if}

  <div class="fc-wrap">
    <div class="swiper" bind:this={containerEl}>
      <div class="swiper-wrapper">
        {#each items as item, i (i)}
          <div class="swiper-slide">
            <div class="fc-slide">
              <figure class="fc-figure">
                <img src={item.image} alt={item.title} loading={i === 0 ? 'eager' : 'lazy'} />
                <span class="fc-figure-veil" aria-hidden="true"></span>
              </figure>
              <div class="fc-content">
                <div class="fc-content-inner">
                  {#if item.category || item.date}
                    <p class="eyebrow fc-meta">
                      {#if item.category}<span>{item.category}</span>{/if}
                      {#if item.category && item.date}<span class="fc-meta-sep">·</span>{/if}
                      {#if item.date}<span>{item.date}</span>{/if}
                    </p>
                  {/if}
                  <h3 class="fc-headline">{item.title}</h3>
                  <p class="fc-text">{item.text}</p>
                  {#if item.href}
                    <div class="fc-cta">
                      <ArrowLink href={item.href} label={item.cta ?? m.cta_read_more()} />
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="fc-controls">
      <div class="fc-bullets" role="tablist" aria-label="Slides">
        {#each items as _, i (i)}
          <button
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`${m.carousel_next()} ${i + 1}`}
            class="fc-bullet"
            class:active={activeIndex === i}
            onclick={() => jump(i)}
          ></button>
        {/each}
      </div>

      <div class="fc-nav-row">
        <button type="button" class="fc-nav" aria-label={m.carousel_prev()} onclick={prev}>
          <svg viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M24 6 L 2 6 M 8 1 L 2 6 L 8 11" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span class="fc-count">
          <span class="fc-count-active">{padded(activeIndex + 1)}</span>
          <span class="fc-count-sep">/</span>
          <span class="fc-count-total">{padded(totalSlides)}</span>
        </span>
        <button type="button" class="fc-nav" aria-label={m.carousel_next()} onclick={next}>
          <svg viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 6 L 22 6 M 16 1 L 22 6 L 16 11" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</RevealOnScroll>

<style lang="postcss">
  @reference '../../app.css';

  :global(.feature-carousel) {
    @apply relative;
  }

  .fc-head {
    @apply mb-10;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }
  .fc-title { margin: 0.5rem 0 0; }

  .fc-wrap { @apply relative; }

  .fc-slide {
    @apply grid items-center gap-8;
    grid-template-columns: 1fr;
  }
  @media (min-width: 900px) {
    .fc-slide {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
      gap: clamp(2rem, 1rem + 4vw, 5rem);
    }
  }

  .fc-figure {
    @apply relative m-0 overflow-hidden;
    aspect-ratio: 16 / 10;
    background: linear-gradient(168deg, var(--ink-2) 0%, var(--brand-teal) 120%);
  }

  .fc-figure img {
    @apply absolute inset-0 w-full h-full;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.85) saturate(0.9);
    transition: transform 1.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Let the image breathe at full brightness on the cream background. */
  :global(html[data-theme='light']) .fc-figure img {
    filter: none;
  }

  .fc-slide:hover .fc-figure img {
    transform: scale(1.03);
  }

  .fc-figure-veil {
    @apply absolute inset-0 pointer-events-none;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%);
  }
  :global(html[data-theme='light']) .fc-figure-veil {
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 100%);
  }

  .fc-content {
    @apply relative;
  }

  .fc-content-inner {
    max-width: 38rem;
  }

  .fc-meta {
    @apply mb-4 inline-flex items-center gap-3;
  }
  .fc-meta-sep { opacity: 0.55; }

  .fc-headline {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    line-height: 1.1;
    font-size: clamp(1.625rem, 1.1rem + 1.6vw, 2.625rem);
    letter-spacing: -0.01em;
    margin: 0 0 1.25rem;
    color: var(--white);
  }
  :global(html[data-theme='light']) .fc-headline {
    color: var(--ink-3);
  }

  .fc-text {
    font-size: clamp(1rem, 0.875rem + 0.4vw, 1.125rem);
    line-height: 1.6;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.78);
    margin: 0 0 2rem;
  }
  :global(html[data-theme='light']) .fc-text {
    color: rgba(10, 21, 23, 0.75);
  }

  .fc-cta { margin-top: 1rem; }

  .fc-controls {
    @apply mt-10 flex items-center justify-between flex-wrap gap-6;
  }

  .fc-bullets {
    @apply inline-flex items-center gap-3;
  }

  .fc-bullet {
    @apply bg-transparent border-0 p-0 cursor-pointer block;
    width: 28px;
    height: 2px;
    background: rgba(255, 255, 255, 0.18);
    transition: background 0.3s ease, width 0.3s ease;
  }
  :global(html[data-theme='light']) .fc-bullet {
    background: rgba(10, 21, 23, 0.18);
  }
  .fc-bullet:hover { background: rgba(96, 207, 190, 0.55); }
  .fc-bullet.active {
    background: var(--brand-turquoise);
    width: 48px;
  }

  .fc-nav-row {
    @apply inline-flex items-center gap-5;
  }
  .fc-nav {
    @apply flex items-center justify-center cursor-pointer bg-transparent border-0 p-0;
    width: 44px;
    height: 22px;
    color: var(--brand-turquoise);
    transition: color 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .fc-nav:hover { color: var(--brand-turquoise-light); }
  .fc-nav svg { width: 26px; height: 12px; }
  .fc-count {
    @apply inline-flex items-center gap-2;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9375rem;
    letter-spacing: 0.18em;
    color: rgba(255, 255, 255, 0.6);
    font-feature-settings: 'tnum' 1;
    min-width: 86px;
    justify-content: center;
  }
  :global(html[data-theme='light']) .fc-count { color: rgba(10, 21, 23, 0.6); }
  .fc-count-active { color: var(--brand-turquoise); }
  .fc-count-sep { opacity: 0.5; }
</style>
