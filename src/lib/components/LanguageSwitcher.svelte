<script lang="ts">
  import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';

  let current = $derived(getLocale());

  function pick(l: string) {
    if (l === current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLocale(l as any);
  }
</script>

<div class="lang-switch" role="group" aria-label={m.menu_switchLanguage()}>
  {#each locales as l, i (l)}
    <button
      type="button"
      class="lang-item"
      class:active={current === l}
      aria-pressed={current === l}
      onclick={() => pick(l)}
      aria-label={l === 'de' ? m.menu_switchLanguageToGerman() : m.menu_switchLanguageToEnglish()}
    >
      {l.toUpperCase()}
    </button>
    {#if i < locales.length - 1}
      <span class="sep" aria-hidden="true">/</span>
    {/if}
  {/each}
</div>

<style lang="postcss">
  @reference '../../app.css';

  .lang-switch {
    @apply inline-flex items-center;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.18em;
    font-weight: 500;
  }

  .lang-item {
    @apply uppercase cursor-pointer bg-transparent border-0 p-0 leading-none;
    color: rgba(255, 255, 255, 0.55);
    transition: var(--t-base);
  }

  :global(html[data-theme='light']) .lang-item {
    color: rgba(10, 21, 23, 0.5);
  }

  .lang-item:hover {
    color: var(--brand-turquoise);
  }

  .lang-item.active {
    color: var(--brand-turquoise);
    cursor: default;
  }

  .sep {
    @apply mx-2 select-none;
    color: rgba(255, 255, 255, 0.25);
  }
  :global(html[data-theme='light']) .sep {
    color: rgba(10, 21, 23, 0.25);
  }
</style>
