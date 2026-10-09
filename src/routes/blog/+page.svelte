<script lang="ts">
  import { locales, normalizeLocale } from '$lib/i18n';

  export let data;

  const posts = data.posts ?? [];
  const locale = normalizeLocale(data.locale);
  const pathPrefix = locales[locale].pathPrefix;
  const dateLocale = locale === 'en' ? 'en-GB' : locale;

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' });
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
  <section class="journal-hero">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">SQRZ Journal</p>
        <h1>
          <span>Notes on</span>
          <em>getting</em>
          <span>booked.</span>
        </h1>
      </div>
      <p class="subtitle">
        Practical writing on positioning, pricing, audience building, and the business systems behind independent professionals.
      </p>
    </div>
  </section>

  <section class="archive-section">
    <div class="container">
    <header class="page-header">
      <p class="eyebrow">Latest field notes</p>
      <h2>Strategy for the independent professional.</h2>
    </header>

    {#if posts.length}
      <div class="grid">
        {#each posts as post}
          <article class="card">
            <div class="card-meta">
              <span>Article</span>
              <time datetime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div class="card-body">
              <h2 class="card-title">
                <a href="{pathPrefix}/blog/{post.slug}" class="card-link">{post.title}</a>
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
          </article>
        {/each}
      </div>
    {:else}
      <div class="empty-editorial">
        <p class="eyebrow">Publishing soon</p>
        <h2>Field notes are being prepared.</h2>
        <p>The first SQRZ articles will appear here as the journal opens up.</p>
      </div>
    {/if}
  </div>
  </section>
</main>

<style>
  main {
    background: #f5f0eb;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .journal-hero {
    position: relative;
    min-height: 88vh;
    padding: 150px 0 96px;
    background:
      linear-gradient(90deg, rgba(5, 5, 5, 0.96) 0%, rgba(5, 5, 5, 0.82) 52%, rgba(5, 5, 5, 0.58) 100%),
      radial-gradient(circle at 78% 26%, rgba(245, 166, 35, 0.16), transparent 35%),
      url('/home-pipeline.avif') center / cover no-repeat;
    overflow: hidden;
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(280px, 0.48fr);
    gap: 64px;
    align-items: end;
    min-height: calc(88vh - 246px);
  }

  .archive-section {
    padding: 94px 0 110px;
    background: #f5f0eb;
  }

  .page-header {
    margin-bottom: 32px;
    max-width: 820px;
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
    font-size: clamp(68px, 10vw, 128px);
    line-height: 0.8;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #ffffff;
  }

  h1 span,
  h1 em {
    display: block;
    font-style: normal;
    color: #F5A623;
  }

  h1 span {
    color: #ffffff;
  }

  .page-header h2,
  .empty-editorial h2 {
    color: #111111;
    font-family: Impact, sans-serif;
    font-size: clamp(40px, 5vw, 68px);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .subtitle {
    max-width: 440px;
    font-size: 1rem;
    font-weight: 300;
    color: rgba(255,255,255,0.62);
    line-height: 1.7;
  }

  .card-meta span,
  .card-meta time {
    color: rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 999px;
    padding: 7px 10px;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .empty-editorial {
    padding: 34px;
    border: 1px solid rgba(17,17,17,0.08);
    border-radius: 8px;
    background: rgba(255,255,255,0.3);
  }

  .empty-editorial p:last-child {
    margin-top: 16px;
    color: #444444;
    line-height: 1.7;
  }

  /* ── GRID ─────────────────────────────────────────────────────── */
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  /* ── CARD ─────────────────────────────────────────────────────── */
  .card {
    position: relative;
    background: rgba(255, 255, 255, 0.22);
    border: 1px solid rgba(17, 17, 17, 0.07);
    border-radius: 8px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: rgba(245, 166, 35, 0.45);
    box-shadow: 0 18px 42px rgba(17, 17, 17, 0.07);
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }

  .card-meta span,
  .card-meta time {
    color: rgba(17,17,17,0.54);
    border-color: rgba(17,17,17,0.1);
    padding: 6px 9px;
  }

  .card-body {
    flex: 1;
    margin-bottom: 24px;
  }

  /* ── TITLE ────────────────────────────────────────────────────── */
  .card-title {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: clamp(22px, 2.4vw, 30px);
    line-height: 0.98;
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
    font-size: 0.88rem;
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
  @media (max-width: 980px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 700px) {
    .container { padding: 0 20px; }
    .journal-hero {
      min-height: 85vh;
      padding: 128px 0 68px;
    }
    .hero-grid {
      grid-template-columns: 1fr;
      display: grid;
      gap: 28px;
      min-height: calc(85vh - 196px);
    }
    h1 { font-size: clamp(58px, 17vw, 82px); }
    .archive-section { padding: 72px 0; }
    .grid { grid-template-columns: 1fr; }
    .page-header { margin-bottom: 28px; }
  }
</style>
