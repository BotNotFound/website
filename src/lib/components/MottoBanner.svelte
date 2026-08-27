<script lang="ts">
	let { words }: { words: string[] } = $props();
</script>

<section class="motto-shell">
	<div class="motto panel">
		{#each words as word (word)}
			<span class="motto-word heading-display">{word}</span>
		{/each}
	</div>
</section>

<style>
	.motto-shell {
		max-width: var(--page-max);
		margin: 20px auto 0;
		padding: 0 20px;
	}

	.motto {
		color: var(--primary);
		padding: clamp(36px, 5vw, 64px) clamp(28px, 4vw, 56px);
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: center;
		gap: clamp(14px, 2vw, 30px);
		text-align: center;
	}

	.motto-word {
		font-size: clamp(20px, 3.6vw, 54px);
		line-height: 1.14;
	}
</style>
