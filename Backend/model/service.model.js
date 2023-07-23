const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  service_type: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("service", serviceSchema);
