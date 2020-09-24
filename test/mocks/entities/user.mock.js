var faker = require("faker");

const User = require("../../../entities/users/users.model");

const defaultArgumets = () => ({
  name           : faker.name.firstName(),
  lastName       : faker.name.lastName(),
  documentNumber : faker.random.number(),
  contactPhones  : [faker.phone.phoneNumber(), faker.phone.phoneNumber()],
  imagePath      : faker.random.image(),
})

module.exports = async function userMocker(args) {
  return await User.create({ ...defaultArgumets(), ...args });
};