<script lang="ts">
	import SeasonCard from '$lib/components/SeasonCard.svelte';
	import { teams } from '$lib/data/teams';
	import { teamSelection } from '$lib/state/team.svelte';

	const team = $derived(teams[teamSelection.current]);
</script>

<svelte:head>
	<title>History · {team.name}</title>
</svelte:head>

<main class="page-main">
	<section class="history-intro panel">
		<div>
			<div class="eyebrow">History</div>
			<h1 class="heading-display history-title">{team.historyTitle}</h1>
		</div>
		<p class="body-copy history-lede">{team.historyIntro}</p>
	</section>

	{#each team.seasons as season (season.years)}
		<SeasonCard {season} />
	{/each}
</main>

<style>
	.history-intro {
		padding: 52px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 28px 52px;
		align-items: end;
	}

	.history-title {
		font-size: clamp(26px, 3.4vw, 46px);
		line-height: 1.15;
		letter-spacing: -0.015em;
		margin: 24px 0 0;
	}

	.history-lede {
		max-width: 48ch;
	}
</style>
