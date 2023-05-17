const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your shop name.'],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your shop email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password.'],
    minLength: [6, 'Password should be greater then 6 characters'],
    select: false,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    default: 'seller',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password
ShopSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
ShopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Compare password
ShopSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model('Shop', ShopSchema);
