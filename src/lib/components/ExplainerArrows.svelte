<script lang="ts">
  // Left/right arrow navigation for the #explainer-wrap horizontal
  // scroll-snap carousel (2026-08-14) — a second, more visually obvious
  // trigger for the same prev/next navigation ExplainerTabBar's taps
  // already do. Deliberately self-contained (own IntersectionObserver for
  // active-section tracking) rather than sharing state with
  // ExplainerTabBar, matching that component's own self-contained design —
  // duplicates a small amount of logic instead of introducing cross-
  // component state for a single marketing page.
  import { onMount } from 'svelte';

  const sectionIds = ['showcase', 'pipeline', 'grow', 'notifications'] as const;

  let visible = $state(false);
  let currentIndex = $state(0);

  const canGoPrev = $derived(currentIndex > 0);
  const canGoNext = $derived(currentIndex < sectionIds.length - 1);

  // Same delta-based scroll technique as ExplainerTabBar.scrollToSection —
  // see that component for why (offsetLeft/scrollIntoView both proved less
  // predictable inside a nested horizontal scroller).
  function scrollToIndex(i: number) {
    const wrap = document.getElementById('explainer-wrap');
    const el = document.getElementById(sectionIds[i]);
    if (!wrap || !el) return;
    const delta = el.getBoundingClientRect().left - wrap.getBoundingClientRect().left;
    wrap.scrollTo({ left: wrap.scrollLeft + delta, behavior: 'smooth' });
  }

  function goPrev() { if (canGoPrev) scrollToIndex(currentIndex - 1); }
  function goNext() { if (canGoNext) scrollToIndex(currentIndex + 1); }

  onMount(() => {
    const wrap = document.getElementById('explainer-wrap');
    if (!wrap) return;

    // Same visibility gating as ExplainerTabBar: arrows only show while the
    // 4-section block itself is on screen (vertical, against the page).
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0, rootMargin: '-2px 0px -2px 0px' }
    );
    visibilityObserver.observe(wrap);

    // Same horizontal scroll-spy as ExplainerTabBar, to know which
    // section is current (for the first/last boundary hide) and where
    // "next"/"prev" should land.
    const spyObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) currentIndex = idx;
          }
        }
      },
      { root: wrap, rootMargin: '0px -45% 0px -45%', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spyObserver.observe(el);
    });

    return () => {
      visibilityObserver.disconnect();
      spyObserver.disconnect();
    };
  });
</script>

<button
  type="button"
  class="explainer-arrow explainer-arrow--left"
  class:visible={visible && canGoPrev}
  onclick={goPrev}
  aria-label="Previous section"
  aria-hidden={!(visible && canGoPrev)}
  tabindex={visible && canGoPrev ? 0 : -1}
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
</button>

<button
  type="button"
  class="explainer-arrow explainer-arrow--right"
  class:visible={visible && canGoNext}
  onclick={goNext}
  aria-label="Next section"
  aria-hidden={!(visible && canGoNext)}
  tabindex={visible && canGoNext ? 0 : -1}
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6" /></svg>
</button>

<style>
  /* Desktop/pointer-only by design (hover: hover + pointer: fine, not a
     width breakpoint — a real capability check, same pattern sqrz-dashboard
     uses for its own "should touch devices see this affordance" case, the
     Leads page's hover-revealed row actions). On a touchscreen, swiping is
     already the familiar, expected motion — these would just be clutter
     competing with the phone screenshots. Mobile-first: hidden by default,
     only shown when the capability check passes. */
  .explainer-arrow {
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .explainer-arrow {
      display: flex;
      position: absolute;
      top: 50%;
      transform: translateY(-50%) scale(0.92);
      z-index: 5;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid rgba(17, 17, 17, 0.08);
      background: rgba(17, 17, 17, 0.06);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      color: rgba(17, 17, 17, 0.55);
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease, background 0.2s ease, color 0.2s ease;
    }
    .explainer-arrow.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(-50%) scale(1);
    }
    .explainer-arrow:hover {
      background: rgba(17, 17, 17, 0.12);
      color: rgba(17, 17, 17, 0.8);
    }
    .explainer-arrow--left { left: 20px; }
    .explainer-arrow--right { right: 20px; }
  }

  .explainer-arrow svg {
    width: 20px;
    height: 20px;
  }
</style>
