<script lang="ts">
  let { data } = $props();

  let query = $state('');

  const filtered = $derived(
    query.trim().length === 0
      ? data.venues
      : data.venues.filter((v: { id: string; name: string }) =>
          v.name.toLowerCase().includes(query.trim().toLowerCase())
        )
  );
</script>

<svelte:head>
  <title>Venues — SQRZ</title>
  <meta name="description" content="Browse venues on SQRZ." />
</svelte:head>

<section class="venues-hero">
  <div class="container">
    <p class="eyebrow">SQRZ</p>
    <h1>
      <span>Venues</span>
    </h1>
    <p class="hero-sub">Browse and search all venues on the SQRZ platform.</p>
  </div>
</section>

<section class="venues-section">
  <div class="container">
    <div class="search-row">
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          bind:value={query}
          placeholder="Search venues…"
          aria-label="Search venues"
          class="search-input"
        />
        {#if query.trim().length > 0}
          <button class="search-clear" onclick={() => query = ''} aria-label="Clear search">✕</button>
        {/if}
      </div>
      <p class="result-count">
        {filtered.length} {filtered.length === 1 ? 'venue' : 'venues'}
      </p>
    </div>

    {#if filtered.length > 0}
      <ul class="venues-list" aria-label="Venues">
        {#each filtered as venue (venue.id)}
          <li class="venue-row">
            <span class="venue-name">{venue.name}</span>
          </li>
        {/each}
      </ul>
    {:else}
      <div class="empty-state">
        <p class="empty-heading">No venues found</p>
        <p class="empty-sub">Try a different search term.</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* Hero */
  .venues-hero {
    padding: 148px 0 72px;
    background:
      linear-gradient(180deg, rgba(0,0,0,0.06), rgba(5,5,5,0.9) 100%),
      #050505;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .eyebrow {
    color: #f3b130;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 22px;
  }

  .venues-hero h1 {
    color: #fff;
    font-family: Impact, sans-serif;
    font-size: clamp(62px, 8vw, 116px);
    font-weight: 800;
    line-height: 0.85;
    text-transform: uppercase;
    letter-spacing: 0;
  }

  .venues-hero h1 span {
    display: block;
  }

  .hero-sub {
    max-width: 480px;
    margin-top: 26px;
    color: rgba(255,255,255,0.55);
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.7;
  }

  /* Content */
  .venues-section {
    padding: 56px 0 120px;
    background: #050505;
  }

  /* Search */
  .search-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    max-width: 480px;
  }

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.36);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 13px 40px 13px 42px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #fff;
    font-family: 'DM Sans', ui-sans-serif, sans-serif;
    font-size: 0.94rem;
    font-weight: 400;
    outline: none;
    transition: border-color 0.15s;
    -webkit-appearance: none;
  }

  .search-input::placeholder {
    color: rgba(255,255,255,0.3);
  }

  .search-input:focus {
    border-color: rgba(243,177,48,0.5);
  }

  /* Remove browser default search cancel button */
  .search-input::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  .search-clear {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 0.78rem;
    cursor: pointer;
    padding: 4px 6px;
    line-height: 1;
    transition: color 0.15s;
  }

  .search-clear:hover {
    color: rgba(255,255,255,0.8);
  }

  .result-count {
    color: rgba(255,255,255,0.3);
    font-size: 0.82rem;
    font-weight: 500;
    white-space: nowrap;
  }

  /* List */
  .venues-list {
    list-style: none;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .venue-row {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.15s;
  }

  .venue-name {
    color: rgba(255,255,255,0.88);
    font-size: 0.96rem;
    font-weight: 400;
  }

  /* Empty state */
  .empty-state {
    padding: 64px 0;
    text-align: center;
  }

  .empty-heading {
    color: #fff;
    font-family: Impact, sans-serif;
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .empty-sub {
    margin-top: 10px;
    color: rgba(255,255,255,0.44);
    font-size: 0.9rem;
  }

  /* Mobile */
  @media (max-width: 760px) {
    .container {
      padding: 0 24px;
    }

    .venues-hero {
      padding: 120px 0 54px;
    }

    .venues-hero h1 {
      font-size: clamp(50px, 13vw, 72px);
    }

    .search-row {
      flex-wrap: wrap;
      gap: 12px;
    }

    .search-wrap {
      max-width: 100%;
    }
  }
</style>
