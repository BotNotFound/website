<script lang="ts">
	import { page } from '$app/state';
	import { teams } from '$lib/data/teams';
	import { teamSelection } from '$lib/state/team.svelte';
	import type { TeamKey } from '$lib/types';

	const team = $derived(teams[teamSelection.current]);

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'History', href: '/history' },
		{ label: 'Sponsors', href: '/sponsors' }
	];

	function isActive(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}

	function selectTeam(key: TeamKey) {
		teamSelection.select(key);
	}
</script>

<div class="header-shell">
	<div class="header-bar panel">
		<a class="brand" href="/">
			<span class="brand-mark">?</span>
			<span class="brand-text">
				<span class="brand-name heading-display">{team.name}</span>
				<span class="brand-meta">FTC {team.number} · Redmond WA</span>
			</span>
		</a>

		<div class="header-controls">
			<nav class="nav-pill">
				{#each navItems as item (item.href)}
					<a href={item.href} class="nav-link" class:active={isActive(item.href)}>{item.label}</a>
				{/each}
			</nav>

			<div class="team-pill">
				{#each Object.values(teams) as t (t.key)}
					<button
						type="button"
						class="team-tab"
						class:active={teamSelection.current === t.key}
						onclick={() => selectTeam(t.key)}
					>
						<span class="team-tab-name">{t.name}</span>
						<span class="team-tab-number">{t.number}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.header-shell {
		position: sticky;
		top: 0;
		z-index: 30;
		padding: 16px 20px 10px;
		background: linear-gradient(to bottom, var(--surface) 62%, transparent);
	}

	.header-bar {
		max-width: var(--page-max);
		margin: 0 auto;
		background: var(--sc-high);
		padding: 12px 16px 12px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 18px;
		min-width: 0;
	}

	.brand-mark {
		width: 56px;
		height: 56px;
		border-radius: 999px;
		background: var(--primary);
		display: grid;
		place-items: center;
		flex: none;
		font-family: var(--font-display);
		font-size: 30px;
		font-weight: 700;
		color: var(--on-primary);
		line-height: 1;
	}

	.brand-text {
		display: flex;
		flex-direction: column;
		gap: 5px;
		min-width: 0;
	}

	.brand-name {
		font-size: clamp(20px, 2.2vw, 30px);
		line-height: 1.05;
		white-space: nowrap;
	}

	.brand-meta {
		font-size: 11.5px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.header-controls {
		display: flex;
		align-items: center;
		gap: 18px;
		flex-wrap: wrap;
	}

	.nav-pill,
	.team-pill {
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--sc-low);
		border-radius: 999px;
		padding: 5px;
	}

	.team-pill {
		align-items: stretch;
	}

	.nav-link {
		font-size: 13.5px;
		font-weight: 500;
		padding: 10px 20px;
		border-radius: 999px;
		background: transparent;
		color: var(--on-var);
		transition: background 0.2s ease;
	}

	.nav-link:hover {
		background: var(--sc-highest);
		color: var(--on-surface);
	}

	.nav-link.active {
		background: var(--p-container);
		color: var(--on-p-container);
	}

	.nav-link.active:hover {
		background: var(--p-container);
		color: var(--on-p-container);
	}

	.team-tab {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 3px;
		padding: 9px 18px;
		border: none;
		border-radius: 999px;
		cursor: pointer;
		text-align: left;
		background: transparent;
		color: var(--on-var);
		transition: all 0.22s cubic-bezier(0.2, 0, 0, 1);
	}

	.team-tab.active {
		background: var(--primary);
		color: var(--on-primary);
	}

	.team-tab-name {
		font-family: var(--font-display);
		font-size: 12px;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.team-tab-number {
		font-size: 10px;
		letter-spacing: 0.09em;
		opacity: 0.75;
	}
</style>
