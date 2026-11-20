/**
 * lib/plantData.js — all the database work for plants.
 * ------------------------------------------------------------------
 * index.js (the routes) never talks to MongoDB itself. It calls one of
 * these four functions, and they use the Plant model to do the work.
 *
 * Each function is async, because the database takes time to answer.
 * The routes in index.js use await to wait for the answer.
 * ------------------------------------------------------------------
 */

import Plant from '../models/Plant.js';

// READ — every plant in the collection.
export async function getAll(light) {
	if (light && light != "null") {
		return Plant.find({lightNeeds: light});
	} else {
		return Plant.find();
	}
}

export async function getById(id) {
	return Plant.findById(id);
}

// CREATE — save a new plant. `data` holds name, species and careInstructions.
// Gives back the saved plant.
export async function create(data) {
	return Plant.create(data);
}

// UPDATE — change some fields of one plant, found by its id.
// { new: true } makes it give back the plant AFTER the change.
// runValidators: true checks the changes against the schema's rules.
// Gives back null if there is no plant with that id.
export async function update(id, changes) {
	return Plant.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
}

// DELETE — remove one plant, found by its id.
// Gives back the removed plant, or null if there was none with that id.
export async function remove(id) {
	return Plant.findByIdAndDelete(id);
}
