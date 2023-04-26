const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');
const { isAuthenticated } = require('../middleware/auth.js');
const {
  createUser,
  sendAuthEmail,
  loginUser,
  getUser,
} = require('../controller/userController.js');

// Send an activation email to user
router.post('/signup', upload.single('file'), sendAuthEmail);
// Create and activate User
router.post('/create', createUser);
// Login User
router.post('/login', loginUser);
// Get User
router.get('/getUser', isAuthenticated, getUser);

module.exports = router;
