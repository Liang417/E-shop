const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const Event = require('../model/eventModel.js');
const Shop = require('../model/shopModel.js');
const fs = require('fs');

// Create new event
const createEvent = catchAsyncError(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.body.shop);

    if (!shop) {
      throw new ErrorHandler('Shop Id is invalid', 404);
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);

      const eventData = req.body;
      eventData.images = imageUrls;

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (err) {
    // if err delete uploaded files
    req.files.forEach((file) => {
      fs.unlink(`uploads/${file.filename}`, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error deleting file.' });
        }
      });
    });
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

// Get all events of shop
const getAllEvents = catchAsyncError(async (req, res, next) => {
  try {
    const events = await Event.find().populate('shop');

    res.status(201).json({
      success: true,
      events,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400, err));
  }
});

// Get all events of shop
const getShopEvents = catchAsyncError(async (req, res, next) => {
  try {
    const shopEvents = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      shopEvents,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400, err));
  }
});

// Delete event of shop
const deleteEvent = catchAsyncError(async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const eventData = await Event.findById(eventId);

    eventData.images.forEach((filename) => {
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error deleting file.' });
        }
      });
    });

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return next(new ErrorHandler('Event not found with this id', 404));
    }
    res.status(201).json('Event Deleted successfully');
  } catch (err) {
    return next(new ErrorHandler(err.message, err.status || 400, err));
  }
});

module.exports = { createEvent, getAllEvents, deleteEvent, getShopEvents };
