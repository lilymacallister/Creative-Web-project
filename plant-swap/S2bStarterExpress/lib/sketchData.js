/**
 * lib/sketchData.js — all the database work for sketches.
 * ------------------------------------------------------------------
 * index.js (the routes) never talks to MongoDB itself. It calls one of
 * these four functions, and they use the Sketch model to do the work.
 *
 * Each function is async, because the database takes time to answer.
 * The routes in index.js use await to wait for the answer.
 * ------------------------------------------------------------------
 */

import Sketch from '../models/Sketch.js';

// READ — every sketch in the collection.
export async function getAll() {
	return Sketch.find();
}

// CREATE — save a new sketch. `data` holds title, artist and colorTag.
// Gives back the saved sketch.
export async function create(data) {
	return Sketch.create(data);
}

// UPDATE — change some fields of one sketch, found by its id.
// { new: true } makes it give back the sketch AFTER the change.
// runValidators: true checks the changes against the schema's rules.
// Gives back null if there is no sketch with that id.
export async function update(id, changes) {
	return Sketch.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
}

// DELETE — remove one sketch, found by its id.
// Gives back the removed sketch, or null if there was none with that id.
export async function remove(id) {
	return Sketch.findByIdAndDelete(id);
}
