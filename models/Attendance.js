const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  roll: {
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
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    get: (date) => {
      return date ? new Date(date).toISOString().split('T')[0] : date;
    },
  },
  status: {
    type: String,
    required: true,
  },
}, {
  toJSON: { getters: true }, // Enable getters for JSON responses
  toObject: { getters: true }, // Enable getters for object responses
});

// Create and export the Attendance model
module.exports = mongoose.model("Attendance", attendanceSchema);
