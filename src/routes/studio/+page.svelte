<script>
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut, quintOut } from 'svelte/easing';

  // ── SECTION DEFINITIONS ──────────────────────────────────────────
  const sections = [
    {
      id: 'studio',
      label: 'The Studio',
      corner: 'tl',
      scrollAxis: 'x',
      scrollDir: 1,
      color: '#1a1f2e',
      accent: 'rgba(140,180,255,0.15)',
      canvasMode: 'grid',
    },
    {
      id: 'house',
      label: 'The Residence',
      corner: 'tr',
      scrollAxis: 'y',
      scrollDir: 1,
      color: '#1e1a14',
      accent: 'rgba(200,169,110,0.15)',
      canvasMode: 'organic',
    },
    {
      id: 'will',
      label: 'The Producer',
      corner: 'bl',
      scrollAxis: 'y',
      scrollDir: -1,
      color: '#0f1a0f',
      accent: 'rgba(100,200,120,0.1)',
      canvasMode: 'pulse',
    },
    {
      id: 'label',
      label: 'The Label',
      corner: 'br',
      scrollAxis: 'x',
      scrollDir: -1,
      color: '#1a0f1a',
      accent: 'rgba(180,120,220,0.12)',
      canvasMode: 'lines',
    },
  ];

  // ── STATE ─────────────────────────────────────────────────────────
  let active = 0;             // index of active section
  let transitioning = false;
  let canvas;
  let animFrame;
  let hoveredCorner = null;

  // Tweened background color
  const bgColor = tweened(0, { duration: 700, easing: cubicInOut });

  // Panel transform state for wipe animation
  let wipeFrom = null;        // corner the wipe starts from
  let wipeProgress = tweened(0, { duration: 600, easing: quintOut });
  let showWipe = false;

  // ── CORNER → SECTION INDEX ────────────────────────────────────────
  const cornerIndex = { tl: 0, tr: 1, bl: 2, br: 3 };

  // Corner positions in CSS (for the indicator squares)
  const cornerPos = {
    tl: { top: '24px',  left: '24px'  },
    tr: { top: '24px',  right: '24px' },
    bl: { bottom: '24px', left: '24px' },
    br: { bottom: '24px', right: '24px' },
  };

  // Wipe origin in clip-path terms
  const wipeOrigin = {
    tl: '0% 0%',
    tr: '100% 0%',
    bl: '0% 100%',
    br: '100% 100%',
  };

  // ── NAVIGATE ──────────────────────────────────────────────────────
  async function navigate(toIndex) {
     {
  if (toIndex === active || transitioning) return;
  transitioning = true;
  wipeFrom = sections[toIndex].corner;
  showWipe = true;
  wipeProgress.set(0, { duration: 0 });

  // Pre-scroll the target panel BEFORE it becomes visible
  const panel = document.querySelectorAll('.panel')[toIndex];
  if (panel) {
    const section = sections[toIndex];
    if (section.scrollDir === -1) {
      if (section.scrollAxis === 'y') {
        panel.scrollTop = panel.scrollHeight;
      } else {
        panel.scrollLeft = panel.scrollWidth;
      }
    } else {
      panel.scrollTop = 0;
      panel.scrollLeft = 0;
    }
  }

  await wipeProgress.set(1, { duration: 650, easing: quintOut });
  active = toIndex;
  showWipe = false;
  wipeProgress.set(0, { duration: 0 });
  transitioning = false;
}

    // Scroll reversed panels to their end position after transition
setTimeout(() => {
  const panel = document.querySelectorAll('.panel')[toIndex];
  if (!panel) return;
  const section = sections[toIndex];
  if (section.scrollDir === -1) {
    if (section.scrollAxis === 'y') {
      panel.scrollTop = panel.scrollHeight;
    } else {
      panel.scrollLeft = panel.scrollWidth;
    }
  } else {
    // Always reset forward-scrolling panels to the start
    panel.scrollTop = 0;
    panel.scrollLeft = 0;
  }
}, 50);
  }

  // ── KEYBOARD NAV ──────────────────────────────────────────────────
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
    if (target !== null && target !== undefined) {
      navigate(cornerIndex[target]);
    }
  }

  // ── GENERATIVE CANVAS ─────────────────────────────────────────────
  let ctx;
  let W, H;
  let particles = [];
  let time = 0;

  function initParticles() {
    particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function drawCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    time += 0.008;
    const mode = sections[active].canvasMode;
    const accent = sections[active].accent;

    if (mode === 'grid') {
      // Precise grid lines that shimmer
      ctx.strokeStyle = 'rgba(140,180,255,0.04)';
      ctx.lineWidth = 1;
      const spacing = 60;
      for (let x = 0; x < W; x += spacing) {
        ctx.globalAlpha = 0.3 + 0.2 * Math.sin(time + x * 0.01);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += spacing) {
        ctx.globalAlpha = 0.3 + 0.2 * Math.sin(time + y * 0.01);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.globalAlpha = 1;

    } else if (mode === 'organic') {
      // Warm floating orbs
      for (let i = 0; i < 5; i++) {
        const x = W * (0.2 + 0.6 * Math.sin(time * 0.3 + i * 1.3));
        const y = H * (0.2 + 0.6 * Math.cos(time * 0.2 + i * 0.9));
        const r = 80 + 40 * Math.sin(time + i);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgba(200,169,110,${0.06 + 0.02 * Math.sin(time + i)})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (mode === 'pulse') {
      // Rhythmic concentric rings from center
      const cx = W / 2, cy = H / 2;
      for (let i = 0; i < 8; i++) {
        const r = ((time * 60 + i * 80) % (Math.max(W, H))) ;
        const alpha = Math.max(0, 0.12 - r / (Math.max(W, H) * 1.2));
        ctx.strokeStyle = `rgba(100,200,120,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

    } else if (mode === 'lines') {
      // Diagonal lines moving left
      ctx.strokeStyle = 'rgba(180,120,220,0.05)';
      ctx.lineWidth = 1;
      const offset = (time * 30) % 80;
      for (let x = -H + offset; x < W + H; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + H, H);
        ctx.stroke();
      }
    }

    // Shared particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      const pulse = p.opacity * (0.7 + 0.3 * Math.sin(time * 2 + p.phase));
      ctx.fillStyle = `rgba(255,255,255,${pulse})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animFrame = requestAnimationFrame(drawCanvas);
  }

  // ── LIFECYCLE ─────────────────────────────────────────────────────
  onMount(() => {
    ctx = canvas.getContext('2d');
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticles();
    drawCanvas();

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKey);
    };
  });

  onDestroy(() => {
    if (animFrame) cancelAnimationFrame(animFrame);
  });

  // ── DERIVED ───────────────────────────────────────────────────────
  $: current = sections[active];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
</svelte:head>

<!-- ── CANVAS BACKGROUND ─────────────────────────────────────────── -->
<canvas bind:this={canvas} class="bg-canvas"></canvas>

<!-- ── BACKGROUND COLOR LAYER ────────────────────────────────────── -->
<div
  class="bg-color"
  style="background: {current.color};"
></div>

<!-- ── WIPE TRANSITION ───────────────────────────────────────────── -->
{#if showWipe}
  <div
    class="wipe"
    style="
      background: {sections[cornerIndex[wipeFrom]].color};
      clip-path: circle({$wipeProgress * 200}% at {wipeOrigin[wipeFrom]});
    "
  ></div>
{/if}

<!-- ── GRAIN OVERLAY ─────────────────────────────────────────────── -->
<div class="grain"></div>

<!-- ── CORNER NAVIGATION ─────────────────────────────────────────── -->
{#each sections as section, i}
  {@const pos = cornerPos[section.corner]}
  <button
    class="corner-btn"
    class:active={active === i}
    class:hovered={hoveredCorner === section.corner}
    style="
      {pos.top    ? `top:${pos.top};`    : ''}
      {pos.bottom ? `bottom:${pos.bottom};` : ''}
      {pos.left   ? `left:${pos.left};`  : ''}
      {pos.right  ? `right:${pos.right};` : ''}
    "
    on:click={() => navigate(i)}
    on:mouseenter={() => hoveredCorner = section.corner}
    on:mouseleave={() => hoveredCorner = null}
    aria-label={section.label}
  >
    <div class="corner-square"></div>
    <span class="corner-label">{section.label}</span>
  </button>
{/each}

<!-- ── SCROLL AXIS INDICATOR ─────────────────────────────────────── -->
<div class="axis-indicator">
  <span class="axis-mono">{current.scrollAxis === 'x' ? (current.scrollDir > 0 ? '→' : '←') : (current.scrollDir > 0 ? '↓' : '↑')}</span>
</div>

<!-- ── SECTION PANELS ─────────────────────────────────────────────── -->
{#each sections as section, i}
  <div
    class="panel"
    class:panel-active={active === i}
    style="overflow-{section.scrollAxis === 'x' ? 'x' : 'y'}: auto;"
  >
    <!-- STUDIO -->
    {#if section.id === 'studio'}
      <div class="panel-inner horizontal">
        <div class="panel-block intro-block">
          <p class="section-eyebrow mono">01 — Studio</p>
          <h2 class="display">Where the<br><em>work</em> begins.</h2>
          <p class="body-text">
            A professional audio, video, and broadcast infrastructure built from years of working on stages and in studios where the standards are unforgiving. This is not a project space. It is a production environment.
          </p>
        </div>
        <div class="panel-block spec-block">
          <div class="spec-grid">
            {#each [
              { cat: 'Audio', items: ['Ableton Live + ClyphX', 'Algorithmic loop system', 'Multi-source mixing', 'DiGiCo-grade signal flow'] },
              { cat: 'Video', items: ['Multi-camera production', 'Broadcast-quality output', 'Live switching', 'Post-production suite'] },
              { cat: 'Broadcast', items: ['Full livestream rig', 'Real-time format', 'Multi-platform output', 'Permanent archive'] },
              { cat: 'Digital', items: ['SQRZ Pages + domain', 'Pixel infrastructure', 'Booking pipeline', 'Audience data'] },
            ] as spec}
              <div class="spec-card">
                <div class="spec-cat mono">{spec.cat}</div>
                <ul>
                  {#each spec.items as item}
                    <li>{item}</li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        </div>
        <div class="panel-block image-block">
          <div class="img-placeholder tall">
            <span class="mono img-label">Main Room · SQRZ Studio</span>
          </div>
          <div class="img-placeholder short">
            <span class="mono img-label">Control Room</span>
          </div>
        </div>
      </div>

    <!-- HOUSE -->
    {:else if section.id === 'house'}
      <div class="panel-inner vertical">
        <div class="panel-block intro-block">
          <p class="section-eyebrow mono">02 — House</p>
          <h2 class="display">Villa<br><em>Hasalaha.</em></h2>
          <p class="body-text">
            Over two hundred years ago, a farm was built in the Pfalz. Today it is the operational home of SQRZ — a creative residency where artists come to work, live, and make things that last.
          </p>
        </div>
        <div class="panel-block">
          <p class="body-text">
            This is not a city studio. It is a deliberate counterpoint to the urban club circuit — space, silence, and time. Cast members are invited to stay. The house is large. The work happens over days, not hours.
          </p>
          <p class="body-text" style="margin-top: 20px;">
            And directly next door: <strong>Plopsa Holiday Park</strong> — a global entertainment venue that stages major live productions year-round. The infrastructure of scale is already in the neighbourhood.
          </p>
        </div>
        <div class="panel-block">
          <div class="img-placeholder wide" style="height: 300px;">
            <span class="mono img-label">Villa Hasalaha · Haßloch · Pfalz</span>
          </div>
        </div>
        <div class="detail-list">
          {#each [
            ['Location', 'Haßloch, Rheinland-Pfalz'],
            ['Format', 'Artist Residency · 2–5 days'],
            ['Accommodation', 'On-site, included'],
            ['Neighbour', 'Plopsa Holiday Park'],
            ['History', '200+ years, same family'],
          ] as [label, value]}
            <div class="detail-row">
              <span class="mono detail-label">{label}</span>
              <span class="detail-value">{value}</span>
            </div>
          {/each}
        </div>
      </div>

    <!-- WILL -->
    {:else if section.id === 'will'}
      <div class="panel-inner vertical-reverse">
        <div class="panel-block intro-block" style="margin-top: auto;">
          <p class="section-eyebrow mono">03 — The Producer</p>
          <h2 class="display">Will<br><em>Villa.</em></h2>
          <p class="mono producer-sub">Technical Conductor · Producer · Founder</p>
        </div>
        <div class="panel-block">
          <p class="body-text">
            Born in Medellín, raised in the Pfalz. Over twenty years operating at the intersection of music, engineering, and live production — across forty countries, on stages and in studios where the standards are unforgiving.
          </p>
          <p class="body-text" style="margin-top: 16px;">
            His 2016 single <em>Curura</em>, featuring Latin Grammy Lifetime Achievement recipient <strong>Toto La Momposina</strong> and produced by <strong>Ken Lewis</strong> (Alicia Keys, BTS, Taylor Swift), was broadcast on KEXP, BBC, and Funkhaus Europa. SQRZ Cast is the infrastructure that should have existed then.
          </p>
        </div>
        <div class="career-list">
          {#each [
            ['2016–17', 'Curura feat. Toto La Momposina — KEXP · BBC · Funkhaus Europa'],
            ['Ongoing', 'DiGiCo Console Programmer · AIDA Cruises · 40+ countries'],
            ['Prior',   'FOH Engineer · Toto La Momposina · European Tours'],
            ['Prior',   'System Engineer · Ken Lewis Studio · New York'],
            ['2023',    'Founded SQRZ GmbH · Haßloch'],
          ] as [year, desc]}
            <div class="career-row">
              <span class="mono career-year">{year}</span>
              <span class="career-desc">{desc}</span>
            </div>
          {/each}
        </div>
        <div class="panel-block">
          <div class="img-placeholder" style="height: 280px;">
            <span class="mono img-label">Will Villa · Haßloch · 2025</span>
          </div>
        </div>
      </div>

    <!-- LABEL -->
    {:else if section.id === 'label'}
      <div class="panel-inner horizontal-reverse">
        <div class="panel-block intro-block">
          <p class="section-eyebrow mono">04 — The Collaboration</p>
          <h2 class="display">Not a label.<br><em>Better.</em></h2>
          <p class="body-text">
            A traditional label brings money and distribution. What it has never been able to bring is permanent digital infrastructure — the kind that builds audience, captures data, and compounds over time.
          </p>
        </div>
        <div class="panel-block">
          <div class="three-party">
            {#each [
              { who: 'The Artist', brings: 'Talent & presence. You bring the craft — the voice, the instrument, the instinct. The rest gets built.' },
              { who: 'Will Villa', brings: 'Production & direction. Twenty years of international work brought to bear on your specific project.' },
              { who: 'SQRZ', brings: 'Infrastructure & momentum. Pages, pixels, booking pipeline, audience data. Built from day one.' },
            ] as party}
              <div class="party-card">
                <div class="mono party-who">{party.who}</div>
                <p class="party-brings">{party.brings}</p>
              </div>
            {/each}
          </div>
        </div>
        <div class="panel-block closing-block">
          <h3 class="display closing-title">If you're reading<br>this, you already<br>know <em>why.</em></h3>
          <div class="closing-line"></div>
          <p class="body-text closing-note">
            SQRZ Cast is not open for applications. Collaborations begin when there is genuine creative alignment. That is a conversation, not a process.
          </p>
          <a href="/cdn-cgi/l/email-protection#abc8cad8dfebd8dad9d185c8c4c6" class="contact-email mono"><span class="__cf_email__" data-cfemail="4c2f2d3f380c3f3d3e36622f2321">[email&#160;protected]</span></a>
          <p class="mono contact-note">No forms. No pitches. Just a conversation.</p>
        </div>
      </div>
    {/if}
  </div>
{/each}

<style>
  /* ── RESET & BASE ───────────────────────────────────────────────── */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html, body) {
    width: 100%; height: 100%;
    overflow: hidden;
    background: #0a0a0a;
  }

  /* ── VARIABLES ──────────────────────────────────────────────────── */
  :global(:root) {
    --accent:       #F5A623;
    --accent-dim:   rgba(245,166,35,0.3);
    --accent-faint: rgba(245,166,35,0.08);
    --bright: rgba(255,255,255,0.92);
    --mid: rgba(255,255,255,0.55);
    --muted: rgba(255,255,255,0.28);
    --border: rgba(245,166,35,0.2);
    --border-subtle: rgba(255,255,255,0.07);
    --radius-card: 8px;
  }

  /* ── CANVAS ─────────────────────────────────────────────────────── */
  .bg-canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  /* ── BG COLOR ───────────────────────────────────────────────────── */
  .bg-color {
    position: fixed;
    inset: 0;
    z-index: 1;
    transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  /* ── WIPE ───────────────────────────────────────────────────────── */
  .wipe {
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    transition: none;
  }

  /* ── GRAIN ──────────────────────────────────────────────────────── */
  .grain {
    position: fixed;
    inset: 0;
    z-index: 90;
    pointer-events: none;
    opacity: 0.35;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  }

  /* ── WORDMARK ───────────────────────────────────────────────────── */
  .wordmark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 80;
    text-align: center;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .wordmark-sqrz {
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem;
    font-weight: 500;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .wordmark-cast {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--accent);
    letter-spacing: 0.2em;
  }

  /* ── AXIS INDICATOR ─────────────────────────────────────────────── */
  .axis-indicator {
    position: fixed;
    bottom: 50%;
    right: 24px;
    transform: translateY(50%);
    z-index: 80;
    pointer-events: none;
  }

  .axis-mono {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--muted);
    opacity: 0.5;
  }

  /* ── CORNER BUTTONS ─────────────────────────────────────────────── */
  .corner-btn {
    position: fixed;
    z-index: 100;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: none;
  }

  /* Corner positioning handled by style attribute */

  /* Flip label direction per corner */
  .corner-btn:nth-child(2),
  .corner-btn:nth-child(4) {
    align-items: flex-end;
  }

  .corner-square {
    width: 14px;
    height: 14px;
    border: 1.5px solid var(--muted);
    transition: border-color 0.3s, background 0.3s, transform 0.3s;
  }

  .corner-btn.active .corner-square {
    background: var(--accent);
    border-color: var(--accent);
    transform: rotate(45deg) scale(1.1);
  }

  .corner-btn.hovered:not(.active) .corner-square {
    border-color: rgba(255,255,255,0.5);
    transform: rotate(45deg);
  }

  .corner-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    color: var(--muted);
    text-transform: uppercase;
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.2s, transform 0.2s, color 0.2s;
  }

  .corner-btn.active .corner-label,
  .corner-btn.hovered .corner-label {
    opacity: 1;
    transform: scale(1);
    color: var(--accent);
  }

  /* ── PANELS ─────────────────────────────────────────────────────── */
  .panel {
    position: fixed;
    inset: 0;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
    scrollbar-width: none;
  }

  .panel::-webkit-scrollbar { display: none; }

  .panel.panel-active {
    opacity: 1;
    pointer-events: all;
  }

  /* ── PANEL INNER LAYOUTS ────────────────────────────────────────── */
  .panel-inner {
    padding: 80px 100px;
    min-height: 100%;
    display: flex;
    gap: 80px;
  }

  /* Studio — horizontal scroll right */
  .horizontal {
    flex-direction: row;
    min-width: max-content;
    align-items: flex-start;
    padding-top: 100px;
  }

  /* House — vertical scroll down */
  .vertical {
    flex-direction: column;
    min-height: max-content;
    max-width: 800px;
    margin: 0 auto;
    padding-top: 120px;
    padding-bottom: 120px;
  }

  /* Will — vertical scroll up: normal layout, starts scrolled to bottom */
  .vertical-reverse {
    flex-direction: column;
    min-height: max-content;
    max-width: 800px;
    margin: 0 auto;
    padding-top: 120px;
    padding-bottom: 120px;
  }

  /* Label — horizontal scroll left: normal layout, starts scrolled to right */
  .horizontal-reverse {
    flex-direction: row;
    min-width: max-content;
    align-items: flex-start;
    padding-top: 100px;
  }

  /* ── PANEL BLOCKS ───────────────────────────────────────────────── */
  .panel-block {
    flex-shrink: 0;
    width: 400px;
  }

  .intro-block {
    width: 380px;
  }

  .spec-block {
    width: 600px;
  }

  .image-block {
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .closing-block {
    width: 420px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* ── TYPOGRAPHY ─────────────────────────────────────────────────── */
  .display {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 6vw, 80px);
    line-height: 0.95;
    color: var(--bright);
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }

  .display em {
    font-style: normal;
    color: var(--accent);
  }

  .mono {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .body-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.85;
    margin-top: 20px;
  }

  .body-text strong {
    color: var(--bright);
    font-weight: 400;
  }

  .section-eyebrow {
    color: var(--accent);
    display: block;
    margin-bottom: 24px;
  }

  /* ── SPEC GRID ──────────────────────────────────────────────────── */
  .spec-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }

  .spec-card {
    background: rgba(255,255,255,0.03);
    padding: 28px 24px;
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    transition: background 0.3s;
  }

  .spec-card:hover { background: rgba(255,255,255,0.05); }

  .spec-cat {
    color: var(--accent);
    display: block;
    margin-bottom: 16px;
  }

  .spec-card ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .spec-card li {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: var(--mid);
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .spec-card li:last-child { border-bottom: none; }

  /* ── IMAGE PLACEHOLDERS ─────────────────────────────────────────── */
  .img-placeholder {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    position: relative;
    overflow: hidden;
    flex: 1;
  }

  .img-placeholder.tall { flex: 2; }
  .img-placeholder.short { flex: 1; }
  .img-placeholder.wide { width: 100%; }

  .img-label {
    position: absolute;
    bottom: 16px;
    left: 16px;
    color: var(--muted);
    font-size: 0.55rem;
  }

  /* ── DETAIL LIST ────────────────────────────────────────────────── */
  .detail-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-top: 40px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    transition: background 0.3s;
  }

  .detail-row:hover { background: rgba(255,255,255,0.05); }

  .detail-label { color: var(--muted); }

  .detail-value {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: var(--mid);
  }

  /* ── CAREER LIST ────────────────────────────────────────────────── */
  .career-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-top: 32px;
    margin-bottom: 40px;
  }

  .career-row {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 20px;
    padding: 14px 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    align-items: start;
    transition: background 0.3s;
  }

  .career-row:hover { background: rgba(255,255,255,0.05); }

  .career-year {
    color: var(--accent);
    font-size: 0.55rem;
    padding-top: 2px;
  }

  .career-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: var(--mid);
    line-height: 1.5;
  }

  .producer-sub {
    color: var(--accent);
    display: block;
    margin-top: 12px;
    margin-bottom: 32px;
  }

  /* ── THREE PARTY ────────────────────────────────────────────────── */
  .three-party {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .party-card {
    padding: 28px 24px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    transition: background 0.3s;
    position: relative;
  }

  .party-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 32px; height: 1.5px;
    background: var(--accent);
  }

  .party-card:hover { background: rgba(255,255,255,0.05); }

  .party-who {
    color: var(--accent);
    display: block;
    margin-bottom: 12px;
  }

  .party-brings {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: var(--mid);
    line-height: 1.7;
  }

  /* ── CLOSING ────────────────────────────────────────────────────── */
  .closing-title {
    font-size: clamp(32px, 4vw, 52px);
  }

  .closing-line {
    width: 48px;
    height: 1px;
    background: var(--accent-dim);
  }

  .closing-note {
    margin-top: 0;
  }

  .contact-email {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid var(--accent-dim);
    padding-bottom: 3px;
    transition: color 0.3s, border-color 0.3s;
    font-size: 0.75rem;
  }

  .contact-email:hover {
    color: var(--bright);
    border-color: var(--bright);
  }

  .contact-note {
    color: var(--muted);
    font-style: italic;
    font-size: 0.6rem;
    margin-top: -8px;
  }
</style>