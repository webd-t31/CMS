function parseRouteSetting(name, routeSetting, routeREEnable){
    const base = process.env.CONTENT_BASE;
    let parsed = {};
    let routeMap = {}
    let actionMethodMap = {
        "create": "post",
        "get": "get",
        "getbyid": "get",
        "deletebyid": "delete",
        "updatebyid": "post"
    }
    for(let action in routeSetting){
        let method = actionMethodMap[action];
        let route = `${method},/${base}/${name.toLowerCase()}/`;
        let routeRE = "\\["+method+"\\]"+"/"+base+"/"+name.toLowerCase();
        if(action.endsWith("byid")){
            routeRE += "/(.*)"
            route += ":id"
        } else {
            routeRE += "/?";
        }
        routeMap[route] = actionMethodMap[action];
        parsed[routeRE] = routeSetting[action];
    }
    return routeREEnable ? 
    {parsedSetting: parsed, routeMap} : {routeMap};
}

module.exports = parseRouteSetting;