const mongoose = require("mongoose");

// Creating Item Model
const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
