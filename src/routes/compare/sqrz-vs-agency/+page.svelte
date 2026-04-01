<script>
  import CompareLayout from '$lib/components/CompareLayout.svelte';
</script>

<svelte:head>
  <title>SQRZ vs Hiring an Agency — Own Your Business, Stop Paying for Dependency</title>
  <meta name="description" content="Agencies build things for you. SQRZ lets you run things yourself — without losing power." />
</svelte:head>

{#snippet coreDifference()}
  <div class="cmp-two-col">
    <div class="cmp-col">
      <span class="cmp-col-label">Agency</span>
      <span class="cmp-col-title">Dependency</span>
      <ul class="cmp-col-items">
        <li>Build a website</li>
        <li>Set up ads</li>
        <li>Design your presence</li>
      </ul>
    </div>
    <div class="cmp-col cmp-col-sqrz">
      <span class="cmp-col-label">SQRZ</span>
      <span class="cmp-col-title">Control</span>
      <ul class="cmp-col-items">
        <li>Get booked directly</li>
        <li>Manage budgets and payments</li>
        <li>Run campaigns without intermediaries</li>
        <li>Own your data and infrastructure</li>
      </ul>
    </div>
  </div>
  <p class="cmp-callout">With an agency, you rent expertise. With SQRZ, you own the system.</p>
{/snippet}

{#snippet comparisonTable()}
  <div class="cmp-table-wrap">
    <table class="cmp-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th class="cmp-th-sqrz">SQRZ</th>
          <th>Agency</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="cmp-td-feature">Built for getting booked</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Booking system</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌ custom build</td></tr>
        <tr><td class="cmp-td-feature">Payments &amp; budget management</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Discovery via industry partners</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Managed ads (Boost)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">✅</td></tr>
        <tr><td class="cmp-td-feature">Retargeting &amp; funnels</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">✅</td></tr>
        <tr><td class="cmp-td-feature">Own your data &amp; pixels</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">⚠️ depends</td></tr>
        <tr><td class="cmp-td-feature">Instant updates (no dev needed)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Cost structure</td><td class="cmp-td-sqrz">Predictable</td><td class="cmp-td-competitor">High / ongoing</td></tr>
        <tr><td class="cmp-td-feature">Time to launch</td><td class="cmp-td-sqrz">Minutes</td><td class="cmp-td-competitor">Weeks / Months</td></tr>
      </tbody>
    </table>
  </div>
  <p class="cmp-callout">Agencies build assets. SQRZ runs your business.</p>
{/snippet}

{#snippet deepDive()}
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">The hidden cost of agencies</h3>
    <p class="cmp-dive-p">Every update costs money. Every change takes time. Every improvement needs approval. You're locked into a delivery cycle that moves on their timeline, not yours.</p>
    <p class="cmp-quote">"You're not flexible. You're dependent."</p>
    <p class="cmp-dive-p">What you actually get from most agencies: a website (often WordPress), some tracking setup, and campaigns optimised for clicks. But no booking system. No structured payments. No integrated workflow that turns a visit into a confirmed project.</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">You control everything — instantly</h3>
    <p class="cmp-dive-p">Update your profile whenever you want. Launch a campaign without waiting for approval. Adjust your funnel in real time. Add a service, change your rates, create a private link for a specific client — all in minutes.</p>
    <p class="cmp-quote">"No emails. No invoices. No delays."</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">Booking Wallet = a built-in financial system</h3>
    <p class="cmp-dive-p">SQRZ handles deposits, budget allocation across team members and expenses, and payment release after confirmed delivery. No external tools. No manual coordination.</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">Boost = agency-level growth, without agency lock-in</h3>
    <p class="cmp-dive-p">Add a budget. We manage the campaigns. We target the decision-makers in your vertical — agencies, production companies, event organisers. We retarget visitors who already engaged with your profile.</p>
    <p class="cmp-quote">"Same outcome as an agency — without losing control of your infrastructure."</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">You own your data</h3>
    <p class="cmp-dive-p">Your pixels. Your audience data. Your tracking infrastructure. On SQRZ, every signal flows into your systems — not an agency's reporting dashboard that disappears when you stop paying.</p>
    <p class="cmp-dive-p">Agencies focus on design, branding, and traffic. SQRZ focuses on bookings, budgets, and execution. Built for real work — not just presentation.</p>
  </div>
{/snippet}

{#snippet cta()}
  <p class="cmp-cta-text">An agency makes you dependent. SQRZ makes you autonomous.</p>
  <a href="https://dashboard.sqrz.com/join" class="cmp-cta-btn">Create your SQRZ profile and start getting booked →</a>
{/snippet}

<CompareLayout
  competitor="Hiring an Agency"
  headline="Stop paying for updates. Start owning your business."
  subheadline="Agencies build things for you. SQRZ lets you run things yourself — without losing power. Most talent spend thousands on agencies… and still depend on them for every change."
  {coreDifference}
  {comparisonTable}
  {deepDive}
  {cta}
/>
