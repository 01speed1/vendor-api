const accountRepository = require('./account.repository');
const accountServices = require('./account.services');

const signUp = async (request, response) => {
  try {
    const signUpParams = request.body;

    const createdAccount = await accountRepository.create(signUpParams);

    await accountServices.createRoles(createdAccount._id);

    response.json({
      message: 'account created'
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp
};
