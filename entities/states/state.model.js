const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var stateSchema = Schema({
  description: { type: String, required: true },
  createdAt:   { type: Date, default: Date.now() },
  modifiedAt:  { type: Date, default: Date.now() }
});

module.exports = mongoose.model("State", stateSchema);
