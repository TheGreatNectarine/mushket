var express = require('express')
var router = express.Router()
const accs = require('../db/accounts-dao')
const teachers = require('../db/tachers-dao')
const studs = require('../db/students-dao')
const sessions = require('../middleware/sessions')
const crypto = require('crypto')

/* GET login page. */
router.get('/login', function (req, res) {
    return res.render('pages/login')
})

router.post('/login', async function (req, res) {
    const accId = await accs.accId(req.body.login, req.body.pwd)
    if (accId !== null) {
        const sessID = crypto.randomBytes(16).toString('hex')
        let redirectUrl = '/'
        const stud = await studs.getByAccID(accId)
        if (stud.data != null) {
            sessions.attach(sessID, {role: 'stud', model: stud.data})
        } else {
            const teacher = await teachers.getByAccID(accId)
            sessions.attach(sessID, {role: 'teacher', model: teacher.data})
            redirectUrl = '/profile'
        }
        return res.status(200).cookie('sessid', sessID).redirect(redirectUrl)
    } else {
        return res.render('pages/login', {data: {err: 'wrong credentials'}})
    }
})

router.get('/logout', function (req, res, next) {
    sessions.detach(req.cookies.sessid)
    res.clearCookie('sessid')
    res.redirect('/')
})

var profileExample = require('../db/_testing_obj').profileExample;

router.get("/profile/:id", function (req, res, next) {
    const profile_id = req.params.id
    res.render("pages/public-profile", {profile: profileExample});
});

router.get("/profile", function (req, res, next) {
    res.render("pages/personal-profile", {profile: profileExample});
});

module.exports = router
