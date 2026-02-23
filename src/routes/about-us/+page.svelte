<script lang="ts">
  import { Stage, Section, Teaser } from '$lib';
</script>

<svelte:head>
  <title>About Us | raspb</title>
</svelte:head>

<Stage title="About Us" breadcrumb={[{ label: 'About Us' }]} />

<Section title="Who we are" subtitle="raspb webservices — Rapid. Accurate. Services. Perfectly Balanced.">
  <div class="prose prose-lg max-w-3xl mx-auto text-center">
    <p>
      We are an individual IT services company focused on web development, digital transformation,
      and AI-powered automation for small and medium-sized businesses.
    </p>
  </div>
</Section>

<Section title="Our Values" bg="base-200">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Teaser icon="⚡" title="Rapid" text="Fast & efficient. AI workflows, top performance." />
    <Teaser icon="🎯" title="Accurate" text="Precise & reliable. No bloat, accurate like a Swiss watch." />
    <Teaser icon="🤝" title="Services" text="Everything from one source. Absolute customer orientation." />
    <Teaser icon="⚖️" title="Perfectly Balanced" text="Harmony of cost, time and quality." />
  </div>
</Section>
