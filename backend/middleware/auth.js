const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError');
const User = require('../model/userModel.js');
const jwt = require('jsonwebtoken');

// Defining the middleware function to check if the user is authenticated
const isAuthenticated = catchAsyncError(async (req, res, next) => {
// Extracting the token from the cookies
const { token } = req.cookies;

// If the token is not present, return an error
if (!token) {
return next(new ErrorHandler('Please login first', 401));
}

// Verifying the token using the JWT_SECRET_KEY
const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

// Finding the user with the decoded id and adding it to the request object
req.user = await User.findById(decoded.id);
next();
});

module.exports = { isAuthenticated };