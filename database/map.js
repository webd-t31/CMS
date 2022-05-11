const connect_db = require("../database/connection");
const errors = require("../errors");

class Connection {
    constructor(){
        this.db = null;
        connect_db.then(d => db = d).catch(e => process.exit(1));
    }

    static parseUpdateDocument(val){
        let parsed = {};
        if(val.set){
            parsed.$set = val.set;
        }
        if(val.unset){
            parsed.$unset = val.unset;
        }
        if(val.inc){
            parsed.$inc = val.inc;
        }
    }

    async findOne(e, filters){
        if(!this.db) throw errors.InternalServerError("Cannot connect to database");

        let res = await this.db.collection(e).findOne(filters);
        return res;
    }

    async findMany(e, filters, count){
        if(!this.db) throw errors.InternalServerError("Cannot connect to database");

        let res = await this.db.collection(e).find(filters);
        if(count.sort) res = await res.sort(count.sort);
        if(!isNaN(count.skip) && count.skip > 0) res = await res.skip(count.skip);
        if(!isNaN(count.limit) && count.skip > 0) res = await res.limit(count.limit);
        return await res.toArray();
    }

    async createOne(e, val){
        if(!this.db) throw errors.InternalServerError("Cannot connect to database");

        let res = await this.db.collection(e).insertOne(val);
        if(res.insertedId){
            return {success: true, insertedId: res.insertedId}
        } else return {success: false}
    }

    async createMany(e, val){
        if(!this.db) throw errors.InternalServerError("Cannot connect to database");

        let res = await this.db.collection(e).insertMany(val);
        if(res.acknowledged && res.insertedCount == val.count){
            return {success: true, insertedIds: Object.values(res.insertedIds)};
        } else return {success: false};
    }

    async updateOne(e, filters, val, upsert){
        if(!this.db) throw errors.InternalServerError("Cannot connect to database");

        // let parsed = Connection.parseUpdateDocument(val);
        let res = await this.db.collection(e).findOneAndUpdate(filters, val.value, {
            arrayFilters: val.arrayFilters ? val.arrayFilters : null,
            returnDocument: "after"
        });
        if(res){
            return {success: true, updatedId: res._id};
        } else return {success: false};
    }

    async deleteOne(e, filters) {
        if(!this.db) throw errors.InternalServerError("Cannot connect to database");

        let res = await this.db.collection(e).deleteOne(filters);
        if(res.acknowledged && res.deletedCount == 1){
            return {success: true, deletedCount: 1};
        } else return {success: false};
    }

    async deleteMany(e, filters) {
        if(!this.db) throw errors.InternalServerError("Cannot connect to database");

        let res = await this.db.collection(e).deleteMany(filters);
        if(res.acknowledged){
            return {success: true, deletedCount: res.deletedCount};
        } else return {success: false};
    }
}

module.exports = Connection;

//     updateOne(e, filters, newVal){

//     }

//     updateMany(e, filters, newVal){

//     }