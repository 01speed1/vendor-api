const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var productOfferedSchema = Schema({
  offerId: { type: OID, ref: 'Offer', required: true },
  productId: { type: OID, ref: 'Product', required: true },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ProductOffered', productOfferedSchema);
