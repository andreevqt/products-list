const { model } = require("mongoose");
const { createSchema } = require("./Schema");
const { Schema } = require("mongoose");

const Filter = createSchema({
  name: "string",
  type: "string",
  label: "string",
}, {
  
});

const schema = createSchema({
  parent: { type: Schema.Types.ObjectId, ref: "Category" },
  name: "string",
  price: "number",
  filters: [Filter]
});

schema.set("toJSON", {
  virtuals: true,
  getters: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret._filters
  }
})

module.exports = model("Category", schema);