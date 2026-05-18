<script lang="ts">
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
  import { page } from '$app/state';

  type Venue = {
    id: string;
    name: string;
    description: string | null;
    type: string | null;
    city: string | null;
    country_code: string | null;
    site: string | null;
    photo: string | null;
    hubspot_company_id: string | null;
    flagged: boolean;
    reported: boolean;
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    twitter: string | null;
    youtube: string | null;
    whatsapp: string | null;
    rating: string | null;
    reviews: string | null;
    subtypes: string | null;
    phone: string | null;
    email_1: string | null;
    email_2: string | null;
    email_3: string | null;
    street: string | null;
    postal_code: string | null;
    state: string | null;
  };

  function formatReviews(s: string | null): string {
    if (!s) return '';
    const n = parseInt(s, 10);
    return isNaN(n) ? s : n.toLocaleString();
  }

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let { data } = $props();

  const PAGE_SIZE: number = data.pageSize;

  const SORT_OPTIONS = [
    { label: 'Name A–Z',        value: 'name_asc'    },
    { label: 'Name Z–A',        value: 'name_desc'   },
    { label: 'Rating high–low', value: 'rating_desc' },
    { label: 'Rating low–high', value: 'rating_asc'  },
    { label: 'City A–Z',        value: 'city_asc'    },
    { label: 'City Z–A',        value: 'city_desc'   },
  ] as const;

  type SortValue = typeof SORT_OPTIONS[number]['value'];

  const SORT_MAP: Record<SortValue, { column: string; ascending: boolean; nullsFirst: boolean }> = {
    name_asc:    { column: 'name',   ascending: true,  nullsFirst: true  },
    name_desc:   { column: 'name',   ascending: false, nullsFirst: true  },
    rating_desc: { column: 'rating', ascending: false, nullsFirst: false },
    rating_asc:  { column: 'rating', ascending: true,  nullsFirst: false },
    city_asc:    { column: 'city',   ascending: true,  nullsFirst: false },
    city_desc:   { column: 'city',   ascending: false, nullsFirst: false },
  };

  const TYPE_OPTIONS = [
    { label: 'All', value: '' },
    { label: 'Live music venue', value: 'Live music venue' },
    { label: 'Art center', value: 'Art center' },
    { label: 'Bar', value: 'Bar' },
    { label: 'Event venue', value: 'Event venue' },
    { label: 'Night club', value: 'Night club' },
    { label: 'Cocktail bar', value: 'Cocktail bar' },
    { label: 'Concert hall', value: 'Concert hall' },
    { label: 'Performing arts theater', value: 'Performing arts theater' },
  ];

  let venues = $state<Venue[]>(data.venues);
  let query = $state('');
  let countryFilter = $state('');
  let typeFilter = $state('');
  let cityFilter = $state('');
  let cityInput = $state('');
  let cityResults = $state<string[]>([]);
  let cityDropdownOpen = $state(false);
  let locationTab = $state<'country' | 'city'>('country');
  let sortKey = $state<SortValue>('name_asc');
  let offset = $state<number>(data.venues.length);
  let hasMore = $state(data.venues.length === PAGE_SIZE);
  let filteredCount = $state<number | null>(null);
  let loading = $state(false);
  let loadingMore = $state(false);

  const hasFilter = $derived(!!(query.trim() || countryFilter || typeFilter || cityFilter));
  let selectedVenue = $state<Venue | null>(null);

  const internalMode = $derived(page.url.searchParams.get('mode') === 'internal');

  let debounceTimer: ReturnType<typeof setTimeout>;
  let cityDebounceTimer: ReturnType<typeof setTimeout>;

  $effect(() => () => { clearTimeout(debounceTimer); clearTimeout(cityDebounceTimer); });

  async function fetchVenues(reset = true) {
    const currentOffset = reset ? 0 : offset;
    if (reset) loading = true;
    else loadingMore = true;

    let q = supabase
      .from('venues')
      .select('id, name, description, subtypes, type, city, country_code, site, photo, hubspot_company_id, flagged, reported, facebook, instagram, linkedin, twitter, youtube, whatsapp, rating, reviews, phone, email_1, email_2, email_3, street, postal_code, state', { count: 'exact' })
      .eq('reported', false);

    if (query.trim()) {
      const q_str = query.trim();
      q = q.or(`name.ilike.%${q_str}%,description.ilike.%${q_str}%,subtypes.ilike.%${q_str}%`);
    }

    if (countryFilter) {
      q = q.eq('country_code', countryFilter);
    }

    if (typeFilter) {
      q = q.ilike('type', `%${typeFilter}%`);
    }

    if (cityFilter) {
      q = q.eq('city', cityFilter);
    }

    const s = SORT_MAP[sortKey];
    q = q.order(s.column, { ascending: s.ascending, nullsFirst: s.nullsFirst }).range(currentOffset, currentOffset + PAGE_SIZE - 1);

    const { data: rows, count } = await q;
    const results = (rows ?? []) as Venue[];

    if (reset) {
      venues = results;
      offset = results.length;
      filteredCount = count;
    } else {
      venues = [...venues, ...results];
      offset = venues.length;
    }

    hasMore = results.length === PAGE_SIZE;
    if (reset) loading = false;
    else loadingMore = false;
  }

  function onSearchInput(e: Event) {
    query = (e.target as HTMLInputElement).value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fetchVenues(true), 300);
  }

  function clearSearch() {
    query = '';
    clearTimeout(debounceTimer);
    fetchVenues(true);
  }

  function onCountryChange(e: Event) {
    countryFilter = (e.target as HTMLSelectElement).value;
    cityFilter = ''; cityInput = ''; cityResults = []; cityDropdownOpen = false;
    fetchVenues(true);
  }

  function switchLocationTab(tab: 'country' | 'city') {
    locationTab = tab;
    if (tab === 'country') {
      cityFilter = ''; cityInput = ''; cityResults = []; cityDropdownOpen = false;
      fetchVenues(true);
    } else {
      countryFilter = '';
      fetchVenues(true);
    }
  }

  async function toggleFlag(venue: Venue) {
    const newVal = !venue.flagged;
    venues = venues.map(v => v.id === venue.id ? { ...v, flagged: newVal } : v);
    if (selectedVenue?.id === venue.id) selectedVenue = { ...selectedVenue, flagged: newVal };
    const { error } = await supabase.from('venues').update({ flagged: newVal }).eq('id', venue.id);
    if (error) {
      venues = venues.map(v => v.id === venue.id ? { ...v, flagged: !newVal } : v);
      if (selectedVenue?.id === venue.id) selectedVenue = { ...selectedVenue, flagged: !newVal };
    }
  }

  async function reportVenue(venue: Venue) {
    venues = venues.filter(v => v.id !== venue.id);
    if (selectedVenue?.id === venue.id) selectedVenue = null;
    const { error } = await supabase.from('venues').update({ reported: true }).eq('id', venue.id);
    if (error) await fetchVenues(true);
  }

  async function fetchCitySuggestions(val: string) {
    if (val.length < 2) { cityResults = []; cityDropdownOpen = false; return; }
    const { data: rows } = await supabase
      .from('venues')
      .select('city')
      .ilike('city', `%${val}%`)
      .eq('reported', false)
      .not('city', 'is', null)
      .order('city', { ascending: true })
      .limit(10);
    const seen = new Set<string>();
    cityResults = (rows ?? [])
      .map((r: { city: string | null }) => r.city as string)
      .filter((c: string) => { if (seen.has(c)) return false; seen.add(c); return true; });
    cityDropdownOpen = cityResults.length > 0;
  }

  function onCityInput(e: Event) {
    cityInput = (e.target as HTMLInputElement).value;
    if (cityFilter) { cityFilter = ''; fetchVenues(true); }
    clearTimeout(cityDebounceTimer);
    cityDebounceTimer = setTimeout(() => fetchCitySuggestions(cityInput), 300);
  }

  function selectCity(city: string) {
    cityFilter = city;
    cityInput = city;
    cityResults = [];
    cityDropdownOpen = false;
    fetchVenues(true);
  }

  function clearCity() {
    cityFilter = '';
    cityInput = '';
    cityResults = [];
    cityDropdownOpen = false;
    fetchVenues(true);
  }

  function onCityBlur() {
    setTimeout(() => { cityDropdownOpen = false; }, 150);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { selectedVenue = null; cityDropdownOpen = false; }
  }

  function formatUrl(url: string | null) {
    if (!url) return null;
    try {
      const u = new URL(url.startsWith('http') ? url : `https://${url}`);
      return u.hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  function ensureAbsolute(url: string | null) {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  }
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
  <title>Venues — SQRZ</title>
  <meta name="description" content="Browse and search all venues on the SQRZ platform." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- ── TOP BAR ────────────────────────────────────────────────────── -->
<header class="top-bar">
  <a href="https://sqrz.com" class="top-logo">SQRZ</a>
</header>

<!-- ── HERO ──────────────────────────────────────────────────────── -->
<section class="venues-hero">
  <div class="container">
    <p class="eyebrow">SQRZ</p>
    <h1><span>Venues</span></h1>
    <p class="hero-sub">Browse and search all venues on the SQRZ platform.</p>
  </div>
</section>

<!-- ── MAIN CONTENT ───────────────────────────────────────────────── -->
<section class="venues-section">
  <div class="container">

    <!-- Controls -->
    <div class="controls-row">
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={query}
          oninput={onSearchInput}
          placeholder="Search venues…"
          aria-label="Search venues"
          class="search-input"
        />
        {#if query.length > 0}
          <button class="search-clear" onclick={clearSearch} aria-label="Clear search">✕</button>
        {/if}
      </div>

      <!-- Location filter -->
      <div class="location-filter">
        <div class="location-tabs">
          <button
            class="loc-tab"
            class:active={locationTab === 'country'}
            onclick={() => switchLocationTab('country')}
          >Country</button>
          <button
            class="loc-tab"
            class:active={locationTab === 'city'}
            onclick={() => switchLocationTab('city')}
          >City</button>
        </div>
        {#if locationTab === 'country'}
          <div class="loc-control">
            <select class="loc-select" class:has-value={!!countryFilter} value={countryFilter} onchange={onCountryChange} aria-label="Filter by country">
              <option value="">All countries</option>
              {#each data.locations as loc}
                <option value={loc.iso_code}>{loc.name}</option>
              {/each}
            </select>
            {#if countryFilter}
              <button class="loc-clear" onclick={() => { countryFilter = ''; fetchVenues(true); }} aria-label="Clear country filter">✕</button>
            {/if}
          </div>
        {:else}
          <div class="loc-control city-wrap">
            <input
              type="text"
              class="loc-city-input"
              class:has-value={!!cityFilter}
              value={cityInput}
              oninput={onCityInput}
              onblur={onCityBlur}
              placeholder="Type a city…"
              aria-label="Filter by city"
              aria-autocomplete="list"
              aria-expanded={cityDropdownOpen}
              autocomplete="off"
            />
            {#if cityFilter}
              <button class="loc-clear" onclick={clearCity} aria-label="Clear city filter">✕</button>
            {/if}
            {#if cityDropdownOpen}
              <ul class="city-dropdown" role="listbox">
                {#each cityResults as city}
                  <li role="option" aria-selected={cityFilter === city}>
                    <button type="button" onmousedown={() => selectCity(city)}>{city}</button>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        {/if}
      </div>

      <select
        class="sort-select"
        value={sortKey}
        onchange={(e) => { sortKey = (e.target as HTMLSelectElement).value as SortValue; fetchVenues(true); }}
        aria-label="Sort venues"
      >
        {#each SORT_OPTIONS as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>

      <p class="result-count" aria-live="polite">
        {#if loading}
          <span class="count-loading">Loading…</span>
        {:else if hasFilter}
          {(filteredCount ?? venues.length).toLocaleString()} {(filteredCount ?? venues.length) === 1 ? 'venue' : 'venues'} found
        {:else}
          {data.totalCount.toLocaleString()} venues
        {/if}
      </p>
    </div>

    <!-- Type filter -->
    <div class="type-filter-row" role="group" aria-label="Filter by venue type">
      {#each TYPE_OPTIONS as opt}
        <label class="type-radio" class:active={typeFilter === opt.value}>
          <input
            type="radio"
            name="venue-type"
            value={opt.value}
            checked={typeFilter === opt.value}
            onchange={() => { typeFilter = opt.value; fetchVenues(true); }}
          />
          {opt.label}
        </label>
      {/each}
    </div>

    <!-- Grid -->
    {#if loading}
      <div class="skeleton-grid">
        {#each { length: 6 } as _}
          <div class="skeleton-card">
            <div class="skeleton-photo"></div>
            <div class="skeleton-body">
              <div class="skeleton-line wide"></div>
              <div class="skeleton-line narrow"></div>
              <div class="skeleton-line mid"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if venues.length > 0}
      <ul class="venues-grid" aria-label="Venues">
        {#each venues as venue (venue.id)}
          <li class="venue-card" class:flagged={venue.flagged}>

            <!-- Photo -->
            <div class="card-photo">
              {#if venue.photo}
                <img src={venue.photo} alt={venue.name} loading="lazy" />
              {:else}
                <div class="photo-placeholder">
                  <span class="photo-initials">{venue.name.charAt(0).toUpperCase()}</span>
                </div>
              {/if}
              {#if venue.type}
                <span class="card-type-pill">{venue.type}</span>
              {/if}
              {#if venue.flagged}
                <span class="flagged-badge">Flagged</span>
              {/if}
            </div>

            <!-- Body -->
            <div class="card-body">
              <div class="card-meta-row">
                {#if venue.country_code}
                  <span class="country-badge">{venue.country_code}</span>
                {/if}
              </div>

              <h2 class="card-name">{venue.name}</h2>

              {#if venue.city}
                <p class="card-city">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {venue.city}
                </p>
              {/if}

              {#if venue.site}
                <a href={ensureAbsolute(venue.site)} target="_blank" rel="noopener noreferrer" class="card-site">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  {formatUrl(venue.site)}
                </a>
              {/if}
            </div>

            <!-- Actions -->
            <div class="card-actions">
              <button class="btn-more" onclick={() => selectedVenue = venue}>More info</button>

              <div class="card-action-group">
                {#if internalMode && venue.hubspot_company_id}
                  <a
                    href="https://app.hubspot.com/contacts/8081234/record/0-2/{venue.hubspot_company_id}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="action-icon hs-link"
                    title="View in HubSpot"
                    aria-label="View in HubSpot"
                  >
                    <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                      <path d="M334.7 231.3v-61.5a44.3 44.3 0 0 0 25.6-40V128c0-24.5-19.8-44.3-44.3-44.3h-1.3C290.2 83.7 270.4 103.5 270.4 128v1.8a44.3 44.3 0 0 0 25.6 40v61.5c-23.6 3.6-45 13.7-62 28.6L96.7 155.7a38.2 38.2 0 0 0 1.3-9.8 38.4 38.4 0 1 0-38.4 38.4 38 38 0 0 0 18.9-5L209 279.8a128.7 128.7 0 0 0-17.3 64.4c0 35.9 14.7 68.4 38.4 92l-21.5 21.5a26.7 26.7 0 1 0 18.8 18.8l21.5-21.5a128.9 128.9 0 0 0 79.7 27.6c71.3 0 129.3-58 129.3-129.3.1-64.5-47.2-118.1-109.2-122zm-20.1 208c-47.8 0-86.8-39-86.8-86.8s39-86.8 86.8-86.8 86.8 39 86.8 86.8-39 86.8-86.8 86.8z"/>
                    </svg>
                  </a>
                {/if}

                <button
                  class="action-icon flag-btn"
                  class:flagged={venue.flagged}
                  onclick={() => toggleFlag(venue)}
                  title={venue.flagged ? 'Unflag' : 'Flag'}
                  aria-label={venue.flagged ? 'Unflag venue' : 'Flag venue'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={venue.flagged ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                </button>

                <button
                  class="action-icon report-btn"
                  onclick={() => reportVenue(venue)}
                  title="Report venue"
                  aria-label="Report venue"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </button>
              </div>
            </div>

          </li>
        {/each}
      </ul>

      <!-- Load more -->
      {#if hasMore}
        <div class="load-more-row">
          <button class="btn-load-more" onclick={() => fetchVenues(false)} disabled={loadingMore}>
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        </div>
      {/if}

    {:else}
      <div class="empty-state">
        <p class="empty-heading">No venues found</p>
        <p class="empty-sub">
          {#if query || countryFilter || typeFilter}
            Try a different search term or filter.
          {:else}
            No venues have been added yet.
          {/if}
        </p>
        {#if query || countryFilter || typeFilter}
          <button class="btn-reset" onclick={() => { query = ''; countryFilter = ''; typeFilter = ''; fetchVenues(true); }}>
            Clear filters
          </button>
        {/if}
      </div>
    {/if}

  </div>
</section>

<!-- ── MODAL ──────────────────────────────────────────────────────── -->
{#if selectedVenue}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="modal-backdrop" onclick={(e) => { if (e.target === e.currentTarget) selectedVenue = null; }}>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">

      <!-- Modal photo -->
      <div class="modal-photo">
        {#if selectedVenue.photo}
          <img src={selectedVenue.photo} alt={selectedVenue.name} />
        {:else}
          <div class="photo-placeholder large">
            <span class="photo-initials large">{selectedVenue.name.charAt(0).toUpperCase()}</span>
          </div>
        {/if}
        <button class="modal-close" onclick={() => selectedVenue = null} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="modal-meta-row">
          {#if selectedVenue.type}
            <span class="type-badge">{selectedVenue.type}</span>
          {/if}
          {#if selectedVenue.flagged}
            <span class="flagged-badge inline">Flagged</span>
          {/if}
        </div>

        <h2 class="modal-name" id="modal-title">{selectedVenue.name}</h2>

        {#if selectedVenue.rating}
          <div class="modal-rating">
            <span class="rating-star">★</span>
            <span class="rating-value">{selectedVenue.rating}</span>
            {#if selectedVenue.reviews}
              <span class="rating-reviews">({formatReviews(selectedVenue.reviews)} reviews)</span>
            {/if}
          </div>
        {/if}

        <dl class="modal-details">
          {#if selectedVenue.city}
            <div class="detail-row">
              <dt>City</dt>
              <dd>{selectedVenue.city}</dd>
            </div>
          {/if}
          {#if selectedVenue.country_code}
            <div class="detail-row">
              <dt>Country</dt>
              <dd>{selectedVenue.country_code}</dd>
            </div>
          {/if}
          {#if selectedVenue.type}
            <div class="detail-row">
              <dt>Type</dt>
              <dd>{selectedVenue.type}</dd>
            </div>
          {/if}
          {#if selectedVenue.site}
            <div class="detail-row">
              <dt>Website</dt>
              <dd>
                <a href={ensureAbsolute(selectedVenue.site)} target="_blank" rel="noopener noreferrer" class="modal-link">
                  {formatUrl(selectedVenue.site)}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </dd>
            </div>
          {/if}
        </dl>

        {#if selectedVenue.description}
          <p class="modal-description">{selectedVenue.description}</p>
        {/if}

        {#if selectedVenue.subtypes || selectedVenue.phone || selectedVenue.email_1 || selectedVenue.email_2 || selectedVenue.email_3 || selectedVenue.street || selectedVenue.postal_code || selectedVenue.state}
          <dl class="modal-details">
            {#if selectedVenue.subtypes}
              <div class="detail-row">
                <dt>Subtypes</dt>
                <dd>{selectedVenue.subtypes}</dd>
              </div>
            {/if}
            {#if selectedVenue.phone}
              <div class="detail-row">
                <dt>Phone</dt>
                <dd>{selectedVenue.phone}</dd>
              </div>
            {/if}
            {#if selectedVenue.email_1 || selectedVenue.email_2 || selectedVenue.email_3}
              <div class="detail-row">
                <dt>Email</dt>
                <dd class="stacked">
                  {#if selectedVenue.email_1}<span>{selectedVenue.email_1}</span>{/if}
                  {#if selectedVenue.email_2}<span>{selectedVenue.email_2}</span>{/if}
                  {#if selectedVenue.email_3}<span>{selectedVenue.email_3}</span>{/if}
                </dd>
              </div>
            {/if}
            {#if selectedVenue.street || selectedVenue.postal_code || selectedVenue.state}
              <div class="detail-row">
                <dt>Address</dt>
                <dd class="stacked">
                  {#if selectedVenue.street}<span>{selectedVenue.street}</span>{/if}
                  {#if selectedVenue.postal_code || selectedVenue.city}<span>{[selectedVenue.postal_code, selectedVenue.city].filter(Boolean).join(' ')}</span>{/if}
                  {#if selectedVenue.state}<span>{selectedVenue.state}</span>{/if}
                </dd>
              </div>
            {/if}
          </dl>
        {/if}

        {#if selectedVenue.facebook || selectedVenue.instagram || selectedVenue.linkedin || selectedVenue.twitter || selectedVenue.youtube || selectedVenue.whatsapp}
          <div class="modal-socials">
            {#if selectedVenue.facebook}
              <a href={ensureAbsolute(selectedVenue.facebook)} target="_blank" rel="noopener noreferrer" class="social-icon-link" title="Facebook" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            {/if}
            {#if selectedVenue.instagram}
              <a href={ensureAbsolute(selectedVenue.instagram)} target="_blank" rel="noopener noreferrer" class="social-icon-link" title="Instagram" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            {/if}
            {#if selectedVenue.linkedin}
              <a href={ensureAbsolute(selectedVenue.linkedin)} target="_blank" rel="noopener noreferrer" class="social-icon-link" title="LinkedIn" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            {/if}
            {#if selectedVenue.twitter}
              <a href={ensureAbsolute(selectedVenue.twitter)} target="_blank" rel="noopener noreferrer" class="social-icon-link" title="X / Twitter" aria-label="X / Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            {/if}
            {#if selectedVenue.youtube}
              <a href={ensureAbsolute(selectedVenue.youtube)} target="_blank" rel="noopener noreferrer" class="social-icon-link" title="YouTube" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            {/if}
            {#if selectedVenue.whatsapp}
              <a href={ensureAbsolute(selectedVenue.whatsapp)} target="_blank" rel="noopener noreferrer" class="social-icon-link" title="WhatsApp" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            {/if}
          </div>
        {/if}

        <div class="modal-actions">
          {#if internalMode && selectedVenue.hubspot_company_id}
            <a
              href="https://app.hubspot.com/contacts/8081234/record/0-2/{selectedVenue.hubspot_company_id}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-hs"
            >
              <svg width="13" height="13" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                <path d="M334.7 231.3v-61.5a44.3 44.3 0 0 0 25.6-40V128c0-24.5-19.8-44.3-44.3-44.3h-1.3C290.2 83.7 270.4 103.5 270.4 128v1.8a44.3 44.3 0 0 0 25.6 40v61.5c-23.6 3.6-45 13.7-62 28.6L96.7 155.7a38.2 38.2 0 0 0 1.3-9.8 38.4 38.4 0 1 0-38.4 38.4 38 38 0 0 0 18.9-5L209 279.8a128.7 128.7 0 0 0-17.3 64.4c0 35.9 14.7 68.4 38.4 92l-21.5 21.5a26.7 26.7 0 1 0 18.8 18.8l21.5-21.5a128.9 128.9 0 0 0 79.7 27.6c71.3 0 129.3-58 129.3-129.3.1-64.5-47.2-118.1-109.2-122zm-20.1 208c-47.8 0-86.8-39-86.8-86.8s39-86.8 86.8-86.8 86.8 39 86.8 86.8-39 86.8-86.8 86.8z"/>
              </svg>
              View in HubSpot
            </a>
          {/if}

          <button
            class="btn-flag-modal"
            class:active={selectedVenue.flagged}
            onclick={() => toggleFlag(selectedVenue!)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={selectedVenue.flagged ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
            {selectedVenue.flagged ? 'Unflag' : 'Flag'}
          </button>

          <button
            class="btn-report-modal"
            onclick={() => reportVenue(selectedVenue!)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Report
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ── BASE ────────────────────────────────────────────────────────── */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html, body) { max-width: 100%; overflow-x: hidden; }
  :global(body) {
    font-family: 'DM Sans', ui-sans-serif, sans-serif;
    background: #050505;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* ── TOP BAR ─────────────────────────────────────────────────────── */
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    background: rgba(5,5,5,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .top-logo {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    letter-spacing: 0.06em;
    color: #F5A623;
    text-decoration: none;
  }

  /* ── HERO ────────────────────────────────────────────────────────── */
  .venues-hero {
    padding: 130px 0 64px;
    background:
      linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(5,5,5,0.95) 100%),
      #050505;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .eyebrow {
    color: #F5A623;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
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

  .venues-hero h1 span { display: block; }

  .hero-sub {
    max-width: 480px;
    margin-top: 24px;
    color: rgba(255,255,255,0.5);
    font-size: 0.97rem;
    font-weight: 300;
    line-height: 1.7;
  }

  /* ── SECTION ─────────────────────────────────────────────────────── */
  .venues-section {
    padding: 52px 0 120px;
    background: #050505;
  }

  /* ── CONTROLS ────────────────────────────────────────────────────── */
  .controls-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  /* ── TYPE FILTER ──────────────────────────────────────────────────── */
  .type-filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }

  .type-radio {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 7px 14px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    color: rgba(255,255,255,0.45);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    user-select: none;
    white-space: nowrap;
  }

  .type-radio input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .type-radio:hover {
    border-color: rgba(255,255,255,0.22);
    color: rgba(255,255,255,0.75);
  }

  .type-radio.active {
    border-color: rgba(245,166,35,0.5);
    color: #F5A623;
    background: rgba(245,166,35,0.08);
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 220px;
    max-width: 440px;
  }

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.32);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 12px 38px 12px 42px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    outline: none;
    transition: border-color 0.15s;
    -webkit-appearance: none;
  }
  .search-input::placeholder { color: rgba(255,255,255,0.28); }
  .search-input:focus { border-color: rgba(245,166,35,0.5); }
  .search-input::-webkit-search-cancel-button { -webkit-appearance: none; }

  .search-clear {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(255,255,255,0.36);
    font-size: 0.76rem;
    cursor: pointer;
    padding: 4px 6px;
    line-height: 1;
    transition: color 0.15s;
  }
  .search-clear:hover { color: rgba(255,255,255,0.75); }

  /* ── SORT SELECT (reuses former country-select style) ─────────── */
  .sort-select {
    padding: 12px 32px 12px 14px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: rgba(255,255,255,0.75);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }
  .sort-select:focus { border-color: rgba(245,166,35,0.5); }
  .sort-select option { background: #1a1a1a; color: #fff; }

  /* ── LOCATION FILTER ───────────────────────────────────────────── */
  .location-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .location-tabs {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 3px;
    gap: 2px;
    flex-shrink: 0;
  }

  .loc-tab {
    padding: 5px 11px;
    border-radius: 6px;
    border: none;
    background: none;
    color: rgba(255,255,255,0.4);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
    line-height: 1.2;
  }
  .loc-tab:hover { color: rgba(255,255,255,0.75); }
  .loc-tab.active {
    background: rgba(245,166,35,0.15);
    color: #F5A623;
  }

  .loc-control {
    position: relative;
    display: flex;
    align-items: center;
  }

  .loc-select {
    padding: 10px 32px 10px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: rgba(255,255,255,0.75);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    width: 160px;
  }
  .loc-select:focus { border-color: rgba(245,166,35,0.5); }
  .loc-select option { background: #1a1a1a; color: #fff; }
  .loc-select.has-value { border-color: rgba(245,166,35,0.45); color: #F5A623; padding-right: 44px; }

  .loc-city-input {
    padding: 10px 32px 10px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: rgba(255,255,255,0.75);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.15s;
    width: 160px;
  }
  .loc-city-input::placeholder { color: rgba(255,255,255,0.28); }
  .loc-city-input:focus { border-color: rgba(245,166,35,0.5); }
  .loc-city-input.has-value { border-color: rgba(245,166,35,0.45); color: #F5A623; }

  .loc-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(245,166,35,0.65);
    font-size: 0.7rem;
    cursor: pointer;
    padding: 4px 5px;
    line-height: 1;
    transition: color 0.15s;
    z-index: 1;
  }
  .loc-clear:hover { color: #F5A623; }

  .city-wrap { position: relative; }

  .city-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 100%;
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    list-style: none;
    overflow: hidden;
    z-index: 50;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  }

  .city-dropdown li button {
    display: block;
    width: 100%;
    padding: 10px 14px;
    background: none;
    border: none;
    color: rgba(255,255,255,0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    text-align: left;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    white-space: nowrap;
  }
  .city-dropdown li button:hover { background: rgba(255,255,255,0.06); color: #fff; }
  .city-dropdown li[aria-selected="true"] button { color: #F5A623; }

  .result-count {
    color: rgba(255,255,255,0.28);
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    margin-left: auto;
  }

  .count-loading { color: rgba(255,255,255,0.2); }

  /* ── SKELETON ─────────────────────────────────────────────────────── */
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .skeleton-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    overflow: hidden;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .skeleton-photo {
    aspect-ratio: 16/9;
    background: rgba(255,255,255,0.05);
  }

  .skeleton-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .skeleton-line {
    height: 10px;
    border-radius: 4px;
    background: rgba(255,255,255,0.07);
  }
  .skeleton-line.wide { width: 80%; }
  .skeleton-line.mid  { width: 55%; }
  .skeleton-line.narrow { width: 40%; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ── GRID ────────────────────────────────────────────────────────── */
  .venues-grid {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* ── CARD ────────────────────────────────────────────────────────── */
  .venue-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color 0.2s, background 0.2s;
  }
  .venue-card:hover {
    border-color: rgba(245,166,35,0.28);
    background: rgba(255,255,255,0.045);
  }
  .venue-card.flagged {
    border-color: rgba(245,166,35,0.4);
  }

  /* Photo */
  .card-photo {
    aspect-ratio: 16/9;
    background: #111;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
  .venue-card:hover .card-photo img { transform: scale(1.03); }

  .photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a1a, #111);
  }
  .photo-placeholder.large { background: linear-gradient(135deg, #1a1a1a, #0d0d0d); }

  .photo-initials {
    font-family: Impact, sans-serif;
    font-size: 3rem;
    font-weight: 800;
    color: rgba(245,166,35,0.25);
    text-transform: uppercase;
    user-select: none;
  }
  .photo-initials.large { font-size: 5rem; }

  .card-type-pill {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.6);
    color: rgba(255,255,255,0.9);
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 999px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .flagged-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(245,166,35,0.9);
    color: #111;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 999px;
  }
  .flagged-badge.inline {
    position: static;
    display: inline-block;
    background: rgba(245,166,35,0.15);
    color: #F5A623;
    border: 1px solid rgba(245,166,35,0.35);
  }

  /* Card body */
  .card-body {
    padding: 18px 20px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .card-meta-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    min-height: 20px;
  }

  .type-badge {
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5A623;
    background: rgba(245,166,35,0.1);
    border: 1px solid rgba(245,166,35,0.25);
    border-radius: 999px;
    padding: 2px 8px;
  }

  .country-badge {
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 2px 8px;
  }

  .card-name {
    font-family: Impact, sans-serif;
    font-weight: 800;
    font-size: 1.15rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #fff;
    line-height: 1.1;
  }

  .card-city {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.42);
    font-weight: 400;
  }
  .card-city svg { flex-shrink: 0; color: rgba(255,255,255,0.3); }

  .card-site {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    color: rgba(245,166,35,0.7);
    text-decoration: none;
    font-weight: 400;
    transition: color 0.15s;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-site:hover { color: #F5A623; }
  .card-site svg { flex-shrink: 0; }

  /* Card actions */
  .card-actions {
    padding: 12px 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
  }

  .btn-more {
    flex: 1;
    padding: 8px 14px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 7px;
    color: rgba(255,255,255,0.75);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .btn-more:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    color: #fff;
  }

  .card-action-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .action-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 7px;
    background: none;
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    text-decoration: none;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    flex-shrink: 0;
  }
  .action-icon:hover {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
    border-color: rgba(255,255,255,0.16);
  }

  .hs-link { color: rgba(255,122,89,0.6); border-color: rgba(255,122,89,0.2); }
  .hs-link:hover { color: #FF7A59; background: rgba(255,122,89,0.1); border-color: rgba(255,122,89,0.35); }

  .flag-btn.flagged { color: #F5A623; border-color: rgba(245,166,35,0.4); background: rgba(245,166,35,0.1); }
  .flag-btn:hover { color: #F5A623 !important; border-color: rgba(245,166,35,0.4) !important; }

  .report-btn:hover { color: #e05252 !important; border-color: rgba(224,82,82,0.35) !important; background: rgba(224,82,82,0.08) !important; }

  /* ── LOAD MORE ────────────────────────────────────────────────────── */
  .load-more-row {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .btn-load-more {
    padding: 12px 36px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 9px;
    color: rgba(255,255,255,0.6);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .btn-load-more:hover:not(:disabled) {
    border-color: rgba(245,166,35,0.45);
    color: #fff;
    background: rgba(245,166,35,0.06);
  }
  .btn-load-more:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ── EMPTY STATE ──────────────────────────────────────────────────── */
  .empty-state {
    padding: 80px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .empty-heading {
    font-family: Impact, sans-serif;
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #fff;
  }

  .empty-sub {
    color: rgba(255,255,255,0.38);
    font-size: 0.9rem;
  }

  .btn-reset {
    margin-top: 8px;
    padding: 10px 24px;
    background: transparent;
    border: 1px solid rgba(245,166,35,0.4);
    border-radius: 8px;
    color: #F5A623;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .btn-reset:hover { background: rgba(245,166,35,0.08); }

  /* ── MODAL ────────────────────────────────────────────────────────── */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    overflow-y: auto;
  }

  .modal {
    background: #111;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    overflow: hidden;
    width: 100%;
    max-width: 580px;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 24px 64px rgba(0,0,0,0.6);
  }

  .modal-photo {
    aspect-ratio: 16/9;
    background: #1a1a1a;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .modal-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    backdrop-filter: blur(4px);
  }
  .modal-close:hover { background: rgba(0,0,0,0.8); color: #fff; }

  .modal-body {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }

  .modal-meta-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    min-height: 20px;
  }

  .modal-name {
    font-family: Impact, sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #fff;
    line-height: 1;
  }

  .modal-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid rgba(255,255,255,0.07);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 14px 0;
  }

  .detail-row {
    display: flex;
    gap: 12px;
    align-items: baseline;
  }
  .detail-row dt {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    min-width: 64px;
    flex-shrink: 0;
  }
  .detail-row dd {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.75);
  }

  .detail-row dd.stacked {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .modal-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #F5A623;
    text-decoration: none;
    font-size: 0.88rem;
    transition: opacity 0.15s;
  }
  .modal-link:hover { opacity: 0.8; }

  .modal-description {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(255,255,255,0.55);
  }

  .modal-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    padding-top: 4px;
  }

  .btn-hs {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    background: rgba(255,122,89,0.1);
    border: 1px solid rgba(255,122,89,0.3);
    border-radius: 8px;
    color: #FF7A59;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .btn-hs:hover { background: rgba(255,122,89,0.18); border-color: rgba(255,122,89,0.5); }

  .btn-flag-modal {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    color: rgba(255,255,255,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .btn-flag-modal:hover, .btn-flag-modal.active {
    color: #F5A623;
    border-color: rgba(245,166,35,0.4);
    background: rgba(245,166,35,0.08);
  }

  .btn-report-modal {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: rgba(255,255,255,0.35);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .btn-report-modal:hover {
    color: #e05252;
    border-color: rgba(224,82,82,0.35);
    background: rgba(224,82,82,0.07);
  }

  /* ── RATING ───────────────────────────────────────────────────────── */
  .modal-rating {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .rating-star {
    color: #F5A623;
    font-size: 1rem;
    line-height: 1;
  }

  .rating-value {
    font-size: 0.92rem;
    font-weight: 600;
    color: #fff;
  }

  .rating-reviews {
    font-size: 0.82rem;
    font-weight: 300;
    color: rgba(255,255,255,0.38);
  }

  /* ── SOCIAL ICONS ─────────────────────────────────────────────────── */
  .modal-socials {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .social-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    flex-shrink: 0;
  }
  .social-icon-link:hover {
    border-color: rgba(255,255,255,0.25);
    color: #fff;
    background: rgba(255,255,255,0.06);
  }

  /* ── RESPONSIVE ───────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .venues-grid { grid-template-columns: repeat(2, 1fr); }
    .skeleton-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 760px) {
    .container { padding: 0 20px; }
    .top-bar { padding: 0 20px; }

    .venues-hero { padding: 100px 0 48px; }
    .venues-hero h1 { font-size: clamp(50px, 13vw, 72px); }

    .controls-row { gap: 10px; }
    .search-wrap { max-width: 100%; flex: 1 1 100%; }
    .location-filter { flex: 1 1 auto; }
    .loc-select { min-width: 0; flex: 1; }
    .loc-city-input { width: 100%; }
    .sort-select { flex: 1; }
    .result-count { margin-left: 0; width: 100%; }

    .venues-grid { grid-template-columns: 1fr; }
    .skeleton-grid { grid-template-columns: 1fr; }

    .modal { max-width: 100%; border-radius: 12px 12px 0 0; }
    .modal-backdrop { align-items: flex-end; padding: 0; }
  }
</style>
