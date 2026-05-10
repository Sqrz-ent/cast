<script lang="ts">
  export let data;

  const { content: Content, meta } = data;
</script>

<svelte:head>
  <title>{meta.title} — SQRZ</title>
  <meta name="description" content={meta.description}>
</svelte:head>

<main>
  <div class="container">
    <article class="post">
      <a href="/blog" class="back-link">← Blog</a>
      <h1>{meta.title}</h1>
      <span class="post-date">{new Date(meta.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      <div class="post-content">
        <Content />
      </div>
    </article>
  </div>
</main>

<style>
  main {
    background: #f5f0eb;
    min-height: 100vh;
    padding: 120px 0 100px;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Same container as home/grow — left edge aligns across all pages */
  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* Article constrained to readable width, left-anchored (no margin auto) */
  .post {
    max-width: 720px;
  }

  .back-link {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.38);
    text-decoration: none;
    margin-bottom: 40px;
    transition: color 0.2s;
  }
  .back-link:hover { color: #F5A623; }

  h1 {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(32px, 5vw, 56px);
    line-height: 1.0;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: #111111;
    margin-bottom: 12px;
  }

  .post-date {
    display: block;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 48px;
  }

  /* ── PROSE ──────────────────────────────────────────────────────── */
  .post-content :global(p) {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.85;
    color: #444444;
    margin-bottom: 20px;
  }

  .post-content :global(h2) {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #111111;
    margin: 48px 0 16px;
  }

  .post-content :global(h3) {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: #111111;
    margin: 28px 0 10px;
  }

  .post-content :global(ul) {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    padding-left: 4px;
  }

  .post-content :global(ul li) {
    font-size: 0.95rem;
    font-weight: 300;
    color: #444444;
    line-height: 1.7;
    padding-left: 20px;
    position: relative;
  }

  .post-content :global(ul li::before) {
    content: '→';
    position: absolute;
    left: 0;
    color: #F5A623;
    font-size: 0.8rem;
  }

  .post-content :global(a) {
    color: #F5A623;
    text-decoration: none;
    border-bottom: 1px solid rgba(245, 166, 35, 0.3);
    transition: border-color 0.2s;
  }
  .post-content :global(a:hover) { border-color: #F5A623; }

  .post-content :global(hr) {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    margin: 40px 0;
  }

  /* ── RESPONSIVE ─────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .container { padding: 0 24px; }
    main { padding: 100px 0 72px; }
  }
</style>
