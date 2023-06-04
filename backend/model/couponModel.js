const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your coupon name'],
  },
  couponCode: {
    type: String,
    required: [true, 'Please enter your coupon code'],
    unique: true,
    minLength: [4, 'Coupon code must be at least 4 characters'],
    maxLength: [30, 'Coupon code cannot exceed 30 characters'],
  },
  percentage: {
    type: Number,
    required: true,
  },
  minDiscount: {
    type: Number,
  },
  maxDiscount: {
    type: Number,
  },
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Coupon', couponSchema);
