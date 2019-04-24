var sessData = {};

module.exports.sessionMiddleware = function(req, _, next) {
    let sessid = req.cookies.sessid;
    if (sessid) {
        req.user = sessData[sessid];        
    } else {
        req.user = {
            role : 'guest'
        };
    }
    next();
}

module.exports.attach = function(sessId, user) {
    sessData[sessId] = user;
}
