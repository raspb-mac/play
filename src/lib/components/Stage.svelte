<script lang="ts">
  interface Props {
    title: string;
    breadcrumb?: { label: string; href?: string }[];
    bg?: string;
  }

  let { title, breadcrumb = [], bg = 'bg-base-200' }: Props = $props();
</script>

<div class="w-full {bg} py-12 px-4 border-b border-base-300">
  <div class="max-w-6xl mx-auto">
    {#if breadcrumb.length > 0}
      <div class="text-sm breadcrumbs mb-2 text-base-content/50">
        <ul>
          <li><a href="/">Home</a></li>
          {#each breadcrumb as crumb}
            <li>
              {#if crumb.href}
                <a href={crumb.href}>{crumb.label}</a>
              {:else}
                {crumb.label}
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    <h1 class="text-4xl font-bold">{title}</h1>
  </div>
</div>
