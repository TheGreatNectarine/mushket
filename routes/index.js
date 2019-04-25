"use strict"
const express = require("express")
const router = express.Router()
const subjects = require("../db/subject-dao")
const students = require("../db/students-dao")

/* GET home page. */
router.get("/", async (req, res, next) => {
	let filterArgs = req.query
	if (res.locals.user.role === "student") {
		filterArgs["studentID"] = res.locals.user.model.id
	} else {
		delete filterArgs["studentID"]
	}
	let results = []
	try {
		results = await subjects.getFilteredSubjects(req.query)
	} catch (e) {
		results = []
	}
	res.render("pages/index", {courses: results.data, filters: filterArgs})
})

module.exports = router
