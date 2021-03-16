const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var serviceOfferedSchema = Schema({
  offerId: { type: OID, ref: 'Offer', required: true },
  serviceId: { type: OID, ref: 'Service', required: true },
  price: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ServiceOffered', serviceOfferedSchema);
