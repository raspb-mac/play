<script lang="ts">
  import {
    Stage,
    Section,
    ImageText,
    Teaser,
    ArrowLink,
    RevealOnScroll
  } from '$lib';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';

  import strategy from '$images/expertise/strategy.jpg';
  import transformation from '$images/expertise/transformation.jpg';
  import capital from '$images/expertise/capital.jpg';
  import office from '$images/team/office.jpg';

  const industries = [
    { tag: '01', label: 'Financial Institutions', text: 'Banken, Versicherer und Asset Manager — Schwerpunkte: Risikosteuerung, Reporting-Architektur, Treasury, IFRS / Basel-Anforderungen.' },
    { tag: '02', label: 'Pharma & Healthcare', text: 'Pharmazeutische Hersteller, Krankenhäuser und Versorger — Schwerpunkte: Compliance, Performance Management, Operations.' },
    { tag: '03', label: 'Telecom · Media · High Tech', text: 'Netzbetreiber, Verlage und Tech-Unternehmen — Schwerpunkte: digitale Geschäftsmodelle, Customer Analytics, Plattform-Operations.' },
    { tag: '04', label: 'Travel · Transport · Logistics', text: 'Flughäfen, Reedereien und Logistiker — Schwerpunkte: Capacity Planning, Yield Management, Service-Operations.' }
  ];
</script>

<svelte:head>
  <title>{m.expertise_stage_title()} | STRATECO</title>
  <meta name="description" content={m.expertise_intro_text()} />
</svelte:head>

<Stage
  eyebrow={m.expertise_intro_eyebrow()}
  title={m.expertise_intro_headline()}
  breadcrumb={[{ label: m.expertise_stage_breadcrumb() }]}
  intro={m.expertise_intro_text()}
/>

