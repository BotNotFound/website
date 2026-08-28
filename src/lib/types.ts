export interface Spec {
	k: string;
	v: string;
}

export interface Pillar {
	n: string;
	title: string;
	body: string;
}

export interface SeasonLogEntry {
	k: string;
	v: string;
}

export interface Season {
	/** Stable URL fragment, e.g. "season-2025-26". Deliberately not derived from
	    `years` so the anchor never depends on the en dash in the display string. */
	id: string;
	years: string;
	tag: string;
	game: string;
	body: string;
	log: SeasonLogEntry[];
	photo: string;
	fig: string;
}

export type SponsorTier = 'gold' | 'silver' | 'bronze';

export interface Sponsor {
	tier: SponsorTier;
	name: string;
	note: string;
	url: string;
	/** Path under /sponsors, e.g. "/sponsors/microsoft.png". Omitted when the team has no logo art yet. */
	logo?: string;
}

export interface Partner {
	name: string;
	note: string;
}

export interface TeamData {
	name: string;
	number: string;
	eyebrow: string;
	heroLine: string;
	heroEm: string;
	intro: string;
	specs: Spec[];
	photoSlot: string;
	photoCaption: string;
	missionBig: string;
	missionAttr: string;
	missionTail: string;
	pillars: Pillar[];
	historyTitle: string;
	historyIntro: string;
	seasons: Season[];
	sponsorTitle: string;
	sponsorIntro: string;
	sponsors: Sponsor[];
	partners: Partner[];
	sponsorPitch: string;
	sponsorPitchTail: string;
}
