<script lang="ts">
  import { onMount } from 'svelte';
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
  import type { PageData } from './$types';
  import FAQ from '$lib/components/FAQ.svelte';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let { data }: { data: PageData } = $props();

  let username = $state('');
  let status = $state('idle'); // 'idle' | 'checking' | 'available' | 'taken'
  let refCode = $state('');
  let debounceTimer;
  let pricingGrid: HTMLElement | undefined;
  let activeDot = $state(0);

  // Capture ?ref=CODE from URL and persist in localStorage
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      refCode = ref;
      localStorage.setItem('sqrz_ref', ref);
    } else {
      refCode = localStorage.getItem('sqrz_ref') ?? '';
    }
  });

  // Build join URL with ref appended when present
  let joinUrl = $derived(
    `https://dashboard.sqrz.com/join?slug=${username}${refCode ? `&ref=${refCode}` : ''}`
  );

  // Plain join URL (no slug) — used by static CTAs like pricing buttons
  let baseJoinUrl = $derived(
    refCode ? `https://dashboard.sqrz.com/join?ref=${refCode}` : 'https://dashboard.sqrz.com/join'
  );

  function onInput(e) {
    username = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    status = 'idle';
    clearTimeout(debounceTimer);
    if (username.length < 3) return;
    status = 'checking';
    debounceTimer = setTimeout(checkUsername, 500);
  }

  onMount(() => {
    if (!pricingGrid) return;
    const cards = Array.from(pricingGrid.querySelectorAll<HTMLElement>('.pricing-card'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeDot = cards.indexOf(entry.target as HTMLElement);
          }
        });
      },
      { root: pricingGrid, threshold: 0.5 }
    );
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  });

  async function checkUsername() {
    const { data, error } = await supabase
      .from('profiles')
      .select('slug')
      .eq('slug', username)
      .maybeSingle();
    if (error) { status = 'idle'; return; }
    status = data ? 'taken' : 'available';
  }
</script>

<svelte:head>
  <title>SQRZ — The LinkInBio That Gets You Booked</title>
  <meta name="description" content="One professional profile to promote your work, manage bookings, and secure payments with clarity and trust.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── HERO ─────────────────────────────────────────────────────── -->
<section class="hero">
  <div class="hero-overlay"></div>
  <div class="container hero-inner">

    <!-- Left: hero text -->
    <div class="hero-text">
      <p class="eyebrow">Professional identity &amp; booking</p>
      <h1 class="display-headline">THE LINKINBIO<br>THAT GETS YOU<br><em>BOOKED</em></h1>
      <p class="hero-sub">
        One profile to promote your work, manage bookings, and get paid — with clarity and trust.
      </p>
      <!-- Username availability checker -->
      <div class="username-checker">
        <div class="username-input-row">
          <input
            type="text"
            class="username-input"
            placeholder="yourname"
            value={username}
            oninput={onInput}
            onkeydown={(e) => { if (e.key === 'Enter' && status === 'available') window.location.href = joinUrl; }}
            maxlength="30"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <span class="username-suffix">.sqrz.com</span>
        </div>
        <div class="username-feedback" aria-live="polite">
          {#if status === 'checking'}
            <span class="status-checking">Checking…</span>
          {:else if status === 'taken'}
            <span class="status-taken">Already taken</span>
          {:else if status === 'available'}
            <a href={joinUrl} class="status-available">
              {username}.sqrz.com is available! →
            </a>
          {:else if username.length > 0 && username.length < 3}
            <span class="status-hint">At least 3 characters</span>
          {/if}
        </div>
      </div>
    </div>

    <!-- Right: floating profile cards -->
    <div class="hero-cards">
      <!-- Card 1: Will Villa -->
      <div class="float-card float-card--a">
        <div class="fc-avatar" style="background: rgba(243,177,48,0.2); color: #F3B130;">WV</div>
        <div class="fc-info">
          <div class="fc-name">Will Villa</div>
          <div class="fc-skill">DJ · Sound Engineer</div>
        </div>
        <span class="fc-badge fc-badge--amber">Available</span>
      </div>
      <!-- Card 2: Anna Hilbert -->
      <div class="float-card float-card--b">
        <div class="fc-avatar" style="background: rgba(168,85,247,0.2); color: #A855F7;">AH</div>
        <div class="fc-info">
          <div class="fc-name">Anna Hilbert</div>
          <div class="fc-skill">Singer · Performer</div>
        </div>
        <span class="fc-badge fc-badge--purple">Booked</span>
      </div>
      <!-- Card 3: Jake S. -->
      <div class="float-card float-card--c">
        <div class="fc-avatar" style="background: rgba(56,189,248,0.2); color: #38BDF8;">JS</div>
        <div class="fc-info">
          <div class="fc-name">Jake S.</div>
          <div class="fc-skill">FOH Engineer</div>
        </div>
        <span class="fc-badge fc-badge--blue">Available</span>
      </div>
    </div>

  </div>
</section>

<!-- ── SECTION 1 — Showcase ─────────────────────────────────────── -->
<section class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-visual">
      <img src="/home-showcase.avif" alt="Sound engineer at mixing desk" class="feature-img section-img" />
    </div>
    <div class="feature-text">
      <p class="section-number">01</p>
      <h2 class="section-headline">Showcase Your<br><em>Best Work</em></h2>
      <p class="body-text">
        Create a powerful SQRZ profile and showcase your portfolio, services,
        and availability — all in one beautiful page designed to convert
        visitors into long-term clients. No website builder, no plugins,
        no maintenance.
      </p>
      <ul class="feature-list">
        {#each [
          'Portfolio, services & availability in one place',
          'Designed to convert visitors into clients',
          'Live in minutes — no tech skills required',
          'Your own domain, your own brand',
        ] as item}
          <li><span class="check">→</span>{item}</li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<!-- ── SECTION 2 — Pipeline ──────────────────────────────────────── -->
