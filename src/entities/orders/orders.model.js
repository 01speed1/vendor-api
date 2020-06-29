const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var orderSchema = Schema({
  location: {
    latitude: Number,
    length: Number
  },
  address: {
    type: String //required: true
  },
  products: [String],
  services: [String],
  deliverDetails: String,
  created: { type: Date, default: Date.now() },
  modified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Order", orderSchema);
