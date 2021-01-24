const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  },

  price: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Product', productSchema);
