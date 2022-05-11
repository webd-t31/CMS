const crypto = require("crypto");
const mongoose = require("mongoose");
const { NoUser, sendError, IncompleteData, InvalidCredentials } = require("../errors");
const schema = require("./schema");
const jwt = require("jsonwebtoken");

const connection = mongoose.createConnection(process.env.MONGO_URL);
let User = schema.Users(connection);

module.exports = {
    async createUser(req, res){
        try {
            let user = await User.findOne({email: req.email}).exec();
            if(user){
                throw new NoUser(req.email);
            }
            user = new User(req.body);
            user.password = crypto.createHash("sha256").update(user.password).digest("hex");
            await user.save();

            res.sendStatus(200);
        } catch(e){
            console.log(e)
            sendError(res, e)
        }
    },

    async getAccessToken(req, res){
        try {
            let {email, password} = req.body;

            if(!email || !password) throw new IncompleteData();
            let user = await User.findOne({email});
            
            if(!user) throw new NoUser(email);
            let passwordHash = crypto.createHash("sha256").update(password).digest("hex");
            
            if(passwordHash != user.password) throw new InvalidCredentials(email);

            let payload = {
                id: user._id.toString(),
                email: email,
                roles: user.roles
            };
            const token = jwt.sign(payload, process.env.SECRET, {
                algorithm: "HS256",
                expiresIn: 86400
            })
            req.app.get("session").addSession(token, payload);
            res.status(200).json({
                email,
                token,
                timestamp: new Date().getTime() 
            });
        } catch(e){
            sendError(res, e)
        }
    },

    async getDetails(req, res){
        try {
            let details = req.user;
            res.status(200).json(details);
        } catch(e){
            sendError(res, e);
        }
    }
}