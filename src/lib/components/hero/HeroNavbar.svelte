<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { team } from '$lib/data/teams';
	import { HERO_EASE } from './ease';

	let navEl: HTMLElement;

	onMount(() => {
		animate(navEl, { opacity: [0, 1], y: [-16, 0] }, { duration: 0.8, ease: HERO_EASE });
	});
</script>

<nav bind:this={navEl} class="hero-navbar">
	<div class="hero-navbar-left">
		<a class="hero-brand" href="/">
			<span class="hero-logo" style:background={`var(--primary)`}>?</span>
			<span class="hero-brand-text">{team.name}</span>
		</a>

		<button type="button" class="hero-menu-pill">
			<span class="hero-menu-icon">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="3" stroke-linecap="round" />
				</svg>
			</span>
			<span class="hero-menu-label">Menu</span>
		</button>

		<div class="hero-tags-pill">
			<span>FTC {team.number}</span>
			<span class="hero-tags-divider" aria-hidden="true"></span>
			<span>Redmond WA</span>
		</div>
	</div>
</nav>

<style>
	.hero-navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		padding: 16px;
		pointer-events: none;
	}

	@media (min-width: 768px) {
		.hero-navbar {
			padding: 24px 32px;
		}
	}

	.hero-navbar-left {
		display: flex;
		align-items: center;
		gap: 10px;
		pointer-events: auto;
	}

	@media (min-width: 768px) {
		.hero-navbar-left {
			gap: 14px;
		}
	}

	.hero-brand {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.hero-logo {
		width: 22px;
		height: 22px;
		flex: none;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-size: 12px;
		font-weight: 700;
		color: #fff;
	}

	.hero-brand-text {
		display: none;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: #fff;
	}

	@media (min-width: 768px) {
		.hero-brand-text {
			display: inline;
		}
	}

	.hero-menu-pill {
		display: flex;
		align-items: center;
		gap: 8px;
		background: #fff;
		border: none;
		border-radius: 999px;
		padding: 4px 14px 4px 4px;
		cursor: pointer;
		font-family: inherit;
	}

	.hero-menu-icon {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #000;
		display: grid;
		place-items: center;
		flex: none;
	}

	@media (min-width: 768px) {
		.hero-menu-icon {
			width: 32px;
			height: 32px;
		}
	}

	.hero-menu-label {
		font-size: 11px;
		color: #000;
	}

	.hero-tags-pill {
		display: none;
		align-items: center;
		gap: 10px;
		background: #1c1c1e;
		border-radius: 999px;
		padding: 8px 16px;
		font-size: 11px;
		color: rgba(255, 255, 255, 0.65);
	}

	@media (min-width: 768px) {
		.hero-tags-pill {
			display: flex;
		}
	}

	.hero-tags-divider {
		width: 1px;
		height: 10px;
		background: rgba(255, 255, 255, 0.15);
	}
</style>
