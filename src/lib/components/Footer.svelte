<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';
  import Waves from './Waves.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import logoUrl from '$images/strateco-logo.png';
  import { site } from '$lib';

  const year = new Date().getFullYear();

  function goLocalized(href: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goto(resolve(localizeHref(href as any) as any));
  }

  function backToTop() {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const primaryLinks = $derived([
    { href: '/about-us', label: m.menu_aboutUs() },
    { href: '/expertise', label: m.menu_expertise() },
    { href: '/insights', label: m.menu_insights() },
    { href: '/contact', label: m.menu_contact() }
  ]);

  const legalLinks = $derived([
    { href: '/imprint', label: m.footer_legal_imprint() },
    { href: '/privacy', label: m.footer_legal_privacy() }
  ]);
</script>

<footer class="site-footer">
  <div class="footer-decoration" aria-hidden="true">
    <Waves variant="right-accent" count={16} opacity={0.4} />
  </div>

  <div class="footer-inner">
    <div class="footer-top">
      <button
        type="button"
        class="back-to-top"
        onclick={backToTop}
        aria-label="Back to top"
      >
        <span class="bt-label">Back to top</span>
        <span class="bt-arrow" aria-hidden="true">
          <svg viewBox="0 0 12 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 22 L 6 2 M 1 8 L 6 2 L 11 8" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
    </div>

    <div class="footer-grid">
      <div class="footer-brand">
        <button
          type="button"
          class="footer-logo-btn"
          onclick={() => goLocalized('/')}
          aria-label="STRATECO"
        >
          <img src={logoUrl} alt="STRATECO" class="footer-logo" />
        </button>
        <p class="footer-tagline">{m.brand_tagline()}.</p>
      </div>

      <nav class="footer-col" aria-label="Primary footer">
        <p class="col-label">{m.footer_links_company()}</p>
        <ul>
          {#each primaryLinks as link (link.href)}
            <li>
              <button type="button" onclick={() => goLocalized(link.href)}>{link.label}</button>
            </li>
          {/each}
        </ul>
      </nav>

      <nav class="footer-col" aria-label="Legal">
        <p class="col-label">Legal</p>
        <ul>
          {#each legalLinks as link (link.href)}
            <li>
              <button type="button" onclick={() => goLocalized(link.href)}>{link.label}</button>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="footer-col">
        <p class="col-label">Office</p>
        <address class="address">
          {site.legalName}<br />
          {site.address.street}<br />
          {site.address.zip} {site.address.city}<br />
          <a href="mailto:{site.email}">{site.email}</a>
        </address>
      </div>

      <div class="footer-col footer-tools">
        <p class="col-label">Settings</p>
        <div class="tools-row">
          <LanguageSwitcher />
        </div>
        <div class="tools-row">
          <ThemeToggle />
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright">{m.footer_copyright({ year })}</p>
    </div>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';

  .site-footer {
    @apply relative mt-auto;
    padding-top: clamp(3rem, 1.5rem + 4vw, 5rem);
    padding-bottom: clamp(2.5rem, 1rem + 4vw, 5rem);
    overflow: hidden;
  }

  .footer-decoration {
    @apply absolute inset-y-0 right-0 pointer-events-none;
    width: clamp(280px, 35vw, 560px);
  }

  .footer-inner {
    @apply relative;
    width: var(--base-width);
    max-width: var(--max-page);
    margin-inline: auto;
  }

  /* Back-to-top top row */
  .footer-top {
    @apply flex items-center justify-end mb-12 pb-8;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  :global(html[data-theme='light']) .footer-top {
    border-bottom-color: rgba(10, 21, 23, 0.1);
  }

  .back-to-top {
    @apply inline-flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0;
    color: var(--brand-turquoise);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
  .back-to-top:hover { color: var(--brand-turquoise-light); }

  .bt-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(96, 207, 190, 0.4);
    border-radius: 999px;
    transition: var(--t-base);
  }
  .back-to-top:hover .bt-arrow {
    border-color: var(--brand-turquoise);
    transform: translateY(-2px);
  }
  .bt-arrow svg {
    width: 10px;
    height: 18px;
  }

  /* Brand block */
  .footer-brand {
    @apply flex flex-col gap-4 items-start;
  }

  .footer-logo-btn {
    @apply bg-transparent border-0 p-0 cursor-pointer inline-flex;
  }

  .footer-logo {
    height: 36px;
    width: auto;
    filter: brightness(1.6) contrast(1.1);
  }
  :global(html[data-theme='light']) .footer-logo {
    filter: brightness(0.15) contrast(1.2);
  }

  .footer-tagline {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.55);
    max-width: 18rem;
    margin: 0;
  }
  :global(html[data-theme='light']) .footer-tagline {
    color: rgba(10, 21, 23, 0.6);
  }

  /* Grid */
  .footer-grid {
    @apply grid gap-10 mb-14;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 640px) {
    .footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1024px) {
    .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1.2fr 1fr; gap: 3rem; }
  }

  .col-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.42);
    margin: 0 0 1.25rem;
  }
  :global(html[data-theme='light']) .col-label {
    color: rgba(10, 21, 23, 0.5);
  }

  .footer-col ul {
    @apply flex flex-col gap-3 list-none p-0 m-0;
  }
  .footer-col li {
    @apply m-0 p-0;
  }

  .footer-col button,
  .footer-col a {
    @apply bg-transparent border-0 cursor-pointer p-0 text-left;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9375rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.78);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  :global(html[data-theme='light']) .footer-col button,
  :global(html[data-theme='light']) .footer-col a {
    color: rgba(10, 21, 23, 0.78);
  }

  .footer-col button:hover,
  .footer-col a:hover {
    color: var(--brand-turquoise);
  }

  .address {
    font-family: 'Space Grotesk', sans-serif;
    font-style: normal;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
  }
  :global(html[data-theme='light']) .address {
    color: rgba(10, 21, 23, 0.7);
  }
  .address a:hover { color: var(--brand-turquoise); }

  .footer-tools .tools-row {
    @apply mb-3;
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 24px;
  }
  :global(html[data-theme='light']) .footer-bottom {
    border-top-color: rgba(10, 21, 23, 0.08);
  }

  .copyright {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }
  :global(html[data-theme='light']) .copyright {
    color: rgba(10, 21, 23, 0.45);
  }
</style>