<section class="feature-section dark">
  <div class="container feature-inner">
    <div class="feature-text">
      <p class="section-number accent">02</p>
      <h2 class="section-headline light-text">Run Your<br><em>Booking Pipeline</em></h2>
      <p class="body-text mid-text">
        Clients don't just message you — they enter a structured flow.
        Scope, terms, collaboration, and payment move forward in one
        clear system.
      </p>
      <ul class="feature-list dark-list">
        {#each [
          'Structured booking requests — no back-and-forth',
          'Defined scope and terms before any commitment',
          'Collaboration handled inside one workflow',
          'Payments move with the project',
        ] as item}
          <li><span class="check accent">→</span>{item}</li>
        {/each}
      </ul>
    </div>
    <div class="feature-visual">
      <img src="/home-pipeline.avif" alt="Stage and crowd at live show" class="feature-img section-img" />
    </div>
  </div>
</section>

<!-- ── SECTION 3 — Get Paid ──────────────────────────────────────── -->
<section class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-visual">
      <img src="/home_getpaid.avif" alt="Cruise ship — get paid to perform" class="feature-img section-img" />
    </div>
    <div class="feature-text">
      <p class="section-number">03</p>
      <h2 class="section-headline">SQRZ Gets<br><em>You Paid</em></h2>
      <p class="body-text">
        Focus on your work, not your invoices. From first request to
        secured deposit, budget allocation, and team payments — SQRZ
        handles the operational flow, so you can focus on delivering
        great work.
      </p>
      <ul class="feature-list">
        {#each [
          'Deposits secured before work begins',
          'Budget allocated across the team',
          'Payments released on delivery',
          'No chasing, no awkward conversations',
        ] as item}
          <li><span class="check">→</span>{item}</li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<!-- ── WHO IS SQRZ FOR ───────────────────────────────────────────── -->
