const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var promoSchema = Schema({
  businessId: { type: OID, ref: 'Business', required: true },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  products: [{ type: OID, ref: 'Product' }],
  services: [{ type: OID, ref: 'Service' }],
  hoursLeft: { type: Number, required: true },
  type: {
    name: { type: String, required: true },
    discountRate: { type: Number },
    discountPrice: { type: Number },
    multiBuy: { min: { type: Number }, get: { type: Number } },
    freeProduct: { type: OID, ref: 'Product' }
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Promo', promoSchema);
