var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("pages/index", {course: require("../db/_testing_obj").courseExample});
});

module.exports = router;
