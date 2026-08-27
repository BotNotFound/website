<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);
	let fadingOut = $state(false);

	onMount(() => {
		function finish() {
			fadingOut = true;
			setTimeout(() => {
				visible = false;
			}, 400);
		}

		if (document.readyState === 'complete') {
			finish();
			return;
		}

		window.addEventListener('load', finish);
		return () => window.removeEventListener('load', finish);
	});
</script>

{#if visible}
	<div class="loading-screen" class:fading={fadingOut} aria-hidden="true">
		<img src="/spinner.png" alt="" class="loading-spinner" />
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
