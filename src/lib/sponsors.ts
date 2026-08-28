import type { Sponsor, SponsorTier } from '$lib/types';

export interface TierGroup {
	tier: SponsorTier;
	label: string;
	amount: string;
	sponsors: Sponsor[];
}

/** Every tier, in display order. Exported for the sponsors page legend, which
    lists all three including any that currently have no sponsors -- it is a
    pitch to prospective sponsors, so an empty tier still needs to appear. */
export const SPONSOR_TIERS: { tier: SponsorTier; label: string; amount: string }[] = [
	{ tier: 'gold', label: 'Gold', amount: '$1,000 and above' },
	{ tier: 'silver', label: 'Silver', amount: '$500 and above' },
	{ tier: 'bronze', label: 'Bronze', amount: '$100 and above' }
];

export function groupSponsorsByTier(sponsors: Sponsor[]): TierGroup[] {
	return SPONSOR_TIERS.map(({ tier, label, amount }) => ({
		tier,
		label,
		amount,
		sponsors: sponsors.filter((s) => s.tier === tier)
	})).filter((group) => group.sponsors.length > 0);
}
