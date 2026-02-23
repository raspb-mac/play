<script lang="ts">
  import { Stage } from '$lib';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let submitted = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    // TODO: implement form submission
    submitted = true;
  }
</script>

<svelte:head>
  <title>Contact | raspb</title>
</svelte:head>

<Stage title="Contact" breadcrumb={[{ label: 'Contact' }]} />

<section class="py-16 px-4">
  <div class="max-w-xl mx-auto">
    {#if submitted}
      <div class="alert alert-success">
        <span>Thank you! We'll get back to you shortly.</span>
      </div>
    {:else}
      <form onsubmit={handleSubmit} class="flex flex-col gap-4">
        <div class="form-control">
          <label class="label" for="name"><span class="label-text">Name</span></label>
          <input id="name" type="text" bind:value={name} required placeholder="Your name"
            class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label" for="email"><span class="label-text">Email</span></label>
          <input id="email" type="email" bind:value={email} required placeholder="your@email.com"
            class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label" for="message"><span class="label-text">Message</span></label>
          <textarea id="message" bind:value={message} required rows="5" placeholder="How can we help?"
            class="textarea textarea-bordered w-full"></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-full">Send Message</button>
      </form>
    {/if}
  </div>
</section>
