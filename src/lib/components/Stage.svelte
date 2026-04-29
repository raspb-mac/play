<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { localizeHref } from '$lib/paraglide/runtime';
  import Waves from './Waves.svelte';

  interface Props {
    eyebrow?: string;
    title: string;
    breadcrumb?: { label: string; href?: string }[];
    /** Optional intro paragraph */
    intro?: string;
    /** Show right-edge waves accent */
    accent?: boolean;
  }

  let { eyebrow, title, breadcrumb = [], intro, accent = true }: Props = $props();

  function go(href: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goto(resolve(localizeHref(href) as any));
  }
</script>

<section class="page-stage">
  {#if accent}
    <div class="stage-accent" aria-hidden="true">
      <Waves variant="right-accent" count={12} opacity={0.55} />
    </div>
  {/if}

  <div class="stage-inner wide-container">
    {#if breadcrumb.length}
      <nav class="crumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <button type="button" onclick={() => go('/')}>Home</button>
          </li>
          {#each breadcrumb as crumb, i (i)}
            <li aria-hidden="true" class="sep">/</li>
            <li>
              {#if crumb.href}
                <button type="button" onclick={() => go(crumb.href!)}>{crumb.label}</button>
              {:else}
                <span aria-current="page">{crumb.label}</span>
              {/if}
            </li>
          {/each}
        </ol>
      </nav>
    {/if}

    {#if eyebrow}
      <p class="eyebrow stage-eyebrow">{eyebrow}</p>
    {/if}
    <h1 class="display-headline stage-title">{title}</h1>

    {#if intro}
      <p class="stage-intro">{intro}</p>
    {/if}
  </div>
</section>

<style lang="postcss">
  @reference '../../app.css';

  .page-stage {
    @apply relative overflow-hidden;
    padding-top: calc(var(--header-h) + clamp(3rem, 1.5rem + 5vw, 7rem));
    padding-bottom: clamp(3rem, 1.5rem + 4vw, 6rem);
  }

  .stage-accent {
    @apply absolute inset-y-0 right-0 pointer-events-none;
    width: clamp(260px, 30vw, 520px);
  }

  .stage-inner {
    @apply relative;
  }

  .crumbs {
    @apply mb-10;
  }
  .crumbs ol {
    @apply list-none p-0 m-0 flex items-center flex-wrap gap-2;
  }
  .crumbs li {
    @apply m-0 p-0;
    font-size: 0.8125rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }
  :global(html[data-theme='light']) .crumbs li {
    color: rgba(10, 21, 23, 0.55);
  }

  .crumbs button {
    @apply bg-transparent border-0 cursor-pointer p-0;
    color: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    transition: color 0.3s ease;
  }
  .crumbs button:hover { color: var(--brand-turquoise); }
  .crumbs .sep { opacity: 0.55; }

  .stage-eyebrow {
    margin-bottom: 1.5rem;
  }

  .stage-title {
    margin: 0;
    max-width: 22ch;
  }

  .stage-intro {
    margin-top: 2rem;
    font-size: clamp(1rem, 0.875rem + 0.4vw, 1.25rem);
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.78);
    max-width: 50rem;
  }
  :global(html[data-theme='light']) .stage-intro {
    color: rgba(10, 21, 23, 0.72);
  }
</style>
