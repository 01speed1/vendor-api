var faker = require("faker");

const State = require("../../../entities/states/state.model");

const defaultArgumets = () => ({
  description: faker.lorem.paragraph(),
});

module.exports = async function userMocker(args) {
  return await State.create({ ...defaultArgumets(), ...args });
};
