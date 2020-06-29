const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OID = Schema.Types.Objectid;

var companiesSchema = Schema({
  vendor: { type: OID, ref: "Account" },
  order: { type: OID, ref: "Order" },
  state: { type: OID, ref: "State" },
  created: { type: Date, default: Date.now() },
  modified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Offer", companiesSchema);
