require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
// app.use()

const SessionMap = require("./auth/SessionMap.class");
const session = new SessionMap();
const Auth = require("./auth");
app.use(Auth(session));



const PORT = (process.env.PORT || 1131)
app.listen(PORT, () => console.log("cms started on port 1131 ..."));