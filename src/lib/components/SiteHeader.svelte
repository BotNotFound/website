<script lang="ts">
	import { page } from '$app/state';
	import { team } from '$lib/data/teams';

	const pageLinks = [
		{ href: '/', label: 'home' },
		{ href: '/history', label: 'history' },
		{ href: '/sponsors', label: 'sponsors' }
	];

	function isActive(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}
</script>

<header class="site-header">
	<div class="header-inner">
		<a class="team-identity" href="/">
			<img class="team-logo" src="/logo.png" alt="{team.name} logo" />
			<span class="team-text">
				<span class="team-name heading-display">{team.name}</span>
				<span class="team-meta">FTC {team.number} · Redmond WA</span>
			</span>
		</a>

		<nav class="nav-row">
			{#each pageLinks as link (link.href)}
				<a href={link.href} class="nav-link" class:active={isActive(link.href)}>{link.label}</a>
			{/each}
		</nav>

		<div class="header-spacer" aria-hidden="true"></div>
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
		align-items: center;
		gap: 12px;
		min-width: 0;
	}

	.team-logo {
		width: 32px;
		height: 32px;
		flex: none;
		object-fit: contain;
	}

	.team-text {
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

	.header-spacer {
		justify-self: end;
	}
</style>
