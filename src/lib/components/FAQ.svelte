<script>
  import { slide } from 'svelte/transition';

  const allFaqs = [
    {
      q: 'Is SQRZ Grow a subscription?',
      a: 'No. SQRZ Grow is a time-limited growth program. Pro plans run 3–6 months. Starter plans can be cancelled monthly.',
    },
    {
      q: 'Who is SQRZ Grow for?',
      a: 'Independent professionals who already take their work seriously and want consistent, higher-quality opportunities.',
    },
    {
      q: 'What am I actually investing in?',
      a: 'A complete growth system: profile, tracking, campaigns, and booking infrastructure — not just ads.',
    },
    {
      q: 'What ad budget do you recommend?',
      a: 'Budgets depend on industry and offer value. For most professionals, we recommend $200–500/month in controlled growth cycles.',
    },
    {
      q: 'How long should campaigns run?',
      a: 'SQRZ Grow operates in waves — define, activate, measure, refine. The goal isn\'t short bursts of traffic or vanity metrics.',
    },
    {
      q: 'Do you guarantee bookings?',
      a: 'No. We don\'t promise outcomes we can\'t control — we build systems that increase the probability of real demand over time.',
    },
    {
      q: 'How does the booking wallet work?',
      a: 'Each booking runs through its own structured wallet, with deposits processed via Stripe and assigned to that project. Funds can be allocated and released according to agreed terms, including team payments.',
    },
    {
      q: 'Is my profile legally compliant in the EU?',
      a: 'Yes — SQRZ is built with European freelancers in mind. Every profile automatically includes a legal footer with your business details and a GDPR-compliant privacy page at [yourname].sqrz.com/privacy. If you add your own tracking pixels as a paid user, SQRZ will prompt you to complete your Impressum and automatically disclose the active tools in your privacy page. No lawyer needed.',
    },
  ];

  let { half = null } = $props();

  const faqs = $derived(
    half === 'first' ? allFaqs.slice(0, 4) :
    half === 'last'  ? allFaqs.slice(4) :
    allFaqs
  );

  let openIndex = $state(null);

  function toggle(i) {
    openIndex = openIndex === i ? null : i;
  }
</script>

<section class="faq-section">
  <div class="container">
    <p class="section-tag">FAQ</p>
    <h2 class="section-headline centered">Common<br><em>questions</em></h2>
    <div class="faq-list">
      {#each faqs as faq, i}
        <div class="faq-item" class:open={openIndex === i}>
          <button class="faq-question" onclick={() => toggle(i)} aria-expanded={openIndex === i}>
            <span class="q-text">{faq.q}</span>
            <span class="faq-arrow" class:rotated={openIndex === i}>›</span>
          </button>
          {#if openIndex === i}
            <div class="faq-answer" transition:slide={{ duration: 240 }}>
              <p>{faq.a}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .faq-section {
    background: #1a1a1a;
    padding: 100px 0 120px;
  }

  .container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .section-tag {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #F5A623;
    text-align: center;
    display: block;
    margin-bottom: 16px;
  }

  .section-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 5vw, 60px);
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: #ffffff;
    text-transform: uppercase;
    margin: 8px 0 56px;
  }
  .section-headline.centered { text-align: center; }
  .section-headline em { font-style: normal; color: #F5A623; }

  .faq-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .faq-list { grid-template-columns: 1fr; }
  }

  .faq-item {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    transition: border-color 0.2s;
  }
  .faq-item.open {
    border-color: rgba(245,166,35,0.3);
  }

  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 24px;
    background: rgba(255,255,255,0.03);
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
  }
  .faq-question:hover { background: rgba(255,255,255,0.06); }
  .faq-item.open .faq-question { background: rgba(245,166,35,0.06); }

  .q-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: #F5A623;
    line-height: 1.4;
  }

  .faq-arrow {
    font-size: 1.4rem;
    color: rgba(245,166,35,0.5);
    flex-shrink: 0;
    line-height: 1;
    transition: transform 0.25s ease, color 0.2s;
    display: inline-block;
    transform: rotate(90deg);
  }
  .faq-arrow.rotated {
    transform: rotate(270deg);
    color: #F5A623;
  }

  .faq-answer {
    padding: 0 24px 22px;
    background: rgba(245,166,35,0.04);
  }

  .faq-answer p {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.8;
    padding-top: 4px;
  }

  @media (max-width: 720px) {
    .container { padding: 0 24px; }
  }
</style>
