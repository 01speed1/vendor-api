const rolesPermissionModel = require('../../../src/db/models/rolesPermission.model');
const fakeGoose = require('../../../libs/fakeGoose');

const {
  ROLES,
  PERMISSIONS
} = require('../../../src/entities/rolesPermissions/rolesPermission.constants');

const fakeModel = fakeGoose(rolesPermissionModel);

const createFakeNewAccount = accountId => {
  const consumerPermission = fakeModel.model.create({
    accountId,
    role: { name: ROLES.consumer, permissions: Object.values(PERMISSIONS) }
  });

  const carrierPermission = fakeModel.model.create({
    accountId,
    role: { name: ROLES.carrier, permissions: Object.values(PERMISSIONS) }
  });

  const businessPermission = fakeModel.model.create({
    accountId,
    role: { name: ROLES.business, permissions: Object.values(PERMISSIONS) }
  });

  return Promise.all([
    consumerPermission,
    carrierPermission,
    businessPermission
  ]);
};

module.exports = { ...fakeModel, createFakeNewAccount };
