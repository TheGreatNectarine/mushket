var express = require('express');
var router = express.Router();
const accs = require('../db/accounts-dao');

router.post('/', async function(req, res) {
  const _ = await accs.accId(req.body.login, req.body.pwd);
  res.send('respond with a resource');
});

module.exports = router;
