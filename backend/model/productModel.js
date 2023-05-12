const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please enter product original price'],
  },
  discountPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop',
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);