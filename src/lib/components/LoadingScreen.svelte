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
	</div>
{/if}

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: #000000;
		display: grid;
		place-items: center;
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

	@keyframes loading-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
