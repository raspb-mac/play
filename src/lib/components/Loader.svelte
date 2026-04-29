<script lang="ts">
  interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    fullscreen?: boolean;
    label?: string;
  }

  let { size = 'md', fullscreen = false, label }: Props = $props();

  const sizeMap = { xs: 18, sm: 26, md: 38, lg: 56 } as const;
</script>

{#if fullscreen}
  <div class="loader-fullscreen" role="status" aria-live="polite">
    <span class="loader-orbit" style="--s:{sizeMap[size]}px"></span>
    {#if label}<p class="loader-label">{label}</p>{/if}
  </div>
{:else}
  <div class="loader-inline" role="status" aria-live="polite">
    <span class="loader-orbit" style="--s:{sizeMap[size]}px"></span>
    {#if label}<span class="loader-label">{label}</span>{/if}
  </div>
{/if}

<style lang="postcss">
  @reference '../../app.css';

  .loader-fullscreen {
    @apply fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4;
    background: rgba(10, 21, 23, 0.78);
    backdrop-filter: blur(8px);
  }

  .loader-inline {
    @apply flex items-center gap-3 p-4;
  }

  .loader-orbit {
    width: var(--s, 38px);
    height: var(--s, 38px);
    border-radius: 999px;
    border: 1.5px solid rgba(96, 207, 190, 0.18);
    border-top-color: var(--brand-turquoise);
    animation: loader-spin 0.9s linear infinite;
    display: inline-block;
  }

  .loader-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.875rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
    margin: 0;
  }
  :global(html[data-theme='light']) .loader-label {
    color: rgba(10, 21, 23, 0.7);
  }

  @keyframes loader-spin {
    to { transform: rotate(360deg); }
  }
</style>
