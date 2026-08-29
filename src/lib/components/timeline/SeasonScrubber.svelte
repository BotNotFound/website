<script lang="ts">
	import { onMount } from 'svelte';
	import type { Season } from '$lib/types';

	let {
		seasons,
		activeIndex,
		onselect
	}: {
		seasons: Season[];
		activeIndex: number;
		onselect: (index: number) => void;
	} = $props();

	let scrubEl: HTMLElement;
	let tabEls: HTMLButtonElement[] = $state([]);

	// Arrow/Home/End movement is expected of a tablist, and roving tabindex keeps
	// the group a single tab stop rather than one per season.
	function handleKeydown(event: KeyboardEvent, i: number) {
		let next = -1;
		if (event.key === 'ArrowRight') next = (i + 1) % seasons.length;
		else if (event.key === 'ArrowLeft') next = (i - 1 + seasons.length) % seasons.length;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = seasons.length - 1;
		if (next === -1) return;

		event.preventDefault();
		onselect(next);
		tabEls[next]?.focus();
	}

	onMount(() => {
		// Consumed by .history-timeline's scroll-margin-top so a season change
		// scrolls back clear of this bar.
		const publishHeight = () =>
			document.documentElement.style.setProperty('--scrub-h', `${scrubEl.offsetHeight}px`);
		const heightObserver = new ResizeObserver(publishHeight);
		heightObserver.observe(scrubEl);
		publishHeight();

		// Safe to clear here, unlike --site-header-h: this page is the only owner.
		return () => {
			heightObserver.disconnect();
			document.documentElement.style.removeProperty('--scrub-h');
		};
	});
</script>

<div bind:this={scrubEl} class="season-scrub">
	<span class="scrub-label" id="season-tabs-label">Season</span>
	<div class="scrub-list" role="tablist" aria-labelledby="season-tabs-label">
		{#each seasons as season, i (season.id)}
			<button
				bind:this={tabEls[i]}
				type="button"
				role="tab"
				id="{season.id}-tab"
				class="scrub-link"
				class:is-active={i === activeIndex}
				aria-selected={i === activeIndex}
				aria-controls="{season.id}-panel"
				tabindex={i === activeIndex ? 0 : -1}
				onclick={() => onselect(i)}
				onkeydown={(event) => handleKeydown(event, i)}
			>
				<span class="scrub-dot" aria-hidden="true"></span>
				{season.years}
			</button>
		{/each}
	</div>
</div>

<style>
	/* Ruled top and bottom so it reads as a deliberate band rather than a row of
	   controls floating above a line. */
	.season-scrub {
		position: sticky;
		top: var(--site-header-h, 124px);
		z-index: 20;
		display: flex;
		align-items: center;
		gap: clamp(12px, 2.4vw, 22px);
		flex-wrap: wrap;
		padding: 15px 0 16px var(--tl-gutter, 0px);
		/* Occlusion, not decoration -- content has to pass under this, and it is
		   #000 on #000 so no fill is visible. */
		background: var(--surface);
		border-top: 1px solid var(--outline);
		border-bottom: 1px solid var(--outline);
	}

	.scrub-label {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-size: 10px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--on-var);
		flex: none;
	}

	/* Ties the control back to the rail's node language. */
	.scrub-label::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: var(--radius-full);
		background: var(--primary);
		flex: none;
	}

	.scrub-list {
		display: flex;
		align-items: center;
		gap: clamp(6px, 1.6vw, 10px);
		flex-wrap: wrap;
	}

	/* Pills shrink rather than wrap: at 320px three pills plus gaps come to about
	   265px against 280px available, so they hold a single row. */
	.scrub-link {
		display: inline-flex;
		align-items: center;
		gap: clamp(7px, 1.6vw, 10px);
		padding: 9px clamp(11px, 2.6vw, 18px);
		background: transparent;
		border: 1px solid var(--outline);
		border-radius: var(--radius-full);
		font-family: inherit;
		font-size: clamp(11px, 2.6vw, 12.5px);
		font-weight: var(--weight-regular);
		letter-spacing: 0.04em;
		color: var(--on-var);
		white-space: nowrap;
		cursor: pointer;
		transition:
			border-color 0.18s ease,
			color 0.18s ease;
	}

	.scrub-link:hover {
		border-color: var(--primary);
		color: var(--on-surface);
	}

	.scrub-link.is-active {
		border-color: var(--primary);
		color: var(--on-surface);
	}

	.scrub-link:focus-visible {
		outline: 1px solid var(--primary);
		outline-offset: 3px;
	}

	.scrub-dot {
		width: 6px;
		height: 6px;
		border-radius: var(--radius-full);
		background: var(--outline);
		flex: none;
		transition: background-color 0.18s ease;
	}

	.scrub-link.is-active .scrub-dot,
	.scrub-link:hover .scrub-dot {
		background: var(--primary);
	}
</style>
