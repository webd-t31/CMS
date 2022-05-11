const fs = require("fs");
const path = require("path");
const modifiers = ["public", "protected", "private"];

const apiAccessMap = require(path.join(__dirname, "..", "configs", "access.js"));

module.exports.middleware = function(req, res, next){
    let url = req.originalUrl.split("?")[0];
    if(apiAccessMap[url]){
        if(apiAccessMap[url] == "private"){
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