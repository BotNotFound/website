<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import SpecGrid from '$lib/components/SpecGrid.svelte';
	import PhotoPlaceholder from '$lib/components/PhotoPlaceholder.svelte';
	import MissionSection from '$lib/components/MissionSection.svelte';
	import PillarGrid from '$lib/components/PillarGrid.svelte';
	import { teams } from '$lib/data/teams';
	import { teamSelection } from '$lib/state/team.svelte';

	const team = $derived(teams[teamSelection.current]);
</script>

<svelte:head>
	<title>{team.name} · FTC {team.number}</title>
</svelte:head>

<main class="page-main">
	<HeroSection {team} />
	<SpecGrid specs={team.specs} />
	<PhotoPlaceholder label={team.photoSlot} caption={team.photoCaption} />
	<MissionSection {team} />
	<PillarGrid pillars={team.pillars} />
</main>
