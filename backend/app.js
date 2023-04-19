const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express();
const cookieParser = require('cookie-parser');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom error handler middleware
app.use(ErrorHandler);

module.exports = app;
