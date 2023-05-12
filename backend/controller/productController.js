const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const Product = require('../model/productModel.js');
const Shop = require('../model/shopModel.js');
const fs = require('fs');

// Create new product
const createProduct = catchAsyncError(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.body.shopId);
    if (!shop) {
      throw new ErrorHandler('Shop Id is invalid', 404);
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);

      const productData = req.body;
      productData.images = imageUrls;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (err) {
    // if err delete uploaded files
    req.files.forEach((file) => {
      fs.unlink(`uploads/${file.filename}`, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error deleting file.' });
        }
      });
    });
    return next(new ErrorHandler(err.message, 400, err));
  }
});

// Get all products of shop
const getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400, err));
  }
});

// Delete product of shop
const deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const productData = await Product.findById(productId);

    productData.images.forEach((filename) => {
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error deleting file.' });
        }
      });
    });

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new ErrorHandler('Product not found with this id', 404));
    }
    res.status(201).json('Product Deleted successfully');
  } catch (err) {
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

module.exports = { createProduct, getAllProducts, deleteProduct };
