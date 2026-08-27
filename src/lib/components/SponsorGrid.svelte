<script lang="ts">
	import SponsorCard from '$lib/components/SponsorCard.svelte';
	import { groupSponsorsByTier } from '$lib/sponsors';
	import type { Sponsor } from '$lib/types';

	let { sponsors }: { sponsors: Sponsor[] } = $props();
	const groups = $derived(groupSponsorsByTier(sponsors));
</script>

<div class="sponsor-tiers">
	{#each groups as group (group.tier)}
		<div class="tier-group">
			<div class="tier-header">
				<span class="tier-chip tier-{group.tier}">{group.label}</span>
				<span class="tier-amount">{group.amount}</span>
			</div>
			<div class="tier-row">
				{#each group.sponsors as sponsor (sponsor.name)}
					<SponsorCard {sponsor} />
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.sponsor-tiers {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.tier-row {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
	}

	.tier-header {
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
		padding: 14px 0 4px;
	}

	.tier-chip {
		padding-bottom: 6px;
		border-bottom: 2px solid currentColor;
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.tier-chip.tier-gold {
		color: var(--primary);
	}

	.tier-chip.tier-silver {
		color: var(--on-surface);
	}

	.tier-chip.tier-bronze {
		color: var(--on-var);
		border-bottom-color: var(--outline);
	}

	.tier-amount {
		font-size: 12.5px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
	}
</style>
