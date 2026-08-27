<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { HERO_EASE } from './ease';
	import HeroRobotModel from './HeroRobotModel.svelte';

	let wrapperEl: HTMLDivElement;

	onMount(() => {
		animate(wrapperEl, { opacity: [0, 1], scale: [1.05, 1] }, { duration: 1.8, ease: HERO_EASE });
	});
</script>

<div bind:this={wrapperEl} class="hero-media-backdrop">
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
		width: min(70vmin, 700px);
		aspect-ratio: 1;
		filter: drop-shadow(0 20px 40px rgba(255, 255, 255, 0.15));
	}
</style>
