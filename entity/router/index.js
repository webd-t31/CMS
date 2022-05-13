const Router = require("express").Router;
const mongoose = require("mongoose")
/**
 * 
 * @param {mongoose.Model} entity 
 * @returns {Router}
 */
module.exports = function(entity){
    let api = {
        async get(req, res){
            try {
                const {user} = req;
                // const {filter} = req.body;
                let {skip, limit, sort} = req.query;
                let filter = {};
                if(user) filter = {byUser : {$in: [user._id, "any"]}}
                else filter.byUser = "any";
                let opts = {}
                if(skip) opts.skip = skip;
                if(limit) opts.limit = limit;
                if(sort) {
                    let [, key, asc] = sort.match(/(\w+),([-]?1)/i) || [];
                    if(key && asc) opts.sort = sort;
                }

                let result = await entity.find(filter, {"byUser": 0}, opts).exec();
                
                res.json({
                    count: result.length,
                    data: result
                })
            } catch(e){
                sendError(res, e);
            }
        },

        async create(req, res){
            try {
                const {user} = req;
                const data = req.body;
                data.byUser = user ? user._id : "any";

                let e = new entity(data);
                let result = await e.save();
                
                res.json({
                    insertedId: result._id.toString()
                })
            } catch(e){
                sendError(res, e);
            }
        },

        async getbyid(req, res){},

        async updatebyid(req, res){},

        async deletebyid(req, res){}
    }

    const r = Router();
    r.get("/", api.get);
    r.post("/", api.create);
    r.get("/:id", api.getbyid);
    r.put("/:id", api.updatebyid);
    r.delete("/:id", api.deletebyid);
    return r;
}