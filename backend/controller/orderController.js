const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');
const Order = require('../model/orderModel');
const Product = require('../model/productModel');
const Shop = require('../model/shopModel');

// Create new order
const createOrder = catchAsyncError(async (req, res, next) => {
  try {
    const { carts, shippingInfo, user, totalPrice, paymentInfo } = req.body;

    const shopProductMap = new Map();

    // group the products by the shopId
    for (const product of carts) {
      const shopId = product.shop._id;
      if (!shopProductMap.has(shopId)) {
        shopProductMap.set(shopId, [product]);
      } else {
        shopProductMap.get(shopId).push(product);
      }
    }

    const orders = [];

    // create order for each shop
    for (const [shopId, products] of shopProductMap) {
      const order = await Order.create({
        products,
        shippingInfo,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.state || 500, err));
  }
});

const getAllOrdersOfUser = catchAsyncError(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user_orders = await Order.find({ user: userId }).sort({
      createAt: -1,
    });
    res.status(200).json({
      success: true,
      user_orders,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.state || 500, err));
  }
});

// Get all orders of shop
const getAllOrdersOfShop = catchAsyncError(async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const shop_orders = await Order.find({ 'products.shop._id': shopId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      shop_orders,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.state || 500, err));
  }
});

// Update order status
const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const newStatus = req.body.status;
    const order = await Order.findById(orderId);
    order.status = newStatus;

    if (!order) {
      throw new ErrorHandler('Order not found with this id', 404);
    }

    // Update each product stock and sold_out
    if (newStatus === 'Transferred to delivery partner') {
      order.products.map(async (product) => {
        await Product.findByIdAndUpdate(
          { _id: product._id },
          { $inc: { stock: -product.qty, sold_out: product.qty } }
        );
      });
    }

    // Update seller balance
    if (newStatus === 'Delivered') {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = 'Succeeded';
      const platformFee = order.totalPrice * 0.1;
      const availableBalance = (order.totalPrice - platformFee).toFixed(2);
      await Shop.findByIdAndUpdate(
        { _id: order.products[0].shop._id },
        {
          $inc: { availableBalance: availableBalance },
        }
      );
    }

    // Save updated state
    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.state || 500, err));
  }
});

// User apply refund
const applyRefund = catchAsyncError(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ErrorHandler('Order not found with this id', 404);
    }

    order.status = req.body.status;
    await order.save();

    res.status(200).json({
      success: true,
      order,
      message: 'Order refund request submitted successfully😢😢😢',
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.state || 500, err));
  }
});

// Seller accept refund request
const acceptRefund = catchAsyncError(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ErrorHandler('Order not found with this id', 404);
    }

    order.status = req.body.status;
    await order.save();

    if (order.status === 'Refund success') {
      order.products.map(async (product) => {
        await Product.findByIdAndUpdate(
          { _id: product._id },
          { $inc: { stock: product.qty, sold_out: -product.qty } }
        );
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order refund accepted',
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.state || 500, err));
  }
});

module.exports = {
  createOrder,
  getAllOrdersOfUser,
  getAllOrdersOfShop,
  updateOrderStatus,
  applyRefund,
  acceptRefund,
};
