"use strict";
const express = require("express");
const router = express.Router();
const subjects = require("../db/subject-dao");

router.get("/", async (req, res, next) => {
	const filterArgs = req.query;
	console.log(filterArgs);
	const results = await subjects.getFilteredSubjects({
		faculty: "Факультет інформатики",
		tags: ["Факультет інформатики", "Програмування", "C++"],
		credits: 3,
		trimester: "2Д",
		specialization: "ІПЗ", //TODO getStudentsSpecializationByID
		subject_type: "Професійно-орієнтований"
	});
	res.send({results: results, filters: filterArgs});
});

module.exports = router;