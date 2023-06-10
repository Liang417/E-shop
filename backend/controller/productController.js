const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const Product = require('../model/productModel.js');
const Shop = require('../model/shopModel.js');
const fs = require('fs');
const Order = require('../model/orderModel.js');

// Create new product
const createProduct = catchAsyncError(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.body.shop);
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
const getAllProductsOfShop = catchAsyncError(async (req, res, next) => {
  try {
    const shopProducts = await Product.find({ shop: req.params.id })
      .populate('shop')
      .populate('reviews.user');

    res.status(201).json({
      success: true,
      shopProducts,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, 400, err));
  }
});

// Get all products
const getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const products = await Product.find().populate('shop').populate('reviews.user');
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

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return next(new ErrorHandler('Product not found with this id', 404));
    }
    res.status(201).json('Product Deleted successfully');
  } catch (err) {
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

// Create review of product
const createProductReview = catchAsyncError(async (req, res, next) => {
  try {
    const { rating, comment, user, productId, orderId } = req.body;
    const newReview = {
      user,
      rating,
      comment,
      productId,
    };

    const product = await Product.findById(productId);
    product.reviews.push(newReview);

    let avg = 0;

    product.reviews.forEach((review) => {
      avg += review.rating;
    });

    product.ratings = (avg / product.reviews.length).toFixed(1);

    await product.save();

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { 'products.$[elem].isReviewed': true } },
      { arrayFilters: [{ 'elem._id': productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Reviewed successfully🙂',
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

module.exports = {
  createProduct,
  getAllProductsOfShop,
  deleteProduct,
  getAllProducts,
  createProductReview,
};
