"use strict";
const express       = require("express");
const apiMedicinte  = require("./Medicine/ApiMedicine");
const apiDisease    = require("./Disease/ApiDisease");
const app           = express();
const VERSION       = "API V1 Made with by Thắng";

app.get("/", (req, res) => { res.send(VERSION); });
app.use("/medicine", apiMedicinte);
app.use("/disease", apiDisease);

module.exports = app;