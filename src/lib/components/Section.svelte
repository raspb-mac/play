<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    subtitle?: string;
    bg?: 'base-100' | 'base-200' | 'base-300' | 'primary' | 'neutral';
    children: Snippet;
  }

  let { title, subtitle, bg = 'base-100', children }: Props = $props();
</script>

<section class="py-16 px-4 bg-{bg}">
  <div class="max-w-6xl mx-auto">
    {#if title}
      <div class="text-center mb-10">
        <h2 class="text-4xl font-bold">{title}</h2>
        {#if subtitle}
          <p class="mt-3 text-base-content/60 text-lg max-w-xl mx-auto">{subtitle}</p>
        {/if}
      </div>
    {/if}
    {@render children()}
  </div>
</section>
