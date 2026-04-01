<script>
  /** @type {{ competitor: string, competitorUrl: string, children: import('svelte').Snippet }} */
  let { competitor, competitorUrl, children } = $props();
</script>

<svelte:head>
  <title>SQRZ vs {competitor} — Which is right for creators?</title>
  <meta name="description" content="Compare SQRZ and {competitor} side by side. See which platform is the better fit for professional creators, artists, and performers." />
</svelte:head>

<div class="compare-page">

  <!-- Breadcrumb -->
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/compare">← All comparisons</a>
  </nav>

  <!-- Hero -->
  <header class="compare-hero">
    <div class="vs-lockup">
      <span class="brand-sqrz">SQRZ</span>
      <span class="vs-divider">vs</span>
      <a href={competitorUrl} target="_blank" rel="noopener noreferrer" class="brand-competitor">{competitor}</a>
    </div>
    <p class="hero-sub">Which platform is the better fit for professional creators?</p>
  </header>

  <!-- Slot for page-specific content -->
  <div class="compare-content">
    {@render children()}
  </div>

  <!-- CTA -->
  <section class="compare-cta">
    <h2>Ready to try SQRZ?</h2>
    <p>Create your profile in minutes — no credit card required.</p>
    <a href="https://dashboard.sqrz.com/join" class="cta-btn">Get started free →</a>
  </section>

</div>

<style>
  .compare-page {
    background: #111111;
    color: #f5f5f5;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 100px 40px 120px;
    max-width: 860px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
  }

  /* Breadcrumb */
  .breadcrumb {
    margin-bottom: 48px;
  }
  .breadcrumb a {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.38);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.2s;
  }
  .breadcrumb a:hover { color: #F5A623; }

  /* Hero */
  .compare-hero {
    margin-bottom: 72px;
  }

  .vs-lockup {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .brand-sqrz {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 8vw, 80px);
    color: #F5A623;
    letter-spacing: 0.04em;
    line-height: 1;
    text-transform: uppercase;
  }

  .vs-divider {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: clamp(24px, 4vw, 40px);
    color: rgba(255,255,255,0.22);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .brand-competitor {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 8vw, 80px);
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.04em;
    line-height: 1;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.2s;
  }
  .brand-competitor:hover { color: rgba(255,255,255,0.8); }

  .hero-sub {
    font-size: 1.05rem;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    max-width: 520px;
  }

  /* Content slot */
  .compare-content {
    margin-bottom: 80px;
  }

  /* CTA */
  .compare-cta {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 64px;
    text-align: center;
  }

  .compare-cta h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(32px, 5vw, 52px);
    text-transform: uppercase;
    color: #ffffff;
    letter-spacing: 0.02em;
    margin-bottom: 12px;
  }

  .compare-cta p {
    font-size: 0.95rem;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    margin-bottom: 28px;
  }

  .cta-btn {
    display: inline-block;
    padding: 14px 32px;
    background: #F5A623;
    color: #111111;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    border-radius: 999px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .cta-btn:hover { opacity: 0.88; }

  @media (max-width: 640px) {
    .compare-page {
      padding: 80px 24px 80px;
    }
    .vs-lockup {
      gap: 12px;
    }
  }
</style>
