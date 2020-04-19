const { model, Schema } = require("mongoose");
const { createSchema } = require("./Schema");
const Category = require("./Category");

const property = createSchema({
  name: "string",
  value: "string"
}, { _id: false });

const schema = createSchema({
  name: "string",
  price: "number",
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  processor: { type: Schema.Types.ObjectId, ref: "Processor" },
  properties: [property]
});

schema.statics.getCategories = async function (query) {
  const categoriesIds = await this.find(query).distinct("category");
  const categories = await Category.find({ "_id": { $in: categoriesIds } });

  return Promise.all(categories.map(async category => {
    const count = await this.find(query).countDocuments({ category: category._id });
    return {
      ...category.toJSON(),
      total: count
    }
  }));
}

schema.statics.getFilters = async function (query, category) {
  const categories = await this.getCategories(query);
  const catFilter = {
    name: "categories",
    items: categories.map(cat => ({
      total: cat.total,
      name: cat.name,
      value: cat.name
    })),
    type: "checkbox_group"
  };

  let filters = [];

  if (category) {
    filters = await Promise.all(category.filters.map(async filter => {
      const result = await this.aggregate([
        { $unwind: "$properties" },
        {
          $match: {
            ...query,
            "properties.name": filter.name
          }
        },
        {
          $group: {
            "_id": {
              name: "$properties.name",
              value: "$properties.value"
            },
            name: {
              "$first": "$properties.name"
            },
            value: {
              "$first": "$properties.value"
            },
            total: {
              $sum: 1
            }
          }
        },
        {
          $group: {
            "_id": {
              name: "$name",
            },
            values: {
              $push: { value: "$value", total: "$total" }
            },
          }
        },
        {
          $project: {
            "_id": 0,
            items: "$values",
            name: "$_id.name"
          }
        }
      ]);

      return result[0];
    }));
  }
  return [
    ...filters,
    catFilter
  ];
}

schema.statics.with = [
  "category"
];

module.exports = model("Product", schema);