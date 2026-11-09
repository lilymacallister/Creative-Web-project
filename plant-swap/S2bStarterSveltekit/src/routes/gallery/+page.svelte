<script>
	// `data` holds what load() in +page.server.js returned.
	let { data } = $props();

	// $state makes these reactive: the page updates when they change.
	let title = $state('');
	let artist = $state('');
	let colorTag = $state('#5da9ff');
	let submitting = $state(false);
	let submitError = $state('');
	let listError = $state('');

	// Our own copy of the list, seeded from load()'s data, so the page can
	// change straight after an add, star or delete without a reload.
	let sketches = $state(data.sketches);

	// ADD — the form. A plain fetch() to OUR OWN /api/sketches route
	// (src/routes/api/sketches/+server.js), never straight to Express.
	// SvelteKit forwards it to Express.
	async function handleSubmit(event) {
		event.preventDefault(); // stop the browser reloading the page
		submitting = true;
		submitError = '';

		try {
			// await means: pause here until the server answers, then carry on.
			const res = await fetch('/api/sketches', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, artist, colorTag })
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			// The API sends back the saved sketch (with its id). Add it to our list.
			const newSketch = await res.json();
			sketches.push(newSketch);

			title = '';
			artist = '';
			colorTag = '#5da9ff';
		} catch (err) {
			submitError = 'Could not add that sketch. Is the API running?';
			console.error(err);
		} finally {
			submitting = false;
		}
	}

	// UPDATE — the favourite star. A PATCH to OUR OWN /api/sketches/<id>
	// route (src/routes/api/sketches/[id]/+server.js), sending only the
	// field that changes.
	async function toggleFavourite(sketch) {
		listError = '';

		try {
			const res = await fetch(`/api/sketches/${sketch.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ favourite: !sketch.favourite })
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			// The API sends back the updated sketch. Copy the new value onto
			// the sketch in our list and the star changes.
			const updated = await res.json();
			sketch.favourite = updated.favourite;
		} catch (err) {
			listError = 'Could not update that sketch. Is the API running?';
			console.error(err);
		}
	}

	// DELETE — the ✕ button. A successful delete answers 204 (No Content),
	// so there is no body to read.
	async function deleteSketch(sketch) {
		listError = '';

		try {
			const res = await fetch(`/api/sketches/${sketch.id}`, {
				method: 'DELETE'
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			// Rebuild our list without that sketch: filter keeps every sketch
			// whose id is NOT the one we deleted.
			sketches = sketches.filter((s) => s.id !== sketch.id);
		} catch (err) {
			listError = 'Could not delete that sketch. Is the API running?';
			console.error(err);
		}
	}
</script>

<main>
	<h1>Sketch Gallery</h1>
	<p><a href="/">← Home</a></p>

	{#if listError}
		<p class="error">{listError}</p>
	{/if}

	<ul class="sketch-list">
		{#each sketches as sketch (sketch.id)}
			<li class="sketch-card" style="border-left-color: {sketch.colorTag}">
				<div>
					<strong>{sketch.title}</strong>
					<span class="artist">by {sketch.artist}</span>
				</div>
				<div class="buttons">
					<button
						class="icon-button"
						class:is-favourite={sketch.favourite}
						onclick={() => toggleFavourite(sketch)}
						title="Toggle favourite"
					>
						{sketch.favourite ? '★' : '☆'}
					</button>
					<button
						class="icon-button delete"
						onclick={() => deleteSketch(sketch)}
						title="Delete this sketch"
					>
						✕
					</button>
				</div>
			</li>
		{/each}
	</ul>

	<h2>Add a sketch</h2>
	<form onsubmit={handleSubmit}>
		<label>
			Title
			<input type="text" bind:value={title} required />
		</label>
		<label>
			Artist
			<input type="text" bind:value={artist} required />
		</label>
		<label>
			Colour
			<input type="color" bind:value={colorTag} />
		</label>
		<button type="submit" disabled={submitting}>
			{submitting ? 'Adding…' : 'Add sketch'}
		</button>
		{#if submitError}
			<p class="error">{submitError}</p>
		{/if}
	</form>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
	}
	.sketch-list {
		list-style: none;
		padding: 0;
	}
	.sketch-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-left: 6px solid #ccc;
		background: #f8f8f8;
		padding: 0.75rem 1rem;
		margin-bottom: 0.5rem;
		border-radius: 4px;
	}
	.artist {
		color: #666;
		margin-left: 0.5rem;
		font-size: 0.9rem;
	}
	.buttons {
		display: flex;
		gap: 0.25rem;
	}
	.icon-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #ccc;
	}
	.icon-button.is-favourite {
		color: #f5a623;
	}
	.icon-button.delete:hover {
		color: #b91c1c;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 20rem;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.9rem;
	}
	.error {
		color: #b91c1c;
	}
</style>
