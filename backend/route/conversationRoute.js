const express = require('express');
const {
  createConversation,
  getAllConversationOfSeller,
  getAllConversationOfUser,
  updateLastMessage,
} = require('../controller/conversationController');
const { sellerAuth } = require('../middleware/auth');
const router = express.Router();

// Create conversation
router.post('/', createConversation);
// Get all conversation of seller
router.get('/seller/:id', sellerAuth, getAllConversationOfSeller);
// Get all conversation of user
router.get('/user/:id', getAllConversationOfUser);
// Update the last message
router.put('/:id',updateLastMessage)

module.exports = router;
