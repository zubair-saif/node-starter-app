const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const categoryController = require('../controller/category.controller');

router.post('/create-product', productController.create);
router.post('/create-category', categoryController.create);
router.get('/get-all-category', categoryController.getByCategory);
router.get('/get-allcategory-product', categoryController.getAllCategoryProduct);

module.exports = router; 