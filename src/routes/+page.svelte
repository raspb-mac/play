<script lang="ts">
  import {
    Hero,
    Section,
    ImageText,
    Numbers,
    ArrowLink,
    PortfolioCarousel,
    FeatureCarousel,
    Waves,
    RevealOnScroll
  } from '$lib';
  import type { NumberItem, PortfolioItem, FeatureItem } from '$lib';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { blogPosts } from '$lib/configs/blog';

  import strategyImg from '$images/expertise/strategy.jpg';
  import transformationImg from '$images/expertise/transformation.jpg';
  import portfolio1 from '$images/portfolio/finance-1.jpg';
  import portfolio2 from '$images/portfolio/finance-2.jpg';
  import portfolio3 from '$images/portfolio/finance-3.jpg';
  import portfolio4 from '$images/portfolio/finance-4.jpg';
  import portfolio5 from '$images/portfolio/finance-5.jpg';
  import portfolio6 from '$images/portfolio/finance-6.jpg';

  const stats: NumberItem[] = [
    { value: '2002', label: m.home_stats_label_founded() },
    { value: '150', suffix: '+', label: m.home_stats_label_team() },
    { value: '500', suffix: '+', label: m.home_stats_label_projects() },
    { value: '4', label: m.home_stats_label_offices() }
  ];

  const portfolio: PortfolioItem[] = [
    { title: 'Helios Capital', category: 'M&A · DACH', image: portfolio1 },
    { title: 'Northwind AG', category: 'TRANSFORMATION', image: portfolio2 },
    { title: 'Atlas Industries', category: 'STRATEGIE', image: portfolio3 },
    { title: 'Polaris Group', category: 'GROWTH', image: portfolio4 },
    { title: 'Evergreen Ventures', category: 'IPO READINESS', image: portfolio5 },
    { title: 'Meridian Holdings', category: 'RESTRUCTURING', image: portfolio6 }
  ];

  const news: FeatureItem[] = blogPosts.slice(0, 4).map((p) => ({
    image: p.image,
    category: p.category,
    date: p.date,
    title: p.title,
    text: p.teaser,
    href: localizeHref(`/insights/blog/${p.slug}`),
    cta: m.cta_read_more()
  }));

  const industries = [
    { tag: '01', label: 'Financial\nInstitutions', text: 'Banken, Versicherer und Asset Manager.' },
    { tag: '02', label: 'Pharma &\nHealthcare', text: 'Hersteller, Versorger, Krankenhausverbünde.' },
    { tag: '03', label: 'Telecom · Media\n· High Tech', text: 'Netzbetreiber, Medienhäuser, Technologie­konzerne.' },
    { tag: '04', label: 'Travel · Transport\n· Logistics', text: 'Flughäfen, Reedereien, Logistik-Häuser.' }
  ];
</script>

<svelte:head>
  <title>STRATECO — {m.brand_tagline()}</title>
  <meta name="description" content={m.home_hero_lead()} />
</svelte:head>

<Hero
  eyebrow={m.home_hero_eyebrow()}
  titleLines={[
    m.home_hero_title_line1(),
    m.home_hero_title_line2(),
    m.home_hero_title_line3()
  ]}
  lead={m.home_hero_lead()}
>
  <ArrowLink href={localizeHref('/expertise')} label={m.cta_discover()} size="lg" />
</Hero>

<!-- STATS -->
<Section spacing="lg" container="wide" accent>
  <div class="stats-frame">
    <Numbers
      items={stats}
      eyebrow={m.home_stats_eyebrow()}
      variant="rows"
      dividers
    />
  </div>
</Section>

