"use strict"

const express = require("express")
const router = express.Router()
const subjects = require("../db/subject-dao")
// const students = require("../db/students-dao");

router.post("/", async (req, res, next) => {
	const args = req.body
	console.log(args);
	const result = await subjects.createSubject(args)
	res.send(result)
})

module.exports = router
