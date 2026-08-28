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
	let timelineEl: HTMLDivElement;
	let railFillEl: HTMLDivElement;

	function selectSeason(index: number) {
		if (index === activeIndex) return;
		activeIndex = index;

		// If the timeline has scrolled up behind the sticky chrome, bring it back
		// so the incoming season starts at its head rather than part-way down.
		requestAnimationFrame(() => {
			if (!timelineEl) return;
			const style = getComputedStyle(document.documentElement);
			const chrome =
				(parseFloat(style.getPropertyValue('--site-header-h')) || 124) +
				(parseFloat(style.getPropertyValue('--scrub-h')) || 66);
			if (timelineEl.getBoundingClientRect().top < chrome) timelineEl.scrollIntoView();
		});
	}

	onMount(() => {
		// Scoped to this page for its lifetime -- never leaks to / or /sponsors.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		document.documentElement.style.scrollBehavior = 'smooth';
		return () => {
			document.documentElement.style.scrollBehavior = '';
		};
	});

	// Rebound whenever the season changes, since swapping panels changes the
	// timeline's height and with it the scroll range the fill maps onto.
	$effect(() => {
		activeIndex;
		if (!railFillEl || !timelineEl) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return scroll(animate(railFillEl, { scaleY: [0, 1] }, { ease: 'linear', duration: 1 }), {
			target: timelineEl,
			offset: ['start 28%', 'end 72%']
		});
	});
</script>

<svelte:head>
	<title>History · {team.name}</title>
</svelte:head>

<main class="page-main">
	<section class="history-intro">
		<div class="history-head">
			<div class="eyebrow">History</div>
			<h1 class="heading-display history-title">{team.historyTitle}</h1>
		</div>

		<div class="history-aside">
			<p class="body-copy history-lede">{team.historyIntro}</p>
			<dl class="history-stats">
				<div class="history-stat">
					<dt class="history-stat-label">Seasons</dt>
					<dd class="history-stat-value">{team.seasons.length}</dd>
				</div>
				<div class="history-stat">
					<dt class="history-stat-label">Log entries</dt>
					<dd class="history-stat-value">{entryCount}</dd>
				</div>
			</dl>
		</div>
	</section>

	<SeasonScrubber seasons={team.seasons} {activeIndex} onselect={selectSeason} />

	<div bind:this={timelineEl} class="history-timeline">
		<div class="tl-rail" aria-hidden="true">
			<div bind:this={railFillEl} class="tl-rail-fill"></div>
		</div>

		{#key activeIndex}
			<TimelineSeason season={team.seasons[activeIndex]} />
		{/key}
	</div>
</main>

<style>
	/* Hoisted so the intro, the sticky season tabs and the timeline all share one
	   left edge, with the rail alone sitting out at half the gutter. */
	.page-main {
		--tl-gutter: clamp(30px, 5.5vw, 60px);
	}

	/* Masthead: title flush to the timeline's left edge, supporting text flush to
	   the page's right edge, so the block reads as deliberate on a full-bleed
	   page instead of trailing off into dead space mid-row. */
	.history-intro {
		padding: 26px 0 38px var(--tl-gutter);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-end;
		gap: 30px 64px;
	}

	.history-head {
		flex: 1 1 380px;
		min-width: 0;
	}

	.history-title {
		font-size: clamp(26px, 3.4vw, 46px);
		line-height: 1.12;
		letter-spacing: -0.015em;
		margin: 20px 0 0;
	}

	.history-aside {
		flex: 0 1 clamp(280px, 32vw, 440px);
	}

	.history-lede {
		font-size: 14.5px;
		line-height: 1.7;
		max-width: 46ch;
	}

	/* Spec strip -- value over label, hairline between, reading as instrument
	   readout rather than a run of small grey text. */
	.history-stats {
		display: flex;
		flex-wrap: wrap;
		margin: 26px 0 0;
	}

	.history-stat {
		padding: 0 26px;
	}

	.history-stat:first-child {
		padding-left: 0;
	}

	.history-stat + .history-stat {
		border-left: 1px solid var(--outline);
	}

	.history-stat-label {
		margin: 0;
		font-size: 10px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.history-stat-value {
		margin: 7px 0 0;
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: var(--weight-thin);
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--on-surface);
	}

	.history-timeline {
		position: relative;
		padding-left: var(--tl-gutter);
		padding-top: 8px;
		/* Keeps a season change clear of the sticky header + season tabs. */
		scroll-margin-top: calc(var(--site-header-h, 124px) + var(--scrub-h, 66px) + 18px);
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
</style>
