<script lang="ts">
  // Slug availability checker — used twice on the homepage (hero + bottom of
  // page, below pricing). One component, one implementation; `refCode` is
  // threaded in as a prop from the page's existing ?ref=/localStorage capture
  // rather than re-captured here, so both instances always agree with the
  // rest of the page on attribution.
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let { refCode = '' }: { refCode?: string } = $props();

  let username = $state('');
  let status = $state('idle'); // 'idle' | 'checking' | 'available' | 'taken'
  let debounceTimer: ReturnType<typeof setTimeout>;

  // Build join URL with ref appended when present
  let joinUrl = $derived(
    `https://dashboard.sqrz.com/join?slug=${username}${refCode ? `&ref=${refCode}` : ''}`
  );

  // CTA button URL — uses slug URL once available, otherwise base join URL
  let ctaUrl = $derived(
    status === 'available'
      ? joinUrl
      : refCode
        ? `https://dashboard.sqrz.com/join?ref=${refCode}`
        : 'https://dashboard.sqrz.com/join'
  );

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

  @media (max-width: 768px) {
    .username-input-row { width: 100%; max-width: none; flex-direction: column; margin-left: auto; margin-right: auto; border-radius: 8px; }
    .username-input-field { width: 100%; }
    .username-input { padding: 14px 10px 14px 18px; font-size: 16px; }
    .username-suffix { font-size: 0.82rem; padding-right: 12px; }
    .username-cta-btn { padding: 14px 22px; justify-content: center; font-size: 0.85rem; border-radius: 0; }
  }
</style>
