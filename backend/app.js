const express = require('express');
const errorHandler = require('./middleware/error.js');
const app = express();
const cookieParser = require('cookie-parser');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom error handler middleware
app.use(errorHandler);

module.exports = app;
