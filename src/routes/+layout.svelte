<script lang="ts">
	import '$lib/styles/theme.css';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<LoadingScreen />
{@render children()}
