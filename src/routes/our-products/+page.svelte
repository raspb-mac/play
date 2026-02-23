<script lang="ts">
  import { Stage, Section, Teaser } from '$lib';

  const products = [
    { title: 'Web Development', text: 'Custom websites and web applications tailored to your needs.', icon: '🌐', badge: 'Core' },
    { title: 'AI Agents', text: 'Intelligent agents, voicebots, chatbots and RAG pipelines.', icon: '🤖', badge: 'AI' },
    { title: 'Automation', text: 'n8n workflows and process automation for your business.', icon: '⚙️', badge: 'Automation' },
    { title: 'Digital Transformation', text: 'End-to-end business digitalization for SMEs.', icon: '🚀', badge: 'Strategy' }
  ];
</script>

<svelte:head>
  <title>Our Products | raspb</title>
</svelte:head>

<Stage title="Our Products" breadcrumb={[{ label: 'Products' }]} />

<Section title="What we offer" subtitle="Full-stack IT services from a single source.">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each products as p}
      <Teaser title={p.title} text={p.text} icon={p.icon} badge={p.badge} href="/contact" label="Learn more" />
    {/each}
  </div>
</Section>
