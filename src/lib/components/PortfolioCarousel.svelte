<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Swiper from 'swiper';
  import { Navigation, Keyboard, A11y } from 'swiper/modules';
  import type { Swiper as SwiperType } from 'swiper/types';
  import RevealOnScroll from './RevealOnScroll.svelte';
  import { m } from '$lib/paraglide/messages';

  export interface PortfolioItem {
    title: string;
    category?: string;
    image: string;
    href?: string;
  }

  interface Props {
    items: PortfolioItem[];
    eyebrow?: string;
    title?: string;
    intro?: string;
    /** Slides shown at desktop (default 3.4 to peek the 4th tile dtcp-style). */
    slidesPerView?: number;
  }

  let { items, eyebrow, title, intro, slidesPerView = 3.2 }: Props = $props();

  let containerEl: HTMLDivElement | null = $state(null);
  let swiper: SwiperType | null = $state(null);
  let activeIndex = $state(0);
  let totalSlides = $derived(items.length);

  const padded = $derived((n: number) => String(n).padStart(2, '0'));

  onMount(() => {
    if (!containerEl) return;
    swiper = new Swiper(containerEl, {
      modules: [Navigation, Keyboard, A11y],
      slidesPerView: 1.15,
      spaceBetween: 16,
      keyboard: { enabled: true },
      a11y: {
        prevSlideMessage: m.carousel_prev(),
        nextSlideMessage: m.carousel_next()
      },
      breakpoints: {
        640: { slidesPerView: 2.1, spaceBetween: 20 },
        1024: { slidesPerView: 2.6, spaceBetween: 28 },
        1280: { slidesPerView: slidesPerView, spaceBetween: 32 }
      },
      on: {
        slideChange: (s) => {
          activeIndex = s.activeIndex;
        }
      }
    });
  });

  onDestroy(() => {
    swiper?.destroy(true, true);
  });

  function prev() {
    swiper?.slidePrev();
  }
  function next() {
    swiper?.slideNext();
  }
</script>

