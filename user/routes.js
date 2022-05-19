const adminRouter = require("express").Router();
const userRouter = require("express").Router();
const handlers = require("./controller");


// admin router
adminRouter.post("/roles", handlers.createRoles);
adminRouter.post("/user/new", handlers.createUser);
adminRouter.post("/user/assign", handlers.editUserRoles);
adminRouter.get("/roles", handlers.getRoles);

// user router common to admin router
userRouter.post("/authorize", handlers.getAccessToken);
userRouter.get("/me", handlers.getDetails);


// r.post("/roles/scopes", handlers.updateScope);
// r.get("/roles/scopes", handlers.getScope);

module.exports = {adminRouter, userRouter};