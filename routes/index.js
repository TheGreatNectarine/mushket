var express = require("express");
var router = express.Router();
const db = require("../db/db");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", {title: "4лен сосі"});
});

router.get("/:id", async (req, res, next) => {
	const results = await db.students.getByID(req.params.id);
	console.log(results);
	res.send(results);
});
module.exports = router;
