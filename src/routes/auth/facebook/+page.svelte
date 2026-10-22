<script>
  // HTTPS bridge for the iOS Facebook OAuth login (2026-10-22) — Meta's
  // "Enforce HTTPS" setting rejects a custom-scheme redirect_uri
  // (sqrzfb://auth) outright, so Facebook is told to redirect here instead.
  // This page's only job is relaying the OAuth response straight back to the
  // app via the sqrzfb:// custom scheme, which iOS's ASWebAuthenticationSession
  // intercepts. The token lives in the URL FRAGMENT, which browsers never
  // send to any server in the first place — this page adds no transmission
  // of its own on top of that: no fetch/analytics/tracking, nothing written
  // to storage or logged, pure client-side redirect only.
  export const prerender = true;

  import { onMount } from 'svelte';

  function targetURL() {
    const { search, hash } = window.location;
    return `sqrzfb://auth${search}${hash}`;
  }

  function openApp() {
    window.location.href = targetURL();
  }

  onMount(() => {
    openApp();
  });
</script>

<svelte:head>
  <title>Returning to SQRZ…</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <p>Returning to SQRZ…</p>
  <button onclick={openApp}>Open SQRZ</button>
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: #111111;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    text-align: center;
    padding: 24px;
  }

  p {
    font-size: 17px;
    opacity: 0.85;
  }

  button {
    padding: 12px 32px;
    border-radius: 8px;
    border: none;
    background: #f5a623;
    color: #111111;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }
</style>
