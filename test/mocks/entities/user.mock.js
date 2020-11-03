var faker = require("faker");

const User = require("../../../src/db/models/user.model");

const defaultArgumets = () => ({
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    documentNumber: faker.random.number(),
    contactPhones: [faker.phone.phoneNumber(), faker.phone.phoneNumber()],
    imagePath: faker.random.image(),
})

module.exports = function userMocker(args = {}) {
    return User.create({...defaultArgumets(), ...args });
};