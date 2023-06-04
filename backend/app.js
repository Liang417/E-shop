const express = require('express');
const errorHandler = require('./middleware/error.js');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '../.env' });

// middleware
app.use(cors({ origin: ['http://localhost:3000', process.env.AWS_IPv4], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static('uploads'));

// route
const userRoute = require('./route/userRoute.js');
const shopRoute = require('./route/shopRoute.js');
const productRoute = require('./route/productRoute.js');
const eventRoute = require('./route/eventRoute.js');
const couponRoute = require('./route/couponRoute.js');
const paymentRoute = require('./route/paymentRoute.js');
const orderRoute = require('./route/orderRoute.js');
const conversationRoute = require('./route/conversationRoute.js');
const messageRoute = require('./route/messageRoute.js');

app.use('/api/v2/user', userRoute);
app.use('/api/v2/shop', shopRoute);
app.use('/api/v2/product', productRoute);
app.use('/api/v2/event', eventRoute);
app.use('/api/v2/coupon', couponRoute);
app.use('/api/v2/payment', paymentRoute);
app.use('/api/v2/order', orderRoute);
app.use('/api/v2/conversation', conversationRoute);
app.use('/api/v2/message', messageRoute);

// serve static index.html from react build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Custom error handler middleware
app.use(errorHandler);

module.exports = app;
