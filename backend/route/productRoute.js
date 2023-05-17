const express = require('express');
const { createProduct, getAllProducts, deleteProduct, getAllProductsOfShop } = require('../controller/productController');
const router = express.Router();
const upload = require('../middleware/multer.js');
const { sellerAuth } = require('../middleware/auth.js');

// Create new product
router.post('/', upload.array('images'), createProduct);
// Get all products of specific shop
router.get('/all/:id', getAllProductsOfShop);
// Get all products
router.get('/all', getAllProducts);
// Delete product of shop
router.delete('/:id', sellerAuth, deleteProduct);

module.exports = router;
