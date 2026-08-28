<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, scroll } from 'motion';
	import TimelineSeason from '$lib/components/timeline/TimelineSeason.svelte';
	import SeasonScrubber from '$lib/components/timeline/SeasonScrubber.svelte';
	import { armReveals } from '$lib/components/timeline/reveal';
	import { team } from '$lib/data/teams';

	// Runs on every mount, before any child action, so reveals measure against
	// this visit rather than module load.
	armReveals();

	const entryCount = team.seasons.reduce((total, season) => total + season.log.length, 0);

	let activeIndex = $state(0);
	let sectionEls: HTMLElement[] = $state([]);
	let timelineEl: HTMLDivElement;
	let railFillEl: HTMLDivElement;

	onMount(() => {
		const cleanups: (() => void)[] = [];
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Scoped to this page for its lifetime -- never leaks to / or /sponsors.
		if (!prefersReducedMotion) {
			document.documentElement.style.scrollBehavior = 'smooth';
			cleanups.push(() => {
				document.documentElement.style.scrollBehavior = '';
			});
		}

		// One observer rather than three, so all sections arrive in a single
		// batched callback and lastIndexOf sees a consistent snapshot. Percentage
		// rootMargin means it never needs recreating on resize. The band sits
		// between 28% and 42% down the viewport, always below the sticky chrome.
		const seen = team.seasons.map(() => false);
		const spy = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const i = sectionEls.indexOf(entry.target as HTMLElement);
					if (i !== -1) seen[i] = entry.isIntersecting;
				}
				// Seasons run newest-first top to bottom, so the last intersecting
				// one is what most recently crossed the reader line.
				const next = seen.lastIndexOf(true);
				// -1 means nothing is in the band (page top, or scrolled past the
				// last season into the footer) -- hold rather than snapping to 0.
				if (next !== -1) activeIndex = next;
			},
			{ rootMargin: '-28% 0px -58% 0px', threshold: 0 }
		);
		for (const el of sectionEls) if (el) spy.observe(el);
		cleanups.push(() => spy.disconnect());

		if (!prefersReducedMotion) {
			cleanups.push(
				scroll(animate(railFillEl, { scaleY: [0, 1] }, { ease: 'linear', duration: 1 }), {
					target: timelineEl,
					offset: ['start 28%', 'end 72%']
				})
			);
		}

		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	});
</script>

<svelte:head>
	<title>History · {team.name}</title>
</svelte:head>

<main class="page-main">
	<section class="history-intro panel">
		<div>
			<div class="eyebrow">History</div>
			<h1 class="heading-display history-title">{team.historyTitle}</h1>
		</div>
		<div>
			<p class="body-copy history-lede">{team.historyIntro}</p>
			<div class="history-stats">
				<span class="history-stat">{team.seasons.length} seasons</span>
				<span class="history-stat">{entryCount} log entries</span>
				<span class="history-stat">Newest first</span>
			</div>
		</div>
	</section>

	<SeasonScrubber seasons={team.seasons} {activeIndex} />

	<div bind:this={timelineEl} class="history-timeline">
		<div class="tl-rail" aria-hidden="true">
			<div bind:this={railFillEl} class="tl-rail-fill"></div>
		</div>

		{#each team.seasons as season, i (season.id)}
			<TimelineSeason {season} isPassed={i <= activeIndex} bind:element={sectionEls[i]} />
		{/each}

		<div class="tl-cap">
			<span class="tl-marker tl-marker--cap" aria-hidden="true"></span>
			<span class="tl-cap-label">{team.eyebrow}</span>
		</div>
	</div>
</main>

<style>
	.history-intro {
		padding: 52px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 28px 52px;
		align-items: end;
	}

	.history-title {
		font-size: clamp(26px, 3.4vw, 46px);
		line-height: 1.15;
		letter-spacing: -0.015em;
		margin: 24px 0 0;
	}

	.history-lede {
		max-width: 48ch;
	}

	.history-stats {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 18px;
		margin-top: 22px;
	}

	.history-stat {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.history-stat + .history-stat::before {
		content: '·';
		margin-right: 18px;
		color: var(--outline);
	}

	/* One gutter value drives the rail position, every marker offset and the
	   entry connectors, so they cannot drift apart across breakpoints. */
	.history-timeline {
		--tl-gutter: clamp(30px, 5.5vw, 60px);
		position: relative;
		padding-left: var(--tl-gutter);
		display: flex;
		flex-direction: column;
		gap: clamp(48px, 6vw, 76px);
	}

	.tl-rail {
		position: absolute;
		left: calc(var(--tl-gutter) / 2);
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--outline);
		/* Fades both ends so the spine dissolves rather than stopping dead. The
		   mask clips the fill child identically; markers are not children, so
		   they stay crisp while the line dissolves around them. */
		-webkit-mask-image: linear-gradient(
			to bottom,
			transparent 0,
			#000 60px,
			#000 calc(100% - 90px),
			transparent 100%
		);
		mask-image: linear-gradient(
			to bottom,
			transparent 0,
			#000 60px,
			#000 calc(100% - 90px),
			transparent 100%
		);
	}

	.tl-rail-fill {
		position: absolute;
		inset: 0;
		background: var(--primary);
		transform: scaleY(0);
		transform-origin: top center;
	}

	.tl-cap {
		position: relative;
		padding-bottom: 8px;
	}

	.tl-cap-label {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.tl-marker--cap {
		position: absolute;
		left: calc(var(--tl-gutter) / -2);
		transform: translateX(-50%);
		top: 3px;
		width: 9px;
		height: 9px;
		border-radius: var(--radius-full);
		background: var(--surface);
		border: 1px solid var(--outline);
	}
</style>
