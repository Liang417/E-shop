const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');
const { userAuth } = require('../middleware/auth.js');
const {
  createUser,
  sendAuthEmail,
  loginUser,
  getUser,
  logoutUser,
} = require('../controller/userController.js');

// Send an activation email to user
router.post('/signup', upload.single('file'), sendAuthEmail);
// Create and activate User
router.post('/create', createUser);
// Login User
router.post('/login', loginUser);
// Get User
router.get('/getUser', userAuth, getUser);
// Logout User
router.get('/logout', userAuth, logoutUser);

module.exports = router;
