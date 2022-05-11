require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
// app.use()

// api access modifier
const modifier = require("./auth/modifiers");
app.use(modifier.middleware);
app.set("apiAccessMap", modifier.apiAccessMap);

// session and authentication
const SessionMap = require("./auth/SessionMap.class");
const session = new SessionMap();
const Auth = require("./auth");
app.use(Auth(session));
app.set("session", session);

app.use("/user", require("./user/routes"));

const PORT = (process.env.PORT || 1131)
app.listen(PORT, () => console.log("cms started on port 1131 ..."));