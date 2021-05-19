const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var offerSchema = Schema({
  businessId: { type: OID, ref: 'Account', required: true },
  orderId: { type: OID, ref: 'Order', required: true },
  state: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Offer', offerSchema);
