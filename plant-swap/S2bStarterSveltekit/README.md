# S2bStarterSveltekit

The SvelteKit app for the Sketch Gallery. It never talks to MongoDB, and the browser never talks to Express. The browser calls this app's own routes, and this app calls the Express API (`S2bStarterExpress`).

## Run it

Start `S2bStarterExpress` first, then:

```
npm install
cp .env.example .env     # SKETCH_API_URL is the address of the Express API
npm run dev
```

Open http://localhost:5173

## Where things are

| File | What it does |
|---|---|
| `src/routes/gallery/+page.server.js` | `load()`: gets the list of sketches from Express before the page is sent. |
| `src/routes/gallery/+page.svelte` | The page: the list, the add form, the star and ✕ buttons. Each button does a `fetch()` to this app's own `/api/sketches` routes. |
| `src/routes/api/sketches/+server.js` | Add a sketch (POST). Forwards to Express. |
| `src/routes/api/sketches/[id]/+server.js` | Change (PATCH) or delete (DELETE) one sketch. Forwards to Express. |
| `src/lib/server/sketchApi.js` | The only file that calls Express. |
| `src/env.js` | Lists the variables from `.env` the app may use. |
| `src/routes/+error.svelte` | The page shown when `load()` calls `error()`. |

## The flow

```
page button → fetch('/api/sketches/...') → [id]/+server.js → sketchApi.js → Express → MongoDB
```
