var express = require("express");
var router = express.Router();
const students = require('../db/students-dao');

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("pages/index");
});

router.get("/:id", async (req, res, next) => {
	const results = await students.getByID(req.params.id);
	console.log(results);
	res.send('results');
});
module.exports = router;
