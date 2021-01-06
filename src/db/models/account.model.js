const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

//TODO validate unique function
// move to account validations

const uniqueValidator = (Model, field, value) => {
    return new Promise(async(resolve, reject) => {
        const response = await Model.find({
            [field]: value }).exec();
        resolve(response.length <= 0);
        reject(response.length > 0);
    });
};

var accountSchema = Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => uniqueValidator(Account, 'email', value),
            message: 'email is in use',
        },
    },
    identificationPhone: { type: String },
    password: {
        IVEncryptKey: {
            type: String,
            required: true,
        },
        encryptedData: {
            type: String,
            required: true,
        },
    },
    pinPass: { type: String },
    twoFactorsToken: { type: String },
    facebookToken: { type: String },
    googleToken: { type: String },
    twitterToken: { type: String },
    isAdmin: { type: Boolean, default: false },
    isCustomer: { type: Boolean, default: false },
    isVendor: { type: Boolean, default: false },
    ownerID: {
        type: OID,
        ref: 'User',
        required: true,
    },
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date, default: Date.now() },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;