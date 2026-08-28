<script lang="ts">
	import SponsorGrid from '$lib/components/SponsorGrid.svelte';
	import PartnerList from '$lib/components/PartnerList.svelte';
	import { SPONSOR_TIERS } from '$lib/sponsors';
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
					<dt class="sponsors-stat-label">Tiers</dt>
					<dd class="sponsors-stat-value">{SPONSOR_TIERS.length}</dd>
				</div>
			</dl>
		</div>
	</section>

	<div class="sp-legend">
		<span class="sp-legend-label">Tiers</span>
		<div class="sp-legend-list">
			{#each SPONSOR_TIERS as tier (tier.tier)}
				<span class="sp-legend-item sp-legend-{tier.tier}">
					{tier.label}<span class="sp-legend-amount">{tier.amount}</span>
				</span>
			{/each}
		</div>
	</div>

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
		<SponsorGrid sponsors={team.sponsors} />
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

		<div class="sp-close panel">
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
		align-items: flex-end;
		gap: 30px 64px;
	}

	.sponsors-head {
		flex: 1 1 380px;
		min-width: 0;
	}

	.sponsors-title {
		font-size: clamp(26px, 3.4vw, 46px);
		line-height: 1.12;
		letter-spacing: -0.015em;
		margin: 20px 0 0;
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

	/* Tier legend -- the tier/amount mapping as a ruled band rather than prose.
	   Lists all three tiers even if one is currently empty: it is a pitch. */
	.sp-legend {
		display: flex;
		align-items: center;
		gap: clamp(12px, 2.4vw, 22px);
		flex-wrap: wrap;
		padding: 15px 0 16px;
		border-top: 1px solid var(--outline);
		border-bottom: 1px solid var(--outline);
	}

	.sp-legend-label {
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

	.sp-legend-label::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: var(--radius-full);
		background: var(--primary);
		flex: none;
	}

	.sp-legend-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 26px;
	}

	.sp-legend-item {
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}

	.sp-legend-gold {
		color: var(--primary);
	}

	.sp-legend-silver {
		color: var(--on-surface);
	}

	.sp-legend-bronze {
		color: var(--on-var);
	}

	.sp-legend-amount {
		margin-left: 10px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		color: var(--on-var);
	}

	/* Ruled bands. .page-main's 28px gap sits above the rule, 24px below, so each
	   rule binds to the section it opens. */
	.sp-section {
		border-top: 1px solid var(--outline);
		padding-top: 24px;
	}

	/* The legend band already closes with a rule, so the section it opens must
	   not draw its own -- otherwise two hairlines sit 28px apart. */
	.sp-legend + .sp-section {
		border-top: none;
		padding-top: 0;
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

	/* Same geometry as the history page's one panel (.tl-brief). */
	.sp-close {
		padding: 32px 36px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px 44px;
		align-items: start;
	}

	.sp-pitch {
		flex: 1 1 340px;
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

	.sp-pitch-tail {
		margin: 18px 0 0;
		font-size: 15px;
		line-height: 1.72;
		max-width: 56ch;
	}

	.sp-contact {
		flex: 0 1 380px;
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
