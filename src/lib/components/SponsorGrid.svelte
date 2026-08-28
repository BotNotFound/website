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
				<span class="tier-label tier-{group.tier}">{group.label}</span>
				<span class="tier-count">{group.sponsors.length}</span>
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
		gap: 34px;
	}

	.tier-group {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* Label sits on the rule like a table header. The tier amount lives in the
	   page's legend band, so it is deliberately not repeated here. */
	.tier-header {
		display: flex;
		align-items: baseline;
		gap: 14px;
		flex-wrap: wrap;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--outline);
	}

	.tier-label {
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}

	.tier-label.tier-gold {
		color: var(--primary);
	}

	.tier-label.tier-silver {
		color: var(--on-surface);
	}

	.tier-label.tier-bronze {
		color: var(--on-var);
	}

	.tier-count {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.tier-count::before {
		content: '·';
		margin-right: 10px;
		color: var(--outline);
	}

	.tier-row {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
	}
</style>
