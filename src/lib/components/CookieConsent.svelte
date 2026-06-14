<script lang="ts">
	import { onMount } from 'svelte';

	type ConsentState = {
		necessary: true;
		statistics: boolean;
		marketing: boolean;
		updatedAt: string;
	};

	const STORAGE_KEY = 'sqrz_cookie_consent_v1';
	let visible = $state(false);
	let settingsOpen = $state(false);
	let statistics = $state(true);
	let marketing = $state(true);

	function readConsent(): ConsentState | null {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			return saved ? (JSON.parse(saved) as ConsentState) : null;
		} catch {
			return null;
		}
	}

	function activateConsentScripts(consent: ConsentState) {
		const allowed = new Set(['necessary']);
		if (consent.statistics) allowed.add('statistics');
		if (consent.marketing) allowed.add('marketing');

		document
			.querySelectorAll<HTMLScriptElement>('script[type="text/plain"][data-cookieconsent]')
			.forEach((script) => {
				const category = script.dataset.cookieconsent;
				if (
					!category ||
					!allowed.has(category) ||
					script.dataset.cookieconsentActivated === 'true'
				) {
					return;
				}

				const activated = document.createElement('script');
				for (const attr of Array.from(script.attributes)) {
					if (attr.name === 'type' || attr.name === 'data-cookieconsent') continue;
					if (attr.name === 'id') {
						activated.setAttribute('data-source-id', attr.value);
						continue;
					}
					activated.setAttribute(attr.name, attr.value);
				}
				activated.type = 'text/javascript';
				if (!script.src) activated.text = script.textContent ?? '';
				script.dataset.cookieconsentActivated = 'true';
				script.after(activated);
			});
	}

	function saveConsent(next: Omit<ConsentState, 'necessary' | 'updatedAt'>) {
		const consent: ConsentState = {
			necessary: true,
			statistics: next.statistics,
			marketing: next.marketing,
			updatedAt: new Date().toISOString()
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
		visible = false;
		settingsOpen = false;
		activateConsentScripts(consent);
		window.dispatchEvent(new CustomEvent('sqrz:cookie-consent-updated', { detail: consent }));
	}

	function acceptAll() {
		saveConsent({ statistics: true, marketing: true });
	}

	function rejectOptional() {
		saveConsent({ statistics: false, marketing: false });
	}

	function saveSettings() {
		saveConsent({ statistics, marketing });
	}

	onMount(() => {
		const onExternalSave = (event: Event) => {
			const detail = (event as CustomEvent<Partial<ConsentState>>).detail ?? {};
			saveConsent({
				statistics: detail.statistics ?? true,
				marketing: detail.marketing ?? true
			});
		};

		window.addEventListener('sqrz:cookie-consent-save', onExternalSave);
		const consent = readConsent();
		if (consent) {
			statistics = consent.statistics;
			marketing = consent.marketing;
			activateConsentScripts(consent);
			window.dispatchEvent(new CustomEvent('sqrz:cookie-consent-updated', { detail: consent }));
			return () => window.removeEventListener('sqrz:cookie-consent-save', onExternalSave);
		}
		visible = true;
		return () => window.removeEventListener('sqrz:cookie-consent-save', onExternalSave);
	});
</script>

{#if visible}
	<div class="cookie-panel" role="dialog" aria-live="polite" aria-label="Cookie consent">
		<div class="cookie-copy">
			<p class="cookie-title">Cookie settings</p>
			<p>
				SQRZ uses analytics and marketing tools to understand visits and improve the platform. You
				can accept all cookies, reject optional cookies, or choose categories.
			</p>
		</div>

		{#if settingsOpen}
			<div class="cookie-settings">
				<label>
					<input type="checkbox" checked disabled />
					<span>Necessary</span>
				</label>
				<label>
					<input type="checkbox" bind:checked={statistics} />
					<span>Analytics</span>
				</label>
				<label>
					<input type="checkbox" bind:checked={marketing} />
					<span>Marketing and scheduling</span>
				</label>
			</div>
		{/if}

		<div class="cookie-actions">
			<button class="ghost" type="button" onclick={() => (settingsOpen = !settingsOpen)}>
				{settingsOpen ? 'Hide settings' : 'Settings'}
			</button>
			<button class="ghost" type="button" onclick={rejectOptional}>Reject optional</button>
			{#if settingsOpen}
				<button class="primary" type="button" onclick={saveSettings}>Save choices</button>
			{:else}
				<button class="primary" type="button" onclick={acceptAll}>Accept all</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.cookie-panel {
		position: fixed;
		right: 20px;
		bottom: 20px;
		z-index: 1000;
		width: min(420px, calc(100vw - 32px));
		padding: 18px;
		border: 1px solid rgba(245, 166, 35, 0.24);
		border-radius: 8px;
		background: rgba(12, 12, 12, 0.96);
		color: #f6f1e7;
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.38);
		font-family: 'DM Sans', ui-sans-serif, sans-serif;
	}

	.cookie-copy {
		display: grid;
		gap: 8px;
	}

	.cookie-title {
		color: #f5a623;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	p {
		margin: 0;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.88rem;
		line-height: 1.55;
	}

	.cookie-settings {
		display: grid;
		gap: 10px;
		margin-top: 16px;
		padding: 14px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
	}

	label {
		display: flex;
		align-items: center;
		gap: 10px;
		color: rgba(255, 255, 255, 0.82);
		font-size: 0.9rem;
	}

	input {
		accent-color: #f5a623;
	}

	.cookie-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 8px;
		margin-top: 16px;
	}

	button {
		min-height: 40px;
		padding: 0 14px;
		border-radius: 6px;
		font: inherit;
		font-size: 0.86rem;
		font-weight: 700;
		cursor: pointer;
	}

	.ghost {
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(255, 255, 255, 0.04);
		color: rgba(255, 255, 255, 0.82);
	}

	.primary {
		border: 1px solid #f5a623;
		background: #f5a623;
		color: #111;
	}

	@media (max-width: 520px) {
		.cookie-panel {
			right: 16px;
			bottom: 16px;
		}

		.cookie-actions {
			display: grid;
			grid-template-columns: 1fr;
		}
	}
</style>
