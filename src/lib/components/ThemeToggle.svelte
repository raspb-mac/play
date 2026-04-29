<script lang="ts">
  import { onMount } from 'svelte';
  import { m } from '$lib/paraglide/messages';

  let theme = $state<'dark' | 'light'>('dark');

  onMount(() => {
    // Read the current theme on mount …
    const sync = () => {
      const current = document.documentElement.getAttribute('data-theme');
      theme = current === 'light' ? 'light' : 'dark';
    };
    sync();

    // … and stay in sync if any OTHER ThemeToggle instance (or external code)
    // flips data-theme on <html>. Both header + footer toggles share state
    // through this DOM attribute without needing a global store.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  });

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem('strateco-theme', next);
    } catch (e) {
      void e;
    }
    // No need to update local state here — the MutationObserver picks up
    // the attribute change and writes back to `theme`, keeping every
    // mounted toggle (header AND footer) in sync.
  }
</script>

<button
  type="button"
  class="theme-toggle"
  aria-label={m.menu_toggleTheme()}
  title={m.menu_toggleTheme()}
  aria-pressed={theme === 'light'}
  onclick={toggle}
>
  <span class="track">
    <span class="thumb" class:is-light={theme === 'light'}>
      {#if theme === 'dark'}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73A8.15 8.15 0 0 1 9.08 5.49a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05Z" fill="currentColor"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </g>
        </svg>
      {/if}
    </span>
  </span>
</button>

<style lang="postcss">
  @reference '../../app.css';

  .theme-toggle {
    @apply relative inline-flex items-center justify-center cursor-pointer bg-transparent border-0 p-0;
  }

  .track {
    @apply relative flex items-center;
    width: 44px;
    height: 22px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.03);
    transition: var(--t-base);
  }
  :global(html[data-theme='light']) .track {
    border-color: rgba(10, 21, 23, 0.25);
    background: rgba(10, 21, 23, 0.04);
  }

  .thumb {
    @apply absolute top-1/2 -translate-y-1/2 flex items-center justify-center;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    color: var(--brand-turquoise);
    background: rgba(96, 207, 190, 0.12);
    transition: left 0.32s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease, background 0.3s ease;
  }

  .thumb.is-light {
    left: calc(100% - 20px);
    color: var(--brand-orange);
    background: rgba(244, 145, 0, 0.14);
  }

  .thumb svg {
    width: 12px;
    height: 12px;
  }

  .theme-toggle:hover .track {
    border-color: var(--brand-turquoise);
  }
</style>
