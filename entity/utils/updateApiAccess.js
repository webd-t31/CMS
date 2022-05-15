const express = require("express");
const parseRouteSetting = require("./routeSettingParser");
/**
 * 
 * @param {express.Application} app 
 */

module.exports = function(app, name, routeSetting){
    let apiAccessMap = app.get("api-access-map");
    let {parsedSetting} = parseRouteSetting(name, routeSetting, true);
    apiAccessMap = {...apiAccessMap, ...parsedSetting};
    app.set("api-access-map", apiAccessMap);
}