<script lang="ts">
	import SponsorCard from '$lib/components/SponsorCard.svelte';
	import { groupSponsorsByTier } from '$lib/sponsors';
	import type { Sponsor } from '$lib/types';

	let { sponsors }: { sponsors: Sponsor[] } = $props();
	const groups = $derived(groupSponsorsByTier(sponsors));
</script>

<div class="sponsor-grid">
	{#each groups as group (group.tier)}
		<div class="tier-header">
			<span class="tier-chip tier-{group.tier}">{group.label}</span>
			<span class="tier-amount">{group.amount}</span>
		</div>
		{#each group.sponsors as sponsor (sponsor.name)}
			<SponsorCard {sponsor} />
		{/each}
	{/each}
</div>

<style>
	.sponsor-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
		gap: 14px;
	}

	.tier-header {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
		padding: 14px 0 4px;
	}

	.tier-chip {
		border-radius: 999px;
		padding: 8px 20px;
		font-family: var(--font-display);
		font-size: 17px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.tier-chip.tier-gold {
		background: var(--primary);
		color: var(--on-primary);
	}

	.tier-chip.tier-silver {
		background: var(--on-surface);
		color: var(--surface);
	}

	.tier-chip.tier-bronze {
		background: var(--sc-highest);
		color: var(--on-surface);
		border: 1px solid var(--outline);
	}

	.tier-amount {
		font-size: 12.5px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
	}
</style>
