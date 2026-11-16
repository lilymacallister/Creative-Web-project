/**
 * src/routes/gallery/+page.server.js — loads the plants for /gallery
 * ------------------------------------------------------------------
 * load() runs on the server before the page is sent. It asks Express for
 * the plants (through plantApi.js) and gives them to +page.svelte as
 * the `data` prop.
 *
 * If Express cannot be reached, we call error(), and SvelteKit shows
 * src/routes/+error.svelte with our message.
 * ------------------------------------------------------------------
 */

import { error } from '@sveltejs/kit';
import { fetchPlants } from '#lib/server/plantApi.js';

export async function load() {
	try {
		// await means: pause here until Express answers, then carry on.
		const plants = await fetchPlants();
		return { plants };
	} catch (err) {
		console.error('Failed to reach the Plant API:', err.message);

		// 502 = Bad Gateway: we could not get an answer from Express.
		error(502, "Couldn't reach the Plant API. Is the Express server running?");
	}
}
