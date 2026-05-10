<script lang="ts">
  export let data;

  const profiles = data.featuredProfiles ?? [];
</script>

<svelte:head>
  <title>Creators on SQRZ</title>
  <meta
    name="description"
    content="Explore creative professionals already using SQRZ."
  />
</svelte:head>

<section class="creators-hero">
  <div class="container">
    <p class="section-tag">Creators</p>
    <h1 class="section-headline light-text centered">
      MEET THE CREATIVES<br />
      <em>ALREADY ON SQRZ</em>
    </h1>
    <p class="creators-intro">
      Explore artists, performers, technicians, and creative professionals building their
      profile, booking flow, and business presence with SQRZ.
    </p>
  </div>
</section>

<section class="creators-section">
  <div class="container">
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
              {#if profile.skills?.length > 0}
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
    {:else}
      <p class="empty-state">No public profiles yet.</p>
    {/if}
  </div>
</section>

<style>
  .creators-hero {
    padding: 150px 0 70px;
    background:
      radial-gradient(circle at top, rgba(243, 177, 48, 0.16), transparent 38%),
      #050505;
  }

  .creators-section {
    padding: 40px 0 120px;
    background: #050505;
  }

  .creators-intro {
    max-width: 680px;
    margin: 24px auto 0;
    color: rgba(255, 255, 255, 0.68);
    text-align: center;
    font-size: 18px;
    line-height: 1.7;
  }

  .creators-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }

  .profile-card {
    position: relative;
    min-height: 360px;
    border-radius: 24px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .profile-card:hover {
    transform: translateY(-4px);
    border-color: rgba(243, 177, 48, 0.45);
    box-shadow: 0 32px 90px rgba(0, 0, 0, 0.42);
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
    padding: 22px;
    z-index: 1;
  }

  .profile-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
  }

  .skill-tag {
    font-size: 11px;
    font-weight: 700;
    color: #111;
    background: #f3b130;
    border-radius: 999px;
    padding: 5px 9px;
  }

  .profile-name {
    color: #fff;
    font-size: 22px;
    font-weight: 800;
    line-height: 1.1;
  }

  .profile-city {
    color: rgba(255, 255, 255, 0.64);
    font-size: 14px;
    margin-top: 6px;
  }

  .profile-link {
    display: inline-block;
    margin-top: 16px;
    color: #f3b130;
    font-size: 13px;
    font-weight: 700;
  }

  .empty-state {
    color: rgba(255, 255, 255, 0.58);
    text-align: center;
    padding: 80px 0;
  }

  @media (max-width: 1100px) {
    .creators-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 760px) {
    .creators-hero {
      padding: 120px 0 48px;
    }

    .creators-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .profile-card {
      min-height: 280px;
      border-radius: 18px;
    }

    .profile-card-content {
      padding: 16px;
    }

    .profile-name {
      font-size: 18px;
    }
  }
</style>