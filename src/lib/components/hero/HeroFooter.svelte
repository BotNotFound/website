<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { team } from '$lib/data/teams';
	import { HERO_EASE } from './ease';

	let wrapperEl: HTMLDivElement;
	let subtitleEl: HTMLDivElement;
	let headingEl: HTMLHeadingElement;
	let buttonsEl: HTMLDivElement;

	onMount(() => {
		animate(
			wrapperEl,
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 1, delay: 0.5, ease: HERO_EASE }
		);
		animate(
			subtitleEl,
			{ opacity: [0, 1], y: [16, 0] },
			{ duration: 0.8, delay: 0.6, ease: HERO_EASE }
		);
		animate(
			headingEl,
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 0.8, delay: 0.8, ease: HERO_EASE }
		);
		animate(
			buttonsEl,
			{ opacity: [0, 1], y: [16, 0] },
			{ duration: 0.8, delay: 1.0, ease: HERO_EASE }
		);
	});
</script>

<div bind:this={wrapperEl} class="hero-footer">
	<div class="hero-footer-inner">
		<div class="hero-footer-left">
			<div bind:this={subtitleEl} class="hero-subtitle">
				<span class="hero-dot" aria-hidden="true"></span>
				{team.eyebrow}
			</div>

			<h1 bind:this={headingEl} class="hero-heading">
				{team.heroLine} <em>{team.heroEm}</em>
			</h1>

			<div bind:this={buttonsEl} class="hero-buttons">
				<a href="/history" class="hero-btn-primary">History</a>
				<a href="/sponsors" class="hero-btn-secondary">Sponsors</a>
			</div>
		</div>

		<div class="hero-footer-right">
			<span class="hero-tag">Redshift V2</span>
		</div>
	</div>
</div>

<style>
	.hero-footer {
		position: relative;
		z-index: 30;
		margin-top: auto;
		width: 100%;
		padding: 96px 16px 24px;
	}

	@media (min-width: 768px) {
		.hero-footer {
			padding: 160px 32px 40px;
		}
	}

	.hero-footer-inner {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.hero-footer-inner {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
		}
	}

	.hero-footer-left {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.hero-subtitle {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.55);
	}

	.hero-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #fff;
		flex: none;
	}

	.hero-heading {
		margin: 0;
		max-width: 14ch;
		font-weight: 300;
		letter-spacing: -0.03em;
		line-height: 1.05;
		color: #fff;
		font-size: clamp(2rem, 8vw, 4.5rem);
	}

	.hero-heading em {
		font-style: normal;
		color: var(--primary);
	}

	@media (min-width: 768px) {
		.hero-heading {
			font-size: clamp(2.5rem, 5.5vw, 4.5rem);
		}
	}

	.hero-buttons {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.hero-btn-primary,
	.hero-btn-secondary {
		display: inline-flex;
		align-items: center;
		font-size: 13px;
		font-weight: 500;
		padding: 14px 24px;
		border-radius: 999px;
		cursor: pointer;
		font-family: inherit;
	}

	.hero-btn-primary {
		background: #fff;
		color: #000;
		border: none;
	}

	.hero-btn-primary:hover {
		color: #000;
	}

	.hero-btn-secondary {
		background: transparent;
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.35);
	}

	.hero-btn-secondary:hover {
		color: #fff;
	}

	.hero-footer-right {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.hero-tag {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 8px 16px;
		border-radius: 999px;
		background: #000;
		color: rgba(255, 255, 255, 0.7);
	}
</style>
