class ErrorHandler extends Error {
  constructor(message, status, err) {
    super(message);
    this.status = status;
    this.name = err?.name;
    this.code = err?.code;
    this.keyValue = err?.keyValue;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
