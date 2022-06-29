const mongoose = require("mongoose");

// Creating Item Model
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		trim: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	ns: {
		type: Number,
		default: 0,
		alias: "numberSold",
	},
	description: {
		type: String,
		trim: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