<!-- ABOUT BLOCK -->
<Section spacing="lg" container="wide">
  <ImageText
    image={transformationImg}
    imageAlt="Strateco Beratungsgespräch"
    category={m.home_about_category()}
    headline={m.home_about_headline()}
    imagePosition="left"
    split="balanced"
    ratio="4/3"
    ghost="ABOUT"
  >
    <p>{m.home_about_text()}</p>
    <p>
      Vertrauen entsteht aus Substanz. Aus dem Mut, ungeschönte Diagnosen zu stellen — und aus der
      Disziplin, sie mit dem nötigen Pragmatismus in operative Resultate zu übersetzen.
    </p>
    {#snippet actions()}
      <ArrowLink href={localizeHref('/about-us')} label={m.cta_learn_more()} />
    {/snippet}
  </ImageText>
</Section>

<!-- COMPETENCE BLOCK -->
<Section spacing="lg" container="wide" tone="sunken" accent>
  <ImageText
    image={strategyImg}
    imageAlt="Strategiesitzung"
    category={m.home_competence_category()}
    headline={m.home_competence_headline()}
    imagePosition="right"
    split="balanced"
    ratio="4/3"
    ghost="EXPERTISE"
  >
    <p>{m.home_competence_text()}</p>
    <p>
      Unsere vier Kerngebiete — <em>Alignment of Organization to Strategy</em>,
      <em>Finance &amp; Controlling</em>, <em>Transactions Advisory</em> und
      <em>Risk Advisory</em> — werden ergänzt durch <em>Customer Experience Analytics</em> und
      <em>Marketing Operations</em>. Sechs Felder, die zusammen ein integriertes Beratungs­bild ergeben.
    </p>
    {#snippet actions()}
      <ArrowLink href={localizeHref('/expertise')} label={m.cta_learn_more()} />
    {/snippet}
  </ImageText>
</Section>

<!-- INDUSTRIES STRIP -->
<Section
  spacing="lg"
  container="wide"
  eyebrow={m.home_industries_eyebrow()}
  title={m.home_industries_headline()}
  intro={m.home_industries_text()}
>
  <RevealOnScroll stagger={true} class="ind-strip">
    {#each industries as ind (ind.tag)}
      <article class="ind-item">
        <span class="ind-tag">{ind.tag}</span>
        <h3 class="ind-label">{ind.label}</h3>
        <p class="ind-text">{ind.text}</p>
      </article>
    {/each}
  </RevealOnScroll>
</Section>

<!-- PORTFOLIO CAROUSEL -->
<Section spacing="lg" container="wide" tone="sunken" accent>
  <PortfolioCarousel
    items={portfolio}
    eyebrow={m.home_portfolio_eyebrow()}
    title={m.home_portfolio_headline()}
  />
</Section>

<!-- NEWS / FEATURE CAROUSEL -->
<Section spacing="lg" container="wide">
  <FeatureCarousel
    items={news}
    eyebrow={m.home_news_eyebrow()}
    title={m.home_news_headline()}
  />
  <div class="news-cta">
    <ArrowLink href={localizeHref('/insights/blog')} label="Zum Blog" />
  </div>
</Section>

<!-- CTA -->
<Section spacing="xl" container="content">
  <div class="cta-block">
    <div class="cta-text">
      <p class="eyebrow">{m.home_cta_eyebrow()}</p>
      <h2 class="display-headline cta-headline">{m.home_cta_headline()}</h2>
      <p class="cta-lead">{m.home_cta_text()}</p>
      <div class="cta-actions">
        <ArrowLink href={localizeHref('/contact')} label={m.cta_contact()} size="lg" />
      </div>
    </div>
    <div class="cta-decoration" aria-hidden="true">
      <Waves variant="block" count={20} opacity={0.65} />
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference '../app.css';

  .stats-frame { @apply relative; }

  :global(.ind-strip) {
    @apply grid gap-8;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 700px) {
    :global(.ind-strip) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1100px) {
    :global(.ind-strip) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 2.5rem;
    }
  }

  .ind-item {
    @apply flex flex-col gap-3;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(96, 207, 190, 0.18);
  }
  :global(html[data-theme='light']) .ind-item {
    border-top-color: rgba(45, 145, 131, 0.28);
  }

  .ind-tag {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.18em;
    font-weight: 500;
    color: var(--brand-turquoise);
  }

  .ind-label {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    line-height: 1.2;
    font-size: clamp(1.125rem, 0.95rem + 0.5vw, 1.375rem);
    color: var(--white);
    margin: 0;
    white-space: pre-line;
  }
  :global(html[data-theme='light']) .ind-label { color: var(--ink-3); }

  .ind-text {
    font-size: 0.9375rem;
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
  :global(html[data-theme='light']) .ind-text { color: rgba(10, 21, 23, 0.7); }

  .news-cta {
    margin-top: 2.5rem;
    display: flex;
    justify-content: flex-end;
  }

  .cta-block {
    @apply relative grid items-center gap-10;
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    .cta-block {
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
      gap: 5rem;
    }
  }

  .cta-text {
    @apply relative;
    z-index: 1;
  }

  .cta-headline {
    margin: 1rem 0 1.5rem;
    color: var(--white);
  }

  :global(html[data-theme='light']) .cta-headline {
    color: var(--ink-3);
  }

  .cta-lead {
    font-size: clamp(1rem, 0.875rem + 0.5vw, 1.25rem);
    line-height: 1.6;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.78);
    max-width: 36rem;
    margin: 0 0 2.5rem;
  }
  :global(html[data-theme='light']) .cta-lead {
    color: rgba(10, 21, 23, 0.75);
  }

  .cta-decoration {
    @apply relative;
    aspect-ratio: 1 / 1;
    min-height: 280px;
  }
</style>
