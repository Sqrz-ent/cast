

<script lang="ts">
  export let data;

  const profiles = data.featuredProfiles ?? [];
  const categories = ['All', 'DJs', 'Hosts', 'Models', 'Performers', 'Creators'];
  const placeholderCards = [
    { initials: 'DJ', title: 'Club DJs', meta: 'Nightlife and festivals' },
    { initials: 'MC', title: 'Hosts', meta: 'Events and brand moments' },
    { initials: 'PR', title: 'Performers', meta: 'Stage-ready talent' },
    { initials: 'CR', title: 'Creators', meta: 'Social-first professionals' }
  ];
  const processSteps = [
    {
      eyebrow: '01',
      title: 'Discover',
      body: 'Browse selected professionals with clear services, style cues, and public booking profiles.'
    },
    {
      eyebrow: '02',
      title: 'Request',
      body: 'Send a structured booking request through the profile flow instead of loose DMs.'
    },
    {
      eyebrow: '03',
      title: 'Accept',
      body: 'The professional reviews the inquiry and confirms whether the booking fits.'
    },
    {
      eyebrow: '04',
      title: 'Pay',
      body: 'Move from interest to a paid booking with clearer next steps and less back-and-forth.'
    }
  ];
</script>

<section class="creators-hero">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="section-tag">SQRZ Cast</p>
        <h1>
          <span>The curated</span>
          <em>roster for</em>
          <span>bookable</span>
          <span>professionals.</span>
        </h1>
        <p class="hero-sub">
          Discover selected SQRZ profiles built for serious inquiries, clear services, and direct booking requests.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="creators-section">
  <div class="container">
    <div class="roster-header">
      <div>
        <p class="section-kicker">Featured profiles</p>
        <h2>Selected for real-world bookings.</h2>
      </div>

      <div class="filter-row" aria-label="Profile categories">
        {#each categories as category, index}
          <button class:active={index === 0} type="button">{category}</button>
        {/each}
      </div>
    </div>

    {#if profiles.length > 0}
      <div class="creators-grid">
        {#each profiles as profile}
          <a
            href="https://{profile.slug}.sqrz.com"
            target="_blank"
            rel="noopener noreferrer"
            class="profile-card"
            style="background-image: url({profile.avatarUrl ?? ''}); background-color: #1a1a1a;"
          >
            <div class="profile-card-overlay"></div>

            <div class="profile-card-content">
              <div class="profile-meta-row">
                <span>Verified profile</span>
                {#if profile.city}
                  <span>{profile.city}</span>
                {/if}
              </div>

              {#if profile.skills?.length > 0}
                <div class="profile-skills">
                  {#each profile.skills as skill}
                    <span class="skill-tag">{skill}</span>
                  {/each}
                </div>
              {/if}

              <div class="profile-name">{profile.name}</div>

              <span class="profile-link">View profile →</span>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="empty-roster">
        <div class="empty-copy">
          <p class="section-kicker">Roster in preparation</p>
          <h3>Public profiles are being reviewed and added.</h3>
          <p>
            Cast is designed as a curated discovery layer for SQRZ users with bookable profiles. The first public roster will appear here as profiles are approved.
          </p>
          <a href="https://dashboard.sqrz.com/join" class="empty-cta">Create your profile →</a>
        </div>

        <div class="placeholder-grid" aria-hidden="true">
          {#each placeholderCards as card}
            <div class="placeholder-card">
              <div class="placeholder-avatar">{card.initials}</div>
              <div>
                <strong>{card.title}</strong>
                <span>{card.meta}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<section class="cast-proof">
  <div class="container">
    <div class="proof-inner">
      <p class="section-kicker">Built for booking intent</p>
      <h2>Every Cast profile points back to a SQRZ booking flow.</h2>
      <div class="proof-list">
        <span>Public profile</span>
        <span>Service menu</span>
        <span>Direct request flow</span>
      </div>
    </div>
  </div>
</section>

<section class="process-section">
  <div class="container">
    <div class="process-grid">
      {#each processSteps as step}
        <article class="process-card">
          <span>{step.eyebrow}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="cast-cta-section">
  <div class="container">
    <div class="cast-cta">
      <div>
        <p class="section-kicker">For professionals</p>
        <h2>Want to be listed on Cast?</h2>
        <p>Build your SQRZ profile first. Selected profiles will be featured as the roster grows.</p>
      </div>
      <a href="https://dashboard.sqrz.com/join">Create profile →</a>
    </div>
  </div>
</section>

<style>
  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .creators-hero {
    padding: 156px 0 86px;
    background:
      linear-gradient(90deg, rgba(0,0,0,0.76), rgba(0,0,0,0.38) 52%, rgba(0,0,0,0.5)),
      linear-gradient(180deg, rgba(0,0,0,0.04), rgba(5,5,5,0.82) 100%),
      url('/grow_whatitis.avif') center / cover no-repeat;
  }

  .creators-section {
    padding: 54px 0 110px;
    background: #050505;
  }

  .hero-grid {
    max-width: 820px;
  }

  .section-tag,
  .section-kicker {
    color: #f3b130;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .section-tag {
    margin-bottom: 22px;
  }

  .hero-copy h1 {
    max-width: 780px;
    color: #fff;
    font-family: Impact, sans-serif;
    font-size: clamp(62px, 8vw, 116px);
    font-weight: 800;
    line-height: 0.8;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .hero-copy h1 span,
  .hero-copy h1 em {
    display: block;
  }

  .hero-copy h1 em {
    color: #f3b130;
    font-style: normal;
  }

  .hero-sub {
    max-width: 520px;
    margin-top: 28px;
    color: rgba(255, 255, 255, 0.62);
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.7;
  }

  .placeholder-avatar {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: rgba(243, 177, 48, 0.16);
    color: #f3b130;
    font-size: 0.75rem;
    font-weight: 800;
  }

  .placeholder-card strong {
    display: block;
    color: #fff;
    font-size: 0.92rem;
  }

  .placeholder-card span {
    display: block;
    margin-top: 3px;
    color: rgba(255,255,255,0.46);
    font-size: 0.78rem;
  }

  .roster-header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 28px;
  }

  .roster-header h2,
  .proof-inner h2,
  .cast-cta h2 {
    margin-top: 10px;
    color: #fff;
    font-family: Impact, sans-serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .filter-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
  }

  .filter-row button {
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    padding: 9px 13px;
    background: transparent;
    color: rgba(255,255,255,0.56);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 700;
  }

  .filter-row button.active {
    border-color: rgba(243,177,48,0.48);
    background: rgba(243,177,48,0.12);
    color: #f3b130;
  }

  .creators-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }

  .profile-card {
    position: relative;
    min-height: 360px;
    border-radius: 8px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    text-decoration: none;
    border: 0;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .profile-card:hover {
    transform: translateY(-5px);
    box-shadow:
      inset 0 0 0 1px rgba(243, 177, 48, 0.42),
      0 32px 90px rgba(0, 0, 0, 0.42);
  }

  .profile-card-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to top, rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.12)),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.18), transparent);
  }

  .profile-card-content {
    position: absolute;
    inset: auto 0 0;
    padding: 20px;
    z-index: 1;
  }

  .profile-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-bottom: 12px;
  }

  .profile-meta-row span {
    color: rgba(255,255,255,0.66);
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 999px;
    padding: 5px 8px;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .profile-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
  }

  .skill-tag {
    font-size: 0.66rem;
    font-weight: 800;
    color: #f3b130;
    background: rgba(243,177,48,0.14);
    border-radius: 999px;
    padding: 5px 8px;
  }

  .profile-name {
    color: #fff;
    font-size: 22px;
    font-weight: 800;
    line-height: 1.1;
  }

  .profile-link {
    display: inline-block;
    margin-top: 16px;
    color: #f3b130;
    font-size: 13px;
    font-weight: 700;
  }

  .empty-roster {
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(320px, 1fr);
    gap: 44px;
    align-items: center;
    padding: 34px;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 8px;
    background: rgba(255,255,255,0.035);
  }

  .empty-copy h3 {
    margin-top: 10px;
    color: #fff;
    font-family: Impact, sans-serif;
    font-size: clamp(34px, 5vw, 58px);
    line-height: 0.92;
    text-transform: uppercase;
  }

  .empty-copy p {
    max-width: 460px;
    margin-top: 18px;
    color: rgba(255,255,255,0.58);
    line-height: 1.7;
  }

  .empty-cta,
  .cast-cta a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 26px;
    min-height: 46px;
    padding: 0 20px;
    border-radius: 8px;
    background: #f3b130;
    color: #111;
    font-size: 0.88rem;
    font-weight: 800;
    text-decoration: none;
  }

  .placeholder-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .placeholder-card {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 128px;
    padding: 16px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  }

  .process-section,
  .cast-proof,
  .cast-cta-section {
    background: #050505;
  }

  .process-section {
    padding: 0 0 110px;
  }

  .process-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .process-card {
    min-height: 250px;
    padding: 30px 28px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }

  .process-card:last-child {
    border-right: 0;
  }

  .process-card span {
    color: rgba(243,177,48,0.8);
    font-size: 0.72rem;
    font-weight: 800;
  }

  .process-card h3 {
    margin-top: 42px;
    color: #fff;
    font-family: Impact, sans-serif;
    font-size: 2.1rem;
    line-height: 1;
    text-transform: uppercase;
  }

  .process-card p {
    margin-top: 16px;
    color: rgba(255,255,255,0.56);
    font-size: 0.92rem;
    line-height: 1.7;
  }

  .cast-proof {
    padding: 0 0 42px;
  }

  .proof-inner {
    padding: 46px;
    border-radius: 8px;
    background:
      linear-gradient(90deg, rgba(243,177,48,0.16), rgba(255,255,255,0.035));
    border: 1px solid rgba(243,177,48,0.22);
  }

  .proof-inner h2 {
    max-width: 790px;
  }

  .proof-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 34px;
  }

  .proof-list span {
    padding: 10px 13px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    color: rgba(255,255,255,0.72);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .cast-cta-section {
    padding: 0 0 120px;
  }

  .cast-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 36px;
    padding: 34px 0 0;
  }

  .cast-cta p:last-child {
    max-width: 500px;
    margin-top: 16px;
    color: rgba(255,255,255,0.58);
    line-height: 1.7;
  }

  .cast-cta a {
    margin-top: 0;
    flex-shrink: 0;
  }

  @media (max-width: 1100px) {
    .creators-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 760px) {
    .creators-hero {
      padding: 128px 0 54px;
    }

    .container {
      padding: 0 24px;
    }

    .empty-roster,
    .cast-cta {
      grid-template-columns: 1fr;
      display: grid;
      gap: 28px;
    }

    .hero-copy h1 {
      font-size: clamp(48px, 13vw, 68px);
      line-height: 0.8;
      letter-spacing: -0.02em;
    }

    .roster-header {
      display: grid;
      gap: 20px;
      align-items: start;
    }

    .filter-row {
      justify-content: flex-start;
      overflow-x: auto;
      flex-wrap: nowrap;
      padding-bottom: 4px;
    }

    .creators-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .profile-card {
      min-height: 280px;
    }

    .profile-card-content {
      padding: 16px;
    }

    .profile-name {
      font-size: 18px;
    }

    .placeholder-grid,
    .process-grid {
      grid-template-columns: 1fr;
    }

    .empty-roster,
    .proof-inner {
      padding: 24px;
    }

    .process-card {
      min-height: auto;
      border-right: 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .process-card:last-child {
      border-bottom: 0;
    }

    .cast-cta {
      align-items: start;
    }
  }
</style>
