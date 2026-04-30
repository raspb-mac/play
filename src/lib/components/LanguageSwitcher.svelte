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
      <span class="lang-label">{l.toUpperCase()}</span>
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
    position: relative;
    display: inline-block;
    padding: 0 0 4px 0;
    margin: 0;
    background: transparent;
    border: 0;
    line-height: 1;
    text-transform: uppercase;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.55);
    transition: color 0.3s ease, font-weight 0.2s ease;
  }

  :global(html[data-theme='light']) .lang-item {
    color: rgba(10, 21, 23, 0.6);
  }

  /* Animated underline reveal — same easing as the header nav for consistency. */
  .lang-item::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background: var(--brand-turquoise);
    transform-origin: right center;
    transform: scaleX(0);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .lang-item:hover {
    color: var(--brand-turquoise);
  }
  .lang-item:hover::after {
    transform-origin: left center;
    transform: scaleX(1);
  }

  /* Active state — must also override the light-theme color rule, so the
     selectors here are made specific enough to win in either theme. */
  .lang-item.active,
  :global(html[data-theme='light']) .lang-item.active {
    color: var(--brand-turquoise);
    cursor: default;
    font-weight: 700;
  }
  .lang-item.active::after {
    transform-origin: left center;
    transform: scaleX(1);
  }

  .sep {
    margin-inline: 0.5rem;
    user-select: none;
    color: rgba(255, 255, 255, 0.25);
  }
  :global(html[data-theme='light']) .sep {
    color: rgba(10, 21, 23, 0.25);
  }
</style>
