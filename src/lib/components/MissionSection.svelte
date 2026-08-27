<script lang="ts">
	import type { TeamData } from '$lib/types';

	let { team }: { team: TeamData } = $props();
</script>

<section class="mission panel">
	<div class="mission-label">
		<h2 class="section-kicker">Mission</h2>
		<div class="mission-attr">{team.missionAttr}</div>
	</div>
	<div class="mission-copy">
		<p class="mission-big">{team.missionBig}</p>
		<p class="body-copy mission-tail">{team.missionTail}</p>
	</div>
</section>

<style>
	.mission {
		padding: 52px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 32px 52px;
	}

	.mission-attr {
		display: inline-flex;
		background: var(--sc-high);
		border-radius: 999px;
		padding: 7px 15px;
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.mission-copy {
		grid-column: span 2;
		min-width: 0;
	}

	.mission-big {
		font-size: clamp(19px, 2vw, 27px);
		font-weight: 500;
		line-height: 1.42;
		letter-spacing: -0.01em;
		margin: 0 0 26px;
		max-width: 40ch;
		text-wrap: pretty;
	}

	.mission-tail {
		max-width: 62ch;
	}
</style>
