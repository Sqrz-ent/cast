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
    padding: 12px;
    box-sizing: border-box;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  }

  .phone-screen {
    position: relative;
    width: 100%;
    height: 100%;
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
