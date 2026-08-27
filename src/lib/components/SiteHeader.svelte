<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { page } from '$app/state';
	import { team } from '$lib/data/teams';

	const EASE = [0.16, 1, 0.3, 1] as const;

	const allPages = [
		{ href: '/', label: 'Home' },
		{ href: '/history', label: 'History' },
		{ href: '/sponsors', label: 'Sponsors' }
	];

	const otherPages = $derived(allPages.filter((item) => item.href !== page.url.pathname));
	const isHome = $derived(page.url.pathname === '/');

	let navEl: HTMLElement;
	let menuOpen = $state(false);
	let menuEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		animate(navEl, { opacity: [0, 1], y: [-16, 0] }, { duration: 0.8, ease: EASE });
	});

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	$effect(() => {
		if (!menuOpen) return;

		function handlePointerDown(event: PointerEvent) {
			if (menuEl && !menuEl.contains(event.target as Node)) menuOpen = false;
		}
		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') menuOpen = false;
		}

		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<nav bind:this={navEl} class="site-navbar" class:transparent={isHome}>
	<div class="navbar-left">
		<a class="brand" href="/">
			<img class="logo" src="/logo.png" alt="{team.name} logo" />
			<span class="brand-text">{team.name}</span>
		</a>

		<div class="tags-pill">
			<span>FTC {team.number}</span>
			<span class="tags-divider" aria-hidden="true"></span>
			<span>Redmond WA</span>
		</div>
	</div>

	<div class="navbar-right">
		<a
			class="icon-button"
			href="https://instagram.com/clubrhsrobotics"
			target="_blank"
			rel="noopener"
			aria-label="Bot Not Found on Instagram"
		>
			<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6" />
				<circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6" />
				<circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
			</svg>
		</a>

		<div class="page-menu" bind:this={menuEl}>
			<button
				type="button"
				class="icon-button"
				aria-haspopup="menu"
				aria-expanded={menuOpen}
				aria-label="Site pages"
				onclick={toggleMenu}
			>
				<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<line
						x1="4"
						y1="7"
						x2="20"
						y2="7"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
					/>
					<line
						x1="4"
						y1="12"
						x2="20"
						y2="12"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
					/>
					<line
						x1="4"
						y1="17"
						x2="20"
						y2="17"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
					/>
				</svg>
			</button>

			{#if menuOpen}
				<div class="page-popup" role="menu">
					{#each otherPages as item (item.href)}
						<a href={item.href} role="menuitem" onclick={() => (menuOpen = false)}>{item.label}</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</nav>

<style>
	.site-navbar {
		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		padding: 16px;
		background: #000000;
	}

	.site-navbar.transparent {
		background: transparent;
	}

	@media (min-width: 768px) {
		.site-navbar {
			padding: 24px 32px;
		}
	}

	.navbar-left,
	.navbar-right {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	@media (min-width: 768px) {
		.navbar-left,
		.navbar-right {
			gap: 14px;
		}
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.logo {
		width: 26px;
		height: 26px;
		flex: none;
		object-fit: contain;
	}

	.brand-text {
		display: none;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: #fff;
	}

	@media (min-width: 768px) {
		.brand-text {
			display: inline;
		}
	}

	.tags-pill {
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
		.tags-pill {
			display: flex;
		}
	}

	.tags-divider {
		width: 1px;
		height: 10px;
		background: rgba(255, 255, 255, 0.15);
	}

	.page-menu {
		position: relative;
	}

	.icon-button {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #1c1c1e;
		border: none;
		display: grid;
		place-items: center;
		color: #fff;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	@media (min-width: 768px) {
		.icon-button {
			width: 40px;
			height: 40px;
		}
	}

	.icon-button:hover,
	.icon-button[aria-expanded='true'] {
		background: #2c2c2e;
	}

	.icon-button svg {
		width: 16px;
		height: 16px;
	}

	.page-popup {
		position: absolute;
		top: calc(100% + 10px);
		right: 0;
		min-width: 160px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		background: #1c1c1e;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		padding: 8px;
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
	}

	.page-popup a {
		padding: 10px 12px;
		border-radius: 10px;
		font-size: 13px;
		color: #fff;
	}

	.page-popup a:hover {
		background: rgba(255, 255, 255, 0.08);
	}
</style>
