<script lang="ts">
	import { revealOnView } from '$lib/actions/reveal';
	import type { Partner } from '$lib/types';

	let { partners }: { partners: Partner[] } = $props();

	const pad = (i: number) => String(i + 1).padStart(2, '0');
</script>

<ol class="partner-list" role="list">
	{#each partners as partner, i (partner.name)}
		<li class="partner-item" use:revealOnView>
			<div class="partner-row card">
				<div class="partner-head">
					<span class="partner-index" aria-hidden="true">{pad(i)}</span>
					<h3 class="partner-name">{partner.name}</h3>
				</div>
				<p class="partner-note">{partner.note}</p>
			</div>
		</li>
	{/each}
</ol>

<style>
	.partner-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	/* Same row geometry as the history build-log entries: a fixed-ish key column
	   against a wide value column, wrapping rather than an auto-fit grid. */
	.partner-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 30px;
		align-items: baseline;
		padding: 18px 24px;
		transition: border-color 0.18s ease;
	}

	.partner-head {
		flex: 0 1 190px;
		display: flex;
		align-items: baseline;
		gap: 10px;
		min-width: 0;
	}

	.partner-index {
		font-size: 10.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.08em;
		color: var(--outline);
		flex: none;
	}

	.partner-name {
		margin: 0;
		font-size: 11px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--primary);
	}

	.partner-note {
		flex: 1 1 340px;
		min-width: 0;
		margin: 0;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--on-var);
	}

	.partner-item:hover .partner-row {
		border-color: var(--primary);
	}
</style>
