<script lang="ts">
	import { revealOnView } from '$lib/actions/reveal';
	import type { Sponsor } from '$lib/types';

	let { sponsor }: { sponsor: Sponsor } = $props();
</script>

<a class="sponsor-card card" href={sponsor.url} target="_blank" rel="noopener" use:revealOnView>
	<div class="sponsor-plate">
		{#if sponsor.logo}
			<div
				class="sponsor-logo"
				role="img"
				aria-label={sponsor.name}
				style:background-image={`url('${sponsor.logo}')`}
			></div>
		{:else}
			<!-- aria-hidden: .sponsor-name repeats this immediately below. -->
			<div class="sponsor-wordmark" aria-hidden="true">{sponsor.name}</div>
		{/if}
	</div>

	<div class="sponsor-details">
		<div class="sponsor-name">{sponsor.name}</div>
		<div class="sponsor-note">{sponsor.note}</div>
	</div>
</a>

<style>
	/* One box, one internal hairline. The old card nested a bordered logo box
	   inside a bordered card, which was the fussiest thing on the page. */
	/* Sizing comes from the parent grid track, so no flex basis or max-width. */
	.sponsor-card {
		border-radius: var(--radius-card);
		padding: 0;
		display: flex;
		flex-direction: column;
		color: var(--on-surface);
		transition: border-color 0.18s ease;
	}

	.sponsor-card:hover {
		border-color: var(--primary);
		/* Held explicitly against the global a:hover { color: var(--primary) }. */
		color: var(--on-surface);
	}

	.sponsor-card:focus-visible {
		outline: 1px solid var(--primary);
		outline-offset: 3px;
	}

	.sponsor-plate {
		aspect-ratio: 5 / 3;
		display: grid;
		place-items: center;
		padding: 22px;
		border-bottom: 1px solid var(--outline);
	}

	.sponsor-logo {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
	}

	/* Sponsors with no logo art get their name set as a wordmark rather than an
	   empty plate -- a grey "logo goes here" pill would visibly demote them
	   against the ones that supplied art. */
	.sponsor-wordmark {
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: var(--weight-thin);
		line-height: 1.3;
		letter-spacing: 0.02em;
		text-align: center;
		text-transform: uppercase;
		color: var(--on-surface);
	}

	.sponsor-details {
		padding: 16px 18px 18px;
	}

	.sponsor-name {
		font-size: 13.5px;
		font-weight: var(--weight-medium);
		margin-bottom: 6px;
	}

	.sponsor-note {
		font-size: 12px;
		line-height: 1.55;
		color: var(--on-var);
	}
</style>
