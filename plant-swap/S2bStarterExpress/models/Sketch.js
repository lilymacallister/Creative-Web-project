/**
 * models/Sketch.js — the SCHEMA and the MODEL for a sketch.
 * ------------------------------------------------------------------
 * A schema describes the shape of one document: which fields it has,
 * their types, and which are required.
 *
 * A model is made from the schema. It is what the rest of the code uses
 * to talk to the database. The model's name decides the collection:
 * Mongoose lowercases it and makes it plural, so 'Sketch' is stored in
 * a collection called "sketches".
 * ------------------------------------------------------------------
 */

import mongoose from 'mongoose';

const sketchSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		artist: { type: String, required: true },
		colorTag: { type: String, required: true },
		favourite: { type: Boolean, default: false }
	},
	{
		// MongoDB stores each document's id as _id. This option makes the JSON
		// we send out include a plain "id" as well, which is what the
		// SvelteKit app reads.
		toJSON: { virtuals: true }
	}
);

const Sketch = mongoose.model('Sketch', sketchSchema);

export default Sketch;
