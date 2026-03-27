<script>
  import { onMount, onDestroy, tick } from 'svelte';

  // ── SECTION DEFINITIONS ──────────────────────────────────────────────────
  const sections = [
    { id: 'studio', label: 'Studio',           corner: 'tl', number: '01' },
    { id: 'house',  label: 'House',             corner: 'tr', number: '02' },
    { id: 'will',   label: 'The Producer',      corner: 'bl', number: '03' },
    { id: 'collab', label: 'The Collaboration', corner: 'br', number: '04' },
  ];

  const cornerIndex = { tl: 0, tr: 1, bl: 2, br: 3 };

  // ── STATE ─────────────────────────────────────────────────────────────────
  let active       = $state(0);
  let transitioning = $state(false);
  let typedText    = $state('');
  let typingDone   = $state(false);
  let bodyVisible  = $state(false);
  let typeInterval = null;

  // ── HEADLINES ─────────────────────────────────────────────────────────────
  const headlines = [
    { plain: 'WHERE THE WORK ', accent: 'BECOMES REAL.' },
    { plain: 'DAYS HAVE ',      accent: '25 HOURS.'     },
    { plain: 'WILL ',           accent: 'VILLA.'        },
    { plain: 'NOT A LABEL. ',   accent: 'BETTER.'       },
  ];

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

  // ── TYPED SPLIT ───────────────────────────────────────────────────────────
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

  onDestroy(() => { clearInterval(typeInterval); });
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

    <div class="ghost-number">{section.number}</div>

    <div class="panel-inner">
      <!-- Eyebrow -->
      {#if section.id === 'studio'}
        <p class="eyebrow">01 — THE STUDIO</p>
      {:else if section.id === 'house'}
        <p class="eyebrow">02 — THE RESIDENCE</p>
      {:else if section.id === 'will'}
        <p class="eyebrow">03 — THE PRODUCER</p>
      {:else if section.id === 'collab'}
        <p class="eyebrow">04 — THE FIRM</p>
      {/if}

      <!-- Headline with typewriter -->
      <h2 class="headline">
        {#if active === i}
          <span class="typed-plain">{splitTyped(i).plain}</span><span class="typed-accent">{splitTyped(i).accent}</span>{#if !typingDone}<span class="cursor">|</span>{/if}
        {:else}
          <span class="typed-plain">{headlines[i].plain}</span><span class="typed-accent">{headlines[i].accent}</span>
        {/if}
      </h2>

      <!-- Scrollable body -->
      <div class="body-wrap" class:body-visible={active === i ? bodyVisible : true}>

        <!-- ── STUDIO ──────────────────────────────────────────────────────── -->
        {#if section.id === 'studio'}
          <p class="body">A studio without talent is just a room full of equipment. This is not that.</p>
          <p class="body">This is a system you enter.</p>
          <p class="body">There is no separation here. No writing phase. No recording phase. No "we'll fix it later."<br>The moment is the process.</p>
          <p class="body">Sound, image, and presence are shaped at the same time — captured as they happen, or not at all.</p>
          <p class="body">Nothing is built in isolation.<br>Every signal is connected. Every decision is visible. Every action leaves a trace.<br>The work does not pass through stages. It emerges in one continuous movement.</p>

          <p class="body-subhead">YOU DON'T COME HERE TO TRY IDEAS</p>
          <p class="body">You come here to commit.<br>To decisions. To timing. To each other.<br>Because once it happens, it exists. And once it exists, it moves.</p>

          <!-- TODO: replace with actual image -->
          <div class="image-placeholder" style="width:100%; aspect-ratio:16/9; background:rgba(255,255,255,0.03); border-radius:8px;"></div>

          <!-- Spec grid -->
          <div class="spec-grid">
            {#each [
              { cat: 'AUDIO',     val: 'Not recording. Composition in motion.'    },
              { cat: 'VIDEO',     val: 'Not documentation. Presence made visible.' },
              { cat: 'BROADCAST', val: 'Not promotion. Immediate transmission.'    },
              { cat: 'DIGITAL',   val: 'Not an afterthought. The work continues there.' },
            ] as spec}
              <div class="spec-item">
                <span class="spec-cat">{spec.cat}</span>
                <span class="spec-val">{spec.val}</span>
              </div>
            {/each}
          </div>

          <div class="panel-footer">
            <p class="body-subhead">WHAT LEAVES THIS SPACE</p>
            <p class="body">Not drafts. Not versions. Not content.<br>Moments — complete, documented, and already in the world.</p>
          </div>

        <!-- ── HOUSE ────────────────────────────────────────────────────────── -->
        {:else if section.id === 'house'}
          <p class="body">Not because time changes — but because everything else stops.</p>
          <p class="body">There is no schedule here. No hourly rate. No pressure to arrive at a result before the clock runs out.<br>You don't come for a session. You stay.</p>
          <p class="body">The house is over two hundred years old. A former farm in the Pfalz — timber, walls that have seen generations, mornings that arrive slowly.<br>It is quiet in a way most people have forgotten.<br>No traffic. No background noise. No urgency leaking in from the outside.</p>

          <!-- TODO: replace with actual image -->
          <div class="image-placeholder" style="width:100%; aspect-ratio:16/9; background:rgba(255,255,255,0.03); border-radius:8px;"></div>

          <p class="body-subhead">A DIFFERENT KIND OF TIME</p>
          <p class="body">In the city, everything is measured. Hours. Budgets. Output.<br>Here, time expands.<br>You can arrive without a finished idea. You can take space to rehearse. To fail. To try something again without watching the clock.<br>Vulnerability is not a risk here. It is part of the process.</p>
          <p class="body">Work and life are not separated.<br>You wake up here. You eat here. You continue where you left off.<br>Conversations don't end because a session ends. They turn into the work.</p>

          <p class="body-subhead">THE CONTRAST IS DELIBERATE</p>
          <p class="body">This is not Berlin. Not Hamburg. Not a studio block between traffic and deadlines.<br>This is Haßloch.<br>And right next door: scale. Plopsa Holiday Park — a global production environment, operating year-round.<br>The world of large stages is close. But here, it is quiet.</p>

        <!-- ── THE PRODUCER ──────────────────────────────────────────────────── -->
        {:else if section.id === 'will'}
          <p class="body">This doesn't come from one place.</p>
          <p class="body">Born in Medellín. Raised in the Pfalz.<br>But that was only the beginning.</p>
          <p class="body">New York. Ibiza. Berlin. Months here, years there. Stages, studios, temporary homes.<br>Different languages. Different rhythms. Different ways of working.<br>Not something to adapt to — something to move through.</p>
          <p class="body">Over time, you stop thinking in scenes.<br>You start seeing systems.</p>
          <p class="body">Touring productions where nothing can fail. Theater environments where sound, light, and image are one structure. Broadcast setups where everything happens in real time.<br>No separation. No safety net.</p>
          <p class="body">That is where this comes from.<br>Not from the idea of a studio — but from the reality of performance.</p>

          <!-- TODO: replace with actual image -->
          <div class="image-placeholder" style="width:100%; aspect-ratio:16/9; background:rgba(255,255,255,0.03); border-radius:8px;"></div>

          <p class="body-subhead">AND THAT CHANGES THE ROLE</p>
          <p class="body">This is not production in the traditional sense.<br>No sending files. No waiting for feedback. No endless versions.<br>The work exists when it happens.<br>Or it doesn't.</p>

        <!-- ── THE COLLABORATION ─────────────────────────────────────────────── -->
        {:else if section.id === 'collab'}
          <p class="body">A label takes ownership. An agency takes commission.<br>This does neither.</p>
          <p class="body">If we work together, I invest.<br>Not in the traditional sense — but in building the structure around you.</p>
          <p class="body">The studio. The system. The digital presence that continues after the work is done.</p>
          <p class="body">You don't leave with just material.<br>You leave with infrastructure.</p>

          <!-- TODO: replace with actual image -->
          <div class="image-placeholder" style="width:100%; aspect-ratio:16/9; background:rgba(255,255,255,0.03); border-radius:8px;"></div>

          <p class="body-subhead">WHAT THAT MEANS</p>
          <p class="body">A SQRZ Page — not a placeholder, but a living space. Your own domain. A system designed to convert attention into opportunity.<br>Audience tracking. Lead generation. A booking pipeline that doesn't depend on constant outreach.</p>
          <p class="body">No exclusivity.<br>No contract locking you in.<br>No taking control of what you create or where you go.</p>

          <p class="body-subhead">THIS IS NOT FOR EVERYONE</p>
          <p class="body">It requires something most structures avoid:<br>Clarity. Consistency. A willingness to be visible.</p>

          <p class="body-subhead">IF YOU'RE HERE, YOU ALREADY KNOW</p>
          <p class="body">This is not something you apply for.<br>There is no open call.<br>No funnel.</p>
          <p class="body">If this makes sense to you, we're probably already in conversation.</p>
        {/if}

      </div><!-- /body-wrap -->
    </div><!-- /panel-inner -->
  </div><!-- /panel -->
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

  .corner-tr,
  .corner-br { align-items: flex-end; }

  .corner-tl { top: 2rem;    left: 2rem;  }
  .corner-tr { top: 2rem;    right: 2rem; }
  .corner-bl { bottom: 2rem; left: 2rem;  }
  .corner-br { bottom: 2rem; right: 2rem; }

  .corner-square {
    width: 10px;
    height: 10px;
    background: rgba(255,255,255,0.15);
    transition: background 0.25s;
  }
  .corner-btn.is-active .corner-square { background: #F3B130; }
  .corner-btn:hover     .corner-square { background: rgba(255,255,255,0.4); }

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
  .corner-btn.is-active .corner-label { color: #F3B130; }
  .corner-btn:hover     .corner-label { color: rgba(255,255,255,0.6); }

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
    /* padding keeps content away from corner buttons */
    padding: 5rem 0;
    overflow: hidden;
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
    /* column layout so body-wrap takes remaining height */
    display: flex;
    flex-direction: column;
    max-height: 100%;
  }

  /* ── GHOST NUMBER ─────────────────────────────────────────────────────── */
  .ghost-number {
    position: absolute;
    bottom: 0;
    right: 1rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 160px;
    font-weight: 900;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  /* ── EYEBROW ──────────────────────────────────────────────────────────── */
  .eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 1.2rem;
    flex-shrink: 0;
  }

  /* ── HEADLINE ─────────────────────────────────────────────────────────── */
  .headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(2.4rem, 5.5vw, 4rem);
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1.05;
    letter-spacing: 0.02em;
    margin-bottom: 1.6rem;
    flex-shrink: 0;
    /* reserve two lines so layout doesn't jump during typewriter */
    min-height: 2.2em;
  }

  .typed-plain  { color: #ffffff; }
  .typed-accent { color: #F3B130; }

  .cursor {
    color: #F3B130;
    animation: blink 0.7s step-end infinite;
    margin-left: 1px;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* ── BODY WRAP (scrollable) ───────────────────────────────────────────── */
  .body-wrap {
    opacity: 0;
    transition: opacity 0.5s ease;
    overflow-y: auto;
    flex: 1;
    min-height: 0;
    /* subtle scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.1) transparent;
    padding-right: 6px;
    /* fade bottom edge to hint more content */
    -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  }

  .body-wrap.body-visible { opacity: 1; }

  .body-wrap::-webkit-scrollbar { width: 3px; }
  .body-wrap::-webkit-scrollbar-track { background: transparent; }
  .body-wrap::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

  /* ── BODY TEXT ────────────────────────────────────────────────────────── */
  .body {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.85;
    color: rgba(255,255,255,0.5);
    margin-bottom: 1rem;
  }
  .body:last-child { margin-bottom: 0; }
  .body strong { color: rgba(255,255,255,0.75); font-weight: 500; }
  .body em     { color: rgba(255,255,255,0.65); font-style: italic; }

  .body-subhead {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-top: 1.8rem;
    margin-bottom: 0.7rem;
  }

  /* ── IMAGE PLACEHOLDER ────────────────────────────────────────────────── */
  .image-placeholder {
    margin-bottom: 1.6rem;
    margin-top: 0.4rem;
  }

  /* ── SPEC GRID ────────────────────────────────────────────────────────── */
  .spec-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 1.6rem;
  }

  .spec-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0.9rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .spec-item:nth-child(odd)  { padding-right: 1.2rem; border-right: 1px solid rgba(255,255,255,0.06); }
  .spec-item:nth-child(even) { padding-left: 1.2rem; }

  .spec-cat {
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #F3B130;
  }

  .spec-val {
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    line-height: 1.5;
  }

  /* ── PANEL FOOTER (panel 1 closing text) ──────────────────────────────── */
  .panel-footer {
    margin-top: 1.6rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  /* ── MOBILE ───────────────────────────────────────────────────────────── */
  @media (max-width: 600px) {
    .corner-tl { top: 1.2rem;    left: 1.2rem;  }
    .corner-tr { top: 1.2rem;    right: 1.2rem; }
    .corner-bl { bottom: 1.2rem; left: 1.2rem;  }
    .corner-br { bottom: 1.2rem; right: 1.2rem; }

    .corner-label { display: none; }
    .corner-square { width: 12px; height: 12px; }

    .panel { padding: 4rem 0; }
    .headline { font-size: clamp(1.9rem, 7.5vw, 2.6rem); min-height: 2em; }
    .ghost-number { font-size: 90px; }

    .spec-grid { grid-template-columns: 1fr; }
    .spec-item:nth-child(odd)  { padding-right: 0; border-right: none; }
    .spec-item:nth-child(even) { padding-left: 0; }
  }
</style>
