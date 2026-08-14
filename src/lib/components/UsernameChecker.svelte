<script lang="ts">
  // Slug availability checker — used twice on the homepage (hero + bottom of
  // page, below pricing). One component, one implementation.
  //
  // Beta gatekeeping (2026-08-14): self-serve signup is intentionally
  // unreachable from the marketing page — an "available" slug no longer
  // redirects to dashboard.sqrz.com/join. Instead it opens a popup that
  // explains SQRZ is iOS-only/invite-beta right now and captures a beta
  // request (slug + email + advertising budget), submitted to the
  // hubspot-beta-slug-request edge function — which syncs a HubSpot contact
  // and reserves the slug in beta_slug_holds. Referral capture (sqrz_ref /
  // ?ref=) is dropped from this flow entirely — it has nothing left to
  // attach to. Supersedes the same-day beta_interest_submissions version
  // (that table is left in place, unreferenced).
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const REQUEST_ENDPOINT = `${PUBLIC_SUPABASE_URL}/functions/v1/hubspot-beta-slug-request`;

  let username = $state('');
  let status = $state('idle'); // 'idle' | 'checking' | 'available' | 'taken'
  let debounceTimer: ReturnType<typeof setTimeout>;

  let showPopup = $state(false);
  let claimedSlug = $state('');
  let email = $state('');
  let adBudget = $state('');
  let popupState = $state('form'); // 'form' | 'submitting' | 'success' | 'slug_taken' | 'error'

  function openPopup() {
    claimedSlug = username;
    email = '';
    adBudget = '';
    popupState = 'form';
    showPopup = true;
  }

  function closePopup() {
    showPopup = false;
    if (popupState === 'success') {
      // Nothing left to claim self-serve — don't leave the checker sitting on
      // "available" once a request has been captured.
      username = '';
      status = 'idle';
    }
  }

  async function submitRequest(e: SubmitEvent) {
    e.preventDefault();
    popupState = 'submitting';

    try {
      const res = await fetch(REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: PUBLIC_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${PUBLIC_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ slug: claimedSlug, email, ad_budget: adBudget })
      });
      const data = await res.json();
      popupState = data.ok ? 'success' : data.code === 'slug_taken' ? 'slug_taken' : 'error';
    } catch {
      popupState = 'error';
    }
  }

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
</script>

