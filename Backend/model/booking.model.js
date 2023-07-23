const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  serviceIds: {
    type: Array,
    required: true,
  },
  serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }],
  status: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("booking", bookingSchema);
