const mongoose = require('mongoose');
const app = require('./app.js');

// Handle uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// Configuration
if (process.env.NODE_ENV !== 'PRODUCTION') {
  // Load environment variables from .env file in development mode
  require('dotenv').config({ path: 'backend/.env' });
}

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connection SUCCESS');
  })
  .catch(() => {
    console.log('MongoDB connection FAIL');
  });

// Create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Sever is running on http://localhost:${process.env.PORT}`);
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandled promise rejection`);

  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
