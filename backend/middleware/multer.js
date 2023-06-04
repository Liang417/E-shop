const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    const uploadsDir = path.join(__dirname, '../uploads');

    // Check if the 'uploads' directory exists
    if (!fs.existsSync(uploadsDir)) {
      // Create the 'uploads' directory
      fs.mkdirSync(uploadsDir);
    }

    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '.png');
  },
});

module.exports = multer({ storage: storage });
