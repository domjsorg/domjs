// Scope variables
const express = require("express");
const app = express();
const path = require("path");
const config = require("./setup/config.cjs");
const fs = require("fs");
// path bars by platform
const separator = process.platform === "win32" ? "\\" : "/";

// Setting Middleware

// This is CORS-enabled for all origins!
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Serves resources from public folder
config.PUBLIC_DIRS_DEV.forEach((dir) => {
	app.use(express.static(path.join(__dirname, `${dir}`)));
});

// Return system configuration
app.get("/getSystemConfig", (req, res) => {
	res.send(config.system);
});

// Fetch a file
app.get("/getFile", (req, res) => {
	const myPath = path.join(`${__dirname}${separator}${req.query.path}`);
	fs.readFile(myPath, "utf8", (err, file) => {
		if (err) return res.send(err);
		res.send(file);
	});
});

// Fetch a file
app.get("/getScript", (req, res) => {
	const s = separator;
	const filePath = `src${s}domjs${s}${req.query.name}${s}${req.query.name}.js`;
	const myPath = path.join(`${__dirname}${separator}${filePath}`);
	fs.readFile(myPath, "utf8", (err, file) => {
		if (err) return res.send(err);
		res.send(file);
	});
});

app.get("/getDocumentation", (req, res) => {
	const s = separator;
	const filePath = "documentation/documentation.md";
	const myPath = path.join(`${__dirname}${s}${filePath}`);

	fs.readFile(myPath, "utf8", (err, file) => {
		if (err) return res.send(err);
		res.send(file);
	});
});

// Return Index.html
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, config.OUTPUT_HTML_DEV));
});

// Start up Application
app.listen(config.PORT);
console.log(`Listening on http://localhost:${config.PORT}`);
