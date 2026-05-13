<script lang="ts">
  export let data;

  const { content: Content, meta } = data;

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function initials(name: string) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  }
</script>

<svelte:head>
  <title>{meta.title} — SQRZ</title>
  <meta name="description" content={meta.description}>
</svelte:head>

<main>
  <div class="container">
    <article class="post">
      <header class="post-hero">
        <a href="/blog" class="back-link">← Journal</a>
        <p class="eyebrow">SQRZ Journal</p>
        <h1>{meta.title}</h1>
        {#if meta.description}
          <p class="post-description">{meta.description}</p>
        {/if}

        <div class="post-meta-row">
          <time datetime={meta.date}>{formatDate(meta.date)}</time>
          {#if meta.author}
            {#if meta.authorSlug}
              <a
                href="https://sqrz.com/{meta.authorSlug}"
                class="author-banner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="author-avatar" aria-hidden="true">{initials(meta.author)}</span>
                <span>{meta.author}</span>
              </a>
            {:else}
              <span class="author-banner">
                <span class="author-avatar" aria-hidden="true">{initials(meta.author)}</span>
                <span>{meta.author}</span>
              </span>
            {/if}
          {/if}
        </div>
      </header>

      <div class="article-shell">
        <aside class="article-rail" aria-label="Article context">
          <span>Field note</span>
          <strong>For independent professionals building booking intent.</strong>
        </aside>

        <div class="post-content">
          <Content />
        </div>
      </div>
    </article>

    <section class="post-cta">
      <div>
        <p class="eyebrow">Put it into practice</p>
        <h2>Build the profile behind the strategy.</h2>
        <p>Turn your services, links, pricing, and booking requests into one focused SQRZ profile.</p>
      </div>
      <a href="https://dashboard.sqrz.com/join">Create profile →</a>
    </section>
  </div>
</main>

<style>
  main {
    background: #f5f0eb;
    min-height: 100vh;
    padding: 128px 0 110px;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Same container as home/grow — left edge aligns across all pages */
  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .post {
    max-width: 100%;
  }

  .back-link {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.38);
    text-decoration: none;
    margin-bottom: 42px;
    transition: color 0.2s;
  }
  .back-link:hover { color: #F5A623; }

  .post-hero {
    max-width: 920px;
    padding-bottom: 56px;
  }

  .eyebrow {
    display: block;
    margin-bottom: 16px;
    color: #F5A623;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  h1 {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(52px, 8vw, 96px);
    line-height: 0.86;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #111111;
  }

  .post-description {
    max-width: 700px;
    margin-top: 26px;
    color: #444444;
    font-size: 1.08rem;
    font-weight: 300;
    line-height: 1.75;
  }

  .post-meta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: 28px;
  }

  .post-meta-row time,
  .author-banner {
    display: inline-flex;
    align-items: center;
    min-height: 38px;
    border: 1px solid rgba(17,17,17,0.1);
    border-radius: 999px;
    padding: 0 13px;
    color: rgba(17,17,17,0.6);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .author-banner {
    gap: 8px;
    letter-spacing: 0;
    text-transform: none;
  }

  .author-avatar {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(245,166,35,0.14);
    color: #F5A623;
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .article-shell {
    display: grid;
    grid-template-columns: 220px minmax(0, 720px);
    gap: 72px;
    align-items: start;
    border-top: 1px solid rgba(17,17,17,0.1);
    padding-top: 56px;
  }

  .article-rail {
    position: sticky;
    top: 110px;
    color: rgba(17,17,17,0.48);
  }

  .article-rail span {
    display: block;
    margin-bottom: 12px;
    color: #F5A623;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .article-rail strong {
    display: block;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.6;
  }

  /* ── PROSE ──────────────────────────────────────────────────────── */
  .post-content {
    min-width: 0;
  }

  .post-content :global(*) {
    max-width: 100%;
  }

  .post-content :global(p) {
    font-size: 1.04rem;
    font-weight: 300;
    line-height: 1.9;
    color: #444444;
    margin-bottom: 24px;
  }

  .post-content :global(p:first-child) {
    color: #222222;
    font-size: 1.14rem;
    line-height: 1.85;
  }

  .post-content :global(h2) {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(30px, 4vw, 44px);
    line-height: 0.95;
    text-transform: uppercase;
    letter-spacing: 0;
    color: #111111;
    margin: 58px 0 18px;
  }

  .post-content :global(h3) {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 1.08rem;
    color: #111111;
    margin: 34px 0 12px;
  }

  .post-content :global(blockquote) {
    margin: 42px 0;
    padding: 28px;
    border-left: 4px solid #F5A623;
    border-radius: 0 8px 8px 0;
    background: rgba(255,255,255,0.36);
  }

  .post-content :global(blockquote p) {
    margin-bottom: 0;
    color: #111111;
    font-family: Impact, sans-serif;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 800;
    line-height: 1;
    text-transform: uppercase;
  }

  .post-content :global(ul) {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 26px;
    padding-left: 4px;
  }

  .post-content :global(ul li) {
    font-size: 1rem;
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
    margin: 48px 0;
  }

  .post-content :global(img),
  .post-content :global(video),
  .post-content :global(iframe) {
    display: block;
    width: 100%;
    border: 0;
    border-radius: 8px;
    margin: 42px 0;
    background: #111111;
  }

  .post-content :global(img),
  .post-content :global(video) {
    height: auto;
  }

  .post-content :global(iframe) {
    aspect-ratio: 16 / 9;
  }

  .post-content :global(figure) {
    margin: 46px 0;
  }

  .post-content :global(figure img),
  .post-content :global(figure video),
  .post-content :global(figure iframe) {
    margin: 0;
  }

  .post-content :global(figcaption) {
    margin-top: 10px;
    color: rgba(17,17,17,0.46);
    font-size: 0.82rem;
    line-height: 1.6;
  }

  .post-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    max-width: 1012px;
    margin-top: 86px;
    padding: 34px;
    border: 1px solid rgba(17,17,17,0.08);
    border-radius: 8px;
    background: rgba(255,255,255,0.34);
  }

  .post-cta h2 {
    margin-top: 10px;
    color: #111111;
    font-family: Impact, sans-serif;
    font-size: clamp(34px, 5vw, 56px);
    font-weight: 800;
    line-height: 0.92;
    text-transform: uppercase;
  }

  .post-cta p:not(.eyebrow) {
    max-width: 520px;
    margin-top: 16px;
    color: #555555;
    font-weight: 300;
    line-height: 1.7;
  }

  .post-cta a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 22px;
    border-radius: 8px;
    background: #F5A623;
    color: #111111;
    font-size: 0.9rem;
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
  }

  /* ── RESPONSIVE ─────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .container { padding: 0 24px; }
    main { padding: 100px 0 72px; }
    h1 { font-size: clamp(44px, 13vw, 68px); }
    .article-shell {
      grid-template-columns: 1fr;
      gap: 34px;
      padding-top: 38px;
    }
    .article-rail {
      position: static;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(17,17,17,0.08);
    }
    .post-hero {
      padding-bottom: 38px;
    }
    .post-cta {
      display: grid;
      padding: 24px;
    }
  }
</style>
