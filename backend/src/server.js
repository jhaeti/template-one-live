const app = require("./app");
const auth = require("./routes/middleware/auth")

app.get("/name", auth, (req, res) => {
	const name = req.user.name
	res.json(name);
});

const port = process.env.PORT;

app.listen(port, console.log(`Server started on port ${port}`));
