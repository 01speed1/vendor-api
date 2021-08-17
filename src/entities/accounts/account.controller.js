const JWT = require('../../../libs/auth/JWT');

const accountRepository = require('./account.repository');
const accountServices = require('./account.services');

const rolesPermissionsServices = require('../rolesPermissions/rolesPermission.services');

const signUp = async (request, response) => {
  try {
    const signUpParams = request.body;

    const createdAccount = await accountRepository.register(signUpParams);

    await accountServices.createRoles(createdAccount._id);

    await rolesPermissionsServices.createNewAccount(createdAccount._id);

    response.json({
      message: 'account created'
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const logIn = async (request, response) => {
  try {
    const { token, expirationDate, expiredAt } = JWT.create(request.account);

    response.status(200).json({ token, expirationDate, expiredAt });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

const permissions = async (request, response) => {
  try {
    const { accountId } = request.account;

    const { firstName, lastName } = await accountRepository.findById(accountId);

    const {
      roles,
      permissions
    } = await rolesPermissionsServices.sortRolesPermissionByAccountId(
      accountId
    );

    const payload = { firstName, lastName, roles, permissions };

    response.status(200).json(payload);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

module.exports = {
  signUp,
  logIn,
  permissions
};
