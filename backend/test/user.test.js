const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../src/app");

const User = require("../src/db/models/user");

const userOneId = mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: "Ibrahim123",
	email: "ibrahim123@example.com",
	password: "ibrahim123",
	tokens: [
		{ token: jwt.sign({ id: userOneId }, process.env.JWT_SECRET_KEY) },
	],
};

const userTwoId = mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: "Ibrahim1234",
	email: "ibrahim1234@example.com",
	password: "ibrahim1234",
	tokens: [
		{ token: jwt.sign({ id: userTwoId }, process.env.JWT_SECRET_KEY) },
	],
};

const {
	DEFAULT_ADMIN_EMAIL: email,
	DEFAULT_ADMIN_PASSWORD: password,
	AUTH_COOKIE_NAME,
} = process.env;

let admin;
beforeAll(async () => {
	// Clear database leaving admin
	await User.deleteMany({ role: "BASIC" });
	// Save users for testing
	await new User(userOne).save();
	await new User(userTwo).save();
	admin = await request(app)
		.post("/users/login")
		.send({ email, password })
		.expect(200);
});

afterAll(async () => {
	await User.deleteMany({});
	// Closing the DB connection allows Jest to exit successfully.
	await mongoose.connection.close();
});

test("Should not register a user if all fields are not provided", async () => {
	const res1 = await request(app)
		.post("/users/register")
		.send({ name: "Jhae", email: "jhae2@example.com" })
		.expect(400);
	// Checking if error message be sent correctly
	expect(res1.body).not.toBeNull();
	expect(res1.body).toBe("Please enter all fields");

	const res2 = await request(app)
		.post("/users/register")
		.send({ email: "jhae2@example.com", password: "jhae12345" })
		.expect(400);
	// Checking if error message be sent correctly
	expect(res2.body).not.toBeNull();
	expect(res2.body).toBe("Please enter all fields");
});

test("Should fail to register a user if the user already exist!", async () => {
	const res = await request(app)
		.post("/users/register")
		.send(userOne)
		.expect(400);
	// Checking if error message is sent correctly
	expect(res.body).not.toBeNull();
	expect(res.body).toBe("Invalid Credentials");
});

test("Should register a new User", async () => {
	const res = await request(app)
		.post("/users/register")
		.send({
			name: "Ti Jhae",
			email: "jhae1@example.com",
			password: "jhae123",
		})
		.expect(201);
	const user = await User.findOne({
		email: res.body.user.email,
	}).select("-date");

	// Checking whether user was found in database
	expect(user).not.toBeNull();

	// test whether cookie is set when registering user
	expect(res.header["set-cookie"][0].split("=")[0]).toBe(AUTH_COOKIE_NAME);
});

test("Should login user", async () => {
	const res = await request(app).post("/users/login").send({
		email: userOne.email,
		password: userOne.password,
	});
	// Checking whether correct status code was found
	expect(res.status).toBe(200);
	// Checking whether cookie is set
	expect(res.header["set-cookie"][0].split("=")[0]).toBe(AUTH_COOKIE_NAME);

	// Checking if user is sent back
	expect(res.body.user).toBeDefined();
});

test("Should not login user if email is not found", async () => {
	const res = await request(app).post("/users/login").send({
		email: "168896@example.com",
		password: userOne.password,
	});
	// Checking whether correct status code was sent
	expect(res.status).toBe(404);
});

test("Should not login user if password does not match", async () => {
	const res = await request(app).post("/users/login").send({
		email: userOne.email,
		password: "ibrahim1223",
	});
	// Checking if correct status code is sent
	expect(res.statusCode).toBe(404);
	// Checking cookies is cleared
	expect(res.header["set-cookie"]).toBeUndefined();
});

test("Should fetch user data if cookie is set correctly", async () => {
	const res = await request(app)
		.get("/users/me")
		.set(
			"Cookie",
			`${process.env.AUTH_COOKIE_NAME}=${userOne.tokens[0].token}`
		)
		.expect(200);

	// Checking if user if user is present
	expect(res.body.user).toBeDefined();
});
test("User should be able to delete self", async () => {
	const res = await request(app)
		.delete("/users/me")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${userTwo.tokens[0].token}`)
		.expect(200);

	// Checking if user if user is present
	expect(res.body.user.email).toBe(userTwo.email);
});
test("Should get the number of user from dataBase", async () => {
	const res = await request(app)
		.get("/users-count")
		.set("Cookie", `${AUTH_COOKIE_NAME}=${admin.body.token}`);
	// Checking for success
	expect(res.status).toBe(200);

	// Checking if user if user is present
	expect(res.body > 0).toBeTruthy();
});
test("Delete users by admin", async () => {
	const res = await request(app)
		.delete("/users")
		.send([userOneId])
		.set("Cookie", `${AUTH_COOKIE_NAME}=${admin.body.token}`);
	// Checking for success
	expect(res.status).toBe(200);

	// Checking if user is sent back
	expect(res.body > 0).toBeTruthy();
});
