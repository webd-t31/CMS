const errors = require("../errors");
const jwt = require("jsonwebtoken");

module.exports = function(session){

    return function(req, res, next){
        try {
            if(!req.authRequired){
                next();
                return;
            }
            const token = req.headers.authorization;
            let user = session.checkSession(token);
            
            if(!user) throw new errors.InvalidToken();

            // check token
            req.user = user;
            next();

        } catch(e){
            errors.sendError(res, e);
        }
    }
}