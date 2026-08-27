<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { HERO_EASE } from './ease';
	import HeroRobotModel from './HeroRobotModel.svelte';

	let wrapperEl: HTMLDivElement;
	let glowEl: HTMLDivElement;

	onMount(() => {
		animate(wrapperEl, { opacity: [0, 1], scale: [1.05, 1] }, { duration: 1.8, ease: HERO_EASE });

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		function handlePointerMove(event: PointerEvent) {
			const nx = (event.clientX / window.innerWidth) * 2 - 1;
			const ny = (event.clientY / window.innerHeight) * 2 - 1;
			glowEl.style.transform = `translate(calc(-50% + ${nx * 24}px), ${ny * 14}px)`;
		}

		window.addEventListener('pointermove', handlePointerMove);
		return () => window.removeEventListener('pointermove', handlePointerMove);
	});
</script>

<div bind:this={wrapperEl} class="hero-media-backdrop">
	<div bind:this={glowEl} class="hero-glow" aria-hidden="true"></div>
	<div class="hero-media-wrapper">
		<div class="hero-model-frame">
			<HeroRobotModel />
		</div>
	</div>
</div>

<style>
	.hero-media-backdrop {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-glow {
		position: absolute;
		top: -10%;
		left: 50%;
		transform: translate(-50%, 0);
		width: min(1100px, 140vw);
		aspect-ratio: 1;
		background: radial-gradient(
			closest-side,
			rgba(255, 43, 38, 0.55) 0%,
			rgba(255, 43, 38, 0.22) 45%,
			transparent 75%
		);
		filter: blur(70px);
		pointer-events: none;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-media-wrapper {
		position: absolute;
		top: 38%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 80%;
		display: grid;
		place-items: center;
	}

	@media (min-width: 768px) {
		.hero-media-wrapper {
			width: 100%;
			height: 100%;
		}
	}

	.hero-model-frame {
		position: relative;
		z-index: 1;
		width: min(50vmin, 480px);
		aspect-ratio: 1;
	}
</style>
