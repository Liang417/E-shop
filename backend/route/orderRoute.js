const express = require('express');
const {
  createOrder,
  getAllOrdersOfUser,
  getAllOrdersOfShop,
  updateOrderStatus,
  applyRefund,
  acceptRefund,
} = require('../controller/orderController');
const { sellerAuth } = require('../middleware/auth.js');
const router = express.Router();

// Create new order
router.post('/', createOrder);
// Get all orders of user
router.get('/user/:userId', getAllOrdersOfUser);
// Get all orders of shop
router.get('/shop/:shopId', getAllOrdersOfShop);
// Update order status
router.put('/update/:orderId', sellerAuth, updateOrderStatus);
// User apply refund
router.put('/refund-apply/:orderId', applyRefund);
// Seller accept refund request
router.put('/refund-accept/:orderId', sellerAuth, acceptRefund);

module.exports = router;
