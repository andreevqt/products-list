const Product = require("../models/Product");
const Category = require("../models/Category");
// TODO make middleware to extract properties;
const buildQuery = (query, category, allowed = ["name", "category"]) => {
  const res = {};
  for (const [key, value] of Object.entries(query)) {
    // if there is one category => return filters 
    if (category.length === 1) {
      const found = category.filters.find(filter => filter.name === key);
      if (found) {
        res["properties.name"] = key;
        res["properties.value"] = value;
        continue;
      }
    }

    if (allowed.includes(key)) {
      res[key] = value;
    }
  }
  return Object.keys(res).length !== 0 ? res : null;
}

const filterByCategory = async ({
  category,
  query,
  page = 1,
  limit = 8,
  price,
  ...rest
}) => {
  let cat = null;
  let filters = null;
  let products = null;
  let categories = null;
  let prices = null;

  mQuery = {
    name: new RegExp(query, "i")
  };

  if (category) {
    if (!Array.isArray(Category)) {
      category = [category];
    }

    cat = await Product.find({
      '_id': { $in: category }
    });

    if (!cat) {
      throw Error(`Category ${category} not found`);
    }

    mQuery.category = {
      category: "id"            
    };
    mQuery = buildQuery({ ...mQuery, ...rest }, cat);
  }

  if (page === 1) {
    filters = await Product.getFilters(mQuery, cat);
  }

  products = await Product.paginate(mQuery, { page, limit, populate: "category" });
  price = await Product.aggregate([
    {
      $match: mQuery,
    },
    {
      $group: {
        _id: "$item",
        min: { $min: "$price" },
        max: { $max: "$price" }
      },
    }, {
      $project: {
        _id: 0,
        min: "$min",
        max: "$max"
      }
    }
  ]);

  return {
    ...products,
    ...(filters && { filters }),
    price: price[0],
    // categories
  };
}

const get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await filterById(id);
    if (!product) {
      const errors = ["Wrong id"];
      return res.status(400).json({ errors });
    }
    return res.status(200).json(product);
  } catch (err) {
    const errors = ["Internal server error"];
    return res.status(500).json({ errors });
  }
}

const filterById = async (id) => {
  const models = await Product
    .findById(id)
    .populate(Product.with);

  return models;
}

const index = async (req, res, next) => {
  const params = {
    ...{ query: ".*", page: 1, limit: 8 },
    ...req.query
  };

  try {
    const products = await filterByCategory(params);
    return res.status(200).json(products);
  } catch (err) {
    const errors = ["Internal server error"];
    return res.status(400).json({ errors });
  }
}

module.exports = {
  index,
  get
};