<div class="username-checker">
  <div class="username-input-row">
    <div class="username-input-field">
      <input
        type="text"
        class="username-input"
        placeholder="yourname"
        value={username}
        oninput={onInput}
        onkeydown={(e) => { if (e.key === 'Enter' && status === 'available') openPopup(); }}
        maxlength="30"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
      <span class="username-suffix">.sqrz.com</span>
    </div>
    <button type="button" class="username-cta-btn" disabled={status !== 'available'} onclick={openPopup}>
      Claim your link →
    </button>
  </div>
  <div class="username-feedback" aria-live="polite">
    {#if status === 'checking'}
      <span class="status-checking">Checking…</span>
    {:else if status === 'taken'}
      <span class="status-taken">Already taken</span>
    {:else if status === 'available'}
      <button type="button" class="status-available" onclick={openPopup}>
        {username}.sqrz.com is available! →
      </button>
    {:else if username.length > 0 && username.length < 3}
      <span class="status-hint">At least 3 characters</span>
    {/if}
  </div>
</div>

{#if showPopup}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="popup-backdrop" onclick={closePopup}></div>
  <div class="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
    <button type="button" class="popup-close" aria-label="Close" onclick={closePopup}>✕</button>

    {#if popupState === 'success'}
      <p class="popup-slug">{claimedSlug}.sqrz.com</p>
      <h2 id="popup-title" class="popup-title">You're on the list</h2>
      <p class="popup-body">We'll email your TestFlight invite if we can get you in.</p>
      <button type="button" class="popup-submit" onclick={closePopup}>Close</button>
    {:else}
      <h2 id="popup-title" class="popup-title">SQRZ is iOS-only, in private beta</h2>
      <p class="popup-body">
        There's no public app-store listing yet — access is by invite, sent by
        email as a TestFlight link. Tell us a bit and we'll be in touch.
      </p>
      <form onsubmit={submitRequest}>
        <label class="popup-field">
          <span class="popup-field-label">Slug</span>
          <input
            type="text"
            class="popup-field-input"
            value={`${claimedSlug}.sqrz.com`}
            disabled
          />
        </label>
        <label class="popup-field">
          <span class="popup-field-label">Email</span>
          <input
            type="email"
            class="popup-field-input"
            placeholder="you@example.com"
            required
            bind:value={email}
          />
        </label>
        <label class="popup-field">
          <span class="popup-field-label">Monthly advertising budget</span>
          <input
            type="text"
            class="popup-field-input"
            placeholder="e.g. $1,000/mo"
            bind:value={adBudget}
          />
        </label>
        {#if popupState === 'slug_taken'}
          <p class="popup-error">This name is already reserved — try a different one.</p>
        {:else if popupState === 'error'}
          <p class="popup-error">Something went wrong — please try again.</p>
        {/if}
        <button type="submit" class="popup-submit" disabled={popupState === 'submitting'}>
          {popupState === 'submitting' ? 'Submitting…' : 'Request access'}
        </button>
      </form>
    {/if}
  </div>
{/if}

<style>
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
    border: 2px solid rgba(245,166,35,0.45);
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
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
    border: none;
    cursor: pointer;
  }
  .username-cta-btn:hover { opacity: 0.88; }
  .username-cta-btn:disabled { opacity: 0.4; cursor: default; }

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
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
  }
  .status-available:hover { opacity: 0.8; }

  .status-hint {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.25);
  }

  @media (max-width: 768px) {
    .username-input-row { width: 100%; max-width: none; flex-direction: column; margin-left: auto; margin-right: auto; border-radius: 8px; }
    .username-input-field { width: 100%; }
    .username-input { padding: 14px 10px 14px 18px; font-size: 16px; }
    .username-suffix { font-size: 0.82rem; padding-right: 12px; }
    .username-cta-btn { padding: 14px 22px; justify-content: center; font-size: 0.85rem; border-radius: 0; }
  }

  /* ── Popup ────────────────────────────────────────────────────────── */
  .popup-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    z-index: 200;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 201;
    width: 90%;
    max-width: 420px;
    background: #f5f0eb;
    border: 1px solid rgba(245,166,35,0.3);
    border-radius: 12px;
    padding: 32px 28px 28px;
    box-sizing: border-box;
  }

  .popup-close {
    position: absolute;
    top: 14px;
    right: 14px;
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 1rem;
    cursor: pointer;
    padding: 6px;
    line-height: 1;
  }
  .popup-close:hover { color: rgba(255,255,255,0.8); }

  .popup-slug {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--accent);
    margin: 0 0 6px;
    font-family: 'DM Sans', sans-serif;
  }

  .popup-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0 0 8px;
  }

  .popup-body {
    font-size: 0.9rem;
    color: rgba(17,17,17,0.65);
    margin: 0 0 4px;
    font-family: 'DM Sans', sans-serif;
  }

  .popup-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 18px;
  }

  .popup-field-label {
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(17,17,17,0.6);
    font-family: 'DM Sans', sans-serif;
  }

  .popup-field-input {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 0.95rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--dark);
    outline: none;
    transition: border-color 0.2s;
  }
  .popup-field-input:focus { border-color: var(--accent); }
  .popup-field-input::placeholder { color: rgba(17,17,17,0.35); }
  .popup-field-input:disabled {
    color: var(--accent);
    font-weight: 600;
    opacity: 0.85;
    cursor: default;
  }

  .popup-error {
    font-size: 0.8rem;
    color: #e05252;
    margin: 14px 0 0;
  }

  .popup-submit {
    display: block;
    width: 100%;
    margin-top: 22px;
    padding: 13px;
    background: var(--accent);
    color: var(--dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .popup-submit:hover { opacity: 0.88; }
  .popup-submit:disabled { opacity: 0.5; cursor: default; }
</style>
