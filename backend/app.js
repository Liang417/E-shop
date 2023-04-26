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

app.use('/api/v2/user', userRoute);

// Custom error handler middleware
app.use(errorHandler);

module.exports = app;
