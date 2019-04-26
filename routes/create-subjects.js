"use strict"

const express = require("express")
const router = express.Router()
const createSubjects = require("../db/subject-dao")
// const students = require("../db/students-dao");

router.post("/", async (req, res, next) => {
	const args = req.body
	const result = await createSubjects.createSubject(args)
	res.send(result)
})

module.exports = router
