<script lang="ts">
	import type { Pillar } from '$lib/types';

	let { pillars }: { pillars: Pillar[] } = $props();
</script>

<section class="pillar-grid">
	{#each pillars as pillar (pillar.n)}
		<div class="pillar-card card">
			<div class="pillar-index">{pillar.n}</div>
			<div class="pillar-title heading-display">{pillar.title}</div>
			<div class="pillar-body">{pillar.body}</div>
		</div>
	{/each}
</section>

<style>
	.pillar-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 16px;
	}

	.pillar-card {
		border-radius: var(--radius-panel);
		padding: 34px 32px;
	}

	.pillar-index {
		font-family: var(--font-display);
		font-size: 13px;
		font-weight: var(--weight-medium);
		letter-spacing: 0.05em;
		color: var(--primary);
		margin-bottom: 22px;
	}

	.pillar-title {
		font-size: 19px;
		font-weight: var(--weight-light);
		letter-spacing: 0;
		margin-bottom: 14px;
	}

	.pillar-body {
		font-size: 14.5px;
		line-height: 1.65;
		color: var(--on-var);
	}
</style>
