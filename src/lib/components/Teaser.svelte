<script lang="ts">
  import RevealOnScroll from './RevealOnScroll.svelte';
  import ArrowLink from './ArrowLink.svelte';

  interface Props {
    title: string;
    text: string;
    href?: string;
    label?: string;
    badge?: string;
    /** Numeric step like '01', '02' rendered next to the title (replaces icon). */
    step?: string;
    /** Optional emoji/svg-style icon glyph (kept for back-compat). */
    icon?: string;
  }

  let { title, text, href, label = 'Mehr erfahren', badge, step, icon }: Props = $props();
</script>

<RevealOnScroll class="teaser">
  <div class="teaser-card">
    <div class="teaser-head">
      {#if step}
        <span class="teaser-step" aria-hidden="true">{step}</span>
      {:else if icon}
        <span class="teaser-icon" aria-hidden="true">{icon}</span>
      {/if}
      {#if badge}
        <span class="teaser-badge">{badge}</span>
      {/if}
    </div>
    <h3 class="teaser-title module-title">{title}</h3>
    <p class="teaser-text">{text}</p>
    {#if href}
      <div class="teaser-action">
        <ArrowLink {href} {label} size="sm" />
      </div>
    {/if}
  </div>
</RevealOnScroll>

<style lang="postcss">
  @reference '../../app.css';

  :global(.teaser) {
    height: 100%;
  }

  .teaser-card {
    @apply relative h-full flex flex-col;
    padding: clamp(1.5rem, 1rem + 1.2vw, 2.5rem);
    background: linear-gradient(168deg, rgba(19, 44, 44, 0.6) 0%, rgba(10, 21, 23, 0.4) 60%);
    border: 1px solid rgba(96, 207, 190, 0.12);
    transition: var(--t-base);
  }

  :global(html[data-theme='light']) .teaser-card {
    background: linear-gradient(168deg, rgba(255, 255, 255, 0.7) 0%, rgba(241, 241, 237, 0.4) 60%);
    border: 1px solid rgba(10, 21, 23, 0.08);
  }

  .teaser-card:hover {
    border-color: rgba(96, 207, 190, 0.45);
    transform: translateY(-2px);
  }

  .teaser-head {
    @apply flex items-center justify-between mb-6;
    min-height: 2.5rem;
  }

  .teaser-step {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    color: var(--brand-turquoise);
  }

  .teaser-icon {
    font-size: 1.5rem;
    line-height: 1;
  }

  .teaser-badge {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 4px 10px;
    color: var(--brand-turquoise);
    border: 1px solid rgba(96, 207, 190, 0.4);
  }

  .teaser-title {
    color: var(--white);
    margin: 0 0 1rem;
  }
  :global(html[data-theme='light']) .teaser-title {
    color: var(--ink-3);
  }

  .teaser-text {
    font-size: 1rem;
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.72);
    flex: 1;
    margin: 0 0 1.5rem;
  }
  :global(html[data-theme='light']) .teaser-text {
    color: rgba(10, 21, 23, 0.7);
  }

  .teaser-action { margin-top: auto; }
</style>
