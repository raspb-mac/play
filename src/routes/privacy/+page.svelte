<script lang="ts">
  import { Stage, Section, site } from '$lib';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.privacy_stage_title()} | STRATECO</title>
</svelte:head>

<Stage
  title={m.privacy_stage_title()}
  breadcrumb={[{ label: m.privacy_stage_title() }]}
  intro={m.privacy_intro_text()}
/>

<Section spacing="lg" container="content">
  <div class="legal editorial">
    <h3>Verantwortlicher</h3>
    <p>
      {site.legalName}<br />
      {site.address.street}<br />
      {site.address.zip} {site.address.city}<br />
      E-Mail: <a href="mailto:{site.email}">{site.email}</a>
    </p>

    <h3>Erhebung und Verarbeitung personenbezogener Daten</h3>
    <p>
      Wir verarbeiten Ihre Daten ausschließlich auf Grundlage gesetzlicher Bestimmungen (DSGVO,
      BDSG) und nur, soweit dies für die Bereitstellung unserer Webseite und unserer Leistungen
      erforderlich ist.
    </p>

    <h3>Server-Logfiles</h3>
    <p>
      Beim Besuch dieser Webseite werden anonymisierte Zugriffsdaten in Server-Logfiles
      gespeichert. Diese werden nicht mit personenbezogenen Daten zusammengeführt.
    </p>

    <h3>Kontaktaufnahme</h3>
    <p>
      Wenn Sie per E-Mail oder Kontaktformular Anfragen an uns richten, werden Ihre Angaben für
      die Bearbeitung der Anfrage und für mögliche Anschlussfragen gespeichert.
    </p>

    <h3>Ihre Rechte</h3>
    <p>
      Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der
      Verarbeitung, Datenübertragbarkeit und Widerspruch zu. Wenden Sie sich dazu bitte an
      <a href="mailto:{site.email}">{site.email}</a>.
    </p>

    <p class="muted">Stand: April 2026</p>
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

  .muted {
    margin-top: 3rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.45);
  }
  :global(html[data-theme='light']) .muted {
    color: rgba(10, 21, 23, 0.5);
  }
</style>
