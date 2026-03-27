<script>
  import { onMount, onDestroy, tick } from 'svelte';

  // ── SECTION DEFINITIONS ──────────────────────────────────────────────────
  const sections = [
    { id: 'studio',   label: 'Studio',           corner: 'tl', number: '01' },
    { id: 'house',    label: 'House',             corner: 'tr', number: '02' },
    { id: 'will',     label: 'The Producer',      corner: 'bl', number: '03' },
    { id: 'collab',   label: 'The Collaboration', corner: 'br', number: '04' },
  ];

  const cornerIndex = { tl: 0, tr: 1, bl: 2, br: 3 };

  // ── STATE ─────────────────────────────────────────────────────────────────
  let active = $state(0);
  let transitioning = $state(false);

  // Typewriter state per panel
  let typedText    = $state('');
  let typingDone   = $state(false);
  let bodyVisible  = $state(false);
  let typeInterval = null;

  // ── PANEL HEADLINES ───────────────────────────────────────────────────────
  // Each headline is split into [plainPart, accentPart] — rendered separately
  const headlines = [
    { plain: 'WHERE THE WORK ',  accent: 'BECOMES REAL.' },
    { plain: 'DAYS HAVE ',        accent: '25 HOURS.'     },
    { plain: 'WILL ',             accent: 'VILLA.'        },
    { plain: 'NOT A LABEL. ',     accent: 'BETTER.'      },
  ];

  // Full headline string for typewriter (accent part appended)
  function fullHeadline(i) {
    return headlines[i].plain + headlines[i].accent;
  }

  // ── TYPEWRITER ────────────────────────────────────────────────────────────
  function startTypewriter(index) {
    clearInterval(typeInterval);
    typedText   = '';
    typingDone  = false;
    bodyVisible = false;

    const full = fullHeadline(index);
    let pos = 0;

    typeInterval = setInterval(() => {
      pos++;
      typedText = full.slice(0, pos);
      if (pos >= full.length) {
        clearInterval(typeInterval);
        typingDone = true;
        // Fade in body text after headline finishes
        setTimeout(() => { bodyVisible = true; }, 120);
      }
    }, 38 + Math.random() * 18);
  }

  // ── NAVIGATE ─────────────────────────────────────────────────────────────
  async function navigate(toIndex) {
    if (toIndex === active || transitioning) return;
    transitioning = true;
    active = toIndex;
    await tick();
    startTypewriter(toIndex);
    transitioning = false;
  }

  // ── KEYBOARD NAV ─────────────────────────────────────────────────────────
  const keyMap = {
    ArrowLeft:  { tl: null, tr: 'tl', bl: null, br: 'bl' },
    ArrowRight: { tl: 'tr', tr: null, bl: 'br', br: null },
    ArrowUp:    { tl: null, tr: null, bl: 'tl', br: 'tr' },
    ArrowDown:  { tl: 'bl', tr: 'br', bl: null, br: null },
  };

  function handleKey(e) {
    if (!keyMap[e.key]) return;
    const current = sections[active].corner;
    const target = keyMap[e.key][current];
    if (target != null) navigate(cornerIndex[target]);
  }

  // ── DERIVED: typed plain vs accent split ─────────────────────────────────
  // Returns { plain, accent } portions of the already-typed string
  function splitTyped(index) {
    const h = headlines[index];
    if (typedText.length <= h.plain.length) {
      return { plain: typedText, accent: '' };
    }
    return { plain: h.plain, accent: typedText.slice(h.plain.length) };
  }

  // ── LIFECYCLE ─────────────────────────────────────────────────────────────
  onMount(() => {
    window.addEventListener('keydown', handleKey);
    startTypewriter(0);
    return () => window.removeEventListener('keydown', handleKey);
  });

  onDestroy(() => {
    clearInterval(typeInterval);
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <title>SQRZ Studio</title>
</svelte:head>

<!-- ── CORNER NAVIGATION ──────────────────────────────────────────────────── -->
{#each sections as section, i}
  <button
    class="corner-btn corner-{section.corner}"
    class:is-active={active === i}
    onclick={() => navigate(i)}
    aria-label={section.label}
  >
    <div class="corner-square"></div>
    <span class="corner-label">{section.label}</span>
  </button>
{/each}

<!-- ── SECTION PANELS ────────────────────────────────────────────────────── -->
{#each sections as section, i}
  <div class="panel" class:panel-active={active === i}>

    <!-- Ghost number -->
    <div class="ghost-number">{section.number}</div>

    <!-- ── STUDIO ────────────────────────────────────────────────────────── -->
    {#if section.id === 'studio'}
      <div class="panel-inner">
        <p class="eyebrow">01 — STUDIO</p>

        <h2 class="headline">
          {#if active === i}
            <span class="typed-plain">{splitTyped(i).plain}</span><span class="typed-accent">{splitTyped(i).accent}</span>{#if !typingDone}<span class="cursor">|</span>{/if}
          {:else}
            <span class="typed-plain">{headlines[i].plain}</span><span class="typed-accent">{headlines[i].accent}</span>
          {/if}
        </h2>

        <div class="body-wrap" class:body-visible={active === i ? bodyVisible : true}>
          <p class="body">
            A professional audio, video, and broadcast infrastructure built from years of working on stages and in studios where the standards are unforgiving. This is not a project space. It is a production environment.
          </p>

          <!-- System spec grid -->
          <div class="spec-grid">
            {#each [
              { cat: 'AUDIO',     val: 'Composition in motion.'    },
              { cat: 'VIDEO',     val: 'Presence made visible.'    },
              { cat: 'BROADCAST', val: 'Immediate transmission.'   },
              { cat: 'DIGITAL',   val: 'The work continues there.' },
            ] as spec}
              <div class="spec-item">
                <span class="spec-cat">{spec.cat}</span>
                <span class="spec-val">{spec.val}</span>
              </div>
            {/each}
          </div>

          <!-- TODO: add image here -->
          <div class="img-placeholder"></div>
        </div>
      </div>

    <!-- ── HOUSE ──────────────────────────────────────────────────────────── -->
    {:else if section.id === 'house'}
      <div class="panel-inner">
        <p class="eyebrow">02 — HOUSE</p>

        <h2 class="headline">
          {#if active === i}
            <span class="typed-plain">{splitTyped(i).plain}</span><span class="typed-accent">{splitTyped(i).accent}</span>{#if !typingDone}<span class="cursor">|</span>{/if}
          {:else}
            <span class="typed-plain">{headlines[i].plain}</span><span class="typed-accent">{headlines[i].accent}</span>
          {/if}
        </h2>

        <div class="body-wrap" class:body-visible={active === i ? bodyVisible : true}>
          <p class="body">
            Over two hundred years ago, a farm was built in the Pfalz. Today it is the operational home of SQRZ — a creative residency where artists come to work, live, and make things that last.
          </p>
          <p class="body" style="margin-top: 1.2rem;">
            This is not a city studio. It is a deliberate counterpoint to the urban club circuit — space, silence, and time. Cast members are invited to stay. The house is large. The work happens over days, not hours.
          </p>
          <p class="body" style="margin-top: 1.2rem;">
            And directly next door: <strong>Plopsa Holiday Park</strong> — a global entertainment venue that stages major live productions year-round. The infrastructure of scale is already in the neighbourhood.
          </p>

          <!-- TODO: add image here -->
          <div class="img-placeholder"></div>
        </div>
      </div>

    <!-- ── THE PRODUCER ───────────────────────────────────────────────────── -->
    {:else if section.id === 'will'}
      <div class="panel-inner">
        <p class="eyebrow">03 — THE PRODUCER</p>

        <h2 class="headline">
          {#if active === i}
            <span class="typed-plain">{splitTyped(i).plain}</span><span class="typed-accent">{splitTyped(i).accent}</span>{#if !typingDone}<span class="cursor">|</span>{/if}
          {:else}
            <span class="typed-plain">{headlines[i].plain}</span><span class="typed-accent">{headlines[i].accent}</span>
          {/if}
        </h2>

        <div class="body-wrap" class:body-visible={active === i ? bodyVisible : true}>
          <p class="body">
            Born in Medellín, raised in the Pfalz. Over twenty years operating at the intersection of music, engineering, and live production — across forty countries, on stages and in studios where the standards are unforgiving.
          </p>
          <p class="body" style="margin-top: 1.2rem;">
            His 2016 single <em>Curura</em>, featuring Latin Grammy Lifetime Achievement recipient <strong>Toto La Momposina</strong> and produced by <strong>Ken Lewis</strong> (Alicia Keys, BTS, Taylor Swift), was broadcast on KEXP, BBC, and Funkhaus Europa. SQRZ Cast is the infrastructure that should have existed then.
          </p>

          <!-- TODO: add image here -->
          <div class="img-placeholder"></div>
        </div>
      </div>

    <!-- ── THE COLLABORATION ──────────────────────────────────────────────── -->
    {:else if section.id === 'collab'}
      <div class="panel-inner">
        <p class="eyebrow">04 — THE COLLABORATION</p>

        <h2 class="headline">
          {#if active === i}
            <span class="typed-plain">{splitTyped(i).plain}</span><span class="typed-accent">{splitTyped(i).accent}</span>{#if !typingDone}<span class="cursor">|</span>{/if}
          {:else}
            <span class="typed-plain">{headlines[i].plain}</span><span class="typed-accent">{headlines[i].accent}</span>
          {/if}
        </h2>

        <div class="body-wrap" class:body-visible={active === i ? bodyVisible : true}>
          <p class="body">
            A traditional label brings money and distribution. What it has never been able to bring is permanent digital infrastructure — the kind that builds audience, captures data, and compounds over time.
          </p>
          <p class="body" style="margin-top: 1.2rem;">
            SQRZ Cast is not open for applications. Collaborations begin when there is genuine creative alignment. That is a conversation, not a process.
          </p>

          <!-- TODO: add image here -->
          <div class="img-placeholder"></div>
        </div>
      </div>
    {/if}

  </div>
{/each}

<style>
  /* ── RESET ────────────────────────────────────────────────────────────── */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html, body) {
    width: 100%; height: 100%;
    overflow: hidden;
    background: #0a0a0a;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* ── CORNER BUTTONS ───────────────────────────────────────────────────── */
  .corner-btn {
    position: fixed;
    z-index: 100;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
  }

  /* Right-side corners align right */
  .corner-tr,
  .corner-br { align-items: flex-end; }

  /* Positions */
  .corner-tl { top: 2rem; left: 2rem; }
  .corner-tr { top: 2rem; right: 2rem; }
  .corner-bl { bottom: 2rem; left: 2rem; }
  .corner-br { bottom: 2rem; right: 2rem; }

  .corner-square {
    width: 10px;
    height: 10px;
    background: rgba(255,255,255,0.15);
    transition: background 0.25s;
  }

  .corner-btn.is-active .corner-square {
    background: #F3B130;
  }

  .corner-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    transition: color 0.25s;
    white-space: nowrap;
  }

  .corner-btn.is-active .corner-label {
    color: #F3B130;
  }

  .corner-btn:hover .corner-label {
    color: rgba(255,255,255,0.6);
  }

  .corner-btn:hover .corner-square {
    background: rgba(255,255,255,0.4);
  }

  /* ── PANELS ───────────────────────────────────────────────────────────── */
  .panel {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }

  .panel.panel-active {
    opacity: 1;
    pointer-events: auto;
  }

  /* ── PANEL INNER ──────────────────────────────────────────────────────── */
  .panel-inner {
    position: relative;
    max-width: 680px;
    width: 100%;
    padding: 0 2rem;
  }

  /* ── GHOST NUMBER ─────────────────────────────────────────────────────── */
  .ghost-number {
    position: absolute;
    bottom: 2rem;
    right: 3rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 160px;
    font-weight: 900;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  /* ── EYEBROW ──────────────────────────────────────────────────────────── */
  .eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 1.4rem;
  }

  /* ── HEADLINE ─────────────────────────────────────────────────────────── */
  .headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(2.6rem, 6vw, 4.2rem);
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1.05;
    letter-spacing: 0.02em;
    margin-bottom: 2rem;
    min-height: 2lh; /* reserve space so layout doesn't jump */
  }

  .typed-plain  { color: #ffffff; }
  .typed-accent { color: #F3B130; }

  /* Blinking cursor */
  .cursor {
    color: #F3B130;
    animation: blink 0.7s step-end infinite;
    margin-left: 1px;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* ── BODY ─────────────────────────────────────────────────────────────── */
  .body-wrap {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .body-wrap.body-visible {
    opacity: 1;
  }

  .body {
    font-size: 0.95rem;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255,255,255,0.5);
  }

  .body strong { color: rgba(255,255,255,0.75); font-weight: 500; }
  .body em     { color: rgba(255,255,255,0.65); font-style: italic; }

  /* ── SPEC GRID (Panel 1 only) ─────────────────────────────────────────── */
  .spec-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .spec-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .spec-item:nth-child(odd)  { padding-right: 1.5rem; border-right: 1px solid rgba(255,255,255,0.06); }
  .spec-item:nth-child(even) { padding-left: 1.5rem; }

  .spec-cat {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #F3B130;
  }

  .spec-val {
    font-size: 0.82rem;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
  }

  /* ── IMAGE PLACEHOLDER ────────────────────────────────────────────────── */
  .img-placeholder {
    margin-top: 2rem;
    width: 100%;
    height: 120px;
    background: rgba(255,255,255,0.03);
    border-radius: 2px;
  }

  /* ── MOBILE ───────────────────────────────────────────────────────────── */
  @media (max-width: 600px) {
    .corner-tl { top: 1.2rem; left: 1.2rem; }
    .corner-tr { top: 1.2rem; right: 1.2rem; }
    .corner-bl { bottom: 1.2rem; left: 1.2rem; }
    .corner-br { bottom: 1.2rem; right: 1.2rem; }

    .corner-label { display: none; }

    .corner-square {
      width: 12px;
      height: 12px;
    }

    .headline { font-size: clamp(2rem, 8vw, 2.8rem); }

    .ghost-number { font-size: 100px; right: 1rem; }

    .spec-grid { grid-template-columns: 1fr; }
    .spec-item:nth-child(odd) { padding-right: 0; border-right: none; }
    .spec-item:nth-child(even) { padding-left: 0; }
  }
</style>
