<script lang="ts">
	let {
		label,
		caption,
		location = 'Redmond, Washington',
		aspect = '21 / 9'
	}: { label: string; caption: string; location?: string; aspect?: string } = $props();
</script>

<section class="photo-panel panel">
	<div class="photo-frame" style:aspect-ratio={aspect}>
		<span class="photo-tag">{label}</span>
	</div>
	<div class="photo-caption">
		<span>{caption}</span><span>{location}</span>
	</div>
</section>

<style>
	.photo-panel {
		padding: 28px;
	}

	.photo-frame {
		width: 100%;
		border-radius: 24px;
		background: var(--sc);
		border: 1px solid var(--outline);
		display: grid;
		place-items: center;
	}

	.photo-tag {
		background: var(--sc-highest);
		border-radius: 999px;
		padding: 11px 20px;
		font-size: 11.5px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}

	.photo-caption {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px;
		padding: 16px 12px 4px;
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-var);
	}
</style>
