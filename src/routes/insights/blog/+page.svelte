<script lang="ts">
  import { Stage, Section, ArrowLink, RevealOnScroll } from '$lib';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { blogPosts, BLOG_CATEGORIES } from '$lib/configs/blog';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  let activeCategory = $state<string | 'all'>('all');
  let query = $state('');

  // Sort newest first, then filter by category, then by query
  const sorted = $derived([...blogPosts].sort((a, b) => b.isoDate.localeCompare(a.isoDate)));

  const filtered = $derived.by(() => {
    let list = sorted;
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.teaser.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return list;
  });

  // Counts per category (based on full set, ignoring search query)
  const counts = $derived.by(() => {
    const map: Record<string, number> = { all: blogPosts.length };
    for (const c of BLOG_CATEGORIES) map[c] = 0;
    for (const p of blogPosts) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  });

  function open(slug: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goto(resolve(localizeHref(`/insights/blog/${slug}` as any) as any));
  }

  function clearAll() {
    activeCategory = 'all';
    query = '';
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
  intro="Kompakte Beobachtungen aus laufenden Mandaten, Kommentare zu strukturellen Markttrends und ausgewählte Studien­ergebnisse."
/>

<Section spacing="lg" container="wide" accent>
  <!-- Filter & Suche -->
  <div class="filter-bar">
    <div class="chips" role="tablist" aria-label="Kategorie">
      <button
        type="button"
        role="tab"
        class="chip"
        class:active={activeCategory === 'all'}
        aria-selected={activeCategory === 'all'}
        onclick={() => (activeCategory = 'all')}
      >
        <span>Alle</span>
        <span class="chip-count">{counts.all}</span>
      </button>
      {#each BLOG_CATEGORIES as cat (cat)}
        {#if counts[cat] > 0}
          <button
            type="button"
            role="tab"
            class="chip"
            class:active={activeCategory === cat}
            aria-selected={activeCategory === cat}
            onclick={() => (activeCategory = cat)}
          >
            <span>{cat}</span>
            <span class="chip-count">{counts[cat]}</span>
          </button>
        {/if}
      {/each}
    </div>

    <label class="search">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path d="M16 16 L 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <input
        type="search"
        placeholder="Beiträge durchsuchen…"
        bind:value={query}
        aria-label="Beiträge durchsuchen"
      />
      {#if query}
        <button type="button" class="search-clear" onclick={() => (query = '')} aria-label="Suche zurücksetzen">×</button>
      {/if}
    </label>
  </div>

  {#if filtered.length === 0}
    <div class="empty">
      <p class="empty-headline">Keine Beiträge gefunden.</p>
      <p class="empty-text">Probiere eine andere Kategorie oder einen anderen Suchbegriff.</p>
      <ArrowLink onclick={clearAll} label="Filter zurücksetzen" />
    </div>
  {:else}
    <RevealOnScroll stagger={true} class="post-list">
      {#each filtered as post (post.slug)}
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
            <p class="post-author">{post.author}</p>
            <div class="post-cta">
              <ArrowLink href={localizeHref(`/insights/blog/${post.slug}`)} label="Beitrag lesen" />
            </div>
          </div>
        </article>
      {/each}
    </RevealOnScroll>
  {/if}
</Section>

<style lang="postcss">
  @reference '../../../app.css';

  .filter-bar {
    @apply flex flex-wrap items-center justify-between mb-12 gap-6;
  }

  .chips {
    @apply flex flex-wrap items-center gap-2;
  }

  .chip {
    @apply inline-flex items-center gap-2 cursor-pointer bg-transparent;
    padding: 8px 14px;
    border: 1px solid rgba(96, 207, 190, 0.22);
    color: rgba(255, 255, 255, 0.78);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 999px;
    transition: var(--t-base);
  }
  :global(html[data-theme='light']) .chip {
    border-color: rgba(45, 145, 131, 0.32);
    color: rgba(10, 21, 23, 0.78);
  }

  .chip:hover {
    border-color: var(--brand-turquoise);
    color: var(--brand-turquoise);
  }

  .chip.active {
    background: var(--brand-turquoise);
    border-color: var(--brand-turquoise);
    color: var(--ink-3);
  }

  .chip-count {
    font-size: 0.6875rem;
    opacity: 0.75;
    font-feature-settings: 'tnum' 1;
  }

  .search {
    @apply relative flex items-center;
    width: clamp(220px, 30vw, 360px);
  }

  .search svg {
    @apply absolute pointer-events-none;
    left: 12px;
    width: 18px;
    height: 18px;
    color: rgba(255, 255, 255, 0.5);
  }
  :global(html[data-theme='light']) .search svg {
    color: rgba(10, 21, 23, 0.5);
  }

  .search input {
    @apply w-full bg-transparent;
    padding: 10px 36px 10px 38px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9375rem;
    color: var(--white);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    transition: border-color 0.3s ease;
  }
  :global(html[data-theme='light']) .search input {
    color: var(--ink-3);
    border-color: rgba(10, 21, 23, 0.18);
  }
  .search input::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }
  :global(html[data-theme='light']) .search input::placeholder {
    color: rgba(10, 21, 23, 0.45);
  }
  .search input:focus {
    outline: none;
    border-color: var(--brand-turquoise);
  }

  .search-clear {
    @apply absolute cursor-pointer bg-transparent border-0 flex items-center justify-center;
    right: 8px;
    width: 24px;
    height: 24px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 1.4rem;
    line-height: 1;
    border-radius: 999px;
    transition: color 0.3s ease, background 0.3s ease;
  }
  :global(html[data-theme='light']) .search-clear {
    color: rgba(10, 21, 23, 0.55);
  }
  .search-clear:hover {
    color: var(--brand-turquoise);
    background: rgba(96, 207, 190, 0.1);
  }

  .empty {
    @apply flex flex-col items-start gap-3;
    padding-block: 4rem;
  }
  .empty-headline {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: clamp(1.25rem, 1rem + 0.7vw, 1.625rem);
    color: var(--white);
    margin: 0;
  }
  :global(html[data-theme='light']) .empty-headline { color: var(--ink-3); }
  .empty-text {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 1rem;
  }
  :global(html[data-theme='light']) .empty-text { color: rgba(10, 21, 23, 0.7); }

  /* Post list (unchanged from previous version) */
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
    margin: 0 0 0.75rem;
    max-width: 50rem;
  }
  :global(html[data-theme='light']) .post-teaser { color: rgba(10, 21, 23, 0.75); }

  .post-author {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
    margin: 0 0 1.5rem;
  }
  :global(html[data-theme='light']) .post-author { color: rgba(10, 21, 23, 0.5); }

  .post-cta { @apply relative; z-index: 3; }
</style>
