const express = require("express");
// const router = express.Router;
// const {sendError} = require("../errors/");
const mongoose = require("mongoose");
const buildSchema = require("./schema").buildSchema;
const buildRouter = require("./router");
const updateApiAccess = require("./utils/updateApiAccess");

/**
 * 
 * @param {express.Application} app
 * @returns {express.Router}
 */
const dynamicLoad = async function(app, {name, schema, routeSetting}){
    let conn = await mongoose.createConnection(process.env.MONGO_URL).asPromise();
    let entityModel = conn.model(name, buildSchema(schema));
    let router = buildRouter(entityModel);
    console.log("Dynamic Loading ... "+name)
    // update api access map to keep up with access permission to apis
    updateApiAccess(app, name, routeSetting);
    app.use("/"+process.env.CONTENT_BASE+"/"+name, router);
    // await conn.close();
    return router;
}
module.exports.dynamicLoad = dynamicLoad;
module.exports.init = async function(app){
    let conn = await mongoose.createConnection(process.env.MONGO_URL).asPromise();
    let coll = conn.collection("entities");
    let eData = await coll.find().toArray();
    for(let i = 0; i < eData.length; i++){
        dynamicLoad(app, eData[i]);
    }
}