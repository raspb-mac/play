<script lang="ts">
  let count = $state(0);

  function increment() {
    count++;
  }
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md prose prose-lg">
      <h1 class="text-5xl font-bold text-primary">SvelteKit Blueprint</h1>
      <p class="py-6">
        Welcome to your new Svelte 5 app powered by Runes, Tailwind CSS 4, and DaisyUI 5.
      </p>
      <div class="flex flex-col gap-4 items-center">
        <button class="btn btn-primary" onclick={increment}>
          Clicks: {count}
        </button>
        <div class="form-control w-full max-w-xs">
          <label class="label" for="sample-input">
            <span class="label-text">Sample Input (Tailwind Forms)</span>
          </label>
          <input id="sample-input" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>
    </div>
  </div>
</div>
