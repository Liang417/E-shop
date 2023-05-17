const express = require('express');
const errorHandler = require('./middleware/error.js');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
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

app.use('/api/v2/user', userRoute);
app.use('/api/v2/shop', shopRoute);
app.use('/api/v2/product', productRoute);
app.use('/api/v2/event', eventRoute);
app.use('/api/v2/coupon', couponRoute);

// Custom error handler middleware
app.use(errorHandler);

module.exports = app;
