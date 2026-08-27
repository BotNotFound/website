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
		border-radius: 32px;
		padding: 34px 32px;
	}

	.pillar-index {
		width: 34px;
		height: 34px;
		border-radius: 999px;
		background: var(--p-container);
		color: var(--on-p-container);
		display: grid;
		place-items: center;
		font-size: 12px;
		font-weight: 700;
		margin-bottom: 18px;
	}

	.pillar-title {
		font-size: 18px;
		line-height: 1.3;
		margin-bottom: 14px;
	}

	.pillar-body {
		font-size: 14.5px;
		line-height: 1.65;
		color: var(--on-var);
	}
</style>
