const express = require('express');
const {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
  getCoupon,
} = require('../controller/couponController');
const router = express.Router();

// Create coupon code
router.post('/', createCoupon);
// Get all coupons of shop
router.get('/all/:shopId', getAllCoupons);
// Get coupon by its code
router.get('/:couponCode', getCoupon);
// Delete coupon
router.delete('/:id', deleteCoupon);

module.exports = router;
