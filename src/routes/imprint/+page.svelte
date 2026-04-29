<script lang="ts">
  import { Stage, Section, site } from '$lib';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.imprint_stage_title()} | STRATECO</title>
</svelte:head>

<Stage
  title={m.imprint_stage_title()}
  breadcrumb={[{ label: m.imprint_stage_title() }]}
  intro={m.imprint_intro_text()}
/>

<Section spacing="lg" container="content">
  <div class="legal editorial">
    <h3>Anbieter</h3>
    <p>
      {site.legalName}<br />
      {site.address.street}<br />
      {site.address.zip} {site.address.city}<br />
      {site.address.country}
    </p>

    <h3>Kontakt</h3>
    <p>
      Telefon: {site.phone}<br />
      Telefax: {site.fax}<br />
      E-Mail: <a href="mailto:{site.email}">{site.email}</a> · <a href="mailto:{site.emailInfo}">{site.emailInfo}</a>
    </p>

    <h3>Vertretungsberechtigte:r</h3>
    <p>Geschäftsführung (tbd)</p>

    <h3>Handelsregister</h3>
    <p>Amtsgericht Bad Homburg v. d. Höhe · HRB (tbd)</p>

    <h3>Umsatzsteuer-Identifikationsnummer</h3>
    <p>DE (tbd) (gemäß § 27 a UStG)</p>

    <h3>Verantwortlich für den Inhalt</h3>
    <p>Geschäftsführung · {site.address.street} · {site.address.zip} {site.address.city}</p>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';

  .legal h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.18em;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--brand-turquoise);
    margin: 2rem 0 0.5rem;
  }
  .legal h3:first-child { margin-top: 0; }
</style>
