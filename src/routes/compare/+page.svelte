<script>
  import { page } from '$app/state';
  import { getLocaleFromPathname, localizePath } from '$lib/i18n';

  const currentLocale = $derived(getLocaleFromPathname(page.url.pathname));

  function hrefFor(path) {
    return localizePath(path, currentLocale);
  }
</script>

<svelte:head>
  <title>SQRZ vs The Competition — Why Creative Professionals Choose SQRZ</title>
  <meta name="description" content="See how SQRZ compares to every alternative — and why creative professionals choose a system built for real work." />
</svelte:head>

<div class="compare-index">

  <header class="index-hero hero-band">
    <div class="index-container hero-grid">
      <div>
        <p class="eyebrow">Comparisons</p>
        <h1>SQRZ vs The Competition</h1>
      </div>
      <p class="subtitle">See how SQRZ compares to every alternative — and why creative professionals choose a system built for real work.</p>
    </div>
  </header>

  <ul class="compare-grid index-container">

    <li>
      <a href={hrefFor('/compare/sqrz-vs-linktree')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Linktree</span>
        </div>
        <p class="card-desc">Linktree gives you a list of links. SQRZ turns your profile into a booking engine.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href={hrefFor('/compare/sqrz-vs-komi')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Komi</span>
        </div>
        <p class="card-desc">Komi gives you a page. SQRZ gives you a system to get hired, manage budgets, and get paid.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href={hrefFor('/compare/sqrz-vs-website')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Your Own Website</span>
        </div>
        <p class="card-desc">A website looks professional. SQRZ makes you operational — without building anything.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href={hrefFor('/compare/sqrz-vs-agency')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Hiring an Agency</span>
        </div>
        <p class="card-desc">Agencies build things for you. SQRZ lets you run things yourself — without losing power.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href={hrefFor('/compare/sqrz-vs-fiverr-upwork')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Upwork</span>
        </div>
        <p class="card-desc">Marketplaces help you find gigs. SQRZ helps you build a professional career.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href={hrefFor('/compare/sqrz-vs-casting-platforms')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Casting Platforms</span>
        </div>
        <p class="card-desc">Casting platforms help you find opportunities. SQRZ helps you turn them into structured, paid work.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href={hrefFor('/compare/sqrz-vs-onlyfans')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">OnlyFans</span>
        </div>
        <p class="card-desc">OnlyFans helps you earn from an audience. SQRZ helps you get paid for real-world work.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

    <li>
      <a href={hrefFor('/compare/sqrz-vs-beacons')} class="compare-card">
        <div class="card-lockup">
          <span class="card-sqrz">SQRZ</span>
          <span class="card-vs">vs</span>
          <span class="card-competitor">Beacons</span>
        </div>
        <p class="card-desc">Beacons helps you monetize your audience. SQRZ helps you turn your talent into real work.</p>
        <span class="card-cta">Read comparison →</span>
      </a>
    </li>

  </ul>

</div>

<style>
  .compare-index {
    background: #f5f0eb;
    color: #111111;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 96px 0 120px;
    -webkit-font-smoothing: antialiased;
  }

  .index-container {
    width: min(1120px, calc(100% - 80px));
    margin: 0 auto;
  }

  .hero-band {
    background: #080808;
    padding: 72px 0 78px;
    margin-bottom: 48px;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
    gap: 64px;
    align-items: end;
  }

  .eyebrow {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 14px;
    display: block;
  }

  h1 {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(40px, 7vw, 72px);
    text-transform: uppercase;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 0.9;
    margin-bottom: 18px;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 300;
    color: rgba(255,255,255,0.62);
    max-width: 520px;
    line-height: 1.65;
  }

  /* Grid */
  .compare-grid {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .compare-card {
    display: flex;
    flex-direction: column;
    padding: 26px 28px;
    background: rgba(255,255,255,0.5);
    border: 1px solid rgba(17,17,17,0.08);
    border-radius: 8px;
    text-decoration: none;
    height: 100%;
    transition: border-color 0.2s, background 0.2s;
  }
  .compare-card:hover {
    border-color: rgba(245,166,35,0.35);
    background: rgba(255,255,255,0.82);
  }

  .card-lockup {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .card-sqrz {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    color: #F5A623;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-vs {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    color: rgba(17,17,17,0.24);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .card-competitor {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: rgba(17,17,17,0.58);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-desc {
    font-size: 0.85rem;
    font-weight: 300;
    color: rgba(17,17,17,0.58);
    line-height: 1.6;
    margin-bottom: 18px;
    flex: 1;
  }

  .card-cta {
    font-size: 0.8rem;
    font-weight: 500;
    color: #F5A623;
    letter-spacing: 0.02em;
    margin-top: auto;
  }

  @media (max-width: 640px) {
    .compare-index { padding: 80px 0 90px; }
    .index-container { width: calc(100% - 48px); }
    .hero-band { padding: 54px 0 58px; }
    .hero-grid { grid-template-columns: 1fr; gap: 26px; }
    .compare-grid { grid-template-columns: 1fr; }
    .compare-card { padding: 22px 22px; }
  }
</style>
