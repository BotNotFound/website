<script lang="ts">
	import type { Partner } from '$lib/types';

	let { partners }: { partners: Partner[] } = $props();
</script>

<div class="partner-list">
	{#each partners as partner (partner.name)}
		<div class="partner-chip card">
			<span class="partner-name">{partner.name}</span>
			<span class="partner-note">{partner.note}</span>
		</div>
	{/each}
</div>

<style>
	.partner-list {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.partner-chip {
		border-radius: 999px;
		padding: 14px 24px;
		display: flex;
		align-items: baseline;
		gap: 12px;
		flex-wrap: wrap;
	}

	.partner-name {
		font-size: 14.5px;
		font-weight: 600;
	}

	.partner-note {
		font-size: 12.5px;
		color: var(--on-var);
	}
</style>
