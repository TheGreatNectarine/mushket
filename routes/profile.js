var express = require("express");
var router = express.Router();

router.get("/lecturer/:id", function (req, res, next) {
	const profile_id = req.params.id
	console.log(`lecturer profile ${profile_id} page`)
	res.render("pages/public-profile");
});

router.get("/", function (req, res, next) {
	res.render("pages/personal-profile");
});

module.exports = router;
