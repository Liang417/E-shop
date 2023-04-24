class ErrorHandler extends Error {
  constructor(message, statusCode, err) {
    super(message);
    this.statusCode = statusCode;
    this.name = err?.name;
    this.code = err?.code;
    this.keyValue = err?.keyValue;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
