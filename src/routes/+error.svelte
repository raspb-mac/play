<script lang="ts">
  import { page } from '$app/state';
  import { ArrowLink, Waves } from '$lib';
  import { localizeHref } from '$lib/paraglide/runtime';
</script>

<svelte:head>
  <title>Error {page.status} | STRATECO</title>
</svelte:head>

<section class="error-stage">
  <div class="error-decoration" aria-hidden="true">
    <Waves variant="hero-bg" count={10} opacity={0.18} />
  </div>
  <div class="error-inner narrow-container">
    <p class="eyebrow">FEHLER</p>
    <h1 class="error-code">{page.status}</h1>
    <p class="error-message">{page.error?.message ?? 'Etwas ist schiefgelaufen.'}</p>
    <p class="error-text">
      {#if page.status === 404}
        Die angeforderte Seite konnte nicht gefunden werden.
      {:else}
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.
      {/if}
    </p>
    <div class="error-actions">
      <ArrowLink href={localizeHref('/')} reverse label="Zur Startseite" />
      <ArrowLink href={localizeHref('/contact')} label="Kontakt aufnehmen" tone="ghost" />
    </div>
  </div>
</section>

<style lang="postcss">
  @reference '../app.css';

  .error-stage {
    @apply relative flex items-center;
    min-height: 80vh;
    padding-top: calc(var(--header-h) + 4rem);
    padding-bottom: 4rem;
    overflow: hidden;
  }

  .error-decoration {
    @apply absolute inset-0 pointer-events-none;
  }

  .error-inner {
    @apply relative;
  }

  .error-code {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 250;
    font-size: clamp(6rem, 4rem + 12vw, 16rem);
    line-height: 0.85;
    color: var(--brand-turquoise);
    margin: 1.5rem 0 1rem;
  }

  .error-message {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.5rem, 1rem + 1.6vw, 2.25rem);
    font-weight: 300;
    color: var(--white);
    margin: 0 0 1rem;
  }

  :global(html[data-theme='light']) .error-message {
    color: var(--ink-3);
  }

  .error-text {
    font-size: 1.125rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.72);
    max-width: 36rem;
    margin: 0 0 2.5rem;
  }
  :global(html[data-theme='light']) .error-text {
    color: rgba(10, 21, 23, 0.72);
  }

  .error-actions {
    @apply flex flex-wrap items-center gap-8;
  }
</style>
