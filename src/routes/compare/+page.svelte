<svelte:head>
  <title>SQRZ Comparisons — How SQRZ stacks up against alternatives</title>
  <meta name="description" content="See how SQRZ compares to other creator platforms. Honest side-by-side breakdowns for professionals who take their work seriously." />
</svelte:head>

<div class="compare-index">

  <header class="index-hero">
    <p class="eyebrow">Comparisons</p>
    <h1>How SQRZ stacks up</h1>
    <p class="subtitle">Honest breakdowns for creators who want more than a link page.</p>
  </header>

  <ul class="compare-list">

    <li>
      <a href="/compare/sqrz-vs-linktree" class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Linktree</span>
        </div>
        <p class="card-desc">The most-used link-in-bio tool — but does it meet the needs of serious creators?</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href="/compare/sqrz-vs-komi" class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Komi</span>
        </div>
        <p class="card-desc">Komi targets creators and talent — here's how the two platforms differ.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

  </ul>

</div>

<style>
  .compare-index {
    background: #111111;
    color: #f5f5f5;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 100px 40px 120px;
    max-width: 860px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
  }

  /* Hero */
  .index-hero {
    margin-bottom: 64px;
  }

  .eyebrow {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 14px;
  }

  h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(40px, 7vw, 72px);
    text-transform: uppercase;
    color: #ffffff;
    letter-spacing: 0.02em;
    line-height: 1;
    margin-bottom: 16px;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    max-width: 480px;
    line-height: 1.6;
  }

  /* Cards */
  .compare-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .compare-card {
    display: block;
    padding: 28px 32px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .compare-card:hover {
    border-color: rgba(245,166,35,0.4);
    background: rgba(245,166,35,0.04);
  }

  .card-lockup {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .card-sqrz {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.6rem;
    color: #F5A623;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .card-vs {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .card-competitor {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.6rem;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .card-desc {
    font-size: 0.88rem;
    font-weight: 300;
    color: rgba(255,255,255,0.38);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .card-cta {
    font-size: 0.82rem;
    font-weight: 500;
    color: #F5A623;
    letter-spacing: 0.02em;
  }

  @media (max-width: 640px) {
    .compare-index {
      padding: 80px 24px 80px;
    }
    .compare-card {
      padding: 22px 24px;
    }
  }
</style>
