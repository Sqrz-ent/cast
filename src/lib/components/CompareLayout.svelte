<script>
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
</script>

<div class="compare-page">

  <!-- Breadcrumb -->
  <nav class="c-breadcrumb" aria-label="Breadcrumb">
    <a href="/compare">← All comparisons</a>
  </nav>

  <!-- Hero -->
  <header class="c-hero">
    <div class="c-vs-lockup">
      <span class="c-sqrz-brand">SQRZ</span>
      <span class="c-vs-word">vs</span>
      <span class="c-competitor-brand">{competitor}</span>
    </div>
    <h1 class="c-headline">{headline}</h1>
    <p class="c-subheadline">{subheadline}</p>
    <a href="https://dashboard.sqrz.com/join" class="c-hero-cta">Create your SQRZ profile →</a>
  </header>

  <!-- Core Difference ⚔️ -->
  {#if coreDifference}
  <section class="c-section">
    <p class="c-section-label"><span class="c-section-icon">⚔️</span> The Core Difference</p>
    {@render coreDifference()}
  </section>
  {/if}

  <!-- Comparison Table 📊 -->
  {#if comparisonTable}
  <section class="c-section">
    <p class="c-section-label"><span class="c-section-icon">📊</span> Feature Comparison</p>
    {@render comparisonTable()}
  </section>
  {/if}

  <!-- Deep Dive 🧠 -->
  {#if deepDive}
  <section class="c-section">
    <p class="c-section-label"><span class="c-section-icon">🧠</span> Deep Dive</p>
    {@render deepDive()}
  </section>
  {/if}

  <!-- Final CTA ⚡ -->
  {#if cta}
  <section class="c-section c-cta-section">
    <p class="c-section-label"><span class="c-section-icon">⚡</span> The Bottom Line</p>
    {@render cta()}
  </section>
  {/if}

</div>

<style>
  /* ── PAGE SHELL ─────────────────────────────────────────────────── */
  .compare-page {
    background: #0a0a0a;
    color: #f5f5f5;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: 100px 40px 140px;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── BREADCRUMB ─────────────────────────────────────────────────── */
  .c-breadcrumb { margin-bottom: 52px; }
  .c-breadcrumb a {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.32);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.2s;
  }
  .c-breadcrumb a:hover { color: #F5A623; }

  /* ── HERO ───────────────────────────────────────────────────────── */
  .c-hero { margin-bottom: 80px; }

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
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  .c-competitor-brand {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: clamp(20px, 3.5vw, 28px);
    color: rgba(255,255,255,0.38);
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
    max-width: 720px;
  }

  .c-subheadline {
    font-size: 1.05rem;
    font-weight: 300;
    color: rgba(255,255,255,0.52);
    line-height: 1.7;
    max-width: 580px;
    margin-bottom: 32px;
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
    margin-bottom: 80px;
    padding-top: 56px;
    border-top: 1px solid rgba(255,255,255,0.07);
  }

  .c-section-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .c-section-icon { font-size: 0.9rem; }

  .c-cta-section {
    background: rgba(245,166,35,0.04);
    border: 1px solid rgba(245,166,35,0.15);
    border-radius: 20px;
    padding: 48px 40px;
    margin-top: 0;
  }
  .c-cta-section .c-section-label {
    color: rgba(245,166,35,0.55);
  }

  /* ── MOBILE ─────────────────────────────────────────────────────── */
  @media (max-width: 640px) {
    .compare-page { padding: 80px 24px 100px; }
    .c-cta-section { padding: 36px 24px; }
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
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 22px 24px;
  }
  :global(.cmp-col.cmp-col-sqrz) {
    border-color: rgba(245,166,35,0.25);
    background: rgba(245,166,35,0.04);
  }
  :global(.cmp-col-label) {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
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
    color: rgba(255,255,255,0.5);
    margin-bottom: 16px;
    display: block;
  }
  :global(.cmp-col.cmp-col-sqrz .cmp-col-title) {
    color: #ffffff;
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
    color: rgba(255,255,255,0.42);
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
  }
  :global(.cmp-col.cmp-col-sqrz .cmp-col-items li) {
    color: rgba(255,255,255,0.72);
  }
  :global(.cmp-col-items li::before) {
    content: '→';
    position: absolute;
    left: 0;
    color: rgba(255,255,255,0.2);
    font-size: 0.75rem;
  }
  :global(.cmp-col.cmp-col-sqrz .cmp-col-items li::before) {
    color: #F5A623;
  }

  /* ── CALLOUT BOX ─────────────────────────────────────────────── */
  :global(.cmp-callout) {
    border-left: 3px solid #F5A623;
    padding: 14px 20px;
    background: rgba(245,166,35,0.06);
    border-radius: 0 10px 10px 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    line-height: 1.6;
    margin-top: 20px;
  }

  /* ── COMPARISON TABLE ────────────────────────────────────────── */
  :global(.cmp-table-wrap) {
    overflow-x: auto;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 16px;
  }
  :global(.cmp-table) {
    width: 100%;
    border-collapse: collapse;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
  }
  :global(.cmp-table thead tr) {
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  :global(.cmp-table th) {
    padding: 14px 20px;
    text-align: left;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  :global(.cmp-table th.cmp-th-sqrz) {
    color: #F5A623;
    border-left: 1px solid rgba(245,166,35,0.2);
    border-right: 1px solid rgba(245,166,35,0.2);
    background: rgba(245,166,35,0.05);
  }
  :global(.cmp-table tbody tr) {
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  :global(.cmp-table tbody tr:last-child) {
    border-bottom: none;
  }
  :global(.cmp-table td) {
    padding: 13px 20px;
    color: rgba(255,255,255,0.55);
    vertical-align: middle;
    line-height: 1.4;
  }
  :global(.cmp-table td.cmp-td-sqrz) {
    color: #ffffff;
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
    color: rgba(255,255,255,0.7);
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
    color: #ffffff;
    margin-bottom: 12px;
  }
  :global(.cmp-dive-p) {
    font-size: 0.93rem;
    font-weight: 300;
    color: rgba(255,255,255,0.52);
    line-height: 1.8;
    margin-bottom: 10px;
  }
  :global(.cmp-dive-p strong) {
    color: rgba(255,255,255,0.8);
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
    color: rgba(255,255,255,0.48);
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
    color: rgba(255,255,255,0.38);
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
