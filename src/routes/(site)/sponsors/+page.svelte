<script lang="ts">
	import SponsorGrid from '$lib/components/SponsorGrid.svelte';
	import PartnerList from '$lib/components/PartnerList.svelte';
	import { team } from '$lib/data/teams';
</script>

<svelte:head>
	<title>Sponsors · {team.name}</title>
</svelte:head>

<main class="page-main">
	<section class="intro panel">
		<div>
			<div class="eyebrow intro-eyebrow">Sponsors</div>
			<h1 class="heading-display intro-title">{team.sponsorTitle}</h1>
			<p class="body-copy intro-lede">{team.sponsorIntro}</p>
		</div>
		<div class="contact-card">
			<div class="contact-label">Get in touch</div>
			<p class="contact-copy">
				We will send our engineering portfolio, our season plan, and exactly what your name appears on.
			</p>
			<a class="contact-email" href="mailto:rhs_robotics@outlook.com">rhs_robotics@outlook.com</a>
		</div>
	</section>

	<section class="panel sponsors-panel">
		<h2 class="section-kicker">Our sponsors</h2>
		<p class="body-copy sponsors-note">
			Gold is $1,000 and above, silver $500 and above, bronze $100 and above. Every tier appears on
			the pit banner and on this site.
		</p>
		<SponsorGrid sponsors={team.sponsors} />
	</section>

	<section class="panel partners-panel">
		<h2 class="section-kicker partners-heading">Mentors and partners</h2>
		<PartnerList partners={team.partners} />
	</section>

	<section class="panel pitch-panel">
		<p class="pitch-headline">{team.sponsorPitch}</p>
		<p class="body-copy pitch-tail">{team.sponsorPitchTail}</p>
	</section>
</main>

<style>
	.intro {
		padding: 52px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 36px 52px;
		align-items: center;
	}

	.intro-eyebrow {
		margin-bottom: 24px;
	}

	.intro-title {
		font-size: clamp(26px, 3.2vw, 42px);
		line-height: 1.15;
		letter-spacing: -0.015em;
		margin: 0 0 24px;
	}

	.intro-lede {
		font-size: 16.5px;
		font-weight: var(--weight-light);
		line-height: 1.68;
		max-width: 52ch;
	}

	.contact-card {
		background: var(--sc-high);
		border: 1px solid var(--outline);
		border-radius: var(--radius-card);
		padding: 32px;
	}

	.contact-label {
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--primary);
		margin-bottom: 14px;
	}

	.contact-copy {
		font-size: 15px;
		font-weight: var(--weight-light);
		line-height: 1.65;
		color: var(--on-var);
		margin: 0 0 24px;
	}

	.contact-email {
		display: inline-flex;
		align-items: center;
		background: var(--primary);
		color: var(--on-primary);
		border-radius: var(--radius-full);
		padding: 14px 26px;
		font-size: 13.5px;
		font-weight: var(--weight-medium);
	}

	.contact-email:hover {
		opacity: 0.9;
		color: var(--on-primary);
	}

	.sponsors-panel,
	.partners-panel,
	.pitch-panel {
		padding: 44px;
	}

	.sponsors-note {
		font-size: 14.5px;
		line-height: 1.65;
		margin: 0 0 34px;
		max-width: 58ch;
	}

	.partners-heading {
		margin: 0 0 24px;
	}

	.pitch-panel {
		padding: 48px 52px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 28px 52px;
		align-items: center;
	}

	.pitch-headline {
		font-family: var(--font-display);
		font-size: clamp(18px, 1.9vw, 26px);
		font-weight: var(--weight-thin);
		line-height: 1.42;
		letter-spacing: -0.01em;
		margin: 0;
		max-width: 34ch;
		color: var(--primary);
	}

	.pitch-tail {
		font-size: 15.5px;
		max-width: 56ch;
	}
</style>
