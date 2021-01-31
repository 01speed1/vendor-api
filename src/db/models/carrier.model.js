const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

const carrierSchema = Schema({
    accountId: { type: OID, ref: 'Account', required: true }
});

module.exports = mongoose.model('Carrier', carrierSchema);