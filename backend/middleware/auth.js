const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError');
const User = require('../model/userModel.js');
const Shop = require('../model/shopModel.js');
const jwt = require('jsonwebtoken');

// Defining the middleware function to check if the user is authenticated
const userAuth = catchAsyncError(async (req, res, next) => {
  // Extracting the token from the cookies
  const { user_token } = req.cookies;

  // If the token is not present, return an error
  if (!user_token) {
    return next(new ErrorHandler('Please login first', 401));
  }

  // Verifying the token using the JWT_SECRET_KEY
  const decoded = jwt.verify(user_token, process.env.JWT_SECRET_KEY);

  // Finding the user with the decoded id and adding it to the request object
  req.user = await User.findById(decoded.id);
  next();
});

// seller token
const sellerAuth = catchAsyncError(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler('Please login to continue', 401));
  }
  
  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

module.exports = { userAuth, sellerAuth };
