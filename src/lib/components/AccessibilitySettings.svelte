<script lang="ts">
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { tick } from 'svelte';
  import { page } from '$app/stores';
  import {
    allLocaleCodes,
    getLocaleFromPathname,
    localizePath,
    locales,
    stripLocalePrefix,
  } from '$lib/i18n';

  let open = $state(false);
  let bionicEnabled = $state(false);
  let fontSize = $state<'small' | 'default' | 'large'>('default');
  let highContrast = $state(false);
  let mounted = $state(false);

  let triggerEl = $state<HTMLButtonElement | null>(null);
  let popupEl = $state<HTMLDivElement | null>(null);

  // One stored HTML string per bionic-processed container
  const originalHtmlMap = new Map<Element, string>();

  /**
   * Candidate selectors for prose content.
   * applyBionic() filters these down to outermost-only containers so nothing
   * is walked twice (e.g. .post-content nested inside a <section>).
   */
  const PROSE_SELECTORS =
    'section, main, .post-content, .legal-page, .cmp-dive-section, .cmp-callout';

  // Tags whose entire DOM subtree should be skipped (nav, footer, buttons…)
  const SKIP_SUBTREES = new Set([
    'SCRIPT', 'STYLE', 'NAV', 'FOOTER', 'BUTTON', 'LABEL',
    'SELECT', 'INPUT', 'TEXTAREA',
  ]);
  // Tags where the immediate parent means "don't touch this text node"
  const SKIP_PARENTS = new Set(['B', 'STRONG', 'CODE', 'PRE', 'SCRIPT', 'STYLE']);

  // Language switcher — derived from page store
  const currentLocale = $derived(getLocaleFromPathname($page.url.pathname));
  const barePath = $derived(stripLocalePrefix($page.url.pathname));

  function languageHref(locale: (typeof allLocaleCodes)[number]) {
    const targetPath = /^\/blog\/[^/]+/.test(barePath) ? '/blog' : barePath;
    return localizePath(targetPath, locale);
  }

  // ── Load preferences on mount ─────────────────────────────────────────
  onMount(() => {
    bionicEnabled = localStorage.getItem('sqrz_a11y_bionic') === 'true';
    fontSize = (localStorage.getItem('sqrz_a11y_fontSize') as 'small' | 'default' | 'large') || 'default';
    highContrast = localStorage.getItem('sqrz_a11y_highContrast') === 'true';
    mounted = true;

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleOutsideClick, true);
    };
  });

  // ── Persist + apply font size ─────────────────────────────────────────
  $effect(() => {
    if (!mounted) return;
    localStorage.setItem('sqrz_a11y_fontSize', fontSize);
    const sizes: Record<string, string> = { small: '0.8rem', default: '1rem', large: '1.15rem' };
    document.documentElement.style.setProperty('--a11y-prose-size', sizes[fontSize] ?? '1rem');
    document.documentElement.dataset.fontSize = fontSize;
  });

  // ── Persist + apply high contrast ────────────────────────────────────
  $effect(() => {
    if (!mounted) return;
    localStorage.setItem('sqrz_a11y_highContrast', String(highContrast));
    document.documentElement.dataset.highContrast = String(highContrast);
  });

  // ── Persist + apply bionic reading ───────────────────────────────────
  $effect(() => {
    if (!mounted) return;
    localStorage.setItem('sqrz_a11y_bionic', String(bionicEnabled));
    if (bionicEnabled) {
      tick().then(applyBionic);
    } else {
      removeBionic();
    }
  });

  // Re-apply bionic after SvelteKit navigation (new page content in DOM)
  afterNavigate(() => {
    if (bionicEnabled) {
      originalHtmlMap.clear();
      tick().then(applyBionic);
    }
  });

  // ── Bionic reading helpers ────────────────────────────────────────────
  function applyBionic() {
    const all = Array.from(document.querySelectorAll<HTMLElement>(PROSE_SELECTORS));

    // Keep only outermost containers — skip any element that is a descendant
    // of another container already in the list. This prevents double-walking
    // when e.g. .post-content is nested inside a <section>.
    const roots = all.filter(
      (el) => !all.some((other) => other !== el && other.contains(el))
    );

    roots.forEach((container) => {
      if (container.getAttribute('data-bionic') === 'true') return;
      originalHtmlMap.set(container, container.innerHTML);
      container.setAttribute('data-bionic', 'true');
      walkNodes(container);
    });
  }

  function removeBionic() {
    document.querySelectorAll<HTMLElement>('[data-bionic="true"]').forEach((container) => {
      const original = originalHtmlMap.get(container);
      if (original !== undefined) container.innerHTML = original;
      container.removeAttribute('data-bionic');
    });
    originalHtmlMap.clear();
  }

  /**
   * Recursively walk DOM nodes and bold the first half of each word.
   * Skips entire subtrees of UI chrome elements (NAV, FOOTER, BUTTON…).
   * Skips text nodes whose immediate parent is a bold/code/script tag.
   */
  function walkNodes(node: Node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip entire subtrees of UI chrome — this is the key fix that allows
      // broad containers like <section> without touching nav or footer text.
      if (SKIP_SUBTREES.has((node as Element).tagName)) return;
      Array.from(node.childNodes).forEach(walkNodes);
    } else if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (!parent || SKIP_PARENTS.has(parent.tagName)) return;
      const text = node.textContent ?? '';
      if (!text.trim()) return;
      const html = text.replace(/(\w+)/g, (word) => {
        const half = Math.ceil(word.length / 2);
        return `<b class="bionic-b">${word.slice(0, half)}</b>${word.slice(half)}`;
      });
      const wrapper = document.createElement('span');
      wrapper.innerHTML = html;
      parent.replaceChild(wrapper, node);
    }
  }

  // ── Popup open/close ──────────────────────────────────────────────────
  function toggleOpen() {
    open = !open;
    if (open) {
      tick().then(() => {
        popupEl?.querySelector<HTMLElement>('button:not([disabled]), a[href]')?.focus();
      });
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === 'Escape') {
      open = false;
      triggerEl?.focus();
      return;
    }
    if (e.key === 'Tab' && popupEl) {
      const focusable = Array.from(
        popupEl.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function handleOutsideClick(e: MouseEvent) {
    if (!open) return;
    const target = e.target as Node;
    if (
      popupEl && !popupEl.contains(target) &&
      triggerEl && !triggerEl.contains(target)
    ) {
      open = false;
    }
  }
</script>

<!-- Trigger + popup wrapper -->
<div class="settings-wrap">
  <button
    bind:this={triggerEl}
    class="settings-trigger"
    aria-label="Display and accessibility settings"
    aria-expanded={open}
    aria-haspopup="dialog"
    onclick={toggleOpen}
  >
    <!-- Sliders icon -->
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
      <line x1="4" y1="21" x2="4" y2="14"/>
      <line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/>
      <line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/>
      <line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  </button>

  {#if open}
    <div
      bind:this={popupEl}
      class="settings-popup"
      role="dialog"
      aria-label="Display and accessibility settings"
      aria-modal="true"
    >
      <p class="popup-title">Display Settings</p>

      <!-- Language switcher -->
      <section class="popup-section">
        <p class="popup-section-label">Language</p>
        <div class="lang-group" role="group" aria-label="Language">
          {#each allLocaleCodes as locale}
            <a
              href={languageHref(locale)}
              class="lang-btn"
              class:lang-active={currentLocale === locale}
              aria-label={locales[locale].label}
              aria-current={currentLocale === locale ? 'true' : undefined}
              onclick={() => (open = false)}
            >{locales[locale].shortLabel}</a>
          {/each}
        </div>
      </section>

      <div class="popup-divider" aria-hidden="true"></div>

      <!-- Bionic reading -->
      <section class="popup-section">
        <div class="popup-row">
          <div class="popup-row-text">
            <span class="popup-row-title">Bionic Reading</span>
            <span class="popup-row-desc">Bolds first half of words in articles</span>
          </div>
          <button
            class="toggle"
            class:toggle-on={bionicEnabled}
            role="switch"
            aria-checked={bionicEnabled}
            aria-label="Toggle bionic reading"
            onclick={() => (bionicEnabled = !bionicEnabled)}
          >
            <span class="toggle-thumb" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      <div class="popup-divider" aria-hidden="true"></div>

      <!-- Article text size -->
      <section class="popup-section">
        <p class="popup-section-label">Article Text Size</p>
        <div class="font-size-group" role="group" aria-label="Article text size">
          <button
            class="fs-btn fs-btn-s"
            class:fs-active={fontSize === 'small'}
            aria-pressed={fontSize === 'small'}
            onclick={() => (fontSize = 'small')}
          >A</button>
          <button
            class="fs-btn fs-btn-m"
            class:fs-active={fontSize === 'default'}
            aria-pressed={fontSize === 'default'}
            onclick={() => (fontSize = 'default')}
          >A</button>
          <button
            class="fs-btn fs-btn-l"
            class:fs-active={fontSize === 'large'}
            aria-pressed={fontSize === 'large'}
            onclick={() => (fontSize = 'large')}
          >A</button>
        </div>
      </section>

      <div class="popup-divider" aria-hidden="true"></div>

      <!-- High contrast -->
      <section class="popup-section">
        <div class="popup-row">
          <div class="popup-row-text">
            <span class="popup-row-title">High Contrast</span>
            <span class="popup-row-desc">Increases text contrast in articles</span>
          </div>
          <button
            class="toggle"
            class:toggle-on={highContrast}
            role="switch"
            aria-checked={highContrast}
            aria-label="Toggle high contrast"
            onclick={() => (highContrast = !highContrast)}
          >
            <span class="toggle-thumb" aria-hidden="true"></span>
          </button>
        </div>
      </section>
    </div>
  {/if}
</div>

<style>
  /* ── Trigger ───────────────────────────────────────────────────────── */
  .settings-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .settings-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: transparent;
    border-radius: 8px;
    /*
      #888888 matches the hardcoded color used by .nav-link and .nav-login
      in Nav.svelte — visible on both the transparent (light bg) and scrolled
      (dark bg) nav states. No CSS variable exists for this value in the project.
    */
    color: #888888;
    cursor: pointer;
    padding: 0;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .settings-trigger:hover,
  .settings-trigger[aria-expanded='true'] {
    background: rgba(0, 0, 0, 0.06);
    border-color: rgba(0, 0, 0, 0.2);
    color: #444444;
  }

  /* ── Popup ─────────────────────────────────────────────────────────── */
  .settings-popup {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    z-index: 200;
    width: 272px;
    background: #1c1c1c;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 16px;
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.7), 0 4px 14px rgba(0, 0, 0, 0.4);
    font-family: 'DM Sans', ui-sans-serif, sans-serif;
  }

  .popup-title {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.28);
    margin-bottom: 14px;
  }

  /* ── Sections ──────────────────────────────────────────────────────── */
  .popup-section {
    padding: 4px 0;
  }

  .popup-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
    margin: 10px 0;
  }

  .popup-section-label {
    font-size: 0.64rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.28);
    margin-bottom: 8px;
  }

  /* ── Language switcher ─────────────────────────────────────────────── */
  .lang-group {
    display: flex;
    gap: 6px;
  }

  .lang-btn {
    flex: 1;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.45);
    font-family: 'DM Sans', ui-sans-serif, sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }

  .lang-btn:hover {
    border-color: rgba(255, 255, 255, 0.22);
    color: rgba(255, 255, 255, 0.75);
  }

  .lang-active {
    border-color: #F5A623 !important;
    color: #F5A623 !important;
    background: rgba(245, 166, 35, 0.08) !important;
  }

  /* ── Row layout ────────────────────────────────────────────────────── */
  .popup-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .popup-row-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .popup-row-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.3;
  }

  .popup-row-desc {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.32);
    line-height: 1.3;
  }

  /* ── Toggle switch ─────────────────────────────────────────────────── */
  .toggle {
    flex-shrink: 0;
    width: 40px;
    height: 24px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    cursor: pointer;
    padding: 3px;
    display: flex;
    align-items: center;
    transition: background 0.2s;
  }

  .toggle-on {
    background: #F5A623;
  }

  .toggle-thumb {
    display: block;
    width: 18px;
    height: 18px;
    background: #ffffff;
    border-radius: 999px;
    transition: transform 0.2s;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  }

  .toggle-on .toggle-thumb {
    transform: translateX(16px);
  }

  /* ── Font size buttons ─────────────────────────────────────────────── */
  .font-size-group {
    display: flex;
    gap: 6px;
  }

  .fs-btn {
    flex: 1;
    height: 36px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.45);
    font-family: 'DM Sans', ui-sans-serif, sans-serif;
    font-weight: 600;
    line-height: 1;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fs-btn-s { font-size: 0.72rem; }
  .fs-btn-m { font-size: 0.9rem; }
  .fs-btn-l { font-size: 1.1rem; }

  .fs-btn:hover {
    border-color: rgba(255, 255, 255, 0.22);
    color: rgba(255, 255, 255, 0.75);
  }

  .fs-active {
    border-color: #F5A623 !important;
    color: #F5A623 !important;
    background: rgba(245, 166, 35, 0.08) !important;
  }

  /* ══════════════════════════════════════════════════════════════════════
     GLOBAL ACCESSIBILITY OVERRIDES
     ══════════════════════════════════════════════════════════════════════ */

  /* Bionic bold marker */
  :global(.bionic-b) {
    font-weight: 700;
  }

  /* ── Font size ─────────────────────────────────────────────────────── */

  /* Blog post content (dark) */
  :global(.post-content) {
    font-size: var(--a11y-prose-size, 1rem);
  }

  /* Legal + compare prose: only override when non-default to preserve
     the component's carefully designed base sizes */
  :global([data-font-size='small'] .legal-page p),
  :global([data-font-size='small'] .legal-page li),
  :global([data-font-size='small'] .cmp-dive-p),
  :global([data-font-size='small'] .cmp-dive-list li),
  :global([data-font-size='small'] .cmp-callout),
  :global([data-font-size='large'] .legal-page p),
  :global([data-font-size='large'] .legal-page li),
  :global([data-font-size='large'] .cmp-dive-p),
  :global([data-font-size='large'] .cmp-dive-list li),
  :global([data-font-size='large'] .cmp-callout) {
    font-size: var(--a11y-prose-size) !important;
  }

  /* Marketing/landing page text elements */
  :global([data-font-size='small'] section p),
  :global([data-font-size='small'] section li),
  :global([data-font-size='large'] section p),
  :global([data-font-size='large'] section li) {
    font-size: var(--a11y-prose-size) !important;
  }

  /* ── High contrast — blog (dark bg → pure white text) ──────────────── */
  :global([data-high-contrast='true'] .post-content) {
    background: #000 !important;
  }

  :global([data-high-contrast='true'] .post-content p),
  :global([data-high-contrast='true'] .post-content li) {
    color: #ffffff !important;
    opacity: 1 !important;
  }

  :global([data-high-contrast='true'] .post-content h2),
  :global([data-high-contrast='true'] .post-content h3) {
    color: #ffffff !important;
    opacity: 1 !important;
  }

  :global([data-high-contrast='true'] .post-content blockquote) {
    border-color: #F5A623 !important;
    color: #ffffff !important;
    opacity: 1 !important;
  }

  :global([data-high-contrast='true'] .post-content a) {
    color: #F5A623 !important;
    border-color: #F5A623 !important;
    opacity: 1 !important;
  }

  /* ── High contrast — legal pages (light bg → pure black text) ──────── */
  :global([data-high-contrast='true'] .legal-page) {
    background: #ffffff !important;
  }

  :global([data-high-contrast='true'] .legal-page p),
  :global([data-high-contrast='true'] .legal-page li) {
    color: #000000 !important;
    opacity: 1 !important;
  }

  :global([data-high-contrast='true'] .legal-page h2),
  :global([data-high-contrast='true'] .legal-page h3) {
    color: #000000 !important;
    opacity: 1 !important;
  }

  :global([data-high-contrast='true'] .legal-page a) {
    color: #0000cc !important;
    border-color: #0000cc !important;
    opacity: 1 !important;
  }

  /* ── High contrast — compare deep-dive (light bg → pure black text) ── */
  :global([data-high-contrast='true'] .cmp-dive-section) {
    background: #f0ede8 !important;
  }

  :global([data-high-contrast='true'] .cmp-dive-h3),
  :global([data-high-contrast='true'] .cmp-dive-p),
  :global([data-high-contrast='true'] .cmp-dive-list li) {
    color: #000000 !important;
    opacity: 1 !important;
  }

  :global([data-high-contrast='true'] .cmp-callout) {
    color: #000000 !important;
    opacity: 1 !important;
  }

  /* ── High contrast — marketing sections ────────────────────────────── */

  /* Dark sections (.dark class): boost text to full opacity white */
  :global([data-high-contrast='true'] section.dark p),
  :global([data-high-contrast='true'] section.dark li),
  :global([data-high-contrast='true'] section.dark h1),
  :global([data-high-contrast='true'] section.dark h2),
  :global([data-high-contrast='true'] section.dark h3) {
    color: #ffffff !important;
    opacity: 1 !important;
  }

  /* Light sections (.light class): push to pure black */
  :global([data-high-contrast='true'] section.light p),
  :global([data-high-contrast='true'] section.light li),
  :global([data-high-contrast='true'] section.light h1),
  :global([data-high-contrast='true'] section.light h2),
  :global([data-high-contrast='true'] section.light h3) {
    color: #000000 !important;
    opacity: 1 !important;
  }

  /* Unlabeled sections (no .dark / .light): safe opacity boost only —
     forces rgba-dimmed text to full opacity regardless of color scheme */
  :global([data-high-contrast='true'] section:not(.dark):not(.light) p),
  :global([data-high-contrast='true'] section:not(.dark):not(.light) li),
  :global([data-high-contrast='true'] section:not(.dark):not(.light) h1),
  :global([data-high-contrast='true'] section:not(.dark):not(.light) h2),
  :global([data-high-contrast='true'] section:not(.dark):not(.light) h3) {
    opacity: 1 !important;
  }
</style>
