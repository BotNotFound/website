<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();
</script>

<div class="app-shell">
	<SiteHeader />

	{@render children()}

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
