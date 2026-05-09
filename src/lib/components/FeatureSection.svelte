<script lang="ts">
  let activeTab = $state(0);

  const tabs = [
    {
      label: 'Dashboard',
      img: '/screens/sqrz_live-dashboard.png?v=2',
      imgAlt: 'SQRZ live dashboard',
      headline: 'Your Professional\nCommand Center',
      bullets: [
        'Analytics, bookings, and services in one view',
        'Real-time updates on incoming requests',
        'Manage your entire presence without the noise',
      ],
    },
    {
      label: 'Office',
      img: '/screens/sqrz_office.png?v=2',
      imgAlt: 'SQRZ office',
      headline: 'Run a Structured\nBooking Pipeline',
      bullets: [
        'Structured requests — no back-and-forth',
        'Defined scope and terms before any commitment',
        'Every project tracked from request to delivery',
      ],
    },
    {
      label: 'Promotion',
      img: '/screens/sqrz_boost.png?v=2',
      imgAlt: 'SQRZ promotion',
      headline: 'Promote Your Work\nIntelligently',
      bullets: [
        'Targeted campaigns built around your services',
        'Reach the right clients at the right moment',
        'Track performance from click to booking',
      ],
    },
    {
      label: 'Booking Wallet',
      img: '/screens/sqrz-wallet.png?v=2',
      imgAlt: 'SQRZ booking wallet',
      headline: 'Payments Tied\nto Delivery',
      bullets: [
        'Deposits secured before work begins',
        'Budget allocated across the team',
        'Payments released on confirmed delivery',
      ],
    },
  ];

  let touchStartX = 0;

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }

  function onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0 && activeTab < tabs.length - 1) activeTab++;
    if (dx > 0 && activeTab > 0) activeTab--;
  }
</script>

<section class="feature-tabs-section">
  <div class="ft-container">

    <p class="ft-eyebrow">Built for Professionals</p>
    <h2 class="ft-heading">Everything you need<br><em>in one platform</em></h2>

    <!-- Tab strip -->
    <div class="tab-strip" role="tablist">
      {#each tabs as tab, i}
        <button
          class="tab-btn"
          class:active={activeTab === i}
          role="tab"
          aria-selected={activeTab === i}
          onclick={() => (activeTab = i)}
        >
          {tab.label}
        </button>
      {/each}
    </div>

    <!-- Cards -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="tab-cards"
      ontouchstart={onTouchStart}
      ontouchend={onTouchEnd}
    >
      {#each tabs as tab, i}
        <div class="tab-card" class:active={activeTab === i} aria-hidden={activeTab !== i}>
          <div class="tab-card-text">
            <p class="tab-label">{tab.label}</p>
            <h3 class="tab-headline">{tab.headline}</h3>
            <ul class="tab-bullets">
              {#each tab.bullets as bullet}
                <li><span class="tab-check">→</span>{bullet}</li>
              {/each}
            </ul>
          </div>
          <div class="tab-card-visual">
            <img src={tab.img} alt={tab.imgAlt} class="tab-img" loading="lazy" />
          </div>
        </div>
      {/each}
    </div>

    <!-- Dot indicators (mobile) -->
    <div class="dot-row">
      {#each tabs as _, i}
        <button
          class="dot"
          class:active={activeTab === i}
          aria-label="Go to tab {i + 1}"
          onclick={() => (activeTab = i)}
        ></button>
      {/each}
    </div>

  </div>
</section>

<style>
  .feature-tabs-section {
    background: var(--light);
    padding: 100px 0;
    font-family: 'DM Sans', sans-serif;
  }

  .ft-container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* Heading */
  .ft-eyebrow {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    text-align: center;
    display: block;
    margin-bottom: 16px;
  }

  .ft-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 5vw, 60px);
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: var(--dark);
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 56px;
  }
  .ft-heading em {
    font-style: normal;
    color: var(--accent);
  }

  /* Tab strip */
  .tab-strip {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .tab-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.4);
    background: none;
    border: none;
    padding: 8px 20px;
    border-radius: 999px;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }
  .tab-btn:hover {
    color: rgba(0, 0, 0, 0.7);
    background: rgba(0, 0, 0, 0.05);
  }
  .tab-btn.active {
    color: var(--accent);
    background: rgba(245, 166, 35, 0.1);
    font-weight: 600;
  }

  /* Cards */
  .tab-cards {
    position: relative;
  }

  .tab-card {
    display: none;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
    background: #ffffff;
    border-radius: 20px;
    padding: 48px 56px;
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.07);
  }
  .tab-card.active {
    display: grid;
  }

  /* Left: text */
  .tab-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  .tab-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--dark);
    line-height: 1.15;
    text-transform: uppercase;
    white-space: pre-line;
    margin-bottom: 28px;
  }

  .tab-bullets {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .tab-bullets li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.9rem;
    color: #555555;
    line-height: 1.55;
  }
  .tab-check {
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* Right: image */
  .tab-card-visual {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
  .tab-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* Dots (mobile only) */
  .dot-row {
    display: none;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.18);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.15s, transform 0.15s;
  }
  .dot.active {
    background: var(--accent);
    transform: scale(1.3);
  }

  /* Mobile */
  @media (max-width: 860px) {
    .feature-tabs-section {
      padding: 72px 0;
    }
    .ft-container {
      padding: 0 24px;
    }
    .ft-heading {
      margin-bottom: 40px;
    }
    .tab-strip {
      gap: 2px;
      margin-bottom: 28px;
    }
    .tab-btn {
      font-size: 0.8rem;
      padding: 7px 14px;
    }
    .tab-card {
      display: none;
      grid-template-columns: 1fr;
      padding: 28px 24px;
      gap: 28px;
    }
    .tab-card.active {
      display: grid;
    }
    .tab-headline {
      font-size: 1.6rem;
    }
    .dot-row {
      display: flex;
    }
  }

  @media (max-width: 480px) {
    .tab-btn {
      font-size: 0.75rem;
      padding: 6px 12px;
    }
  }
</style>
