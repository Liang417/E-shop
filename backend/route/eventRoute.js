const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
  createEvent,
  getAllEvents,
  deleteEvent,
  getShopEvents,
} = require('../controller/eventController');
const { sellerAuth } = require('../middleware/auth');

// Create event
router.post('/', upload.array('images'), createEvent);
// Get all events
router.get('/all', getAllEvents);
// Get all events of specific shop
router.get('/all/:id', getShopEvents);
// Delete event of shop
router.delete('/:id', sellerAuth, deleteEvent);

module.exports = router;
