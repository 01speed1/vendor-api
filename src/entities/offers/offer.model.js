const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var offerSchema = Schema({
  vendorID:   { type: OID, ref: "Account", required: true },
  orderID:    { type: OID, ref: "Order"  , required: true },
  stateID:    { type: OID, ref: "State"  , required: true },
  createdAt:  { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Offer", offerSchema);
