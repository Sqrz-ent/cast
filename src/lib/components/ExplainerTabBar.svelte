<script lang="ts">
  // Sticky bottom tab bar scoped to the 4 explainer sections (2026-08-14).
  // Styled to read as an iOS tab bar on purpose — it's meant to look like a
  // preview of the app, not just describe one. Appears only while the
  // #explainer-wrap block (see +page.svelte) is on screen; hidden the rest
  // of the time via IntersectionObserver, not scroll-position math.
  import { onMount } from 'svelte';

  const tabs = [
    { id: 'showcase', label: 'Showcase', icon: 'profile' },
    { id: 'pipeline', label: 'Bookings', icon: 'inbox' },
    { id: 'grow', label: 'Grow', icon: 'chart' },
    { id: 'notifications', label: 'Alerts', icon: 'bell' }
  ] as const;

  let visible = $state(false);
  let activeId = $state<string>(tabs[0].id);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMount(() => {
    const wrap = document.getElementById('explainer-wrap');
    if (!wrap) return;

    // Bar visibility: on screen only while the 4-section block itself is on
    // screen. The -2px rootMargin matters: the hero above it is set to
    // exactly 100vh, so at initial load #explainer-wrap's top edge exactly
    // touches the viewport's bottom edge with zero-area overlap — Chromium's
    // IntersectionObserver reports that hairline touch as isIntersecting:true
    // at threshold 0, which flashed the bar on over the hero before any
    // scrolling happened. Shrinking the root by 2px requires real overlap.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0, rootMargin: '-2px 0px -2px 0px' }
    );
    visibilityObserver.observe(wrap);

    // Active-tab scroll-spy: whichever section is crossing the viewport's
    // middle band wins — standard "-45% top/bottom" scroll-spy margin trick.
    const spyObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId = entry.target.id;
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    tabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) spyObserver.observe(el);
    });

    return () => {
      visibilityObserver.disconnect();
      spyObserver.disconnect();
    };
  });
</script>

<nav class="explainer-tabbar" class:visible aria-label="Jump to feature section" aria-hidden={!visible}>
  <div class="tabbar-inner">
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        class="tab-item"
        class:active={activeId === tab.id}
        onclick={() => scrollToSection(tab.id)}
        tabindex={visible ? 0 : -1}
      >
        <span class="tab-icon">
          {#if tab.icon === 'profile'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6" /></svg>
          {:else if tab.icon === 'inbox'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4.5l1.5 3h6l1.5-3H21" /><path d="M5 12 6.5 5.5A1.5 1.5 0 0 1 8 4.3h8a1.5 1.5 0 0 1 1.5 1.2L19 12v6a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18Z" /></svg>
          {:else if tab.icon === 'chart'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V10" /><path d="M10.5 19V5" /><path d="M17 19v-7" /><path d="M3 19h18" /></svg>
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
          {/if}
        </span>
        <span class="tab-label">{tab.label}</span>
      </button>
    {/each}
  </div>
</nav>

<style>
  /* Mobile-first: base rules below are the phone-viewport design; the one
     min-width query at the bottom scales it up for desktop, deliberately
     the opposite pattern from the rest of this file (max-width overrides) —
     this component is the one the brief called out to build phone-first. */
  .explainer-tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    pointer-events: none;
    background: rgba(17, 17, 17, 0.82);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .explainer-tabbar.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .tabbar-inner {
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    height: 54px;
  }

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    -webkit-tap-highlight-color: transparent;
    transition: color 0.2s;
  }

  .tab-item.active { color: #F5A623; }

  .tab-icon {
    width: 22px;
    height: 22px;
    display: block;
  }
  .tab-icon svg { width: 100%; height: 100%; }

  .tab-label {
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  /* Desktop: same structure, scaled up — not a separate layout. */
  @media (min-width: 640px) {
    .tabbar-inner { max-width: 640px; height: 60px; }
    .tab-icon { width: 24px; height: 24px; }
    .tab-label { font-size: 0.68rem; }
  }
</style>
