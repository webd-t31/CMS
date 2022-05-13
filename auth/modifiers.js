const fs = require("fs");
const path = require("path");
const modifiers = ["public", "protected", "admin"];

const apiAccessMap = require(path.join(__dirname, "..", "configs", "access.js"));

module.exports.middleware = function(req, res, next){
    let url = `[${req.method.toLowerCase()}]${req.originalUrl.split("?")[0]}`;
    console.log(url);
    if(apiAccessMap[url]){
        if(apiAccessMap[url] == "admin"){
            req.authRequired = true;
            req.isAdmin = true;
        } else {
            req.isAdmin = false;
            if(apiAccessMap[url] == "public"){
                req.authRequired = false;
            } else {
                req.authRequired = true;
            }
        }
        next();
    } else res.sendStatus(404);
}

module.exports.apiAccessMap = apiAccessMap;