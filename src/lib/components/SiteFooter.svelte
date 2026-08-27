<script lang="ts">
	import { teams, siblingOf } from '$lib/data/teams';
	import { teamSelection } from '$lib/state/team.svelte';

	const team = $derived(teams[teamSelection.current]);
	const sibling = $derived(teams[siblingOf(teamSelection.current)]);
</script>

<footer class="site-footer">
	<div class="footer-bar">
		<button
			type="button"
			class="team-switch"
			onclick={() => teamSelection.select(sibling.key)}
			aria-label={`Switch to ${sibling.name}`}
			title={`Switch to sister team: ${sibling.name} · ${sibling.number}`}
		>
			{team.name}
			<svg class="chevron" viewBox="0 0 24 24" fill="none">
				<path
					d="M6 9l6 6 6-6"
					stroke="currentColor"
					stroke-width="1.6"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		<nav class="footer-links">
			<a href="/">home</a>
			<a href="/history">history</a>
			<a href="/sponsors">sponsors</a>
			<a href="mailto:rhs_robotics@outlook.com">email</a>
			<a href="https://instagram.com/clubrhsrobotics" target="_blank" rel="noopener">instagram</a>
		</nav>

		<div class="footer-copyright">© 2026 {team.name}</div>
	</div>

	<div class="footer-fine-print">
		Wednesdays, 2:00–3:30 · Room E220 · Redmond High School, Redmond WA · FIRST® Tech Challenge ·
		Not affiliated with FIRST®
	</div>
</footer>

<style>
	.site-footer {
		margin-top: 40px;
		background: var(--sc-low);
		border-top: 1px solid var(--outline);
	}

	.footer-bar {
		max-width: var(--page-max);
		margin: 0 auto;
		padding: 22px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
	}

	.team-switch {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		padding: 0;
		font-size: 13.5px;
		font-weight: var(--weight-regular);
		color: var(--on-surface);
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.team-switch:hover {
		color: var(--primary);
	}

	.chevron {
		width: 14px;
		height: 14px;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 28px;
		flex-wrap: wrap;
	}

	.footer-links a {
		font-size: 13px;
		font-weight: var(--weight-light);
		text-transform: lowercase;
		color: var(--on-var);
	}

	.footer-links a:hover {
		color: var(--on-surface);
	}

	.footer-copyright {
		font-size: 12.5px;
		font-weight: var(--weight-light);
		color: var(--on-var);
		white-space: nowrap;
	}

	.footer-fine-print {
		max-width: var(--page-max);
		margin: 0 auto;
		padding: 0 20px 22px;
		font-size: 11px;
		font-weight: var(--weight-light);
		letter-spacing: 0.02em;
		color: var(--on-var);
		opacity: 0.7;
	}
</style>
