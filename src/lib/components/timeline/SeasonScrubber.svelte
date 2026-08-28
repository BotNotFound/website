<script lang="ts">
	import { onMount } from 'svelte';
	import type { Season } from '$lib/types';

	let { seasons, activeIndex }: { seasons: Season[]; activeIndex: number } = $props();

	let scrubEl: HTMLElement;

	onMount(() => {
		// Consumed by .tl-season's scroll-margin-top so anchor jumps clear this bar.
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

<nav bind:this={scrubEl} class="season-scrub" aria-label="Season index">
	<span class="scrub-label">Jump to</span>
	<ol class="scrub-list" role="list">
		{#each seasons as season, i (season.id)}
			<li>
				<a
					class="scrub-link"
					class:is-active={i === activeIndex}
					href="#{season.id}"
					aria-current={i === activeIndex ? 'location' : undefined}
				>
					<span class="scrub-dot" aria-hidden="true"></span>
					{season.years}
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.season-scrub {
		position: sticky;
		top: var(--site-header-h, 124px);
		z-index: 20;
		display: flex;
		align-items: center;
		gap: clamp(10px, 2.4vw, 20px);
		flex-wrap: wrap;
		padding: 12px 0 14px;
		/* Occlusion, not decoration -- content has to pass under this, and it is
		   #000 on #000 so no fill is visible. */
		background: var(--surface);
		border-bottom: 1px solid var(--outline);
	}

	.scrub-label {
		font-size: 10.5px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-var);
		flex: none;
	}

	.scrub-list {
		display: flex;
		align-items: center;
		gap: clamp(6px, 1.6vw, 10px);
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* Pills shrink rather than wrap: at 320px three pills plus gaps come to about
	   265px against 280px available, so they hold a single row. */
	.scrub-link {
		display: inline-flex;
		align-items: center;
		gap: clamp(7px, 1.6vw, 10px);
		padding: 9px clamp(11px, 2.6vw, 18px);
		border: 1px solid var(--outline);
		border-radius: var(--radius-full);
		font-size: clamp(11px, 2.6vw, 12.5px);
		font-weight: var(--weight-regular);
		letter-spacing: 0.04em;
		color: var(--on-var);
		white-space: nowrap;
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
