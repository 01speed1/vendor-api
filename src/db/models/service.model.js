const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var serviceSchema = Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Service', serviceSchema);
