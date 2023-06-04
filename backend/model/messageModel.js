const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    content:{
      type: String,
    },
    senderId: {
      type: String,
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messagesSchema);
