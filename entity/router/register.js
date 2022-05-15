const express = require("express");

const getRegExpString = function(name){
    return `/^\\/${process.env.CONTENT_BASE}\\/${name}\\/?(?=\\/|$)/i`
}

/**
 * 
 * @param {express.Application} app 
 */
module.exports.updateRegister = function(app){
    let reg = {};
    app._router.stack.forEach((s, i) => {
        if(s.regexp.toString().search(process.env.CONTENT_BASE) > 0){
            reg[s.regexp.toString()] = i
        }
    })
    app.set("route-index-register", reg);
}

/**
 * 
 * @param {express.Router} router 
 */
module.exports.removeRouter = function(app, name){
    let reg = app.get("route-index-register");
    let regexp = getRegExpString(name.toLowerCase());
    let index = reg[regexp];
    if(index && index > -1){
        app._router.stack.splice(index, 1);
        return true;
    } else return false;
}