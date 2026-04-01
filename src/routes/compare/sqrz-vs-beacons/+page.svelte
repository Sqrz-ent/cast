<script>
  import CompareLayout from '$lib/components/CompareLayout.svelte';

  {#snippet coreDifference()}
    <div class="cmp-two-col">
      <div class="cmp-col">
        <span class="cmp-col-label">Beacons</span>
        <span class="cmp-col-title">Creator Monetization</span>
        <ul class="cmp-col-items">
          <li>Sell digital products</li>
          <li>Monetize followers</li>
          <li>Build income from content</li>
        </ul>
      </div>
      <div class="cmp-col cmp-col-sqrz">
        <span class="cmp-col-label">SQRZ</span>
        <span class="cmp-col-title">Professional Infrastructure</span>
        <ul class="cmp-col-items">
          <li>Get booked by real clients</li>
          <li>Manage projects and budgets</li>
          <li>Get paid for actual work</li>
          <li>Build long-term professional relationships</li>
        </ul>
      </div>
    </div>
    <p class="cmp-callout">One sells content. The other enables work.</p>
  {/snippet}

  {#snippet comparisonTable()}
    <div class="cmp-table-wrap">
      <table class="cmp-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th class="cmp-th-sqrz">SQRZ</th>
            <th>Beacons</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="cmp-td-feature">Monetization model</td><td class="cmp-td-sqrz">Bookings &amp; projects</td><td class="cmp-td-competitor">Digital products &amp; content</td></tr>
          <tr><td class="cmp-td-feature">Built for real-world work</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Booking system</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Structured payments (Booking Wallet)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Budget allocation (teams, travel, etc.)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Discovery via industry partners</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Own your data &amp; audience</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">⚠️ limited</td></tr>
          <tr><td class="cmp-td-feature">Custom tracking &amp; pixels</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">⚠️ limited</td></tr>
          <tr><td class="cmp-td-feature">Managed ads (Boost)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Retargeting &amp; funnels</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Private campaign links</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Link-in-bio functionality</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">✅</td></tr>
        </tbody>
      </table>
    </div>
    <p class="cmp-callout">Beacons helps you monetize attention. SQRZ helps you monetize your talent.</p>
  {/snippet}

  {#snippet deepDive()}
    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">The promise of creator monetization</h3>
      <p class="cmp-dive-p">Beacons is built for creators who want to sell digital products, memberships, and tips. If your business is content, that model makes sense. It works well when your income comes from what you publish.</p>
      <p class="cmp-dive-p">But for talent whose work happens in the physical world — live performance, productions, teams, logistics — you can't package that as a digital download. You can't manage production budgets through a Beacons product page. You can't structure a project involving multiple collaborators from a link-in-bio.</p>
      <p class="cmp-quote">"You're forced to use multiple tools."</p>
    </div>

    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">Built for real work — not digital products</h3>
      <p class="cmp-dive-p">On SQRZ, clients don't buy access to your content. They book you for a project. There's a defined scope, a real budget, and a structured process from start to finish.</p>
      <p class="cmp-quote">"Defined scope. Real outcomes."</p>
    </div>

    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">Booking Wallet = production-ready payments</h3>
      <p class="cmp-dive-p">SQRZ handles deposits upfront, budget allocation across team members and production costs, travel and logistics, and payment release after confirmed delivery. Built for how real projects work.</p>
    </div>

    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">Discovery beyond your audience</h3>
      <p class="cmp-dive-p">Beacons depends on your existing followers and reach. SQRZ connects you directly to agencies, production companies, cruise operators, and event organisers — the people who actually hire talent. You don't need a massive audience to get booked.</p>
    </div>

    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">Boost = growth without content dependency</h3>
      <p class="cmp-dive-p">Instead of constantly posting to maintain visibility: add a budget, we run campaigns, we target decision-makers in your vertical, we retarget visitors who already showed interest.</p>
      <p class="cmp-quote">"Not content-driven growth. Opportunity-driven growth."</p>
      <p class="cmp-dive-p">Beacons monetizes what you publish. SQRZ builds positioning — repeat clients, real opportunities, long-term leverage that compounds over time.</p>
      <p class="cmp-quote">"This is long-term leverage."</p>
    </div>
  {/snippet}

  {#snippet cta()}
    <p class="cmp-cta-text">Beacons helps you sell to your audience. SQRZ helps you get booked by the right people.</p>
    <a href="https://dashboard.sqrz.com/join" class="cmp-cta-btn">Create your SQRZ profile and start getting booked →</a>
  {/snippet}
</script>

<svelte:head>
  <title>SQRZ vs Beacons — Get Booked, Not Just Followed</title>
  <meta name="description" content="Beacons helps you monetize your audience. SQRZ helps you turn your talent into real work." />
</svelte:head>

<CompareLayout
  competitor="Beacons"
  headline="Stop selling content. Start getting booked."
  subheadline="Beacons helps you monetize your audience. SQRZ helps you turn your talent into real work."
  {coreDifference}
  {comparisonTable}
  {deepDive}
  {cta}
/>
