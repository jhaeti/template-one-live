const express = require("express");

const User = require("../db/models/user");
const Item = require("../db/models/item");

const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");

const router = express.Router();

// Get all user from the database
router.get("/admin/users", auth, adminAuth, async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Get all items from database
router.get("/admin/items", auth, adminAuth, async (req, res) => {
	try {
		const items = await Item.find();
		res.send(items);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Count number of Items in database
router.get("/admin/items-count", auth, adminAuth, async (req, res) => {
	try {
		const count = await Item.countDocuments();
		if (!count) throw new Error("Server side error");
		res.json(count);
	} catch (e) {
		res.status(500).json(e.message);
	}
});
// Count number of Users in database
router.get("/admin/users-count", auth, adminAuth, async (req, res) => {
	try {
		const count = await User.countDocuments();
		if (!count) throw new Error("Server side error");
		res.json(count);
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// Deletes any items by the id
// User does not exist
router.delete("/admin/items/:id", auth, adminAuth, async (req, res) => {
	try {
		const id = req.params;
		const item = Item.findByIdAndDelete(id);
		res.status(200).json(item);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Delete any user by their id
// This is only accessible only by admins
router.delete("/admin/users/:id", auth, adminAuth, async (req, res) => {
	try {
		const id = req.params;
		const user = User.findByIdAndDelete(id);
		res.status(101).json(user);
	} catch (e) {
		res.sendStatus(500);
	}
});

module.exports = router;
