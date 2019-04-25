var express = require("express");
var router = express.Router();

router.get("/:id", function (req, res, next) {
	const profile_id = req.params.id
	res.render("pages/public-profile");
});

router.get("/", function (req, res, next) {
	res.render("pages/personal-profile");
});

module.exports = router;
