<script>
  import ComparisonTable from '$lib/components/ComparisonTable.svelte';
  import FAQ from '$lib/components/FAQ.svelte';

  const workflowSteps = [
    {
      step: '01',
      title: 'Diagnose',
      body: 'Profile, offer, audience, funnel, and budget readiness are reviewed before spend begins.',
    },
    {
      step: '02',
      title: 'Plan',
      body: 'We define the campaign angle, audience pools, creative direction, and conversion path.',
    },
    {
      step: '03',
      title: 'Activate',
      body: 'Campaigns are launched manually, monitored closely, and connected back to your SQRZ profile.',
    },
    {
      step: '04',
      title: 'Refine',
      body: 'Signals from traffic, profile behavior, and booking intent guide the next campaign cycle.',
    },
  ];

  const scopeItems = [
    'Growth audit and campaign direction',
    'Audience and retargeting structure',
    'Budget allocation guidance',
    'Profile conversion recommendations',
    'Performance review and decision notes',
    'Next-cycle refinement roadmap',
  ];

  const qualificationItems = [
    'You already use SQRZ as your conversion surface',
    'Your offer, pricing, or booking path is ready to be tested',
    'You can invest meaningful paid media budget for at least one cycle',
    'You want hands-on growth support, not another software dashboard',
  ];
</script>

<svelte:head>
  <title>SQRZ Grow — Turn Attention Into Demand</title>
  <meta name="description" content="A growth infrastructure for independent professionals who want predictable leverage — not random exposure.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── HERO ──────────────────────────────────────────────────────── -->
<section class="grow-hero">
  <div class="grow-hero-bg"></div>
  <div class="grow-hero-shade"></div>
  <div class="container grow-hero-inner">
    <div class="grow-hero-copy">
      <p class="section-tag section-tag--left">SQRZ Grow</p>
      <h1 class="grow-headline">
        Managed<br><em>growth</em><br>
        for emerging<br>Professionals
      </h1>
      <p class="grow-subhead">
        A hands-on growth workflow for professionals ready to invest in paid demand, sharper positioning, and better conversion through their SQRZ profile.
      </p>
      <div class="hero-actions">
        <a href="#pricing" class="btn-primary btn-lg">Apply to Grow →</a>
        <span class="hero-note">Manual strategy, campaign cycles, and refinement.</span>
      </div>
    </div>

    <aside class="hero-brief" aria-label="Grow program summary">
      <div class="brief-header">
        <span>Managed workflow</span>
        <strong>High-budget growth desk</strong>
      </div>
      <div class="brief-grid">
        <div>
          <span class="brief-label">Entry budget</span>
          <strong>$1,000+</strong>
        </div>
        <div>
          <span class="brief-label">Model</span>
          <strong>Manual</strong>
        </div>
        <div>
          <span class="brief-label">Cadence</span>
          <strong>Cycles</strong>
        </div>
        <div>
          <span class="brief-label">Surface</span>
          <strong>SQRZ</strong>
        </div>
      </div>
      <div class="brief-flow">
        <span>Audit</span>
        <span>Plan</span>
        <span>Launch</span>
        <span>Refine</span>
      </div>
    </aside>
  </div>
</section>

<!-- ── POSITIONING ──────────────────────────────────────────────── -->
<section class="intro-section light">
  <div class="container intro-premium">
    <div>
      <p class="section-tag section-tag--left">What Grow Is</p>
      <h2 class="section-headline">A managed operating layer<br><em>around your profile.</em></h2>
    </div>
    <div class="intro-copy">
      <p class="body-text">
        Grow is for SQRZ users who already have something worth promoting and want a structured way to turn paid attention into qualified demand.
      </p>
      <p class="body-text">
        It is not a self-serve feature bundle. The value is the manual workflow: campaign direction, budget decisions, profile refinement, and repeated review of real signals.
      </p>
    </div>
  </div>
</section>

