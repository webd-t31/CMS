const express = require("express");
const parseRouteSetting = require("./routeSettingParser");
/**
 * 
 * @param {express.Application} app 
 */

module.exports = function(app, name, routeSetting){
    let apiAccessMap = app.get("apiAccessMap");
    let {parsedSetting} = parseRouteSetting(name, routeSetting);
    apiAccessMap = {...apiAccessMap, ...parsedSetting};
    app.set("apiAccessMap", apiAccessMap);
}