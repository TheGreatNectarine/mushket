var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	let course = require("../db/_testing_obj").courseExample
	let courses = []
	for (let i=0; i < 10; i++)
		courses[i] = course
	res.render("pages/index", {courses: courses});
});

module.exports = router;
