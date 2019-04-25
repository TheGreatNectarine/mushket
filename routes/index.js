"use strict";
const express = require("express");
const router = express.Router();
const subjects = require("../db/subject-dao");
const students = require("../db/students-dao");

router.get("/", (req, res, next) => {
	return res.redirect("/subjects");
});

module.exports = router;