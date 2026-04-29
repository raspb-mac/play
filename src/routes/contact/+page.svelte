<script lang="ts">
  import { Stage, Section, Waves, ArrowLink, site } from '$lib';
  import { m } from '$lib/paraglide/messages';

  let name = $state('');
  let email = $state('');
  let topic = $state('');
  let message = $state('');
  let submitted = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
  }
</script>

<svelte:head>
  <title>{m.contact_stage_title()} | STRATECO</title>
  <meta name="description" content={m.contact_intro_text()} />
</svelte:head>

<Stage
  eyebrow={m.contact_intro_eyebrow()}
  title={m.contact_stage_title()}
  breadcrumb={[{ label: m.contact_stage_breadcrumb() }]}
  intro={m.contact_intro_text()}
/>

<Section spacing="lg" container="wide" accent>
  <div class="contact-grid">
    <div class="contact-col">
      <p class="eyebrow">DIREKT</p>
      <h3 class="contact-headline">{m.contact_intro_headline()}</h3>
      <ul class="contact-list">
        <li>
          <span class="key">E-Mail</span>
          <a class="value" href="mailto:{site.email}">{site.email}</a>
        </li>
        <li>
          <span class="key">Telefon</span>
          <span class="value">{site.phone}</span>
        </li>
        <li>
          <span class="key">Adresse</span>
          <address class="value">
            {site.legalName}<br />
            {site.address.street}<br />
            {site.address.zip} {site.address.city}<br />
            {site.address.country}
          </address>
        </li>
      </ul>
    </div>

    <div class="contact-col">
      {#if submitted}
        <div class="success-box">
          <p class="eyebrow">Eingegangen</p>
          <h3 class="contact-headline">Danke für Ihre Nachricht.</h3>
          <p class="success-text">
            Wir melden uns innerhalb der nächsten 48 Stunden — diskret und persönlich.
          </p>
        </div>
      {:else}
        <form class="contact-form" onsubmit={handleSubmit}>
          <p class="eyebrow form-eyebrow">SCHREIBEN SIE UNS</p>
          <div class="form-row">
            <label class="form-field">
              <span class="form-label">Name</span>
              <input type="text" bind:value={name} required placeholder="Ihr Name" />
            </label>
            <label class="form-field">
              <span class="form-label">E-Mail</span>
              <input type="email" bind:value={email} required placeholder="ihre@adresse.de" />
            </label>
          </div>
          <label class="form-field">
            <span class="form-label">Anliegen</span>
            <input type="text" bind:value={topic} placeholder="z. B. Strategie-Review" />
          </label>
          <label class="form-field">
            <span class="form-label">Nachricht</span>
            <textarea rows="5" bind:value={message} required placeholder="Worum geht es?"></textarea>
          </label>
          <div class="form-actions">
            <button type="submit" class="form-submit">
              <span>Senden</span>
              <svg viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0 6 L 22 6 M 16 1 L 22 6 L 16 11" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';

  .contact-grid {
    @apply grid gap-12 items-start;
    grid-template-columns: 1fr;
  }
  @media (min-width: 900px) {
    .contact-grid { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr); gap: 5rem; }
  }

  .contact-headline {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    line-height: 1.1;
    font-size: clamp(1.875rem, 1.25rem + 2.4vw, 2.75rem);
    color: var(--white);
    margin: 1rem 0 2rem;
  }
  :global(html[data-theme='light']) .contact-headline {
    color: var(--ink-3);
  }

  .contact-list {
    @apply flex flex-col list-none p-0 m-0;
  }

  .contact-list li {
    @apply grid items-baseline gap-2;
    grid-template-columns: 1fr;
    padding-block: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .contact-list li:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  :global(html[data-theme='light']) .contact-list li {
    border-top: 1px solid rgba(10, 21, 23, 0.1);
  }
  :global(html[data-theme='light']) .contact-list li:last-child {
    border-bottom: 1px solid rgba(10, 21, 23, 0.1);
  }

  @media (min-width: 600px) {
    .contact-list li { grid-template-columns: 7rem 1fr; gap: 1.5rem; }
  }

  .key {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    font-weight: 500;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
  :global(html[data-theme='light']) .key {
    color: rgba(10, 21, 23, 0.55);
  }

  .value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.0625rem;
    line-height: 1.55;
    font-weight: 400;
    color: var(--white);
    font-style: normal;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  :global(html[data-theme='light']) .value {
    color: var(--ink-3);
  }

  a.value:hover {
    color: var(--brand-turquoise);
  }

  /* Form */
  .contact-form {
    @apply flex flex-col gap-6;
  }

  .form-eyebrow {
    margin: 0;
  }

  .form-row {
    @apply grid gap-6;
    grid-template-columns: 1fr;
  }
  @media (min-width: 600px) {
    .form-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  .form-field {
    @apply flex flex-col gap-2;
  }

  .form-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    font-weight: 500;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
  :global(html[data-theme='light']) .form-label {
    color: rgba(10, 21, 23, 0.55);
  }

  .form-field input,
  .form-field textarea {
    @apply w-full bg-transparent;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--white);
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    padding: 0.75rem 0;
    transition: border-color 0.3s ease;
  }
  :global(html[data-theme='light']) .form-field input,
  :global(html[data-theme='light']) .form-field textarea {
    color: var(--ink-3);
    border-bottom-color: rgba(10, 21, 23, 0.18);
  }

  .form-field input:focus,
  .form-field textarea:focus {
    outline: none;
    border-bottom-color: var(--brand-turquoise);
  }

  .form-field textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-actions {
    margin-top: 1rem;
  }

  .form-submit {
    @apply inline-flex items-center gap-3 cursor-pointer bg-transparent;
    border: 1px solid rgba(96, 207, 190, 0.5);
    padding: 0.875rem 1.75rem;
    color: var(--brand-turquoise);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.875rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    transition: var(--t-base);
  }
  .form-submit:hover {
    background: rgba(96, 207, 190, 0.08);
    border-color: var(--brand-turquoise);
    color: var(--brand-turquoise-light);
  }
  .form-submit svg {
    width: 22px;
    height: 10px;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .form-submit:hover svg {
    transform: translateX(4px);
  }

  .success-box {
    @apply flex flex-col gap-2;
    padding-block: 1rem;
  }

  .success-text {
    font-size: 1.0625rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.78);
  }
  :global(html[data-theme='light']) .success-text {
    color: rgba(10, 21, 23, 0.78);
  }
</style>
