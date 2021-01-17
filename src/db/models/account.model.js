const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = (Model, field, value) => {
  return new Promise(async (resolve, reject) => {
    const response = await Model.find({
      [field]: value
    })
    resolve(response.length <= 0);
    reject(response.length > 0);
  });
};

var accountSchema = Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: value => uniqueValidator(Account, 'email', value),
      message: 'email is in use'
    }
  },
  identificationPhone: { type: String },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  twoFactorsToken: { type: String },
  facebookToken: { type: String },
  googleToken: { type: String },
  twitterToken: { type: String },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
