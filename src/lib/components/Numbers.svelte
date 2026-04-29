<script lang="ts">
  import RevealOnScroll from './RevealOnScroll.svelte';

  export interface NumberItem {
    value: string;
    /** prefix shown smaller than the value (e.g. '€') */
    prefix?: string;
    /** suffix shown next to the value (e.g. '+', 'bn', '%') */
    suffix?: string;
    /** small text label, can include \n line breaks */
    label: string;
  }

  interface Props {
    items: NumberItem[];
    /** Optional eyebrow above the block */
    eyebrow?: string;
    /** Visual variant */
    variant?: 'rows' | 'grid';
    /** Show hairlines between rows */
    dividers?: boolean;
    class?: string;
  }

  let {
    items,
    eyebrow,
    variant = 'rows',
    dividers = true,
    class: className = ''
  }: Props = $props();
</script>

<div class="numbers numbers--{variant} {className}">
  {#if eyebrow}
    <p class="eyebrow numbers-eyebrow">{eyebrow}</p>
  {/if}

  {#if variant === 'rows'}
    <RevealOnScroll stagger={true} class="numbers-rows">
      {#each items as item, i (i)}
        <div class="num-row" class:hairline={dividers && i > 0}>
          <div class="num-value">
            {#if item.prefix}<span class="num-prefix">{item.prefix}</span>{/if}
            <span class="num-figure">{item.value}</span>
            {#if item.suffix}<span class="num-suffix">{item.suffix}</span>{/if}
          </div>
          <div class="num-label">
            <p class="stat-label">{item.label}</p>
          </div>
        </div>
      {/each}
    </RevealOnScroll>
  {:else}
    <RevealOnScroll stagger={true} class="numbers-grid">
      {#each items as item, i (i)}
        <div class="num-cell">
          <div class="num-value">
            {#if item.prefix}<span class="num-prefix">{item.prefix}</span>{/if}
            <span class="num-figure">{item.value}</span>
            {#if item.suffix}<span class="num-suffix">{item.suffix}</span>{/if}
          </div>
          <p class="stat-label">{item.label}</p>
        </div>
      {/each}
    </RevealOnScroll>
  {/if}
</div>

<style lang="postcss">
  @reference '../../app.css';

  .numbers {
    @apply relative;
    max-width: 60%;
  }

  @media (max-width: 900px) {
    .numbers {
      max-width: 100%;
    }
  }

  .numbers-eyebrow {
    @apply mb-10;
  }

  :global(.numbers-rows) {
    @apply flex flex-col;
  }

  .num-row {
    @apply grid items-end gap-6;
    grid-template-columns: 1fr;
    padding-block: clamp(1.5rem, 0.75rem + 1.5vw, 2.5rem);
  }

  @media (min-width: 768px) {
    .num-row {
      grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
      gap: clamp(2rem, 1rem + 4vw, 5rem);
    }
  }

  .num-value {
    @apply flex items-end gap-1;
    line-height: 0.85;
    color: var(--brand-turquoise);
  }

  .num-figure {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: clamp(3.5rem, 2rem + 6vw, 7.25rem);
    letter-spacing: -0.03em;
    font-feature-settings: 'tnum' 1;
    line-height: 0.85;
  }

  .num-prefix,
  .num-suffix {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: clamp(2.25rem, 1.25rem + 4vw, 5rem);
    line-height: 0.85;
    letter-spacing: -0.01em;
    color: var(--brand-turquoise-light);
  }

  .num-prefix {
    margin-right: 0.05em;
  }
  .num-suffix {
    margin-left: 0.05em;
  }

  .num-label {
    @apply flex justify-end;
  }

  .num-label .stat-label {
    color: rgba(255, 255, 255, 0.78);
    text-align: right;
    margin: 0;
  }

  :global(html[data-theme='light']) .num-label .stat-label {
    color: rgba(10, 21, 23, 0.78);
  }

  /* Grid variant */
  :global(.numbers-grid) {
    @apply grid gap-10;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 700px) {
    :global(.numbers-grid) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1024px) {
    :global(.numbers-grid) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .num-cell {
    @apply flex flex-col gap-4;
  }

  .num-cell .stat-label {
    color: rgba(255, 255, 255, 0.78);
    margin: 0;
  }

  :global(html[data-theme='light']) .num-cell .stat-label {
    color: rgba(10, 21, 23, 0.78);
  }
</style>
