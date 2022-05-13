const mongoose = require("mongoose");

/**
 * 
 * @param {mongoose.Connection} connection 
 * @returns
 */
module.exports.Users = function(connection){
    return connection.model("User", new mongoose.Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        password: {type: String, required: true},
        createdBy: {type: String},
        email: {type: String, required: true},
        phone: {type: String, required: false},
        roles: {type: [String], required: true},
        isAdmin: {type: Boolean, default: false}
    }, {versionKey: false}));
}

// roles
// admin, user