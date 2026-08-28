<script lang="ts">
	import SponsorCard from '$lib/components/SponsorCard.svelte';
	import PartnerList from '$lib/components/PartnerList.svelte';
	import { armReveals } from '$lib/actions/reveal';
	import { team } from '$lib/data/teams';

	// Runs on every mount, before any child action, so reveals measure against
	// this visit rather than module load.
	armReveals();
</script>

<svelte:head>
	<title>Sponsors · {team.name}</title>
</svelte:head>

<main class="page-main">
	<section class="sponsors-intro">
		<div class="sponsors-head">
			<div class="eyebrow">Sponsors</div>
			<h1 class="heading-display sponsors-title">{team.sponsorTitle}</h1>
		</div>

		<div class="sponsors-aside">
			<p class="body-copy sponsors-lede">{team.sponsorIntro}</p>
			<dl class="sponsors-stats">
				<div class="sponsors-stat">
					<dt class="sponsors-stat-label">Sponsors</dt>
					<dd class="sponsors-stat-value">{team.sponsors.length}</dd>
				</div>
				<div class="sponsors-stat">
					<dt class="sponsors-stat-label">Partners</dt>
					<dd class="sponsors-stat-value">{team.partners.length}</dd>
				</div>
			</dl>
		</div>
	</section>

	<section class="sp-section" aria-labelledby="sp-sponsors">
		<header class="sp-head">
			<h2 id="sp-sponsors" class="sp-title heading-display">
				<span class="sp-title-index" aria-hidden="true">01</span>
				<span class="sp-title-text">Our sponsors</span>
			</h2>
			<div class="sp-head-meta">
				<span class="sp-chip">{team.sponsors.length} sponsors</span>
			</div>
		</header>
		<div class="sponsor-row">
			{#each team.sponsors as sponsor (sponsor.name)}
				<SponsorCard {sponsor} />
			{/each}
		</div>
	</section>

	<section class="sp-section" aria-labelledby="sp-partners">
		<header class="sp-head">
			<h2 id="sp-partners" class="sp-title heading-display">
				<span class="sp-title-index" aria-hidden="true">02</span>
				<span class="sp-title-text">Mentors and partners</span>
			</h2>
			<div class="sp-head-meta">
				<span class="sp-chip">{team.partners.length} partners</span>
			</div>
		</header>
		<PartnerList partners={team.partners} />
	</section>

	<section class="sp-section" aria-labelledby="sp-support">
		<header class="sp-head">
			<h2 id="sp-support" class="sp-title heading-display">
				<span class="sp-title-index" aria-hidden="true">03</span>
				<span class="sp-title-text">Support the team</span>
			</h2>
		</header>

		<div class="sp-close">
			<div class="sp-pitch">
				<p class="sp-pitch-headline">{team.sponsorPitch}</p>
				<p class="body-copy sp-pitch-tail">{team.sponsorPitchTail}</p>
			</div>
			<div class="sp-contact">
				<div class="sp-contact-label">Get in touch</div>
				<p class="sp-contact-copy">
					We will send our engineering portfolio, our season plan, and exactly what your name appears
					on.
				</p>
				<a class="sp-contact-email" href="mailto:rhs_robotics@outlook.com"
					>rhs_robotics@outlook.com</a
				>
			</div>
		</div>
	</section>
</main>

<style>
	/* Masthead: title flush left, supporting text flush to the page's right edge.
	   No gutter indent -- unlike history, nothing occupies a gutter here, so the
	   content sits on the page padding and lines up with its own section rules. */
	.sponsors-intro {
		padding: 26px 0 38px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		/* Top-aligned, not bottom. The aside is content-heavy and the head is not,
		   so their heights diverge with width -- bottom-aligning pushes the head
		   down and opens a hole above the eyebrow (149px at 768). A ragged bottom
		   is far less visible than a hole at the top edge. */
		align-items: flex-start;
		gap: 30px 64px;
	}

	.sponsors-head {
		flex: 1 1 380px;
		min-width: 0;
	}

	/* Capped so this 41-character title always wraps to two lines. Left to run
	   full width it collapses to one line above ~1700px, which drops the head to
	   93px against the aside's 169px -- and flex-end then pushes the whole left
	   column down, leaving a hole above the eyebrow. Monospace, so ch is exact. */
	.sponsors-title {
		font-size: clamp(26px, 3.4vw, 46px);
		line-height: 1.12;
		letter-spacing: -0.015em;
		margin: 20px 0 0;
		max-width: 26ch;
	}

	.sponsors-aside {
		flex: 0 1 clamp(280px, 32vw, 440px);
	}

	.sponsors-lede {
		font-size: 14.5px;
		line-height: 1.7;
		max-width: 46ch;
	}

	/* Spec strip -- value over label, hairline between. */
	.sponsors-stats {
		display: flex;
		flex-wrap: wrap;
		margin: 26px 0 0;
	}

	.sponsors-stat {
		padding: 0 26px;
	}

	.sponsors-stat:first-child {
		padding-left: 0;
	}

	.sponsors-stat + .sponsors-stat {
		border-left: 1px solid var(--outline);
	}

	.sponsors-stat-label {
		margin: 0;
		font-size: 10px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.sponsors-stat-value {
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
	.sp-section {
		border-top: 1px solid var(--outline);
		padding-top: 24px;
	}

	/* One flat pool -- no tiers, so every sponsor sits in the same grid.
	   auto-FILL, not auto-fit: empty tracks are kept, so a card never stretches
	   to half the page if the team ever drops to one or two sponsors. A single
	   column still fills the width on phones. */
	.sponsor-row {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
		gap: 14px;
	}

	.sp-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 10px 20px;
		margin-bottom: 22px;
	}

	.sp-title {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 8px 16px;
		margin: 0;
	}

	.sp-title-index {
		color: var(--primary);
		font-weight: var(--weight-medium);
		font-size: 12px;
		letter-spacing: 0.07em;
	}

	.sp-title-text {
		font-size: clamp(22px, 2.6vw, 34px);
		font-weight: var(--weight-thin);
		line-height: 1.2;
		letter-spacing: -0.015em;
	}

	.sp-head-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	.sp-chip {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	/* Mirrors the masthead: pitch flush to the page's left edge, contact flush to
	   its right. Bookending the page with the same two-column figure reads as
	   deliberate, where a bordered box just fenced off a lot of empty width. */
	.sp-close {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		gap: 30px 64px;
	}

	.sp-pitch {
		flex: 1 1 380px;
		min-width: 0;
	}

	.sp-pitch-headline {
		font-family: var(--font-display);
		font-size: clamp(18px, 1.9vw, 26px);
		font-weight: var(--weight-thin);
		line-height: 1.42;
		letter-spacing: -0.01em;
		margin: 0;
		max-width: 34ch;
		color: var(--primary);
	}

	/* Same measure as .sponsors-lede so both ends of the page read alike. */
	.sp-pitch-tail {
		margin: 18px 0 0;
		font-size: 14.5px;
		line-height: 1.7;
		max-width: 46ch;
	}

	.sp-contact {
		flex: 0 1 clamp(280px, 32vw, 440px);
		min-width: 0;
	}

	.sp-contact-label {
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--primary);
		margin-bottom: 12px;
	}

	.sp-contact-copy {
		margin: 0 0 22px;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--on-var);
	}

	.sp-contact-email {
		display: inline-flex;
		align-items: center;
		background: var(--primary);
		color: var(--on-primary);
		border-radius: var(--radius-full);
		padding: 14px 26px;
		font-size: 13.5px;
		font-weight: var(--weight-medium);
	}

	.sp-contact-email:hover {
		opacity: 0.9;
		color: var(--on-primary);
	}
</style>
