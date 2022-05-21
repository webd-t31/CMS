require("dotenv").config();
const express = require("express");
const app = express();

let routerRegister = require("./entity/router/register")
app.use(express.json());

app.use("/get-routers", function z(req, res){
    let r = 
    req.app._router.stack.map((s, i) => {
        return {r: s.regexp.toString(), i}
    })
    res.json(r);
})

// api access modifier
const modifier = require("./auth/modifiers");
app.use(modifier.middleware);
let starter = require("./configs/access")
app.set("api-access-map", starter);

// session and authentication
const SessionMap = require("./auth/SessionMap.class");
const session = new SessionMap();
const Auth = require("./auth");
app.use(Auth(session));
app.set("session", session);


let {userRouter, adminRouter} = require("./user/routes");
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/entity", require("./entity/routes"));

// create a empty register
app.set("route-index-register", {});

// load the entity as apis
// once all routers are mounted create a register for removing on updates
// start the server then
function start(){
    process.env.CONTENT_BASE = !!process.env.CONTENT_BASE ? process.env.CONTENT_BASE : "api";
    
    let {MONGO_URL, SECRET, DB_NAME} = process.env;
    if(!MONGO_URL || !SECRET || !DB_NAME) {
        console.log("environment variables missing or not defined in .env file");
        process.exit();
    }
    
    require("./entity/init").init(app).then(function(){

        // updare the route register for routers
        routerRegister.updateRegister(app);
    
        const PORT = (process.env.PORT || 1131)
        app.listen(PORT, () => console.log(`cms started on port ${PORT} ...`));
    
    });
}



module.exports.start = start;