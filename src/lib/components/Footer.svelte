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

  /** External social channels — opened in a new tab via target="_blank". */
  const socials = [
    { name: 'LinkedIn',   href: 'https://www.linkedin.com/company/strateco-gmbh' },
    { name: 'Xing',       href: 'https://www.xing.com/companies/stratecogmbh' },
    { name: 'X (Twitter)',href: 'https://twitter.com/' },
    { name: 'RSS',        href: '/rss.xml' }
  ];
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

        <!-- Social channels — sit in the brand column so they line up
             horizontally with the navigation columns to the right. -->
        <div class="brand-social">
          <p class="brand-social-label">Folgen Sie uns</p>
          <ul class="social-list">
            {#each socials as s (s.name)}
              <li>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.name}
                  title={s.name}
                  class="social-link"
                >
                  {#if s.name === 'LinkedIn'}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.5 3h-17A.5.5 0 003 3.5v17a.5.5 0 00.5.5h17a.5.5 0 00.5-.5v-17a.5.5 0 00-.5-.5zM8.27 18.5H5.4V9.65h2.87V18.5zM6.84 8.4a1.66 1.66 0 110-3.32 1.66 1.66 0 010 3.32zM18.6 18.5h-2.87v-4.3c0-1.03-.02-2.36-1.43-2.36-1.44 0-1.66 1.12-1.66 2.28v4.38H9.77V9.65h2.75v1.21h.04a3.02 3.02 0 012.72-1.5c2.91 0 3.45 1.92 3.45 4.4v4.74z" fill="currentColor"/>
                    </svg>
                  {:else if s.name === 'Xing'}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M5.5 7h2.7l1.9 3.4-3.5 6.3H3.9l3.5-6.3L5.5 7zm14-3l-7.6 13.5-3.5-6.3 4.7-7.2H19.5z" fill="currentColor"/>
                    </svg>
                  {:else if s.name === 'X (Twitter)'}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M17.6 4h2.9l-6.3 7.2L21.5 20h-5.7l-4.5-5.9L6.1 20H3.2l6.7-7.7L3 4h5.8l4 5.4L17.6 4zm-1 14.3h1.6L7.5 5.6H5.8L16.6 18.3z" fill="currentColor"/>
                    </svg>
                  {:else if s.name === 'RSS'}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M5 5v3a11 11 0 0111 11h3A14 14 0 005 5zM5 11v3a5 5 0 015 5h3a8 8 0 00-8-8zM6.5 16.5A1.75 1.75 0 105 18.25 1.75 1.75 0 006.5 16.5z" fill="currentColor"/>
                    </svg>
                  {/if}
                </a>
              </li>
            {/each}
          </ul>
        </div>
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
      <a
        href="/admin/"
        class="admin-link"
        aria-label="Redaktion (Decap CMS)"
        title="Redaktion"
      >
        Admin
      </a>
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
    @apply relative bg-transparent border-0 cursor-pointer p-0 text-left inline-block;
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

  /* Animated underline reveal — visually matches the header nav so the
     interaction language is consistent across the page. */
  .footer-col button::after,
  .footer-col a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 1px;
    width: 100%;
    background: var(--brand-turquoise);
    transform-origin: right center;
    transform: scaleX(0);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .footer-col button:hover,
  .footer-col a:hover {
    color: var(--brand-turquoise);
  }
  .footer-col button:hover::after,
  .footer-col a:hover::after {
    transform-origin: left center;
    transform: scaleX(1);
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

  /* Social channels — sit inside the brand column, beneath the tagline,
     so they align horizontally with the start of the navigation columns. */
  .brand-social {
    margin-top: clamp(1.25rem, 0.75rem + 1vw, 2rem);
  }
  .brand-social-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.42);
    margin: 0 0 1rem;
  }
  :global(html[data-theme='light']) .brand-social-label {
    color: rgba(10, 21, 23, 0.5);
  }
  .social-list {
    @apply flex items-center gap-4 list-none p-0 m-0 flex-wrap;
  }
  .social-link {
    @apply inline-flex items-center justify-center;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(96, 207, 190, 0.22);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.78);
    transition: var(--t-base);
  }
  :global(html[data-theme='light']) .social-link {
    border-color: rgba(45, 145, 131, 0.32);
    color: rgba(10, 21, 23, 0.78);
  }
  .social-link:hover {
    color: var(--brand-turquoise);
    border-color: var(--brand-turquoise);
    transform: translateY(-2px);
  }
  .social-link svg {
    width: 18px;
    height: 18px;
  }

  .footer-bottom {
    @apply flex items-center justify-between gap-4 flex-wrap;
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

  /* Discreet admin link — kept intentionally low-contrast so it disappears for
     casual visitors but stays clickable for editors. */
  .admin-link {
    @apply inline-block bg-transparent border-0 cursor-pointer p-0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.6875rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.18);
    transition: color 0.3s ease;
  }
  :global(html[data-theme='light']) .admin-link {
    color: rgba(10, 21, 23, 0.22);
  }
  .admin-link:hover {
    color: var(--brand-turquoise);
  }
</style>
