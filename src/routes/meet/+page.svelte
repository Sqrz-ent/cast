<script lang="ts">
	import { onMount, tick } from 'svelte';
	import AccessibilitySettings from '$lib/components/AccessibilitySettings.svelte';

	type ConsentState = {
		necessary: true;
		statistics: boolean;
		marketing: boolean;
		updatedAt: string;
	};

	const STORAGE_KEY = 'sqrz_cookie_consent_v1';
	const meetingUrl = 'https://meetings.hubspot.com/willvilla/sqrz-grow-discovery-call?embed=true';
	const emailUrl = 'mailto:will@sqrz.com?subject=Meeting%20about%20a%20system%20build';

	let marketingAllowed = $state(false);
	let schedulerLoaded = $state(false);

	declare global {
		interface Window {
			gtag?: (...args: unknown[]) => void;
			dataLayer?: unknown[];
		}
	}

	function readConsent(): ConsentState | null {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			return saved ? (JSON.parse(saved) as ConsentState) : null;
		} catch {
			return null;
		}
	}

	function track(eventName: string, params: Record<string, string> = {}) {
		window.gtag?.('event', eventName, {
			page_location: window.location.href,
			...params
		});
	}

	async function loadScheduler() {
		if (!marketingAllowed || schedulerLoaded) return;
		await tick();
		const target = document.querySelector('.meetings-iframe-container');
		if (!target) return;

		document.getElementById('hubspot-meetings-script')?.remove();
		const script = document.createElement('script');
		script.id = 'hubspot-meetings-script';
		script.type = 'text/javascript';
		script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
		script.onload = () => {
			schedulerLoaded = true;
			track('meet_hubspot_loaded');
		};
		document.body.appendChild(script);
	}

	function requestMarketingConsent() {
		track('meet_hubspot_consent_request');
		window.dispatchEvent(
			new CustomEvent('sqrz:cookie-consent-save', {
				detail: { statistics: true, marketing: true }
			})
		);
	}

	function scrollToContact() {
		track('meet_primary_cta_click');
		document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function onEmailClick(location: string) {
		track('meet_email_click', { location });
	}

	onMount(() => {
		const applyConsent = (consent: ConsentState | null) => {
			marketingAllowed = Boolean(consent?.marketing);
			if (marketingAllowed) loadScheduler();
		};

		applyConsent(readConsent());

		const onConsentUpdate = (event: Event) => {
			applyConsent((event as CustomEvent<ConsentState>).detail);
		};
		window.addEventListener('sqrz:cookie-consent-updated', onConsentUpdate);

		let trackedHalf = false;
		let trackedEnd = false;
		const onScroll = () => {
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			if (maxScroll <= 0) return;
			const progress = window.scrollY / maxScroll;
			if (!trackedHalf && progress >= 0.5) {
				trackedHalf = true;
				track('meet_scroll_50');
			}
			if (!trackedEnd && progress >= 0.9) {
				trackedEnd = true;
				track('meet_scroll_90');
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('sqrz:cookie-consent-updated', onConsentUpdate);
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<svelte:head>
	<title>Meet Will Villa | SQRZ</title>
	<meta
		name="description"
		content="Meet Will Villa, builder of SQRZ and complete systems for creators, venues, music teams and event professionals."
	/>
	<meta property="og:title" content="Meet Will Villa | SQRZ" />
	<meta
		property="og:description"
		content="Systems, products and workflows for creative and event businesses."
	/>
	<meta property="og:image" content="https://sqrz.com/screens/sqrz_home_desktop.png" />
</svelte:head>

<nav class="meet-nav" aria-label="Meet page navigation">
	<a class="meet-logo" href="/" aria-label="SQRZ home">
		<img src="/sqrz-logo.png" alt="SQRZ" />
	</a>
	<div class="meet-nav-actions">
		<!-- Hidden per request — same accessibility/bionic-reading bubble as main Nav.
		<AccessibilitySettings />
		-->
		<button type="button" class="meet-nav-cta" onclick={scrollToContact}>Meet</button>
	</div>
</nav>

<main class="meet-page">
	<section class="hero">
		<div class="container hero-inner">
			<div class="hero-copy">
				<p class="eyebrow">Meet the builder behind SQRZ</p>
				<h1>Hi, I'm Will Villa.</h1>
				<p class="lead">I build mobile apps for creators and advertising.</p>
				<div class="hero-actions">
					<button type="button" class="button primary" onclick={scrollToContact}>Meet me</button>
					<a class="button secondary" href={emailUrl} onclick={() => onEmailClick('hero')}
						>Email me</a
					>
				</div>
			</div>
		</div>
	</section>

	<section class="story-section" id="about">
		<div class="container story-grid">
			<div>
				<p class="eyebrow">From operator to builder</p>
				<h2>Sound engineer turned developer.</h2>
			</div>
			<div class="story-copy">
				<p>
					I'm Will. I spent years behind consoles and on stages as a DJ and sound engineer. Today I
					build apps, starting with SQRZ, which helps artists promote themselves and get booked.
				</p>
			</div>
		</div>
	</section>

	<section class="mobile-demo-section">
		<div class="container mobile-demo-grid">
			<div class="mobile-demo-copy">
				<p class="eyebrow">Interactive demo</p>
				<h2>From idea to app.</h2>
				<p>
					Most app ideas start without a plan, and that's fine. I help you shape your vision, find
					the problem it actually solves, and turn it into a working iPhone app, from first screens
					to App Store.
				</p>
			</div>

			<div class="app-launch-visual" aria-label="iPhone app launch process mockup">
				<div class="iphone-shell">
					<div class="iphone-notch"></div>
					<div class="iphone-screen">
						<div class="app-status">
							<span>9:41</span>
							<span>●●●</span>
						</div>
						<div class="app-card hero-app-card">
							<p>Mobile product</p>
							<h2>Idea to App Store</h2>
							<span>Prototype, data, testing and release guided in one build path.</span>
						</div>
						<div class="app-progress">
							<div style="width: 82%"></div>
						</div>
						<div class="app-steps">
							<div class="done">
								<span>01</span>
								<strong>Shape the idea</strong>
							</div>
							<div class="done">
								<span>02</span>
								<strong>Prototype screens</strong>
							</div>
							<div class="active">
								<span>03</span>
								<strong>Connect backend</strong>
							</div>
							<div>
								<span>04</span>
								<strong>TestFlight QA</strong>
							</div>
							<div>
								<span>05</span>
								<strong>App Store launch</strong>
							</div>
						</div>
					</div>
				</div>
				<div class="launch-caption">
					<p>iOS capable</p>
					<span
						>Not a specific app demo. A simple guide to the kind of launch path I can help with.</span
					>
				</div>
			</div>
		</div>
	</section>

	<section class="contact-section" id="contact">
		<div class="container contact-grid">
			<div class="contact-copy">
				<p class="eyebrow">Work with me</p>
				<a class="email-link" href={emailUrl} onclick={() => onEmailClick('contact')}
					>will@sqrz.com</a
				>
			</div>

			<div class="scheduler-card">
				{#if marketingAllowed}
					<div class="meetings-iframe-container" data-src={meetingUrl}></div>
					{#if !schedulerLoaded}
						<div class="scheduler-loading">Loading scheduler...</div>
					{/if}
				{:else}
					<p class="scheduler-label">HubSpot scheduler</p>
					<h3>Load the meeting calendar</h3>
					<p>
						The calendar uses HubSpot and requires marketing cookie consent. You can also email me
						directly if you prefer.
					</p>
					<button type="button" class="button primary" onclick={requestMarketingConsent}>
						Allow and load calendar
					</button>
				{/if}
			</div>
		</div>
	</section>
</main>

<style>
	:global(body) {
		background: #0d0d0d;
		color: #f6f1e7;
		font-family: 'DM Sans', ui-sans-serif, sans-serif;
	}

	.meet-page {
		background:
			radial-gradient(circle at 8% 12%, rgba(245, 166, 35, 0.16), transparent 28%),
			linear-gradient(180deg, #0d0d0d 0%, #16120b 48%, #0d0d0d 100%);
		min-height: 100vh;
	}

	.meet-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		background: rgba(8, 8, 8, 0.78);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.meet-logo {
		display: inline-flex;
		align-items: center;
		width: 44px;
		height: 44px;
	}

	.meet-logo img {
		width: 36px;
		height: auto;
		display: block;
	}

	.meet-nav-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.meet-nav-cta {
		min-height: 36px;
		padding: 0 18px;
		border: 1px solid #f5a623;
		border-radius: 6px;
		background: #f5a623;
		color: #111;
		font: inherit;
		font-size: 0.86rem;
		font-weight: 800;
		cursor: pointer;
	}

	.container {
		width: min(1120px, calc(100% - 40px));
		margin: 0 auto;
	}

	.hero {
		position: relative;
		min-height: 78svh;
		display: grid;
		align-items: end;
		overflow: hidden;
		padding: 132px 0 84px;
		background:
			radial-gradient(circle at 12% 18%, rgba(245, 166, 35, 0.2), transparent 28%),
			radial-gradient(circle at 82% 18%, rgba(255, 255, 255, 0.08), transparent 26%);
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		max-width: 940px;
		margin: 0 auto;
	}

	.eyebrow {
		margin: 0 0 14px;
		color: #f5a623;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	h1 {
		max-width: 820px;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-size: clamp(4.2rem, 12vw, 9rem);
		line-height: 0.9;
		letter-spacing: 0;
		text-transform: uppercase;
		color: #f5a623;
	}

	h2 {
		font-size: clamp(2.1rem, 5vw, 4.6rem);
		line-height: 0.98;
		letter-spacing: 0;
		color: #fff7e8;
	}

	h3 {
		font-size: 1.55rem;
		line-height: 1.05;
		color: #fff7e8;
	}

	.lead {
		max-width: 720px;
		margin-top: 28px;
		color: rgba(255, 255, 255, 0.76);
		font-size: clamp(1.08rem, 2vw, 1.34rem);
		font-weight: 300;
		line-height: 1.55;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 34px;
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		padding: 0 22px;
		border-radius: 6px;
		font-size: 0.94rem;
		font-weight: 800;
		text-decoration: none;
		cursor: pointer;
	}

	.button.primary {
		border: 1px solid #f5a623;
		background: #f5a623;
		color: #111;
	}

	.button.secondary {
		border: 1px solid rgba(255, 255, 255, 0.22);
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
	}

	.mobile-demo-section,
	.story-section,
	.contact-section {
		padding: 96px 0;
	}

	.story-copy p,
	.contact-copy p,
	.scheduler-card p {
		color: rgba(255, 255, 255, 0.68);
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.7;
	}

	.mobile-demo-section {
		background: #0f0f10;
	}

	.mobile-demo-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(320px, 1.15fr);
		gap: clamp(32px, 7vw, 84px);
		align-items: center;
	}

	.mobile-demo-copy {
		display: grid;
		gap: 18px;
	}

	.mobile-demo-copy p:not(.eyebrow),
	.launch-caption span {
		color: rgba(255, 255, 255, 0.68);
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.7;
	}

	.app-launch-visual {
		display: grid;
		justify-items: center;
		gap: 18px;
	}

	.iphone-shell {
		position: relative;
		width: min(320px, 100%);
		aspect-ratio: 9 / 19.5;
		padding: 12px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 44px;
		background: linear-gradient(145deg, #242424, #080808);
		box-shadow: 0 28px 90px rgba(0, 0, 0, 0.45);
	}

	.iphone-notch {
		position: absolute;
		top: 18px;
		left: 50%;
		z-index: 2;
		width: 86px;
		height: 24px;
		border-radius: 999px;
		background: #050505;
		transform: translateX(-50%);
	}

	.iphone-screen {
		height: 100%;
		overflow: hidden;
		border-radius: 34px;
		background:
			radial-gradient(circle at 20% 0%, rgba(245, 166, 35, 0.32), transparent 34%),
			linear-gradient(180deg, #131313 0%, #221a0d 100%);
		padding: 28px 18px 18px;
	}

	.app-status {
		display: flex;
		justify-content: space-between;
		margin-bottom: 28px;
		color: rgba(255, 255, 255, 0.72);
		font-size: 0.76rem;
		font-weight: 800;
	}

	.app-card {
		padding: 18px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px);
	}

	.app-card p {
		margin-bottom: 8px;
		color: #f5a623;
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.app-card h2 {
		font-size: 1.65rem;
		line-height: 1;
	}

	.app-card span {
		display: block;
		margin-top: 10px;
		color: rgba(255, 255, 255, 0.68);
		font-size: 0.88rem;
		line-height: 1.45;
	}

	.app-progress {
		height: 8px;
		overflow: hidden;
		margin: 18px 0;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
	}

	.app-progress div {
		height: 100%;
		border-radius: inherit;
		background: #f5a623;
	}

	.app-steps {
		display: grid;
		gap: 8px;
	}

	.app-steps div {
		display: grid;
		grid-template-columns: 36px 1fr;
		align-items: center;
		min-height: 48px;
		padding: 8px 10px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.055);
		color: rgba(255, 255, 255, 0.58);
	}

	.app-steps span {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.72rem;
		font-weight: 900;
	}

	.app-steps strong {
		font-size: 0.88rem;
	}

	.app-steps .done {
		color: rgba(255, 255, 255, 0.82);
	}

	.app-steps .active {
		border-color: rgba(245, 166, 35, 0.5);
		background: rgba(245, 166, 35, 0.16);
		color: #fff7e8;
	}

	.app-steps .active span,
	.app-steps .done span {
		color: #f5a623;
	}

	.launch-caption {
		max-width: 420px;
		text-align: center;
	}

	.launch-caption p {
		margin-bottom: 6px;
		color: #f5a623;
		font-size: 0.76rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.story-section {
		background: #f6f1e7;
		color: #111;
	}

	.story-section .eyebrow {
		color: #8b5b00;
	}

	.story-section h2 {
		color: #111;
	}

	.story-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
		gap: clamp(32px, 7vw, 84px);
		align-items: start;
	}

	.story-copy {
		display: grid;
		gap: 22px;
	}

	.story-copy p {
		color: rgba(0, 0, 0, 0.72);
	}

	.contact-section {
		padding-bottom: 120px;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.78fr) minmax(360px, 1.22fr);
		gap: clamp(28px, 6vw, 72px);
		align-items: start;
	}

	.contact-copy {
		position: sticky;
		top: 96px;
		display: grid;
		gap: 18px;
	}

	.email-link {
		width: fit-content;
		color: #f5a623;
		font-size: 1.1rem;
		font-weight: 800;
		text-decoration: none;
	}

	.scheduler-card {
		position: relative;
		min-height: 680px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		background: #f9f6ef;
		color: #111;
	}

	.scheduler-card > p,
	.scheduler-card > h3,
	.scheduler-card > button {
		margin-left: 24px;
		margin-right: 24px;
	}

	.scheduler-card > .scheduler-label {
		margin-top: 28px;
		color: #8b5b00;
		font-size: 0.74rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.scheduler-card h3 {
		margin-top: 10px;
		color: #111;
	}

	.scheduler-card > p:not(.scheduler-label) {
		margin-top: 12px;
		margin-bottom: 22px;
		color: rgba(0, 0, 0, 0.68);
	}

	.meetings-iframe-container {
		min-height: 680px;
	}

	.scheduler-loading {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		color: rgba(0, 0, 0, 0.56);
		font-weight: 800;
	}

	:global(.meetings-iframe-container iframe) {
		width: 100% !important;
		min-height: 680px !important;
	}

	@media (max-width: 900px) {
		.hero {
			min-height: 86svh;
			padding-bottom: 64px;
		}

		.story-grid,
		.mobile-demo-grid,
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-copy {
			position: static;
		}
	}

	@media (max-width: 560px) {
		.meet-nav {
			padding: 0 14px;
		}

		.container {
			width: min(100% - 28px, 1120px);
		}

		.hero {
			padding-top: 104px;
		}

		h1 {
			font-size: clamp(3.6rem, 20vw, 5.8rem);
		}

		.hero-actions {
			display: grid;
		}

		.button {
			width: 100%;
		}

		.mobile-demo-section,
		.story-section,
		.contact-section {
			padding: 68px 0;
		}

		.scheduler-card {
			min-height: 620px;
		}

		.scheduler-card > button {
			width: calc(100% - 48px);
		}
	}
</style>
