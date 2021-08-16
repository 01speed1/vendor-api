const { ROLES, PERMISSIONS } = require('./rolesPermission.constants');
const rolesPermissionsRepository = require('./rolesPermissions.repository');

const createNewAccount = accountId => {
  const consumerPermission = rolesPermissionsRepository.create({
    accountId,
    role: ROLES.consumer,
    permissions: Object.values(PERMISSIONS)
  });

  const carrierPermission = rolesPermissionsRepository.create({
    accountId,
    role: ROLES.carrier,
    permissions: Object.values(PERMISSIONS)
  });

  const businessPermission = rolesPermissionsRepository.create({
    accountId,
    role: ROLES.business,
    permissions: Object.values(PERMISSIONS)
  });

  return Promise.all([
    consumerPermission,
    carrierPermission,
    businessPermission
  ]);
};

const listPermissions = roles => {
  const buildPermissionName = role => permission => `${role.name}${permission}`;

  const iteratePermissions = ({ role }) =>
    Object.values(role.permissions).map(buildPermissionName(role));

  return roles.map(iteratePermissions).flat();
};

const listRoles = rolePermissions => {
  return rolePermissions.map(rolePermission => rolePermission.role.name).flat();
};

const sortRolesPermissionByAccountId = accountId => {
  const buildRolesAndPermissions = foundRolesPermissions => {
    const roles = listRoles(foundRolesPermissions);
    const permissions = listPermissions(foundRolesPermissions);

    return { roles, permissions };
  };

  return rolesPermissionsRepository
    .findAllByAccountId(accountId)
    .then(buildRolesAndPermissions);
};

module.exports = {
  createNewAccount,
  listPermissions,
  listRoles,
  sortRolesPermissionByAccountId
};
