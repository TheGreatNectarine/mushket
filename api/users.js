var express = require('express');
var router = express.Router();
const accs = require('../db/accounts-dao');
const teachers = require('../db/tachers-dao');
const studs = require('../db/students-dao');
const sessions = require('../middleware/sessions');
const crypto = require('crypto');

router.post('/', async function(req, res) {
	const accId = await accs.accId(req.body.login, req.body.pwd);
  if(accId == null) {
    res.status(404).send();
  } else {
    const sessID = crypto.randomBytes(16).toString('hex');
    let resp = null;
    const stud = await studs.getByAccID(accId);
    if(stud.data != null) {
      resp = {role: 'stud'};
      sessions.attach(sessID, {role: 'stud', model: stud.data});
    } else {
      const teacher = await teachers.getByAccID(accId);
      resp = {role: 'teacher'};
      sessions.attach(sessID, {role: 'teacher', model: teacher.data});
    }
    res.status(200).cookie('sessid', sessID).send(resp);
  }
});

module.exports = router;
