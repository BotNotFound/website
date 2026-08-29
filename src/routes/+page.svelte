<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import HeroMedia from '$lib/components/hero/HeroMedia.svelte';
	import HeroFooter from '$lib/components/hero/HeroFooter.svelte';
	import { team } from '$lib/data/teams';
</script>

<svelte:head>
	<title>{team.name} · FTC {team.number}</title>
</svelte:head>

<div class="hero-page">
	<SiteHeader />
	<HeroMedia />
	<HeroFooter />
</div>

<style>
	.hero-page {
		position: relative;
		min-height: 100vh;
		background: #000000;
		color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: clip;
		font-family: var(--font-body);
	}
</style>
