<script lang="ts">
  import '../app.css';
  import { Header, Footer } from '$lib';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
