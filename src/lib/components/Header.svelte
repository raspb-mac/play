<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { fly, fade, slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import logoUrl from '$images/strateco-logo.png';
  import ThemeToggle from './ThemeToggle.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';

  interface NavChild {
    href: string;
    label: string;
    description?: string;
  }
  interface NavRoot {
    href: string;
    label: string;
    children?: NavChild[];
  }

  let mobileOpen = $state(false);
  let scrolled = $state(false);
  let activeFlyout = $state<string | null>(null);
  let mobileExpanded = $state<string | null>(null);
  let flyoutTimer: ReturnType<typeof setTimeout> | null = null;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 24;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  $effect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  });

  function close() {
    mobileOpen = false;
    mobileExpanded = null;
  }

  function nav(href: string) {
    close();
    activeFlyout = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goto(resolve(localizeHref(href as any) as any));
  }

  const navItems: NavRoot[] = $derived([
    {
      href: '/about-us',
      label: m.menu_aboutUs(),
      children: [
        { href: '/about-us/team', label: m.menu_aboutUs_team() },
        { href: '/about-us/clients', label: m.menu_aboutUs_clients() },
        { href: '/about-us/partners', label: m.menu_aboutUs_partners() },
        { href: '/about-us/careers', label: m.menu_aboutUs_careers() }
      ]
    },
    {
      href: '/expertise',
      label: m.menu_expertise(),
      children: [
        { href: '/expertise/aos', label: m.menu_expertise_aos(), description: m.menu_expertise_aos_short() },
        { href: '/expertise/finance', label: m.menu_expertise_finance(), description: m.menu_expertise_finance_short() },
        { href: '/expertise/tas', label: m.menu_expertise_tas(), description: m.menu_expertise_tas_short() },
        { href: '/expertise/ras', label: m.menu_expertise_ras(), description: m.menu_expertise_ras_short() }
      ]
    },
    {
      href: '/insights',
      label: m.menu_insights(),
      children: [
        { href: '/insights/blog', label: m.menu_insights_blog() },
        { href: '/insights/views', label: m.menu_insights_views() },
        { href: '/insights/press', label: m.menu_insights_press() }
      ]
    }
  ]);

  function isActive(key: string): boolean {
    const localized = localizeHref(key as any);
    return page.url.pathname === localized || page.url.pathname.startsWith(localized + '/');
  }

  function openFlyout(key: string) {
    if (flyoutTimer) {
      clearTimeout(flyoutTimer);
      flyoutTimer = null;
    }
    activeFlyout = key;
  }

  function scheduleClose() {
    if (flyoutTimer) clearTimeout(flyoutTimer);
    flyoutTimer = setTimeout(() => {
      activeFlyout = null;
    }, 140);
  }

  function toggleMobileExpand(key: string) {
    mobileExpanded = mobileExpanded === key ? null : key;
  }
</script>

