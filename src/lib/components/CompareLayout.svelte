<script>
  import { page } from '$app/state';
  import { getLocaleFromPathname, localizePath } from '$lib/i18n';

  /**
   * @type {{
   *   competitor: string,
   *   headline: string,
   *   subheadline: string,
   *   coreDifference?: import('svelte').Snippet,
   *   comparisonTable?: import('svelte').Snippet,
   *   deepDive?: import('svelte').Snippet,
   *   cta?: import('svelte').Snippet
   * }}
   */
  let { competitor, headline, subheadline, coreDifference, comparisonTable, deepDive, cta } = $props();

  const currentLocale = $derived(getLocaleFromPathname(page.url.pathname));

  function hrefFor(path) {
    return localizePath(path, currentLocale);
  }
</script>

<div class="compare-page">

  <!-- Breadcrumb -->
  <div class="c-container">
    <nav class="c-breadcrumb" aria-label="Breadcrumb">
      <a href={hrefFor('/compare')}>← All comparisons</a>
    </nav>
  </div>

  <!-- Hero -->
  <header class="c-hero">
    <div class="c-container c-hero-grid">
      <div>
        <div class="c-vs-lockup">
          <span class="c-sqrz-brand">SQRZ</span>
          <span class="c-vs-word">vs</span>
          <span class="c-competitor-brand">{competitor}</span>
        </div>
        <h1 class="c-headline">{headline}</h1>
      </div>
      <div class="c-hero-aside">
        <p class="c-subheadline">{subheadline}</p>
        <a href="https://dashboard.sqrz.com/join" class="c-hero-cta">Create your SQRZ profile →</a>
      </div>
    </div>
  </header>

  <!-- Core Difference ⚔️ -->
  {#if coreDifference}
  <section class="c-section c-container">
    <p class="c-section-label">The Core Difference</p>
    {@render coreDifference()}
  </section>
  {/if}

  <!-- Comparison Table 📊 -->
  {#if comparisonTable}
  <section class="c-section c-container">
    <p class="c-section-label">Feature Comparison</p>
    {@render comparisonTable()}
  </section>
  {/if}

  <!-- Deep Dive 🧠 -->
  {#if deepDive}
  <section class="c-section c-container">
    <p class="c-section-label">Deep Dive</p>
    {@render deepDive()}
  </section>
  {/if}

  <!-- Final CTA ⚡ -->
  {#if cta}
  <section class="c-section c-cta-section c-container">
    <p class="c-section-label">The Bottom Line</p>
    {@render cta()}
  </section>
  {/if}

</div>

<style>
  /* ── PAGE SHELL ─────────────────────────────────────────────────── */
  .compare-page {
    background: #f5f0eb;
    color: #111111;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: 96px 0 120px;
  }

  .c-container {
    width: min(1120px, calc(100% - 80px));
    margin: 0 auto;
  }

  /* ── BREADCRUMB ─────────────────────────────────────────────────── */
  .c-breadcrumb { margin-bottom: 28px; }
  .c-breadcrumb a {
    font-size: 0.8rem;
    color: rgba(17,17,17,0.42);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.2s;
  }
  .c-breadcrumb a:hover { color: #F5A623; }

  /* ── HERO ───────────────────────────────────────────────────────── */
  .c-hero {
    margin-bottom: 44px;
    padding: 72px 0 78px;
    background: #080808;
  }

  .c-hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
    gap: 64px;
    align-items: end;
  }

  .c-vs-lockup {
    display: flex;
    align-items: baseline;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .c-sqrz-brand {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(20px, 3.5vw, 28px);
    color: #F5A623;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .c-vs-word {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: clamp(14px, 2vw, 18px);
    color: rgba(255,255,255,0.28);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  .c-competitor-brand {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: clamp(20px, 3.5vw, 28px);
    color: rgba(255,255,255,0.64);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .c-headline {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 6.5vw, 68px);
    text-transform: uppercase;
    color: #ffffff;
    letter-spacing: -0.01em;
    line-height: 1;
    margin-bottom: 20px;
    max-width: 760px;
  }

  .c-subheadline {
    font-size: 1.05rem;
    font-weight: 300;
    color: rgba(255,255,255,0.52);
    line-height: 1.7;
    max-width: 580px;
    margin-bottom: 28px;
  }

  .c-hero-cta {
    display: inline-block;
    padding: 14px 30px;
    background: #F5A623;
    color: #111111;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 0.92rem;
    border-radius: 999px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .c-hero-cta:hover { opacity: 0.86; }

  /* ── SECTIONS ───────────────────────────────────────────────────── */
  .c-section {
    margin-bottom: 30px;
    padding: 42px;
    border: 1px solid rgba(17,17,17,0.08);
    border-radius: 8px;
    background: rgba(255,255,255,0.5);
  }

  .c-section-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 28px;
    display: block;
  }

  .c-cta-section {
    background: #111111;
    border-color: rgba(245,166,35,0.28);
    margin-top: 28px;
  }
  .c-cta-section .c-section-label {
    color: rgba(245,166,35,0.55);
  }

  /* ── MOBILE ─────────────────────────────────────────────────────── */
  @media (max-width: 640px) {
    .compare-page { padding: 80px 0 90px; }
    .c-container { width: calc(100% - 48px); }
    .c-hero { padding: 54px 0 58px; }
    .c-hero-grid { grid-template-columns: 1fr; gap: 28px; }
    .c-section { padding: 28px 22px; }
  }


  /* ════════════════════════════════════════════════════════════════
     GLOBAL STYLES — used by snippet content passed from child pages
     ════════════════════════════════════════════════════════════════ */

  /* ── CORE DIFFERENCE ──────────────────────────────────────────── */
  :global(.cmp-two-col) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  :global(.cmp-col) {
    background: #f9f5ef;
    border: 1px solid rgba(17,17,17,0.08);
    border-radius: 8px;
    padding: 22px 24px;
  }
  :global(.cmp-col.cmp-col-sqrz) {
    border-color: rgba(245,166,35,0.38);
    background: rgba(245,166,35,0.12);
  }
  :global(.cmp-col-label) {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(17,17,17,0.42);
    margin-bottom: 14px;
    display: block;
  }
  :global(.cmp-col.cmp-col-sqrz .cmp-col-label) {
    color: #F5A623;
  }
  :global(.cmp-col-title) {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(17,17,17,0.62);
    margin-bottom: 16px;
    display: block;
  }
  :global(.cmp-col.cmp-col-sqrz .cmp-col-title) {
    color: #111111;
  }
  :global(.cmp-col-items) {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  :global(.cmp-col-items li) {
    font-size: 0.88rem;
    font-weight: 300;
    color: rgba(17,17,17,0.64);
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
  }
  :global(.cmp-col.cmp-col-sqrz .cmp-col-items li) {
    color: rgba(17,17,17,0.78);
  }
  :global(.cmp-col-items li::before) {
    content: '→';
    position: absolute;
    left: 0;
    color: rgba(17,17,17,0.24);
    font-size: 0.75rem;
  }
  :global(.cmp-col.cmp-col-sqrz .cmp-col-items li::before) {
    color: #F5A623;
  }

  /* ── CALLOUT BOX ─────────────────────────────────────────────── */
  :global(.cmp-callout) {
    border-left: 3px solid #F5A623;
    padding: 14px 20px;
    background: rgba(245,166,35,0.12);
    border-radius: 0 10px 10px 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(17,17,17,0.76);
    line-height: 1.6;
    margin-top: 20px;
  }

  /* ── COMPARISON TABLE ────────────────────────────────────────── */
  :global(.cmp-table-wrap) {
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid rgba(17,17,17,0.08);
    margin-bottom: 16px;
  }
  :global(.cmp-table) {
    width: 100%;
    border-collapse: collapse;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
  }
  :global(.cmp-table thead tr) {
    border-bottom: 1px solid rgba(17,17,17,0.08);
  }
  :global(.cmp-table th) {
    padding: 14px 20px;
    text-align: left;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(17,17,17,0.46);
  }
  :global(.cmp-table th.cmp-th-sqrz) {
    color: #F5A623;
    border-left: 1px solid rgba(245,166,35,0.28);
    border-right: 1px solid rgba(245,166,35,0.28);
    background: rgba(245,166,35,0.12);
  }
  :global(.cmp-table tbody tr) {
    border-bottom: 1px solid rgba(17,17,17,0.06);
  }
  :global(.cmp-table tbody tr:last-child) {
    border-bottom: none;
  }
  :global(.cmp-table td) {
    padding: 13px 20px;
    color: rgba(17,17,17,0.62);
    vertical-align: middle;
    line-height: 1.4;
  }
  :global(.cmp-table td.cmp-td-sqrz) {
    color: #111111;
    text-align: center;
    border-left: 1px solid rgba(245,166,35,0.15);
    border-right: 1px solid rgba(245,166,35,0.15);
    font-size: 1rem;
  }
  :global(.cmp-table td.cmp-td-competitor) {
    text-align: center;
    font-size: 1rem;
  }
  :global(.cmp-table td.cmp-td-feature) {
    font-weight: 400;
    color: rgba(17,17,17,0.76);
  }

  /* ── DEEP DIVE ───────────────────────────────────────────────── */
  :global(.cmp-dive-section) {
    margin-bottom: 44px;
  }
  :global(.cmp-dive-section:last-child) {
    margin-bottom: 0;
  }
  :global(.cmp-dive-h3) {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: 1.35rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #111111;
    margin-bottom: 12px;
  }
  :global(.cmp-dive-p) {
    font-size: 0.93rem;
    font-weight: 300;
    color: rgba(17,17,17,0.62);
    line-height: 1.8;
    margin-bottom: 10px;
  }
  :global(.cmp-dive-p strong) {
    color: rgba(17,17,17,0.84);
    font-weight: 500;
  }
  :global(.cmp-dive-list) {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 12px 0;
    padding-left: 4px;
  }
  :global(.cmp-dive-list li) {
    font-size: 0.88rem;
    font-weight: 300;
    color: rgba(17,17,17,0.62);
    padding-left: 20px;
    position: relative;
    line-height: 1.6;
  }
  :global(.cmp-dive-list li::before) {
    content: '→';
    position: absolute;
    left: 0;
    color: #F5A623;
    font-size: 0.8rem;
  }
  :global(.cmp-quote) {
    font-style: italic;
    color: rgba(17,17,17,0.52);
    font-size: 0.88rem;
    border-left: 2px solid rgba(245,166,35,0.35);
    padding-left: 14px;
    margin: 12px 0;
  }

  /* ── CTA SECTION ─────────────────────────────────────────────── */
  :global(.cmp-cta-text) {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: clamp(22px, 3.5vw, 32px);
    text-transform: uppercase;
    color: #ffffff;
    letter-spacing: 0.02em;
    line-height: 1.2;
    margin-bottom: 12px;
    max-width: 600px;
  }
  :global(.cmp-cta-sub) {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    margin-bottom: 28px;
    max-width: 500px;
  }
  :global(.cmp-cta-btn) {
    display: inline-block;
    padding: 14px 30px;
    background: #F5A623;
    color: #111111;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 0.92rem;
    border-radius: 999px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  :global(.cmp-cta-btn:hover) { opacity: 0.86; }

  /* ── RESPONSIVE ─────────────────────────────────────────────── */
  @media (max-width: 560px) {
    :global(.cmp-two-col) {
      grid-template-columns: 1fr;
    }
  }
</style>
