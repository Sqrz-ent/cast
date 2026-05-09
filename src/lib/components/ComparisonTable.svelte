<script>
  const sqrzRows = [
    {
      title: 'Integrated Growth System',
      body: 'Visibility, demand, booking, and revenue connected in one environment.',
    },
    {
      title: 'Operational Intelligence Layer',
      body: 'Works alongside your team — without rebuilding your stack.',
    },
    {
      title: 'Compounding Demand',
      body: 'Every cycle builds reusable audience and insight.',
    },
    {
      title: 'Embedded Revenue Flow',
      body: 'Connected directly to your profile, pipeline, and financial flow.',
    },
  ];

  const agencyRows = [
    {
      title: 'Campaign-Based Engagement',
      body: 'Focus on traffic, content, and short-term goals with vanity metrics.',
    },
    {
      title: 'Tool-Based Execution',
      body: 'Website, ads, CRM, and payments often live separately.',
    },
    {
      title: 'Launch-Driven Momentum',
      body: 'Growth depends on each new launch.',
    },
    {
      title: 'External Support Layer',
      body: 'Operate around your business — not inside it.',
    },
  ];
</script>

<section class="comparison-section">
  <div class="container">
    <p class="section-tag">SQRZ Grow vs Marketing Agencies</p>
    <h2 class="section-headline centered">A different kind<br>of <em>growth infrastructure</em></h2>
    <div class="comparison-grid">

      <!-- SQRZ Grow column -->
      <div class="col sqrz-col">
        <div class="col-header">
          <span class="col-label sqrz-label">SQRZ GROW</span>
        </div>
        <ul class="row-list">
          {#each sqrzRows as row}
            <li class="row-item">
              <span class="icon sqrz-icon">✓</span>
              <div class="row-content">
                <strong class="row-title">{row.title}</strong>
                <p class="row-body">{row.body}</p>
              </div>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Agency column -->
      <div class="col agency-col">
        <div class="col-header">
          <span class="col-label agency-label">MARKETING AGENCIES</span>
        </div>
        <ul class="row-list">
          {#each sqrzRows as _, i}
            <li class="row-item">
              <span class="icon agency-icon">✗</span>
              <div class="row-content">
                <strong class="row-title agency-title">{agencyRows[i].title}</strong>
                <p class="row-body agency-body">{agencyRows[i].body}</p>
              </div>
            </li>
          {/each}
        </ul>
      </div>

    </div>
  </div>
</section>

<style>
  .comparison-section {
    background: #f5f5f0;
    padding: 100px 0;
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
    color: #111111;
    text-transform: uppercase;
    margin: 8px 0 56px;
  }
  .section-headline.centered { text-align: center; }
  .section-headline em { font-style: normal; color: #F5A623; }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }

  /* ── Columns ── */
  .col {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.08);
  }

  .sqrz-col {
    border-color: rgba(245,166,35,0.35);
    border-left: 3px solid #F5A623;
  }

  .col-header {
    padding: 20px 28px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  .sqrz-col .col-header { background: rgba(245,166,35,0.08); }
  .agency-col .col-header { background: rgba(0,0,0,0.03); }

  .col-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .sqrz-label { color: #F5A623; }
  .agency-label { color: rgba(0,0,0,0.3); }

  /* ── Rows ── */
  .row-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .row-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 22px 28px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: background 0.2s;
  }
  .row-item:last-child { border-bottom: none; }
  .sqrz-col .row-item:hover { background: rgba(245,166,35,0.06); }
  .agency-col .row-item:hover { background: rgba(0,0,0,0.03); }

  .icon {
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 2px;
    font-weight: 700;
  }
  .sqrz-icon { color: #F5A623; }
  .agency-icon { color: rgba(0,0,0,0.2); }

  .row-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .row-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: #111111;
  }
  .row-title.agency-title { color: rgba(0,0,0,0.45); }

  .row-body {
    font-size: 0.82rem;
    font-weight: 300;
    color: rgba(0,0,0,0.5);
    line-height: 1.65;
  }
  .row-body.agency-body { color: rgba(0,0,0,0.32); }

  @media (max-width: 720px) {
    .comparison-grid { grid-template-columns: 1fr; }
    .container { padding: 0 24px; }
  }
</style>
