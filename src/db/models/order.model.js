const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
var { DateTime } = require('luxon');

const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var orderSchema = Schema({
  consumerId: { type: OID, ref: 'Consumer', required: true },
  // TODO this should be an object or json location object
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  destinyAddress: {
    address: { type: String, required: true },
    neighborhood: { type: String, required: true },
    apartament: { type: Number },
    additionalDescription: { type: String }
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  hoursLeft: { type: Number, required: true },
  products: [{ type: OID, ref: 'Product' }],
  services: [{ type: OID, ref: 'Service' }],
  deliverDetails: String,
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

orderSchema.plugin(mongooseLeanVirtuals);

orderSchema.virtual('finishAt').get(function () {
  const { hoursLeft, createdAt } = this;

  return DateTime.fromISO(createdAt.toJSON())
    .plus({
      hours: hoursLeft
    })
    .toISO();
});

module.exports = mongoose.model('Order', orderSchema);
