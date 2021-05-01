const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

const serviceSchema = Schema({
  subcategory: { type: OID, ref: 'Subcategory', required: true },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Service', serviceSchema);
