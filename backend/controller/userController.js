const User = require('../model/userModel.js');
const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { sendUserToken } = require('../utils/jwtToken.js');
const sendMail = require('../utils/sendMail.js');

// Create activation token
function createActivationToken(user) {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: '10m' });
}

// Send an activation email to user
const sendAuthEmail = async (req, res, next) => {
  try {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if the email has already been used
    const userEmail = await User.findOne({ email });

    // If email has already been used, delete the uploaded avatar and return an error
    if (userEmail) {
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

    // If email is not already used, create a user object with name, email, password, and avatar
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    // Create an activation token for the user
    const activationToken = createActivationToken(user);

    // Create an activation URL with the activation token
    const activationUrl = `http://localhost:3000/user/activation/${activationToken}`;

    // Send an activation email to the user with the activation URL
    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on the link within 10 minutes to activate your account: ${activationUrl}`,
      });
      // If email is sent successfully, send a success response to the client
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account within 10 minutes!`,
      });
    } catch (err) {
      // If there is an error sending the email, pass it to the error handler middleware
      return next(new ErrorHandler(err.message, 500, err));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400, err));
  }
};

// Create and activate user
const createUser = catchAsyncError(async (req, res, next) => {
  try {
    // Extract activation token from the request body
    const { activation_token } = req.body;

    // Verify the activation token
    const verifyUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    // If token is invalid, return an error
    if (!verifyUser) {
      return next(new ErrorHandler('Invalid token', 400));
    }

    // Extract user details from the verified token
    const { name, email, avatar, password } = verifyUser;

    // Check if email has already been used
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return next(new ErrorHandler('This email has already been used', 409));
    }

    // Create a new user in the database with the extracted user details
    const newUser = await User.create({ name, email, avatar, password });

    // Create a token and send it back to the client
    sendUserToken(newUser, 201, res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500, err));
  }
});

// login user
const loginUser = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req)
    // Check if email and password are provided
    if (!email || !password) {
      return next(new ErrorHandler('Please provide email and password', 400));
    }

    // Find the user with the provided email
    const user = await User.findOne({ email }).select('+password');

    // If user does not exist, return an error
    if (!user) {
      return next(new ErrorHandler('User does not exists!', 404));
    }

    // Check if the provided password matches the user's password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler('Please provide the correct information', 400));
    }

    // Create a token and send it back to the client
    sendUserToken(user, 201, res);
  } catch (err) {
    // If there is an error, pass it to the error handler middleware
    return next(new ErrorHandler(err.message, 500, err));
  }
});

// Get User
const getUser = catchAsyncError(async (req, res, next) => {
  try {
    // Find the user with the provided user ID
    const user = await User.findById(req.user.id);

    // If user does not exist, return an error
    if (!user) {
      return next(new ErrorHandler('User does not exists', 404));
    }

    // If user exists, send the user details back to the client
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    // If there is an error, pass it to the error handler middleware
    return next(new ErrorHandler(err.message, 500, err));
  }
});

// LogOut User
const logoutUser = catchAsyncError(async (req, res, next) => {
  try {
    res.cookie('user_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: 'Logged out successfully🙂',
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500, err));
  }
});

module.exports = { createUser, sendAuthEmail, loginUser, getUser, logoutUser };
