import type { Sponsor, SponsorTier } from '$lib/types';

export interface TierGroup {
	tier: SponsorTier;
	label: string;
	amount: string;
	sponsors: Sponsor[];
}

const TIER_ORDER: { tier: SponsorTier; label: string; amount: string }[] = [
	{ tier: 'gold', label: 'Gold', amount: '$1,000 and above' },
	{ tier: 'silver', label: 'Silver', amount: '$500 and above' },
	{ tier: 'bronze', label: 'Bronze', amount: '$100 and above' }
];

export function groupSponsorsByTier(sponsors: Sponsor[]): TierGroup[] {
	return TIER_ORDER.map(({ tier, label, amount }) => ({
		tier,
		label,
		amount,
		sponsors: sponsors.filter((s) => s.tier === tier)
	})).filter((group) => group.sponsors.length > 0);
}