<header class="site-header" class:is-scrolled={scrolled} class:menu-open={mobileOpen}>
  <div class="header-inner">
    <a class="logo-link" href={resolve(localizeHref('/') as '/')} aria-label="STRATECO">
      <img src={logoUrl} alt="STRATECO" class="logo-img" loading="eager" />
    </a>

    <nav class="primary-nav" aria-label="Primary">
      {#each navItems as item (item.href)}
        <div
          class="nav-root"
          class:is-open={activeFlyout === item.href}
          onmouseenter={() => openFlyout(item.href)}
          onmouseleave={scheduleClose}
          role="none"
        >
          <button
            type="button"
            class="nav-item"
            class:active={isActive(item.href)}
            onclick={() => nav(item.href)}
            onfocus={() => openFlyout(item.href)}
            aria-haspopup={item.children ? 'true' : undefined}
            aria-expanded={activeFlyout === item.href}
          >
            <span>{item.label}</span>
          </button>

          {#if item.children && activeFlyout === item.href}
            <div
              class="flyout"
              transition:fade={{ duration: 160 }}
              onmouseenter={() => openFlyout(item.href)}
              onmouseleave={scheduleClose}
              role="menu"
              tabindex="-1"
            >
              <ul class="flyout-list">
                {#each item.children as child (child.href)}
                  <li>
                    <button
                      type="button"
                      class="flyout-link"
                      onclick={() => nav(child.href)}
                      role="menuitem"
                    >
                      <span class="flyout-label">{child.label}</span>
                      {#if child.description}
                        <span class="flyout-tag">{child.description}</span>
                      {/if}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/each}
    </nav>

    <div class="header-tools">
      <LanguageSwitcher />
      <span class="tools-sep" aria-hidden="true"></span>
      <ThemeToggle />
    </div>

    <button
      class="mobile-toggle"
      type="button"
      aria-label={m.menu_open()}
      aria-expanded={mobileOpen}
      aria-controls="mobile-panel"
      onclick={() => (mobileOpen = true)}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  {#if mobileOpen}
    <div
      class="mobile-backdrop"
      transition:fade={{ duration: 220 }}
      onclick={close}
      onkeydown={(e) => e.key === 'Escape' && close()}
      role="button"
      tabindex="-1"
      aria-label={m.menu_close()}
    ></div>

    <aside
      id="mobile-panel"
      class="mobile-panel"
      transition:fly={{ x: 360, duration: 320, easing: cubicOut }}
      aria-label="Mobile navigation"
    >
      <div class="panel-head">
        <button class="close-btn" type="button" aria-label={m.menu_close()} onclick={close}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <nav class="panel-nav" aria-label="Mobile primary">
        {#each navItems as item (item.href)}
          <div class="panel-group">
            <div class="panel-row">
              <button
                type="button"
                class="panel-link"
                class:active={isActive(item.href)}
                onclick={() => nav(item.href)}
              >
                {item.label}
              </button>
              {#if item.children}
                <button
                  type="button"
                  class="panel-expand"
                  aria-expanded={mobileExpanded === item.href}
                  aria-label={`${item.label} – Untermenü`}
                  onclick={() => toggleMobileExpand(item.href)}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class:rotated={mobileExpanded === item.href}>
                    <path d="M6 9 L 12 15 L 18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </svg>
                </button>
              {/if}
            </div>
            {#if item.children && mobileExpanded === item.href}
              <ul class="panel-sublist" transition:slide={{ duration: 220 }}>
                {#each item.children as child (child.href)}
                  <li>
                    <button type="button" class="panel-sublink" onclick={() => nav(child.href)}>
                      {child.label}
                    </button>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        {/each}

      </nav>

      <div class="panel-foot">
        <ul class="panel-secondary" aria-label="Sekundäre Navigation">
          <li>
            <button type="button" class="panel-secondary-link" onclick={() => nav('/contact')}>
              {m.menu_contact()}
            </button>
          </li>
          <li>
            <button type="button" class="panel-secondary-link" onclick={() => nav('/imprint')}>
              {m.footer_legal_imprint()}
            </button>
          </li>
          <li>
            <button type="button" class="panel-secondary-link" onclick={() => nav('/privacy')}>
              {m.footer_legal_privacy()}
            </button>
          </li>
        </ul>
        <div class="panel-tools">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  {/if}
</header>

<style lang="postcss">
  @reference '../../app.css';

  .site-header {
    @apply fixed top-0 left-0 right-0 z-50 w-full;
    height: var(--header-h);
    background: transparent;
    transition: background 0.3s ease, height 0.3s ease, backdrop-filter 0.3s ease;
  }

  @media (max-width: 768px) {
    .site-header { height: var(--header-h-mobile); }
  }

  .site-header.is-scrolled {
    height: 72px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(96, 207, 190, 0.08);
  }

  :global(html[data-theme='light']) .site-header.is-scrolled {
    background: rgba(250, 250, 247, 0.78);
    border-bottom: 1px solid rgba(10, 21, 23, 0.08);
  }

  .site-header.menu-open {
    background: transparent;
    backdrop-filter: none;
  }

  .header-inner {
    @apply h-full flex items-center justify-between;
    width: var(--base-width);
    max-width: var(--max-page);
    margin-inline: auto;
  }

  .logo-link {
    @apply relative flex items-center;
    height: 100%;
  }

  .logo-img {
    height: 38px;
    width: auto;
    filter: brightness(1.6) contrast(1.1);
    transition: var(--t-base);
  }

  :global(html[data-theme='light']) .logo-img {
    filter: brightness(0.15) contrast(1.2);
  }

  /* Primary nav */
  .primary-nav {
    @apply hidden lg:flex items-center gap-9;
  }

  .nav-root {
    @apply relative;
  }

  .nav-item {
    @apply relative bg-transparent border-0 cursor-pointer p-0 select-none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.86);
    padding-block: 8px;
    transition: color 0.3s ease;
  }

  :global(html[data-theme='light']) .nav-item {
    color: rgba(10, 21, 23, 0.85);
  }

  .nav-item span {
    @apply relative inline-block;
  }

  .nav-item span::after {
    content: '';
    @apply absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0;
    background: linear-gradient(90deg, transparent 0%, var(--brand-turquoise) 50%, transparent 100%);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nav-item:hover,
  .nav-root.is-open .nav-item {
    color: var(--brand-turquoise-light);
  }

  .nav-item:hover span::after,
  .nav-root.is-open .nav-item span::after {
    @apply origin-left scale-x-100;
  }

  .nav-item.active {
    color: var(--brand-turquoise);
  }

  .nav-item.active span::after {
    @apply origin-left scale-x-100;
  }

  /* Flyout */
  .flyout {
    @apply absolute left-1/2 -translate-x-1/2;
    top: calc(100% + 12px);
    min-width: 300px;
    background: rgba(10, 21, 23, 0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(96, 207, 190, 0.14);
    box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.5);
    padding: 14px 8px;
    z-index: 60;
  }

  :global(html[data-theme='light']) .flyout {
    background: rgba(250, 250, 247, 0.96);
    border-color: rgba(10, 21, 23, 0.1);
    box-shadow: 0 20px 60px -10px rgba(10, 21, 23, 0.18);
  }

  .flyout::before {
    content: '';
    @apply absolute left-1/2 -translate-x-1/2;
    top: -6px;
    width: 12px;
    height: 12px;
    background: inherit;
    border-top: 1px solid rgba(96, 207, 190, 0.14);
    border-left: 1px solid rgba(96, 207, 190, 0.14);
    transform: translateX(-50%) rotate(45deg);
  }
  :global(html[data-theme='light']) .flyout::before {
    border-top-color: rgba(10, 21, 23, 0.1);
    border-left-color: rgba(10, 21, 23, 0.1);
  }

  .flyout-list {
    @apply list-none p-0 m-0 flex flex-col;
  }

  .flyout-link {
    @apply w-full text-left bg-transparent border-0 cursor-pointer flex items-baseline justify-between gap-4;
    padding: 12px 16px;
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.84);
    transition: color 0.3s ease, background 0.3s ease;
  }

  :global(html[data-theme='light']) .flyout-link {
    color: rgba(10, 21, 23, 0.84);
  }

  .flyout-link:hover {
    background: rgba(96, 207, 190, 0.08);
    color: var(--brand-turquoise-light);
  }

  .flyout-label {
    font-size: 0.9375rem;
    font-weight: 400;
  }

  .flyout-tag {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    color: var(--brand-turquoise);
    flex-shrink: 0;
  }

  /* Tools */
  .header-tools {
    @apply hidden lg:flex items-center gap-4;
  }

  .tools-sep {
    @apply block;
    width: 1px;
    height: 18px;
    background: rgba(255, 255, 255, 0.18);
  }

  :global(html[data-theme='light']) .tools-sep {
    background: rgba(10, 21, 23, 0.18);
  }

  .mobile-toggle {
    @apply lg:hidden flex items-center justify-center cursor-pointer bg-transparent border-0;
    width: 44px;
    height: 44px;
    color: var(--white);
    transition: color 0.3s ease;
  }

  :global(html[data-theme='light']) .mobile-toggle {
    color: var(--ink-3);
  }

  .mobile-toggle:hover {
    color: var(--brand-turquoise);
  }

  .mobile-toggle svg {
    width: 26px;
    height: 26px;
  }

  /* Mobile panel */
  .mobile-backdrop {
    @apply fixed inset-0 lg:hidden;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    z-index: 60;
  }

  .mobile-panel {
    @apply fixed top-0 right-0 lg:hidden flex flex-col;
    width: min(360px, 92vw);
    height: 100dvh;
    background: var(--ink-3);
    z-index: 70;
    border-left: 1px solid rgba(96, 207, 190, 0.16);
  }

  :global(html[data-theme='light']) .mobile-panel {
    background: #fafaf7;
    border-left-color: rgba(10, 21, 23, 0.12);
  }

  .panel-head {
    @apply flex items-center justify-end px-6 pt-6 pb-2;
  }

  .close-btn {
    @apply flex items-center justify-center cursor-pointer bg-transparent border-0;
    width: 44px;
    height: 44px;
    color: var(--white);
    transition: color 0.3s ease;
  }

  :global(html[data-theme='light']) .close-btn {
    color: var(--ink-3);
  }

  .close-btn:hover { color: var(--brand-turquoise); }

  .close-btn svg {
    width: 26px;
    height: 26px;
  }

  .panel-nav {
    @apply flex-1 flex flex-col px-6 pt-4 pb-6 overflow-y-auto gap-1;
  }

  .panel-group {
    @apply flex flex-col;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  :global(html[data-theme='light']) .panel-group {
    border-bottom-color: rgba(10, 21, 23, 0.06);
  }

  .panel-row {
    @apply flex items-center justify-between gap-2;
  }

  .panel-link {
    @apply text-left bg-transparent border-0 cursor-pointer block flex-1;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 1.2;
    color: var(--white);
    padding-block: 14px;
    transition: color 0.3s ease;
  }

  :global(html[data-theme='light']) .panel-link {
    color: var(--ink-3);
  }

  .panel-link:hover,
  .panel-link.active {
    color: var(--brand-turquoise);
  }

  .panel-expand {
    @apply flex items-center justify-center cursor-pointer bg-transparent border-0;
    width: 44px;
    height: 44px;
    color: rgba(255, 255, 255, 0.55);
    transition: color 0.3s ease;
  }
  :global(html[data-theme='light']) .panel-expand {
    color: rgba(10, 21, 23, 0.55);
  }
  .panel-expand:hover { color: var(--brand-turquoise); }
  .panel-expand svg {
    width: 22px;
    height: 22px;
    transition: transform 0.3s ease;
  }
  .panel-expand svg.rotated {
    transform: rotate(180deg);
  }

  .panel-sublist {
    @apply list-none p-0 m-0 flex flex-col;
    padding-bottom: 12px;
  }

  .panel-sublink {
    @apply w-full text-left bg-transparent border-0 cursor-pointer block;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.78);
    padding: 8px 0 8px 16px;
    border-left: 1px solid rgba(96, 207, 190, 0.18);
    transition: color 0.3s ease, border-color 0.3s ease;
  }
  :global(html[data-theme='light']) .panel-sublink {
    color: rgba(10, 21, 23, 0.78);
  }
  .panel-sublink:hover {
    color: var(--brand-turquoise);
    border-left-color: var(--brand-turquoise);
  }

  .panel-foot {
    @apply flex flex-col gap-5 px-6 py-6;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  :global(html[data-theme='light']) .panel-foot {
    border-top-color: rgba(10, 21, 23, 0.08);
  }

  .panel-secondary {
    @apply list-none p-0 m-0 flex flex-col gap-2;
  }

  .panel-secondary-link {
    @apply w-full text-left bg-transparent border-0 cursor-pointer block;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    font-size: 0.9375rem;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.7);
    padding-block: 6px;
    transition: color 0.3s ease;
  }

  :global(html[data-theme='light']) .panel-secondary-link {
    color: rgba(10, 21, 23, 0.7);
  }

  .panel-secondary-link:hover {
    color: var(--brand-turquoise);
  }

  .panel-tools {
    @apply flex items-center justify-between gap-4 pt-4;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  :global(html[data-theme='light']) .panel-tools {
    border-top-color: rgba(10, 21, 23, 0.06);
  }
</style>