<!-- Vier Kerngebiete als alternierende Image-Text-Blöcke -->
<Section spacing="lg" container="wide">
  <ImageText
    image={strategy}
    imageAlt="Alignment of Organization to Strategy"
    category="ALIGNMENT OF ORGANIZATION TO STRATEGY"
    headline="Strategie, die in der Organisation ankommt."
    imagePosition="left"
    ratio="4/3"
    ghost="AOS"
  >
    <p>
      AOS adressiert die klassische Lücke zwischen Strategiepapier und gelebter Organisation:
      Aufbauorganisation, Steuerungslogik, Anreizsysteme und kulturelle Treiber. Wir entwickeln
      ein Veränderungsdesign, das mit Ihren Führungsteams umsetzbar ist und an klaren Messpunkten
      überprüft wird.
    </p>
    {#snippet actions()}
      <ArrowLink href={localizeHref('/expertise/aos')} label="Mehr zu AOS" />
    {/snippet}
  </ImageText>
</Section>

<Section spacing="lg" container="wide" tone="sunken" accent>
  <ImageText
    image={transformation}
    imageAlt="Finance & Controlling"
    category="FINANCE & CONTROLLING"
    headline="Steuerungslogik mit Substanz."
    imagePosition="right"
    ratio="4/3"
    ghost="F&C"
  >
    <p>
      Finance & Controlling reicht bei uns von der Reporting-Architektur über Profitability-
      Rechnungen und Liquiditätssteuerung bis zur szenariofähigen Planung. Wir entwerfen das
      System, das Ihre Organisation tatsächlich nutzt — nicht das, das auf Folien gut aussieht.
    </p>
    {#snippet actions()}
      <ArrowLink href={localizeHref('/expertise/finance')} label="Mehr zu F&C" />
    {/snippet}
  </ImageText>
</Section>

<Section spacing="lg" container="wide">
  <ImageText
    image={capital}
    imageAlt="Transactions Advisory Services"
    category="TRANSACTIONS ADVISORY SERVICES"
    headline="Transaktionen mit Substanz."
    imagePosition="left"
    ratio="4/3"
    ghost="TAS"
  >
    <p>
      TAS begleitet Käufer und Verkäufer durch Long-List, Due Diligence, Verhandlung und
      Post-Merger-Integration. Wir denken Strategie und Umsetzung zusammen: eine Akquisition
      ist erst erfolgreich, wenn sie nach dem Closing das hält, was im Modell stand.
    </p>
    {#snippet actions()}
      <ArrowLink href={localizeHref('/expertise/tas')} label="Mehr zu TAS" />
    {/snippet}
  </ImageText>
</Section>

<Section spacing="lg" container="wide" tone="sunken" accent>
  <ImageText
    image={office}
    imageAlt="Risk Advisory Services"
    category="RISK ADVISORY SERVICES"
    headline="Risiken, die man führen kann."
    imagePosition="right"
    ratio="4/3"
    ghost="RAS"
  >
    <p>
      RAS verbindet integriertes Risikomanagement mit operativer Steuerung. Wir machen Risiken
      transparent, priorisieren sie und integrieren sie in Ihre Entscheidungs­logik — von ESG
      und BCM über IT-Sicherheit bis zur Begleitung in akuten Krisen­situationen. Für die
      software-gestützte Umsetzung kooperieren wir u. a. mit Kamakura Corporation (KRM).
    </p>
    {#snippet actions()}
      <ArrowLink href={localizeHref('/expertise/ras')} label="Mehr zu RAS" />
    {/snippet}
  </ImageText>
</Section>

<!-- Zwei weitere Themenfelder als kompakte Cards -->
<Section
  spacing="lg"
  container="wide"
  eyebrow={m.expertise_themes_eyebrow()}
  title={m.expertise_themes_headline()}
>
  <div class="extra-grid">
    <Teaser
      step="05"
      title="Customer Experience Analytics (CEA)"
      text="Auswertung von Kundenfeedback, Interaktionsdaten und Sentiment in einer geschlossenen Analyselandschaft. Inklusive Tooling-Auswahl, Datenintegration und Steuerungs-KPIs für Service- und Vertriebs­teams."
    />
    <Teaser
      step="06"
      title="Marketing Operations"
      text="Lead-Management, CRM-Architektur und Marketing Automation. Wir verzahnen Marketing- und Vertriebs­prozesse so, dass Kampagnen messbar in Pipeline-Effekt umgewandelt werden — branchen­spezifisch und compliance-konform."
    />
  </div>
</Section>

<!-- Branchen -->
<Section
  spacing="lg"
  container="wide"
  eyebrow={m.expertise_industries_eyebrow()}
  title={m.expertise_industries_headline()}
  tone="sunken"
>
  <RevealOnScroll stagger={true} class="industries-grid">
    {#each industries as ind (ind.tag)}
      <article class="industry-card">
        <span class="ind-tag">{ind.tag}</span>
        <h3 class="ind-label">{ind.label}</h3>
        <p class="ind-text">{ind.text}</p>
      </article>
    {/each}
  </RevealOnScroll>
</Section>

<!-- Arbeitsweise -->
<Section spacing="lg" container="wide" eyebrow="ARBEITSWEISE" title="So arbeiten wir.">
  <div class="approach-grid">
    <Teaser step="01" title="Diagnose" text="Wir hören zu, prüfen Daten, sprechen mit Stakeholdern. Erst dann formulieren wir Hypothesen — nicht umgekehrt." />
    <Teaser step="02" title="Konzeption" text="Wir formulieren Optionen statt Empfehlungen. Sie als Mandant entscheiden — wir liefern die belastbare Grundlage dafür." />
    <Teaser step="03" title="Umsetzung" text="Strategie ohne Umsetzung ist Papier. Unsere Berater:innen begleiten die Umsetzung Hand in Hand mit Ihren Teams." />
    <Teaser step="04" title="Wirkungsmessung" text="Wir messen den Mehrwert anhand Ihrer KPIs — nicht anhand unserer Stunden." />
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';

  .extra-grid {
    @apply grid gap-6;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 800px) {
    .extra-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  :global(.industries-grid) {
    @apply grid gap-6;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 700px) {
    :global(.industries-grid) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1100px) {
    :global(.industries-grid) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  .industry-card {
    @apply relative flex flex-col h-full;
    padding: clamp(1.5rem, 1rem + 1vw, 2rem);
    background: linear-gradient(168deg, rgba(19, 44, 44, 0.55) 0%, rgba(10, 21, 23, 0.35) 60%);
    border: 1px solid rgba(96, 207, 190, 0.12);
    border-radius: 6px;
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  .industry-card:hover {
    border-color: rgba(96, 207, 190, 0.4);
    transform: translateY(-2px);
  }
  :global(html[data-theme='light']) .industry-card {
    background: linear-gradient(168deg, rgba(255, 255, 255, 0.7) 0%, rgba(241, 241, 237, 0.4) 60%);
    border: 1px solid rgba(10, 21, 23, 0.08);
  }

  .ind-tag {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.18em;
    font-weight: 500;
    color: var(--brand-turquoise);
    margin-bottom: 1rem;
  }

  .ind-label {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    line-height: 1.25;
    font-size: 1.125rem;
    color: var(--white);
    margin: 0 0 0.75rem;
  }
  :global(html[data-theme='light']) .ind-label {
    color: var(--ink-3);
  }

  .ind-text {
    font-size: 0.9375rem;
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.72);
    margin: 0;
  }
  :global(html[data-theme='light']) .ind-text {
    color: rgba(10, 21, 23, 0.72);
  }

  .approach-grid {
    @apply grid gap-6;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 700px) {
    .approach-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1100px) {
    .approach-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
</style>
