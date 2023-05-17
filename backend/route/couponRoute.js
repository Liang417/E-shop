const express = require('express');
const { createCoupon, getAllCoupons, deleteCoupon } = require('../controller/couponController');
const router = express.Router();

// Create coupon code
router.post('/', createCoupon);
// Get all coupons of shop
router.get('/all/:shopId', getAllCoupons);
// Delete coupon
router.delete('/:id', deleteCoupon);

module.exports = router;
