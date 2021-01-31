const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var orderSchema = Schema({
  consumerId: { type: OID, ref: 'Consumer', required: true },
  // TODO this should be an object or json location object
  location: {
    type: String,
    required: true
  },
  destinyAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  // TODO: this need to be a model, Product and Service
  products: [String],
  services: [String],
  deliverDetails: String,
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Order', orderSchema);