<section class="audience-section dark">
  <div class="container">
    <p class="section-tag">Who Is SQRZ For?</p>
    <h2 class="section-headline light-text centered">Built for people who<br><em>do serious work</em></h2>
    <div class="audience-grid">
      {#each [
        {
          type: 'Independent Professionals',
          body: 'Turn your skills into a clear, bookable offer. Receive structured requests and secure payments — without juggling tools.',
        },
        {
          type: 'Growth-Focused Creatives',
          body: 'Move beyond one-off gigs. Build demand, attract the right clients, and turn attention into structured, repeatable work.',
        },
        {
          type: 'Team Leaders & Decision Makers',
          body: 'Run projects with clarity and control. Secure deposits, allocate budgets, onboard collaborators, and release payments — all in one workflow.',
        },
      ] as card}
        <div class="audience-card">
          <div class="card-accent-line"></div>
          <h3 class="card-title">{card.type}</h3>
          <p class="card-body">{card.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── HOW IT WORKS ──────────────────────────────────────────────── -->
<section class="how-section light">
  <div class="container">
    <p class="section-tag dark-tag">How SQRZ Works</p>
    <h2 class="section-headline centered">Three steps to a<br><em>complete professional</em></h2>
    <div class="steps-grid">
      {#each [
        {
          num: '01',
          title: 'Bring Your Portfolio Together',
          body: 'Not just links — your shows, your projects, your reputation — presented professionally in one place that represents you properly.',
        },
        {
          num: '02',
          title: 'Your Work Without the Noise',
          body: 'Requests, deposits, and team payouts handled quietly in the background, so you stay focused on the work that matters.',
        },
        {
          num: '03',
          title: 'Your Growth on Autopilot',
          body: 'As your career evolves, SQRZ grows with you. Focus on your craft while SQRZ turns momentum into opportunity.',
        },
      ] as step}
        <div class="step">
          <div class="step-number">{step.num}</div>
          <h3 class="step-title">{step.title}</h3>
          <p class="step-body">{step.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── BOOKING WALLET ─────────────────────────────────────────────── -->
<section class="wallet-section dark">
  <div class="container wallet-inner">
    <div class="wallet-text">
      <p class="eyebrow-light">New in SQRZ Grow</p>
      <h2 class="section-headline light-text">Introducing the<br><em>Booking Wallet</em></h2>
      <p class="wallet-sub">
        From first request to final payout — every financial movement
        tied to defined scope, confirmed delivery, and agreed terms.
      </p>
      <div class="wallet-steps">
        {#each [
          {
            step: '01',
            title: 'Request Payment',
            body: 'Secure deposits directly through your booking page. Each project generates a structured payment request tied to defined scope, terms, and timeline.',
          },
          {
            step: '02',
            title: 'Manage & Allocate',
            body: 'Once the deposit is secured, allocate budgets across collaborators, production costs, and agreed expenses.',
          },
          {
            step: '03',
            title: 'Get Paid After Gig',
            body: 'Release payments according to confirmed delivery and agreed milestones. No ambiguity. No chasing.',
          },
        ] as ws}
          <div class="wallet-step">
            <div class="ws-num">{ws.step}</div>
            <div class="ws-content">
              <h4 class="ws-title">{ws.title}</h4>
              <p class="ws-body">{ws.body}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="wallet-visual">
      <!-- Webflow image: booking wallet / payment flow UI -->
      <div class="image-placeholder wallet-img">
        <span class="placeholder-label">Booking Wallet — payment flow UI</span>
      </div>
    </div>
  </div>
</section>

<FAQ />

