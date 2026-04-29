<script lang="ts">
  import {
    Stage,
    Section,
    ImageText,
    Numbers,
    Teaser,
    ArrowLink
  } from '$lib';
  import type { NumberItem } from '$lib';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import office from '$images/team/office.jpg';
  import strategy from '$images/expertise/strategy.jpg';

  const values: NumberItem[] = [
    { value: '2002', label: 'GEGRÜNDET\nIN\nBAD HOMBURG' },
    { value: '11', label: 'PARTNER\nMIT GLOBALEM\nNETZWERK' },
    { value: '52', label: 'BERATER:INNEN\nIN DACH +\nLONDON' },
    { value: '4', label: 'STANDORTE\nIN\nEUROPA' }
  ];
</script>

<svelte:head>
  <title>{m.about_stage_title()} | STRATECO</title>
  <meta name="description" content={m.about_intro_text()} />
</svelte:head>

<Stage
  eyebrow="STRATECO"
  title={m.about_stage_title()}
  breadcrumb={[{ label: m.about_stage_breadcrumb() }]}
  intro={m.about_intro_text()}
/>

<Section spacing="lg" container="wide">
  <ImageText
    image={office}
    imageAlt="Strateco Büro"
    category={m.about_intro_eyebrow()}
    headline={m.about_intro_headline()}
    imagePosition="left"
    ratio="4/3"
    ghost="WHO"
  >
    <p>{m.about_intro_text()}</p>
    <p>
      Wir verstehen Beratung als Partnerschaft auf Augenhöhe. Statt Standardpräsentationen
      liefern wir Klarheit. Statt Aktionismus klare Prioritäten. Statt Distanz echte Mitverantwortung.
    </p>
    {#snippet actions()}
      <ArrowLink href={localizeHref('/expertise')} label={m.cta_learn_more()} />
    {/snippet}
  </ImageText>
</Section>

<Section spacing="lg" container="wide" tone="sunken" accent>
  <Numbers items={values} variant="rows" dividers />
</Section>

<Section
  spacing="lg"
  container="wide"
  eyebrow={m.about_values_eyebrow()}
  title={m.about_values_headline()}
>
  <div class="values-grid">
    <Teaser step="01" title="Klarheit" text="Wir nennen Dinge beim Namen — auch wenn das im Moment unbequem ist. Klarheit ist die Basis jeder belastbaren Entscheidung." />
    <Teaser step="02" title="Substanz" text="Wir denken nicht in Slides. Wir denken in Wirkung — und vermessen sie an betriebswirtschaftlichen Größen, nicht an Lob im Steering Committee." />
    <Teaser step="03" title="Partnerschaft" text="Mandate sind keine Aufträge. Sie sind Verbindungen. Unsere besten Beziehungen sind Jahrzehnte alt." />
    <Teaser step="04" title="Diskretion" text="Vertrauen entsteht im Stillen. Wir kommunizieren mit unseren Mandanten — nicht über sie." />
  </div>
</Section>

<Section
  spacing="lg"
  container="wide"
  eyebrow={m.about_team_eyebrow()}
  title={m.about_team_headline()}
>
  <div class="team-placeholder editorial">
    <p>
      An dieser Stelle führen wir bald die Profile unserer Partner und Senior Berater:innen ein —
      mit Lebensläufen, Branchenfokus und persönlicher Kontaktmöglichkeit.
    </p>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';

  .values-grid {
    @apply grid gap-6;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 700px) {
    .values-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1100px) {
    .values-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  .team-placeholder {
    max-width: 50rem;
  }
</style>
