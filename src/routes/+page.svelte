<script lang="ts">
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import FeatureSection from '$lib/components/FeatureSection.svelte';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let { data }: { data: PageData } = $props();

  let username = $state('');
  let status = $state('idle'); // 'idle' | 'checking' | 'available' | 'taken'
  let refCode = $state('');
  let debounceTimer;

  // Capture ?ref=CODE from the URL and persist in localStorage — this is the
  // site's existing dynamic referral-attribution mechanism (predates this
  // pass). Used as-is for the slug-checker section below instead of a
  // hardcoded ref=willvilla, per the task's own instruction to prefer a
  // dynamic mechanism when one already exists.
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

  // Plain join URL (no slug) — used for the pre-check "Claim your link" CTA
  let baseJoinUrl = $derived(
    refCode ? `https://dashboard.sqrz.com/join?ref=${refCode}` : 'https://dashboard.sqrz.com/join'
  );

  // CTA button URL — uses the slug URL once available, otherwise base join URL
  let ctaUrl = $derived(status === 'available' ? joinUrl : baseJoinUrl);

  function onInput(e) {
    username = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    status = 'idle';
    clearTimeout(debounceTimer);
    if (username.length < 3) return;
    status = 'checking';
    debounceTimer = setTimeout(checkUsername, 500);
  }

  async function checkUsername() {
    const { data, error } = await supabase
      .from('profiles')
      .select('slug')
      .eq('slug', username)
      .maybeSingle();
    if (error) { status = 'idle'; return; }
    status = data ? 'taken' : 'available';
  }

  // ── FAQ (placeholder — see section below) ──────────────────────────
  // TODO: no FAQ copy for the general homepage existed in the codebase — the
  // only existing FAQ.svelte content is Grow-service-specific (mentions a
  // $1,000 ad budget), which both doesn't fit a general-audience homepage
  // FAQ and would violate "no pricing displayed anywhere" for this page.
  // These 4 are clearly-marked placeholders; swap in real copy, then drop
  // the "TODO: " prefixes.
  const faqs = [
    { q: 'TODO: What is SQRZ?', a: 'TODO — replace with real answer copy.' },
    { q: 'TODO: How long does it take to set up my profile?', a: 'TODO — replace with real answer copy.' },
    { q: 'TODO: Do I need any technical skills?', a: 'TODO — replace with real answer copy.' },
    { q: 'TODO: Can I use my own domain?', a: 'TODO — replace with real answer copy.' },
  ];
  let openFaq = $state<number | null>(null);
  function toggleFaq(i: number) {
    openFaq = openFaq === i ? null : i;
  }
</script>

<svelte:head>
  <title>SQRZ — The LinkInBio That Gets You Booked</title>
  <meta name="description" content="One professional profile to promote your work, manage bookings, and secure payments with clarity and trust.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── LOGO BAR ─────────────────────────────────────────────────────
     Single-page layout, no page-to-page nav to manage — just a static
     logo mark for branding, no menu/dropdown. Same treatment as the
     dashboard's Office page (logo-only top bar). -->
<nav class="logo-bar" aria-label="SQRZ">
  <a href="/" class="logo-bar-link" aria-label="SQRZ home">
    <img src="/sqrz-logo.png" alt="SQRZ" class="logo-bar-img" />
  </a>
</nav>

<!-- ── SECTION 1 — Explainer: Showcase Your Business ───────────────── -->
<section class="feature-section light first-section">
  <div class="container feature-inner">
    <div class="feature-visual">
      <img src="/screens/_bg_01.png" alt="Sound engineer at mixing desk" class="feature-img section-img" />
    </div>
    <div class="feature-text">
      <h2 class="section-headline">Showcase Your<br><em>Business</em></h2>
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

<!-- ── SECTION 2 — Explainer: Promote Your Offer ───────────────────── -->
<section class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-text">
      <h2 class="section-headline">Promote Your<br><em>Offer</em></h2>
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
          <li><span class="check accent">→</span>{item}</li>
        {/each}
      </ul>
    </div>
    <div class="feature-visual">
      <img src="/home_getpaid.avif" alt="Cruise ship — promote your offer" class="feature-img section-img" />
    </div>
  </div>
</section>

<!-- ── SECTION 3 — Explainer: Get Booked ────────────────────────────── -->
<section class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-text">
      <h2 class="section-headline">Get<br><em>Booked</em></h2>
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

<!-- ── SECTION 4 — Meet the Creatives (featured profiles) ───────────────
     Query already fixed and confirmed working — do not touch. -->
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

<!-- ── SECTION 5 — Grow (iOS only) ──────────────────────────────────── -->
<FeatureSection />

