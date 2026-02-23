<script lang="ts">
  import { page } from '$app/stores';

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/our-products', label: 'Products' },
    { href: '/references', label: 'References' },
    { href: '/contact', label: 'Contact' }
  ];
</script>

<header class="navbar bg-base-100 shadow-sm sticky top-0 z-50">
  <div class="navbar-start">
    <div class="dropdown">
      <button type="button" class="btn btn-ghost lg:hidden" aria-label="Open menu">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </button>
      <ul role="list" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {#each nav as item}
          <li><a href={item.href} class:font-bold={$page.url.pathname === item.href}>{item.label}</a></li>
        {/each}
      </ul>
    </div>
    <a href="/" class="btn btn-ghost text-xl font-bold">raspb</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1 gap-1">
      {#each nav as item}
        <li>
          <a href={item.href} class:font-bold={$page.url.pathname === item.href}>{item.label}</a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="navbar-end">
    <a href="/contact" class="btn btn-primary btn-sm">Get in touch</a>
  </div>
</header>
