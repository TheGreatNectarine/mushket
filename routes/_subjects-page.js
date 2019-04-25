"use strict";
const express = require("express");
const router = express.Router();
const subjects = require("../db/subject-dao");
const students = require("../db/students-dao");

router.get("/", async (req, res, next) => {
	let filterArgs = req.query;
	if (req.user && req.user.role === "student"){
		filterArgs["studentID"] = req.user.model.id;
	} else {
		delete filterArgs["studentID"];
	}
	try {
		const results = await subjects.getFilteredSubjects(req.query);
		res.send({results: results, filters: filterArgs});
	} catch (e) {
		res.send({results: [], filters: filterArgs, err: e});
	}
});

module.exports = router;