<script lang="ts">
  interface Props {
    title: string;
    text: string;
    href?: string;
    label?: string;
    badge?: string;
    icon?: string;
  }

  let { title, text, href, label = 'Learn more', badge, icon }: Props = $props();
</script>

<div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
  <div class="card-body">
    {#if icon}
      <div class="text-4xl mb-2">{icon}</div>
    {/if}
    {#if badge}
      <div class="badge badge-primary badge-sm mb-1">{badge}</div>
    {/if}
    <h3 class="card-title">{title}</h3>
    <p class="text-base-content/70 text-sm">{text}</p>
    {#if href}
      <div class="card-actions justify-end mt-2">
        <a href={href} class="btn btn-primary btn-sm">{label}</a>
      </div>
    {/if}
  </div>
</div>
