var express = require("express");
var router = express.Router();

var profileExample = require('../db/_testing_obj').profileExample;

router.get("/:id", function (req, res, next) {
	const profile_id = req.params.id
	res.render("pages/public-profile", {profile: profileExample});
});

router.get("/", function (req, res, next) {
	res.render("pages/personal-profile", {profile: profileExample});
});

module.exports = router;
