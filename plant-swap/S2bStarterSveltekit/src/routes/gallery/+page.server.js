/**
 * src/routes/gallery/+page.server.js — loads the sketches for /gallery
 * ------------------------------------------------------------------
 * load() runs on the server before the page is sent. It asks Express for
 * the sketches (through sketchApi.js) and gives them to +page.svelte as
 * the `data` prop.
 *
 * If Express cannot be reached, we call error(), and SvelteKit shows
 * src/routes/+error.svelte with our message.
 * ------------------------------------------------------------------
 */

import { error } from '@sveltejs/kit';
import { fetchSketches } from '#lib/server/sketchApi.js';

export async function load() {
	try {
		// await means: pause here until Express answers, then carry on.
		const sketches = await fetchSketches();
		return { sketches };
	} catch (err) {
		console.error('Failed to reach the Sketch API:', err.message);

		// 502 = Bad Gateway: we could not get an answer from Express.
		error(502, "Couldn't reach the Sketch API. Is the Express server running?");
	}
}
