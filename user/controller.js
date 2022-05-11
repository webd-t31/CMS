const connect_db = require("../database/connection")

let db = null;
connect_db.then(d => db = d).catch(e => process.exit(1));

module.exports = {
    createUser(req, res){
        try {
            let users = db.collection("users").findOne()
        } catch(e){
            
        }
    }
}