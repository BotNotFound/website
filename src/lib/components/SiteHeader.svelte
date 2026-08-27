<script lang="ts">
	import { page } from '$app/state';
	import { teams } from '$lib/data/teams';
	import { teamSelection } from '$lib/state/team.svelte';
	import type { TeamKey } from '$lib/types';

	const team = $derived(teams[teamSelection.current]);

	const pageLinks = [
		{ href: '/', label: 'home' },
		{ href: '/history', label: 'history' },
		{ href: '/sponsors', label: 'sponsors' }
	];

	function isActive(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}

	let menuOpen = $state(false);
	let menuEl: HTMLDivElement | undefined = $state();

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function selectTeam(key: TeamKey) {
		teamSelection.select(key);
		menuOpen = false;
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

<header class="site-header">
	<div class="header-inner">
		<a class="team-identity" href="/">
			<span class="team-name heading-display">{team.name}</span>
			<span class="team-meta">FTC {team.number} · Redmond WA</span>
		</a>

		<nav class="nav-row">
			{#each pageLinks as link (link.href)}
				<a href={link.href} class="nav-link" class:active={isActive(link.href)}>{link.label}</a>
			{/each}
		</nav>

		<div class="team-menu" bind:this={menuEl}>
			<button
				type="button"
				class="menu-toggle"
				aria-haspopup="menu"
				aria-expanded={menuOpen}
				aria-label="Switch team site"
				onclick={toggleMenu}
			>
				<svg viewBox="0 0 24 24" fill="none">
					<line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
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
				<div class="team-popup" role="menu">
					<div class="team-popup-label">switch team site</div>
					{#each Object.values(teams) as t (t.key)}
						<button
							type="button"
							role="menuitem"
							class="team-option"
							class:active={teamSelection.current === t.key}
							onclick={() => selectTeam(t.key)}
						>
							<span class="team-option-name">{t.name}</span>
							<span class="team-option-number">{t.number}</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 30;
		background: #000000;
		border-bottom: 1px solid var(--outline);
	}

	.header-inner {
		max-width: var(--page-max);
		margin: 0 auto;
		padding: 18px 20px;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 20px;
	}

	.team-identity {
		justify-self: start;
		display: flex;
		flex-direction: column;
		gap: 5px;
		min-width: 0;
	}

	.team-name {
		font-size: clamp(19px, 2.2vw, 28px);
		line-height: 1.05;
		white-space: nowrap;
	}

	.team-meta {
		font-size: 11.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.nav-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 56px;
		flex-wrap: wrap;
	}

	.nav-link {
		background: none;
		border: none;
		padding: 4px 0;
		margin: 0;
		font-size: 18px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.01em;
		text-transform: lowercase;
		color: var(--on-var);
		cursor: pointer;
		transition:
			color 0.2s ease,
			text-shadow 0.2s ease;
	}

	.nav-link:hover {
		color: var(--on-surface);
		text-shadow:
			0 0 14px currentColor,
			0 0 4px currentColor;
	}

	.nav-link.active {
		color: var(--primary);
		text-shadow:
			0 0 16px var(--primary),
			0 0 5px var(--primary);
	}

	.team-menu {
		position: relative;
		justify-self: end;
	}

	.menu-toggle {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border: none;
		border-radius: var(--radius-full);
		background: none;
		color: var(--on-var);
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.menu-toggle svg {
		width: 22px;
		height: 22px;
	}

	.menu-toggle:hover,
	.menu-toggle[aria-expanded='true'] {
		background: var(--sc-high);
		color: var(--on-surface);
	}

	.team-popup {
		position: absolute;
		top: calc(100% + 10px);
		right: 0;
		min-width: 240px;
		background: var(--sc-high);
		border: 1px solid var(--outline);
		border-radius: var(--radius-card);
		padding: 8px;
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
	}

	.team-popup-label {
		padding: 8px 10px 6px;
		font-size: 10.5px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.team-option {
		width: 100%;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: 10px;
		border: none;
		border-radius: calc(var(--radius-card) - 8px);
		background: none;
		color: var(--on-surface);
		text-align: left;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.team-option:hover {
		background: var(--sc-highest);
	}

	.team-option-name {
		font-size: 14px;
		font-weight: var(--weight-regular);
	}

	.team-option-number {
		font-size: 12px;
		color: var(--on-var);
	}

	.team-option.active .team-option-name,
	.team-option.active .team-option-number {
		color: var(--primary);
	}
</style>
