var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let title = req.user ? req.user.name : 'Unauthorized!';
  res.render('index', { title: title });
});

module.exports = router;
