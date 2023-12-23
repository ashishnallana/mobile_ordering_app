const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mobileType: {
    type: String,
    required: true,
  },
  processor: {
    type: String,
    required: true,
  },
  memory: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  coverImg: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
});

const Mobile = mongoose.model("MOBILE", mobileSchema);

module.exports = Mobile;
