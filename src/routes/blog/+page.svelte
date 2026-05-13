<script lang="ts">
  export let data;

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function initials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
</script>

<svelte:head>
  <title>Blog — SQRZ</title>
  <meta name="description" content="How to grow as a freelance professional, get booked, and build leverage with your audience.">
</svelte:head>

<main>
  <div class="container">

    <header class="page-header">
      <p class="eyebrow">From the team</p>
      <h1>SQRZ <em>Blog</em></h1>
      <p class="subtitle">Insights on growing as an independent professional.</p>
    </header>

    <div class="grid">
      {#each data.posts as post}
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">
              <a href="/blog/{post.slug}" class="card-link">{post.title}</a>
            </h2>
            <p class="card-excerpt">{post.description}</p>
          </div>
          <footer class="card-footer">
            <time class="card-date" datetime={post.date}>{formatDate(post.date)}</time>
            {#if post.authorSlug}
              <a
                href="https://sqrz.com/{post.authorSlug}"
                class="author-banner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="author-avatar" aria-hidden="true">{initials(post.author ?? '')}</div>
                <span class="author-name">{post.author}</span>
              </a>
            {/if}
          </footer>
        </div>
      {/each}
    </div>

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

  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* ── PAGE HEADER ──────────────────────────────────────────────── */
  .page-header {
    margin-bottom: 64px;
    max-width: 760px;
  }

  .eyebrow {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 16px;
    display: block;
  }

  h1 {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(44px, 6vw, 80px);
    line-height: 0.95;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #111111;
    margin-bottom: 20px;
  }

  h1 em {
    font-style: normal;
    color: #F5A623;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 300;
    color: #444444;
    line-height: 1.7;
  }

  /* ── GRID ─────────────────────────────────────────────────────── */
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  /* ── CARD ─────────────────────────────────────────────────────── */
  .card {
    position: relative;
    background: rgba(255, 255, 255, 0.28);
    border: 1px solid rgba(17, 17, 17, 0.08);
    border-radius: 8px;
    padding: 32px 28px 24px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: rgba(245, 166, 35, 0.45);
    box-shadow: 0 18px 42px rgba(17, 17, 17, 0.08), 0 0 0 1px rgba(245, 166, 35, 0.12);
  }

  .card-body {
    flex: 1;
    margin-bottom: 24px;
  }

  /* ── TITLE ────────────────────────────────────────────────────── */
  .card-title {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: clamp(18px, 2vw, 22px);
    line-height: 1.15;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #111111;
    margin-bottom: 16px;
    transition: color 0.2s;
  }

  .card:hover .card-title {
    color: #111111;
  }

  /* Cover-link pattern: title link stretches to fill the whole card */
  .card-link {
    text-decoration: none;
    color: inherit;
  }

  .card-link::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
  }

  /* ── EXCERPT ──────────────────────────────────────────────────── */
  .card-excerpt {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.75;
    color: #555555;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── FOOTER ───────────────────────────────────────────────────── */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-top: 1px solid rgba(17, 17, 17, 0.08);
    padding-top: 16px;
  }

  .card-date {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(245, 166, 35, 0.7);
  }

  /* ── AUTHOR BANNER ────────────────────────────────────────────── */
  .author-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    position: relative;
    z-index: 1;
  }

  .author-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(245, 166, 35, 0.12);
    border: 1px solid rgba(245, 166, 35, 0.25);
    color: #F5A623;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: 'DM Sans', sans-serif;
  }

  .author-name {
    font-size: 0.78rem;
    font-weight: 400;
    color: #111111;
    transition: color 0.2s;
    white-space: nowrap;
  }

  .author-banner:hover .author-name {
    color: #F5A623;
  }

  /* ── RESPONSIVE ───────────────────────────────────────────────── */
  @media (max-width: 700px) {
    main { padding: 100px 0 72px; }
    .container { padding: 0 20px; }
    .grid { grid-template-columns: 1fr; }
    .page-header { margin-bottom: 40px; }
  }
</style>
