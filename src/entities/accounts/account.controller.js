const accountRepository = require('./account.repository');
const accountServices = require('./account.services');

const JWT = require('../../../libs/auth/JWT');

const signUp = async (request, response) => {
  try {
    const signUpParams = request.body;

    const createdAccount = await accountRepository.register(signUpParams);

    await accountServices.createRoles(createdAccount._id);

    response.json({
      message: 'account created'
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const logIn = async (request, response) => {
  try {
    const token = JWT.create(request.account);

    response.status(200).json({ token });
  } catch (err) {
    response.status(500);
  }
};

module.exports = {
  signUp,
  logIn
};
