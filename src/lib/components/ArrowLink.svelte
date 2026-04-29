<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    href?: string;
    label?: string;
    children?: Snippet;
    onclick?: (e: MouseEvent) => void;
    target?: '_self' | '_blank';
    rel?: string;
    size?: 'sm' | 'md' | 'lg';
    /** When true, the chevron appears on the LEFT (back-link style). */
    reverse?: boolean;
    /** Tone: turquoise (default), light, ghost */
    tone?: 'turquoise' | 'light' | 'ghost';
    class?: string;
  }

  let {
    href,
    label,
    children,
    onclick,
    target = '_self',
    rel,
    size = 'md',
    reverse = false,
    tone = 'turquoise',
    class: className = ''
  }: Props = $props();

  const tag = $derived(href ? 'a' : 'button');
</script>

<svelte:element
  this={tag}
  role={tag === 'a' ? 'link' : 'button'}
  {href}
  type={tag === 'button' ? 'button' : undefined}
  {target}
  {rel}
  {onclick}
  class="arrow-link arrow-link--{size} arrow-link--{tone} {reverse ? 'is-reverse' : ''} {className}"
>
  {#if reverse}
    <span class="arrow-track" aria-hidden="true">
      <span class="line"></span>
      <svg viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg" class="arrow" aria-hidden="true">
        <path d="M 7 1 L 1 6 L 7 11" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="label">{#if children}{@render children()}{:else}{label}{/if}</span>
  {:else}
    <span class="label">{#if children}{@render children()}{:else}{label}{/if}</span>
    <span class="arrow-track" aria-hidden="true">
      <span class="line"></span>
      <svg viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg" class="arrow" aria-hidden="true">
        <path d="M 1 1 L 7 6 L 1 11" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  {/if}
</svelte:element>

<style lang="postcss">
  @reference '../../app.css';

  .arrow-link {
    @apply inline-flex items-center gap-4 cursor-pointer bg-transparent border-0 p-0 select-none;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: color 0.3s ease;
    color: var(--brand-turquoise);
  }

  .arrow-link--sm { font-size: 0.875rem; }
  .arrow-link--md { font-size: 1rem; }
  .arrow-link--lg { font-size: 1.125rem; }

  .arrow-link--turquoise { color: var(--brand-turquoise); }
  .arrow-link--light { color: #ffffff; }
  .arrow-link--ghost { color: rgba(255, 255, 255, 0.6); }

  :global(html[data-theme='light']) .arrow-link--light { color: var(--ink-3); }
  :global(html[data-theme='light']) .arrow-link--ghost { color: rgba(10, 21, 23, 0.55); }

  .label {
    @apply uppercase tracking-[0.12em];
    transition: color 0.3s ease;
  }

  /* The track holds the line + chevron. Width animates as a single unit
     on hover so the chevron stays at the line's exact end — no overlap. */
  .arrow-track {
    @apply relative inline-block;
    width: 64px;
    height: 12px;
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .arrow-link--lg .arrow-track { width: 96px; height: 14px; }
  .arrow-link--sm .arrow-track { width: 44px; height: 10px; }

  /* The line — single CSS hairline. SVG has no leading line anymore. */
  .arrow-track .line {
    @apply absolute left-0;
    top: 50%;
    height: 1px;
    background: currentColor;
    /* End the line just before the chevron: chevron-width + small gap */
    width: calc(100% - 12px);
    transform: translateY(-50%);
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .arrow-link--lg .arrow-track .line { width: calc(100% - 14px); }
  .arrow-link--sm .arrow-track .line { width: calc(100% - 10px); }

  /* Chevron — pinned to the right edge of the track. */
  .arrow-track .arrow {
    @apply absolute right-0;
    top: 50%;
    width: 8px;
    height: 12px;
    transform: translateY(-50%);
    pointer-events: none;
  }
  .arrow-link--lg .arrow-track .arrow { width: 10px; height: 14px; }
  .arrow-link--sm .arrow-track .arrow { width: 6px; height: 10px; }

  /* Reverse variant — chevron on the left, line on the right side. */
  .arrow-link.is-reverse .arrow-track .line {
    left: auto;
    right: 0;
  }
  .arrow-link.is-reverse .arrow-track .arrow {
    right: auto;
    left: 0;
  }

  /* Hover: track grows; line + chevron stay perfectly aligned. */
  .arrow-link:hover .label { color: var(--brand-turquoise-light); }
  .arrow-link:hover { color: var(--brand-turquoise-light); }
  .arrow-link:hover .arrow-track { width: 80px; }
  .arrow-link--lg:hover .arrow-track { width: 116px; }
  .arrow-link--sm:hover .arrow-track { width: 56px; }

  .arrow-link:focus-visible {
    outline: 2px solid var(--brand-turquoise);
    outline-offset: 6px;
  }
</style>
