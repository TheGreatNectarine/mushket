var sessData = {}

module.exports.sessionMiddleware = function (req, res, next) {
    let sessid = req.cookies.sessid
    if (sessid) {
        res.locals.user = sessData[sessid]
    } else {
        res.locals.user = {
            role: 'guest',
        }
    }
    next()
}

module.exports.attach = function (sessId, user) {
    sessData[sessId] = user
}

module.exports.detach = function (sessId) {
    delete sessData[sessId]
}
