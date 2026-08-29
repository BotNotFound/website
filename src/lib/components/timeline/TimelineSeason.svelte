<script lang="ts">
	import type { Season } from '$lib/types';
	import { revealOnView } from '$lib/actions/reveal';

	let { season }: { season: Season } = $props();

	const pad = (i: number) => String(i + 1).padStart(2, '0');
</script>

<!-- tabindex="0" so keyboard users can reach and scroll the panel itself, which
     is the expected behaviour for a tabpanel holding this much content. -->
<div
	id="{season.id}-panel"
	class="tl-season"
	role="tabpanel"
	tabindex="0"
	aria-labelledby="{season.id}-tab"
>
	<span class="tl-marker tl-marker--season" aria-hidden="true"></span>

	<header class="tl-head">
		<h2 id="{season.id}-title" class="tl-title heading-display">
			<span class="tl-title-years">{season.years}</span>
			<span class="tl-title-game">{season.game}</span>
		</h2>
		<div class="tl-head-meta">
			<span class="tl-chip">{season.tag}</span>
			<span class="tl-chip tl-chip--quiet">{season.log.length} log entries</span>
		</div>
	</header>

	<div class="tl-brief panel">
		<p class="body-copy tl-brief-copy">{season.body}</p>
		<figure class="tl-figure">
			<div class="tl-photo card">
				<span class="tl-photo-tag">{season.photo}</span>
			</div>
			<figcaption class="tl-fig">{season.fig}</figcaption>
		</figure>
	</div>

	<ol class="tl-log" role="list">
		{#each season.log as entry, i (entry.k)}
			<li class="tl-log-item" use:revealOnView>
				<span class="tl-marker tl-marker--entry" aria-hidden="true"></span>
				<span class="tl-connector" aria-hidden="true"></span>
				<div class="tl-entry card">
					<div class="tl-entry-head">
						<span class="tl-entry-index" aria-hidden="true">{pad(i)}</span>
						<h3 class="tl-entry-key">{entry.k}</h3>
					</div>
					<p class="tl-entry-value">{entry.v}</p>
				</div>
			</li>
		{/each}
	</ol>
</div>

<style>
	.tl-season {
		position: relative;
	}

	.tl-season:focus {
		outline: none;
	}

	/* :focus-visible so a mouse click never paints an outline around a
	   full-height section, while keyboard users still get one. */
	.tl-season:focus-visible {
		outline: 1px solid var(--primary);
		outline-offset: 14px;
		border-radius: var(--radius-panel);
	}

	/* --- rail markers -------------------------------------------------------
	   Every content row starts at the timeline's content-box edge, inset by
	   exactly --tl-gutter, while the rail sits at half that from the padding-box
	   edge. So this one expression lands a marker on the rail at every tier. */
	.tl-marker {
		position: absolute;
		left: calc(var(--tl-gutter) / -2);
		transform: translateX(-50%);
		border-radius: var(--radius-full);
		background: var(--surface);
		border: 1px solid var(--outline);
		transition:
			border-color 0.18s ease,
			background-color 0.18s ease;
	}

	/* Always filled: only the selected season is on screen, so this reads as a
	   "you are here" marker rather than progress through a list. */
	.tl-marker--season {
		width: 13px;
		height: 13px;
		top: 6px;
		border-color: var(--primary);
	}

	.tl-marker--season::after {
		content: '';
		position: absolute;
		inset: 3px;
		border-radius: var(--radius-full);
		background: var(--primary);
	}

	.tl-marker--entry {
		width: 7px;
		height: 7px;
		top: 25px;
	}

	.tl-connector {
		position: absolute;
		left: calc(var(--tl-gutter) / -2 + 4px);
		width: calc(var(--tl-gutter) / 2 - 4px);
		top: 28px;
		height: 1px;
		background: var(--outline);
		transition: background-color 0.18s ease;
	}

	/* --- season head --------------------------------------------------------- */
	.tl-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 10px 20px;
		margin-bottom: 22px;
	}

	.tl-title {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 8px 16px;
		margin: 0;
	}

	.tl-title-years {
		color: var(--primary);
		font-weight: var(--weight-medium);
		font-size: 12px;
		letter-spacing: 0.07em;
	}

	.tl-title-game {
		font-size: clamp(22px, 2.6vw, 34px);
		font-weight: var(--weight-thin);
		line-height: 1.2;
		letter-spacing: -0.015em;
	}

	.tl-head-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	.tl-chip {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.tl-chip--quiet::before {
		content: '·';
		margin-right: 10px;
		color: var(--outline);
	}

	/* --- brief + photo ------------------------------------------------------- */
	/* Flex with a capped figure basis rather than an auto-fit grid: equal columns
	   let the 4:3 photo balloon to ~490px tall against four lines of prose on a
	   full-bleed page, leaving a large void. Wraps on narrow screens. */
	.tl-brief {
		padding: 32px 36px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px 44px;
		align-items: start;
		margin-bottom: 14px;
	}

	.tl-brief-copy {
		flex: 1 1 340px;
		font-size: 15px;
		line-height: 1.72;
		max-width: 56ch;
	}

	.tl-figure {
		flex: 0 1 380px;
		min-width: 0;
		margin: 0;
	}

	.tl-photo {
		aspect-ratio: 4 / 3;
		border-radius: 28px;
		display: grid;
		place-items: center;
		padding: 20px;
	}

	.tl-photo-tag {
		border: 1px solid var(--outline);
		border-radius: var(--radius-full);
		padding: 10px 18px;
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
		text-align: center;
	}

	.tl-fig {
		padding: 14px 6px 0;
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	/* --- log entries --------------------------------------------------------- */
	.tl-log {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tl-log-item {
		position: relative;
	}

	/* Flex rather than an auto-fit grid: we want a fixed-ish key column against a
	   wide value column, and auto-fit only ever produces equal columns. */
	.tl-entry {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 30px;
		align-items: baseline;
		padding: 18px 24px;
		transition: border-color 0.18s ease;
	}

	.tl-entry-head {
		flex: 0 1 190px;
		display: flex;
		align-items: baseline;
		gap: 10px;
		min-width: 0;
	}

	.tl-entry-index {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.08em;
		color: var(--outline);
		flex: none;
	}

	.tl-entry-key {
		margin: 0;
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--primary);
	}

	.tl-entry-value {
		flex: 1 1 340px;
		min-width: 0;
		margin: 0;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--on-var);
	}

	/* Hovering an entry lights its node, its connector and its border together,
	   so the rail reads as wired to the content rather than drawn beside it. */
	.tl-log-item:hover .tl-entry {
		border-color: var(--primary);
	}

	.tl-log-item:hover .tl-connector {
		background: var(--primary);
	}

	.tl-log-item:hover .tl-marker--entry {
		border-color: var(--primary);
		background: var(--primary);
	}
</style>
