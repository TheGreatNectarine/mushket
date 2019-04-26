"use strict"
const express = require("express")
const router = express.Router()
const subjects = require("../db/subject-dao")
const students = require("../db/students-dao")
const faculties = require("../db/faculty-dao")
const fetch = require("node-fetch")

/* GET home page. */
router.get("/", async (req, res, next) => {
	let filterArgs = req.query
	if (res.locals.user.role === "student") {
		filterArgs["studentID"] = res.locals.user.model.id
	} else {
		delete filterArgs["studentID"]
	}

	const filterConfig = {
		"trymesters": ["1", "2", "2д", "3", "4", "4д", "5", "6", "6д", "7", "8"],
		"credits": {
			"min": 2,
			"max": 12,
			"step": 0.5
		},
		"types": ["Професійно-орієнтована", "Нормативна", "Вибіркова"],
		"faculties": (await faculties.getAllFaculties()).data,
		"selectedArgs": filterArgs
	}

	let results = []
	try {
		results = await subjects.getFilteredSubjects(req.query)
	} catch (e) {
		results = []
	}

	res.render("pages/index", {courses: results.data, filterConfig: filterConfig})
})

router.get("/search", async (req, res, next) => {
	let filterArgs = req.query
	const kwds = req.query.keywords
	let data = null
	if (kwds) {
		const url = "https://mushket.place-for-work.space/search?keywords=" + encodeURIComponent(kwds)
		try {
			const response = await fetch(url)
			data = await response.json()
			console.log(json)
		} catch (error) {
			console.log(error)
		}

		console.log(data)
	}
	if (res.locals.user.role === "student") {
		filterArgs["studentID"] = res.locals.user.model.id
	} else {
		delete filterArgs["studentID"]
	}

	const filterConfig = {
		"trymesters": ["1", "2", "2д", "3", "4", "4д", "5", "6", "6д", "7", "8"],
		"credits": {
			"min": 2,
			"max": 12,
			"step": 0.5
		},
		"types": ["Професійно-орієнтована", "Нормативна", "Вибіркова"],
		"faculties": (await faculties.getAllFaculties()).data,
		"selectedArgs": filterArgs
	}

	let ids = []
	if (data) {
		for (let e of data) {
			ids.push(e._source.id)
		}
	}

	let results = []
	let newRes = []
	try {
		results = await subjects.getFilteredSubjects(req.query)
		console.log("a")
		results.data = results.data.filter(el => ids.findIndex(id => el.id === id) >= 0)
		console.log({results, ids})
	} catch (e) {
		console.log("c")
		console.log(e)
		results.data = []
	}

	res.render("pages/index", {courses: results.data, filterConfig: filterConfig})
})

module.exports = router
