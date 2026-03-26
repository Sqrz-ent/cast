<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let scrolled = $state(false);
  let menuOpen = $state(false);

  onMount(() => {
    function onScroll() {
      scrolled = window.scrollY > 80;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  $effect(() => {
    // Close mobile menu on route change
    $page.url.pathname;
    menuOpen = false;
  });
</script>

<nav class="site-nav" class:scrolled>
  <div class="nav-inner">

    <!-- Left: Logo -->
    <a href="/" class="nav-logo">
      <!-- TODO: replace with SVG logo -->
      SQRZ
    </a>

    <!-- Center: Links -->
    <div class="nav-links">
      <a href="/" class="nav-link" class:active={$page.url.pathname === '/'}>Home</a>
      <a href="/grow" class="nav-link" class:active={$page.url.pathname === '/grow'}>Grow</a>
    </div>

    <!-- Right: Auth + Hamburger -->
    <div class="nav-right">
      <a href="https://dashboard.sqrz.com/login" class="nav-login">Login</a>
      <a href="https://dashboard.sqrz.com/join" class="nav-signup">Sign Up</a>

      <!-- Hamburger (mobile only) -->
      <button
        class="nav-hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onclick={() => menuOpen = !menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

  </div>

  <!-- Mobile dropdown -->
  {#if menuOpen}
    <div class="nav-dropdown">
      <a href="/" class="nav-dropdown-link" class:active={$page.url.pathname === '/'}>Home</a>
      <a href="/grow" class="nav-dropdown-link" class:active={$page.url.pathname === '/grow'}>Grow</a>
    </div>
  {/if}
</nav>

<style>
  .site-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 64px;
    padding: 0 2rem;
    background: transparent;
    backdrop-filter: none;
    transition: background 0.3s ease, backdrop-filter 0.3s ease;
    font-family: 'DM Sans', ui-sans-serif, sans-serif;
  }

  .site-nav.scrolled {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    height: 64px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 32px;
  }

  /* Logo */
  .nav-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: 0.06em;
    color: #F3B130;
    text-decoration: none;
    flex-shrink: 0;
  }

  /* Center links */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    justify-content: center;
  }

  .nav-link {
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 6px;
    border-bottom: 2px solid transparent;
    transition: color 0.15s;
  }

  .nav-link:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  .nav-link.active {
    color: #F3B130;
    border-bottom-color: #F3B130;
  }

  /* Right side */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    margin-left: auto;
  }

  .nav-login {
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    transition: color 0.15s;
  }

  .nav-login:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  .nav-signup {
    font-size: 0.88rem;
    font-weight: 700;
    color: #111111;
    background: #F3B130;
    text-decoration: none;
    padding: 7px 16px;
    border-radius: 20px;
    transition: opacity 0.15s;
    white-space: nowrap;
  }

  .nav-signup:hover {
    opacity: 0.88;
  }

  /* Hamburger */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    width: 32px;
    height: 32px;
  }

  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    transition: background 0.15s;
  }

  .nav-hamburger:hover span {
    background: #ffffff;
  }

  /* Mobile dropdown */
  .nav-dropdown {
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 8px 0;
  }

  .nav-dropdown-link {
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    padding: 12px 2rem;
    transition: color 0.15s;
  }

  .nav-dropdown-link:hover {
    color: #ffffff;
  }

  .nav-dropdown-link.active {
    color: #F3B130;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .nav-hamburger {
      display: flex;
    }
  }
</style>
