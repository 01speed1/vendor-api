const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var stateSchema = Schema({
  description: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  modified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Account", stateSchema);
