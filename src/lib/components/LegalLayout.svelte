<script>
  let { children } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── CONTENT ───────────────────────────────────────────────────── -->
<main>
  <div class="container">
    {@render children()}
  </div>
</main>


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


  /* ── MAIN ─────────────────────────────────────────────────────── */
  main {
    padding: 80px 0 100px;
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


  /* ── RESPONSIVE ───────────────────────────────────────────────── */
  @media (max-width: 900px) {
    nav { padding: 0 20px; }
    .nav-links { display: none; }
    .container { padding: 0 24px; }
    .footer-container { padding: 0 24px; }
    main { padding: 100px 0 72px; }
  }
</style>
