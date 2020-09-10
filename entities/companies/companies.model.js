const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OID = Schema.Types.Objectid;

var companiesSchema = Schema({
  name: { type: String, required: true },
  identificationNumber: String,
  logoPath: String,
  owner: {
    type: OID,
    ref: "Account",
    required: true
  },
  staff: [{ type: OID, ref: "Account" }],
  created: { type: Date, default: Date.now() },
  modified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Company", companiesSchema);
