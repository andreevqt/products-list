const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const productController = require("../controllers/ProductController");
const categoryController = require("../controllers/CategoryController");

router.get("/products", productController.index);
router.get("/products/:id", productController.get);
router.get("/categories", categoryController.index);
router.get("/categories/:id", categoryController.get);

module.exports = router;
