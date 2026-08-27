<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import MottoBanner from '$lib/components/MottoBanner.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { team } from '$lib/data/teams';

	let { children } = $props();
</script>

<div class="app-shell">
	<SiteHeader />

	{@render children()}

	<MottoBanner words={team.motto} />
	<SiteFooter />
</div>

<style>
	.app-shell {
		position: relative;
		min-height: 100vh;
		background: var(--surface);
		color: var(--on-surface);
		overflow-x: hidden;
	}
</style>
