var express = require('express');
var router = express.Router();
var sessions = require('./../middleware/sessions');
var crypto = require('crypto');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  let sessid = crypto.randomBytes(16).toString('hex');
  // TODO switch to post, resolve real user, not glek
  sessions.attach(sessid, {name: 'Glek'});
  res.cookie('sessid', sessid).send('respond with a resource');
});

module.exports = router;
