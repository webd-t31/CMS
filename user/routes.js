const r = require("express").Router();
const handlers = require("./controller");

r.post("/new", handlers.createUser);
r.post("/access-token", handlers.getAccessToken);
r.get("/get-detail", handlers.getDetails)

module.exports = r;