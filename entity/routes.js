const r = require("express").Router();
const api = require("./controller");

r.get("/detail", api.getEntityDetail);
r.post("/create", api.createEntity);
r.post("/route-setting", api.updateRouteSetting);
r.post("/schema", api.updateSchema)

module.exports = r;