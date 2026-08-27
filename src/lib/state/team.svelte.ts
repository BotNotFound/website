import { browser } from '$app/environment';
import type { TeamKey } from '$lib/types';

const STORAGE_KEY = 'ftc-active-team';

function loadInitial(): TeamKey {
	if (!browser) return 'notfound';
	return localStorage.getItem(STORAGE_KEY) === 'found' ? 'found' : 'notfound';
}

class TeamSelection {
	current = $state<TeamKey>(loadInitial());

	select(team: TeamKey) {
		this.current = team;
		if (browser) localStorage.setItem(STORAGE_KEY, team);
	}
}

export const teamSelection = new TeamSelection();
