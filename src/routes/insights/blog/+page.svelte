<script lang="ts">
  import { Stage, Section, ArrowLink, RevealOnScroll } from '$lib';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { blogPosts } from '$lib/configs/blog';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  // Sort newest first
  const posts = $derived([...blogPosts].sort((a, b) => b.isoDate.localeCompare(a.isoDate)));

  function open(slug: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goto(resolve(localizeHref(`/insights/blog/${slug}` as any) as any));
  }
</script>

<svelte:head>
  <title>Blog | STRATECO</title>
  <meta
    name="description"
    content="Beobachtungen unserer Berater:innen aus dem Mandatsalltag — kompakt, mit klarer These, ohne Marketing­filter."
  />
</svelte:head>

<Stage
  eyebrow="BLOG"
  title="Beiträge unserer Berater:innen."
  breadcrumb={[
    { label: 'News & Insights', href: '/insights' },
    { label: 'Blog' }
  ]}
  intro="Kompakte Beobachtungen aus laufenden Mandaten, Kommentare zu strukturellen Markttrends und ausgewählte Studien­ergebnisse — wir publizieren in der Frequenz, in der wir wirklich etwas zu sagen haben."
/>

<Section spacing="lg" container="wide" accent>
  <RevealOnScroll stagger={true} class="post-list">
    {#each posts as post (post.slug)}
      <article class="post-card">
        <button
          type="button"
          class="post-link"
          aria-label={post.title}
          onclick={() => open(post.slug)}
        ></button>
        <figure class="post-figure">
          <img src={post.image} alt={post.title} loading="lazy" />
        </figure>
        <div class="post-body">
          <p class="eyebrow post-meta">
            <span>{post.category}</span>
            <span class="post-meta-sep">·</span>
            <span>{post.date}</span>
            <span class="post-meta-sep">·</span>
            <span>{post.readMinutes} min</span>
          </p>
          <h2 class="post-title">{post.title}</h2>
          <p class="post-teaser">{post.teaser}</p>
          <div class="post-cta">
            <ArrowLink href={localizeHref(`/insights/blog/${post.slug}`)} label="Beitrag lesen" />
          </div>
        </div>
      </article>
    {/each}
  </RevealOnScroll>
</Section>

<style lang="postcss">
  @reference '../../../app.css';

  :global(.post-list) {
    @apply flex flex-col gap-12;
  }

  .post-card {
    @apply relative grid items-center gap-8;
    grid-template-columns: 1fr;
    padding-block: clamp(1.5rem, 1rem + 1vw, 2rem);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .post-card:first-child { border-top: none; padding-top: 0; }

  :global(html[data-theme='light']) .post-card {
    border-top-color: rgba(10, 21, 23, 0.08);
  }

  @media (min-width: 800px) {
    .post-card {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
      gap: clamp(2rem, 1rem + 3vw, 4rem);
    }
  }

  .post-link {
    @apply absolute inset-0 cursor-pointer bg-transparent border-0;
    z-index: 2;
  }

  .post-figure {
    @apply relative m-0 overflow-hidden;
    aspect-ratio: 4 / 3;
    border-radius: 6px;
    background: linear-gradient(168deg, var(--ink-2) 0%, var(--brand-teal) 120%);
  }
  .post-figure img {
    @apply absolute inset-0 w-full h-full;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.92) saturate(0.92);
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
  }
  :global(html[data-theme='light']) .post-figure img {
    filter: none;
  }
  .post-card:hover .post-figure img {
    transform: scale(1.03);
    filter: brightness(1) saturate(1);
  }

  .post-body { @apply relative; }

  .post-meta {
    @apply mb-3 inline-flex items-center gap-2 flex-wrap;
  }
  .post-meta-sep { opacity: 0.55; }

  .post-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    line-height: 1.15;
    font-size: clamp(1.5rem, 1.05rem + 1.4vw, 2.25rem);
    letter-spacing: -0.01em;
    margin: 0 0 1rem;
    color: var(--white);
    transition: color 0.3s ease;
  }
  :global(html[data-theme='light']) .post-title { color: var(--ink-3); }

  .post-card:hover .post-title { color: var(--brand-turquoise); }

  .post-teaser {
    font-size: clamp(1rem, 0.875rem + 0.4vw, 1.125rem);
    line-height: 1.6;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.78);
    margin: 0 0 1.5rem;
    max-width: 50rem;
  }
  :global(html[data-theme='light']) .post-teaser { color: rgba(10, 21, 23, 0.75); }

  .post-cta { @apply relative; z-index: 3; }
</style>
