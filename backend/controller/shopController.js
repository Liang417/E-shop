const Shop = require('../model/shopModel.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { sendSellerToken } = require('../utils/jwtToken.js');
const sendMail = require('../utils/sendMail.js');
const ErrorHandler = require('../utils/ErrorHandler.js');

// Create activation token
function createActivationToken(seller) {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, { expiresIn: '10m' });
}

// Send an activation email
const sendAuthEmail = catchAsyncError(async (req, res, next) => {
  try {
    const { email, name, password, address, phoneNumber, zipCode } = req.body;

    const sellerEmail = await Shop.findOne({ email });

    // If email has already been used, delete the uploaded avatar and return an error
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error deleting file.' });
        }
      });
      return next(new ErrorHandler('This email has already been used', 409));
    }

    // If email is not already used, create a seller object
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const seller = {
      email,
      name,
      password,
      avatar: fileUrl,
      address,
      phoneNumber,
      zipCode,
    };

    // Create an activation token for the seller
    const activationToken = createActivationToken(seller);

    // Create an activation URL with the activation token
    const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`;

    // Send an activation email to the seller with the activation URL
    try {
      await sendMail({
        email: seller.email,
        subject: 'Activate your shop account',
        message: `Please click on the link within 10 minutes to activate your shop account: ${activationUrl}`,
      });
      // If email is sent successfully, send a success response to the client
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${seller.email} to activate your account within 10 minutes!`,
      });
    } catch (err) {
      // If there is an error sending the email, pass it to the error handler middleware
      return next(new ErrorHandler(err.message, 500, err));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400, err));
  }
});

const createSeller = catchAsyncError(async (req, res, next) => {
  try {
    // Extract activation token from the request body
    const { activation_token } = req.body;

    // Verify the activation token
    const verifySeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    // If token is invalid, return an error
    if (!verifySeller) {
      return next(new ErrorHandler('Invalid token', 400));
    }

    // Extract seller details from the verified token
    const { email } = verifySeller;

    // Check if email has already been used
    const findEmail = await Shop.findOne({ email });
    if (findEmail) {
      return next(new ErrorHandler('This email has already been used', 409));
    }

    // Create a new seller in the database with the extracted seller details
    const newSeller = await Shop.create(verifySeller);

    // Create a token and send it back to the client
    sendSellerToken(newSeller, 201, res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500, err));
  }
});

// login seller
const loginSeller = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next(new ErrorHandler('Please provide email and password', 400));
    }

    // Find the seller with the provided email
    const seller = await Shop.findOne({ email }).select('+password');

    // If seller does not exist, return an error
    if (!seller) {
      return next(new ErrorHandler('Shop does not exists!', 404));
    }

    // Check if the provided password matches the seller's password
    const isPasswordValid = await seller.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler('Please provide the correct information', 400));
    }

    // Create a token and send it back to the client
    sendSellerToken(seller, 201, res);
  } catch (err) {
    // If there is an error, pass it to the error handler middleware
    return next(new ErrorHandler(err.message, 500, err));
  }
});

// Get seller
const getSeller = catchAsyncError(async (req, res, next) => {
  try {
    // If pass the sellerAuth middleware, we can directly get the seller from req.seller
    const seller = req.seller;

    // If seller does not exist, return an error
    if (!seller) {
      return next(new ErrorHandler('seller does not exists', 404));
    }

    // If seller exists, send the seller details back to the client
    res.status(200).json({
      success: true,
      seller,
    });
  } catch (err) {
    // If there is an error, pass it to the error handler middleware
    return next(new ErrorHandler(err.message, 500, err));
  }
});

// Get seller information
const getSellerInfo = catchAsyncError(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.params.id);
    res.status(200).json({
      success: true,
      seller,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.state || 500, err));
  }
});

// logout seller
const logoutSeller = catchAsyncError(async (req, res, next) => {
  try {
    res.cookie('seller_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully🙂',
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500, err));
  }
});

module.exports = {
  sendAuthEmail,
  createSeller,
  loginSeller,
  getSeller,
  logoutSeller,
  getSellerInfo,
};
