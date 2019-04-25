var express = require("express");
var router = express.Router();

router.get("/:id", function (req, res, next) {
	const course_id = req.params.id
	console.log(`Course ${course_id} page`)
	res.render("pages/course");
});

module.exports = router;
