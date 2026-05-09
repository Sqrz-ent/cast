<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let scrolled = $state(false);
  let menuOpen = $state(false);
  let joinUrl = $state('https://dashboard.sqrz.com/join');

  onMount(() => {
    function onScroll() {
      scrolled = window.scrollY > 80;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  onMount(() => {
    const ref = localStorage.getItem('sqrz_ref');
    if (ref) joinUrl = `https://dashboard.sqrz.com/join?ref=${ref}`;
  });

  $effect(() => {
    // Close mobile menu on route change
    $page.url.pathname;
    menuOpen = false;
  });

  function closeMenu() {
    menuOpen = false;
  }
</script>

<nav class="site-nav" class:scrolled class:menu-open={menuOpen}>
  <div class="nav-inner">

    <!-- Left: Logo -->
    <a href="/" class="nav-logo" onclick={closeMenu}>
      <img src="/sqrz-logo.png" alt="SQRZ" class="nav-logo-img" />
    </a>

    <!-- Center: Links (desktop only) -->
    <div class="nav-links">
      <a href="/" class="nav-link" class:active={$page.url.pathname === '/'}>SQRZ</a>
      <a href="/grow" class="nav-link" class:active={$page.url.pathname === '/grow'}>Grow</a>
      <a href="/blog" class="nav-link" class:active={$page.url.pathname.startsWith('/blog')}>Blog</a>
    </div>

    <!-- Right: Auth + Hamburger -->
    <div class="nav-right">
      <!-- Auth links: desktop only -->
      <a href="https://dashboard.sqrz.com/login" class="nav-login nav-desktop-only">Login</a>
      <a href={joinUrl} class="nav-signup nav-desktop-only">Sign Up</a>

      <!-- Hamburger / Close (mobile only) -->
      <button
        class="nav-hamburger"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onclick={() => menuOpen = !menuOpen}
      >
        {#if menuOpen}
          <span class="hamburger-close">✕</span>
        {:else}
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        {/if}
      </button>
    </div>

  </div>

  <!-- Mobile panel -->
  {#if menuOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="nav-backdrop" onclick={closeMenu}></div>
    <div class="nav-panel">
      <a href="/" class="nav-panel-link" class:active={$page.url.pathname === '/'} onclick={closeMenu}>SQRZ</a>
      <a href="/grow" class="nav-panel-link" class:active={$page.url.pathname === '/grow'} onclick={closeMenu}>Grow</a>
      <a href="/blog" class="nav-panel-link" class:active={$page.url.pathname.startsWith('/blog')} onclick={closeMenu}>Blog</a>
      <div class="nav-panel-divider"></div>
      <a href="https://dashboard.sqrz.com/login" class="nav-panel-link nav-panel-login" onclick={closeMenu}>Login</a>
      <a href={joinUrl} class="nav-panel-signup" onclick={closeMenu}>Sign Up</a>
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

  .site-nav.scrolled,
  .site-nav.menu-open {
    background: rgba(0, 0, 0, 0.95);
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

  .nav-logo-img {
    height: 36px;
    width: auto;
    display: block;
  }

  /* Left-aligned links (desktop) */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    font-size: 0.88rem;
    font-weight: 500;
    color: #888888;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 6px;
    transition: color 0.15s;
  }

  .nav-link:hover { color: #444444; }

  .nav-link.active {
    color: #F3B130;
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
    color: #888888;
    text-decoration: none;
    transition: color 0.15s;
  }
  .nav-login:hover { color: #444444; }

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
  .nav-signup:hover { opacity: 0.88; }

  /* Hamburger (mobile only) */
  .nav-hamburger {
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    width: 36px;
    height: 36px;
    color: rgba(255, 255, 255, 0.9);
  }

  .hamburger-line {
    display: block;
    width: 22px;
    height: 2px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 2px;
  }

  .hamburger-close {
    font-size: 1.1rem;
    line-height: 1;
    color: rgba(255, 255, 255, 0.85);
  }

  /* Mobile panel */
  .nav-backdrop {
    position: fixed;
    inset: 64px 0 0 0;
    z-index: 98;
  }

  .nav-panel {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    z-index: 99;
    background: #0a0a0a;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem 2.5rem;
    gap: 0;
  }

  .nav-panel-link {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    padding: 14px 0;
    width: 100%;
    text-align: center;
    transition: color 0.15s;
  }
  .nav-panel-link:hover { color: #ffffff; }
  .nav-panel-link.active { color: #F3B130; }

  .nav-panel-divider {
    width: 40px;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    margin: 8px 0;
  }

  .nav-panel-login {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    text-transform: none;
    letter-spacing: 0;
    color: rgba(255, 255, 255, 0.5);
  }
  .nav-panel-login:hover { color: rgba(255, 255, 255, 0.8); }

  .nav-panel-signup {
    display: block;
    width: 100%;
    margin-top: 12px;
    padding: 14px;
    background: #F3B130;
    color: #111111;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    border-radius: 12px;
    transition: opacity 0.15s;
    touch-action: manipulation;
  }
  .nav-panel-signup:hover { opacity: 0.88; }

  /* Mobile breakpoint */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-desktop-only { display: none; }
    .nav-hamburger { display: flex; }
  }
</style>
