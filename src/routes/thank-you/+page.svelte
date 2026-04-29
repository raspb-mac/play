<script lang="ts">
  import { ArrowLink, Waves } from '$lib';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
</script>

<svelte:head>
  <title>{m.thankYou_stage_title()} | STRATECO</title>
</svelte:head>

<section class="thank-you">
  <div class="thank-you-decoration" aria-hidden="true">
    <Waves variant="hero-bg" count={9} opacity={0.18} />
  </div>
  <div class="thank-you-inner narrow-container">
    <p class="eyebrow">EINGEGANGEN</p>
    <h1 class="display-headline thank-headline">{m.thankYou_stage_title()}.</h1>
    <p class="thank-text">{m.thankYou_intro_text()}</p>
    <div class="thank-actions">
      <ArrowLink href={localizeHref('/')} reverse label="Zurück zur Startseite" size="lg" />
    </div>
  </div>
</section>

<style lang="postcss">
  @reference '../../app.css';

  .thank-you {
    @apply relative flex items-center;
    min-height: 80vh;
    padding-top: calc(var(--header-h) + 4rem);
    padding-bottom: 4rem;
    overflow: hidden;
  }

  .thank-you-decoration {
    @apply absolute inset-0 pointer-events-none;
  }

  .thank-you-inner {
    @apply relative;
  }

  .thank-headline {
    margin: 1.5rem 0 1.5rem;
    max-width: 18ch;
  }

  .thank-text {
    font-size: clamp(1rem, 0.875rem + 0.5vw, 1.25rem);
    line-height: 1.6;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.78);
    max-width: 36rem;
    margin: 0 0 2.5rem;
  }
  :global(html[data-theme='light']) .thank-text {
    color: rgba(10, 21, 23, 0.78);
  }

  .thank-actions {
    margin-top: 1rem;
  }
</style>
