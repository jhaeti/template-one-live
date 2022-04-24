const express = require("express");

const Item = require("../models/item");
const auth = require("./middleware/auth");

const router = express.Router();

// Gets all Items and sends it in json
router.get("/items", auth, async (req, res) => {
    try {
        await req.user.populate("items").execPopulate();
        const items = req.user.items.reverse();
        res.json(items);
    } catch (e) {
        console.log(e);
    }
});

// Post an item to /items
router.post("/items", auth, async (req, res) => {
    const { name } = req.body;
    const newUser = new Item({ name, owner: req.user._id });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (e) {
        res.sendStatus(500);
    }
});

// Deleting an Item
router.delete("/items/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findOneAndDelete({
            _id: id,
            owner: req.user.id,
        });

        if (item === null) {
            return res.sendStatus(401);
        }

        res.json(`${item.name} is deleted successfully`);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;
