"use strict";
const express = require("express");
const router = express.Router();
const subjects = require("../db/subject-dao");

router.get("/", async (req, res, next) => {
	const results = await subjects.getFilteredSubjects({
		faculty: "Факультет інформатики",
		tags: ["Факультет інформатики", "Програмування", "C++"],
		credits: 3,
		trimester: "2Д",
		specialization: "ІПЗ",
		subject_type: "Професійно-орієнтований"
	});
	res.send(results);
});

module.exports = router;