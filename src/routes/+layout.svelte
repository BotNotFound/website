<script lang="ts">
	import '$lib/styles/theme.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/logo.png" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@200..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
