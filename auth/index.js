const errors = require("../errors");
const jwt = require("jsonwebtoken");

module.exports = function(session){

    return function(req, res, next){
        try {
            // check if authorization is required
            if(!req.authRequired){
                next();
                return;
            }

            const token = req.headers.authorization;
            let user = session.checkSession(token);
            
            if(!user) throw new errors.InvalidToken();
            if(req.authRequired && req.isAdmin && !user.roles.includes("admin")) throw new errors.OnlyAdminAccess();

            // check token
            req.user = user;
            
            // check if the user has access to the requested api
            let {method, originalUrl} = req;
            let methodPerm = {post: 2, get: 1};
            let urlParams = originalUrl.split("/");
            let entity = urlParams[1];
            if(urlParams[0] !== "content") {
                next();
                return;
            }
            console.log(req.user[entity], method[methodPerm])
            if(req.user[entity] >= methodPerm[method]){
                next()
            } else throw new errors.PermissionDenied();

        } catch(e){
            errors.sendError(res, e);
        }
    }
}