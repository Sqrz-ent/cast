<script>
  let { children } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── NAV ──────────────────────────────────────────────────────── -->
<nav>
  <a href="/" class="logo">SQRZ</a>
  <div class="nav-links">
    <a href="/grow" class="nav-link">Grow</a>
    <a href="/studio" class="nav-link">Cast</a>
    <a href="/blog" class="nav-link">Blog</a>
    <a href="https://jobs.sqrz.com" class="nav-link">Jobs</a>
  </div>
  <div class="nav-actions">
    <a href="/login" class="btn-ghost">Log In</a>
    <a href="/signup" class="btn-primary">Join SQRZ</a>
  </div>
</nav>

<!-- ── CONTENT ───────────────────────────────────────────────────── -->
<main>
  <div class="container">
    {@render children()}
  </div>
</main>

<!-- ── FOOTER ────────────────────────────────────────────────────── -->
<footer>
  <div class="footer-container footer-inner">
    <a href="/" class="footer-logo">SQRZ</a>
    <nav class="footer-nav">
      <a href="/studio">Cast</a>
      <a href="/grow">Grow</a>
      <a href="/blog">Blog</a>
      <a href="https://jobs.sqrz.com">Jobs</a>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/cookies">Cookies</a>
    </nav>
    <p class="footer-copy">© {new Date().getFullYear()} SQRZ Enterprises Inc.</p>
  </div>
</footer>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) {
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
    color: #111111;
    -webkit-font-smoothing: antialiased;
  }

  :global(:root) {
    --accent:      #F5A623;
    --dark:        #111111;
    --light:       #F5F5F5;
    --white:       #ffffff;
    --mid:         rgba(255,255,255,0.55);
    --muted:       rgba(255,255,255,0.28);
    --radius-btn:  999px;
  }

  /* ── NAV ──────────────────────────────────────────────────────── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 64px;
    background: rgba(17,17,17,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: 0.06em;
    color: var(--accent);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 32px;
  }

  .nav-link {
    font-size: 0.82rem;
    color: var(--mid);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.2s;
  }
  .nav-link:hover { color: var(--white); }

  .nav-actions { display: flex; align-items: center; gap: 12px; }

  .btn-primary {
    background: var(--accent);
    color: var(--dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    border: none;
    border-radius: var(--radius-btn);
    padding: 10px 22px;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s;
    display: inline-block;
  }
  .btn-primary:hover { opacity: 0.88; }

  .btn-ghost {
    background: transparent;
    color: var(--mid);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-btn);
    padding: 10px 22px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    display: inline-block;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: var(--white); }

  /* ── MAIN ─────────────────────────────────────────────────────── */
  main {
    padding: 120px 0 100px;
    min-height: 100vh;
    background: #ffffff;
  }

  .container {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* ── LEGAL TYPOGRAPHY (consumed by child pages) ───────────────── */
  :global(.legal-page h1) {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(40px, 6vw, 64px);
    text-transform: uppercase;
    color: var(--accent);
    letter-spacing: -0.01em;
    line-height: 1;
    margin-bottom: 12px;
  }

  :global(.legal-page .last-updated) {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 48px;
    display: block;
  }

  :global(.legal-page h2) {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--dark);
    margin: 48px 0 16px;
  }

  :global(.legal-page h3) {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: var(--dark);
    margin: 28px 0 10px;
  }

  :global(.legal-page p) {
    font-size: 0.95rem;
    font-weight: 300;
    line-height: 1.85;
    color: #444;
    margin-bottom: 16px;
  }

  :global(.legal-page ul) {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    padding-left: 4px;
  }

  :global(.legal-page ul li) {
    font-size: 0.92rem;
    font-weight: 300;
    color: #444;
    line-height: 1.7;
    padding-left: 20px;
    position: relative;
  }

  :global(.legal-page ul li::before) {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 0.8rem;
  }

  :global(.legal-page a) {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid rgba(245,166,35,0.3);
    transition: border-color 0.2s;
  }
  :global(.legal-page a:hover) { border-color: var(--accent); }

  :global(.legal-page hr) {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.08);
    margin: 40px 0;
  }

  /* ── FOOTER ───────────────────────────────────────────────────── */
  footer {
    background: #111111;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 48px 0;
  }

  .footer-container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .footer-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: 0.08em;
    color: var(--accent);
    text-decoration: none;
  }

  .footer-nav { display: flex; gap: 24px; flex-wrap: wrap; }
  .footer-nav a {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.3);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-nav a:hover { color: #ffffff; }

  .footer-copy { font-size: 0.72rem; color: rgba(255,255,255,0.18); }

  /* ── RESPONSIVE ───────────────────────────────────────────────── */
  @media (max-width: 900px) {
    nav { padding: 0 20px; }
    .nav-links { display: none; }
    .container { padding: 0 24px; }
    .footer-container { padding: 0 24px; }
    main { padding: 100px 0 72px; }
  }
</style>
