<script lang="ts">
	import type { TeamData } from '$lib/types';

	let { team }: { team: TeamData } = $props();
</script>

<section class="hero panel">
	<div class="hero-copy">
		<div class="eyebrow">{team.eyebrow}</div>
		<h1 class="heading-display hero-title">
			{team.heroLine} <em class="hero-em">{team.heroEm}</em>
		</h1>
		<p class="hero-intro">{team.intro}</p>
	</div>

	<div class="hero-art">
		<div class="hero-ring"></div>
		{#key team.key}
			<img class="hero-image" src={team.heroImage} alt={team.heroImageAlt} />
		{/key}
	</div>
</section>

<style>
	.hero {
		padding: 56px 52px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 40px 52px;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.hero-copy {
		position: relative;
		z-index: 2;
	}

	.hero-title {
		font-size: clamp(26px, 3.2vw, 46px);
		line-height: 1.2;
		letter-spacing: -0.01em;
		margin: 26px 0;
		text-wrap: balance;
	}

	.hero-em {
		font-style: normal;
		color: var(--primary);
	}

	.hero-intro {
		font-size: 17px;
		line-height: 1.65;
		color: var(--on-var);
		max-width: 48ch;
		margin: 0;
		text-wrap: pretty;
	}

	.hero-art {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 380px;
	}

	.hero-ring {
		position: absolute;
		width: 88%;
		aspect-ratio: 1;
		border-radius: 999px;
		background: var(--sc-high);
		border: 2px solid var(--primary);
	}

	.hero-image {
		position: relative;
		max-width: 100%;
		max-height: 500px;
		object-fit: contain;
		animation: fade-in 1.1s ease both;
		filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.55));
	}
</style>
