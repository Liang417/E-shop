const express = require('express');
const { createPayment, getStripeApiKey } = require('../controller/paymentController');
const router = express.Router();

// Create payment intent
router.post('/', createPayment);
// Get stripe api key
router.get('/', getStripeApiKey);

module.exports = router;
