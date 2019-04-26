var express = require('express')
var router = express.Router()
const accs = require('../db/accounts-dao')
const teachers = require('../db/teachers-dao')
const studs = require('../db/students-dao')
const tags_dao = require('../db/tag-dao')
const sessions = require('../middleware/sessions')
const crypto = require('crypto')

const AuthenticationContext = require('adal-node').AuthenticationContext;
const authorityUrl = "https://login.microsoftonline.com/ukmaedu.onmicrosoft.com"
const devRedirect = "https://mushket.herokuapp.com/user/dooficce";
const localRedirect = "http://localhost:5000/user/dooficce";

const officeUrl = (state) => "https://login.microsoftonline.com/common/oauth2/authorize?" +
                                "response_type=code&client_id=166ca298-c0c0-4e1d-906a-9ebcdfe9bced&" +
                                `state=${state}&` +
                                `redirect_uri=${devRedirect}`;
const resource = '166ca298-c0c0-4e1d-906a-9ebcdfe9bced';
/* GET login page. */
router.get('/login', function (req, res) {
    if (res.locals.user.role !== 'guest')
        return res.redirect('/')

    return res.render('pages/login')
})

router.post('/login', async function (req, res) {
    if (res.locals.user.role !== 'guest')
        return res.redirect('/')

    const accId = await accs.accId(req.body.login, req.body.pwd)

    if (accId !== null) {
        const sessID = crypto.randomBytes(16).toString('hex')
        let redirectUrl = '/'
        const stud = await studs.getByAccID(accId)
        if (stud.data != null) {
            sessions.attach(sessID, {role: 'student', model: stud.data})
        } else {
            const teacher = await teachers.getByAccID(accId)
            sessions.attach(sessID, {role: 'teacher', model: teacher.data})
            redirectUrl = '/user/profile'
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

router.get('/profile/:id', async function (req, res, next) {
    const profile_id = req.params.id
    if (res.locals.user.role !== 'guest' && profile_id == res.locals.user.model.id) {
        return res.redirect('/user/profile')
    }
    let profile = (await teachers.getByID(profile_id)).data
    return res.render('pages/public-profile', {profile: profile})
})

router.get('/profile', async function (req, res, next) {
    if (res.locals.user.role === 'guest')
        return res.redirect('/user/login')
    else if(res.locals.user.role === 'student') {
        const tags = (await tags_dao.getSelectedTagsByStudentID(res.locals.user.model.id)).data
        return res.render('pages/personal-profile', {tags: tags})
    }

    return res.render('pages/personal-profile')
})

router.get('/office', function(req, res) {
    const state = crypto.randomBytes(16).toString('hex')
    res.cookie('authstate', state);
    var authorizationUrl = officeUrl(state);
  
    res.redirect(authorizationUrl);
});
router.get('/dooficce', async function(req, res) {
    var authenticationContext = new AuthenticationContext(authorityUrl);
    authenticationContext.acquireTokenWithAuthorizationCode(req.query.code, devRedirect, resource,
         '166ca298-c0c0-4e1d-906a-9ebcdfe9bced', '7(_]()?;@*+(}!!+8Y$[;:j}}t}#}]:&0ah>#(_;:_;-R.^%-0>+^>E?^rp', async function(err, response) {
        const accId = await accs.accIdOffice(response.userId)
        if (accId !== null) {
            const sessID = crypto.randomBytes(16).toString('hex')
            let redirectUrl = '/'
            const stud = await studs.getByAccID(accId)
            if (stud.data != null) {
                sessions.attach(sessID, {role: 'student', model: stud.data})
            } else {
                const teacher = await teachers.getByAccID(accId)
                sessions.attach(sessID, {role: 'teacher', model: teacher.data})
                redirectUrl = '/user/profile'
            }
            return res.status(200).cookie('sessid', sessID).redirect(redirectUrl)
        } else {
            return res.render('pages/login', {data: {err: 'no user with such userID'}})
        }
    });
});

router.post("/profile/update-tags", async (req, res, next) => {
    const newTags = req.body;
    for (const tag of newTags) {
        studs.addTag(res.locals.user.model.id, tag.id)
    }
    res.redirect("/user/profile")
});

module.exports = router
