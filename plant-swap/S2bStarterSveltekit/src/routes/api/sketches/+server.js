/**
 * src/routes/api/sketches/+server.js — add a sketch (POST /api/sketches)
 * ------------------------------------------------------------------
 * The gallery page's form fetches THIS route. It is inside our own
 * SvelteKit app, on the same address the browser is already using. It
 * forwards the request to Express using sketchApi.js.
 *
 * (The routes for ONE sketch, PATCH and DELETE, are in [id]/+server.js.)
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import { createSketch } from '#lib/server/sketchApi.js';

export async function POST({ request }) {
	// request.json() reads the JSON body the page sent. If the body is
	// missing or broken it throws, so it gets its own try/catch.
	// 400 = Bad Request: the caller sent something we cannot use.
	let data;
	try {
		data = await request.json();
	} catch (err) {
		return json({ error: 'Send a JSON body' }, { status: 400 });
	}

	try {
		// await means: pause here until Express has answered, then carry on.
		const newSketch = await createSketch(data);

		// 201 = Created: it worked AND a new sketch now exists.
		return json(newSketch, { status: 201 });
	} catch (err) {
		console.error('Failed to create sketch via Express:', err.message);

		// 502 = Bad Gateway: we could not get an answer from Express.
		return json({ error: 'Could not reach the Sketch API' }, { status: 502 });
	}
}
