const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');
const {
  sendAuthEmail,
  createSeller,
  loginSeller,
  getSeller,
} = require('../controller/shopController.js');
const { sellerAuth } = require('../middleware/auth.js');

// Send an activation email to seller
router.post('/signup', upload.single('file'), sendAuthEmail);
// Create and activate seller
router.post('/create', createSeller);
// Login seller
router.post('/login', loginSeller);
// Get User
router.get('/getSeller', sellerAuth, getSeller);

module.exports = router;
