/**
 * index.js — the Sketch Gallery API (Express).
 * ------------------------------------------------------------------
 * This is a separate program from the SvelteKit app, with its own
 * package.json, its own port and its own .env.
 *
 * It connects to MongoDB Atlas, then answers four routes. Each route
 * checks the request, calls ONE function from ./lib/sketchData.js, and
 * sends back the result with a status code. The database work lives in
 * sketchData.js, not here.
 * ------------------------------------------------------------------
 */

import 'dotenv/config'; // reads the .env file into process.env
import express from 'express';
import mongoose from 'mongoose';
import * as sketchData from './lib/sketchData.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Parses incoming JSON request bodies into req.body.
app.use(express.json());

// A request logger, handy when two servers are running side by side.
app.use((req, res, next) => {
	console.log(`[sketch-api] ${req.method} ${req.path}`);
	next();
});

// --- GET /api/sketches — list every sketch ---------------------------------
app.get('/api/sketches', async (req, res) => {
	try {
		// await means: pause here until the database answers, then carry on.
		const sketches = await sketchData.getAll();
		res.json(sketches);
	} catch (err) {
		console.error('Failed to read sketches:', err.message);
		res.status(500).json({ error: 'Could not read sketches' });
	}
});

// --- POST /api/sketches — add a new sketch ----------------------------------
app.post('/api/sketches', async (req, res) => {
	try {
		// With no Content-Type header, req.body is undefined, so check first.
		if (!req.body) {
			return res.status(400).json({ error: 'title, artist and colorTag are all required' });
		}

		const { title, artist, colorTag } = req.body;

		// 400 = Bad Request: the caller left out something we need.
		if (!title || !artist || !colorTag) {
			return res.status(400).json({ error: 'title, artist and colorTag are all required' });
		}

		const newSketch = await sketchData.create({ title, artist, colorTag });

		// 201 = Created: it worked AND a new sketch now exists.
		res.status(201).json(newSketch);
	} catch (err) {
		console.error('Failed to create sketch:', err.message);
		res.status(500).json({ error: 'Could not create sketch' });
	}
});

// --- PATCH /api/sketches/:id — change some fields of one sketch --------------
// The URL says WHICH sketch (:id). The JSON body says WHAT to change,
// e.g. { "favourite": true }.
app.patch('/api/sketches/:id', async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({ error: 'a JSON body of changes is required' });
		}

		// The id stays as text: MongoDB ids are text, so there is no Number() here.
		const updated = await sketchData.update(req.params.id, req.body);

		// 404 = Not Found: the request was fine, but no sketch has this id.
		if (!updated) {
			return res.status(404).json({ error: `No sketch found with id ${req.params.id}` });
		}

		res.json(updated);
	} catch (err) {
		console.error('Failed to update sketch:', err.message);
		res.status(500).json({ error: 'Could not update sketch' });
	}
});

// --- DELETE /api/sketches/:id — remove one sketch ----------------------------
app.delete('/api/sketches/:id', async (req, res) => {
	try {
		const removed = await sketchData.remove(req.params.id);

		if (!removed) {
			return res.status(404).json({ error: `No sketch found with id ${req.params.id}` });
		}

		// 204 = No Content: it worked, and there is nothing left to send back.
		res.status(204).send();
	} catch (err) {
		console.error('Failed to delete sketch:', err.message);
		res.status(500).json({ error: 'Could not delete sketch' });
	}
});

// --- Connect to MongoDB, then start listening --------------------------------
// The connection string (MONGODB_URI) comes from .env. The database name is
// part of that string. The collection comes from the model's name (see
// models/Sketch.js).
async function start() {
	try {
		// await means: pause here until Atlas answers, then carry on.
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('Could not connect to MongoDB. Check MONGODB_URI in .env:', err.message);
		process.exit(1);
	}

	app.listen(PORT, () => {
		console.log(`Sketch Gallery API listening on http://localhost:${PORT}`);
	});
}

start();
