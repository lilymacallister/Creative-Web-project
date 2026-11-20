/**
 * src/routes/shelf/[id]/+page.server.js — loads one plant for /shelf/[id]
 * ------------------------------------------------------------------
 * load() reads the route ID from params and asks Express for that plant
 * through plantApi.js. It gives the result to +page.svelte as `data.plant`.
 *
 * If Express cannot be reached, we call error(), and SvelteKit shows
 * src/routes/+error.svelte with our message.
 * ------------------------------------------------------------------
 */

import { error } from '@sveltejs/kit';
import { getPlant } from '#lib/server/plantApi.js';

export async function load({ params }) {
	try {
		const plant = await getPlant(params.id);

		return { plant };
	} catch (err) {
		console.error('Failed to reach the Plant API:', err.message);

		// 502 = Bad Gateway: we could not get an answer from Express.
		error(502, "Couldn't reach the Plant API. Is the Express server running?");
	}
}
