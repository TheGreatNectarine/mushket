"use strict"
const express = require("express")
const router = express.Router()
const subjects = require("../db/subject-dao")
const students = require("../db/students-dao")

/* GET home page. */
router.get("/", function (req, res, next) {
	let course = require("../db/_testing_obj").courseExample
	let courses = []
	for (let i = 0; i < 10; i++)
		courses[i] = course
	res.render("pages/index", {courses: courses})
})

module.exports = router