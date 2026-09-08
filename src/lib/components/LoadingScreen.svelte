<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { heroModel } from '$lib/state/heroModel.svelte';

	let visible = $state(true);
	let fadingOut = $state(false);
	let pageLoaded = $state(false);

	// The home page's 3D model finishes loading well after `load` fires, since
	// it's fetched from JS rather than a declarative <img>/<script> tag -- wait
	// for it too so the splash doesn't clear onto an empty hero.
	// pathname carries the base prefix on a project-site deploy ("/website/"), so
	// strip it before comparing -- comparing the raw pathname made isHome false in
	// production, which skipped the model gate and cleared the splash at load.
	const path = $derived(page.url.pathname.slice(base.length) || '/');
	const isHome = $derived(path === '/');
	const readyToFinish = $derived(pageLoaded && (!isHome || heroModel.ready));

	// Only the home page has a real number to show (the 23MB model download).
	// Everywhere else the wait is too short and too opaque to measure, so the
	// bar sweeps instead of pretending to know a percentage.
	const determinate = $derived(isHome && heroModel.progress > 0);
	const percent = $derived(Math.round((fadingOut ? 1 : heroModel.progress) * 100));

	onMount(() => {
		if (document.readyState === 'complete') {
			pageLoaded = true;
			return;
		}

		function onLoad() {
			pageLoaded = true;
		}
		window.addEventListener('load', onLoad);
		return () => window.removeEventListener('load', onLoad);
	});

	$effect(() => {
		if (readyToFinish && !fadingOut) {
			fadingOut = true;
			setTimeout(() => {
				visible = false;
			}, 400);
		}
	});
</script>

{#if visible}
	<div class="loading-screen" class:fading={fadingOut} aria-hidden="true">
		<img src="{base}/spinner.png" alt="" class="loading-spinner" />
		<div class="loading-bar">
			{#if determinate}
				<div class="loading-bar-fill" style:width="{percent}%"></div>
			{:else}
				<div class="loading-bar-sweep"></div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: #000000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 26px;
		opacity: 1;
		transition: opacity 0.4s ease;
	}

	.loading-screen.fading {
		opacity: 0;
		pointer-events: none;
	}

	.loading-spinner {
		width: 64px;
		height: 64px;
		animation: loading-spin 1s linear infinite;
	}

	.loading-bar {
		position: relative;
		width: min(180px, 44vw);
		height: 2px;
		background: var(--outline);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.loading-bar-fill {
		height: 100%;
		background: var(--primary);
		border-radius: inherit;
		/* Eases toward each reported figure so the bar reads as motion rather
		   than a series of jumps between progress events. */
		transition: width 0.25s ease-out;
	}

	.loading-bar-sweep {
		position: absolute;
		inset: 0 auto 0 0;
		width: 40%;
		background: var(--primary);
		border-radius: inherit;
		animation: loading-sweep 1.1s ease-in-out infinite;
	}

	@keyframes loading-sweep {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(250%);
		}
	}

	@keyframes loading-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
