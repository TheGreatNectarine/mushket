require("dotenv").config();
const sessions = require('./middleware/sessions');

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const setUpMiddleware = () => {
	app.use(sessions.sessionMiddleware);
}

const setUpRoutes = () => {
	app.use(`/`, require("./api/index"));
	app.use(`api/v1/students`, require("./api/studentsRouter"));
	app.use(`api/v1/teachers`, require("./api/teachersRouter"));
	app.use(`api/v1/subjects`, require("./api/subjectsRouter"));
	app.use(`api/v1/tags`, require("./api/tagsRouter"));
	app.use(`api/v1/faculties`, require("./api/facultiesRouter"));
	app.use(`api/v1/specializations`, require("./api/specializationsRouter"));
	app.use(`api/v1/chairs`, require("./api/chairsRouter"));
	app.use(`/api/v1/users`, require("./api/users"));
};


const setUpViews = () => {
	app.set("views", path.join(__dirname, "views"));
	app.set("view engine", "ejs");
};

const setUpModules = () => {
	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, "public")));
};

const setUpErrorHandlers = () => {
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		next(createError(404));
	});

// error handler
	app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get("env") === "development" ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render("error");
	});
};

setUpModules();
setUpMiddleware();
setUpRoutes();
setUpViews();
setUpErrorHandlers();

module.exports = app;
