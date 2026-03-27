<script>
  import { onMount } from 'svelte';
  import ComparisonTable from '$lib/components/ComparisonTable.svelte';
  import FAQ from '$lib/components/FAQ.svelte';

  let pricingGrid;
  let activeDot = $state(0);

  onMount(() => {
    if (!pricingGrid) return;
    const cards = Array.from(pricingGrid.querySelectorAll('.pricing-card'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeDot = cards.indexOf(entry.target);
          }
        });
      },
      { root: pricingGrid, threshold: 0.5 }
    );
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>SQRZ Grow — Turn Attention Into Demand</title>
  <meta name="description" content="A growth infrastructure for independent professionals who want predictable leverage — not random exposure.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── HERO ─────────────────────────────────────────────────────── -->
<section class="hero hero-bg" style="background-image: url('/grow_hero.avif');">
  <div class="hero-overlay"></div>
  <div class="container hero-inner hero-inner--solo">
    <div class="hero-text">
      <p class="eyebrow">SQRZ Grow</p>
      <h1 class="display-headline">TURN ATTENTION<br><em>INTO DEMAND</em></h1>
      <p class="hero-sub">
        A growth infrastructure for independent professionals who want
        predictable leverage — not random exposure.
      </p>
      <div class="hero-btns">
        <button class="btn-primary btn-lg">Apply to Grow</button>
        <button class="btn-ghost btn-lg">See Pricing</button>
      </div>
    </div>
  </div>
</section>

<!-- ── WHAT IS GROW ──────────────────────────────────────────────── -->
<section class="intro-section light">
  <div class="container intro-inner">
    <div class="intro-text">
      <p class="section-tag dark-tag">What Is SQRZ Grow?</p>
      <h2 class="section-headline">Not marketing.<br><em>Your demand<br>intelligence layer.</em></h2>
      <p class="body-text">
        Built for professionals who understand that high-value work requires
        structure — not exposure. SQRZ Grow is not an agency and not another
        tool. It's the intelligence layer behind your demand.
      </p>
      <p class="body-text">
        Visibility connects to audience data. Audience data connects to
        bookings. Bookings connect to revenue. This is not a campaign you
        run once. It's an operational system you refine and re-activate
        whenever you choose to grow.
      </p>
    </div>
    <div class="intro-visual">
      <img src="/grow_whatitis.avif" alt="Dancer silhouette on stage" class="intro-img section-img" />
    </div>
  </div>
</section>

<!-- ── WHO IS IT FOR ─────────────────────────────────────────────── -->
<section class="editorial-section editorial-dark">
  <div class="editorial-container">
    <p class="editorial-eyebrow">Who Is It For?</p>
    <h2 class="editorial-heading">Built for professionals who<br>operate at a high level</h2>
    <div class="editorial-body">
      <p>You already deliver value. You already command serious fees. But demand still depends on timing, referrals, or chance.</p>
      <p>You're not looking for exposure. You're building leverage.</p>
      <p>If you treat growth as an investment — you belong here.</p>
    </div>
  </div>
</section>

<!-- ── GROWTH THAT CARRIES ON ────────────────────────────────────── -->
<section class="editorial-section editorial-light">
  <div class="editorial-container">
    <p class="editorial-eyebrow editorial-eyebrow--dark">The Difference</p>
    <h2 class="editorial-heading editorial-heading--dark">Growth That Carries On</h2>
    <div class="editorial-body editorial-body--dark">
      <p>SQRZ Grow isn't about pushing traffic. It's about building a growth environment around your work. We collaborate with you and your team to create clarity around demand — so momentum doesn't fade after a release, a tour, or a season.</p>
      <p>Attention becomes leverage. Leverage becomes opportunity. Opportunity becomes sustained growth. That's the difference.</p>
    </div>
  </div>
</section>

