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

	const workflowSteps = [
		{
			label: 'Project',
			title: 'What needs to happen?',
			helper: 'Start with intent, not an empty message box.'
		},
		{
			label: 'Details',
			title: 'When and how big is it?',
			helper: 'Capture timing and budget before anyone starts guessing.'
		},
		{
			label: 'Team',
			title: 'Who needs to be involved?',
			helper: 'Turn loose needs into roles, responsibilities and next actions.'
		},
		{
			label: 'Review',
			title: 'Structured request ready',
			helper: 'The client still feels heard, but the operator gets usable data.'
		}
	];

	const projectTypes = ['Live event', 'Studio session', 'Creator campaign'];
	const timings = ['This month', 'Next 6 weeks', 'Flexible'];
	const budgets = ['Under 2k', '2k-5k', '5k+'];
	const teamNeeds = ['Talent', 'Production', 'Payments'];

	type DirectoryVenue = {
		name: string;
		type: string;
		city: string;
		country: string;
		capacity: string;
		fit: string;
		tags: string[];
	};

	const directoryVenues: DirectoryVenue[] = [
		{
			name: 'Northline Hall',
			type: 'Live music venue',
			city: 'Berlin',
			country: 'DE',
			capacity: '450 cap',
			fit: 'Tour routing, showcase nights, brand events',
			tags: ['Backline', 'Ticketed', 'Green room']
		},
		{
			name: 'Canal Studio',
			type: 'Creative space',
			city: 'Amsterdam',
			country: 'NL',
			capacity: '120 cap',
			fit: 'Listening sessions, creator shoots, workshops',
			tags: ['Daylight', 'Content', 'Private hire']
		},
		{
			name: 'The Signal Room',
			type: 'Event venue',
			city: 'London',
			country: 'UK',
			capacity: '300 cap',
			fit: 'Panels, afterparties, product launches',
			tags: ['AV', 'Bar', 'Production']
		},
		{
			name: 'Harbor Loft',
			type: 'Art center',
			city: 'Hamburg',
			country: 'DE',
			capacity: '220 cap',
			fit: 'Gallery events, brand dinners, cultural programs',
			tags: ['Curated', 'Catering', 'Exhibition']
		},
		{
			name: 'Pulse Basement',
			type: 'Night club',
			city: 'Paris',
			country: 'FR',
			capacity: '650 cap',
			fit: 'Club shows, label nights, late programming',
			tags: ['Late license', 'Sound', 'Security']
		},
		{
			name: 'Eastyard Theater',
			type: 'Performing arts theater',
			city: 'Barcelona',
			country: 'ES',
			capacity: '520 cap',
			fit: 'Seated shows, talks, hybrid recordings',
			tags: ['Seated', 'Stage', 'Streaming']
		}
	];

	const directoryTypes = ['All', ...new Set(directoryVenues.map((venue) => venue.type))];
	const directoryCities = ['All cities', ...new Set(directoryVenues.map((venue) => venue.city))];

	const principles = [
		'Start from the real operational pain, not the tool stack',
		'Design the first click and the final handoff together',
		'Make tracking useful without losing trust',
		'Build systems that can be operated after launch'
	];

	let marketingAllowed = $state(false);
	let schedulerLoaded = $state(false);
	let bookingStep = $state(0);
	let selectedProject = $state(projectTypes[0]);
	let selectedTiming = $state(timings[1]);
	let selectedBudget = $state(budgets[1]);
	let selectedNeeds = $state<string[]>(['Production']);
	let directoryQuery = $state('');
	let selectedDirectoryType = $state(directoryTypes[0]);
	let selectedDirectoryCity = $state(directoryCities[0]);
	let selectedDirectoryVenue = $state<DirectoryVenue>(directoryVenues[0]);
	const activeWorkflowStep = $derived(workflowSteps[bookingStep]);
	const requestCompleteness = $derived(
		Math.round(((bookingStep + 1) / workflowSteps.length) * 100)
	);
	const filteredDirectoryVenues = $derived.by(() => {
		const query = directoryQuery.trim().toLowerCase();
		const filtered = directoryVenues.filter((venue) => {
			const matchesQuery =
				!query ||
				[venue.name, venue.type, venue.city, venue.country, venue.fit, ...venue.tags]
					.join(' ')
					.toLowerCase()
					.includes(query);
			const matchesType = selectedDirectoryType === 'All' || venue.type === selectedDirectoryType;
			const matchesCity =
				selectedDirectoryCity === 'All cities' || venue.city === selectedDirectoryCity;

			return matchesQuery && matchesType && matchesCity;
		});

		return filtered;
	});

	$effect(() => {
		if (!filteredDirectoryVenues.length) return;
		if (filteredDirectoryVenues.some((venue) => venue.name === selectedDirectoryVenue.name)) return;
		selectedDirectoryVenue = filteredDirectoryVenues[0];
	});

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

	function selectWorkflowStep(nextStep: number) {
		bookingStep = nextStep;
		track('meet_booking_demo_step', { step: workflowSteps[nextStep].label.toLowerCase() });
	}

	function toggleNeed(need: string) {
		if (selectedNeeds.includes(need)) {
			selectedNeeds = selectedNeeds.filter((item) => item !== need);
			return;
		}
		selectedNeeds = [...selectedNeeds, need];
	}

	function selectDirectoryVenue(venue: DirectoryVenue) {
		selectedDirectoryVenue = venue;
		track('meet_directory_demo_select', { venue: venue.name });
	}

	function clearDirectoryFilters() {
		directoryQuery = '';
		selectedDirectoryType = directoryTypes[0];
		selectedDirectoryCity = directoryCities[0];
		selectedDirectoryVenue = directoryVenues[0];
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
		<AccessibilitySettings />
		<button type="button" class="meet-nav-cta" onclick={scrollToContact}>Meet</button>
	</div>
</nav>

<main class="meet-page">
	<section class="hero">
		<div class="container hero-inner">
			<div class="hero-copy">
				<p class="eyebrow">Meet the builder behind SQRZ</p>
				<h1>Hi, I'm Will Villa.</h1>
				<p class="lead">
					I build complete systems for people working in music, events and creative industries:
					profiles, booking flows, payments, operations, tracking and the glue between them.
				</p>
				<div class="hero-actions">
					<button type="button" class="button primary" onclick={scrollToContact}>Meet me</button>
					<a class="button secondary" href={emailUrl} onclick={() => onEmailClick('hero')}
						>Email me</a
					>
				</div>
			</div>
		</div>
	</section>

	<section class="systems-section" id="work">
		<div class="container">
			<div class="section-heading">
				<p class="eyebrow">Interactive demo</p>
				<h2>Booking requests should arrive structured.</h2>
				<p>
					This sample clickthrough shows the kind of client-friendly intake system I like building.
					It is not a live booking form, and no data is submitted here.
				</p>
			</div>

			<div class="workflow-demo">
				<div class="workflow-panel" aria-label="Sample booking request workflow demo">
					<div class="workflow-topbar">
						<div>
							<p>Demo interface</p>
							<strong>Sample booking request flow</strong>
						</div>
						<div class="workflow-badges">
							<span class="demo-badge">No submit</span>
							<span>{requestCompleteness}% previewed</span>
						</div>
					</div>

					<div class="workflow-demo-note">
						<span>Example workflow</span>
						<p>
							Click through the sample states. This is here to show product thinking, not to collect
							a request.
						</p>
					</div>

					<div class="workflow-progress" aria-label="Booking request progress">
						{#each workflowSteps as step, index}
							<button
								type="button"
								class:active={bookingStep === index}
								class:complete={bookingStep > index}
								onclick={() => selectWorkflowStep(index)}
							>
								<span>{index + 1}</span>
								{step.label}
							</button>
						{/each}
					</div>

					<div class="workflow-screen">
						<div class="workflow-screen-copy">
							<p>{activeWorkflowStep.label}</p>
							<h3>{activeWorkflowStep.title}</h3>
							<span>{activeWorkflowStep.helper}</span>
						</div>

						{#if bookingStep === 0}
							<div class="choice-grid">
								{#each projectTypes as type}
									<button
										type="button"
										class:active={selectedProject === type}
										onclick={() => (selectedProject = type)}
									>
										{type}
									</button>
								{/each}
							</div>
						{:else if bookingStep === 1}
							<div class="detail-grid">
								<div>
									<label for="timing">Timing</label>
									<div class="choice-row" id="timing">
										{#each timings as timing}
											<button
												type="button"
												class:active={selectedTiming === timing}
												onclick={() => (selectedTiming = timing)}
											>
												{timing}
											</button>
										{/each}
									</div>
								</div>
								<div>
									<label for="budget">Budget</label>
									<div class="choice-row" id="budget">
										{#each budgets as budget}
											<button
												type="button"
												class:active={selectedBudget === budget}
												onclick={() => (selectedBudget = budget)}
											>
												{budget}
											</button>
										{/each}
									</div>
								</div>
							</div>
						{:else if bookingStep === 2}
							<div class="choice-grid">
								{#each teamNeeds as need}
									<button
										type="button"
										class:active={selectedNeeds.includes(need)}
										onclick={() => toggleNeed(need)}
									>
										{need}
									</button>
								{/each}
							</div>
						{:else}
							<div class="request-summary">
								<div>
									<span>Project</span>
									<strong>{selectedProject}</strong>
								</div>
								<div>
									<span>Timing</span>
									<strong>{selectedTiming}</strong>
								</div>
								<div>
									<span>Budget</span>
									<strong>{selectedBudget}</strong>
								</div>
								<div>
									<span>Needs</span>
									<strong
										>{selectedNeeds.length ? selectedNeeds.join(', ') : 'Discovery call'}</strong
									>
								</div>
							</div>
						{/if}

						<div class="workflow-actions">
							<button
								type="button"
								class="button secondary compact"
								disabled={bookingStep === 0}
								onclick={() => selectWorkflowStep(Math.max(bookingStep - 1, 0))}
							>
								Back
							</button>
							<button
								type="button"
								class="button primary compact"
								onclick={() =>
									bookingStep === workflowSteps.length - 1
										? scrollToContact()
										: selectWorkflowStep(Math.min(bookingStep + 1, workflowSteps.length - 1))}
							>
								{bookingStep === workflowSteps.length - 1
									? 'Talk through a workflow'
									: 'Preview next step'}
							</button>
						</div>
					</div>
				</div>

				<aside class="workflow-notes">
					<p class="eyebrow">Why this matters</p>
					<h3>A form can be more than a form.</h3>
					<p>
						For many service businesses, the first operational failure happens at intake. A good
						request flow can qualify the opportunity, guide the client, prepare the team and feed
						the next step without feeling like paperwork.
					</p>
					<ul>
						<li>Clients get guided instead of staring at a blank field.</li>
						<li>Teams receive the scope, timing and budget in one place.</li>
						<li>The same flow can branch into proposals, payments or scheduling.</li>
					</ul>
				</aside>
			</div>
		</div>
	</section>

	<section class="directory-demo-section">
		<div class="container">
			<div class="section-heading">
				<p class="eyebrow">Mini VenueFindr demo</p>
				<h2>Directories should help people decide.</h2>
				<p>
					A compact version of the list, filter and detail pattern behind VenueFindr. This one uses
					static sample data, but the workflow mirrors the real product logic: search, narrow,
					compare, then open the useful detail.
				</p>
			</div>

			<div class="directory-demo" aria-label="Venue directory search and filter demo">
				<div class="directory-browser">
					<div class="directory-topbar">
						<div>
							<p>Static demo</p>
							<strong>VenueFindr-style directory</strong>
						</div>
						<span>{filteredDirectoryVenues.length} results</span>
					</div>

					<div class="directory-controls">
						<label class="directory-search">
							<span>Search</span>
							<input
								type="search"
								bind:value={directoryQuery}
								placeholder="Search city, type, use case..."
								aria-label="Search sample venues"
							/>
						</label>

						<label>
							<span>City</span>
							<select bind:value={selectedDirectoryCity} aria-label="Filter sample venues by city">
								{#each directoryCities as city}
									<option value={city}>{city}</option>
								{/each}
							</select>
						</label>

						<button type="button" class="directory-reset" onclick={clearDirectoryFilters}>
							Reset
						</button>
					</div>

					<div class="directory-type-row" role="group" aria-label="Filter sample venues by type">
						{#each directoryTypes as type}
							<button
								type="button"
								class:active={selectedDirectoryType === type}
								onclick={() => (selectedDirectoryType = type)}
							>
								{type}
							</button>
						{/each}
					</div>

					{#if filteredDirectoryVenues.length}
						<div class="directory-grid">
							{#each filteredDirectoryVenues as venue}
								<button
									type="button"
									class="directory-card"
									class:active={selectedDirectoryVenue.name === venue.name}
									onclick={() => selectDirectoryVenue(venue)}
								>
									<span class="directory-photo">{venue.name.slice(0, 1)}</span>
									<span class="directory-card-body">
										<span class="directory-meta">{venue.type}</span>
										<strong>{venue.name}</strong>
										<span>{venue.city}, {venue.country} · {venue.capacity}</span>
									</span>
								</button>
							{/each}
						</div>
					{:else}
						<div class="directory-empty">
							<strong>No sample venues found</strong>
							<p>Try a broader city, type or search term.</p>
						</div>
					{/if}
				</div>

				<aside class="directory-detail" aria-label="Selected sample venue details">
					<div class="directory-detail-head">
						<p>Preview panel</p>
						<span>{selectedDirectoryVenue.country}</span>
					</div>
					<h3>{selectedDirectoryVenue.name}</h3>
					<p>{selectedDirectoryVenue.fit}</p>

					<div class="directory-detail-stats">
						<div>
							<span>Type</span>
							<strong>{selectedDirectoryVenue.type}</strong>
						</div>
						<div>
							<span>City</span>
							<strong>{selectedDirectoryVenue.city}</strong>
						</div>
						<div>
							<span>Capacity</span>
							<strong>{selectedDirectoryVenue.capacity}</strong>
						</div>
					</div>

					<div class="directory-tags">
						{#each selectedDirectoryVenue.tags as tag}
							<span>{tag}</span>
						{/each}
					</div>

					<div class="directory-note">
						<strong>What this represents</strong>
						<p>
							A real directory can connect live data, moderation, favorites, export flows and CRM
							actions. This preview keeps only the interaction layer.
						</p>
					</div>
				</aside>
			</div>
		</div>
	</section>

	<section class="mobile-demo-section">
		<div class="container mobile-demo-grid">
			<div class="mobile-demo-copy">
				<p class="eyebrow">Interactive demo</p>
				<h2>From app idea to launch path.</h2>
				<p>
					A simple iPhone mockup for the kind of mobile product process I can help with: shape the
					idea, prototype the first screens, connect the data layer, test it, and prepare it for the
					App Store.
				</p>
				<p class="demo-disclaimer">
					This is a guide, not a real app preview. It is here to show the process.
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

	<section class="story-section" id="about">
		<div class="container story-grid">
			<div>
				<p class="eyebrow">From operator to builder</p>
				<h2>I started in the real world before I started building software.</h2>
			</div>
			<div class="story-copy">
				<p>
					I began as a DJ and spent years around stages, artists, venues and production teams. The
					patterns were always the same: opportunity came through messy channels, bookings needed
					structure, and the business side often lived in a pile of messages, invoices and tabs.
				</p>
				<p>
					SQRZ came from that friction. What started as a way to make creative work easier to book
					has become a broader system for profiles, collaboration, payments, campaigns and client
					operations.
				</p>
			</div>
		</div>
	</section>

	<section class="principles-section">
		<div class="container principles-grid">
			{#each principles as principle}
				<div class="principle">{principle}</div>
			{/each}
		</div>
	</section>

	<section class="contact-section" id="contact">
		<div class="container contact-grid">
			<div class="contact-copy">
				<p class="eyebrow">Work with me</p>
				<h2>Have a system you want to build or untangle?</h2>
				<p>
					Book a short discovery call if you want to talk through SQRZ, a creative operations
					system, a booking flow, or a product idea that needs to become real.
				</p>
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

	.systems-section,
	.directory-demo-section,
	.mobile-demo-section,
	.story-section,
	.principles-section,
	.contact-section {
		padding: 96px 0;
	}

	.section-heading {
		max-width: 780px;
		margin-bottom: 42px;
	}

	.section-heading p:last-child,
	.story-copy p,
	.contact-copy p,
	.scheduler-card p {
		color: rgba(255, 255, 255, 0.68);
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.7;
	}

	.section-heading p:last-child {
		margin-top: 18px;
	}

	.workflow-demo {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
		gap: 18px;
		align-items: start;
	}

	.workflow-panel {
		position: relative;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		background: #f7f2e8;
		color: #121212;
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
	}

	.workflow-panel::after {
		content: 'DEMO';
		position: absolute;
		right: -34px;
		top: 92px;
		z-index: 1;
		width: 150px;
		padding: 8px 0;
		background: rgba(17, 17, 17, 0.9);
		color: rgba(245, 166, 35, 0.95);
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		text-align: center;
		transform: rotate(36deg);
		pointer-events: none;
	}

	.workflow-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		padding: 18px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	.workflow-topbar p,
	.workflow-screen-copy p {
		margin: 0 0 4px;
		color: #8b5b00;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.workflow-topbar strong {
		display: block;
		font-size: 1.06rem;
		color: #111;
	}

	.workflow-badges {
		flex: 0 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 8px;
	}

	.workflow-badges span {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 34px;
		padding: 0 12px;
		border-radius: 999px;
		background: #111;
		color: #f5a623;
		font-size: 0.78rem;
		font-weight: 800;
	}

	.workflow-badges .demo-badge {
		background: rgba(245, 166, 35, 0.2);
		color: #6f4700;
	}

	.workflow-demo-note {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 18px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		background: #fff7e6;
	}

	.workflow-demo-note span {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		min-height: 26px;
		padding: 0 10px;
		border-radius: 999px;
		background: #f5a623;
		color: #111;
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.workflow-demo-note p {
		margin: 0;
		color: rgba(0, 0, 0, 0.62);
		font-size: 0.86rem;
		line-height: 1.4;
	}

	.workflow-progress {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		background: rgba(0, 0, 0, 0.03);
	}

	.workflow-progress button {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;
		min-height: 58px;
		padding: 0 12px;
		border: 0;
		border-right: 1px solid rgba(0, 0, 0, 0.08);
		background: transparent;
		color: rgba(0, 0, 0, 0.56);
		font: inherit;
		font-size: 0.82rem;
		font-weight: 800;
		cursor: pointer;
		text-align: left;
	}

	.workflow-progress button:last-child {
		border-right: 0;
	}

	.workflow-progress span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.09);
		color: rgba(0, 0, 0, 0.52);
		font-size: 0.72rem;
	}

	.workflow-progress button.active {
		background: #fffaf0;
		color: #111;
	}

	.workflow-progress button.active span,
	.workflow-progress button.complete span {
		background: #f5a623;
		color: #111;
	}

	.workflow-screen {
		display: grid;
		gap: 22px;
		min-height: 410px;
		padding: clamp(22px, 4vw, 34px);
	}

	.workflow-screen-copy h3,
	.workflow-notes h3 {
		color: #111;
	}

	.workflow-screen-copy span {
		display: block;
		max-width: 520px;
		margin-top: 10px;
		color: rgba(0, 0, 0, 0.62);
		line-height: 1.55;
	}

	.choice-grid,
	.detail-grid {
		display: grid;
		gap: 12px;
	}

	.choice-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.choice-grid button,
	.choice-row button {
		min-height: 86px;
		padding: 14px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		background: #fff;
		color: #111;
		font: inherit;
		font-size: 0.96rem;
		font-weight: 800;
		cursor: pointer;
		text-align: left;
	}

	.choice-grid button.active,
	.choice-row button.active {
		border-color: #f5a623;
		background: #fff3d7;
		box-shadow: inset 0 0 0 1px #f5a623;
	}

	.detail-grid {
		grid-template-columns: 1fr 1fr;
	}

	.detail-grid label {
		display: block;
		margin-bottom: 8px;
		color: #f5a623;
		font-size: 0.74rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.choice-row {
		display: grid;
		gap: 10px;
	}

	.choice-row button {
		min-height: 54px;
	}

	.request-summary {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.request-summary div {
		min-height: 92px;
		padding: 16px;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 8px;
		background: #fff;
	}

	.request-summary span {
		display: block;
		margin-bottom: 8px;
		color: rgba(0, 0, 0, 0.48);
		font-size: 0.76rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	.request-summary strong {
		color: #111;
		line-height: 1.35;
	}

	.workflow-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		align-self: end;
	}

	.button.compact {
		min-height: 42px;
		padding: 0 16px;
		font-size: 0.86rem;
	}

	.button:disabled {
		opacity: 0.44;
		cursor: not-allowed;
	}

	.workflow-notes {
		position: sticky;
		top: 92px;
		display: grid;
		gap: 16px;
		padding: clamp(24px, 4vw, 34px);
		border: 1px solid rgba(245, 166, 35, 0.2);
		border-radius: 8px;
		background: rgba(245, 166, 35, 0.08);
	}

	.workflow-notes h3 {
		color: #fff7e8;
	}

	.workflow-notes p,
	.workflow-notes li {
		color: rgba(255, 255, 255, 0.68);
		font-size: 0.96rem;
		font-weight: 300;
		line-height: 1.65;
	}

	.workflow-notes ul {
		display: grid;
		gap: 10px;
		margin: 4px 0 0;
		padding-left: 18px;
	}

	.directory-demo-section {
		background: #080b0b;
	}

	.directory-demo {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
		gap: 18px;
		align-items: start;
	}

	.directory-browser,
	.directory-detail {
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.035);
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
	}

	.directory-browser {
		overflow: hidden;
	}

	.directory-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		padding: 18px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.025);
	}

	.directory-topbar p,
	.directory-detail-head p,
	.directory-controls span,
	.directory-meta {
		margin: 0 0 5px;
		color: #55d6c2;
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.directory-topbar strong {
		color: #fff7e8;
		font-size: 1.02rem;
	}

	.directory-topbar > span {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		min-height: 34px;
		padding: 0 12px;
		border-radius: 999px;
		background: rgba(85, 214, 194, 0.12);
		color: #85eadb;
		font-size: 0.78rem;
		font-weight: 800;
	}

	.directory-controls {
		display: grid;
		grid-template-columns: minmax(220px, 1fr) 180px auto;
		gap: 10px;
		padding: 18px;
		align-items: end;
	}

	.directory-controls label {
		display: grid;
		gap: 6px;
	}

	.directory-controls input,
	.directory-controls select {
		width: 100%;
		min-height: 44px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.055);
		color: rgba(255, 255, 255, 0.86);
		font: inherit;
		font-size: 0.9rem;
		outline: none;
	}

	.directory-controls input {
		padding: 0 14px;
	}

	.directory-controls select {
		padding: 0 36px 0 12px;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.52)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 12px center;
	}

	.directory-controls input::placeholder {
		color: rgba(255, 255, 255, 0.32);
	}

	.directory-controls input:focus,
	.directory-controls select:focus {
		border-color: rgba(85, 214, 194, 0.58);
	}

	.directory-controls option {
		background: #151515;
		color: #fff;
	}

	.directory-reset {
		min-height: 44px;
		padding: 0 14px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.055);
		color: rgba(255, 255, 255, 0.72);
		font: inherit;
		font-size: 0.86rem;
		font-weight: 800;
		cursor: pointer;
	}

	.directory-type-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 0 18px 18px;
	}

	.directory-type-row button {
		min-height: 34px;
		padding: 0 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		background: transparent;
		color: rgba(255, 255, 255, 0.54);
		font: inherit;
		font-size: 0.78rem;
		font-weight: 700;
		cursor: pointer;
	}

	.directory-type-row button.active {
		border-color: rgba(85, 214, 194, 0.52);
		background: rgba(85, 214, 194, 0.12);
		color: #85eadb;
	}

	.directory-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		padding: 0 18px 18px;
	}

	.directory-card {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 12px;
		min-height: 116px;
		padding: 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.035);
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.directory-card.active {
		border-color: rgba(245, 166, 35, 0.48);
		background: rgba(245, 166, 35, 0.08);
	}

	.directory-photo {
		display: grid;
		place-items: center;
		width: 64px;
		height: 64px;
		border-radius: 8px;
		background:
			linear-gradient(135deg, rgba(85, 214, 194, 0.18), rgba(245, 166, 35, 0.12)), #141414;
		color: rgba(255, 255, 255, 0.46);
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-size: 2rem;
	}

	.directory-card-body {
		display: grid;
		align-content: start;
		min-width: 0;
	}

	.directory-card-body strong {
		margin-bottom: 6px;
		color: #fff7e8;
		font-size: 1rem;
		line-height: 1.15;
	}

	.directory-card-body > span:last-child {
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.84rem;
		line-height: 1.35;
	}

	.directory-empty {
		display: grid;
		gap: 8px;
		margin: 0 18px 18px;
		padding: 20px;
		border: 1px dashed rgba(255, 255, 255, 0.16);
		border-radius: 8px;
		color: rgba(255, 255, 255, 0.72);
	}

	.directory-empty p {
		color: rgba(255, 255, 255, 0.52);
	}

	.directory-detail {
		position: sticky;
		top: 92px;
		display: grid;
		gap: 18px;
		padding: clamp(24px, 4vw, 34px);
		background:
			linear-gradient(180deg, rgba(85, 214, 194, 0.08), transparent 48%), rgba(255, 255, 255, 0.035);
	}

	.directory-detail-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
	}

	.directory-detail-head span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 42px;
		min-height: 34px;
		border-radius: 999px;
		background: #f5a623;
		color: #111;
		font-size: 0.78rem;
		font-weight: 900;
	}

	.directory-detail p {
		color: rgba(255, 255, 255, 0.68);
		font-size: 0.98rem;
		font-weight: 300;
		line-height: 1.65;
	}

	.directory-detail-stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 10px;
	}

	.directory-detail-stats div {
		min-height: 92px;
		padding: 14px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
	}

	.directory-detail-stats span {
		display: block;
		margin-bottom: 8px;
		color: rgba(255, 255, 255, 0.42);
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.directory-detail-stats strong {
		color: #fff7e8;
		font-size: 0.9rem;
		line-height: 1.25;
	}

	.directory-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.directory-tags span {
		display: inline-flex;
		align-items: center;
		min-height: 30px;
		padding: 0 10px;
		border-radius: 999px;
		background: rgba(85, 214, 194, 0.12);
		color: #b1fff3;
		font-size: 0.78rem;
		font-weight: 800;
	}

	.directory-note {
		display: grid;
		gap: 8px;
		padding: 16px;
		border: 1px solid rgba(245, 166, 35, 0.2);
		border-radius: 8px;
		background: rgba(245, 166, 35, 0.08);
	}

	.directory-note strong {
		color: #fff7e8;
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
	.demo-disclaimer,
	.launch-caption span {
		color: rgba(255, 255, 255, 0.68);
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.7;
	}

	.demo-disclaimer {
		display: inline-flex;
		width: fit-content;
		padding: 10px 12px;
		border: 1px solid rgba(245, 166, 35, 0.22);
		border-radius: 8px;
		background: rgba(245, 166, 35, 0.08);
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

	.principles-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
	}

	.principle {
		min-height: 168px;
		display: flex;
		align-items: end;
		padding: 18px;
		border: 1px solid rgba(245, 166, 35, 0.2);
		border-radius: 8px;
		background: rgba(245, 166, 35, 0.08);
		color: rgba(255, 255, 255, 0.82);
		font-size: 1.02rem;
		line-height: 1.35;
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

		.workflow-demo {
			grid-template-columns: 1fr;
		}

		.directory-demo {
			grid-template-columns: 1fr;
		}

		.directory-detail {
			position: static;
		}

		.workflow-notes {
			position: static;
		}

		.story-grid,
		.mobile-demo-grid,
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-copy {
			position: static;
		}

		.principles-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
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

		.systems-section,
		.directory-demo-section,
		.mobile-demo-section,
		.story-section,
		.principles-section,
		.contact-section {
			padding: 68px 0;
		}

		.workflow-progress {
			grid-template-columns: 1fr 1fr;
		}

		.workflow-panel::after {
			display: none;
		}

		.workflow-topbar {
			display: grid;
		}

		.workflow-badges {
			justify-content: flex-start;
		}

		.workflow-demo-note {
			display: grid;
		}

		.workflow-progress button {
			border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		}

		.workflow-screen {
			min-height: 500px;
		}

		.choice-grid,
		.detail-grid,
		.request-summary {
			grid-template-columns: 1fr;
		}

		.choice-grid button {
			min-height: 62px;
		}

		.workflow-actions {
			display: grid;
		}

		.directory-controls,
		.directory-grid,
		.directory-detail-stats {
			grid-template-columns: 1fr;
		}

		.directory-card {
			grid-template-columns: 56px 1fr;
			min-height: 104px;
		}

		.directory-photo {
			width: 56px;
			height: 56px;
			font-size: 1.75rem;
		}

		.principles-grid {
			grid-template-columns: 1fr;
		}

		.scheduler-card {
			min-height: 620px;
		}

		.scheduler-card > button {
			width: calc(100% - 48px);
		}
	}
</style>
