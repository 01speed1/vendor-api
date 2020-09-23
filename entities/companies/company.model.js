const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var companiesSchema = Schema({
  name: { type: String, required: true },
  identificationNumber: { type: String},
  logoPath: { type: String},
  ownerID: {
    type: OID,
    ref: "Account",
    required: true
  },
  staff: [{ type: OID, ref: "Account" }],
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Company", companiesSchema);
