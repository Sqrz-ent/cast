<script lang="ts">
  // iPhone-shaped device frame for app screenshots on the marketing homepage
  // (the three explainer sections, 2026-08-14 "let the phone do the
  // explaining" pass). Pass `src` once a real screen recording/screenshot is
  // ready — it drops into the same screen area, no frame/layout changes
  // needed. Until then, `label` renders a plain placeholder so it's obvious
  // at a glance this isn't a final asset (rather than risk it reading as a
  // real, oddly-blank screenshot).
  let {
    src = null,
    alt = '',
    label = ''
  }: { src?: string | null; alt?: string; label?: string } = $props();
</script>

<div class="phone-frame">
  <div class="phone-screen">
    {#if src}
      <img {src} {alt} class="phone-screenshot" />
    {:else}
      <div class="phone-placeholder">
        <span class="phone-placeholder-label">{label}</span>
      </div>
    {/if}
    <div class="phone-island"></div>
  </div>
</div>

<style>
  .phone-frame {
    position: relative;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    aspect-ratio: 9 / 19.5;
    background: #0a0a0a;
    border-radius: 46px;
    box-sizing: border-box;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
    /* Defense in depth: even if a future sizing mismatch recurs (see
       .phone-screen below), content can't visually escape past the
       rounded bezel. */
    overflow: hidden;
  }

  .phone-screen {
    /* Confirmed via real Mac Safari's Web Inspector: a normal-flow child's
       height: 100% doesn't reliably resolve against a parent sized by
       aspect-ratio in Safari — .phone-frame's content box measured
       276×626, but .phone-screen's height: 100% computed to 662px, a 36px
       overflow that escaped the frame's rounded silhouette (only
       .phone-frame had no overflow: hidden of its own at the time).
       Chromium/Playwright-WebKit never hit this because Playwright's
       bundled WebKit doesn't reproduce it — real Safari-only.
       position: absolute + inset sidesteps that percentage-height
       resolution path entirely instead of working around its symptom.
       inset: 12px (not 0) — .phone-frame used to express this same 12px
       bezel via its own padding, which is now dead for an
       absolutely-positioned child (padding box, not content box, is an
       absolute child's containing block) and was removed; this is the
       one place that measurement now lives. */
    position: absolute;
    inset: 12px;
    border-radius: 34px;
    overflow: hidden;
    background: #111;
  }

  .phone-screenshot {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .phone-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
    background:
      radial-gradient(circle at 30% 20%, rgba(245, 166, 35, 0.18), transparent 55%),
      linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 100%);
  }

  .phone-placeholder-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-align: center;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
  }

  .phone-island {
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    width: 84px;
    height: 24px;
    background: #0a0a0a;
    border-radius: 14px;
  }

  @media (max-width: 900px) {
    .phone-frame { max-width: 240px; }
  }
</style>
