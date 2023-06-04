const express = require('express');
const { createMessage, getAllMessages } = require('../controller/messageController');
const upload = require('../middleware/multer');
const router = express.Router();

// Create new message
router.post('/', upload.single('images'), createMessage);
// Get all messages by conversation Id
router.get('/:id',getAllMessages)

module.exports = router;
