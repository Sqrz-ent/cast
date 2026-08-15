<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import UsernameChecker from '$lib/components/UsernameChecker.svelte';
  import PhoneFrame from '$lib/components/PhoneFrame.svelte';
  import ExplainerTabBar from '$lib/components/ExplainerTabBar.svelte';
  import ExplainerArrows from '$lib/components/ExplainerArrows.svelte';
  import FAQ from '$lib/components/FAQ.svelte';

  let { data }: { data: PageData } = $props();

  // Finalized 2026-08-14, replacing the earlier placeholder set. Reuses
  // FAQ.svelte (built for /grow) via its `items` prop rather than /grow's
  // own hardcoded questions.
  const homeFaqs = [
    {
      q: 'How is SQRZ different from other LinkInBio providers?',
      a: "It's more than a link-in-bio — it's a growth tool, a booking companion, and a marketing agency in your pocket.",
    },
    {
      q: 'What are the costs?',
      a: 'No subscriptions. You only pay a variable commission (15–30%) on the advertising budget for campaigns you actually run.',
    },
    {
      q: 'Why iOS only?',
      a: "SQRZ isn't just a link-in-bio — it's your digital storefront. Get leads, chat with clients, and manage your growth on the fly. That belongs in your pocket, not on a desk.",
    },
    {
      q: "Why can't I find SQRZ on the App Store?",
      a: "We're currently in private beta — only invited users can join right now, via TestFlight rather than a public App Store listing. Claim your link below and we'll be in touch.",
    },
  ];

  // Set --vh CSS variable for reliable mobile viewport height
  onMount(() => {
    const setVh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    window.addEventListener('resize', setVh);
    setVh();
    return () => window.removeEventListener('resize', setVh);
  });

  // sqrz_ref/?ref= capture removed (2026-08-14) — it existed solely to feed
  // <UsernameChecker>'s referral param, which no longer redirects anywhere.
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
      <p class="eyebrow">Advertise Smarter. Book More.</p>
      <h1 class="display-headline">
        THE<br><em>LINKINBIO</em><br>
        <span class="tight-line">THAT GETS YOU</span><br>
        <em>BOOKED</em>
      </h1>
      <!-- Username availability checker -->
      <UsernameChecker />
    </div>

  </div>
</section>

<!-- ── EXPLAINER SECTIONS (Showcase / Pipeline / Grow / Notifications) ─────
     2026-08-14 "let the phone do the explaining" pass, extended same day
     to a 4th section + a scoped tab bar (ExplainerTabBar.svelte), then
     again same day to a horizontal scroll-snap carousel (see #explainer-wrap
     CSS below) — swipe/scroll sideways through the 4 sections instead of
     scrolling down past them. Tab bar was un-floated the same day too — it's
     the last child of .explainer-carousel now (normal document flow, sits
     at the carousel's bottom edge, scrolls with the page like the rest of
     this block) rather than position: fixed over the viewport, so it no
     longer needs its own visibility IntersectionObserver — it just appears
     and disappears with its parent section like everything else on the
     page. #explainer-wrap id is still doing double duty for
     ExplainerTabBar: it's the scrollable element the bar scrolls
     horizontally + scroll-spies on tap/swipe (unrelated to the bar's own
     vertical position now). Keep the id if this block is restructured. -->
<div class="explainer-carousel">
<div id="explainer-wrap">

<!-- ── SECTION 1 — Showcase ───────────────────────────────────────── -->
<section id="showcase" class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-visual">
      <PhoneFrame src="/images/studio/01_Showcase.png" alt="SQRZ profile screen" label="Profile Screen" />
    </div>
    <div class="feature-text">
      <h2 class="section-headline">Showcase Your<br><em>Best Work</em></h2>
      <p class="section-tagline">One profile. Every gig starts here.</p>
      <p class="body-text">One link says everything a booker needs to know about you. No more digging through Instagram DMs or hunting down a rate card — just a clean, professional page that does the selling before you ever reply.</p>
    </div>
  </div>
</section>

<!-- ── SECTION 2 — Pipeline ──────────────────────────────────────── -->
<section id="pipeline" class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-text">
      <h2 class="section-headline">Run Your<br><em>Booking Pipeline</em></h2>
      <p class="section-tagline">Bookings that move themselves forward.</p>
      <p class="body-text">Every inquiry — a web form, a fan message, a venue reaching out — lands in one place instead of scattered across five apps. Reply, keep it active, or archive it once it's handled, so nothing quietly falls through the cracks.</p>
    </div>
    <div class="feature-visual">
      <PhoneFrame src="/images/studio/02_Bookings.png" alt="SQRZ bookings screen" label="Bookings Screen" />
    </div>
  </div>
</section>

<!-- ── SECTION 3 — Grow ──────────────────────────────────────────── -->
<section id="grow" class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-visual">
      <PhoneFrame src="/images/studio/03_Grow.png" alt="SQRZ Grow campaigns screen" label="Grow Screen" />
    </div>
    <div class="feature-text">
      <h2 class="section-headline">Grow Your Reach,<br><em>Easily</em></h2>
      <p class="section-tagline">Get seen. Get booked. Automatically.</p>
      <p class="body-text">Put a budget behind your profile and watch exactly who's finding it, and where they're coming from. Real numbers instead of guesswork, so you can tell what's actually bringing in bookings.</p>
    </div>
  </div>
