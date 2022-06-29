const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = require("../src/app");
const Product = require("../src/db/models/product");
const User = require("../src/db/models/user");

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

const productOne = {
	_id: mongoose.Types.ObjectId(),
	name: "Rice",
	price: 3,
	description: "This is one of the most liked food in my area.",
	quantity: 10,
	owner: userOneId,
};
const productTwo = {
	_id: mongoose.Types.ObjectId(),
	name: "Candy",
	price: 3,
	quantity: 10,
	description: "This is another thing kids don't joke with.",
};

const {
	DEFAULT_ADMIN_EMAIL: email,
	DEFAULT_ADMIN_PASSWORD: password,
	AUTH_COOKIE_NAME,
} = process.env;

beforeEach(async () => {
	await User.deleteMany({ role: "BASIC" });
	await Product.deleteMany();
	await new User(userOne).save();
	await new Product(productOne).save();
	await new Product(productTwo).save();
});

afterEach(async () => {
	await Product.deleteMany();
	await User.deleteMany({ role: "BASIC" });
});

afterAll((done) => {
	// Closing the DB connection allows Jest to exit successfully.
	mongoose.connection.close();
	done();
});

test("Not logged in users should be able to access products", async () => {
	const res = await request(app).get("/products");
	expect(res.status).toBe(200);
	expect(res.body).not.toBeNull();
	expect(res.body).toHaveLength(2);
});

test("Should add a Product", async () => {
	const admin = await request(app)
		.post("/users/login")
		.send({
			email,
			password,
		})
		.expect(200);

	const res = await request(app)
		.post("/products")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${admin.body.token}`)
		.send({
			name: "Banku",
			price: 3.2,
			quantity: 10,
			description: "This one of the most liked food in Ghana",
		});
	expect(res.status).toBe(201);
	expect(res.body).not.toBeNull();
	expect(res.body.name).toBe("Banku");
});

test("Should send an error message when basic role users try to add a product", async () => {
	const res = await request(app).post("/products").send({
		name: "Banku",
		price: 3.2,
		quantity: 10,
		description: "This one of the most liked food in Ghana",
	});
	expect(res.status).toBe(401);
	expect(res.body).not.toBeNull();
	expect(res.body).toBe("No token, authorisation deneid");
});

test("Basic role users should not be able to add product", async () => {
	const res = await request(app)
		.post("/products")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${userOne.tokens[0].token}`)
		.send({
			name: "Banku",
			price: 3.2,
			quantity: 10,
			description: "This one of the most liked food in Ghana",
		});
	expect(res.status).toBe(403);
});

test("Admin should be able to get the total number of product", async () => {
	const admin = await request(app)
		.post("/users/login")
		.send({ email, password })
		.expect(200);
	const res = await request(app)
		.get("/products-count")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${admin.body.token}`)
		.expect(200);
	expect(res.body).not.toBeNull();
	expect(res.body).toBeDefined();
	expect(res.body).toBe(2);
});

test("Basic role users shouldn't be able to get products count", async () => {
	const res = await request(app)
		.get("/products-count")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${userOne.tokens[0].token}`);
	expect(res.status).toBe(403);
});

test("Deleting products by basic role users should fail", async () => {
	const { _id: id } = productOne;
	const res = await request(app)
		.delete("/products")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${userOne.tokens[0].token}`)
		.send([id]);
	expect(res.status).toBe(403);
});

test("Should successfully delete product if the user has admin role", async () => {
	const { _id: id } = productOne;
	const admin = await request(app)
		.post("/users/login")
		.send({ email, password })
		.expect(200);
	const res = await request(app)
		.delete("/products")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${admin.body.token}`)
		.send([id]);

	expect(res.status).toBe(200);
	expect(res.body).toBe(1);
});
