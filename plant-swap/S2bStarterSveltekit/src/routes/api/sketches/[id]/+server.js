/**
 * src/routes/api/sketches/[id]/+server.js — change or delete ONE sketch
 * ------------------------------------------------------------------
 *   PATCH  /api/sketches/<id> — change some fields (the favourite star)
 *   DELETE /api/sketches/<id> — remove it (the ✕ button)
 *
 * The folder name [id] means any value in that part of the URL is
 * allowed, and SvelteKit gives it to us as params.id. Same shape as
 * ../+server.js: forward the request to Express with sketchApi.js.
 *
 * params.id is text, and a MongoDB id is text too, so we pass it on
 * exactly as it is.
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import { updateSketch, deleteSketch } from '#lib/server/sketchApi.js';

export async function PATCH({ params, request }) {
	let changes;
	try {
		changes = await request.json();
	} catch (err) {
		return json({ error: 'Send a JSON body of changes' }, { status: 400 });
	}

	try {
		const updated = await updateSketch(params.id, changes);

		// 404 = Not Found: Express answered, but no sketch has this id.
		if (!updated) {
			return json({ error: `No sketch found with id ${params.id}` }, { status: 404 });
		}

		return json(updated);
	} catch (err) {
		console.error('Failed to update sketch via Express:', err.message);
		return json({ error: 'Could not reach the Sketch API' }, { status: 502 });
	}
}

export async function DELETE({ params }) {
	try {
		const wasDeleted = await deleteSketch(params.id);

		if (!wasDeleted) {
			return json({ error: `No sketch found with id ${params.id}` }, { status: 404 });
		}

		// 204 = No Content: it worked, and there is nothing to send back.
		// A 204 has no body, so we send a bare Response instead of json().
		return new Response(null, { status: 204 });
	} catch (err) {
		console.error('Failed to delete sketch via Express:', err.message);
		return json({ error: 'Could not reach the Sketch API' }, { status: 502 });
	}
}
