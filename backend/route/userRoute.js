const express = require('express');
const router = express.Router();
const upload = require('../config/multer.js');
const { createUser, activationUser } = require('../controller/userController.js');

// create User
router.post('/register', upload.single('file'), createUser);
// activation User
router.post('/activation', activationUser);
module.exports = router;
