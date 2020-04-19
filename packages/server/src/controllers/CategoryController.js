const Category = require("../models/Category");

const index = async (req, res, next) => {
  const params = {
    ...{ query: ".*", page: 1, limt: 8 },
    ...req.query
  }

  const { page, limit } = params;

  try {
    const categories = await Category.paginate({
      name: new RegExp(params.query, "i")
    }, { page, limit });

    return res.status(200).json(categories);
  }
  catch (err) {
    const errors = [err.message];
    return res.status(400).json({ errors });
  }
}

const get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await filterById(id);
    if (!category) {
      const errors = ["Wrong id"];
      return res.status(400).json({ errors });
    }
    return res.status(200).json(category);
  } catch (err) {
    const errors = ["Internal server error"];
    return res.status(500).json({ errors });
  }
}

const filterById = async (id) => {
  const models = await Category
    .findById(id)
    .populate(Category.with);

  return models;
}

module.exports = {
  index,
  get
};