const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Chat', chatSchema);
