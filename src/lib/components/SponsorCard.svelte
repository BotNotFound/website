<script lang="ts">
	import type { Sponsor } from '$lib/types';

	let { sponsor }: { sponsor: Sponsor } = $props();
</script>

<a class="sponsor-card card" href={sponsor.url} target="_blank" rel="noopener">
	<div
		class="sponsor-logo"
		role="img"
		aria-label={sponsor.name}
		style:background-image={`url('${sponsor.logo ?? '/sponsors/placeholder.png'}')`}
	></div>
	<div class="sponsor-details">
		<div class="sponsor-name">{sponsor.name}</div>
		<div class="sponsor-note">{sponsor.note}</div>
	</div>
</a>

<style>
	.sponsor-card {
		width: 100%;
		height: 100%;
		border-radius: 28px;
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		color: var(--on-surface);
	}

	.sponsor-card:hover {
		border-color: var(--primary);
		color: var(--on-surface);
	}

	.sponsor-logo {
		aspect-ratio: 5 / 3;
		border-radius: 20px;
		background-color: var(--sc);
		border: 1px solid var(--outline);
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		background-origin: content-box;
		padding: 22px;
	}

	.sponsor-details {
		padding: 0 4px 4px;
	}

	.sponsor-name {
		font-size: 15px;
		font-weight: var(--weight-medium);
		margin-bottom: 5px;
	}

	.sponsor-note {
		font-size: 12.5px;
		line-height: 1.5;
		color: var(--on-var);
	}
</style>
