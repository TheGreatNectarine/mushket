"use strict"
const express = require("express")
const router = express.Router()
const subjects = require("../db/subject-dao")
const students = require("../db/students-dao")

/* GET home page. */
router.get("/", async (req, res, next) => {
	let filterArgs = req.query
	if (locals.res.user.role === "student") {
		filterArgs["studentID"] = req.user.model.id
	} else {
		delete filterArgs["studentID"]
	}
	let courses = []
	try {
		courses = await subjects.getFilteredSubjects(req.query)
	} catch (e) {
		courses = []
	}
	res.render("pages/index", {courses: courses, filters: filterArgs})
})

module.exports = router
