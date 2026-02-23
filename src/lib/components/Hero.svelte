<script lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
    cta?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
    align?: 'left' | 'center';
  }

  let {
    title,
    subtitle = '',
    cta,
    ctaSecondary,
    align = 'center'
  }: Props = $props();
</script>

<section class="hero min-h-[60vh] bg-base-200">
  <div class="hero-content {align === 'center' ? 'text-center' : ''} max-w-3xl flex-col">
    <div>
      <h1 class="text-5xl font-bold leading-tight">{title}</h1>
      {#if subtitle}
        <p class="py-6 text-lg text-base-content/70">{subtitle}</p>
      {/if}
      <div class="flex gap-3 {align === 'center' ? 'justify-center' : ''}">
        {#if cta}
          <a href={cta.href} class="btn btn-primary">{cta.label}</a>
        {/if}
        {#if ctaSecondary}
          <a href={ctaSecondary.href} class="btn btn-ghost">{ctaSecondary.label}</a>
        {/if}
      </div>
    </div>
  </div>
</section>
