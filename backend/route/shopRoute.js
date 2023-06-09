const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');
const {
  sendAuthEmail,
  createSeller,
  loginSeller,
  getSeller,
  logoutSeller,
  getSellerInfo,
  updateSeller,
  updateSellerAvatar,
} = require('../controller/shopController.js');
const { sellerAuth } = require('../middleware/auth.js');

// Send an activation email to seller
router.post('/signup', upload.single('file'), sendAuthEmail);
// Create and activate seller
router.post('/create', createSeller);
// Login seller
router.post('/login', loginSeller);
// Update seller info
router.put('/update', sellerAuth, updateSeller);
// Update seller avatar
router.put('/update-avatar', sellerAuth, upload.single('avatar'), updateSellerAvatar);
// Get seller
router.get('/getSeller', sellerAuth, getSeller);
// Get seller information
router.get('/getSellerInfo/:id', getSellerInfo);
// Logout seller
router.get('/logout', logoutSeller);

module.exports = router;
