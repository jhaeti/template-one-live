const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = require("../src/app");
const Item = require("../src/models/item");
const User = require("../src/models/user");

const userOneId = mongoose.Types.ObjectId();

const userOne = {
	_id: userOneId,
	name: "Ibrahim1",
	email: "ibrahim1@example.com",
	password: "ibrahim123",
	tokens: [
		{ token: jwt.sign({ id: userOneId }, process.env.JWT_SECRET_KEY) },
	],
};

const itemOne = { name: "Rice", owner: userOneId };
const itemTwo = { name: "Candy", owner: userOneId };

beforeEach(async () => {
	await User.deleteMany();
	await Item.deleteMany();
	await new User(userOne).save();
	await new Item(itemOne).save();
	await new Item(itemTwo).save();
});

afterAll((done) => {
	// Closing the DB connection allows Jest to exit successfully.

	mongoose.connection.close();
	done();
});

test("Not logged in users should not be able to access items", async () => {
	let response = await request(app).get("/items");
	response = JSON.stringify(response);
	response = JSON.parse(response);
	expect(response.status).toBe(401);
});

test("Should get 2 items", async () => {
	const response = await request(app)
		.get("/items")
		.set(
			"Cookie",
			`${process.env.AUTH_COOKIE_NAME}=${userOne.tokens[0].token}`
		)
		.send();
	expect(response.statusCode).toBe(200);
	expect(response.body).toHaveLength(2);
});