<!-- ── FEATURED PROFILES ─────────────────────────────────────────── -->
<section class="featured-section dark">
  <div class="container">
    <p class="section-tag">Featured Profiles</p>
    <h2 class="section-headline light-text centered">MEET THE CREATIVES<br><em>ALREADY ON SQRZ</em></h2>

    <div class="featured-grid">

      {#each data.featuredProfiles as profile}
        <a
          href="https://{profile.slug}.sqrz.com"
          target="_blank"
          rel="noopener noreferrer"
          class="profile-card"
          style="background-image: url({profile.avatarUrl ?? ''}); background-color: #1a1a1a;"
        >
          <div class="profile-card-overlay"></div>
          <div class="profile-card-content">
            {#if profile.skills.length > 0}
              <div class="profile-skills">
                {#each profile.skills as skill}
                  <span class="skill-tag">{skill}</span>
                {/each}
              </div>
            {/if}
            <div class="profile-name">{profile.name}</div>
            {#if profile.city}
              <div class="profile-city">{profile.city}</div>
            {/if}
            <span class="profile-link">View profile →</span>
          </div>
        </a>
      {/each}

      <!-- Placeholder 1 -->
      <div class="profile-card profile-card--placeholder">
        <div class="profile-card-overlay"></div>
        <div class="profile-card-content">
          <div class="profile-name">Coming Soon</div>
          <span class="profile-link">Your profile here</span>
        </div>
      </div>

      <!-- Placeholder 2 -->
      <div class="profile-card profile-card--placeholder">
        <div class="profile-card-overlay"></div>
        <div class="profile-card-content">
          <div class="profile-name">Coming Soon</div>
          <span class="profile-link">Your profile here</span>
        </div>
      </div>

    </div>

    <div class="featured-cta">
      <p class="featured-cta-hint">Want to be featured?</p>
      <a
        href="https://meetings.hubspot.com/willvilla/sqrz-grow-discovery-call"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-accent"
      >Apply for SQRZ Grow →</a>
    </div>
  </div>
</section>


<!-- ── PRICING ───────────────────────────────────────────────────── -->
<section class="pricing-section dark">
  <div class="container">
    <p class="section-tag">Pricing</p>
    <h2 class="section-headline light-text centered">Start free.<br><em>Scale when you're ready.</em></h2>
    <div class="pricing-carousel-wrapper">
    <div class="pricing-grid" bind:this={pricingGrid}>

      <!-- Free -->
      <div class="pricing-card">
        <div class="plan-name">Free</div>
        <div class="plan-price">
          <span class="price-amount">Free</span>
        </div>
        <p class="plan-tagline">Build Your Professional Base</p>
        <ul class="plan-features">
          {#each [
            'Professional profile & services',
            'Booking pipeline & dashboard',
            'Boost campaigns — $25 per activation',
            'Do what you love & get paid for it',
          ] as f}
            <li><span class="feat-check">✓</span>{f}</li>
          {/each}
        </ul>
        <a href={baseJoinUrl} class="btn-primary btn-full">Join SQRZ</a>
      </div>

      <!-- Creator -->
      <div class="pricing-card featured">
        <div class="plan-badge">Most Popular</div>
        <div class="plan-name">Creator</div>
        <div class="plan-price">
          <span class="price-amount">$12</span>
          <span class="price-period">/month</span>
        </div>
        <p class="plan-tagline">Everything — domain, links, pixels, campaigns</p>
        <p class="plan-annual">or $84/year — save 30%</p>
        <ul class="plan-features">
          {#each [
            'Custom domain — own your identity',
            'Advanced tracking — see what drives bookings',
            'Private links, lead capture & pixel tracking',
            'Boost campaigns — $25 activation, $5 reactivation',
          ] as f}
            <li><span class="feat-check">✓</span>{f}</li>
          {/each}
        </ul>
        <a href={baseJoinUrl} class="btn-accent btn-full">Join SQRZ</a>
      </div>

      <!-- Boost -->
      <div class="pricing-card grow-card">
        <div class="plan-name accent-text">Boost</div>
        <div class="plan-price">
          <span class="price-amount">$25</span>
          <span class="price-period"> per campaign</span>
        </div>
        <p class="plan-tagline">Launch a targeted campaign</p>
        <ul class="plan-features">
          {#each [
            'Promote what matters — your work, your offer, your event',
            'Drive targeted traffic to a dedicated campaign page',
            'Track visits, engagement, and real inquiries',
            'Start building your own audience and demand data',
          ] as f}
            <li><span class="feat-check accent-text">✓</span>{f}</li>
          {/each}
        </ul>
        <p class="plan-note">* Ad budget not included</p>
        <a href={baseJoinUrl} class="btn-primary btn-full">Join SQRZ</a>
      </div>

    </div>
    </div>

    <!-- Dot indicator (mobile only) -->
    <div class="pricing-dots">
      {#each [0, 1, 2] as i}
        <span class="pricing-dot" class:active={activeDot === i}></span>
      {/each}
    </div>

    <p class="grow-cta">
      We help you set up and manage your campaigns — <a href="/grow" class="grow-cta-link">Learn more about SQRZ Grow →</a>
    </p>
  </div>
</section>

<style>
  /* ── RESET & BASE ───────────────────────────────────────────────── */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) {
    font-family: 'DM Sans', sans-serif;
    background: #f5f5f5;
    color: #111111;
    -webkit-font-smoothing: antialiased;
  }

  /* ── TOKENS ─────────────────────────────────────────────────────── */
  :global(:root) {
    --accent:       #F5A623;
    --accent-dim:   rgba(245,166,35,0.25);
    --accent-faint: rgba(245,166,35,0.08);
    --dark:         #111111;
    --dark-2:       #1a1a1a;
    --dark-3:       #242424;
    --light:        #F5F5F5;
    --white:        #ffffff;
    --mid:          rgba(255,255,255,0.55);
    --muted:        rgba(255,255,255,0.28);
    --border-dark:  rgba(245,166,35,0.25);
    --border-light: rgba(0,0,0,0.08);
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
    font-weight: 400;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-btn);
    padding: 10px 22px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    display: inline-block;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: var(--white); }

  .btn-outline {
    background: transparent;
    color: var(--dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    border: 1.5px solid rgba(0,0,0,0.2);
    border-radius: var(--radius-btn);
    padding: 12px 28px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s;
    display: inline-block;
  }
  .btn-outline:hover { border-color: rgba(0,0,0,0.5); }

  .btn-accent {
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
  .btn-accent:hover { background: var(--accent); color: var(--dark); }

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
  .display-headline em {
    font-style: normal;
    color: var(--accent);
  }

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
  .section-headline em {
    font-style: normal;
    color: var(--accent);
  }
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
  .section-tag.dark-tag { color: var(--accent); }

  .section-number {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 5rem;
    line-height: 1;
    color: var(--accent-dim);
    margin-bottom: -8px;
  }
  .section-number.accent { color: rgba(245,166,35,0.2); }

  .body-text {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8;
    color: #444444;
    margin-bottom: 28px;
  }
  .body-text.mid-text { color: var(--mid); }

  /* ── HERO ───────────────────────────────────────────────────────── */
  .hero {
    position: relative;
    background: #0a0a0a;
    /* TODO: add background-image: url('/images/home-hero.jpg') here */
    background-size: cover;
    background-position: center;
    padding: 164px 0 100px;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .hero-sub {
    font-size: 1.1rem;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.7;
    margin: 28px 0 40px;
    max-width: 480px;
  }

  /* ── FLOATING PROFILE CARDS ─────────────────────────────────────── */
  .hero-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  @keyframes floatA {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes floatB {
    0%, 100% { transform: translateY(-4px); }
    50%       { transform: translateY(4px); }
  }

  .float-card {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 14px;
    width: 220px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .float-card--a { animation: floatA 4s ease-in-out infinite; }
  .float-card--b { animation: floatB 4s ease-in-out infinite 0.8s; }
  .float-card--c { animation: floatA 4s ease-in-out infinite 1.6s; }

  .fc-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .fc-info {
    flex: 1;
    min-width: 0;
  }

  .fc-name {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 0.88rem;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fc-skill {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 2px;
  }

  .fc-badge {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 999px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .fc-badge--amber  { background: rgba(243,177,48,0.2);  color: #F3B130; }
  .fc-badge--purple { background: rgba(168,85,247,0.2);  color: #A855F7; }
  .fc-badge--blue   { background: rgba(56,189,248,0.2);  color: #38BDF8; }

  /* ── USERNAME CHECKER ───────────────────────────────────────────── */
  .username-checker {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .username-input-row {
    display: flex;
    align-items: stretch;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: var(--radius-btn);
    overflow: hidden;
    transition: border-color 0.2s;
    max-width: 380px;
  }
  .username-input-row:focus-within {
    border-color: var(--accent);
  }

  .username-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 13px 16px 13px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: var(--white);
    min-width: 0;
    touch-action: manipulation;
  }
  .username-input::placeholder { color: rgba(255,255,255,0.3); }

  .username-suffix {
    display: flex;
    align-items: center;
    padding: 0 18px 0 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: rgba(255,255,255,0.35);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .username-feedback {
    min-height: 20px;
    padding-left: 4px;
  }

  .status-checking {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.04em;
  }

  .status-taken {
    font-size: 0.82rem;
    color: #e05252;
    font-weight: 400;
  }

  .status-available {
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .status-available:hover { opacity: 0.8; }

  .status-hint {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.25);
  }

  /* ── FEATURE SECTIONS ───────────────────────────────────────────── */
  .feature-section { padding: 100px 0; }
  .feature-section.light { background: var(--light); }
  .feature-section.dark  { background: var(--dark-2); }

  .feature-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .feature-inner.reverse { direction: rtl; }
  .feature-inner.reverse > * { direction: ltr; }

  .feature-img {
    height: 440px;
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

  .dark-placeholder {
    background: rgba(255,255,255,0.04) !important;
    border-color: rgba(255,255,255,0.08) !important;
  }

  .feature-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
  }

  .feature-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 0.9rem;
    color: #444444;
    line-height: 1.5;
  }

  .feature-list.dark-list li { color: var(--mid); }

  .check {
    color: var(--accent);
    font-family: monospace;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .check.accent { color: var(--accent); }

  /* ── AUDIENCE ───────────────────────────────────────────────────── */
  .audience-section { background: var(--dark); padding: 100px 0; }

  .audience-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 60px;
  }

  .audience-card {
    background: var(--dark-2);
    border: 1px solid var(--border-dark);
    border-radius: var(--radius-card);
    padding: 40px 32px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }
  .audience-card:hover { background: var(--dark-3); }

  .card-accent-line {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: var(--accent);
    opacity: 0.6;
  }

  .card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--white);
    margin-bottom: 16px;
  }

  .card-body {
    font-size: 0.9rem;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.75;
  }

  /* ── HOW IT WORKS ───────────────────────────────────────────────── */
  .how-section { background: var(--light); padding: 100px 0; }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
    margin-top: 64px;
  }

  .step-number {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 3.5rem;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 20px;
  }

  .step-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--dark);
    margin-bottom: 14px;
  }

  .step-body {
    font-size: 0.9rem;
    font-weight: 300;
    color: #555;
    line-height: 1.8;
  }

  /* ── WALLET ─────────────────────────────────────────────────────── */
  .wallet-section { background: var(--dark-2); padding: 100px 0; }

  .wallet-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .wallet-sub {
    font-size: 1rem;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.75;
    margin: 0 0 48px;
  }

  .wallet-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .wallet-step {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 24px 28px;
    transition: background 0.2s;
  }
  .wallet-step:hover { background: rgba(255,255,255,0.05); }

  .ws-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--accent);
    flex-shrink: 0;
    min-width: 36px;
  }

  .ws-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--white);
    margin-bottom: 8px;
  }

  .ws-body {
    font-size: 0.85rem;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.7;
  }

  .wallet-img {
    height: 500px;
    border-radius: var(--radius-card);
    position: sticky;
    top: 84px;
  }

  /* ── FEATURED PROFILES ──────────────────────────────────────────── */
  .featured-section { background: var(--dark); padding: 100px 0; }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 64px;
    align-items: stretch;
  }

  .profile-card {
    position: relative;
    height: 320px;
    border-radius: var(--radius-card);
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-color: #1a1a1a;
    text-decoration: none;
    display: block;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
  }
  .profile-card:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  }

  .profile-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%);
    pointer-events: none;
  }

  .profile-card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .profile-card--placeholder {
    opacity: 0.35;
    cursor: default;
  }
  .profile-card--placeholder:hover {
    transform: none;
    box-shadow: none;
  }

  .profile-name {
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 800;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--white);
    line-height: 1.1;
  }

  .profile-city {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }

  .profile-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 2px;
  }

  .skill-tag {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(245, 166, 35, 0.15);
    border: 1px solid rgba(245, 166, 35, 0.3);
    border-radius: 999px;
    padding: 2px 8px;
  }

  .profile-link {
    font-size: 0.73rem;
    color: rgba(255,255,255,0.45);
    margin-top: 2px;
  }

  .featured-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-top: 48px;
  }

  .featured-cta-hint {
    font-size: 0.85rem;
    color: var(--muted);
    text-align: center;
  }

  /* ── PRICING ────────────────────────────────────────────────────── */
  .pricing-section { background: var(--dark); padding: 100px 0 120px; }

  .pricing-dots {
    display: none;
  }

  .grow-cta {
    text-align: center;
    margin-top: 32px;
    font-size: 14px;
    color: rgba(255,255,255,0.45);
  }

  .grow-cta-link {
    color: var(--accent);
    text-decoration: none;
  }

  .grow-cta-link:hover { text-decoration: underline; }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 64px;
    align-items: stretch;
  }

  .pricing-card {
    background: var(--dark-2);
    border: 1px solid var(--border-dark);
    border-radius: var(--radius-card);
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    height: 100%;
  }

  .pricing-card > a.btn-full {
    margin-top: auto;
  }

  .pricing-card.featured {
    border-color: var(--accent);
    background: var(--dark-3);
    transform: scale(1.02);
  }

  .pricing-card.grow-card {
    border-color: rgba(245,166,35,0.4);
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

  .plan-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--white);
  }
  .plan-name.accent-text { color: var(--accent); }

  .plan-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin: 4px 0;
  }

  .price-amount {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 2.8rem;
    color: var(--white);
    line-height: 1;
  }

  .price-period {
    font-size: 0.85rem;
    color: var(--muted);
  }

  .plan-tagline {
    font-size: 0.82rem;
    font-weight: 400;
    color: var(--mid);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 12px;
    margin-top: 4px;
  }

  .plan-annual {
    font-size: 0.75rem;
    color: var(--accent);
    margin-top: -4px;
  }

  .plan-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 8px 0 16px;
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

  .feat-check {
    color: var(--accent);
    flex-shrink: 0;
  }
  .feat-check.accent-text { color: var(--accent); }

  .plan-note {
    font-size: 0.72rem;
    color: var(--muted);
    font-style: italic;
    margin-top: -8px;
  }

  .accent-text { color: var(--accent); }

  /* ── IMAGE PLACEHOLDERS ─────────────────────────────────────────── */
  .image-placeholder {
    background: rgba(0,0,0,0.06);
    border: 1.5px dashed rgba(0,0,0,0.12);
    border-radius: var(--radius-card);
    display: flex;
    align-items: flex-end;
    padding: 16px;
  }

  .placeholder-label {
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.25);
  }


  /* ── RESPONSIVE ─────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .hero-inner,
    .feature-inner,
    .feature-inner.reverse {
      grid-template-columns: 1fr;
      direction: ltr;
    }
    .hero-cards {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }
    .float-card {
      width: 160px;
      padding: 12px;
      gap: 10px;
    }
    .fc-avatar { width: 36px; height: 36px; font-size: 0.78rem; }
    .fc-name   { font-size: 0.8rem; }
    .fc-skill  { font-size: 0.68rem; }
    .feature-img { height: 280px; }
    .audience-grid,
    .steps-grid {
      grid-template-columns: 1fr;
    }
    .featured-grid { grid-template-columns: repeat(2, 1fr); }
    nav { padding: 0 20px; }
    .nav-links { display: none; }
    .container { padding: 0 24px; }
    .hero { padding: 184px 0 80px; }
    .feature-section,
    .audience-section,
    .how-section,
    .pricing-section,
    .featured-section { padding: 72px 0; }

    .wallet-inner {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .wallet-img {
      height: 300px;
      position: static;
    }
    .wallet-section { padding: 72px 0; }
  }

  @media (max-width: 768px) {
    .pricing-section {
      width: 100%;
      max-width: 100%;
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

    /* Wrapper clips horizontal overflow without clipping the badge above */
    .pricing-carousel-wrapper {
      overflow: hidden;
    }

    .pricing-grid {
      display: flex;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      padding: 40px 5vw 16px;
      margin: 8px 0 0;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
    }
    .pricing-grid::-webkit-scrollbar { display: none; }

    .pricing-card {
      scroll-snap-align: center;
      min-width: 75vw;
      max-width: 75vw;
      flex-shrink: 0;
      box-sizing: border-box;
      overflow: visible;
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

  @media (max-width: 480px) {
    .float-card--c { display: none; }
  }
</style>
