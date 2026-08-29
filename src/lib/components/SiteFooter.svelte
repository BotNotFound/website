<script lang="ts">
	import { team } from '$lib/data/teams';
</script>

<footer class="site-footer">
	<div class="footer-bar">
		<a href="/" class="team-name-link">{team.name}</a>

		<nav class="footer-links">
			<a href="/">home</a>
			<a href="/about">about</a>
			<a href="/history">history</a>
			<a href="/sponsors">sponsors</a>
			<a href="mailto:rhs_robotics@outlook.com">email</a>
			<a href="https://instagram.com/clubrhsrobotics" target="_blank" rel="noopener">instagram</a>
		</nav>

		<div class="footer-copyright">© 2026 {team.name}</div>
	</div>

	<div class="footer-fine-print">
		Wednesdays, 2:00–3:30 · Room E220 · Redmond High School, Redmond WA · FIRST® Tech Challenge ·
		Not affiliated with FIRST®
	</div>
</footer>

<style>
	.site-footer {
		margin-top: 40px;
		border-top: 1px solid var(--outline);
	}

	.footer-bar {
		max-width: var(--page-max);
		margin: 0 auto;
		padding: 22px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
	}

	.team-name-link {
		font-size: 13.5px;
		font-weight: var(--weight-regular);
		color: var(--on-surface);
	}

	.team-name-link:hover {
		color: var(--primary);
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 28px;
		flex-wrap: wrap;
	}

	.footer-links a {
		font-size: 13px;
		font-weight: var(--weight-light);
		text-transform: lowercase;
		color: var(--on-var);
	}

	.footer-links a:hover {
		color: var(--on-surface);
	}

	.footer-copyright {
		font-size: 12.5px;
		font-weight: var(--weight-light);
		color: var(--on-var);
		white-space: nowrap;
	}

	.footer-fine-print {
		max-width: var(--page-max);
		margin: 0 auto;
		padding: 0 20px 22px;
		font-size: 11px;
		font-weight: var(--weight-light);
		letter-spacing: 0.02em;
		color: var(--on-var);
		opacity: 0.7;
	}
</style>
