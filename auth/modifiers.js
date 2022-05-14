const fs = require("fs");
const path = require("path");
const modifiers = ["public", "protected", "admin"];

// let apiAccessMap = require(path.join(__dirname, "..", "configs", "access.js"));

const getAccessLevel = function(map, method, url){
    let s = url.match(/([a-zA-z0-9-_]+)/gi);
    let name = s[1];
    // console.log(map)
    if(s.length >= 2 && map[name] && s[0] == process.env.CONTENT_BASE){
        console.log(map[name][method][s.length-2]);
        let access = map[name][method][s.length-2]
        if(access) {
            return access;
        } else false;
    } else return false;
}

module.exports.middleware = function(req, res, next){
    // let url = `${req.method.toLowerCase()},${req.originalUrl.split("?")[0]}`;
    let url = req.originalUrl.split("?")[0];
    let apiAccessMap = req.app.get("apiAccessMap");
    let accessLevel = getAccessLevel(apiAccessMap, req.method.toLowerCase(), url)
    console.log(url, accessLevel)
    if(accessLevel){
        if(accessLevel == "admin"){
            req.authRequired = true;
            req.isAdmin = true;
        } else {
            req.isAdmin = false;
            if(accessLevel == "public"){
                req.authRequired = false;
            } else {
                req.authRequired = true;
            }
        }
        next();
    } else res.sendStatus(404);
}

// module.exports.apiAccessMap = apiAccessMap;