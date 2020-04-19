const mongoose = require("mongoose");
const { Product, Category, Processor } = require("../models");

const seed = async ({ products, categories, processors }) => {
  let goods = null;
  console.log("seeding");
  try {
    await Product.remove();
    goods = await Product.insertMany(Object.entries(products).map(product => ({
      name: product[0],
      price: product[1].price,
      properties: product[1].properties
    })));

    await Category.remove();
    await Category.insertMany(Object.entries(categories).map(category => ({
      name: category[0],
      filters: category[1].filters
    })));

    await Category.find().then(cats => Promise.all(cats.map(async cat => {
      const parentName = categories[cat.name].parentName;
      if (parentName) {
        const parent = cats.find(cat => cat.name === parentName);
        cat.parent = parent;
        await cat.save();
      }
    })));
  }
  catch (err) {
    console.log(err);
  }
  return Promise.all(goods.map(async product => {
    const category = await Category.findOne({ name: products[product.name].category });
    product.category = category;
    return product.save()
  }))
}

module.exports = seed;