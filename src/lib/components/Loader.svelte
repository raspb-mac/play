<script lang="ts">
  interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    fullscreen?: boolean;
    label?: string;
  }

  let { size = 'md', fullscreen = false, label }: Props = $props();
</script>

{#if fullscreen}
  <div class="fixed inset-0 bg-base-100/80 backdrop-blur-sm z-50 flex items-center justify-center flex-col gap-3">
    <span class="loading loading-spinner loading-{size} text-primary"></span>
    {#if label}<p class="text-base-content/60 text-sm">{label}</p>{/if}
  </div>
{:else}
  <div class="flex items-center justify-center gap-2 p-4">
    <span class="loading loading-spinner loading-{size} text-primary"></span>
    {#if label}<span class="text-base-content/60 text-sm">{label}</span>{/if}
  </div>
{/if}
