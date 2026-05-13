<script>
  import { slide } from 'svelte/transition';

  const allFaqs = [
    {
      q: 'Is SQRZ Grow software or a service?',
      a: 'Grow is a managed service workflow. SQRZ is the conversion surface, but the value is the manual campaign direction, setup, review, and refinement around it.',
    },
    {
      q: 'Who is Grow built for?',
      a: 'Professionals who already have a clear offer, a public SQRZ profile, and enough budget to test paid demand with intention.',
    },
    {
      q: 'What do you manage?',
      a: 'We help shape the campaign angle, audience structure, traffic path, profile conversion notes, performance review, and next-cycle decisions.',
    },
    {
      q: 'What budget do I need?',
      a: 'Grow starts at $1,000 in ad budget. The point is to give campaigns enough room to create useful signals, not just isolated traffic spikes.',
    },
    {
      q: 'How does a campaign cycle work?',
      a: 'Each cycle moves through diagnosis, planning, activation, and refinement. The next cycle is based on what the previous one revealed.',
    },
    {
      q: 'Do you guarantee bookings?',
      a: 'No. We do not promise outcomes we cannot control. We build the conditions for better demand: clearer offers, better traffic, and stronger conversion paths.',
    },
    {
      q: 'Do I need to use SQRZ for bookings?',
      a: 'Yes. Grow is designed around your SQRZ profile because that gives campaigns a focused place to convert visitors into qualified booking intent.',
    },
    {
      q: 'What happens after the first cycle?',
      a: 'We review the signals, decide what is worth improving, and either refine the campaign, adjust the offer, or pause before spending more.',
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
    font-family: Impact, sans-serif;
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
