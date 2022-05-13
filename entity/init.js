const express = require("express");
const router = express.Router;
const {sendError} = require("../../errors");
const mongoose = require("mongoose");
const buildSchema = require("./schema").buildSchema;
const buildRouter = require("./router");
const updateApiAccess = require("./utils/updateApiAccess");

/**
 * 
 * @param {express.Application} app
 * @returns {express.Router}
 */
module.exports = async function(app, {name, schema, routeSetting}){
    let conn = await mongoose.createConnection(process.env.MONGO_URL).asPromise();
    let entityModel = conn.model(name, buildSchema(schema));
    let router = buildRouter(entityModel);
    // update api access map to keep up with access permission to apis
    updateApiAccess(app, name, routeSetting);
    return router;
}