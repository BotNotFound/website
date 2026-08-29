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

export interface Sponsor {
	name: string;
	note: string;
	url: string;
	/**
	 * Path under /sponsors, e.g. "/sponsors/polymaker.png". Omitted when the team
	 * has no logo art yet -- the card falls back to a wordmark of the name.
	 *
	 * Asset contract: transparent PNG or SVG with light ink. It renders directly
	 * on #000 with no plate behind it, so dark-on-transparent art disappears and
	 * white-background art shows as a slab.
	 */
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
	aboutTitle: string;
	aboutIntro: string;
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
