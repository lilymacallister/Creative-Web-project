# S2bStarterExpress

The Express API for the Sketch Gallery. It is the only program that talks to MongoDB, through Mongoose. The SvelteKit app (`S2bStarterSveltekit`) talks to this.

## Run it

```
npm install
cp .env.example .env     # then edit .env: your connection string and database name
npm run dev
```

It listens on http://localhost:3001.

## Where things are

| File | What it does |
|---|---|
| `index.js` | Connects to MongoDB (using `MONGODB_URI` from `.env`), then the four routes. Each route checks the request, calls one function from `lib/sketchData.js`, and sends a status code. |
| `lib/sketchData.js` | The database work: `getAll`, `create`, `update`, `remove`. |
| `models/Sketch.js` | The schema (the shape of a sketch) and the model. The model's name decides the collection name. |
| `.env` | Secret settings. Not committed. `.env.example` lists the names. |

## Routes

| Method | Path | Success |
|---|---|---|
| GET | `/api/sketches` | 200 and the list |
| POST | `/api/sketches` | 201 and the new sketch |
| PATCH | `/api/sketches/:id` | 200 and the updated sketch |
| DELETE | `/api/sketches/:id` | 204 |
