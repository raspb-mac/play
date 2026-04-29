<script lang="ts">
  import { page } from '$app/state';
  import { error } from '@sveltejs/kit';
  import { Stage, Section } from '$lib';
  import { expertiseSubPages } from '$lib/configs/subnav';

  const slug = $derived(page.params.slug ?? '');
  const content = $derived(expertiseSubPages[slug]);

  $effect(() => {
    if (!content) error(404, 'Seite nicht gefunden');
  });
</script>

<svelte:head>
  <title>{content?.headline ?? 'STRATECO'} | STRATECO</title>
  <meta name="description" content={content?.paragraphs[0] ?? ''} />
</svelte:head>

{#if content}
  <Stage
    eyebrow={content.eyebrow}
    title={content.headline}
    breadcrumb={[
      { label: content.parentLabel, href: content.parentHref },
      { label: content.eyebrow }
    ]}
  />

  <Section spacing="lg" container="content">
    <div class="stub-body editorial">
      {#each content.paragraphs as p (p)}
        <p>{p}</p>
      {/each}
    </div>
  </Section>
{/if}

<style lang="postcss">
  @reference '../../../app.css';

  .stub-body {
    max-width: 60rem;
  }
</style>
