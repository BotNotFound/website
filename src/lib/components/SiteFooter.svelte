<script lang="ts">
	import { teams, siblingOf } from '$lib/data/teams';
	import { teamSelection } from '$lib/state/team.svelte';

	const team = $derived(teams[teamSelection.current]);
	const sibling = $derived(teams[siblingOf(teamSelection.current)]);
</script>

<footer class="footer-shell">
	<div class="footer panel">
		<div>
			<div class="footer-team-name heading-display">{team.name}</div>
			<div class="footer-team-meta">
				FTC {team.number}<br />Redmond High School, Redmond WA
			</div>
		</div>

		<div>
			<div class="footer-label">Join the club</div>
			<div class="footer-team-meta footer-contact">
				Wednesdays, 2:00–3:30 · Room E220<br />
				<a href="mailto:rhs_robotics@outlook.com">rhs_robotics@outlook.com</a><br />
				<a href="https://instagram.com/clubrhsrobotics">@clubrhsrobotics</a>
			</div>
		</div>

		<div>
			<div class="footer-label">Sister team</div>
			<button type="button" class="sibling-button" onclick={() => teamSelection.select(sibling.key)}>
				{sibling.name} · {sibling.number}
			</button>
		</div>

		<div class="footer-legal">
			<div>FIRST® Tech Challenge</div>
			<div>Not affiliated with FIRST®</div>
			<div>© 2026</div>
		</div>
	</div>
</footer>

<style>
	.footer-shell {
		max-width: var(--page-max);
		margin: 20px auto 0;
		padding: 0 20px 20px;
	}

	.footer {
		background: var(--sc-high);
		padding: 44px 48px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: 32px 48px;
		align-items: start;
	}

	.footer-team-name {
		font-size: 20px;
		line-height: 1.3;
		margin-bottom: 14px;
	}

	.footer-team-meta {
		font-size: 13.5px;
		color: var(--on-var);
		line-height: 1.75;
	}

	.footer-contact {
		line-height: 1.9;
	}

	.footer-label {
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--primary);
		margin-bottom: 12px;
	}

	.sibling-button {
		display: inline-flex;
		align-items: center;
		background: var(--sc-low);
		border: 1px solid var(--outline);
		border-radius: 999px;
		padding: 12px 22px;
		font-size: 13.5px;
		font-weight: 600;
		color: var(--on-surface);
		cursor: pointer;
	}

	.sibling-button:hover {
		background: var(--sc-highest);
	}

	.footer-legal {
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
		line-height: 2;
	}
</style>
