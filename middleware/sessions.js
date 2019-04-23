var sessData = {};

module.exports.sessionMiddleware = (req, res, next) => {
    let sessid = req.cookies.sessid;
    if(sessid) {
        req.user = sessData[sessid];        
    }
    next();
}

module.exports.attach = (sessId, user) =>  {
    sessData[sessId] = user;
}
