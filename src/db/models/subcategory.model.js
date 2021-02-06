const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var categorySchema = Schema({
  name: { type: String, required: true },
  categoryId: {
    type: OID,
    ref: 'Category',
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('SubCategory', categorySchema);
