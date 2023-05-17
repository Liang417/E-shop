const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const Coupon = require('../model/couponModel.js');
const Shop = require('../model/shopModel.js');

// Create coupon code
const createCoupon = catchAsyncError(async (req, res, next) => {
  try {
    const { name } = req.body;
    const coupon = await Coupon.findOne({ name });

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
    const { shopId } = req.params;
    const coupons = await Coupon.find({ shopId });

    res.status(200).json({
      success: true,
      coupons,
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

module.exports = { createCoupon, getAllCoupons, deleteCoupon };