</section>

<!-- ── SECTION 4 — Notifications ────────────────────────────────────
     Added 2026-08-14 alongside the tab bar. Picked over a Leads/chat or
     a second Grow-campaigns section because both of those are already
     covered (Pipeline + Grow above) — push alerts are the one shipped,
     genuinely uncovered feature, and the mockup itself doubles as the
     clearest "this is a real app" visual of the four. -->
<section id="notifications" class="feature-section light">
  <div class="container feature-inner">
    <div class="feature-text">
      <h2 class="section-headline">Know The Moment<br><em>It Happens</em></h2>
      <p class="section-tagline">Push alerts for leads, messages, and campaign updates.</p>
      <p class="body-text">The moment a lead comes in or a campaign changes status, you're the first to know — not the next time you happen to open the app. Stay ahead of the business side without babysitting a dashboard all day.</p>
    </div>
    <div class="feature-visual">
      <PhoneFrame src="/images/studio/04_Notifications.png" alt="SQRZ notifications screen" label="Notifications Screen" />
    </div>
  </div>
</section>

</div>
<ExplainerArrows />
<ExplainerTabBar />
</div>

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

<!-- ── FAQ ──────────────────────────────────────────────────────────
     Reuses FAQ.svelte (built for /grow) via its `items` prop — see homeFaqs
     above (finalized copy, 2026-08-14). -->
<FAQ items={homeFaqs} light />

<!-- ── BOTTOM SLUG CHECKER ───────────────────────────────────────────
     Second instance of the same hero checker, same component — not a fork.
     Cream/full-viewport treatment (2026-08-14) — see .bottom-checker-section
     below. Dropped the `dark` class (there was never a compound
     .bottom-checker-section.dark rule backing it — inert, and actively
     misleading now) and `light-text` off the headline (default
     .section-headline color is already dark, same as every other
     already-cream section on this page — no override needed). -->
<section class="bottom-checker-section">
  <div class="container bottom-checker-inner">
    <h2 class="section-headline centered">Claim Your<br><em>SQRZ Link</em></h2>
    <UsernameChecker light />
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
    margin-top: 12px;
    margin-bottom: 28px;
  }
  .body-text.mid-text { color: var(--mid); }

  /* ── HERO ───────────────────────────────────────────────────────── */
  .hero {
    background: #0a0a0a;
    padding: 100px 0 100px;
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

  /* Horizontal scroll-snap carousel (2026-08-14) — #explainer-wrap holds the
     4 explainer sections side by side instead of stacked; each is one
     full-width "page" you swipe/scroll sideways between, like swiping
     between app screens (reinforces the same "preview of the app" feel as
     the bottom tab bar). Scoped to just this block — the page's vertical
     flow around it (Hero → this block → Meet the Creatives) is untouched.
     Height isn't hardcoded: flex's default align-items:stretch sizes every
     slide to the tallest one, same as when they were stacked vertically. */
  /* .explainer-carousel wraps #explainer-wrap solely so ExplainerArrows has
     a non-scrolling positioned ancestor to anchor to. Learned the hard way:
     position:absolute children of #explainer-wrap itself still scroll
     along with its horizontal content (removing an element from flex
     layout doesn't exempt it from its own containing block's scroll
     offset) — confirmed via a real click-through, the left arrow ended up
     thousands of pixels off-screen after scrolling a few sections in. This
     outer wrapper never scrolls itself (only its #explainer-wrap child
     does), so the arrows correctly stay fixed at the visual edges. */
  .explainer-carousel {
    position: relative;
  }

  #explainer-wrap {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }
  #explainer-wrap::-webkit-scrollbar { display: none; } /* Chrome/Safari */

  #explainer-wrap > .feature-section {
    flex: 0 0 100%;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  .feature-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .feature-inner.reverse { direction: rtl; }
  .feature-inner.reverse > * { direction: ltr; }

  /* One-line tagline replacing the old paragraph+bullet-list copy in the
     three explainer sections (2026-08-14 "let the phone do the explaining"
     pass) — the phone frame carries the rest. */
  .section-tagline {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5;
    color: #444444;
    margin: 0;
  }

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
  /* Full-viewport cream close, same vertical rhythm as .hero (2026-08-14):
     same min-height:100vh / --vh pair (the --vh custom property is already
     set on documentElement by this page's onMount, for the same reliable-
     mobile-viewport-height reason the hero uses it), same cream #f5f0eb
     already established for the popup/tab bar/FAQ — reused verbatim, not a
     new color. justify-content:center vertically centers the content block
     within that full height; .bottom-checker-inner's own flex handles
     centering the headline/checker within that block, unchanged. */
  .bottom-checker-section {
    background: #f5f0eb;
    padding: 100px 0 120px;
    min-height: 100vh;
    min-height: calc(var(--vh, 1svh) * 100);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
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
    .audience-grid,
    .steps-grid {
      grid-template-columns: 1fr;
    }
    .featured-grid { grid-template-columns: repeat(2, 1fr); }
    .container { padding: 0 24px; }
    .hero { padding: 120px 0 80px; }
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