<RevealOnScroll class="portfolio-carousel">
  <div class="pc-head">
    <div class="pc-head-text">
      {#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
      {#if title}<h2 class="section-headline pc-title">{title}</h2>{/if}
      {#if intro}<p class="pc-intro">{intro}</p>{/if}
    </div>
  </div>

  <div class="pc-wrap">
    <div class="swiper" bind:this={containerEl}>
      <div class="swiper-wrapper">
        {#each items as item, i (i)}
          <div class="swiper-slide">
            <article class="pc-card">
              {#if item.href}
                <a href={item.href} class="pc-card-link" aria-label={item.title}></a>
              {/if}
              <figure class="pc-card-figure">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span class="pc-card-veil" aria-hidden="true"></span>
              </figure>
              <div class="pc-card-meta">
                {#if item.category}
                  <p class="eyebrow pc-card-cat">{item.category}</p>
                {/if}
                <h3 class="pc-card-title">{item.title}</h3>
              </div>
            </article>
          </div>
        {/each}
      </div>
    </div>

    <div class="pc-controls" aria-hidden="false">
      <button type="button" class="pc-nav" aria-label={m.carousel_prev()} onclick={prev}>
        <svg viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 6 L 2 6 M 8 1 L 2 6 L 8 11" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="pc-count">
        <span class="pc-count-active">{padded(activeIndex + 1)}</span>
        <span class="pc-count-sep">/</span>
        <span class="pc-count-total">{padded(totalSlides)}</span>
      </span>
      <button type="button" class="pc-nav" aria-label={m.carousel_next()} onclick={next}>
        <svg viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 6 L 22 6 M 16 1 L 22 6 L 16 11" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</RevealOnScroll>

<style lang="postcss">
  @reference '../../app.css';

  :global(.portfolio-carousel) {
    @apply relative;
  }

  .pc-head {
    @apply mb-10;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .pc-head-text {
    max-width: 56rem;
  }

  .pc-title {
    margin: 0.5rem 0 0;
  }

  .pc-intro {
    margin-top: 1rem;
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.15rem);
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.72);
  }
  :global(html[data-theme='light']) .pc-intro {
    color: rgba(10, 21, 23, 0.72);
  }

  .pc-wrap {
    @apply relative;
  }

  .pc-card {
    @apply relative flex flex-col h-full;
    background: linear-gradient(168deg, rgba(19, 44, 44, 0.65) 30%, rgba(42, 98, 98, 0.55) 150%);
    border: 1px solid rgba(96, 207, 190, 0.08);
    transition: var(--t-base);
    overflow: hidden;
  }

  /* Light theme: cream surface with subtle teal tint and a darker title for
     a clean, readable contrast — sister look to Teaser/Industry/Format cards. */
  :global(html[data-theme='light']) .pc-card {
    background: linear-gradient(168deg, rgba(255, 255, 255, 0.92) 0%, rgba(241, 241, 237, 0.7) 60%);
    border: 1px solid rgba(10, 21, 23, 0.08);
    box-shadow: 0 18px 50px -28px rgba(10, 21, 23, 0.18);
  }

  .pc-card:hover {
    border-color: rgba(96, 207, 190, 0.4);
  }
  :global(html[data-theme='light']) .pc-card:hover {
    border-color: rgba(45, 145, 131, 0.45);
    box-shadow: 0 22px 60px -28px rgba(10, 21, 23, 0.28);
  }

  .pc-card-link {
    @apply absolute inset-0;
    z-index: 2;
  }

  .pc-card-figure {
    @apply relative m-0 overflow-hidden;
    aspect-ratio: 5 / 4;
    background: linear-gradient(168deg, var(--ink-2) 0%, var(--brand-teal) 120%);
  }

  .pc-card-figure img {
    @apply absolute inset-0 w-full h-full;
    object-fit: cover;
    object-position: center;
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
    filter: brightness(0.78) saturate(0.85);
  }

  /* In light theme the image sits on a bright surface — let it breathe at
     full brightness rather than dimming it. */
  :global(html[data-theme='light']) .pc-card-figure img {
    filter: none;
  }

  .pc-card:hover .pc-card-figure img {
    transform: scale(1.04);
    filter: brightness(0.95) saturate(1);
  }

  :global(html[data-theme='light']) .pc-card:hover .pc-card-figure img {
    filter: brightness(1.05) saturate(1.05);
  }

  .pc-card-veil {
    @apply absolute inset-0 pointer-events-none;
    background:
      linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%),
      linear-gradient(168deg, rgba(96,207,190,0.05) 0%, rgba(96,207,190,0) 50%);
  }
  /* Lighter veil in light theme — keeps a soft teal tint without crushing the photo. */
  :global(html[data-theme='light']) .pc-card-veil {
    background:
      linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.18) 100%),
      linear-gradient(168deg, rgba(45,145,131,0.06) 0%, rgba(45,145,131,0) 50%);
  }

  .pc-card-meta {
    @apply relative;
    padding: 1.5rem 1.75rem 1.75rem;
  }

  .pc-card-cat {
    margin: 0 0 0.625rem;
  }

  .pc-card-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    line-height: 1.25;
    font-size: clamp(1.125rem, 0.9rem + 0.6vw, 1.5rem);
    color: var(--white);
    margin: 0;
  }
  :global(html[data-theme='light']) .pc-card-title {
    color: var(--ink-3);
  }

  .pc-controls {
    @apply flex items-center gap-5 mt-10 justify-end;
  }

  .pc-nav {
    @apply flex items-center justify-center cursor-pointer bg-transparent border-0 p-0;
    width: 44px;
    height: 22px;
    color: var(--brand-turquoise);
    transition: color 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pc-nav:hover {
    color: var(--brand-turquoise-light);
    transform: translateX(2px);
  }
  .pc-nav:first-of-type:hover { transform: translateX(-2px); }
  .pc-nav svg {
    width: 26px;
    height: 12px;
  }

  .pc-count {
    @apply inline-flex items-center gap-2;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9375rem;
    letter-spacing: 0.18em;
    color: rgba(255, 255, 255, 0.6);
    font-feature-settings: 'tnum' 1;
    min-width: 86px;
    justify-content: center;
  }
  :global(html[data-theme='light']) .pc-count { color: rgba(10, 21, 23, 0.6); }
  .pc-count-active { color: var(--brand-turquoise); }
  .pc-count-sep { opacity: 0.5; }
</style>
