const express = require("express");
const router = express.Router();
const subjects = require('../db/subject-dao')

router.get("/:id", async function (req, res, next) {
	// const course_id = req.params.id
	// let result;
	// try {
	// 	result = await subjects.getSubjectById(course_id)
	// } catch (e) {
	// 	result = []
	// }
	res.render("pages/course", {course: require("../db/_testing_obj").courseExample});
});

module.exports = router;
