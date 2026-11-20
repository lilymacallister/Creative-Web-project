<script>
	let { data } = $props();
	let plant = $state(data.plant);
	let listError = $state('');

	$effect(() => {
		plant = data.plant;
	});

	// UPDATE — the swapped star. A PATCH to OUR OWN /api/plants/<id>
	// route (src/routes/api/plants/[id]/+server.js), sending only the
	// field that changes.
	async function toggleSwapped(plant) {
		listError = '';

		try {
			const res = await fetch(`/api/plants/${plant.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ swapped: !plant.swapped })
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			// The API sends back the updated plant. Copy the new value onto
			// the plant in our list and the star changes.
			const updated = await res.json();
			plant.swapped = updated.swapped;
		} catch (err) {
			listError = 'Could not update that plant. Is the API running?';
			console.error(err);
		}
	}
</script>

<main>
	<h1>{plant.species}</h1>
	<p><a href="/shelf/">← Plant Shelf</a></p>

	{#if listError}
		<p class="error">{listError}</p>
	{/if}

	<div class="card" style:--card-color={plant.swapped ? "#999999" : "#99DD44"}>
		<span class="swatch"></span>
		<h3>{plant.species}</h3>
		<p>Given by <b>{plant.name}</b></p>
		<p>Light needs: <b>{plant.lightNeeds}</b></p>
		<p>{plant.swapped ? "This plant has already been swapped." : "This plant is available to swap!"}</p>
		<button
						class="icon-button swap"
						onclick={() => toggleSwapped(plant)}
						title="Toggle swapped"
					>
						⇆
					</button>
	</div>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
	}
	.card {
		display: block;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1rem;
		text-decoration: none;
		color: inherit;
		transition: box-shadow 0.15s ease;
		margin-top: 1rem;
	}
	a.card:hover {
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
	.swatch {
		display: block;
		width: 100%;
		height: 60px;
		border-radius: 4px;
		background: var(--card-color, #ccc);
		margin-bottom: 0.75rem;
	}
	h3 {
		margin: 0 0 0.35rem 0;
	}
	p {
		margin: 0;
		color: #555;
		font-size: 0.9rem;
	}
	.icon-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #ccc;
	}
	.icon-button.swap:hover {
		color: #1cb93e;
	}
</style>