<!-- ── SECTION 6 — FAQ (placeholder copy, see script) ───────────────── -->
<section class="faq-section dark">
  <div class="container">
    <p class="section-tag">FAQ</p>
    <h2 class="section-headline light-text centered">Common<br><em>Questions</em></h2>
    <div class="faq-list">
      {#each faqs as faq, i}
        <div class="faq-item" class:open={openFaq === i}>
          <button class="faq-question" onclick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
            <span class="q-text">{faq.q}</span>
            <span class="faq-arrow" class:rotated={openFaq === i}>›</span>
          </button>
          {#if openFaq === i}
            <div class="faq-answer">
              <p>{faq.a}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── SECTION 7 — Claim your link (slug checker, no pricing) ───────── -->
<section class="slug-section dark">
  <div class="container">
    <p class="section-tag">Claim Your Link</p>
    <h2 class="section-headline light-text centered">Your Name.<br><em>Your SQRZ.</em></h2>

    <div class="username-checker">
      <div class="username-input-row">
        <div class="username-input-field">
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
        <a href={ctaUrl} class="username-cta-btn">Claim your link →</a>
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

  /* ── LOGO BAR ───────────────────────────────────────────────────── */
  .logo-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    background: rgba(8, 8, 8, 0.78);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .logo-bar-link {
    display: inline-flex;
    align-items: center;
    width: 44px;
    height: 44px;
  }

  .logo-bar-img {
    width: 36px;
    height: auto;
    display: block;
  }

  /* First section sits directly under the fixed logo bar */
  .first-section {
    padding-top: calc(64px + 100px);
  }

  /* ── BUTTONS ────────────────────────────────────────────────────── */
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

  /* ── TYPOGRAPHY ─────────────────────────────────────────────────── */
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

  .body-text {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8;
    color: #444444;
    margin-bottom: 28px;
  }

  /* ── USERNAME CHECKER ───────────────────────────────────────────── */
  .username-checker {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .username-input-row {
    display: flex;
    align-items: stretch;
    background: rgba(255,255,255,0.06);
    border: 2px solid rgba(245,166,35,0.45);
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    max-width: 520px;
  }
  .username-input-row:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(245,166,35,0.22);
  }

  .username-input-field {
    flex: 1;
    display: flex;
    align-items: stretch;
    min-width: 0;
  }

  .username-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 19px 12px 19px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: var(--white);
    min-width: 0;
    touch-action: manipulation;
  }
  .username-input::placeholder { color: rgba(255,255,255,0.3); }

  .username-suffix {
    display: flex;
    align-items: center;
    padding: 0 14px 0 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: rgba(255,255,255,0.35);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .username-cta-btn {
    display: flex;
    align-items: center;
    padding: 0 22px;
    background: var(--accent);
    color: var(--dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.2s, opacity 0.2s;
    letter-spacing: 0.01em;
  }
  .username-cta-btn:hover { opacity: 0.88; }

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

  .feature-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

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

  .check {
    color: var(--accent);
    font-family: monospace;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .check.accent { color: var(--accent); }

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

  /* ── FAQ ────────────────────────────────────────────────────────── */
  .faq-section { background: var(--dark-2); padding: 100px 0 120px; }

  .faq-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    align-items: start;
    margin-top: 64px;
  }

  @media (max-width: 900px) {
    .faq-list { grid-template-columns: 1fr; }
  }

  .faq-item {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    transition: border-color 0.2s;
  }
  .faq-item.open {
    border-color: rgba(245,166,35,0.3);
  }

  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 24px;
    background: rgba(255,255,255,0.03);
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .faq-question:hover { background: rgba(255,255,255,0.06); }
  .faq-item.open .faq-question { background: rgba(245,166,35,0.06); }

  .q-text {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--accent);
    line-height: 1.4;
  }

  .faq-arrow {
    font-size: 1.4rem;
    color: rgba(245,166,35,0.5);
    flex-shrink: 0;
    line-height: 1;
    transition: transform 0.25s ease, color 0.2s;
    display: inline-block;
    transform: rotate(90deg);
  }
  .faq-arrow.rotated {
    transform: rotate(270deg);
    color: var(--accent);
  }

  .faq-answer {
    padding: 0 24px 22px;
    background: rgba(245,166,35,0.04);
  }

  .faq-answer p {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.8;
    padding-top: 4px;
  }

  /* ── SLUG CHECKER (final CTA, no pricing) ─────────────────────────── */
  .slug-section { background: var(--dark); padding: 100px 0 140px; text-align: center; }

  /* ── RESPONSIVE ─────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .feature-inner {
      grid-template-columns: 1fr;
    }
    .feature-img { height: 280px; }
    .featured-grid { grid-template-columns: repeat(2, 1fr); }
    .container { padding: 0 24px; }

    /* Feature sections: text above, image below on mobile */
    .feature-inner {
      display: flex;
      flex-direction: column;
    }
    .feature-visual {
      order: 1;
    }

    .username-input-row { width: 100%; max-width: none; flex-direction: column; margin-left: auto; margin-right: auto; border-radius: 8px; }
    .username-input-field { width: 100%; }
    .username-input { padding: 14px 10px 14px 18px; font-size: 16px; }
    .username-suffix { font-size: 0.82rem; padding-right: 12px; }
    .username-cta-btn { padding: 14px 22px; justify-content: center; font-size: 0.85rem; border-radius: 0; }

    .feature-section,
    .featured-section,
    .faq-section,
    .slug-section { padding: 72px 0; }

    .first-section {
      padding-top: calc(64px + 48px);
    }
  }

  @media (max-width: 480px) {
    .feature-section { padding: 56px 0; }
  }
</style>
