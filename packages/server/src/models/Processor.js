const { model } = require("mongoose");
const { createSchema } = require("./Schema");

const schema = createSchema({
  name: "string",
  frequency: "number"
})

module.exports = model("Processor", schema);