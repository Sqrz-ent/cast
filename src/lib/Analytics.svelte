<svelte:head>
  <!-- GA4 — statistics -->
  <script
    data-cookieconsent="statistics"
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-CK55029FEL"
    type="text/plain"
  ></script>
  <script data-cookieconsent="statistics" type="text/plain">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CK55029FEL');
  </script>

  <!-- Meta Pixel — marketing -->
  <script data-cookieconsent="marketing" type="text/plain">
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '210321700824962');
    fbq('track', 'PageView');
  </script>

  <!-- HubSpot — marketing -->
  <script
    data-cookieconsent="marketing"
    id="hs-script-loader"
    async
    defer
    src="//js.hs-scripts.com/8081234.js"
    type="text/plain"
  ></script>

  <!-- LinkedIn Insight Tag — marketing -->
  <script data-cookieconsent="marketing" type="text/plain">
    _linkedin_partner_id = "2800882";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    (function(l) {
      if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q=[]}
      var s = document.getElementsByTagName("script")[0];
      var b = document.createElement("script");
      b.type = "text/javascript"; b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b, s);
    })(window.lintrk);
  </script>
</svelte:head>
