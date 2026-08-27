<script lang="ts">
	import type { Season } from '$lib/types';

	let { season }: { season: Season } = $props();
</script>

<section class="season panel">
	<div class="season-summary">
		<div class="season-tags">
			<span class="season-years">{season.years}</span>
			<span class="season-tag">{season.tag}</span>
		</div>
		<h3 class="season-game heading-display">{season.game}</h3>
		<p class="season-body">{season.body}</p>

		<div class="season-log">
			{#each season.log as entry (entry.k)}
				<div class="log-entry card">
					<span class="log-key">{entry.k}</span>
					<span class="log-value">{entry.v}</span>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<div class="season-photo card">
			<span class="season-photo-tag">{season.photo}</span>
		</div>
		<div class="season-fig">{season.fig}</div>
	</div>
</section>

<style>
	.season {
		padding: 40px 44px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 32px 44px;
		align-items: start;
	}

	.season-summary {
		min-width: 0;
	}

	.season-tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin-bottom: 16px;
	}

	.season-years {
		color: var(--primary);
		font-weight: var(--weight-medium);
		font-size: 12px;
		letter-spacing: 0.07em;
	}

	.season-tag {
		color: var(--on-var);
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.season-tag::before {
		content: '·';
		margin-right: 10px;
		color: var(--outline);
	}

	.season-game {
		font-size: 24px;
		font-weight: var(--weight-thin);
		line-height: 1.3;
		margin: 0 0 16px;
	}

	.season-body {
		font-size: 15px;
		line-height: 1.72;
		color: var(--on-var);
		margin: 0 0 22px;
		max-width: 56ch;
	}

	.season-log {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.log-entry {
		border-radius: 20px;
		padding: 14px 20px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 6px 20px;
	}

	.log-key {
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--primary);
	}

	.log-value {
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--on-var);
		grid-column: span 2;
		min-width: 0;
	}

	.season-photo {
		aspect-ratio: 4 / 3;
		border-radius: 28px;
		display: grid;
		place-items: center;
		padding: 20px;
	}

	.season-photo-tag {
		background: var(--sc-highest);
		border-radius: 999px;
		padding: 10px 18px;
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
		text-align: center;
	}

	.season-fig {
		padding: 14px 6px 0;
		font-size: 11px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--on-var);
	}
</style>
