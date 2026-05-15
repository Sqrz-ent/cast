<script lang="ts">
	import { onMount } from 'svelte';

	declare global {
		interface Window {
			hbspt?: {
				forms: {
					create: (config: {
						portalId: string;
						formId: string;
						region: string;
						target: string;
					}) => void;
				};
			};
		}
	}

	onMount(() => {
		const scriptId = 'hs-forms-script-kdk';

		const mountForm = () => {
			const target = document.querySelector('#kdk-hubspot-form');
			if (!target || !window.hbspt?.forms) return;
			target.innerHTML = '';
			window.hbspt.forms.create({
				portalId: '8081234',
				formId: '21115953-0c10-47ca-8fef-999762ad7d2e',
				region: 'na1',
				target: '#kdk-hubspot-form'
			});
		};

		const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
		if (existing) {
			mountForm();
			return;
		}

		const script = document.createElement('script');
		script.id = scriptId;
		script.charset = 'utf-8';
		script.type = 'text/javascript';
		script.src = '//js.hsforms.net/forms/embed/v2.js';
		script.onload = mountForm;
		document.body.appendChild(script);
	});
</script>

<svelte:head>
	<title>KDK x StreetUniverCity | SQRZ</title>
	<meta
		name="description"
		content="Private submission page for Karneval der Kulturen x StreetUniverCity."
	/>
</svelte:head>

<section class="kdk-shell">
	<div class="kdk-card">
		<div class="eyebrow">Private Submission</div>
		<h1>Karneval der Kulturen x StreetUniverCity</h1>
		<p class="lead">
			Upload your instrumentals to participate in this year’s KDK with StreetUniverCity.
		</p>

		<div class="instructions">
			<h2>Teilnahme an der Parade - Sonntag ab 14 Uhr</h2>
			<ul>
				<li>Um an der Parade teilzunehmen bitte hier Instrumental hochladen.</li>
				<li>2-3 Songs per Gruppe</li>
				<li> Reihenfolge + Titel + Perfomer</li>
				<li>(Beispiel - 01 "Trackname by Artistname" | 2 Rapper + Saxophon ....)</li>
			</ul>
		</div>

		<div class="form-wrap">
			<div id="kdk-hubspot-form"></div>
		</div>
	</div>
</section>

<style>
	:global(body) {
		background: radial-gradient(circle at top, rgba(245, 166, 35, 0.14), transparent 42%), #0f0f10;
		color: #f5f2ea;
		font-family: 'DM Sans', sans-serif;
	}

	.kdk-shell {
		min-height: 100svh;
		padding: 48px 20px 72px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.kdk-card {
		width: min(100%, 880px);
		background: rgba(17, 17, 17, 0.88);
		border: 1px solid rgba(245, 166, 35, 0.18);
		border-radius: 28px;
		padding: 40px 24px;
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
		backdrop-filter: blur(14px);
	}

	.eyebrow {
		margin-bottom: 12px;
		font-size: 0.76rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(245, 166, 35, 0.72);
	}

	h1 {
		margin: 0 0 14px;
		font-size: clamp(2rem, 5vw, 3.8rem);
		line-height: 0.96;
		color: #f5a623;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.lead {
		margin: 0 0 28px;
		max-width: 680px;
		font-size: 1rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.74);
	}

	.instructions {
		margin-bottom: 28px;
		padding: 20px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.instructions h2 {
		margin: 0 0 12px;
		font-size: 0.92rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.56);
	}

	.instructions ul {
		margin: 0;
		padding-left: 18px;
		color: rgba(255, 255, 255, 0.76);
		line-height: 1.8;
	}

	.form-wrap {
		padding: 18px;
		border-radius: 20px;
		background: #faf7f1;
		color: #111;
	}

	:global(#kdk-hubspot-form .hs-form-frame),
	:global(#kdk-hubspot-form iframe) {
		width: 100% !important;
	}

	@media (max-width: 640px) {
		.kdk-shell {
			padding: 24px 14px 40px;
		}

		.kdk-card {
			padding: 28px 18px;
			border-radius: 22px;
		}

		.form-wrap {
			padding: 14px;
			border-radius: 16px;
		}
	}
</style>
