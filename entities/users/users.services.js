const User = require("./users.model");
const serviceBuilder = require("../../libs/serviceBuilder");

const { getAll, getOne, create, update, remove } = serviceBuilder(User);

module.exports = {
  getAllUsers: getAll,
  getUser: getOne,
  createUser: create,
  updateUser: update,
  removeUser: remove
};
