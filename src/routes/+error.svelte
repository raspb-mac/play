<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Error {$page.status} | raspb</title>
</svelte:head>

<div class="hero min-h-[70vh] bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-8xl font-bold text-primary">{$page.status}</h1>
      <p class="text-2xl font-semibold mt-4">{$page.error?.message ?? 'Something went wrong'}</p>
      <p class="text-base-content/60 mt-2">
        {#if $page.status === 404}
          The page you're looking for doesn't exist.
        {:else}
          An unexpected error occurred. Please try again later.
        {/if}
      </p>
      <div class="mt-8 flex gap-3 justify-center">
        <a href="/" class="btn btn-primary">Back to Home</a>
        <a href="/contact" class="btn btn-ghost">Contact Support</a>
      </div>
    </div>
  </div>
</div>
