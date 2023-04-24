const User = require('../model/userModel.js');
const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken.js');
const sendMail = require('../utils/sendMail.js');

// Create activation token
function createActivationToken(user) {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: '5m' });
}

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    // If email has already been used
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

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on the link within 5 minutes to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account within 5 minutes!`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500, err));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400, err));
  }
};

// activate user
const activationUser = catchAsyncError(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const verifyUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!verifyUser) {
      return next(new ErrorHandler('Invalid token', 400));
    }

    const { name, email, avatar, password } = verifyUser;

    // If email has already been used
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return next(new ErrorHandler('This email has already been used', 409));
    }

    // Create user to DB
    const newUser = await User.create({ name, email, avatar, password });
    sendToken(newUser, 201, res);
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, 500, err));
  }
});

module.exports = { createUser, activationUser };
