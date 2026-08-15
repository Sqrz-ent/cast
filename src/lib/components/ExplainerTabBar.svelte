<script lang="ts">
  // Bottom tab bar scoped to the 4 explainer sections (2026-08-14). Styled
  // to read as an iOS tab bar on purpose — it's meant to look like a
  // preview of the app, not just describe one. Un-floated the same day
  // (was position: fixed with its own show/hide-on-scroll
  // IntersectionObserver) — it's a normal-flow element now, the last child
  // of .explainer-carousel (see +page.svelte), so it sits at the bottom
  // edge of the 4-section block and scrolls with the page like everything
  // else. Reads as a section-local indicator (carousel dots, not global
  // nav) — no visibility logic needed anymore, since a normal-flow
  // element naturally appears/disappears with its parent.
  import { onMount } from 'svelte';

  const tabs = [
    { id: 'showcase', label: 'Showcase', icon: 'profile' },
    { id: 'pipeline', label: 'Bookings', icon: 'inbox' },
    { id: 'grow', label: 'Grow', icon: 'chart' },
    { id: 'notifications', label: 'Alerts', icon: 'bell' }
  ] as const;

  let activeId = $state<string>(tabs[0].id);

  // #explainer-wrap scrolls horizontally (scroll-snap carousel, see
  // +page.svelte) — jumping to a section means scrolling the wrap
  // sideways, not scrolling the page down to it. Computed via
  // getBoundingClientRect deltas rather than el.offsetLeft, since offsetLeft
  // is relative to the nearest *positioned* ancestor (not necessarily the
  // wrap) and scrollIntoView's block/inline options proved less predictable
  // cross-browser inside a nested horizontal scroller.
  function scrollToSection(id: string) {
    const wrap = document.getElementById('explainer-wrap');
    const el = document.getElementById(id);
    if (!wrap || !el) return;
    const delta = el.getBoundingClientRect().left - wrap.getBoundingClientRect().left;
    wrap.scrollTo({ left: wrap.scrollLeft + delta, behavior: 'smooth' });
  }

  onMount(() => {
    const wrap = document.getElementById('explainer-wrap');
    if (!wrap) return;

    // Active-tab scroll-spy: root is the carousel itself (not the page
    // viewport), and the -45% margins shrink the left/right edges instead
    // of top/bottom, so whichever slide is centered in the carousel's
    // visible width wins as the user swipes/scrolls sideways through it or
    // taps a tab.
    const spyObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId = entry.target.id;
        }
      },
      { root: wrap, rootMargin: '0px -45% 0px -45%', threshold: 0 }
    );
    tabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) spyObserver.observe(el);
    });

    return () => {
      spyObserver.disconnect();
    };
  });
</script>

<nav class="explainer-tabbar" aria-label="Jump to feature section">
  <div class="tabbar-inner">
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        class="tab-item"
        class:active={activeId === tab.id}
        onclick={() => scrollToSection(tab.id)}
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
    /* Un-floated (2026-08-14, same day as the rest of this component) —
       normal document flow, last child of .explainer-carousel (see
       +page.svelte), so it sits at the bottom edge of the 4-section block
       and scrolls with the page instead of pinning to the viewport. Reads
       as a section-local indicator now (carousel dots), not global nav —
       no position/transform/z-index/pointer-events needed, and no
       safe-area padding either (that was for sitting flush against the
       device's physical bottom edge, which a normal-flow element never
       does). Cream bg means this can't rely on being dark against
       whatever it sits over — the 4 sections it's scoped to are all cream
       themselves. rgb(255,253,249) is sqrz-dashboard's --surface token
       (vs --bg #f5f0eb used for the popup/page background elsewhere) —
       the same surface-vs-background distinction dashboard already draws
       for elevated UI, reused here rather than inventing a new tint. */
    background: rgba(255, 253, 249, 0.92);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(17, 17, 17, 0.08);
    box-shadow: 0 -8px 24px rgba(17, 17, 17, 0.08);
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
    color: rgba(17, 17, 17, 0.45);
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
