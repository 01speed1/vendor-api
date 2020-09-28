const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var orderSchema = Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    type: String,
  },
  // TODO: this need to be a model, Product and Service
  products: [String],
  services: [String],
  deliverDetails: String,
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", orderSchema);
