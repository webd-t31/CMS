const {sendError, IncompleteData} = require("../errors");
const parseRouteSetting = require("./utils/routeSettingParser");
const {MongoClient} = require("mongodb");
let db = null;
MongoClient.connect(process.env.MONGO_URL).then(c => {
    db = c.db(process.env.DB_NAME).collection("entities");
})

module.exports = {
    async createEntity(req, res){
        try {
            let {name, schema, routeSetting} = req.body;
            if(!name || !schema || !routeSetting) throw new IncompleteData();
            let {parsedSetting, routeMap} = parseRouteSetting(name, routeSetting, true);
            let r = await db.insertOne({
                name,
                eid: name.toLowerCase(),
                schema,
                routeSetting: routeSetting,
                // parsedRouteSetting: parsedSetting
            });
            if(r.insertedId){
                res.json({
                    success: true,
                    id: r.insertedId,
                    entityName: name,
                    routes: routeMap
                })
            } else res.sendStatus(500);
        } catch(e){
            sendError(res, e);
        }
    },

    async getEntityDetail(req, res){
        try {
            let {eid} = req.query;
            let r = await db.findOne({eid}, {projection: {parsedRouteSetting: 0}});
            res.json({
                success : !!r,
                data: r
            })
        } catch(e){
            sendError(res, e);
        }
    },

    async updateSchema(req, res){
        res.json({
            success: true,
            msg: "pass"
        })
    },

    async updateRouteSetting(req, res){
        try {
            let {eid} = req.query;
            let {routeSetting} = req.body
            if(!eid || !routeSetting) throw new IncompleteData();
            let {routeMap} = parseRouteSetting(eid, routeSetting);
            let setterDoc = {$set: {}};
            for(let k in routeMap){
                setterDoc.$set["routeSetting."+k] = routeMap[k];
            }
            let r = await db.updateOne({eid}, setterDoc);
            if(r.modifiedCount){
                res.json({
                    success: true,
                    data: {
                        changed: routeMap
                    }
                })
            } else {
                res.json({
                    success: false
                })
            }
        } catch(e){
            sendError(res, e)
        }
    }
}