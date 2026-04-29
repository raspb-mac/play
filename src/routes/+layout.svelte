<script lang="ts">
  import '../app.css';
  import { Header, Footer } from '$lib';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="app-shell">
  <Header />
  <main>
    {@render children()}
  </main>
  <Footer />
</div>

<style lang="postcss">
  @reference '../app.css';

  .app-shell {
    @apply flex flex-col min-h-screen;
  }

  main {
    @apply flex-1;
  }
</style>