<!-- ── 4 PILLARS ─────────────────────────────────────────────────── -->
<section class="pillars-section dark">
  <div class="container">
    <p class="section-tag">The System</p>
    <h2 class="section-headline light-text centered">Four pillars.<br><em>One infrastructure.</em></h2>
    <div class="pillars-grid">
      {#each [
        {
          num: "01",
          title: "Audience Positioning",
          body: "Define your value clearly. Offer, audience, and advantage aligned — so every touchpoint builds toward the work you want.",
        },
        {
          num: "02",
          title: "Demand Engineering",
          body: "Build measurable demand. Tracking, segmentation, and audience intelligence installed and reusable — working silently between campaigns.",
        },
        {
          num: "03",
          title: "Pipeline Intelligence",
          body: "Turn interest into confirmed work. Structured flow. Visible conversion. Informed decisions at every stage.",
        },
        {
          num: "04",
          title: "Financial Control",
          body: "Control how money moves. Deposits secured. Budgets allocated. Teams paid. Everything confirmed before work begins.",
        },
      ] as pillar}
        <div class="pillar-card">
          <div class="pillar-num">{pillar.num}</div>
          <h3 class="pillar-title">{pillar.title}</h3>
          <p class="pillar-body">{pillar.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── BUILT TO WORK WITH YOUR TEAM ─────────────────────────────── -->
<section class="editorial-section editorial-light">
  <div class="editorial-container">
    <p class="editorial-eyebrow editorial-eyebrow--dark">Why Choose SQRZ Grow</p>
    <h2 class="editorial-heading editorial-heading--dark">Built To Work With Your Team</h2>
    <div class="editorial-body editorial-body--dark">
      <p>SQRZ Grow doesn't replace your management. It doesn't compete with your agency. It connects the pieces.</p>
      <p>We work alongside your existing structure — management, assistants, labels, collaborators — and provide the growth infrastructure that often sits between strategy and execution.</p>
      <p>Creative teams focus on content. Managers focus on deals. Agencies focus on exposure.</p>
      <p>We focus on connecting it all — so momentum builds instead of scattering.</p>
    </div>
  </div>
</section>

<ComparisonTable />

<FAQ />

<!-- ── PRICING ───────────────────────────────────────────────────── -->
<section class="pricing-section dark" id="pricing">
  <div class="container">
    <p class="section-tag">Pricing</p>
    <h2 class="section-headline light-text centered">Choose your<br><em>level of investment</em></h2>
    <div class="pricing-grid" bind:this={pricingGrid}>

      <!-- Grow Starter -->
      <div class="pricing-card">
        <div class="plan-tier">Starter</div>
        <div class="plan-name">Grow Starter</div>
        <div class="plan-price">
          <span class="price-amount">$149</span>
          <span class="price-period">/campaign</span>
        </div>
        <p class="plan-tagline">Launch a Focused Growth Cycle</p>
        <ul class="plan-features">
          {#each [
            "Targeted traffic directed to your SQRZ profile",
            "Tracking and attribution installed (pixel + UTM)",
            "Basic audience segmentation for initial learning",
            "Performance visibility across visits, clicks, and inquiries",
          ] as f}
            <li><span class="feat-check">✓</span>{f}</li>
          {/each}
        </ul>
        <p class="plan-note">* Ad budget up to $1,000 (not included)</p>
        <a href="https://dashboard.sqrz.com/join" class="btn-outline-accent btn-full">Join SQRZ</a>
      </div>

      <!-- Grow Pro -->
      <div class="pricing-card featured">
        <div class="plan-badge">Most Popular</div>
        <div class="plan-tier">Pro</div>
        <div class="plan-name">Grow Pro</div>
        <div class="plan-price">
          <span class="price-amount">20%</span>
          <span class="price-period">/campaign managament fee</span>
        </div>
        <p class="plan-tagline">This is not a single campaign.It’s an ongoing system for building and refining demand.</p>
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
        <p class="plan-note">* For budgets above $1,000 (not included)</p>
        <a href="https://meetings.hubspot.com/willvilla/sqrz-grow-discovery-call" target="_blank" rel="noopener noreferrer" class="btn-primary btn-full">Apply</a>
      </div>

      <!-- Enterprise -->
      <div class="pricing-card enterprise-card">
        <div class="plan-tier">Enterprise</div>
        <div class="plan-name">Custom</div>
        <div class="plan-price">
          <span class="price-amount enterprise-price">Contact Us</span>
        </div>
        <p class="plan-tagline">Growth & Revenue Infrastructure at Scale</p>
        <ul class="plan-features">
          {#each [
            "Multi-campaign and multi-offer coordination",
            "Support for ticket sales, releases, and product-based campaigns",
            "Advanced audience segmentation across markets and verticals",
            "* Structured financial flows across bookings, teams, and revenue streams",
          ] as f}
            <li><span class="feat-check">✓</span>{f}</li>
          {/each}
        </ul>
        <a href="https://meetings.hubspot.com/willvilla/sqrz-grow-discovery-call" target="_blank" rel="noopener noreferrer" class="btn-outline-accent btn-full">Talk to Us</a>
      </div>

    </div>

    <!-- Dot indicator (mobile only) -->
    <div class="pricing-dots">
      {#each [0, 1, 2] as i}
        <span class="pricing-dot" class:active={activeDot === i}></span>
      {/each}
    </div>

    <div class="discovery-cta">
      <p class="discovery-hint">Not sure which plan is right for you?</p>
      <a
        href="https://meetings.hubspot.com/willvilla/sqrz-grow-discovery-call"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary"
      >Book a free discovery call →</a>
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
    --light:        #F5F5F5;
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
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(52px, 7vw, 96px);
    line-height: 0.95;
    letter-spacing: -0.01em;
    color: var(--white);
    text-transform: uppercase;
  }
  .display-headline em { font-style: normal; color: var(--accent); }

  .section-headline {
    font-family: 'Barlow Condensed', sans-serif;
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

  .body-text {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8;
    color: #444444;
    margin-bottom: 20px;
  }

  /* ── HERO ───────────────────────────────────────────────────────── */
  .hero {
    background: var(--dark);
    padding: 164px 0 100px;
    min-height: 100vh;
    display: flex;
    align-items: center;
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
    max-width: 680px;
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
  .intro-section.light { background: var(--light); }

  .intro-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
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
    font-family: 'Barlow Condensed', sans-serif;
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
    font-family: 'Barlow Condensed', sans-serif;
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
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 2.2rem;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 16px;
  }

  .pillar-title {
    font-family: 'Barlow Condensed', sans-serif;
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

  .pricing-dots { display: none; }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 64px;
    align-items: stretch;
  }

  .pricing-card {
    background: var(--dark-2);
    border: 1px solid var(--border-dark);
    border-radius: var(--radius-card);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    height: 100%;
  }

  .pricing-card.featured {
    border-color: var(--accent);
    background: var(--dark-3);
  }

  .pricing-card.enterprise-card {
    border-color: rgba(245,166,35,0.2);
  }

  .plan-badge {
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: var(--dark);
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 4px 14px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .plan-tier {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .plan-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--white);
  }

  .plan-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin: 4px 0;
  }

  .price-amount {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 2.4rem;
    color: var(--white);
    line-height: 1;
  }

  .enterprise-price { font-size: 1.4rem; }

  .price-period {
    font-size: 0.82rem;
    color: var(--muted);
  }

  .plan-tagline {
    font-size: 0.8rem;
    color: var(--mid);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 10px;
    margin-top: 4px;
  }

  .plan-term {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-top: -4px;
  }

  .plan-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 6px 0 12px;
    flex: 1;
  }

  .plan-features li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.82rem;
    color: var(--mid);
    line-height: 1.5;
  }

  .feat-check { color: var(--accent); flex-shrink: 0; }

  .plan-note {
    font-size: 0.7rem;
    color: var(--muted);
    font-style: italic;
    margin-top: -4px;
  }

  /* ── DISCOVERY CTA ──────────────────────────────────────────────── */
  .discovery-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-top: 48px;
  }

  .discovery-hint {
    font-size: 0.82rem;
    color: var(--muted);
    text-align: center;
  }

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
    .pricing-grid { grid-template-columns: repeat(2, 1fr); }
    .for-grid { grid-template-columns: repeat(2, 1fr); }
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
  }

  @media (max-width: 768px) {
    .pricing-section {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      padding-left: 0;
      padding-right: 0;
    }

    /* Zero out the container padding inside the pricing section only */
    .pricing-section .container {
      width: 100%;
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
      box-sizing: border-box;
    }

    .pricing-grid {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      max-width: 100vw;
      padding: 0;
      margin: 48px 0 0;
      gap: 12px;
    }
    .pricing-grid::-webkit-scrollbar { display: none; }

    .pricing-card {
      scroll-snap-align: center;
      min-width: 78vw;
      max-width: 78vw;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .pricing-card.featured { transform: none; }

    .pricing-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
    }
    .pricing-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1.5px solid rgba(255, 255, 255, 0.3);
      background: transparent;
      transition: background 0.2s, border-color 0.2s;
    }
    .pricing-dot.active {
      background: #F3B130;
      border-color: #F3B130;
    }
  }
</style>
