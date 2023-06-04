const catchAsyncError = require('../middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
const createPayment = catchAsyncError(async (req, res, next) => {
  try {
    const newPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
    });
    res.status(200).json({
      success: true,
      client_secret: newPayment.client_secret,
    });
  } catch (err) {
    console.log(1)
    console.log(err)
    next(err);
  }
});

// Get stripe api key
const getStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = { createPayment, getStripeApiKey };
