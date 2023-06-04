const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');
const Conversation = require('../model/conversationModel');

// Create conversation
const createConversation = catchAsyncError(async (req, res, next) => {
  try {
    const { userId, sellerId } = req.body;
    const conversation = await Conversation.findOne({ user: userId, seller: sellerId });

    // if conversation exists return it, otherwise create new one
    if (conversation) {
      res.status(200).json({
        success: true,
        conversation,
      });
    } else {
      const newConversation = await Conversation.create({
        user: userId,
        seller: sellerId,
      });
      res.status(200).json({
        success: true,
        conversation: newConversation,
      });
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

// Get all conversation of seller
const getAllConversationOfSeller = catchAsyncError(async (req, res, next) => {
  try {
    const seller = req.params.id;

    const conversations = await Conversation.find({ seller })
      .populate('user')
      .populate('seller')
      .sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

// Get all conversation of user
const getAllConversationOfUser = catchAsyncError(async (req, res, next) => {
  try {
    const user = req.params.id;

    const conversations = await Conversation.find({ user })
      .populate('seller')
      .populate('user')
      .sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

// Update the last message
const updateLastMessage = catchAsyncError(async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage: lastMessage === 'isPhoto' ? 'Photo' : lastMessage,
      lastMessageId,
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

module.exports = {
  createConversation,
  getAllConversationOfSeller,
  getAllConversationOfUser,
  updateLastMessage,
};
