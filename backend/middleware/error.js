const ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal server Error';

  // wrong mongo id error
  if (err.name === 'CastError') {
    err.message = `Resources not found with this id. Invalid: ${err}`;
    err.status = 404;
  }

  // duplicate key error
  if (err.code === 11000) {
    err.message = `Duplicate key '${Object.keys(err.keyValue)}' Entered`;
    err.status = 409;
  }

  // wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    err.message = `Your url is invalid`;
    err.status = 400;
  }

  // jwt expired error
  if (err.name === 'TokenExpiredError') {
    err.message = `Your token has expired, please register again`;
    err.status = 401;
  }
  
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
};
