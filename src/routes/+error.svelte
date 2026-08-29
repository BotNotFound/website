<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { team } from '$lib/data/teams';
</script>

<svelte:head>
	<title>404: Page not found! · {team.name}</title>
</svelte:head>

<!-- An unmatched URL never matches the (site) group, so this renders under the
     root layout and has to bring the chrome itself. Mirrors (site)/+layout.svelte. -->
<div class="app-shell">
	<SiteHeader />

	<main class="page-main error-main">
		<h1 class="error-title">404: Page not found!</h1>
		<p class="error-subtitle">Maybe you took a wrong turn?</p>
	</main>

	<SiteFooter />
</div>

<style>
	.app-shell {
		position: relative;
		min-height: 100vh;
		background: var(--surface);
		color: var(--on-surface);
		overflow-x: clip;
		display: flex;
		flex-direction: column;
	}

	/* Takes the leftover height so the message sits between the header and the
	   footer rather than hard against the header, and centres it explicitly.
	   .page-main carries `margin: 0 auto`, which as a flex item would override
	   stretch and shrink-wrap the box to the title's width -- stable only until
	   the copy changes. width/margin here pin it, then the box centres its own
	   children. */
	.error-main {
		flex: 1 1 auto;
		/* .page-main carries `margin: 0 auto`; as a flex item that overrides
		   stretch and shrink-wraps the box to the title width -- stable only
		   until the copy changes. Pin it, then centre its own children. */
		width: 100%;
		margin: 0;
		align-items: center;
		text-align: center;
		width: 100%;
		margin: 0;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 18px;
		padding-top: 60px;
		padding-bottom: 80px;
	}

	/* Same display face as the home hero's "Redmond High's first robotics team." */
	.error-title {
		margin: 0;
		font-family: var(--font-hero-heading);
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.05;
		color: var(--primary);
		font-size: clamp(1.6rem, 6vw, 3.4rem);
	}

	@media (min-width: 768px) {
		.error-title {
			font-size: clamp(2rem, 4vw, 3.4rem);
		}
	}

	.error-subtitle {
		margin: 0;
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: var(--weight-light);
		line-height: 1.7;
		color: var(--on-var);
	}
</style>
