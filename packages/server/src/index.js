require("./bootstrap");
const express = require("express");
const app = express();
const config = require("./config/app");
const body = require("express-validator").body();
const queryParser = require("express-query-int");
const routes = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(queryParser());
app.use(body.trim());
app.use(cors());
app.use("/api", routes);
app.listen(config.port, () => {
  console.log(`Server running on ${config.url}:${config.port}`);
});

module.exports = app;