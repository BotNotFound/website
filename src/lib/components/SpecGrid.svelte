<script lang="ts">
	import type { Spec } from '$lib/types';

	let { specs }: { specs: Spec[] } = $props();
</script>

<section class="spec-grid">
	{#each specs as spec (spec.k)}
		<div class="spec-card card">
			<div class="spec-key">{spec.k}</div>
			<div class="spec-value">{spec.v}</div>
		</div>
	{/each}
</section>

<style>
	.spec-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
		gap: 14px;
	}

	.spec-card {
		padding: 22px 24px;
	}

	.spec-key {
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--primary);
		margin-bottom: 10px;
	}

	.spec-value {
		font-size: 14.5px;
		line-height: 1.45;
	}
</style>
