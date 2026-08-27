<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { team } from '$lib/data/teams';
	import { HERO_EASE } from './ease';

	let wrapperEl: HTMLDivElement;

	onMount(() => {
		animate(wrapperEl, { opacity: [0, 1], scale: [1.05, 1] }, { duration: 1.8, ease: HERO_EASE });
	});
</script>

<div bind:this={wrapperEl} class="hero-media-backdrop">
	<div class="hero-media-wrapper">
		<div class="hero-media-stage" aria-hidden="true"></div>
		<img class="hero-media-image" src={team.heroImage} alt={team.heroImageAlt} />
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
		top: 50%;
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

	.hero-media-stage {
		position: absolute;
		width: min(62vmin, 620px);
		aspect-ratio: 1;
		border-radius: 50%;
		background: #0e0e0e;
		border: 2px solid var(--primary);
	}

	.hero-media-image {
		position: relative;
		max-width: 68%;
		max-height: 62vmin;
		width: auto;
		height: auto;
		object-fit: contain;
		filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
	}
</style>
