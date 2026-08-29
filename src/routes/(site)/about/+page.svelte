<script lang="ts">
	import { armReveals, revealOnView } from '$lib/actions/reveal';
	import { team } from '$lib/data/teams';

	// Runs on every mount, before any child action, so reveals measure against
	// this visit rather than module load.
	armReveals();

	// Seasons are stored newest-first, so the founding season is the last one.
	// '2023–24'.slice(0, 4) -> '2023'; the en dash is never touched.
	const foundedYear = team.seasons[team.seasons.length - 1].years.slice(0, 4);
</script>

<svelte:head>
	<title>About · {team.name}</title>
</svelte:head>

<main class="page-main">
	<section class="about-intro">
		<div class="about-head">
			<div class="eyebrow">About</div>
			<h1 class="heading-display about-title">{team.aboutTitle}</h1>
		</div>

		<div class="about-aside">
			<p class="body-copy about-lede">{team.aboutIntro}</p>
			<dl class="about-stats">
				<div class="about-stat">
					<dt class="about-stat-label">Founded</dt>
					<dd class="about-stat-value">{foundedYear}</dd>
				</div>
				<div class="about-stat">
					<dt class="about-stat-label">Seasons</dt>
					<dd class="about-stat-value">{team.seasons.length}</dd>
				</div>
			</dl>
		</div>
	</section>

	<section class="ab-section" aria-labelledby="ab-team">
		<header class="ab-head">
			<h2 id="ab-team" class="ab-title heading-display">
				<span class="ab-title-index" aria-hidden="true">01</span>
				<span class="ab-title-text">The team</span>
			</h2>
		</header>

		<div class="ab-brief">
			<p class="body-copy ab-brief-copy">{team.intro}</p>
			<figure class="ab-figure">
				<div class="ab-photo card">
					<span class="ab-photo-tag">{team.photoSlot}</span>
				</div>
				<figcaption class="ab-fig">{team.photoCaption}</figcaption>
			</figure>
		</div>

		<dl class="ab-specs">
			{#each team.specs as spec (spec.k)}
				<div class="ab-spec-row card" use:revealOnView>
					<dt class="ab-spec-key">{spec.k}</dt>
					<dd class="ab-spec-value">{spec.v}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section class="ab-section" aria-labelledby="ab-mission">
		<header class="ab-head">
			<h2 id="ab-mission" class="ab-title heading-display">
				<span class="ab-title-index" aria-hidden="true">02</span>
				<span class="ab-title-text">Our mission</span>
			</h2>
			<div class="ab-head-meta">
				<span class="ab-chip">{team.missionAttr}</span>
			</div>
		</header>

		<div class="ab-mission">
			<p class="ab-mission-big">{team.missionBig}</p>
			<p class="body-copy ab-mission-tail">{team.missionTail}</p>
		</div>
	</section>

	<section class="ab-section" aria-labelledby="ab-build">
		<header class="ab-head">
			<h2 id="ab-build" class="ab-title heading-display">
				<span class="ab-title-index" aria-hidden="true">03</span>
				<span class="ab-title-text">How we build</span>
			</h2>
			<div class="ab-head-meta">
				<span class="ab-chip">{team.pillars.length} principles</span>
			</div>
		</header>

		<ol class="ab-pillar-list" role="list">
			{#each team.pillars as pillar (pillar.n)}
				<li class="ab-pillar-item" use:revealOnView>
					<div class="ab-pillar-row card">
						<div class="ab-pillar-head">
							<span class="ab-pillar-index" aria-hidden="true">{pillar.n}</span>
							<h3 class="ab-pillar-title">{pillar.title}</h3>
						</div>
						<p class="ab-pillar-body">{pillar.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>
</main>

<style>
	/* Masthead: title flush to the page's left edge, supporting text flush to its
	   right. Top-aligned, not bottom -- the aside is content-heavy and the head is
	   not, so bottom-aligning would drop the head and open a gap above the eyebrow. */
	.about-intro {
		padding: 26px 0 38px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		gap: 30px 64px;
	}

	.about-head {
		flex: 1 1 380px;
		min-width: 0;
	}

	/* Capped so this 50-character title always wraps to two lines. Left to run
	   full width it collapses to one line on wide screens, which shortens the head
	   column against the aside. Monospace, so ch is exact. */
	.about-title {
		font-size: clamp(26px, 3.4vw, 46px);
		line-height: 1.12;
		letter-spacing: -0.015em;
		margin: 20px 0 0;
		max-width: 26ch;
	}

	.about-aside {
		flex: 0 1 clamp(280px, 32vw, 440px);
	}

	.about-lede {
		font-size: 14.5px;
		line-height: 1.7;
		max-width: 46ch;
	}

	/* Spec strip -- value over label, hairline between. */
	.about-stats {
		display: flex;
		flex-wrap: wrap;
		margin: 26px 0 0;
	}

	.about-stat {
		padding: 0 26px;
	}

	.about-stat:first-child {
		padding-left: 0;
	}

	.about-stat + .about-stat {
		border-left: 1px solid var(--outline);
	}

	.about-stat-label {
		margin: 0;
		font-size: 10px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.about-stat-value {
		margin: 7px 0 0;
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: var(--weight-thin);
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--on-surface);
	}

	/* Ruled bands. .page-main's 28px gap sits above the rule, 24px below, so each
	   rule binds to the section it opens. */
	.ab-section {
		border-top: 1px solid var(--outline);
		padding-top: 24px;
	}

	.ab-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 10px 20px;
		margin-bottom: 22px;
	}

	.ab-title {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 8px 16px;
		margin: 0;
	}

	.ab-title-index {
		color: var(--primary);
		font-weight: var(--weight-medium);
		font-size: 12px;
		letter-spacing: 0.07em;
	}

	.ab-title-text {
		font-size: clamp(22px, 2.6vw, 34px);
		font-weight: var(--weight-thin);
		line-height: 1.2;
		letter-spacing: -0.015em;
	}

	.ab-head-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	.ab-chip {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	/* Same two-column figure as the masthead -- prose flush left, photo flush to
	   the page's right edge. It was a bordered panel, but the content only reached
	   x=985 of 1420, so the box was mostly fencing off empty width. */
	.ab-brief {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 30px 64px;
		align-items: flex-start;
		margin-bottom: 22px;
	}

	.ab-brief-copy {
		flex: 1 1 380px;
		min-width: 0;
		font-size: 15px;
		line-height: 1.72;
		max-width: 56ch;
	}

	.ab-figure {
		flex: 0 1 clamp(280px, 32vw, 440px);
		min-width: 0;
		margin: 0;
	}

	/* 16/9 rather than the history page's 4/3: this slot is a full-roster group
	   shot, which is wide, and the shorter frame sits better against the prose. */
	.ab-photo {
		aspect-ratio: 16 / 9;
		border-radius: 28px;
		display: grid;
		place-items: center;
		padding: 20px;
	}

	.ab-photo-tag {
		border: 1px solid var(--outline);
		border-radius: var(--radius-full);
		padding: 10px 18px;
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
		text-align: center;
	}

	.ab-fig {
		padding: 14px 6px 0;
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	/* Specs are short key/value pairs, so they read as a compact grid rather than
	   full-width rows, which would leave most of each line empty five times over.
	   auto-FILL, not auto-fit: empty tracks are kept, so the trailing card never
	   stretches across half the page. */
	.ab-specs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 8px;
		margin: 0;
	}

	.ab-spec-row {
		padding: 18px 24px;
	}

	/* Value under key, and no ordinal -- the two things that keep this from
	   reading as the same component as the pillar rows below. */
	.ab-spec-key {
		margin: 0;
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--primary);
	}

	.ab-spec-value {
		margin: 8px 0 0;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--on-var);
	}

	/* Statement left, elaboration flush right -- the same two-column figure as the
	   masthead and the brief above, so the page keeps one spine instead of leaving
	   half the width empty here. */
	.ab-mission {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 30px 64px;
		align-items: flex-start;
	}

	/* White, not red. Red display type elsewhere on the site is a short pull-quote
	   -- the sponsors one is 41 characters. This is 232, and in accent colour it
	   became eight lines of solid red. The red section index and chip already carry
	   the accent; the hierarchy here is white statement over grey elaboration. */
	.ab-mission-big {
		flex: 1 1 380px;
		min-width: 0;
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(17px, 1.7vw, 23px);
		font-weight: var(--weight-thin);
		line-height: 1.45;
		letter-spacing: -0.01em;
		max-width: 46ch;
		color: var(--on-surface);
	}

	.ab-mission-tail {
		flex: 0 1 clamp(280px, 32vw, 440px);
		min-width: 0;
		margin: 0;
		font-size: 14.5px;
		line-height: 1.7;
		max-width: 46ch;
	}

	.ab-pillar-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.ab-pillar-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 30px;
		align-items: baseline;
		padding: 18px 24px;
		transition: border-color 0.18s ease;
	}

	/* 230px, not the 190px used elsewhere: "Objective-oriented analysis" at this
	   size and tracking is ~178px, which wraps to two lines on a narrower basis. */
	.ab-pillar-head {
		flex: 0 1 230px;
		display: flex;
		align-items: baseline;
		gap: 10px;
		min-width: 0;
	}

	/* Outline grey, deliberately not --primary: the section headings above are
	   also numbered 01/02/03 in red, and the two must not read as one sequence. */
	.ab-pillar-index {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.08em;
		color: var(--outline);
		flex: none;
	}

	.ab-pillar-title {
		margin: 0;
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--primary);
	}

	.ab-pillar-body {
		flex: 1 1 340px;
		min-width: 0;
		margin: 0;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--on-var);
	}

	.ab-pillar-item:hover .ab-pillar-row {
		border-color: var(--primary);
	}
</style>
