require("dotenv").config();
const config = require("./config/app");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://${config.db_url}:${config.db_port}/${config.db_name}`,
  { useNewUrlParser: true },
)
