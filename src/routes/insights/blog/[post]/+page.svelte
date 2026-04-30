<script lang="ts">
  import { page } from '$app/state';
  import { error } from '@sveltejs/kit';
  import MarkdownIt from 'markdown-it';
  import { Stage, Section, ArrowLink, RevealOnScroll } from '$lib';
  import { getPostBySlug, blogPosts } from '$lib/configs/blog';
  import { localizeHref } from '$lib/paraglide/runtime';

  const md = new MarkdownIt({ html: false, linkify: true, typographer: true, breaks: false });

  const slug = $derived(page.params.post ?? '');
  const post = $derived(getPostBySlug(slug));
  const bodyHtml = $derived(post ? md.render(post.body) : '');

  // Up to 2 related posts (excluding current)
  const related = $derived(
    post ? blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2) : []
  );

  $effect(() => {
    if (!post) error(404, 'Beitrag nicht gefunden');
  });
</script>

<svelte:head>
  <title>{post?.title ?? 'Blog'} | STRATECO</title>
  <meta name="description" content={post?.teaser ?? ''} />
</svelte:head>

{#if post}
  <Stage
    eyebrow="{post.category} · {post.date} · {post.readMinutes} min · {post.author}"
    title={post.title}
    breadcrumb={[
      { label: 'News & Insights', href: '/insights' },
      { label: 'Blog', href: '/insights/blog' },
      { label: post.title }
    ]}
  />

  <Section spacing="lg" container="content">
    <RevealOnScroll class="post-cover" duration={1100}>
      <figure class="cover-figure">
        <img src={post.image} alt={post.title} loading="eager" />
      </figure>
    </RevealOnScroll>

    <article class="article editorial">
      {@html bodyHtml}
    </article>

    <div class="article-foot">
      <ArrowLink href={localizeHref('/insights/blog')} reverse label="Zurück zum Blog" />
    </div>
  </Section>

  {#if related.length}
    <Section spacing="lg" container="wide" tone="sunken" eyebrow="WEITERE BEITRÄGE" title="Was Sie auch interessieren könnte.">
      <div class="related-grid">
        {#each related as r (r.slug)}
          <a href={localizeHref(`/insights/blog/${r.slug}`)} class="related-card">
            <figure>
              <img src={r.image} alt={r.title} loading="lazy" />
            </figure>
            <div class="related-body">
              <p class="eyebrow">{r.category} · {r.date}</p>
              <h3>{r.title}</h3>
              <p class="related-teaser">{r.teaser}</p>
            </div>
          </a>
        {/each}
      </div>
    </Section>
  {/if}
{/if}

<style lang="postcss">
  @reference '../../../../app.css';

  :global(.post-cover) {
    @apply mb-12;
  }

  .cover-figure {
    @apply relative m-0 overflow-hidden;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    background: linear-gradient(168deg, var(--ink-2) 0%, var(--brand-teal) 120%);
  }
  .cover-figure img {
    @apply absolute inset-0 w-full h-full;
    object-fit: cover;
    object-position: center;
  }

  .article {
    max-width: 44rem;
    margin-inline: auto;
  }

  /* markdown-it generates plain HTML — these selectors style the rendered tree. */
  .article :global(h2) {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    line-height: 1.2;
    font-size: clamp(1.375rem, 1.05rem + 1vw, 1.75rem);
    color: var(--white);
    margin: 2.5rem 0 1.25rem;
    letter-spacing: -0.005em;
  }
  :global(html[data-theme='light']) .article :global(h2) { color: var(--ink-3); }

  .article :global(h3) {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    font-size: clamp(1.125rem, 0.95rem + 0.6vw, 1.375rem);
    color: var(--white);
    margin: 2rem 0 1rem;
  }
  :global(html[data-theme='light']) .article :global(h3) { color: var(--ink-3); }

  .article :global(blockquote) {
    border-left: 2px solid var(--brand-turquoise);
    padding: 0.75rem 0 0.75rem 1.5rem;
    margin: 2rem 0;
    font-style: italic;
  }
  .article :global(blockquote p) {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: clamp(1.125rem, 1rem + 0.4vw, 1.375rem);
    line-height: 1.5;
    color: var(--brand-turquoise);
    margin: 0 0 0.5rem;
  }

  .article :global(ul),
  .article :global(ol) {
    margin: 1rem 0 1.25rem 1.5rem;
  }
  .article :global(li) {
    margin-bottom: 0.5rem;
  }

  .article :global(a) {
    color: var(--brand-turquoise);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }
  .article :global(a:hover) { color: var(--brand-turquoise-light); }

  .article-foot {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  :global(html[data-theme='light']) .article-foot {
    border-top-color: rgba(10, 21, 23, 0.1);
  }

  .related-grid {
    @apply grid gap-8;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 800px) {
    .related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2.5rem; }
  }

  .related-card {
    @apply block;
    text-decoration: none;
    color: inherit;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .related-card:hover { transform: translateY(-2px); }
  .related-card figure {
    @apply relative m-0 mb-4 overflow-hidden;
    aspect-ratio: 16 / 10;
    border-radius: 6px;
  }
  .related-card img {
    @apply absolute inset-0 w-full h-full;
    object-fit: cover;
    object-position: center;
    transition: transform 1s ease;
  }
  .related-card:hover img { transform: scale(1.04); }

  .related-card h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    line-height: 1.25;
    font-size: clamp(1.125rem, 0.9rem + 0.6vw, 1.375rem);
    color: var(--white);
    margin: 0.5rem 0 0.75rem;
    transition: color 0.3s ease;
  }
  :global(html[data-theme='light']) .related-card h3 { color: var(--ink-3); }
  .related-card:hover h3 { color: var(--brand-turquoise); }

  .related-teaser {
    font-size: 0.9375rem;
    line-height: 1.55;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
  :global(html[data-theme='light']) .related-teaser { color: rgba(10, 21, 23, 0.7); }
</style>
