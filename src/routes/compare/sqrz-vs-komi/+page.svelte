<script>
  import CompareLayout from '$lib/components/CompareLayout.svelte';
</script>

<svelte:head>
  <title>SQRZ vs Komi — The Booking Alternative for Creative Professionals</title>
  <meta name="description" content="Komi gives you a page. SQRZ gives you a system to get hired, manage budgets, and get paid." />
</svelte:head>

{#snippet coreDifference()}
  <div class="cmp-two-col">
    <div class="cmp-col">
      <span class="cmp-col-label">Komi</span>
      <span class="cmp-col-title">Visibility</span>
      <ul class="cmp-col-items">
        <li>Share links</li>
        <li>Build an audience</li>
      </ul>
    </div>
    <div class="cmp-col cmp-col-sqrz">
      <span class="cmp-col-label">SQRZ</span>
      <span class="cmp-col-title">Work</span>
      <ul class="cmp-col-items">
        <li>Get in front of decision-makers</li>
        <li>Secure bookings</li>
        <li>Manage real production budgets</li>
        <li>Get paid without chasing</li>
      </ul>
    </div>
  </div>
  <p class="cmp-callout">One is a profile. The other is infrastructure + distribution.</p>
{/snippet}

{#snippet comparisonTable()}
  <div class="cmp-table-wrap">
    <table class="cmp-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th class="cmp-th-sqrz">SQRZ</th>
          <th>Komi</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="cmp-td-feature">Built for talent (real-world work)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Booking system</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Booking Wallet (budget + payouts)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Discovery via industry partners</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Custom domains</td><td class="cmp-td-sqrz">✅ paid</td><td class="cmp-td-competitor">⚠️</td></tr>
        <tr><td class="cmp-td-feature">Own pixels &amp; tracking</td><td class="cmp-td-sqrz">✅ paid</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Managed ads (Boost)</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Retargeting &amp; funnels</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Private campaign links</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">❌</td></tr>
        <tr><td class="cmp-td-feature">Link-in-bio functionality</td><td class="cmp-td-sqrz">✅</td><td class="cmp-td-competitor">✅</td></tr>
      </tbody>
    </table>
  </div>
  <p class="cmp-callout">Komi stops at presentation. SQRZ drives outcomes.</p>
{/snippet}

{#snippet deepDive()}
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">The problem with Komi</h3>
    <p class="cmp-dive-p">Komi centralises your tracking through their infrastructure — GTM, Segment, TikTok Pixel. You don't own your data. You can't build real funnels. Every signal your audience generates becomes platform data, not yours.</p>
    <p class="cmp-dive-p">That's a problem for anyone who wants to compound their marketing over time.</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">You can own your data</h3>
    <p class="cmp-dive-p">On SQRZ, your tracking infrastructure is yours. Free users get shared infrastructure. Paid users get their own pixels. Boost users get clean, isolated tracking clusters.</p>
    <p class="cmp-dive-p">Every visitor, every form open, every booking request — it all flows into your systems, not ours.</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">You don't just get paid — you operate</h3>
    <p class="cmp-dive-p">SQRZ's Booking Wallet handles the full financial lifecycle: deposits before work starts, budget allocation across team members and expenses, and payment release after confirmed delivery.</p>
    <p class="cmp-quote">"Not a payment button. A financial workflow."</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">You don't just wait — you get pushed</h3>
    <p class="cmp-dive-p">Boost puts your profile in front of the people who actually hire talent. Add a budget. We run the campaigns. We target decision-makers in your vertical — agencies, production companies, event organisers. We retarget high-intent visitors who already looked at your profile.</p>
    <p class="cmp-quote">"Not traffic. Deal flow."</p>
  </div>
  <div class="cmp-dive-section">
    <h3 class="cmp-dive-h3">You don't just share links — you control funnels</h3>
    <p class="cmp-dive-p">Private links let you create pages like <em>yourname-asia-tour</em> or <em>project-x-booking</em> — custom landing pages with pre-filled forms, specific services, and controlled access. Built for outreach and targeted campaigns. Not for general browsing.</p>
  </div>
{/snippet}

{#snippet cta()}
  <p class="cmp-cta-text">Komi helps you look like a creator. SQRZ helps you operate like a professional.</p>
  <a href="https://dashboard.sqrz.com/join" class="cmp-cta-btn">Create your SQRZ profile and start getting booked →</a>
{/snippet}

<CompareLayout
  competitor="Komi"
  headline="Stop collecting clicks. Start getting booked."
  subheadline="Komi gives you a page. SQRZ gives you a system to get hired, manage budgets, and get paid."
  {coreDifference}
  {comparisonTable}
  {deepDive}
  {cta}
/>
