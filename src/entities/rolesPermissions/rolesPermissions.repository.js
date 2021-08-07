const rolesPermissionsModel = require('../../../src/db/models/rolesPermission.model');

const create = ({ accountId, role, permissions }) =>
  rolesPermissionsModel.create({
    accountId,
    role: {
      name: role,
      permissions
    }
  });

const findAllByAccountId = accountId => {
  return rolesPermissionsModel.find({ accountId });
};

const find = () => rolesPermissionsModel.find();

module.exports = { create, findAllByAccountId, find };
