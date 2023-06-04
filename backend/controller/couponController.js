const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const Coupon = require('../model/couponModel.js');
const Shop = require('../model/shopModel.js');

// Create coupon code
const createCoupon = catchAsyncError(async (req, res, next) => {
  try {
    const { couponCode } = req.body;
    const coupon = await Coupon.findOne({ couponCode });

    if (coupon) {
      throw new ErrorHandler('This coupon already exists', 409);
    }

    const newCoupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      newCoupon,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

const getAllCoupons = catchAsyncError(async (req, res, next) => {
  try {
    const shop = req.params.shopId;
    const coupons = await Coupon.find({ shop });

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

const getCoupon = catchAsyncError(async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne(req.params).populate('shop');
    
    if (!coupon) {
      throw new ErrorHandler('Invalid coupon code.', 404);
    }

    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

const deleteCoupon = catchAsyncError(async (req, res, next) => {
  try {
    const couponId = req.params.id;
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return next(new ErrorHandler('This Coupon does not exist', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Coupon Deleted successfully',
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

module.exports = { createCoupon, getAllCoupons, deleteCoupon, getCoupon };
