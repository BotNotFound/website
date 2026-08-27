<script lang="ts">
	import '$lib/styles/theme.css';
	import favicon from '$lib/assets/favicon.svg';
	import EmojiBackground from '$lib/components/EmojiBackground.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import MottoBanner from '$lib/components/MottoBanner.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { teams } from '$lib/data/teams';
	import { teamSelection } from '$lib/state/team.svelte';

	let { children } = $props();

	const team = $derived(teams[teamSelection.current]);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@200..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<EmojiBackground />

<div data-team={team.key} class="app-shell">
	<SiteHeader />

	{@render children()}

	<MottoBanner words={team.motto} />
	<SiteFooter />
</div>

<style>
	.app-shell {
		position: relative;
		min-height: 100vh;
		color: var(--on-surface);
		overflow-x: hidden;
	}
</style>
