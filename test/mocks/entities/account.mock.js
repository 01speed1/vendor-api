var faker = require("faker");

const Account = require("../../../entities/accounts/account.model");
const userMocker = require('./user.mock')

const defaultArgumets = () => ({
  email               :faker.internet.email(),
  identificationPhone :faker.phone.phoneNumber(),
  password            :faker.internet.password(),
  pinPass             :faker.unique,
  twoFactorsToken     :faker.unique,
  facebookToken       :faker.unique,
  googleToken         :faker.unique,
  twitterToken        :faker.unique,
  isAdmin             :false,
  isCustomer          :true,
  isVendor            :false
})

module.exports = async function AccountMocker(args) {
  owner = await userMocker()
  return await Account.create({...defaultArgumets(), ...args, ownerID: owner._id });
};