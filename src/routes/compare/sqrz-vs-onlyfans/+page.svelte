<script>
  import CompareLayout from '$lib/components/CompareLayout.svelte';

  {#snippet coreDifference()}
    <div class="cmp-two-col">
      <div class="cmp-col">
        <span class="cmp-col-label">OnlyFans</span>
        <span class="cmp-col-title">Audience Monetization</span>
        <ul class="cmp-col-items">
          <li>Earn from subscribers</li>
          <li>Monetize content</li>
          <li>Build recurring income from attention</li>
        </ul>
      </div>
      <div class="cmp-col cmp-col-sqrz">
        <span class="cmp-col-label">SQRZ</span>
        <span class="cmp-col-title">Professional Monetization</span>
        <ul class="cmp-col-items">
          <li>Get booked by real clients</li>
          <li>Work on productions and projects</li>
          <li>Manage budgets and payments</li>
          <li>Build a professional career</li>
        </ul>
      </div>
    </div>
    <p class="cmp-callout">One monetizes attention. The other monetizes talent.</p>
  {/snippet}

  {#snippet comparisonTable()}
    <div class="cmp-table-wrap">
      <table class="cmp-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th class="cmp-th-sqrz">SQRZ</th>
            <th>OnlyFans</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="cmp-td-feature">Monetization model</td><td class="cmp-td-sqrz">Bookings &amp; projects</td><td class="cmp-td-competitor">Subscriptions &amp; content</td></tr>
          <tr><td class="cmp-td-feature">Built for real-world work</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Booking system</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Structured payments (Booking Wallet)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Budget allocation (teams, travel, etc.)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Discovery via industry partners</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Own your audience &amp; data</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Custom tracking &amp; pixels</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Managed growth (Boost)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Private campaign funnels</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
          <tr><td class="cmp-td-feature">Recurring income model</td><td class="cmp-td-sqrz">❌</td><td class="cmp-td-competitor">✅</td></tr>
        </tbody>
      </table>
    </div>
    <p class="cmp-callout">OnlyFans pays you for attention. SQRZ pays you for your work.</p>
  {/snippet}

  {#snippet deepDive()}
    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">Two completely different paths</h3>
      <p class="cmp-dive-p">OnlyFans is built for content creators who monetize an audience. The model is subscriber-driven: people pay for access to your content. You earn when people watch, follow, or subscribe.</p>
      <p class="cmp-dive-p">That model has a ceiling. Income depends on constant content output. Growth depends on audience size. Your earnings are tied to attention — not to your professional value.</p>
      <p class="cmp-quote">"It scales with visibility — not with professional demand."</p>
    </div>

    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">You get booked — not subscribed to</h3>
      <p class="cmp-dive-p">On SQRZ, clients come with intent. They want to hire you for a specific project. There's a defined scope, a real budget, and a structured process from the very first message. This isn't content consumption. This is real work.</p>
    </div>

    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">Booking Wallet = professional payments</h3>
      <p class="cmp-dive-p">SQRZ's Booking Wallet handles deposits before work starts, budget allocation across team members and production costs, and payment release after confirmed delivery. Built for productions, not subscriptions.</p>
    </div>

    <div class="cmp-dive-section">
      <h3 class="cmp-dive-h3">Boost = growth beyond your audience</h3>
      <p class="cmp-dive-p">You don't need a massive audience to get work. You need to be in front of the right people. Add a budget, and we run campaigns targeting the decision-makers who hire talent — agencies, production companies, event organisers. We retarget visitors who already showed intent.</p>
      <p class="cmp-dive-p">OnlyFans monetizes attention in the moment. SQRZ builds long-term positioning — repeat clients, real opportunities, a career that compounds over time.</p>
      <p class="cmp-quote">"This compounds over time."</p>
    </div>
  {/snippet}

  {#snippet cta()}
    <p class="cmp-cta-text">OnlyFans helps you monetize an audience. SQRZ helps you build a professional career.</p>
    <a href="https://dashboard.sqrz.com/join" class="cmp-cta-btn">Create your SQRZ profile and start getting booked →</a>
  {/snippet}
</script>

<svelte:head>
  <title>SQRZ vs OnlyFans — Monetize Your Talent, Not Just Your Attention</title>
  <meta name="description" content="OnlyFans helps you earn from an audience. SQRZ helps you get paid for real-world work." />
</svelte:head>

<CompareLayout
  competitor="OnlyFans"
  headline="Stop monetizing attention. Start monetizing your talent."
  subheadline="OnlyFans helps you earn from an audience. SQRZ helps you get paid for real-world work."
  {coreDifference}
  {comparisonTable}
  {deepDive}
  {cta}
/>
