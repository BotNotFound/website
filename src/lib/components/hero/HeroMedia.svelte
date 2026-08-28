<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { HERO_EASE } from './ease';
	import HeroRobotModel from './HeroRobotModel.svelte';
	import HeroTechOverlay from './HeroTechOverlay.svelte';

	let wrapperEl: HTMLDivElement;
	let glowEl: HTMLDivElement;
	let gridEl: HTMLDivElement;

	onMount(() => {
		animate(wrapperEl, { opacity: [0, 1], scale: [1.05, 1] }, { duration: 1.8, ease: HERO_EASE });

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		function handlePointerMove(event: PointerEvent) {
			const nx = (event.clientX / window.innerWidth) * 2 - 1;
			glowEl.style.transform = `translateX(${nx * 26}px)`;
			// Drifts against the glow, and far less, so the grid reads as a plane
			// sitting behind the robot rather than moving with it.
			gridEl.style.transform = `translateX(${nx * -7}px)`;
		}

		window.addEventListener('pointermove', handlePointerMove);
		return () => window.removeEventListener('pointermove', handlePointerMove);
	});
</script>

<div bind:this={wrapperEl} class="hero-media-backdrop">
	<div bind:this={gridEl} class="hero-grid" aria-hidden="true"></div>
	<div bind:this={glowEl} class="hero-glow" aria-hidden="true"></div>
	<div class="hero-media-wrapper">
		<HeroTechOverlay />
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

	/* Engineering grid. Two layers -- fine cells with a heavier line every fifth
	   -- masked to a band so it never reaches the footer copy or the glow. */
	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
		background-size:
			64px 64px,
			64px 64px,
			320px 320px,
			320px 320px;
		-webkit-mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			#000 18%,
			#000 58%,
			transparent 86%
		);
		mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 58%, transparent 86%);
		pointer-events: none;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-glow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 65vh;
		background: radial-gradient(
			ellipse 70% 100% at 50% 0%,
			rgba(255, 43, 38, 0.55) 0%,
			rgba(255, 43, 38, 0.2) 45%,
			transparent 75%
		);
		filter: blur(60px);
		pointer-events: none;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Has to stay at least as wide as .hero-model-frame. If it's narrower the
	   auto grid track grows past the wrapper's right edge rather than centering,
	   which pushes the model off-centre by half the overflow on narrow screens. */
	.hero-media-wrapper {
		position: absolute;
		top: 38%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}

	.hero-model-frame {
		position: relative;
		z-index: 1;
		width: min(97vmin, 920px);
		aspect-ratio: 1;
	}
</style>
