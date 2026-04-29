<script lang="ts">
  import { Stage, Section, FeatureCarousel, Teaser, ArrowLink, RevealOnScroll } from '$lib';
  import type { FeatureItem } from '$lib';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { blogPosts } from '$lib/configs/blog';

  const featured: FeatureItem[] = blogPosts.slice(0, 3).map((p) => ({
    image: p.image,
    category: p.category,
    date: p.date,
    title: p.title,
    text: p.teaser,
    href: localizeHref(`/insights/blog/${p.slug}`),
    cta: m.cta_read_more()
  }));

  const sections = [
    {
      step: 'BLOG',
      title: 'Blog',
      text: 'Kompakte Beobachtungen aus dem Mandatsalltag, Kommentare zu strukturellen Markttrends und ausgewählte Studien­ergebnisse.',
      href: '/insights/blog',
      cta: 'Zum Blog'
    },
    {
      step: 'EINBLICKE',
      title: 'Einblicke',
      text: 'Längere Studien und Positions­papiere zu Sektor­dynamiken, Regulatorik und Bewertungs­logik — typischerweise 12–30 Seiten.',
      href: '/insights/views',
      cta: 'Studien lesen'
    },
    {
      step: 'PRESSE',
      title: 'Presse',
      text: 'Pressestimmen, Interviews und Kommentare unserer Partner:innen zu aktuellen Themen aus Wirtschaft und Kapital­märkten.',
      href: '/insights/press',
      cta: 'Pressestimmen'
    }
  ];
</script>

<svelte:head>
  <title>{m.insights_stage_title()} | STRATECO</title>
  <meta name="description" content={m.insights_intro_text()} />
</svelte:head>

<Stage
  eyebrow={m.insights_intro_eyebrow()}
  title={m.insights_stage_title()}
  breadcrumb={[{ label: m.insights_stage_breadcrumb() }]}
  intro={m.insights_intro_text()}
/>

<!-- Featured Blog-Beiträge im Carousel -->
<Section spacing="lg" container="wide">
  <FeatureCarousel
    items={featured}
    eyebrow="AKTUELL"
    title={m.insights_intro_headline()}
  />
  <div class="cta-row">
    <ArrowLink href={localizeHref('/insights/blog')} label="Alle Beiträge im Blog" />
  </div>
</Section>

<!-- Drei Bereiche -->
<Section
  spacing="lg"
  container="wide"
  tone="sunken"
  accent
  eyebrow="THEMEN­BEREICHE"
  title="Drei Formate für drei Lese­anlässe."
>
  <RevealOnScroll stagger={true} class="format-grid">
    {#each sections as s (s.title)}
      <div class="format-card">
        <p class="eyebrow">{s.step}</p>
        <h3 class="format-title">{s.title}</h3>
        <p class="format-text">{s.text}</p>
        <div class="format-cta">
          <ArrowLink href={localizeHref(s.href)} label={s.cta} size="sm" />
        </div>
      </div>
    {/each}
  </RevealOnScroll>
</Section>

<style lang="postcss">
  @reference '../../app.css';

  .cta-row {
    margin-top: 2.5rem;
    display: flex;
    justify-content: flex-end;
  }

  :global(.format-grid) {
    @apply grid gap-6;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 800px) {
    :global(.format-grid) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .format-card {
    @apply flex flex-col gap-3 h-full;
    padding: clamp(1.5rem, 1rem + 1vw, 2.25rem);
    background: linear-gradient(168deg, rgba(19, 44, 44, 0.55) 0%, rgba(10, 21, 23, 0.35) 60%);
    border: 1px solid rgba(96, 207, 190, 0.12);
    border-radius: 6px;
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  :global(html[data-theme='light']) .format-card {
    background: linear-gradient(168deg, rgba(255, 255, 255, 0.7) 0%, rgba(241, 241, 237, 0.4) 60%);
    border-color: rgba(10, 21, 23, 0.08);
  }
  .format-card:hover {
    border-color: rgba(96, 207, 190, 0.4);
    transform: translateY(-2px);
  }

  .format-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    line-height: 1.2;
    font-size: clamp(1.25rem, 1rem + 0.7vw, 1.625rem);
    color: var(--white);
    margin: 0.25rem 0 0.5rem;
  }
  :global(html[data-theme='light']) .format-title { color: var(--ink-3); }

  .format-text {
    font-size: 0.9375rem;
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
    flex: 1;
  }
  :global(html[data-theme='light']) .format-text { color: rgba(10, 21, 23, 0.75); }

  .format-cta { margin-top: 1.5rem; }
</style>
