<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import FeatureSection from '$lib/components/FeatureSection.svelte';
  import UsernameChecker from '$lib/components/UsernameChecker.svelte';

  let { data }: { data: PageData } = $props();

  let refCode = $state('');

  // Set --vh CSS variable for reliable mobile viewport height
  onMount(() => {
    const setVh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    window.addEventListener('resize', setVh);
    setVh();
    return () => window.removeEventListener('resize', setVh);
  });

  // Capture ?ref=CODE from URL and persist in localStorage. Single source of
  // truth for referral attribution on this page — threaded into both
  // <UsernameChecker> instances (hero + bottom) as a prop.
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
</script>

<svelte:head>
  <title>SQRZ — The LinkInBio That Gets You Booked</title>
  <meta name="description" content="One professional profile to promote your work, manage bookings, and secure payments with clarity and trust.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── HERO ─────────────────────────────────────────────────────── -->
<section class="hero hero-bg">
  <div class="hero-overlay"></div>
  <div class="container hero-inner">

    <div class="hero-text">
      <p class="eyebrow">Promote.  Book.  Get Paid!</p>
      <h1 class="display-headline">
        THE<br><em>LINKINBIO</em><br>
        <span class="tight-line">THAT GETS YOU</span><br>
        <em>BOOKED</em>
      </h1>
      <!-- Username availability checker -->
      <UsernameChecker refCode={refCode} />
    </div>

  </div>
</section>

<!-- ── SECTION 1 — Showcase ─────────────────────────────────────── -->
<section class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-visual">
      <img src="/screens/_bg_01.png" alt="Sound engineer at mixing desk" class="feature-img section-img" />
    </div>
    <div class="feature-text">
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
<section class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-text">
      <h2 class="section-headline">Run Your<br><em>Booking Pipeline</em></h2>
      <p class="body-text">
        Clients don't just message you — they enter a structured flow.
        Scope, terms, collaboration, and payment move forward in one
        clear system.
      </p>
      <ul class="feature-list">
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
      <img src="/screens/_grow_bg_01.png" alt="Stage and crowd at live show" class="feature-img section-img" />
    </div>
  </div>
</section>

<!-- ── SECTION 3 — Grow ──────────────────────────────────────────── -->
<section class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-visual">
      <img src="/home_getpaid.avif" alt="Cruise ship — get paid to perform" class="feature-img section-img" />
    </div>
    <div class="feature-text">
      <h2 class="section-headline">Grow Your Reach,<br><em>Easily</em></h2>
      <p class="body-text">
        Focus on your craft, not your outreach. From your first Boost
        to Pixel-powered retargeting and Grow discovery — SQRZ runs
        the growth engine, so you can focus on getting booked.
      </p>
      <ul class="feature-list">
        {#each [
          'Boost campaigns put your profile in front of new audiences',
          'Pixel retargeting brings back your most engaged visitors',
          'Campaign management made easy, across every platform',
          'Understand where — and who — your visitors are',
        ] as item}
          <li><span class="check">→</span>{item}</li>
        {/each}
      </ul>
    </div>
  </div>
</section>



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


<!-- ── FEATURE TABS ────────────────────────────────────────────────── -->
<FeatureSection />



<!-- ── BOTTOM SLUG CHECKER ───────────────────────────────────────────
     Second instance of the same hero checker, same component, same
     refCode prop — not a fork. -->
<section class="bottom-checker-section dark">
  <div class="container bottom-checker-inner">
    <h2 class="section-headline light-text centered">Check Your Name<br><em>Now.</em></h2>
    <UsernameChecker refCode={refCode} />
  </div>
</section>

<style>
  /* ── RESET & BASE ───────────────────────────────────────────────── */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) {
    font-family: 'DM Sans', sans-serif;
    background: #f5f0eb;
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
    --light:        #f5f0eb;
    --white:        #ffffff;
    --mid:          rgba(255,255,255,0.55);
    --muted:        rgba(255,255,255,0.28);
    --border-dark:  rgba(245,166,35,0.25);
    --border-light: rgba(0,0,0,0.08);
    --radius-card:  12px;
    --radius-btn:   8px;
  }

  /* ── LAYOUT ─────────────────────────────────────────────────────── */
  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }


  /* ── BUTTONS ────────────────────────────────────────────────────── */
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

  /* ── TYPOGRAPHY ─────────────────────────────────────────────────── */
  .display-headline {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: clamp(52px, 7vw, 96px);
    line-height: 0.80;
    letter-spacing: 0;
    color: var(--white);
    text-transform: uppercase;
  }

  .display-headline em {
    font-style: normal;
    color: var(--accent);
  }

  .tight-line {
    display: inline-block;
    letter-spacing: -0.055em;
    white-space: nowrap;
  }

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
    font-family: Impact, sans-serif;
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
    background: #0a0a0a;
    padding: 164px 0 100px;
    min-height: 100vh;
    min-height: calc(var(--vh, 1svh) * 100);
  }

  .hero-bg {
    position: relative;
    background-image: url('/screens/sqrz_home_desktop.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    pointer-events: none;
    z-index: 0;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
  }

  .hero-text {
    max-width: 600px;

  }

  @media (max-width: 768px) {
    .hero-bg {
      background-image: url('/screens/sqrz_live-dashboard_mobile7.png');
    }

  .hero-text {
    width: min(80vw, 520px);
    max-width: 520px;
    margin: 0 auto;
  }
  
  .display-headline {
    font-size: clamp(56px, 15vw, 82px);
    line-height: 0.80;
    letter-spacing: -0.04em;
  }

  .tight-line {
    letter-spacing: -0.065em;
  }

  

    /* Feature sections: text above, image below on mobile */
    .feature-inner {
      display: flex;
      flex-direction: column;
    }
    .feature-visual {
      order: 1;
    }
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
    font-family: Impact, sans-serif;
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

  /* .username-* styles moved to UsernameChecker.svelte — the component now
     owns its own scoped styles, used by both instances on this page. */

  /* ── FEATURE SECTIONS ───────────────────────────────────────────── */
  .feature-section { padding: 100px 0; }
  .feature-section.light     { background: var(--light); }
  .feature-section.dark      { background: var(--dark-2); }
  .feature-section.warm-dark { background: #D4B896; }

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
    font-family: Impact, sans-serif;
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
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: 3.5rem;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 20px;
  }

  .step-title {
    font-family: Impact, sans-serif;
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
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--accent);
    flex-shrink: 0;
    min-width: 36px;
  }

  .ws-title {
    font-family: Impact, sans-serif;
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
    font-family: Impact, sans-serif;
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

  /* ── BOTTOM SLUG CHECKER ───────────────────────────────────────────── */
  .bottom-checker-section { background: var(--dark); padding: 100px 0 120px; }
  .bottom-checker-inner { display: flex; flex-direction: column; align-items: center; }

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
    .featured-section,
    .bottom-checker-section { padding: 72px 0; }

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

  @media (max-width: 480px) {
    .float-card--c { display: none; }
  }
</style>