<!-- ── WORKFLOW ─────────────────────────────────────────────────── -->
<section class="workflow-section">
  <div class="container">
    <div class="section-row">
      <div>
        <p class="section-tag section-tag--left">The Workflow</p>
        <h2 class="section-headline light-text">How managed growth<br><em>moves through cycles.</em></h2>
      </div>
      <p class="section-kicker">
        Every cycle creates decisions: what audience responds, where intent appears, and what should be changed before the next round of spend.
      </p>
    </div>

    <div class="workflow-grid">
      {#each workflowSteps as item}
        <article class="workflow-step">
          <span class="step-index">{item.step}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- ── SCOPE ────────────────────────────────────────────────────── -->
<section class="scope-section">
  <div class="container scope-inner">
    <div class="scope-panel">
      <p class="section-tag section-tag--left">What We Manage</p>
      <h2 class="section-headline">A premium service layer,<br><em>not a dashboard.</em></h2>
      <p class="body-text">
        The page should make the manual nature feel intentional. Grow is the team thinking through your campaign mechanics, your SQRZ profile, and the quality of demand your budget is buying.
      </p>
    </div>

    <div class="scope-list" aria-label="Grow service scope">
      {#each scopeItems as item}
        <div class="scope-item">
          <span>✓</span>
          <p>{item}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── QUALIFICATION ────────────────────────────────────────────── -->
<section class="qualification-section">
  <div class="container qualification-inner">
    <div class="qualification-copy">
      <p class="section-tag section-tag--left">Who It Is For</p>
      <h2 class="section-headline light-text">Built for users<br><em>ready to spend.</em></h2>
      <p class="section-kicker">
        Grow should feel selective. The more clearly the page explains readiness, the more premium the application step becomes.
      </p>
    </div>
    <div class="qualification-list">
      {#each qualificationItems as item}
        <div class="qualification-item">{item}</div>
      {/each}
    </div>
  </div>
</section>

<ComparisonTable />

<FAQ />


<!-- ── PRICING ───────────────────────────────────────────────────── -->
<section class="pricing-section light" id="pricing">
  <div class="container">
    <p class="section-tag">Pricing</p>
    <h2 class="section-headline light-text centered">Simple,<br><em>performance-based</em></h2>

    <div class="pricing-single">
      <div class="pricing-card featured">
        <div class="plan-tier">GROW</div>
        <div class="plan-price">
          <span class="price-amount">20%</span>
          <span class="price-period">/campaign management fee</span>
        </div>
        <p class="plan-subtext">Starting at $1,000 ad budget</p>
        <ul class="plan-features">
          {#each [
            "Continuous campaign cycles (define → activate → refine)",
            "Active audience building & retargeting",
            "Data-driven decision support based on real performance signals",
            "Conversion-focused refinement of your SQRZ profile",
          ] as f}
            <li><span class="feat-check">✓</span>{f}</li>
          {/each}
        </ul>
        <a href="https://meetings.hubspot.com/willvilla/sqrz-grow-discovery-call" target="_blank" rel="noopener noreferrer" class="btn-primary btn-full">Apply to Grow →</a>
      </div>
    </div>


  </div>
</section>

<style>
  /* ── RESET & BASE ───────────────────────────────────────────────── */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) {
    font-family: 'DM Sans', sans-serif;
    background: #111111;
    color: #111111;
    -webkit-font-smoothing: antialiased;
  }

  /* ── TOKENS ─────────────────────────────────────────────────────── */
  :global(:root) {
    --accent:       #F5A623;
    --accent-dim:   rgba(245,166,35,0.25);
    --dark:         #111111;
    --dark-2:       #1a1a1a;
    --dark-3:       #242424;
    --light:        #f5f0eb;
    --white:        #ffffff;
    --mid:          rgba(255,255,255,0.55);
    --muted:        rgba(255,255,255,0.28);
    --border-dark:  rgba(245,166,35,0.25);
    --radius-card:  12px;
    --radius-btn:   999px;
  }

  /* ── LAYOUT ─────────────────────────────────────────────────────── */
  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }


  /* ── BUTTONS ────────────────────────────────────────────────────── */
  .btn-primary {
    background: var(--accent);
    color: var(--dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    border: none;
    border-radius: var(--radius-btn);
    padding: 10px 22px;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.15s;
    display: inline-block;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

  .btn-ghost {
    background: transparent;
    color: var(--mid);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-btn);
    padding: 10px 22px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    display: inline-block;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: var(--white); }

  .btn-outline-accent {
    background: transparent;
    color: var(--accent);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1.5px solid var(--accent);
    border-radius: var(--radius-btn);
    padding: 12px 28px;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    display: inline-block;
    text-align: center;
  }
  .btn-outline-accent:hover { background: var(--accent); color: var(--dark); }

  .btn-lg { padding: 14px 32px; font-size: 0.92rem; }
  .btn-full { width: 100%; text-align: center; margin-top: auto; }

  /* ── TYPOGRAPHY ─────────────────────────────────────────────────── */
  .display-headline {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(52px, 7vw, 96px);
    line-height: 0.95;
    letter-spacing: -0.01em;
    color: var(--white);
    text-transform: uppercase;
  }
  .display-headline em { font-style: normal; color: var(--accent); }

  .section-headline {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 5vw, 60px);
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: var(--dark);
    text-transform: uppercase;
    margin: 8px 0 24px;
  }
  .section-headline em { font-style: normal; color: var(--accent); }
  .section-headline.light-text { color: var(--white); }
  .section-headline.centered { text-align: center; }

  .eyebrow {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    display: block;
  }

  .eyebrow-light {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    display: block;
  }

  .section-tag {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    text-align: center;
    display: block;
    margin-bottom: 16px;
  }
  .section-tag.dark-tag { text-align: left; }
  .section-tag--left { text-align: left; }

  .body-text {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8;
    color: #444444;
    margin-bottom: 20px;
  }

  /* ── GROW HERO ────────────────────────────────────────────────────── */
  .grow-hero {
    position: relative;
    min-height: 88vh;
    padding: 148px 0 88px;
    background: #0a0a0a;
    overflow: hidden;
  }

  .grow-hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('/_grow_bg_02.png');
    background-size: cover;
    background-position: center;
    opacity: 0.24;
    transform: scale(1.02);
  }

  .grow-hero-shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(10, 10, 10, 0.96) 0%, rgba(10, 10, 10, 0.82) 48%, rgba(10, 10, 10, 0.58) 100%),
      radial-gradient(circle at 78% 28%, rgba(245, 166, 35, 0.16), transparent 34%);
  }

  .grow-hero-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) 420px;
    gap: 72px;
    align-items: center;
  }

  .grow-hero-copy {
    max-width: 720px;
  }

  .grow-headline {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(56px, 7vw, 104px);
    line-height: 0.80;
    letter-spacing: 0;
    color: var(--white);
    text-transform: uppercase;
    margin: 0 0 28px;
  }

  .grow-headline em {
    color: var(--accent);
    font-style: normal;
  }

  .grow-subhead {
    max-width: 560px;
    color: rgba(255, 255, 255, 0.64);
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.8;
    margin-bottom: 36px;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
  }

  .hero-note {
    color: rgba(255, 255, 255, 0.38);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .hero-brief {
    border: 1px solid rgba(245, 166, 35, 0.34);
    border-radius: 8px;
    background: rgba(12, 12, 12, 0.82);
    backdrop-filter: blur(12px);
    padding: 28px;
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.38);
  }

  .brief-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .brief-header span,
  .brief-label {
    color: rgba(255, 255, 255, 0.38);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .brief-header strong {
    color: var(--white);
    font-size: 1.2rem;
    font-weight: 500;
  }

  .brief-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: hidden;
    margin: 24px 0;
  }

  .brief-grid div {
    min-height: 112px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .brief-grid div:nth-child(2n) { border-right: none; }
  .brief-grid div:nth-last-child(-n + 2) { border-bottom: none; }

  .brief-grid strong {
    color: var(--accent);
    font-family: Impact, sans-serif;
    font-size: 1.45rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .brief-flow {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .brief-flow span {
    border: 1px solid rgba(245, 166, 35, 0.24);
    border-radius: 999px;
    color: rgba(245, 166, 35, 0.88);
    font-size: 0.68rem;
    font-weight: 500;
    text-align: center;
    padding: 8px 6px;
  }

  /* ── NEW GROW NARRATIVE SECTIONS ─────────────────────────────────── */
  .intro-premium,
  .scope-inner,
  .qualification-inner {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 72px;
    align-items: start;
  }

  .intro-copy {
    max-width: 600px;
  }

  .section-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 420px;
    gap: 72px;
    align-items: end;
    margin-bottom: 64px;
  }

  .section-kicker {
    color: rgba(255, 255, 255, 0.52);
    font-size: 0.96rem;
    font-weight: 300;
    line-height: 1.8;
  }

  .workflow-section,
  .qualification-section {
    background: #0a0a0a;
    padding: 112px 0;
  }

  .workflow-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid rgba(245, 166, 35, 0.22);
    border-radius: 8px;
    overflow: hidden;
  }

  .workflow-step {
    min-height: 320px;
    padding: 28px 24px;
    background: rgba(255, 255, 255, 0.025);
    border-right: 1px solid rgba(245, 166, 35, 0.16);
    display: flex;
    flex-direction: column;
  }

  .workflow-step:last-child { border-right: none; }

  .step-index {
    color: rgba(245, 166, 35, 0.58);
    font-family: Impact, sans-serif;
    font-size: 2.4rem;
    line-height: 1;
    margin-bottom: auto;
  }

  .workflow-step h3 {
    color: var(--white);
    font-family: Impact, sans-serif;
    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
    margin: 44px 0 12px;
  }

  .workflow-step p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.72;
  }

  .scope-section {
    background: var(--light);
    padding: 112px 0;
  }

  .scope-panel {
    max-width: 520px;
  }

  .scope-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .scope-item,
  .qualification-item {
    border: 1px solid rgba(17, 17, 17, 0.08);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.28);
    padding: 22px;
  }

  .scope-item {
    display: flex;
    gap: 14px;
    min-height: 132px;
  }

  .scope-item span {
    color: var(--accent);
    font-weight: 700;
  }

  .scope-item p,
  .qualification-item {
    color: #333333;
    font-size: 0.92rem;
    font-weight: 400;
    line-height: 1.55;
  }

  .qualification-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .qualification-item {
    background: rgba(255, 255, 255, 0.035);
    border-color: rgba(245, 166, 35, 0.22);
    color: rgba(255, 255, 255, 0.68);
  }

  /* ── HERO ───────────────────────────────────────────────────────── */
  .hero {
    background: var(--dark);
    padding: 164px 0 100px;
    min-height: 100vh;
  }

  .hero-bg {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 0;
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .hero-inner--solo {
    grid-template-columns: 1fr;
    position: relative;
    z-index: 1;
  }

  .hero-sub {
    font-size: 1.1rem;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.7;
    margin: 28px 0 40px;
    max-width: 480px;
  }

  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }

  .hero-img {
    height: 560px;
    border-radius: var(--radius-card);
  }

  /* ── INTRO ──────────────────────────────────────────────────────── */
  .intro-section { padding: 100px 0; }
  .intro-section--top { padding-top: 160px; }
  .intro-section.light { background: var(--light); }

  .intro-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .intro-inner--centered {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 40px;
    text-align: center;
  }

  .intro-inner--hero {
    max-width: 600px;
  }

  .body-text--centered {
    text-align: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .intro-img {
    height: 480px;
    border-radius: var(--radius-card);
    width: 100%;
  }

  .section-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-card);
  }

  .for-visual {
    margin-top: 48px;
  }

  .for-visual-img {
    height: 420px;
    width: 100%;
    border-radius: var(--radius-card);
  }

  /* ── EDITORIAL SECTIONS ─────────────────────────────────────────── */
  .editorial-section {
    padding: 120px 0;
  }

  .editorial-dark {
    background: #0a0a0a;
  }

  .editorial-light {
    background: #f5f5f0;
  }

  .editorial-container {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 32px;
    text-align: center;
  }

  .editorial-eyebrow {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 24px;
    font-family: 'DM Sans', sans-serif;
  }

  .editorial-eyebrow--dark {
    color: var(--accent);
  }

  .editorial-heading {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.2rem);
    line-height: 1.08;
    letter-spacing: 0.01em;
    color: #ffffff;
    margin-bottom: 40px;
  }

  .editorial-heading--dark {
    color: #111111;
  }

  .editorial-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .editorial-body p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.62);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    margin: 0;
  }

  .editorial-body--dark p {
    color: rgba(20, 20, 20, 0.7);
  }

  /* ── WHO IS IT FOR ──────────────────────────────────────────────── */
  .for-section { background: var(--dark); padding: 100px 0; }

  .for-body {
    max-width: 680px;
    margin: 0 auto 60px;
    text-align: center;
  }

  .for-text {
    font-size: 1.05rem;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.8;
  }

  .for-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
  }

  .for-stat {
    background: var(--dark-2);
    border: 1px solid var(--border-dark);
    border-radius: var(--radius-card);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stat-label {
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .stat-value {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    text-transform: uppercase;
    color: var(--accent);
    letter-spacing: 0.02em;
  }

  /* ── PILLARS ─────────────────────────────────────────────────────── */
  .pillars-section { background: #0a0a0a; padding: 100px 0; }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 64px;
  }

  .pillar-card {
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--radius-card);
    padding: 40px 36px;
    border-left: 3px solid var(--accent);
    transition: box-shadow 0.3s;
  }
  .pillar-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.4); }

  .pillar-num {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: 2.2rem;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 16px;
  }

  .pillar-title {
    font-family: Impact, sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #ffffff;
    margin-bottom: 14px;
  }

  .pillar-body {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(255,255,255,0.52);
    line-height: 1.8;
  }

  /* ── PRICING ────────────────────────────────────────────────────── */
  .pricing-section { background: var(--dark); padding: 100px 0 120px; }

  .pricing-single {
    display: flex;
    justify-content: center;
    margin-top: 64px;
  }

  .pricing-card {
    background: var(--dark-2);
    border: 1px solid var(--border-dark);
    border-radius: var(--radius-card);
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    width: 100%;
    max-width: 480px;
  }

  .pricing-card.featured {
    border-color: var(--accent);
    background: var(--dark-3);
  }

  .plan-tier {
    font-family: Impact, sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .plan-price {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin: 4px 0 0;
  }

  .price-amount {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: 2.8rem;
    color: var(--white);
    line-height: 1;
  }

  .price-period {
    font-size: 0.82rem;
    color: var(--muted);
  }

  .plan-subtext {
    font-size: 0.8rem;
    color: var(--mid);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 10px;
    margin-top: 4px;
  }

  .plan-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 6px 0 16px;
    flex: 1;
  }

  .plan-features li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.85rem;
    color: var(--mid);
    line-height: 1.5;
  }

  .feat-check { color: var(--accent); flex-shrink: 0; }

  .boost-nudge {
    text-align: center;
    margin-top: 24px;
    font-size: 0.8rem;
    color: var(--muted);
  }

  .boost-nudge-link {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
  }
  .boost-nudge-link:hover { text-decoration: underline; }

  /* ── IMAGE PLACEHOLDERS ─────────────────────────────────────────── */
  .image-placeholder {
    background: rgba(255,255,255,0.03);
    border: 1.5px dashed rgba(255,255,255,0.1);
    border-radius: var(--radius-card);
    display: flex;
    align-items: flex-end;
    padding: 16px;
  }

  .placeholder-label {
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }


  /* ── RESPONSIVE ─────────────────────────────────────────────────── */
  @media (max-width: 1100px) {
    .for-grid { grid-template-columns: repeat(2, 1fr); }
    .grow-hero-inner,
    .section-row {
      grid-template-columns: 1fr;
      gap: 44px;
    }
    .hero-brief {
      max-width: 560px;
    }
    .workflow-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .workflow-step:nth-child(2n) {
      border-right: none;
    }
    .workflow-step:nth-child(-n + 2) {
      border-bottom: 1px solid rgba(245, 166, 35, 0.16);
    }
  }

  @media (max-width: 900px) {
    .hero-inner,
    .intro-inner,
    .wallet-inner { grid-template-columns: 1fr; }
    .hero-img,
    .intro-img { height: 300px; }
    .wallet-img { height: 280px; position: static; }
    .pillars-grid { grid-template-columns: 1fr; }
    .for-grid { grid-template-columns: 1fr; }
    nav { padding: 0 20px; }
    .nav-links { display: none; }
    .container { padding: 0 24px; }
    .hero { padding: 184px 0 80px; }
    .grow-hero {
      min-height: auto;
      padding: 132px 0 72px;
    }
    .grow-headline {
      font-size: clamp(46px, 12vw, 72px);
    }
    .intro-premium,
    .scope-inner,
    .qualification-inner {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .scope-list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .pricing-card { max-width: 100%; }
    .hero-brief {
      padding: 20px;
    }
    .brief-grid {
      grid-template-columns: 1fr;
    }
    .brief-grid div,
    .brief-grid div:nth-child(2n),
    .brief-grid div:nth-last-child(-n + 2) {
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .brief-grid div:last-child {
      border-bottom: none;
    }
    .brief-flow {
      grid-template-columns: repeat(2, 1fr);
    }
    .workflow-grid {
      grid-template-columns: 1fr;
    }
    .workflow-step,
    .workflow-step:nth-child(2n),
    .workflow-step:nth-child(-n + 2) {
      min-height: auto;
      border-right: none;
      border-bottom: 1px solid rgba(245, 166, 35, 0.16);
    }
    .workflow-step:last-child {
      border-bottom: none;
    }
    .step-index {
      margin-bottom: 52px;
    }
  }
</style>
