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
  updateUser,
  updateUserAvatar,
  updateUserAddress,
  deleteUserAddress,
  updateUserPassword,
} = require('../controller/userController.js');

// Send an activation email to user
router.post('/signup', upload.single('file'), sendAuthEmail);
// Create and activate user
router.post('/create', createUser);
// Login user
router.post('/login', loginUser);

// Get user
router.get('/getUser', userAuth, getUser);
// Logout user
router.get('/logout', userAuth, logoutUser);

// Update user info
router.put('/update', userAuth, updateUser);
// Update user avatar
router.put('/update-avatar', userAuth, upload.single('avatar'), updateUserAvatar);
// Update user address
router.put('/update-address', userAuth, updateUserAddress);
// Update user password
router.put('/update-password', userAuth, updateUserPassword);

// Delete user address
router.delete('/delete-address/:id', userAuth, deleteUserAddress);

module.exports = router;
