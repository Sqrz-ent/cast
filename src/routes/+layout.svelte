<script>
  import favicon from '$lib/assets/favicon.svg';
  import Analytics from '$lib/Analytics.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import { page } from '$app/state';
  let { children } = $props();

  const standaloneRoutes = ['/studio'];
  const isStandalone = $derived(standaloneRoutes.some(r => page.route.id === r || (page.route.id?.startsWith(r + '/') ?? false)));
</script>

<Analytics />

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

{#if !isStandalone}<Nav />{/if}
{@render children()}

<!-- ── FOOTER ────────────────────────────────────────────────────── -->
{#if !isStandalone}
<footer>
  <div class="footer-top">
    <div class="footer-container">

      <!-- Left — Brand -->
      <div class="footer-col footer-brand">
        <a href="/" class="footer-logo">SQRZ</a>
        <p class="footer-tagline">The LinkInBio that gets you booked.</p>
        <p class="footer-address">
          © 2025 SQRZ Enterprises, Inc.<br>
          1250 Broadway, 10001 NY, US
        </p>
      </div>

      <!-- Platform -->
      <div class="footer-col">
        <p class="footer-col-heading">Platform</p>
        <ul class="footer-links">
          <li><a href="/">SQRZ</a></li>
          <li><a href="/grow">Grow</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/studio" data-sveltekit-preload-data="off">Studio</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div class="footer-col">
        <p class="footer-col-heading">Legal</p>
        <ul class="footer-links">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/impressum">Impressum</a></li>
          <li><a href="/terms">Terms &amp; Conditions</a></li>
          <li><a href="/cookies">Cookie Policy</a></li>
          <li><a href="https://dashboard.sqrz.com">Dashboard</a></li>
        </ul>
      </div>

      <!-- Compare — col 1 -->
      <div class="footer-col">
        <p class="footer-col-heading">Compare</p>
        <ul class="footer-links">
          <li><a href="/compare/sqrz-vs-linktree">SQRZ vs Linktree</a></li>
          <li><a href="/compare/sqrz-vs-komi">SQRZ vs Komi</a></li>
          <li><a href="/compare/sqrz-vs-website">SQRZ vs Your Website</a></li>
          <li><a href="/compare/sqrz-vs-agency">SQRZ vs Agency</a></li>
        </ul>
      </div>

      <!-- Compare — col 2 -->
      <div class="footer-col">
        <p class="footer-col-heading footer-col-heading-spacer" aria-hidden="true">&nbsp;</p>
        <ul class="footer-links">
          <li><a href="/compare/sqrz-vs-fiverr-upwork">SQRZ vs Upwork</a></li>
          <li><a href="/compare/sqrz-vs-beacons">SQRZ vs Beacons</a></li>
          <li><a href="/compare/sqrz-vs-casting-platforms">SQRZ vs Casting Apps</a></li>
        </ul>
      </div>

    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 SQRZ Enterprises, Inc. All rights reserved.</p>
  </div>
</footer>
{/if}

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html, body) { max-width: 100%; overflow-x: hidden; }

  footer {
    background: #111111;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .footer-top {
    padding: 80px 0 64px;
  }

  .footer-container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 48px;
  }

  /* Brand column */
  .footer-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 2rem;
    letter-spacing: 0.06em;
    color: #F5A623;
    text-decoration: none;
    display: block;
    margin-bottom: 16px;
  }

  .footer-tagline {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .footer-address {
    font-size: 0.78rem;
    font-weight: 300;
    color: rgba(255,255,255,0.28);
    line-height: 1.8;
  }

  /* Nav columns */
  .footer-col-heading {
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 20px;
  }

  .footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-links a {
    font-size: 0.88rem;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: #ffffff; }

  /* Bottom bar */
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 20px 40px;
    text-align: center;
  }

  .footer-bottom p {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.18);
  }

  .footer-col-heading-spacer {
    visibility: hidden;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .footer-container {
      grid-template-columns: 2fr 1fr 1fr;
      gap: 40px;
    }
  }

  @media (max-width: 860px) {
    .footer-container {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 0 24px;
    }
    .footer-brand {
      grid-column: 1 / -1;
    }
    .footer-col-heading-spacer {
      display: none;
    }
    .footer-top { padding: 60px 0 48px; }
    .footer-bottom { padding: 20px 24px; }
  }

  @media (max-width: 480px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
</style>
