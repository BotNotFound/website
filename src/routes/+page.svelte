<script lang="ts">
	import HeroNavbar from '$lib/components/hero/HeroNavbar.svelte';
	import HeroMedia from '$lib/components/hero/HeroMedia.svelte';
	import HeroFooter from '$lib/components/hero/HeroFooter.svelte';
	import { team } from '$lib/data/teams';
</script>

<svelte:head>
	<title>{team.name} · FTC {team.number}</title>
</svelte:head>

<div class="hero-page">
	<HeroNavbar />
	<HeroMedia />
	<HeroFooter />
</div>

<style>
	.hero-page {
		position: relative;
		min-height: 100vh;
		background: #ffffff;
		color: #000000;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		font-family: var(--font-body);
	}
</style>
