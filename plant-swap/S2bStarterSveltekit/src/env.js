/**
 * src/env.js — lists the environment variables this app is allowed to use.
 * ------------------------------------------------------------------
 * Only variables named here can be imported from $app/env/private.
 * SKETCH_API_URL is private (server-only), so the address of the Express
 * API never reaches the browser. Its value lives in .env.
 *
 * If SKETCH_API_URL is missing from .env, SvelteKit will not start and
 * names the missing variable.
 * ------------------------------------------------------------------
 */

import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SKETCH_API_URL: {}
});
