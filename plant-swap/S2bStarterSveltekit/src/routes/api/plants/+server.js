/**
 * src/routes/api/plants/+server.js — add a plant (POST /api/plants)
 * ------------------------------------------------------------------
 * The gallery page's form fetches THIS route. It is inside our own
 * SvelteKit app, on the same address the browser is already using. It
 * forwards the request to Express using plantApi.js.
 *
 * (The routes for ONE plant, PATCH and DELETE, are in [id]/+server.js.)
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import { createPlant } from '#lib/server/plantApi.js';

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
		const newPlant = await createPlant(data);

		// 201 = Created: it worked AND a new plant now exists.
		return json(newPlant, { status: 201 });
	} catch (err) {
		console.error('Failed to create plant via Express:', err.message);

		// 502 = Bad Gateway: we could not get an answer from Express.
		return json({ error: 'Could not reach the Plant API' }, { status: 502 });
	}
}
