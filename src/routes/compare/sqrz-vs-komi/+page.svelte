<script>
  import CompareLayout from '$lib/components/CompareLayout.svelte';
</script>

<CompareLayout competitor="Komi" competitorUrl="https://komi.io">

  <section class="placeholder-section">
    <h2>Overview</h2>
    <p>
      Komi is a creator platform focused on fan monetization and community. SQRZ takes a
      different approach — it's built around professional bookings, portfolio presentation,
      and the tools creators need to get hired, not just followed.
    </p>
  </section>

  <section class="placeholder-section coming-soon">
    <span class="coming-label">Content coming soon</span>
    <p>Full comparison — features, pricing, and use cases — is being written.</p>
  </section>

</CompareLayout>

<style>
  .placeholder-section {
    margin-bottom: 48px;
  }

  .placeholder-section h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #ffffff;
    margin-bottom: 14px;
  }

  .placeholder-section p {
    font-size: 0.95rem;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    line-height: 1.8;
  }

  .coming-soon {
    border: 1px dashed rgba(245,166,35,0.25);
    border-radius: 12px;
    padding: 28px 32px;
    background: rgba(245,166,35,0.03);
  }

  .coming-label {
    display: inline-block;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 10px;
  }
</style>
