"use strict";
const express = require("express");
const router = express.Router();
const subjects = require("../db/subject-dao");
const students = require("../db/students-dao");

router.get("/", async (req, res, next) => {
	const filterArgs = req.query;
	console.log(req.user.model);
	const results = await subjects.getFilteredSubjects({
		faculty: "Факультет інформатики",
		tags: ["Факультет інформатики", "Програмування", "C++"],
		credits: 3,
		trimester: "2Д",
		specialization: "students.getStudentsSpecializationByID()",
		subject_type: "Професійно-орієнтований"
		//знайти проф-орієнтовані дисципліни для студента з айді
	});
	res.send({results: results, filters: filterArgs});
});

module.exports = router;