var express = require('express');
var router = express.Router();
const db = require("../db/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '4лен сосі' });
});

router.get("/:id", (req, res, next) => {
  return db.getStudentByID(req, res);
});
module.exports = router;
