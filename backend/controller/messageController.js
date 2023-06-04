const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');
const Message = require('../model/messageModel');
const path = require('path');

// Create new message
const createMessage = catchAsyncError(async (req, res, next) => {
  try {
    if (req.file) {
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      req.body.images = fileUrl;
    }

    const newMessage = await Message.create({
      conversationId: req.body.conversationId,
      content: req.body.content,
      senderId: req.body.senderId,
      images: req.body?.images ? req.body.images : undefined,
    });

    res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

// Get all messages by conversation Id
const getAllMessages = catchAsyncError(async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

module.exports = { createMessage, getAllMessages };
