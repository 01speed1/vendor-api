const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var { DateTime } = require('luxon');

const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var orderSchema = Schema({
  consumerId: { type: OID, ref: 'Consumer', required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  destinyAddress: {
    address: { type: String, required: true },
    neighborhood: { type: String, required: true },
    apartment: { type: Number },
    additionalDescription: { type: String }
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  hoursLeft: { type: Number, required: true, max: 24 },
  products: [{ type: OID, ref: 'Product' }],
  services: [{ type: OID, ref: 'Service' }],
  deliverDetails: String,
  finishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', orderSchema);
